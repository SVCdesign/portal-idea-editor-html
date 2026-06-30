# STATUS-AGORA — `portal-idea-editor-html`

**Atualizado:** 2026-06-30 · **Motivo:** sessão grande de evolução do editor (troca de chat — a janela de contexto ficou grande)

## Em uma frente
O `editor.html` deixou de ser só o MVP "clicar → ver código" e virou um **editor
visual de alta fidelidade**: ajusta foto, ajusta texto, navega entre os slides do
carrossel e **salva direto na pasta**. O nome oficial agora é **"Editor HTML"**
(antes era "Casinha"). Continua tudo num arquivo só, sem dependências, rodando
local. Não há frente de código em aberto nem bug conhecido. O próximo passo é
opcional/cosmético (ver no fim).

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
  ignora imagens não usadas (deixa leve).
- **Ajustar FOTO** (aparece ao selecionar `<img>`): zoom + **arrastar com o mouse**
  + setas — mexe SÓ na foto (object-fit cover + object-position/scale), sem tocar
  no texto, mantendo o 4:5. `↺ desfazer`.
- **Ajustar TEXTO** (aparece ao selecionar texto): `A− / A+` (tamanho da fonte —
  nítido, sem distorcer), `◄/► caixa` (largura — re-quebra a linha sozinha, **sem
  trava**; o que passar da borda do slide só fica recortado pela arte), `⤡ encaixar`
  (caixa cola no texto, liga/desliga), setas pra mover, `↺ desfazer`.
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
