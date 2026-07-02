// Render fiel de slides HTML -> PNG em alta resolução (2160×2700), usando o
// Chrome JÁ instalado no PC (via playwright-core, canal 'chrome' — sem baixar os
// ~150 MB do Chromium). Versão enxuta espelhando a engine do sistema da empresa.
//
// Uso:  node scripts/gerar-png.mjs <arquivo.html> [pasta-de-saida]
//
// Como funciona (em 2 passadas, igual a engine da empresa):
//   1) mede o tamanho real do slide na tela;
//   2) reabre com a "escala retina" certa pra o print sair com 2160px de largura,
//      espera as FONTES e as IMAGENS carregarem, e fotografa cada .slide.

import { chromium } from 'playwright-core'
import { mkdir } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve, join } from 'node:path'

const TARGET_W = 2160            // 2× de 1080 (Instagram 4:5 = 1080×1350 → 2160×2700)
const SLIDE_SEL = '.slide-wrapper, .slide'
const CHROME_FALLBACK = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const htmlArg = process.argv[2]
const outArg = process.argv[3] || 'png-saida'
if (!htmlArg) {
  console.error('uso: node scripts/gerar-png.mjs <arquivo.html> [pasta-de-saida]')
  process.exit(1)
}
const htmlPath = resolve(htmlArg)
const outDir = resolve(outArg)
const fileUrl = pathToFileURL(htmlPath).href

// abre o Chrome do PC (sem download); se o canal 'chrome' falhar, usa o caminho padrão
async function abrir(deviceScaleFactor, viewport) {
  let browser
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true })
  } catch {
    browser = await chromium.launch({ executablePath: CHROME_FALLBACK, headless: true })
  }
  const context = await browser.newContext({ deviceScaleFactor, viewport })
  const page = await context.newPage()
  return { browser, page }
}

// espera de verdade: todas as imagens + as fontes carregadas + um respiro
async function esperarPronto(page) {
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

// 1) passada de medição
const medir = await abrir(1, { width: 1280, height: 1600 })
await medir.page.goto(fileUrl, { waitUntil: 'load' })
await esperarPronto(medir.page)
const box = await medir.page.locator(SLIDE_SEL).first().boundingBox()
await medir.page.context().browser().close()
if (!box || box.width <= 0) {
  console.error('Nenhum elemento .slide / .slide-wrapper encontrado no HTML.')
  process.exit(1)
}

// 2) passada de render em alta resolução
const dsf = Math.max(1, TARGET_W / box.width)
const rend = await abrir(dsf, { width: Math.ceil(box.width), height: Math.ceil(box.height) })
await rend.page.goto(fileUrl, { waitUntil: 'load' })
await esperarPronto(rend.page)
await mkdir(outDir, { recursive: true })

const slides = rend.page.locator(SLIDE_SEL)
const n = await slides.count()
for (let i = 0; i < n; i++) {
  const nome = String(i + 1).padStart(2, '0') + '.png'
  await slides.nth(i).screenshot({ path: join(outDir, nome), type: 'png' })
  console.log('gerado', nome)
}
await rend.page.context().browser().close()
console.log(`OK: ${n} slide(s) @ escala ${dsf.toFixed(2)}× -> ${outDir}`)
