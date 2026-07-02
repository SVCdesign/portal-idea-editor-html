# STATUS-AGORA — `portal-idea-editor-html`

**Atualizado:** 2026-07-02 · **Motivo:** NOVIDADE — **🎚️ Escurecer / Clarear a foto
(overlay)** no editor. Ao selecionar a "película" (`.overlay`) por cima da imagem da
capa, aparece um painel: **Cor** (Preto/Branco + presets de marca Roxo/Ciano/Laranja
+ **seletor livre**) e barras **Intensidade geral / Topo / Meio / Baixo** ("Jeito A":
no máximo tudo escurece). Ao selecionar, o painel **lê o gradiente atual** (do CSS ou
inline) pra iniciar sem "pulo"; ao mexer, escreve um `linear-gradient` **inline** no
overlay (o CSS global nunca é reprocessado); **"Voltar ao original"** tira o inline e
restaura o CSS de fábrica. O ajuste é **preservado ao salvar**. Alinhado com a IA do
**HTML Studio** (recado + 2 HTMLs de exemplo). Validado no navegador (leitura do
gradiente do CSS, ajuste, salvar preserva, reset restaura). Aprovado via **Prévia A
dentro da interface real** (em `previas/`). Empurrado pro GitHub. **PENDENTE:** as
cores de marca (Roxo/Ciano/Laranja) são chute — trocar pelas oficiais do Portal IDEA
quando o Carlos passar. — Antes: **🖼️ Gerar PNG (alta resolução, fiel)** no editor. Botão no topo → painel "Carrossel pronto"
com **PNG 2160×2700 (retina)** por slide + "Baixar tudo", **espelhando a ferramenta
Carrossel do Portal SV Team**. Por baixo: o "motorzinho" local mudou de **Python pra
Node** (`server.mjs`) — serve o editor **e** atende o botão, chamando um **navegador
robô** (`scripts/render-core.mjs` via **playwright-core + o Chrome já instalado**, sem
baixar os 150 MB do Chromium). O CSS **nunca é reprocessado** (é foto do Chrome de
verdade). Passou por **revisão adversarial** (workflow, 13 achados) e **todos foram
corrigidos e re-testados**: segurança (servidor só em 127.0.0.1, bloqueia `.git`/
código-fonte/`node_modules`, checa origem do POST, 1 render por vez, limite de envio),
fidelidade (seletor de slide com prioridade `.slide-wrapper`→`.slide` + exclui
aninhados, não conta em dobro), robustez (Chrome nunca fica órfão, avisa imagem
quebrada, mensagem amigável se faltar Chrome). Testado no navegador: 3 slides, wrapper
aninhado (2, não 4), página inteira (fallback), imagens (round-trip), 2160×2700 exato.
`Abrir-Editor-HTML.bat` agora liga o Node (com auto-preparo no 1º uso). Empurrado pro
GitHub. — Antes: (1) **botões "↔ centro / ↕ centro"** e (2) **arrastar com o mouse**
com a linha-guia **ao vivo** e **grudando no centro**; e a base da **linha-guia de
centralização** (linha rosa no meio do slide; vive na moldura, não entra no arquivo).
— Histórico anterior: três melhorias no editor (pedidas e
aprovadas pelo Carlos, testadas no navegador e salvas no Git): (1) **"Abrir pasta"
agora deixa ESCOLHER qual HTML** abrir quando a pasta tem 2+ (janelinha); (2)
**conserto do "mover"** — agora funciona nos títulos com gradiente (o html-studio
sempre embrulha o texto colorido num `span` "em linha", que antes ignorava o
mover); (3) **editar texto NO LUGAR** — dois cliques (ou botão ✏️) e você digita
direto na prévia, com o estilo real (**Shift+Enter** pula linha `<br>`, **Enter**
termina). **Regra nova (2026-07-01):** implementação bem-sucedida **e testada**
agora **sobe pro GitHub sozinha**, sem esperar novo "salva" (ver `CLAUDE.md` →
"Convenção de publicação"). Contexto que segue valendo: papéis alinhados —
**o Carlos edita as peças; a IA só constrói/evolui o editor**; conversa com o
`html-studio` ENCERRADA COM ACORDO MÚTUO (turnos 01–07). Sem frente de código em
aberto nem bug conhecido.

## Em uma frente
O `editor.html` deixou de ser só o MVP "clicar → ver código" e virou um **editor
visual de alta fidelidade**: ajusta foto, ajusta texto, navega entre os slides do
carrossel e **salva direto na pasta**. O nome oficial agora é **"Editor HTML"**
(antes era "Casinha"). Continua tudo num arquivo só, sem dependências, rodando
local. Não há frente de código em aberto nem bug conhecido. O próximo passo é
opcional/cosmético (ver no fim).

## Conversa entre mundos (2026-06-30 — ENCERRADA COM ACORDO MÚTUO)
Rolou o diálogo com o **`html-studio`** (o mundo que CRIA os HTMLs). O método:
cada mundo guarda os turnos em `.md` datado, no SEU repositório; o Carlos é a ponte.
No turno-07 (2026-07-01) o html-studio **aceitou o alinhamento de papéis e fechou**.
- Pasta: `dialogos-entre-mundos/portal-idea-html-studio/conversas/2026-06-30-boas-vindas-e-sistema/`
  (turnos 01–07 + `RESUMO.md`). No boot, conferir essa pasta.
- **Contrato técnico FECHADO:** aspas curvas do texto visível intactas no salvar;
  a foto segue o padrão do studio (ver bullet "Ajustar FOTO" acima).
- ⚠️ **ESCLARECIMENTO DE PAPÉIS (o Carlos alinhou com o studio):** quem **edita
  as peças é o CARLOS, à mão, no gosto dele**. A IA deste mundo **só constrói e
  evolui o editor** — dá dica só se ele pedir; **não edita as peças por ele nem
  gera cópias editadas**. O studio tinha se confundido (achou que a IA editava);
  já foi corrigido. É o propósito original: liberdade de edição pro Carlos.

## Como ABRIR e FECHAR o editor (IMPORTANTE — mudou)
- **Abrir:** dois cliques em `Abrir-Editor-HTML.bat`. Ele liga um endereço local
  (`http://localhost:4599`) e abre o **Chrome** sozinho (com anti-cache: sempre a
  versão mais nova). **NÃO** abrir o `editor.html` com dois cliques direto — vira
  `file://`, e nesse modo o "salvar na pasta" não funciona (regra de segurança do
  navegador). Precisa ser Chrome/Edge.
- **Fechar:** feche a janela preta, OU dois cliques em `Desligar-Editor-HTML.bat`
  (desliga o servidor com segurança — mira só a porta 4599).

## O que já está pronto (estado atual do `editor.html`)
- **Clicar → código → editar ao vivo** (o coração original). O CSS NUNCA é
  reprocessado (gradiente, glow, sombra, blend ficam 100% fiéis).
- **Navegação:** caminho clicável no topo (subir pro elemento de volta) +
  linha **"Dentro:"** (entrar nos elementos filhos — ex.: chegar na foto) +
  **barra `[1]…[N]`** no topo da prévia pra pular entre slides (só aparece com 2+).
- **📁 Abrir pasta (com imagens):** acha o HTML + as imagens que ele usa, religa as
  fotos (mostra versão **encolhida** na prévia; o original no PC fica intacto) e
  ignora imagens não usadas (deixa leve). **NOVO:** se a pasta tiver **2+ HTMLs**,
  abre uma **janelinha pra escolher qual** (mostra a subpasta se houver); com 1 só,
  abre direto (igual antes).
- **Ajustar FOTO** (aparece ao selecionar `<img>`): zoom + **arrastar com o mouse**
  + setas — mexe SÓ na foto, sem tocar no texto, mantendo o 4:5. `↺ desfazer`.
  **NOVO (acordo com o html-studio, 2026-06-30):** uma fonte de verdade só, nunca
  as duas — **sem zoom** reposiciona pelo `object-position` (e herda o valor de
  fábrica do design como ponto de partida); **com zoom** usa `transform`
  translate+scale e neutraliza o object-position (pan travado na folga, sem
  buraco). Agora dá pra reposicionar **mesmo sem dar zoom** (antes não dava).
  Validado em 5 cenários no navegador + testado pelo usuário.
- **Ajustar TEXTO** (aparece ao selecionar texto): `A− / A+` (tamanho da fonte —
  nítido, sem distorcer), `◄/► caixa` (largura — re-quebra a linha sozinha, **sem
  trava**; o que passar da borda do slide só fica recortado pela arte), `⤡ encaixar`
  (caixa cola no texto, liga/desliga), setas pra mover, `↺ desfazer`.
  **NOVO (conserto):** o **mover/zoom** agora vale também pros textos "em linha"
  (ex.: o `span` do título com gradiente, padrão do html-studio) — antes o ajuste
  era escrito mas o navegador ignorava. Por baixo: se o elemento é `display:inline`,
  vira `inline-block` na hora de mover (mesma técnica da ferramenta de caixa).
  Validado no navegador (título com gradiente move e mantém o gradiente; título
  em bloco segue igual; `↺ desfazer` volta ao lugar).
- **✏️ Editar TEXTO no lugar (digitar na prévia) — NOVO:** dois cliques no texto
  (ou o botão **✏️ Editar aqui** no painel) e você digita direto na prévia, com o
  estilo real (moldura **tracejada laranja** = modo edição; **cursor laranja
  visível até em título com gradiente** — senão herdava a cor transparente do
  gradiente e sumia). **`Enter`** ou `Esc` ou clicar fora **terminam**;
  **`Shift+Enter` pula linha** (`<br>`, igual o padrão do studio). Mexe **só nas palavras** — o CSS nunca é tocado. Usa `contenteditable`
  normal, MAS **colar entra como texto puro** (sem sujeira do Word) e `Ctrl+B/I/U`
  ficam bloqueados. O código à direita acompanha **ao vivo** e sempre **limpo**; ao
  terminar, tira `<br>` "fantasma" do fim; o arquivo salvo sai **sem marca de
  edição** (buildFinalHtml tira `contenteditable`). Validado no navegador.
- **↔↕ Botões "centralizar" + 🖐️ arrastar com o mouse — NOVO:** ao clicar num
  texto/elemento aparecem os botões **↔ centro** (esquerda↔direita) e **↕ centro**
  (cima↕baixo) — levam ao meio do slide de uma vez e acendem a guia. E agora dá pra
  **arrastar o elemento com o mouse** (não só as setas): ele segue o mouse, **gruda
  no centro** com a linha-guia **ao vivo** (efeito Photoshop de verdade) e **sai** ao
  afastar. A foto continua arrastando como antes; texto/elemento usam o mesmo
  `transform` do "mover". Validado no navegador (botões, arraste, grudar e sair).
- **📏 Linha-guia de centralização (estilo Photoshop) — NOVO:** ao mover um texto
  (ou elemento comum) com as setas e chegar perto do meio do slide, ele **gruda no
  centro exato** e acende uma **linha rosa**: em pé = centrado esquerda↔direita,
  deitada = cima↔baixo, cruz = os dois. O "imã" é de 4px (de propósito **menor** que
  o passo de 6px das setas, senão o elemento ficaria **preso** no centro); a linha
  **some sozinha** depois de ~1,2s. Referência de centro = o `.slide` (ou o corpo, se
  não houver `.slide`). A linha é desenhada **na moldura do editor**, por cima da
  prévia — **não entra no HTML nem no arquivo salvo** (zero risco de fidelidade).
  Validado no navegador (sair/voltar ao centro, os dois eixos, cruz no `.slide`).
- **Mover/zoom comum** (demais elementos): setas + zoom (transform), `↺ desfazer`.
- **💾 Salvar:** no Chrome/Edge salva **direto na pasta** com renome automático
  (`...-editado.html`, depois `-2`, `-3`…), devolvendo o **caminho real das fotos**
  no lugar da versão encolhida; **nunca toca no original**. Sem o recurso (ex.:
  Firefox) cai em download na pasta Downloads.
- **🖼️ Gerar PNG (alta resolução) — NOVO:** botão no topo → painel "Carrossel pronto"
  com **PNG 2160×2700 (retina)** por slide. **Baixar** individual (via Blob, aguenta
  arquivos grandes) e **Baixar tudo (.zip)** = **um arquivo só** (evita o bloqueio do
  Chrome a "vários downloads"; o ZIP é montado no próprio editor, sem biblioteca).
  Espelha a ferramenta
  Carrossel do Portal SV Team). Um **navegador robô** (Chrome do PC, via
  `server.mjs`+`scripts/render-core.mjs`) "fotografa" cada `.slide` — **100% fiel**
  (fonte, gradiente, brilho), pois o CSS **nunca é reprocessado**. Roda **local**
  (só 127.0.0.1), **sem token** e **sem baixar Chromium** (usa o Chrome já instalado).
  Manda as imagens em **qualidade original**. Passou por revisão adversarial (13
  achados corrigidos: segurança, fidelidade do seletor de slide, robustez).
- **🎚️ Escurecer / Clarear a foto (overlay) — NOVO:** clique na área da foto pra
  selecionar a "película" (`.overlay`) → painel com **Cor** (Preto/Branco + presets
  de marca + **seletor livre**) e barras **Intensidade geral / Topo / Meio / Baixo**
  (no máximo, tudo escurece). Ao selecionar, **lê o gradiente atual** pra iniciar sem
  pulo; ao ajustar, escreve `linear-gradient` **inline** (o CSS global nunca é
  tocado); **↺ Voltar ao original** restaura o CSS de fábrica; o ajuste é **salvo**
  junto. Espelha a técnica de overlay do html-studio. Cores de marca ainda são chute
  (trocar pelas oficiais). Validado no navegador.

## Atalhos e arquivos novos (tudo já no Git)
- `Abrir-Editor-HTML.bat` — liga o **motorzinho Node** (`server.mjs`) e abre no Chrome.
  No 1º uso num PC novo, instala sozinho a `playwright-core` (pecinha leve).
- `Desligar-Editor-HTML.bat` — desliga o servidor (botão de pânico/limpeza).
- `server.mjs` — motorzinho Node: serve o editor + atende o "Gerar PNG".
- `scripts/render-core.mjs` — o robô que gera os PNGs fiéis (playwright-core + Chrome).

## Caminhos importantes
- Mundo local: `D:\PORTAL IDEA\portal-idea-editor-html`
- Editor: `editor.html` · Abrir: `Abrir-Editor-HTML.bat` · Desligar: `Desligar-Editor-HTML.bat`
- GitHub (privado): https://github.com/SVCdesign/portal-idea-editor-html
- Arquivo de teste do usuário: `D:\TEMPORARIA\01\` (capa + pasta `assets`)

## Sistema anti-esquecimento (troca de PC / de chat)
> Baseado no modelo `MODELO-sistema-anti-esquecimento-troca-de-pc.md` (criado no studio).
> **Vigia:** `scripts/sync-guard.mjs` — só LÊ o Git e avisa o estado (igual/atrasado/
> adiantado/divergente). Rode `node scripts/sync-guard.mjs boot` pra ver o quadro.
> ✅ **Ativos (com OK do usuário em 2026-06-30):** gatilhos automáticos em
> `.claude/settings.json` (o vigia roda sozinho no início/fim da sessão) + lista de
> permissões seguras de Git, **incluindo commit/push** (operações destrutivas seguem
> pedindo confirmação). ⚠️ Os gatilhos costumam "acordar" só no PRÓXIMO boot da
> sessão — nesta sessão em que foram criados podem ainda não ter rodado.

### Ao CHEGAR num PC/chat (abrir o mundo)
1. **Git:** rode `node scripts/sync-guard.mjs boot` (ou o vigia avisa no boot, se os
   gatilhos já estiverem ligados). Se disser ATRASADO, baixe antes: `git pull`.
2. **🟢 Google Drive:** confirme que os ASSETS das peças (imagens/fontes) terminaram
   de baixar (ícone verde). Eles viajam pelo Drive, **não** pelo Git.
3. **Ler o retrato vivo:** este `STATUS-AGORA.md`.
4. **`conversa-entre-mundos`** é local-only (fora do Git) — copie à mão se for o caso.

### Ao SAIR de um PC/chat (antes de desligar / trocar)
- [ ] **Git publicado:** tudo commitado e empurrado (o vigia avisa se sobrou commit).
- [ ] **🟢 Google Drive sincronizado** (verde) antes de desligar — causa #1 de PC desatualizado.
- [ ] **`conversa-entre-mundos` com backup**, se mexeu nela.

## Próximo passo (OPCIONAL) — PRÓXIMA IA, RETOME ASSIM
- Tudo acima foi **validado com o usuário** (testes no navegador via Playwright,
  que ele autorizou). **Não há bug em aberto.**
- Evoluções possíveis, **só se o usuário pedir** (não fazer antes):
  - **Arrastar as bordas da caixa de texto com o mouse** (alças, igual Photoshop) —
    hoje a largura é por botões `◄/►`.
  - **Janela de recorte de foto completa** (quadro 4:5 travado e arrastável), como
    a do sistema da empresa dele (Portal SV Team / specialvision.design).
- **Regras de sempre:** conversar antes; aprovação explícita antes de criar/editar;
  traduzir todo termo técnico (ele **não programa**); testar no navegador antes de
  dizer que funciona; no fim do chat, atualizar este arquivo.
