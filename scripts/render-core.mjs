// Motor de render reaproveitável: recebe um HTML + as imagens/fontes (em memória)
// e devolve os PNGs de cada slide em alta resolução — por padrão 2160 de largura
// (2× do 1080 do Instagram), ou a largura que a própria peça declarar (ver
// META_LARGURA abaixo). Usa o Chrome JÁ instalado no PC (playwright-core, canal
// 'chrome') — sem baixar o Chromium de ~150 MB. Espelha a engine do sistema da empresa.

import { chromium } from 'playwright-core'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

const TARGET_W = 2160                 // 2× de 1080 (Instagram 4:5 → 2160×2700) — O PADRÃO
const CHROME_FALLBACK = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const SLIDE_ATTR = 'data-sv-slide'    // marca interna dos slides de topo (some no fim)

// ---- largura de saída DECLARADA PELA PEÇA -------------------------------
// Por que existe: o carrossel do Instagram sempre saiu em 2160 de largura, e isso
// NÃO PODE MUDAR — é o que o Carlos usa todos os dias. Mas o livrinho 14×21 da
// gráfica precisa sair em 1696 (o tamanho exato das artes). Em vez de trocar o
// número, a peça passou a poder DECLARAR o dela:
//     <meta name="sv-export-largura" content="1696">
// Peça SEM a plaquinha (todo carrossel) → 2160, exatamente como sempre foi.
const META_LARGURA = 'sv-export-largura'
const LARGURA_MIN = 200, LARGURA_MAX = 8000

// Trava de CIMA da ampliação. NÃO é capricho: o Chrome não desenha imagem acima de
// ~16.000 px de lado. Sem ela, um slide pequeno pedindo uma largura grande faria o
// robô falhar em vez de entregar. Quando ela age, sai um AVISO (antes era calado).
// A trava de BAIXO (que forçava no mínimo 1×) foi removida: ela impedia o robô de
// obedecer a largura pedida quando o slide já era maior que ela.
const DSF_MAX = 8
const DSF_MIN = 0.05    // só pra nunca virar zero/negativo

// lê a plaquinha da página já aberta. Blindado dos três lados: se não existir, se
// vier com lixo (letra, 0, número absurdo) ou se a leitura der erro, devolve null
// e quem chama cai no TARGET_W de sempre.
async function larguraDeclarada(page) {
  try {
    const cru = await page.evaluate((nome) => {
      const m = document.querySelector('meta[name="' + nome + '"]')
      return m ? m.getAttribute('content') : null
    }, META_LARGURA)
    if (cru == null) return null
    const n = Number(String(cru).trim())
    if (!Number.isFinite(n) || !Number.isInteger(n)) return null
    if (n < LARGURA_MIN || n > LARGURA_MAX) return null
    return n
  } catch {
    return null
  }
}

// tamanho real de um PNG, lido do cabeçalho do próprio arquivo (IHDR: largura no
// byte 16, altura no 20). É o número de verdade — não uma conta que pode arredondar.
function tamanhoDoPng(buf) {
  try {
    if (buf.length < 24) return null
    return { largura: buf.readUInt32BE(16), altura: buf.readUInt32BE(20) }
  } catch {
    return null
  }
}

// erro amigável (em português) quando o Chrome não é encontrado
export class ChromeAusenteError extends Error {}

// abre o Chrome do PC (sem download). Se newContext/newPage falhar DEPOIS do
// launch, fecha o browser pra não deixar processo órfão.
async function abrir(deviceScaleFactor, viewport) {
  let browser
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true })
  } catch (e1) {
    try {
      browser = await chromium.launch({ executablePath: CHROME_FALLBACK, headless: true })
    } catch (e2) {
      throw new ChromeAusenteError(
        'Não consegui abrir o Chrome para gerar os PNGs. Confira se o Google Chrome está instalado. '
        + '(' + (e1 && e1.message ? e1.message : String(e1)) + ')'
      )
    }
  }
  try {
    const context = await browser.newContext({ deviceScaleFactor, viewport })
    const page = await context.newPage()
    return { browser, page }
  } catch (err) {
    await browser.close().catch(() => {})   // nunca deixa Chrome órfão
    throw err
  }
}

// espera de verdade: rede parada (fontes web) + imagens + fontes prontas + respiro
async function esperarPronto(page) {
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.evaluate(async () => {
    await Promise.all(Array.from(document.images).map((img) =>
      img.complete ? 0 : new Promise((r) => {
        img.addEventListener('load', r, { once: true })
        img.addEventListener('error', r, { once: true })
      })
    ))
    if (document.fonts && document.fonts.ready) await document.fonts.ready
  })
  await page.waitForTimeout(800)
}

// marca os slides de TOPO (não aninhados): prefere .slide-wrapper; se não houver,
// usa .slide. Mesma prioridade do editor.html + exclusão de aninhados (como a
// engine da empresa) — evita contar slides em dobro.
async function marcarSlides(page) {
  return await page.evaluate((ATTR) => {
    document.querySelectorAll('[' + ATTR + ']').forEach((e) => e.removeAttribute(ATTR))
    const topo = (sel) => Array.from(document.querySelectorAll(sel)).filter((el) => {
      let p = el.parentElement
      while (p) { if (p.matches && p.matches(sel)) return false; p = p.parentElement }
      return true
    })
    let slides = topo('.slide-wrapper')
    if (!slides.length) slides = topo('.slide')
    slides.forEach((el, i) => el.setAttribute(ATTR, String(i)))
    return slides.length
  }, SLIDE_ATTR)
}

// mede TODOS os slides marcados (antes só o primeiro era medido, e o tamanho dele
// valia pra todo mundo — peça com um slide de tamanho diferente saía torta).
async function medirSlides(page) {
  return await page.evaluate((ATTR) => {
    const out = []
    document.querySelectorAll('[' + ATTR + ']').forEach((el) => {
      const i = Number(el.getAttribute(ATTR))
      const r = el.getBoundingClientRect()
      out[i] = { largura: r.width, altura: r.height }
    })
    return out
  }, SLIDE_ATTR)
}

// lista imagens que ficaram quebradas (referência não encontrada), pra avisar
async function imagensQuebradas(page) {
  return await page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => 'imagem não carregou: ' + (img.getAttribute('src') || '(sem src)'))
      .slice(0, 20)
  )
}

// remove qualquer tentativa de "subir de pasta" (../) — segurança ao gravar assets
function caminhoSeguro(p) {
  return String(p).replace(/\\/g, '/').replace(/^\/+/, '').split('/')
    .filter((parte) => parte && parte !== '..' && parte !== '.').join('/')
}

/**
 * Renderiza os slides de um HTML em PNGs de alta resolução.
 * @param {{ html: string, assets?: Array<{path:string, base64:string}> }} entrada
 * @returns {Promise<{ slides: Array<{nome:string, base64:string, largura?:number, altura?:number}>, avisos: string[] }>}
 */
export async function renderSlidesToPng({ html, assets = [] }) {
  if (!html || typeof html !== 'string') throw new Error('HTML vazio.')
  const dir = await mkdtemp(join(tmpdir(), 'sv-carousel-'))
  try {
    // grava as imagens/fontes no tempdir (mesma estrutura relativa do HTML)
    for (const a of assets) {
      if (!a || !a.path || typeof a.base64 !== 'string') continue
      const rel = caminhoSeguro(a.path)
      if (!rel) continue
      const full = join(dir, rel)
      await mkdir(dirname(full), { recursive: true })
      await writeFile(full, Buffer.from(a.base64, 'base64'))
    }
    const htmlPath = join(dir, 'slide.html')
    await writeFile(htmlPath, html, 'utf8')
    const fileUrl = pathToFileURL(htmlPath).href

    const avisos = []

    // 1) passada de medição: mede TODOS os slides (não só o primeiro) e lê a
    //    plaquinha da largura. Também é aqui que conferimos as imagens quebradas
    //    — isso não depende da ampliação, então basta uma vez.
    let medidas = []                 // [{largura, altura}] na ordem do documento
    let usouBody = false
    let larguraAlvo = TARGET_W       // o padrão de sempre (carrossel)
    {
      const { browser, page } = await abrir(1, { width: 1280, height: 1600 })
      try {
        await page.goto(fileUrl, { waitUntil: 'load' })
        await esperarPronto(page)
        const declarada = await larguraDeclarada(page)
        if (declarada) larguraAlvo = declarada
        avisos.push(...await imagensQuebradas(page))
        const n = await marcarSlides(page)
        if (n > 0) medidas = await medirSlides(page)
        // cai pra "página inteira" se não houver slide NENHUM aproveitável (antes o
        // teste era só no primeiro: uma peça cujo 1º slide estivesse escondido caía
        // no fallback mesmo tendo os outros bons)
        if (!medidas.some((m) => m && m.largura > 0 && m.altura > 0)) {
          // sem .slide: a página inteira vira 1 slide (usa a extensão ROLÁVEL)
          const b = await page.evaluate(() => ({
            largura: document.documentElement.scrollWidth || document.body.scrollWidth,
            altura: document.documentElement.scrollHeight || document.body.scrollHeight,
          }))
          medidas = [b]
          usouBody = true
        }
      } finally {
        await browser.close().catch(() => {})
      }
    }
    if (!medidas.length) throw new Error('Não encontrei nenhum slide no HTML.')

    // 2) agrupa os slides por TAMANHO (arredondado). Peça normal — todos os slides
    //    iguais, que é todo carrossel — vira UM grupo só, e aí o caminho é
    //    exatamente o de antes. Só peça misturada abre mais de um grupo.
    const grupos = new Map()
    medidas.forEach((m, i) => {
      if (!m || !(m.largura > 0) || !(m.altura > 0)) {
        avisos.push('slide ' + (i + 1) + ': tamanho inválido (' + (m ? m.largura + '×' + m.altura : 'sem medida') + ') — pulado')
        return
      }
      // medida quebrada (ex.: 1080,4 px) não tem como virar um PNG exato: a conta e a
      // janela passam a usar o arredondado, e o desencontro vira aviso em vez de um
      // PNG com 1 px a mais ou a menos sem ninguém saber.
      if (Math.abs(m.largura - Math.round(m.largura)) > 0.01 || Math.abs(m.altura - Math.round(m.altura)) > 0.01) {
        avisos.push('slide ' + (i + 1) + ': medida quebrada (' + m.largura.toFixed(2) + '×' + m.altura.toFixed(2)
          + ') — o PNG pode sair com 1 px de diferença. Use medidas em px inteiros.')
      }
      const w = Math.round(m.largura), h = Math.round(m.altura)
      const chave = w + 'x' + h
      if (!grupos.has(chave)) grupos.set(chave, { w, h, indices: [] })
      grupos.get(chave).indices.push(i)
    })
    if (!grupos.size) throw new Error('Não encontrei nenhum slide utilizável no HTML.')
    if (grupos.size > 1) {
      avisos.push('esta peça tem slides de ' + grupos.size + ' tamanhos diferentes ('
        + [...grupos.keys()].join(', ') + ') — cada tamanho foi fotografado com a ampliação dele.')
    }

    // 3) uma passada de foto por GRUPO de tamanho
    const slides = new Array(medidas.length).fill(null)
    for (const g of grupos.values()) {
      const bruto = larguraAlvo / g.w
      const dsf = Math.max(DSF_MIN, Math.min(DSF_MAX, bruto))
      if (bruto > DSF_MAX) {
        avisos.push('slide(s) de ' + g.w + 'px: a ampliação foi limitada em ' + DSF_MAX + '× (limite do Chrome), '
          + 'então o PNG sai com ' + Math.round(g.w * DSF_MAX) + 'px em vez dos ' + larguraAlvo + 'px pedidos.')
      }
      const { browser, page } = await abrir(dsf, { width: g.w, height: g.h })
      try {
        await page.goto(fileUrl, { waitUntil: 'load' })
        await esperarPronto(page)

        if (usouBody) {
          const buf = await page.screenshot({ type: 'png', fullPage: true })
          slides[0] = { nome: '01.png', base64: buf.toString('base64'), ...tamanhoDoPng(buf) }
          continue
        }

        await marcarSlides(page)
        // CONFERE a medida DENTRO desta janela: a passada de medição roda numa janela
        // de 1280×1600 e esta roda no tamanho do slide. Peça que usa medida relativa
        // (vw, %) muda de layout entre as duas — e aí o slide fotografado não é do
        // tamanho que foi medido. Antes isso passava calado.
        const conferido = await medirSlides(page)
        for (const i of g.indices) {
          const c = conferido[i]
          if (c && (Math.abs(Math.round(c.largura) - g.w) > 1 || Math.abs(Math.round(c.altura) - g.h) > 1)) {
            avisos.push('slide ' + (i + 1) + ': mudou de tamanho ao ser fotografado ('
              + g.w + '×' + g.h + ' → ' + Math.round(c.largura) + '×' + Math.round(c.altura)
              + '). Peças com medida relativa (vw/%) fazem isso; use px fixo.')
          }
          // um slide problemático vira AVISO — não derruba os outros (antes, um
          // slide escondido/quebrado perdia a geração inteira)
          try {
            const buf = await page.locator('[' + SLIDE_ATTR + '="' + i + '"]').screenshot({ type: 'png' })
            slides[i] = { nome: String(i + 1).padStart(2, '0') + '.png', base64: buf.toString('base64'), ...tamanhoDoPng(buf) }
          } catch (err) {
            avisos.push('slide ' + (i + 1) + ': não consegui fotografar (' + (err && err.message ? err.message.split('\n')[0] : err) + ')')
          }
        }
      } finally {
        await browser.close().catch(() => {})
      }
    }
    return { slides: slides.filter(Boolean), avisos }
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}
