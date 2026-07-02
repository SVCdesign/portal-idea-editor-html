// Motorzinho local do Editor HTML (substitui o "python -m http.server").
// Faz DUAS coisas:
//   1) serve os arquivos do editor (editor.html etc.) em http://localhost:4599
//   2) atende o botão "Gerar PNG": recebe o slide + as imagens e chama o robô
//      (render-core.mjs), devolvendo os PNGs em alta resolução (2160×2700).
//
// Segurança: escuta SÓ em 127.0.0.1 (não aparece na rede), não serve arquivos
// sensíveis (.git, dotfiles, node_modules, código .mjs), confere a origem do POST
// e faz 1 render por vez. Tudo local — nada sai da máquina.

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize, sep, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderSlidesToPng, ChromeAusenteError } from './scripts/render-core.mjs'

const ROOT = dirname(fileURLToPath(import.meta.url))   // pasta do projeto
const HOST = '127.0.0.1'                                // SÓ local (não expõe na rede)
const PORT = 4599
const LIMITE_BYTES = 150 * 1024 * 1024                  // teto do envio (imagens): 150 MB

const MIME = {
  '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8',
}

let renderEmAndamento = false   // 1 render por vez (evita abrir vários Chromes)

// origem só pode ser este próprio servidor (bloqueia sites externos de dispararem)
function origemOk(req) {
  const o = req.headers.origin
  if (!o) return true   // fetch de mesma origem às vezes não manda Origin
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(o)
}

// bloqueia caminhos sensíveis: dotfiles (.git, .gitignore, .claude…), node_modules
// e o próprio código do servidor (.mjs). O navegador nunca precisa deles.
function caminhoBloqueado(urlPath, filePath) {
  const segs = urlPath.split('/').filter(Boolean)
  if (segs.some((s) => s.startsWith('.') || s === 'node_modules')) return true
  if (filePath.toLowerCase().endsWith('.mjs')) return true
  return false
}

function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let tamanho = 0
    req.on('data', (c) => {
      tamanho += c.length
      if (tamanho > LIMITE_BYTES) { reject(new Error('As imagens ficaram grandes demais para enviar. Reduza o tamanho das fotos e tente de novo.')); req.destroy() }
      else chunks.push(c)
    })
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function responderJson(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
  res.end(JSON.stringify(obj))
}

const server = createServer(async (req, res) => {
  try {
    // ---- rota do botão "Gerar PNG" ----
    if (req.method === 'POST' && (req.url === '/gerar-png' || req.url.startsWith('/gerar-png?'))) {
      if (!origemOk(req)) { responderJson(res, 403, { ok: false, erro: 'origem não permitida' }); return }
      if (renderEmAndamento) { responderJson(res, 429, { ok: false, erro: 'Já tem uma geração em andamento. Espere ela terminar.' }); return }
      renderEmAndamento = true
      try {
        const corpo = JSON.parse((await lerCorpo(req)).toString('utf8'))
        const { slides, avisos } = await renderSlidesToPng({ html: corpo.html, assets: corpo.assets || [] })
        responderJson(res, 200, { ok: true, slides, avisos })
      } finally {
        renderEmAndamento = false
      }
      return
    }

    // ---- arquivos do editor (estáticos) ----
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end('método não permitido'); return }
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0])
    if (urlPath === '/') urlPath = '/editor.html'
    const filePath = normalize(join(ROOT, urlPath))
    // trava anti "subir de pasta": só serve o que está DENTRO do projeto
    if (filePath !== ROOT && !filePath.startsWith(ROOT + sep)) { res.writeHead(403); res.end('proibido'); return }
    if (caminhoBloqueado(urlPath, filePath)) { res.writeHead(404); res.end('não encontrado'); return }

    const info = await stat(filePath).catch(() => null)
    if (!info || !info.isFile()) { res.writeHead(404); res.end('não encontrado'); return }
    // lê ANTES de mandar o cabeçalho (se falhar, ainda dá pra responder 500)
    const data = await readFile(filePath)
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' })
    if (req.method === 'HEAD') { res.end(); return }
    res.end(data)
  } catch (err) {
    const msg = err instanceof ChromeAusenteError
      ? err.message
      : String(err && err.message ? err.message : err)
    console.error('[server] erro:', msg)
    if (!res.headersSent) responderJson(res, 500, { ok: false, erro: msg })
    else res.destroy()
  }
})

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error('\n  A porta ' + PORT + ' ja esta em uso — o editor talvez ja esteja aberto.')
    console.error('  Feche a outra janela preta (ou rode Desligar-Editor-HTML.bat) e tente de novo.\n')
  } else {
    console.error('\n  Erro ao iniciar o servidor: ' + (err && err.message ? err.message : err) + '\n')
  }
  process.exit(1)
})

server.listen(PORT, HOST, () => {
  console.log('')
  console.log('  ==================================================')
  console.log('     EDITOR HTML — rodando (com Gerar PNG)')
  console.log('  ==================================================')
  console.log('')
  console.log('  Abra no navegador:  http://localhost:' + PORT + '/editor.html')
  console.log('  Para DESLIGAR: feche esta janela (ou Ctrl+C).')
  console.log('')
})
