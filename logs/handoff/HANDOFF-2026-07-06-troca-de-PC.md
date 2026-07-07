# 🚚 HANDOFF — Troca de PC (2026-07-06)

> **O que é este arquivo:** um mapa **completo e minucioso** pra a próxima IA pegar este
> projeto num PC novo **sem se perder**. Escrito a pedido do Carlos ao trocar de PC.
> Complementa o `STATUS-AGORA.md` (retrato vivo) — este aqui é o **manual técnico + humano**.
>
> **Estado na entrega:** tudo desta sessão **commitado e no GitHub** (o vigia confirmou
> "IGUAL ao remoto"). Servidor local desligado. Sem bug conhecido em aberto.

---

## 0. BOOT no PC novo — faça nesta ordem

1. **Baixar o código:** na pasta do projeto, rode `git pull` (ou `node scripts/sync-guard.mjs boot`
   — o vigia diz se está atrasado/igual). Se disser ATRASADO, `git pull` antes de tudo.
2. **🟢 Google Drive VERDE:** confirme que o Drive terminou de sincronizar. As **imagens/fontes
   das peças** viajam pelo **Drive**, NÃO pelo Git. Causa #1 de PC desatualizado.
3. **Ler (nesta ordem):** este HANDOFF → `STATUS-AGORA.md` → `CLAUDE.md` →
   `memoria/LEIA-PRIMEIRO-BRIEFING.md`.
4. **Abrir o editor:** dois cliques em `Abrir-Editor-HTML.bat`. No **1º uso** ele instala sozinho
   o `node_modules` (a `playwright-core`, leve). Precisa ter **Node** instalado. Abre em
   `http://localhost:4599/editor.html`. **NÃO** abra o `editor.html` com duplo-clique (vira
   `file://` e o salvar/PNG/drag não funcionam).
5. **Desligar:** `Desligar-Editor-HTML.bat` (mira a porta 4599).

---

## 1. AS REGRAS DE OURO DO CARLOS (nunca quebrar)

- **Ele NÃO programa.** Traduza TODO termo técnico pra português comum (nome técnico **+**
  tradução humana, juntos). Antes de rodar comando, diga o que faz e se é seguro/reversível.
- **Aprovação obrigatória:** nada de criar/editar/instalar/publicar sem o **"vai"** explícito.
  Descreva → espere o sim → só então execute. Silêncio não é sim.
  - **Única exceção (pré-autorizada):** **publicar** no GitHub logo após uma implementação
    **bem-sucedida E testada no navegador**. Aí commita+empurra na hora, sem novo "salva".
- **Conversa antes de código:** "vamos conversar" / "trocar ideia" = **discutir, não implementar**.
- **Modo conversa (o jeito dele):** **UMA pergunta por vez**, respostas **curtas e objetivas**,
  linguagem **humana**. Não despeje informação nem faça enxurrada de perguntas.
- **MVP primeiro.** Comece enxuto, cresça guiado.
- **Prévia A vs B:** **A** = protótipo real navegável (alta fidelidade, pra testar de verdade);
  **B** = esboço simples só pra ilustrar. Ambas vivem em `previas/` (local-only, fora do Git; se
  não existir, crie). Abrem em `http://localhost:4599/previas/nome.html`.
- **Fluxo que ele gosta:** conversar → Prévia A → ele aprova ("vai") → aplico no `editor.html` →
  **testo no navegador** → publico. (Só diga que "funciona" DEPOIS de testar no navegador.)
- **Slide-mestre (regra atualizada em 2026-07-05):** a IA **PODE editar/replicar as peças do
  Carlos QUANDO ELE PEDIR** (ex.: acertar 1 slide e replicar nos iguais). Ver
  `Subsistemas/Fluxo do Subsistema Slide Mestre/LEIA-PRIMEIRO.md`.
- **Fim de cada chat:** atualize o `STATUS-AGORA.md` e repita os caminhos das pastas.
- **Guias espelhados:** `CLAUDE.md` = `GEMINI.md` = `AGENTS.md` (mudou um, replique nos três).

---

## 2. TROCA DE PC — o que viaja e o que NÃO

- **CÓDIGO + texto** (inclui `memoria/`, `Subsistemas/`, este handoff) → **viaja pelo Git**.
- **ASSETS pesados** (imagens/fontes/PNG/vídeo das peças) → **viajam pelo Google Drive**, NÃO pelo Git.
- **FORA do Git (local-only — recriar/copiar no PC novo):**
  - `node_modules/` → o `.bat` recria no 1º uso.
  - `previas/` → só rascunhos; recrie quando precisar.
  - `conversa-entre-mundos/` (pasta neutra em `D:\PORTAL IDEA\`) → copie à mão se mexeu (não
    mexemos nesta sessão).
  - `.codex/` → pasta local não versionada; se o Carlos precisar, leva à mão.
- **`.bat` estão em CRLF** (travado por `.gitattributes`). A ferramenta Write gera **LF** — se
  editar um `.bat`, **converta pra CRLF**, senão o duplo-clique não roda nada.
- **Motor:** o editor roda em **Node** (`server.mjs`), não Python. O `server.mjs` serve o editor
  **e** atende o "Gerar PNG" (chama `scripts/render-core.mjs`, um Chrome-robô via playwright-core).

---

## 3. O QUE O `editor.html` FAZ HOJE (estado atual, tudo testado)

O coração é **clicar num elemento na prévia → ver/editar o código dele ao vivo**. A peça é
renderizada de verdade num `<iframe srcdoc>` e **o CSS NUNCA é reprocessado** (gradiente, glow,
sombra, blend, fontes ficam 100% fiéis). Funcionalidades:

- **Abrir peça:** `📂 Abrir HTML` · `📁 Abrir pasta (com imagens)` · **arrastar-e-soltar a pasta**
  (novo — solte na tela) · `📋 Colar HTML` · `▶️ Exemplo`.
- **Navegação:** caminho clicável (crumb) + linha "Dentro:" (filhos) + barra `[1]…[N]` de slides.
- **Ajustar FOTO** (ao clicar num `<img>`): zoom, arrastar com o mouse, setas; sem-zoom usa
  `object-position`, com-zoom usa `transform` (uma fonte de verdade só). `↺ desfazer`.
- **Ajustar TEXTO:** `A−/A+` (tamanho), `◄/► caixa` (largura), `⤡ encaixar`, mover, e **editar no
  lugar** (2 cliques → digita direto; Shift+Enter = `<br>`; Enter/Esc terminam).
- **Centralizar** `↔/↕` + **arrastar com o mouse** + **linha-guia** rosa (imã no centro do slide;
  vive na moldura, não entra no arquivo).
- **🎚️ Escurecer/Clarear** (overlay/scrim): cor + barras topo/meio/baixo; escreve `linear-gradient`
  inline; "Atalhos da capa" pulam direto pra foto/película.
- **✨ Adicionar brilho** (bokeh): bolinha de luz inline, ajustável (tamanho/cor/intensidade/blur).
- **🧩 Painel de Camadas** (direita): lista os elementos do slide com nome humano; **clicar
  seleciona** (mesmo escondido atrás); **🔒 cadeado** trava e deixa arrastar sem pegar o vizinho;
  **👁 olho** esconde/mostra (o escondido **persiste** no salvo/PNG — estilo Photoshop).
- **🪟 Painéis que recolhem:** a direita são 3 seções (Camadas · Ajustes · Código); clicar no
  título recolhe; o estado fica no `localStorage` (`ya_sec_collapsed`).
- **↩ Desfazer** (Ctrl+Z, 30 passos) · **🗑 Remover** (Delete).
- **💾 Salvar** (direto na pasta se houver `dirHandle` de escrita; senão download) · **💾 Salvar
  como…** (janela nativa, lembra a última pasta).
- **🖼️ Gerar PNG** 2160×2700 por slide (robô local, 100% fiel), "Baixar tudo" = 1 `.zip`.

---

## 4. O QUE SAIU NESTA SESSÃO (2026-07-06) — ver detalhes no `STATUS-AGORA.md`

1. **🗂️ Organização por `Subsistemas/`** — cada fluxo/ferramenta grande vira uma pasta-casa
   própria. 1ª: `Fluxo do Subsistema Slide Mestre/` (padrão: `Fluxo do Subsistema [nome]`;
   próximo cogitado: SVG).
2. **🧩 Painel de Camadas completo** (3 passos: lista+selecionar / cadeado+arrastar / olho).
3. **🪟 Painéis que recolhem** (fim do aperto na coluna direita).
4. **🔍 Auditoria profunda** — 2 revisores (subagentes) + análise própria; **7 bugs corrigidos**
   (ver seção 6, "armadilhas").
5. **📁 Arrastar-e-soltar a pasta** no editor.

Commits desta sessão (mais recente primeiro): `25038ca` (drag-drop) · `156a5af` (auditoria) ·
`44e4a3d` (olho) · `3c90c30` (cadeado) · `3f2f12e` (painéis recolhem) · `4e7766c` (camadas passo 1)
· `25038ca`… — histórico completo em `git log`.

---

## 5. MAPA TÉCNICO DO `editor.html` (arquivo único, ~2060 linhas)

**Como funciona por baixo:** `loadHtml(html)` põe o HTML no `iframe.srcdoc`; no `onload`,
`wirePreview()` liga os cliques/arraste dentro da prévia. Clicar → `selectElement(el)` acende o
realce (classe `__ya_sel`) e mostra o código. O CSS de realce é injetado num
`<style id="__ya_style">` dentro do iframe por `injectHighlightStyle()`.

**Variáveis globais-chave** (perto da linha 370):
- `selected` — o elemento clicado na prévia. `layerLock` — a camada travada (cadeado).
- `editingEl` — texto em edição no lugar. `history` — pilha de retratos do Desfazer (máx 30).
- `dirHandle` — pasta com permissão de ESCRITA (salvar direto). `lastBaseName` — nome-base p/ salvar.
- `originalRefByBlob` / `assetFileByRef` — mapas das imagens (blob↔caminho real / arquivo original p/ PNG).

**Funções por área** (nome real → o que faz):
- **Carregar peça:** `loadHtml` · `wirePreview` · `forgetFolderAssets` (zera pasta/mapas ao abrir
  HTML avulso/colar/exemplo) · `loadFolder` · `collectFromHandle` (percorre um DirectoryHandle) ·
  `chooseHtml` (janelinha se a pasta tem 2+ HTMLs).
- **Seleção/navegação:** `selectElement` · `clearSel` · `renderCrumb` · `renderChildren` ·
  `renderCapaAtalhos` · `labelFor` · `slideOf`.
- **Painel de camadas:** `layerInfo` (classifica cada elemento: foto/overlay/brilho/svg/texto) ·
  `collectLayers` · `directLayerText` · `slideForLayers` · `renderLayers` · `toggleLayerLock` ·
  `toggleLayerEye`. **Slides:** `slideList` · `centralSlide` · `targetSlideForInsert`.
- **Painéis recolhíveis:** `loadSecState`/`saveSecState`/`applySecState` + listeners nos
  `.sec-head[data-sec]`. Chave localStorage: `ya_sec_collapsed`.
- **Arraste** (handlers dentro de `wirePreview`, ~linha 430): `mousedown`/`mousemove`/`mouseup`/
  `click`. Move via `getTf`/`setTf`/`nudge`/`zoom`/`dragMoveTo`; linha-guia `centerGuides`/`drawGuides`.
  Foto: `applyPanPhoto`/`dragPhotoBy`/`panPhoto`/`zoomPhoto`.
- **Desfazer/salvar-limpo:** `snapshotHtml` (retrato p/ undo) · `buildFinalHtml` (HTML final p/
  salvar) · `pushHistory`/`recordBefore` · `undo` · `resetHistory`.
- **Ferramentas:** `showToolsFor`/`hideAllTools`/`isTextEl`. Texto: `changeFont`/`changeWidth`/
  `fitBox`/`startTextEdit`/`stopTextEdit`. Overlay e brilho: blocos no fim (grad/sliders/aplicar).
- **Salvar/PNG:** `saveIntoFolder` · `pickName` · `downloadHtml`. PNG: `makeZip` · `gerar`
  (POST pro `server.mjs`).
- **Arrastar-e-soltar:** `#dropzone` (overlay) · `esconderDrop` · handlers `dragover`/`dragenter`/
  `drop` (window). No drop, `it.getAsFileSystemHandle()` → se pasta, vira `dirHandle` (permite
  salvar de volta) → `loadFolder(collectFromHandle(...))`. Fallback: `webkitGetAsEntry` +
  `walkFile`/`walkDir`.

**Marcadores internos que NUNCA podem vazar pro arquivo salvo** (limpos em `snapshotHtml` E
`buildFinalHtml`): classes `__ya_sel` / `__ya_editing`; `<style id="__ya_style">`; atributo
`contenteditable`; e o `cursor` inline no `<body>` (o editor escreve `cursor:move/grab`).

---

## 6. ⚠️ ARMADILHAS CONHECIDAS (não reintroduzir — foram os 7 bugs da auditoria)

1. **Estado global × elemento "fantasma":** toda variável global que aponta pra um elemento
   (`selected`, `layerLock`) DEVE ser zerada nos **4 pontos onde o DOM troca**: `wirePreview`
   (carregar peça), `undo`, `removeSelected`, e o handler `apply` (Aplicar mudança). Se `layerLock`
   ficar pendurado num elemento que sumiu, a prévia **"congela"** (clicar não seleciona mais nada).
2. **Não vazar marcadores no salvar:** se criar um novo marcador interno, limpe nos DOIS
   (`snapshotHtml` + `buildFinalHtml`). Hoje limpam: `__ya_sel`, `__ya_editing`, `#__ya_style`,
   `contenteditable`, `cursor` do body.
3. **O 👁 olho PERSISTE de propósito:** escreve `visibility:hidden` inline (escolha do Carlos,
   estilo Photoshop). **NÃO** limpe isso no salvar.
4. **Seletor de slide unificado:** use `slideList()`/`centralSlide()`/`slideOf()` (preferem
   `.slide-wrapper`, caem pra `.slide`). NÃO use `querySelectorAll('.slide')` solto — quebra em
   peças cujo container é `.slide-wrapper`.
5. **Overlay do drag:** use **`dragover` + timer** (`esconderDrop`). Contar `dragenter`/`dragleave`
   faz o overlay **piscar** ao passar sobre os elementos da tela.
6. **`[hidden]` vs `display` em classe:** se puser `display:` numa classe, o atributo `hidden` para
   de esconder — adicione uma regra explícita `.classe[hidden]{display:none}`.
7. **Assets ao trocar de peça:** o reset de pasta/mapas fica NOS HANDLERS (`file`/`paste`/`sample`),
   via `forgetFolderAssets()` — **nunca dentro de `loadHtml`** (senão apagaria os mapas que
   `loadFolder` acabou de montar).
8. **Princípio sagrado:** **o CSS do usuário NUNCA é reprocessado**. Tudo é escrito **inline** no
   elemento. Nada de regenerar/normalizar o CSS da peça.

---

## 7. COMO TESTAR NO NAVEGADOR (o Carlos autorizou Playwright)

1. Ligar o servidor: `node server.mjs` (ou o `.bat`). Serve `http://localhost:4599/editor.html`.
2. Playwright: `browser_navigate` pro editor; injetar peça com
   `await new Promise(res => { iframe.addEventListener('load',()=>res(),{once:true}); window.loadHtml(html); setTimeout(res,1500); })`;
   esperar ~250ms; interagir (disparar eventos, clicar nas `.ly-row`, etc.).
3. Verificar por **fatos**: `getComputedStyle(el).display/visibility`, `el.classList.contains('__ya_sel')`,
   `el.style.transform`, `buildFinalHtml()`. E **checar `console_messages` (0 erros)**.
4. **Desligar o servidor** (porta 4599) ao terminar. **Apagar** screenshots/`.playwright-mcp`
   temporários (NÃO commitar).
> Lição desta sessão: teste o **efeito visível** (ex.: `getComputedStyle().display`), não só o
> atributo interno (`el.hidden`) — um bug de overlay passou batido por testar o atributo errado.

---

## 8. COMO PUBLICAR

- **Auto-publish após sucesso testado** (regra do Carlos): `git add` **dos arquivos específicos**
  (NÃO `git add -A` — deixa o `.codex/` untracked de fora) → `commit` → `push origin main` →
  atualizar `STATUS-AGORA.md`. **Só se bem-sucedido e testado.**
- Mensagem de commit **SEM acento** (Windows/terminal). Termine com:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
- **Repositório (privado):** https://github.com/SVCdesign/portal-idea-editor-html · branch `main`.
- **NÃO sobe:** assets pesados, `node_modules/`, `previas/`, `conversa-entre-mundos/`.

---

## 9. CAMINHOS IMPORTANTES

- Mundo: `D:\PORTAL IDEA\portal-idea-editor-html`
- Editor: `editor.html` · abrir `Abrir-Editor-HTML.bat` · desligar `Desligar-Editor-HTML.bat`
- Motor: `server.mjs` + `scripts/render-core.mjs` · vigia: `scripts/sync-guard.mjs`
- Retrato vivo: `STATUS-AGORA.md` · guias: `CLAUDE.md`/`GEMINI.md`/`AGENTS.md`
- Subsistema: `Subsistemas/Fluxo do Subsistema Slide Mestre/LEIA-PRIMEIRO.md`
- Semente: `memoria/LEIA-PRIMEIRO-BRIEFING.md`
- GitHub: https://github.com/SVCdesign/portal-idea-editor-html

---

## 10. PRÓXIMOS PASSOS / IDEIAS DO CARLOS (brainstorm em andamento)

O Carlos disse que tem **muita coisa** que quer no editor e gosta de ir **um passo de cada vez**.
Já conversados / na fila:
- **Copiar / colar / duplicar elementos** entre slides (evoluiu pra "botões de adicionar elemento";
  o ✨ brilho foi o 1º dessa família — pode vir mais tipos).
- **Ecossistema/Subsistema de SVG** (próximo subsistema cogitado).
- Evoluções antigas possíveis (só se ele pedir): **alças** pra arrastar as bordas da caixa de texto
  (estilo Photoshop); **janela de recorte de foto** (quadro 4:5 travado e arrastável).

**Sem frente de código em aberto nem bug conhecido.** Quando o Carlos voltar, ele normalmente pede
"faça o boot" — leia o STATUS e retome no ritmo dele (conversa → prévia → aprova → aplica → testa →
publica).
