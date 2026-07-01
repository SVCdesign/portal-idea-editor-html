# STATUS-AGORA — `portal-idea-editor-html`

**Atualizado:** 2026-07-01 · **Motivo:** ENTREGA pra outra IA (troca de PC) — tudo
commitado e empurrado (este PC = remoto), sem frente de código em aberto nem bug
conhecido. Nesta sessão: três melhorias no editor (pedidas e
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
- **Mover/zoom comum** (demais elementos): setas + zoom (transform), `↺ desfazer`.
- **💾 Salvar:** no Chrome/Edge salva **direto na pasta** com renome automático
  (`...-editado.html`, depois `-2`, `-3`…), devolvendo o **caminho real das fotos**
  no lugar da versão encolhida; **nunca toca no original**. Sem o recurso (ex.:
  Firefox) cai em download na pasta Downloads.

## Atalhos e arquivos novos (tudo já no Git)
- `Abrir-Editor-HTML.bat` — liga e abre no Chrome.
- `Desligar-Editor-HTML.bat` — desliga o servidor (botão de pânico/limpeza).

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
