// Motor de render reaproveitável: recebe um HTML + as imagens/fontes (em memória)
// e devolve os PNGs de cada slide em alta resolução (2160 de largura = 2× do 1080
// do Instagram). Usa o Chrome JÁ instalado no PC (playwright-core, canal 'chrome')
// — sem baixar o Chromium de ~150 MB. Espelha a engine do sistema da empresa.

import { chromium } from 'playwright-core'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

const TARGET_W = 2160                 // 2× de 1080 (Instagram 4:5 → 2160×2700)
const CHROME_FALLBACK = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const SLIDE_ATTR = 'data-sv-slide'    // marca interna dos slides de topo (some no fim)

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

// lista imagens que ficaram quebradas (referência não encontrada), pra avisar
async function imagensQuebradas(page) {
  return await page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.getAttribute('src') || '(sem src)')
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
 * @returns {Promise<{ slides: Array<{nome:string, base64:string}>, avisos: string[] }>}
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

    // 1) passada de medição: tamanho real do primeiro slide (ou da página toda)
    let box = null
    let usouBody = false
    {
      const { browser, page } = await abrir(1, { width: 1280, height: 1600 })
      try {
        await page.goto(fileUrl, { waitUntil: 'load' })
        await esperarPronto(page)
        const n = await marcarSlides(page)
        if (n > 0) box = await page.locator('[' + SLIDE_ATTR + ']').first().boundingBox()
        if (!box) {
          // sem .slide: a página inteira vira 1 slide (usa a extensão ROLÁVEL)
          box = await page.evaluate(() => ({
            width: document.documentElement.scrollWidth || document.body.scrollWidth,
            height: document.documentElement.scrollHeight || document.body.scrollHeight,
          }))
          usouBody = true
        }
      } finally {
        await browser.close().catch(() => {})
      }
    }
    if (!box || box.width <= 0) throw new Error('Não encontrei nenhum slide no HTML.')

    // 2) passada de render em alta resolução (escala pra dar ~2160px de largura)
    const dsf = Math.max(1, Math.min(8, TARGET_W / box.width))
    const slides = []
    let avisos = []
    {
      const { browser, page } = await abrir(dsf, { width: Math.ceil(box.width), height: Math.ceil(box.height) })
      try {
        await page.goto(fileUrl, { waitUntil: 'load' })
        await esperarPronto(page)
        avisos = await imagensQuebradas(page)

        if (usouBody) {
          const buf = await page.screenshot({ type: 'png', fullPage: true })
          slides.push({ nome: '01.png', base64: buf.toString('base64') })
        } else {
          await marcarSlides(page)
          const loc = page.locator('[' + SLIDE_ATTR + ']')
          const n = await loc.count()
          for (let i = 0; i < n; i++) {
            const buf = await loc.nth(i).screenshot({ type: 'png' })
            slides.push({ nome: String(i + 1).padStart(2, '0') + '.png', base64: buf.toString('base64') })
          }
        }
      } finally {
        await browser.close().catch(() => {})
      }
    }
    return { slides, avisos }
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}
