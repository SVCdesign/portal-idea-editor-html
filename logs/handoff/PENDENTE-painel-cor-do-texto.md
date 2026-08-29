# 🎨 PENDENTE — painel "Cor do texto" (código guardado, NÃO está no editor)

> **Criado em:** 2026-08-09, na consolidação para troca de PC.
> **Estado:** ⏸️ **aguardando o "vai" do Carlos.** A Prévia A foi **remontada em 2026-08-29**
> (ver o bloco "ATUALIZAÇÃO 2026-08-29" logo abaixo) — agora ela também pinta **texto de
> desenho (SVG)**, e os pontos de encaixe da receita mudaram porque o painel de
> Transparência foi removido do editor nesse mesmo dia.
> **Por que este arquivo existe:** a prévia vivia em `previas/`, que é **local-only**
> (está no `.gitignore`) — ou seja, **não viaja na troca de PC**. Sem este arquivo, o
> código se perderia e a próxima IA teria que reescrever do zero.

---

## O que é
Um painel que deixa o Carlos **mudar a cor de qualquer texto** da peça: um seletor livre
(a paleta do sistema) + **atalhos com as cores que a própria peça já usa** (lidos da
página, não uma paleta genérica) + **"aplicar em todas as páginas"** + voltar ao original.

**Detalhe que importa:** a cor é **herdada**. Clicar no título pinta só o título; clicar
na caixa que contém o título e o parágrafo pinta os dois juntos. Isso é intencional.

## Como estava sendo avaliado
A Prévia A ficava em `previas/previa-cor-do-texto.html` — uma **cópia do `editor.html`**
com este painel dentro e um exemplo de 3 páginas de livrinho já carregado, para o Carlos
clicar e testar sem abrir pasta nenhuma. **Essa prévia não viaja** — se ele quiser vê-la
de novo no PC novo, é só recriar: copiar o `editor.html`, colar os 3 blocos abaixo nos
lugares indicados, e trocar o `SAMPLE`.

## O que já foi testado (na prévia, no navegador)
- painel aparece **junto** com o "Ajustar texto" (não no lugar dele)
- leu a cor certa do elemento (`#3a2415`)
- os atalhos vieram **da peça**: `#3a2415`, `#7b6048`, `#fff8ea`
- cor livre pintou **só o título**; o parágrafo manteve a cor dele
- aplicar em todas: *"pintei 2 elementos, em 2 páginas (1 já estava assim)"*
- os 3 títulos ficaram na mesma cor · **0 erro de JS**

## ⚠️ O que FALTA antes de entrar no editor de verdade
1. **O Carlos aprovar** (ele estava testando a prévia quando a sessão virou).
2. Perguntar a ele: **"quer auditoria antes?"** (regra do mundo, nunca pular).
3. Aplicar no `editor.html`, testar **e rodar a regressão do carrossel**
   (peça de cliente: abrir pasta → editar → Salvar limpo → Gerar PNG 2160×2700).

---

# ⚠️ ATUALIZAÇÃO 2026-08-29 — leia ANTES de usar a receita abaixo

A receita foi conferida contra o editor de hoje. **Ela ainda serve** (todas as funções de apoio
existem, o "aplicar em todas" traz o próprio motorzinho e não depende de nada removido, e nenhum
nome bate com o que já existe). Mudaram **três coisas**:

**1. Os pontos de encaixe.** O painel de Transparência **foi removido do editor em 2026-08-29**, então
"antes do bloco da Transparência" não existe mais:
- o **HTML** entra **logo depois** do bloco do Brilho (`<div id="bokehtools">…</div>`);
- na amarração **(c)**, acrescente depois da linha do **`bokehToolsEl`** (não do `transpToolsEl`).

**2. Texto de DESENHO (SVG) — decisão do Carlos: o painel TEM que pintar isso também.**
A receita original mostrava o painel para qualquer coisa com texto, mas pintava só com `color`.
Texto de desenho não se pinta com `color`, e sim com `fill` — **provado no navegador**: mudar
`color` num `<text>` de SVG não muda nada na tela. O painel apareceria sem funcionar. As mudanças,
todas dentro do bloco 3 (JS):
```js
// (i) reconhecer o desenho (usa a função que o editor já tem, com teste de reserva)
const ehDesenho = (el) => (typeof isSvgText === 'function') ? isSvgText(el)
  : (!!el && el.namespaceURI === 'http://www.w3.org/2000/svg' && (el.tagName === 'text' || el.tagName === 'tspan'));

// (ii) LER a cor pelo caminho certo (substitui o paraHex(getComputedStyle(el).color) solto)
function corDe(el){ if(!el) return null; const s = getComputedStyle(el);
  return paraHex(ehDesenho(el) ? s.fill : s.color); }

// (iii) PINTAR pelo caminho certo (dentro de pintar()):
if(ehDesenho(el)) el.style.fill = hex; else el.style.color = hex;

// (iv) VOLTAR AO ORIGINAL limpa os dois (dentro do bReset), pra não sobrar meia-pintura:
el.style.removeProperty('color'); el.style.removeProperty('fill');
```
Em `coresDaPeca` e em `__corSync`, trocar as leituras de cor por `corDe(...)` — assim os atalhos
também enxergam as cores dos desenhos.

**3. O que foi testado na Prévia A remontada** (`previas/previa-cor-do-texto.html`, exemplo de 3
páginas já embutido, com um selo em SVG na página 3):
- painel aparece junto do "Ajustar texto"; leu `#1b2a4a` do título ✅
- atalhos vieram da peça: `#1b2a4a`, `#7b6048`, `#e2653a` (esse último é do **desenho**) ✅
- pintar o título mudou só ele; o parágrafo ao lado ficou intacto ✅
- **texto de desenho:** leu `#e2653a`, pintou de verde, e o aviso explicou o caso ✅
- "voltar ao original" devolveu a cor de origem e **apagou o `style` inteiro** ✅
- "aplicar em todas": *"pintei 2 elementos, em 2 páginas (1 já estava assim)"*, 3 títulos iguais ✅
- **Desfazer** voltou só a última ação ✅ · **0 erro de JS** ✅
- **salvar sai limpo:** o HTML final tinha só os dois estilos de cor e **nenhuma marca do editor** ✅

⚠️ **A prévia não viaja** (`previas/` é local-only). Pra remontá-la noutro PC: copie o `editor.html`,
cole os 3 blocos nos lugares corrigidos acima, aplique as 4 amarrações e troque o `SAMPLE`.
**Cuidado com uma armadilha:** o `editor.html` tem **DOIS** `</body>` — um dentro do exemplo (que é
só texto) e o de verdade, no fim. O bloco 3 vai no **último**; no primeiro, ele some junto com o
exemplo quando você trocar o `SAMPLE`. (Caí nessa ao montar a prévia — o painel aparecia e não
funcionava.)

---

# Os 3 blocos, prontos para colar

## 1) HTML — vai ANTES do bloco `<!-- 🫧 TRANSPARÊNCIA ... -->`
```html
        <!-- 🎨 COR DO TEXTO (NOVIDADE EM PRÉVIA) — aparece junto com os outros painéis.
             A cor é herdada pelos filhos, então dá pra pintar o cartão inteiro de uma vez
             (clicando na caixa) ou só o título (clicando no título). -->
        <div id="cortools" class="tools" hidden>
          <div class="tlabel">🎨 Cor do texto — escolha livre, ou um atalho das cores que a peça já usa:</div>
          <div class="tgrid">
            <label class="ov-pick" title="abrir a paleta e escolher qualquer cor"><input type="color" id="cor-picker" value="#3a2415"> escolher cor</label>
            <span class="sep"></span>
            <span class="ov-lab">Da peça:</span>
            <span id="cor-atalhos" class="cor-atalhos"></span>
          </div>
          <div class="tgrid" style="margin-top:10px">
            <button id="cor-todas" title="pinta com esta cor todos os elementos iguais, em todas as páginas">📄 Aplicar em todas as páginas</button>
            <span class="sep"></span>
            <button id="cor-reset">↺ Voltar ao original</button>
            <span class="hint" id="cor-aviso"></span>
          </div>
        </div>
```

## 2) CSS — vai ANTES da linha `.ov-sliders{...}`
```css
  /* atalhos de cor: bolinhas com as cores que a peça já usa */
  .cor-atalhos{display:inline-flex;gap:6px;flex-wrap:wrap;align-items:center}
  .cor-at{width:26px;height:26px;min-width:26px;padding:0;border-radius:50%;
          border:2px solid var(--line);cursor:pointer}
  .cor-at:hover{border-color:var(--ink)}
  .cor-at.primary{border-color:var(--accent);box-shadow:0 0 0 2px rgba(43,196,196,.35)}
```

## 3) JS — vai no FIM do arquivo, antes de `</body>`
```html
<script>
/* ---- 🎨 COR DO TEXTO: escolha livre + atalhos com as cores que a peça já usa ----
   A cor é HERDADA pelos filhos: pintar a caixa pinta o título e o parágrafo juntos;
   pintar só o título pinta só ele. Os atalhos são lidos da própria peça, então são
   sempre as cores daquele trabalho — não uma paleta genérica. */
(function(){
  const picker  = document.getElementById('cor-picker');
  const atalhos = document.getElementById('cor-atalhos');
  const bTodas  = document.getElementById('cor-todas');
  const bReset  = document.getElementById('cor-reset');
  const avisoEl = document.getElementById('cor-aviso');
  let antes = null;

  const alvo = () => (typeof selected !== 'undefined' ? selected : null);
  const avisar = (t) => { if(avisoEl) avisoEl.textContent = t || ''; };
  const hex2 = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');

  // "rgb(58, 36, 21)" -> "#3a2415" (o <input type=color> só entende hexadecimal)
  function paraHex(cor){
    const m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(cor || '');
    if(!m) return null;
    return '#' + hex2(+m[1]) + hex2(+m[2]) + hex2(+m[3]);
  }

  // as cores que a peça JÁ usa: varre os textos do slide atual (e, se for pouco,
  // o resto da peça) e devolve as mais frequentes, sem repetir.
  function coresDaPeca(el){
    const doc = iframe.contentDocument; if(!doc) return [];
    const raiz = (typeof slideOf === 'function' && slideOf(el)) || doc.body;
    const conta = new Map();
    const olhar = (escopo) => {
      escopo.querySelectorAll('*').forEach(n => {
        if(!(n.textContent || '').trim()) return;
        if(n.children.length && !Array.from(n.childNodes).some(c => c.nodeType === 3 && c.textContent.trim())) return;
        const h = paraHex(getComputedStyle(n).color);
        if(h) conta.set(h, (conta.get(h) || 0) + 1);
      });
    };
    olhar(raiz);
    if(conta.size < 3 && doc.body) olhar(doc.body);
    return [...conta.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(e => e[0]);
  }

  function marcar(hex){
    atalhos.querySelectorAll('.cor-at').forEach(b => b.classList.toggle('primary', b.dataset.cor === hex));
  }

  function pintar(el, hex){
    const antesDoStyle = el.getAttribute('style') || '';
    el.style.color = hex;
    return (el.getAttribute('style') || '') !== antesDoStyle;
  }

  window.__corSync = function(el){
    if(!el) return;
    const atual = paraHex(getComputedStyle(el).color) || '#000000';
    picker.value = atual;
    atalhos.innerHTML = '';
    coresDaPeca(el).forEach(h => {
      const b = document.createElement('button');
      b.className = 'cor-at'; b.dataset.cor = h; b.style.background = h;
      b.title = 'usar ' + h;
      atalhos.appendChild(b);
    });
    marcar(atual);
    avisar('');
  };

  function grab(){ if(antes == null && typeof snapshotHtml === 'function') antes = snapshotHtml(); }
  function commit(){
    if(antes == null) return;
    const now = (typeof snapshotHtml === 'function') ? snapshotHtml() : null;
    if(now !== null && now !== antes && typeof pushHistory === 'function') pushHistory(antes);
    antes = null;
  }

  picker.addEventListener('pointerdown', grab);
  picker.addEventListener('input', () => {
    const el = alvo(); if(!el) return;
    grab();                                   // a paleta do sistema não dispara pointerdown
    pintar(el, picker.value);
    marcar(picker.value);
    if(typeof refreshCodeBox === 'function') refreshCodeBox();
  });
  picker.addEventListener('change', commit);
  picker.addEventListener('blur', commit);

  atalhos.addEventListener('click', (ev) => {
    const b = ev.target.closest('.cor-at'); if(!b) return;
    const el = alvo(); if(!el) return;
    comHistorico(() => { pintar(el, b.dataset.cor); });
    picker.value = b.dataset.cor;
    marcar(b.dataset.cor);
    if(typeof refreshCodeBox === 'function') refreshCodeBox();
  });

  // mesmo critério do painel de transparência: mesma etiqueta + mesmas classes
  function seletorDe(el){
    const cls = Array.from(el.classList).filter(c => c.indexOf('__ya_') !== 0);
    if(!cls.length) return null;
    const esc = (c) => (window.CSS && CSS.escape) ? CSS.escape(c) : c;
    return el.tagName.toLowerCase() + '.' + cls.map(esc).join('.');
  }

  bTodas.addEventListener('click', () => {
    const el = alvo(); if(!el) return;
    const sel = seletorDe(el);
    if(!sel){ avisar('este elemento não tem classe pra eu reconhecer nas outras páginas — pinte um por um.'); return; }
    const doc = iframe.contentDocument; if(!doc) return;
    let paginas = (typeof slideList === 'function' && slideList().length) ? slideList() : [doc.body];
    const hex = picker.value;
    let n = 0, tocadas = 0, iguais = 0, achados = 0;
    comHistorico(() => {
      for(const s of paginas){
        let mexeu = false;
        s.querySelectorAll(sel).forEach(e => {
          achados++;
          if(pintar(e, hex)){ n++; mexeu = true; } else { iguais++; }
        });
        if(mexeu) tocadas++;
      }
    });
    if(typeof refreshCodeBox === 'function') refreshCodeBox();
    if(!achados){ avisar('não achei nenhum elemento igual nas outras páginas.'); return; }
    avisar(n
      ? '✅ pintei ' + n + (n === 1 ? ' elemento' : ' elementos') + ', em ' + tocadas
        + (tocadas === 1 ? ' página' : ' páginas')
        + (iguais ? ' (' + iguais + ' já estava' + (iguais > 1 ? 'm' : '') + ' assim)' : '')
        + '. Um ↩ Desfazer volta tudo.'
      : 'achei ' + achados + (achados === 1 ? ' elemento igual, mas ele já estava' : ' elementos iguais, mas já estavam')
        + ' nessa cor — nada mudou.');
  });

  bReset.addEventListener('click', () => {
    const el = alvo(); if(!el) return;
    comHistorico(() => {
      el.style.removeProperty('color');
      if(el.getAttribute('style') === '') el.removeAttribute('style');
    });
    window.__corSync(el);
    if(typeof refreshCodeBox === 'function') refreshCodeBox();
    avisar('voltou à cor original.');
  });
})();
</script>
```

---

# As 4 amarrações no código existente
Sem estas, o painel não aparece. São as mesmas 4 que o painel de Transparência usa:

```js
// (a) junto dos outros refs de painel:
const corToolsEl = document.getElementById('cortools');

// (b) dentro de hideAllTools(): acrescentar
corToolsEl.hidden = true;

// (c) dentro de showToolsFor(el): acrescentar depois da linha do transpToolsEl
//     cor do texto: só faz sentido onde HÁ texto (a cor é herdada, então vale tanto no
//     título quanto na caixa que o contém). Foto, película e brilho ficam de fora.
const comTexto = !!(el && !img && !ovl && !bok && (el.textContent || '').trim());
corToolsEl.hidden = !comTexto;

// (d) no fim de showToolsFor(el):
if(comTexto && window.__corSync) window.__corSync(el);
```
