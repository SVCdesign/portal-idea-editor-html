// Monta o LIVRINHO ANIMADO a partir da peça EDITADA no Editor HTML.
// A peça editada é a fonte da verdade: este script só LÊ dela e embrulha as
// páginas na máquina de virar folha. Nenhuma edição é redigitada — as páginas
// entram inteiras, com o CSS original, então tudo o que o Carlos ajustou vai junto.
import { readFile, writeFile, mkdir } from 'node:fs/promises'

const ENTRADA = 'D:/00- CODIGO/matrix-editor-reference/molde-livrinho-14x21.html'
const SAIDA   = 'D:/00- CODIGO/livrinho-o-trem-das-aguas-PARA-ENVIAR'
const TITULO  = 'O Trem das Águas — São Lourenço'

const bruto = await readFile(ENTRADA, 'utf8')

// ---- 1) o CSS da peça, sem as regras de BODY (que estilizariam a janela do livro)
let css = (bruto.match(/<style>([\s\S]*?)<\/style>/) || [, ''])[1]
css = css.replace(/(^|\n)\s*html\s*,\s*body\s*\{[^}]*\}/g, '')
         .replace(/(^|\n)\s*body\s*\{[^}]*\}/g, '')

// ---- 2) as páginas, inteiras, na ordem
const paginas = bruto.match(/<section class="slide[\s\S]*?<\/section>/g) || []
if (paginas.length < 2) throw new Error('Não achei as páginas na peça. Achei ' + paginas.length + '.')
const capa = paginas[0]
const miolo = paginas.slice(1)
console.log('páginas lidas: capa + ' + miolo.length + ' de miolo')

const fonte = miolo.map((p, i) => '  <div class="lv-pagina" data-n="' + (i + 1) + '">' + p + '</div>').join('\n')

const doc = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${TITULO}</title>
<style>
/* ================= CSS COPIADO DA PEÇA EDITADA — não mexer ================= */
${css}
/* ================= o livrinho (tudo com prefixo lv-) ================= */
*{box-sizing:border-box}
html,body{margin:0;padding:0;height:100%}
body{
  background:
    radial-gradient(circle at 15% 12%, rgba(139,196,222,.20), transparent 32%),
    radial-gradient(circle at 85% 8%, rgba(239,128,108,.18), transparent 30%),
    linear-gradient(160deg,#2a1d13 0%,#1a1109 60%,#241a12 100%);
  font-family:Georgia,"Times New Roman",serif; color:#f3e6d2;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:10px; padding:10px; overflow:hidden;
}
.lv-palco{display:flex;flex-direction:column;align-items:center;gap:10px}
.lv-rodape{display:flex;flex-direction:column;align-items:center;gap:6px}
.lv-livro{
  position:relative;
  width:calc(1696px * var(--k)); height:calc(1264px * var(--k));
  perspective:2600px;
  transition:transform .9s cubic-bezier(.2,.72,.16,1);
}
.lv-livro.fechado{transform:translateX(calc(-424px * var(--k)))}
.lv-miolo{position:absolute;inset:0;display:flex;border-radius:8px;overflow:hidden;
  box-shadow:0 30px 70px rgba(0,0,0,.55);
  opacity:1;transition:opacity .45s ease .30s}
/* com o livro FECHADO o miolo não pode aparecer atrás da capa — senão parece que
   o livro já está aberto e a capa é só um adesivo por cima */
.lv-livro.fechado .lv-miolo{opacity:0;transition:opacity .15s ease}
.lv-folha{position:relative;width:calc(848px * var(--k));height:calc(1264px * var(--k));
  overflow:hidden;background:#f0dcc0}
.lv-pagina{width:848px;height:1264px;transform-origin:top left;transform:scale(var(--k))}
/* o vinco do meio e os grampos */
.lv-vinco{position:absolute;top:0;bottom:0;left:50%;width:calc(26px * var(--k));
  transform:translateX(-50%);z-index:6;pointer-events:none;
  background:linear-gradient(90deg,rgba(0,0,0,.30),rgba(0,0,0,.06) 35%,rgba(255,255,255,.14) 50%,rgba(0,0,0,.08) 65%,rgba(0,0,0,.28))}
.lv-grampos{position:absolute;top:24%;bottom:24%;left:50%;z-index:7;
  width:calc(16px * var(--k));transform:translateX(-50%);
  display:flex;flex-direction:column;justify-content:space-between;pointer-events:none}
.lv-grampos span{width:100%;height:calc(58px * var(--k));border-radius:999px;
  border:1px solid rgba(70,58,46,.55);
  background:linear-gradient(90deg,rgba(255,255,255,.8),rgba(120,112,104,.45))}
/* a folha que gira */
.lv-virando{position:absolute;top:0;right:0;width:calc(848px * var(--k));height:100%;
  z-index:12;transform-style:preserve-3d;transform-origin:left center;
  pointer-events:none;display:none}
.lv-virando.frente{display:block;animation:lvFrente 780ms cubic-bezier(.3,.68,.18,1) forwards}
.lv-virando.tras{display:block;left:0;right:auto;transform-origin:right center;
  animation:lvTras 780ms cubic-bezier(.3,.68,.18,1) forwards}
@keyframes lvFrente{from{transform:rotateY(0)}to{transform:rotateY(-180deg)}}
@keyframes lvTras{from{transform:rotateY(0)}to{transform:rotateY(180deg)}}
.lv-face{position:absolute;inset:0;overflow:hidden;background:#f0dcc0;
  backface-visibility:hidden;box-shadow:-18px 0 30px rgba(0,0,0,.28)}
.lv-face.verso{transform:rotateY(180deg)}
/* a capa */
.lv-capa{position:absolute;top:0;right:0;width:calc(848px * var(--k));height:100%;
  z-index:20;transform-origin:left center;transform-style:preserve-3d;
  backface-visibility:hidden;border-radius:0 8px 8px 0;overflow:hidden;
  box-shadow:0 30px 70px rgba(0,0,0,.6);
  transition:transform 1.05s cubic-bezier(.2,.72,.16,1), box-shadow 1.05s ease}
.lv-livro.aberto .lv-capa{transform:rotateY(-172deg);box-shadow:-14px 20px 40px rgba(0,0,0,.3);pointer-events:none}
.lv-abrir{position:absolute;left:50%;bottom:calc(150px * var(--k));transform:translateX(-50%);
  z-index:3;border:0;border-radius:999px;padding:14px 26px;cursor:pointer;
  font:800 17px system-ui,sans-serif;color:#3a2415;background:#fff8ea;
  box-shadow:0 10px 26px rgba(0,0,0,.45)}
.lv-abrir:hover{background:#fff}
/* zonas de clique pra virar */
.lv-zona{position:absolute;top:0;height:100%;width:50%;z-index:10;cursor:pointer}
.lv-zona.esq{left:0}
.lv-zona.dir{right:0}
/* controles */
.lv-controles{display:flex;align-items:center;gap:12px}
.lv-controles button{border:0;border-radius:999px;padding:10px 20px;cursor:pointer;
  font:800 15px system-ui,sans-serif;color:#fff8ea;background:#5a3a24;
  box-shadow:0 8px 20px rgba(0,0,0,.4)}
.lv-controles button:hover:not(:disabled){background:#6d4830}
.lv-controles button:disabled{opacity:.35;cursor:default}
.lv-status{min-width:170px;text-align:center;font:700 15px system-ui,sans-serif;color:#f3e6d2}
.lv-tela{background:#3d2818 !important;font-size:14px !important;padding:10px 16px !important}
.lv-dica{font:400 13px system-ui,sans-serif;color:rgba(243,230,210,.55);text-align:center}
</style>
</head>
<body>

<div class="lv-palco">
  <div class="lv-livro fechado" id="livro" style="--k:.5">
    <div class="lv-miolo" id="miolo">
      <div class="lv-folha" id="folhaEsq"></div>
      <div class="lv-folha" id="folhaDir"></div>
      <div class="lv-vinco"></div>
      <div class="lv-grampos"><span></span><span></span></div>
    </div>
    <div class="lv-virando" id="virando"></div>
    <div class="lv-zona esq" id="zonaEsq" hidden></div>
    <div class="lv-zona dir" id="zonaDir" hidden></div>
    <div class="lv-capa" id="capa">
      <div class="lv-pagina">${capa}</div>
      <button class="lv-abrir" id="abrir" type="button">Abrir o livro</button>
    </div>
  </div>

  <div class="lv-rodape" id="rodape">
    <div class="lv-controles">
      <button id="voltar" type="button" disabled>◀ Voltar</button>
      <span class="lv-status" id="status">Capa</span>
      <button id="virar" type="button">Virar página ▶</button>
      <button id="tela" class="lv-tela" type="button">🖥️ Tela cheia</button>
    </div>
    <div class="lv-dica">Clique em <b>Tela cheia</b> para o livro ficar bem maior. Você também pode
      clicar na página, ou usar as setas ← → do teclado.</div>
  </div>
</div>

<!-- as páginas do miolo, guardadas aqui e usadas pelo livro -->
<div id="fonte" hidden>
${fonte}
</div>

<script>
(function(){
  const total = ${miolo.length};
  const fonte = document.getElementById('fonte');
  const livro = document.getElementById('livro');
  const folhaEsq = document.getElementById('folhaEsq');
  const folhaDir = document.getElementById('folhaDir');
  const virando = document.getElementById('virando');
  const status = document.getElementById('status');
  const bVoltar = document.getElementById('voltar');
  const bVirar = document.getElementById('virar');
  const zonaEsq = document.getElementById('zonaEsq');
  const zonaDir = document.getElementById('zonaDir');

  let dupla = 0;                                  // 0 = páginas 1 e 2
  const ultima = Math.ceil(total / 2) - 1;
  let aberto = false, girando = false;

  const pagina = (n) => {                          // n = 1..total
    const el = fonte.querySelector('[data-n="' + n + '"]');
    return el ? el.innerHTML : '';
  };
  const molde = (n) => n >= 1 && n <= total
    ? '<div class="lv-pagina">' + pagina(n) + '</div>' : '';

  function desenhar(){
    const e = dupla * 2 + 1, d = e + 1;
    folhaEsq.innerHTML = molde(e);
    folhaDir.innerHTML = molde(d);
    bVoltar.disabled = !aberto || girando;
    bVirar.disabled = !aberto || girando || dupla >= ultima;
    if(!aberto){ status.textContent = 'Capa'; return; }
    status.textContent = d <= total ? ('Páginas ' + e + ' e ' + d) : ('Página ' + e);
  }

  function abrir(){
    if(aberto) return;
    aberto = true;
    livro.classList.remove('fechado');
    livro.classList.add('aberto');
    zonaEsq.hidden = false; zonaDir.hidden = false;
    setTimeout(desenhar, 260);
    desenhar();
  }

  function fechar(){
    aberto = false; dupla = 0;
    livro.classList.remove('aberto');
    livro.classList.add('fechado');
    zonaEsq.hidden = true; zonaDir.hidden = true;
    desenhar();
  }

  function virar(dir){
    if(!aberto || girando) return;
    if(dir < 0 && dupla === 0){ fechar(); return; }   // voltar da 1ª dupla = fechar o livro
    const alvo = dupla + dir;
    if(alvo < 0 || alvo > ultima) return;
    girando = true; desenhar();
    virando.className = 'lv-virando';
    if(dir > 0){
      virando.innerHTML = '<div class="lv-face">' + molde(dupla * 2 + 2) + '</div>'
                        + '<div class="lv-face verso">' + molde(alvo * 2 + 1) + '</div>';
      virando.classList.add('frente');
    }else{
      virando.innerHTML = '<div class="lv-face">' + molde(dupla * 2 + 1) + '</div>'
                        + '<div class="lv-face verso">' + molde(alvo * 2 + 2) + '</div>';
      virando.classList.add('tras');
    }
    setTimeout(() => {
      dupla = alvo; virando.className = 'lv-virando'; virando.innerHTML = '';
      girando = false; desenhar();
    }, 780);
  }

  // o livro cabe na janela: calcula a escala das páginas.
  // MEDE o rodapé de verdade em vez de reservar uma altura chutada — com barra de
  // favoritos aberta, o chute deixava o livro pequeno demais sem motivo.
  function encaixar(){
    const rodape = document.getElementById('rodape').offsetHeight || 70;
    const dispW = window.innerWidth - 24;
    const dispH = window.innerHeight - rodape - 32;
    const k = Math.min(dispW / 1696, dispH / 1264);
    livro.style.setProperty('--k', String(Math.max(.15, Math.min(1.3, k))));
  }

  // TELA CHEIA: é o que faz diferença de verdade — sem a barra do navegador sobra
  // muito mais altura, e a altura é o que limita o tamanho do livro.
  const bTela = document.getElementById('tela');
  bTela.addEventListener('click', () => {
    if(document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    bTela.textContent = document.fullscreenElement ? '🖥️ Sair da tela cheia' : '🖥️ Tela cheia';
    encaixar(); setTimeout(encaixar, 250);
  });

  document.getElementById('abrir').addEventListener('click', abrir);
  bVirar.addEventListener('click', () => virar(1));
  bVoltar.addEventListener('click', () => virar(-1));
  zonaDir.addEventListener('click', () => virar(1));
  zonaEsq.addEventListener('click', () => virar(-1));
  window.addEventListener('keydown', (ev) => {
    if(ev.key === 'ArrowRight') virar(1);
    if(ev.key === 'ArrowLeft') virar(-1);
    if((ev.key === 'Enter' || ev.key === ' ') && !aberto){ ev.preventDefault(); abrir(); }
  });
  window.addEventListener('resize', encaixar);
  encaixar(); desenhar();
})();
</script>
</body>
</html>
`

await mkdir(SAIDA, { recursive: true })
await mkdir(SAIDA + '/assets', { recursive: true })
await writeFile(SAIDA + '/O Trem das Aguas - livrinho.html', doc, 'utf8')
console.log('livrinho gravado em: ' + SAIDA)
