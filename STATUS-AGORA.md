# STATUS-AGORA — `portal-idea-editor-html`

> 🚚 **TROCANDO DE PC / IA NOVA? LEIA PRIMEIRO O HANDOFF DETALHADO** →
> [`logs/handoff/HANDOFF-2026-07-06-troca-de-PC.md`](logs/handoff/HANDOFF-2026-07-06-troca-de-PC.md)
> — mapa completo: regras do Carlos, arquitetura do `editor.html` (funções/variáveis), **armadilhas
> conhecidas** (pra não reintroduzir bugs), como testar e como publicar. Este STATUS é o **resumo**;
> o handoff é o **manual**.

**Atualizado:** 2026-09-04 · **Motivo:** 🛡️ **REFUTAÇÃO DO NEGRITO CORRIGIDA** — depois da
implementação do negrito por palavras, o Carlos mandou um agente limpo tentar refutar. O Ampere
achou 5 pontos; corrigidos os importantes: o reforço visual agora não some em texto com gradiente
(usa outro caminho quando a cor real do texto é transparente), o checkbox/slider guardam a seleção
da palavra antes de perder o foco, trocar o peso atualiza o trecho em vez de criar `<span>` dentro
de `<span>`, e aplicar/limpar não apaga mais sombra/brilho original que já existia dentro da peça.
Também ajustada a mensagem de Desfazer (só depois de confirmar a edição) e o aviso de texto
DESENHO/SVG. Testado no navegador: caso simples, checkbox antes do B, gradiente, trecho atravessando
um `span` com sombra própria, limpar preservando sombra original, HTML limpo e **Gerar PNG
2160×2700 ✅**. · Antes, no mesmo dia: 🅱️ **NEGRITO POR PALAVRAS NO PAINEL DE TEXTO** —
o Carlos pediu uma opção para colocar negrito em palavras específicas, com intensidade ajustável.
Entrou no `editor.html`: botão **B**, controle de **Peso** (`400` a `900`), opção **reforço visual**
para quando a fonte não tiver negrito real, botão **limpar**, e Ctrl+B usando o caminho controlado
do editor (sem o negrito automático/sujo do navegador). Auditoria antes: o trecho de texto estava
saudável; cuidado aplicado para o editor continuar reconhecendo caixas que viram `<span>` após o
negrito. Limite assumido: texto de DESENHO/SVG mostra aviso e não recebe negrito por palavras nesta
primeira versão, porque usa a caixinha especial do SVG e pode perder estilos por partes. Testado no
navegador: aplicar peso `800`, ligar reforço visual, limpar, aplicar `700`, Desfazer ✅; **Gerar PNG
2160×2700 ✅**. · Antes, em **2026-08-29**: 🎨 **PAINEL "COR DO TEXTO" NO AR** (o Carlos avaliou
a Prévia A e mandou implementar) — muda a cor de qualquer texto da peça, com atalhos lidos da
própria peça e "aplicar em todas as páginas"; **pinta também texto de DESENHO (SVG)**, decisão
dele depois que a auditoria mostrou que o desenho se pinta por outro caminho. · No mesmo dia:
🚚 **A PASTA DO MUNDO MUDOU DE LUGAR** (`D:\PORTAL IDEA\` →
`D:\WORKSPACE\Special Vision\`) — **nenhum código quebrou** (tudo usa caminho relativo); só os **mapas
escritos** apontavam pro lugar velho e foram corrigidos (ver "Caminhos importantes"). · Junto,
🫧 **o painel de Transparência foi REMOVIDO** a pedido dele (ver "perguntas em aberto") e
🔎 **caiu uma armadilha antiga de auditoria**: o `editor.html` tinha um **caractere invisível** (NUL,
na linha do `chaveDe`, no salvar com imagem referenciada) que fazia o `grep` tratar o arquivo como
**binário** e devolver **resultado incompleto sem avisar** — foi o que quase me fez remover o painel
pela metade nesta sessão. Trocado pela forma escrita `\u0000` (o navegador entende igual). **Se um dia
uma busca no `editor.html` parecer "sem resultado", desconfie disso de novo.** Testado no navegador:
0 erro de JS, painéis certos por tipo de elemento, e **Gerar PNG 2160×2700 ✅**. · Antes,
em **2026-08-20**: 🔍🛠️ **AUDITORIA COMPLETA + 13 DEFEITOS CORRIGIDOS** (o Carlos
pediu: *"faça uma auditoria completa e corrija todos os erros e bugs"*). Vistoria do `editor.html` inteiro,
do `server.mjs` e do robô do PNG, com **prova no navegador** de cada defeito **antes e depois** do conserto.
Destaques: o **Desfazer comia duas edições de uma vez** · a **prévia congelava** com o cadeado ligado · o
**"Colar HTML" descartava a peça aberta** mesmo sem nada pra colar · o painel **Camadas não escondia** ·
**foto corrompida abria calada**. Nada quebrou: carrossel 2160×2700 ✅, salvar limpo ✅, 0 erro de JS ✅.
Detalhes no bloco `🔍 AUDITORIA 2026-08-20` logo abaixo do FOCO. · Antes,
em **2026-08-09**: 🧭 **CONSOLIDAÇÃO PRA TROCA DE PC** + 🔍 **auditoria completa da
EDIÇÃO DE HTML DO CLIENTE** (o foco real deste mundo), pedida pelo Carlos depois de uma temporada mexendo no
livrinho. **Resultado: nada quebrou** — ver o bloco `🎯 O FOCO` logo abaixo. · Antes, 📖 o **subsistema
Livrinho 14×21** (molde ✅, auditoria do Gerar PNG ✅, a peça declara a largura ✅, painel de Transparência ✅,
livrinho animado ✅) — **agora PAUSADO a pedido dele**. · Antes, 🎚️ **Escurecer/Clarear agora reconhece a película "veil"** (as peças
do studio usam esse nome; o editor só conhecia "overlay"/"scrim") — ver bloco logo abaixo. · Antes,
🔍 **AUDITORIA PROFUNDA + correções por etapa** (3 auditores em paralelo + leitura manual + teste no navegador). **As 4 etapas ✅ no ar** (15 correções — nada
pendente): brilho atrás da foto · texto SVG que apagava a cor · salvar na pasta errada · Ctrl+Z "morto" · peso
de memória · Delete no controle · "Ver código todo" na digitação · limite do PNG · shrinkToUrl · nome à prova
de maiúscula · nome ambíguo · salvar preserva `../` e `%20` · wrapper aninhado · enquadramento em `px` ·
caixinha SVG centralizada. · Antes,
em **2026-07-23**, saiu o ⚠️ **aviso de foto que não apareceu** + 📁 **as duas portas de abrir viraram UMA**. · Antes, em **2026-07-22**, saiu o ⇄ **botão "Espelhar"** + 🐛 **dois bugs corrigidos**
(o brilho nascia atrás do slide; o zoom jogava fora o enquadramento). · Antes, em **2026-07-20**,
saiu o 🖼️ **botão "Adicionar imagem"
(foto de FUNDO)** (força uma foto pra dentro de um slide feito SEM foto). · Antes, em **2026-07-18**,
saiu a ✏️ **edição de TEXTO de DESENHO (SVG)** (a "caixinha de digitar" por cima). · Antes, em **2026-07-06**,
saíram cinco frentes — (1) 🗂️ **nova organização `Subsistemas/`**, (2) 🧩 **PAINEL DE CAMADAS no `editor.html`**
(✅ completo, 3 passos) e (3) 🪟 **painéis que RECOLHEM** (fim do aperto na direita) e (4) 🔍 **auditoria
profunda + 7 bugs corrigidos** e (5) 📁 **arrastar-e-soltar a pasta** — tudo no ar e testado.

---
## 🎯 O FOCO DESTE MUNDO — leia antes de qualquer coisa (2026-08-09)

> **Este editor existe para o Carlos EDITAR HTML DE PEÇAS DE CLIENTE.** É o que ele usa
> **todos os dias** e é o que paga a conta. Carrossel do Instagram (1080×1350 → PNG 2160×2700)
> é o formato principal.
>
> ⚠️ **O LIVRINHO 14×21 ESTÁ PAUSADO.** Entre 28/07 e 02/08 evoluímos bastante um subsistema de
> livrinho infantil para gráfica. O Carlos avaliou e disse, com todas as letras, que **perdeu o
> foco**: *"esse editor foi feito para demanda de clientes… eu acabei perdendo o foco e indo para
> um outro lado de coisas que eu faço bem pouco"*. **Não retome o livrinho por conta própria** —
> só se ele pedir. O que foi feito está pronto e documentado em
> `Subsistemas/Fluxo do Subsistema Livrinho/`, esperando.
>
> 🚨 **A regra que manda em tudo:** *o carrossel do Instagram é sagrado.* Toda novidade entra como
> **caminho paralelo**, com o comportamento de hoje como padrão. E antes de dizer "pronto", rode a
> **regressão da peça de cliente** (receita no fim deste bloco).

### ✅ Auditoria da edição de cliente (feita em 2026-08-09, a pedido dele)
O Carlos ficou com medo de que a temporada do livrinho tivesse quebrado o que ele mais usa. Auditei
em duas frentes — **li o diff completo** do `editor.html` desde o último commit antes do livrinho
(`e2e9a79`) **e testei o fluxo inteiro no navegador** com uma peça de cliente de verdade (3 slides,
gradiente em texto, foto, overlay, brilho). **Veredito: nada quebrou.**
- As 5 mudanças no `editor.html` são **aditivas ou consertos** — o laço central (clicar→código,
  editar→aplicar, texto, foto, camadas, slides, desfazer, salvar) **não foi reescrito**.
- Passaram: abrir pela pasta · clicar→código · editar→Aplicar (gradiente preservado) · cada elemento
  com o painel certo · editar texto ao vivo · mover/aumentar · zoom na foto · slider do overlay ·
  camadas · barra de slides · Desfazer em sequência · Remover (botão **e** tecla Delete) ·
  **Salvar sai limpo** (sem marcas, sem base64) · Ver código todo · Colar · Exemplo ·
  **Gerar PNG 2160×2700**. **0 erro de JS.**
- **Única mudança de comportamento visível:** o painel **🫧 Transparência** agora aparece **junto**
  com o painel de sempre em qualquer elemento com texto ou foto. Não substitui nada. O Carlos foi
  avisado e **ficou de dizer** se quer que ele apareça só no livrinho — **pergunta em aberto.**

### 🚚 TROCA DE PC — estado em 2026-08-29 (o mais recente)
- **Git:** `main` = `origin/main` (0 atrás / 0 à frente), **nada pendente pra salvar**. Último
  commit: `a3dc29f`. No PC novo: **`git pull`** e está tudo aqui.
- ⚠️ **A PASTA MUDOU DE LUGAR:** o mundo agora vive em
  `D:\WORKSPACE\Special Vision\portal-idea-editor-html` (antes `D:\PORTAL IDEA\`, hoje vazia).
  **Ponha no MESMO lugar no PC novo** — não por causa do código (ele usa caminho relativo e roda de
  qualquer pasta), mas porque os mundos vizinhos e a `conversa-entre-mundos` são irmãos dele ali
  dentro de `D:\WORKSPACE\Special Vision\`.
- **O que NÃO viaja pelo Git** (copie à mão ou refaça):
  - `previas/` — 10 prévias aqui (local-only). ⚠️ `previa-cor-do-texto.html` é a feature que ainda
    espera aprovação — o código dela está salvo em `logs/handoff/PENDENTE-painel-cor-do-texto.md`.
  - `D:\WORKSPACE\Special Vision\conversa-entre-mundos\` — ~615 KB, local-only.
  - `node_modules/` — **não precisa copiar**: o `Abrir-Editor-HTML.bat` instala sozinho na primeira
    vez no PC novo (precisa de internet nessa primeira vez).
  - `.claude/settings.local.json` e `.codex/` — configurações locais, ficam de fora do Git.
  - **Fotos/fontes das peças** — vêm pelo **Google Drive**. Confirme o **Drive VERDE** dos dois lados.
- **Chegando no PC novo:** `git pull` → dois cliques em `Abrir-Editor-HTML.bat` → o editor abre em
  `http://localhost:4599/editor.html`. Se pedir, deixe instalar a peça do robô (é o "Gerar PNG").

### 🚚 TROCA DE PC — estado em 2026-08-09 (histórico)
- **Código + texto:** tudo **commitado e no GitHub** (`main` = `origin/main`, working tree limpo).
  No PC novo, um **`git pull`** traz tudo. **Nada de código pendente.**
- **Assets pesados (fotos das peças) NÃO vêm pelo Git** — vêm pelo **Google Drive**. Confirme o
  **Drive VERDE** (terminou de sincronizar) antes de sair e ao chegar.
- **`previas/`** é local-only (`.gitignore`) — **não viaja**. Havia 10 prévias aqui; no PC novo a
  pasta pode não existir: **crie quando precisar**. ⚠️ A prévia `previa-cor-do-texto.html` era uma
  **feature esperando aprovação** — o código dela foi salvo em
  [`logs/handoff/PENDENTE-painel-cor-do-texto.md`](logs/handoff/PENDENTE-painel-cor-do-texto.md)
  justamente pra não se perder.
- **`node_modules/`** não viaja — no PC novo rode **`npm install`** (o Gerar PNG depende do
  `playwright-core`; ele usa o **Chrome já instalado**, não baixa Chromium).
- **`conversa-entre-mundos`** (pasta neutra, fora do Git) é local-only — copie à mão se for usar.
- **`.codex/`** é config local de ferramenta — não precisa viajar.
- **Como abrir o editor:** atalho **`Abrir-Editor-HTML.bat`** (NÃO abra `editor.html` direto — vira
  `file://` e o "salvar na pasta" para de funcionar).
- ⚠️ **CAMINHOS QUE MORRERAM:** as pastas do livrinho em `D:\00- CODIGO\` (`matrix-editor-reference`
  e `livrinho-o-trem-das-aguas-PARA-ENVIAR`) **não existem mais** neste PC — confirmado em 09/08.
  Se um texto antigo apontar pra elas, ignore. A pasta de **referência** do outro sistema no Drive
  (`E:\…\matrix-books\livrinho-sao-lourenco-maria-fumaca\matrix-portable-preview`) **ainda existe**
  — é só leitura, **não mexer nela**.
- **Pendências NÃO-código (dependem do Carlos):** (1) turno-02 esperando resposta do mundo editorial
  (`dialogos-entre-mundos/sistema-de-ideas-html-sv/.../2026-07-23-imagem-referenciada-vs-embutida/`);
  (2) perguntar ao **html-studio** se ele lê os **dois** mecanismos de enquadramento ao mesmo tempo
  (`object-position` + `transform`).

### 🧪 A RECEITA DE REGRESSÃO (rode antes de dizer "pronto", sempre)
1. Ligue o servidor: `node server.mjs` (ou o `.bat`) → `http://localhost:4599/editor.html`.
2. Monte uma **peça de cliente**: 3 slides `.slide-wrapper > .slide` de **1080×1350**, com
   gradiente em texto (`background-clip:text`), uma `<img>`, um `.overlay` e um `.bokeh`.
3. Abra **pela pasta**, edite (código + texto ao vivo + mover + zoom), **Desfaça**, **Remova**.
4. Confira o **Salvar**: sem `__ya_`, sem `contenteditable`, sem `data:image`, gradiente intacto.
5. **Gerar PNG** tem que sair **2160×2700**.
6. **0 erro de JavaScript** no console — agora é **zero mesmo**: o 404 do `favicon.ico`, que sempre
   sujava o console, saiu em 20/08 (um ícone vazio no `<head>`). Se aparecer erro, é erro de verdade.
> Se mexeu no **robô do PNG** (`scripts/render-core.mjs`), o padrão-ouro é o **teste de hash**:
> guarde uma cópia do arquivo ANTES, renderize o mesmo carrossel com as duas versões **na mesma
> rodada** e compare o SHA-256. ⚠️ Compare sempre **na mesma execução** — slide com **texto em
> gradiente** dá hash diferente entre rodadas separadas (variação de rasterização do Chrome).
---

## 🔍 AUDITORIA 2026-08-20 — 13 defeitos achados e corrigidos

O Carlos pediu: *"faça uma auditoria completa e corrija todos os erros e bugs"*. Vistoria do
`editor.html` linha a linha, do `server.mjs` e do `scripts/render-core.mjs`, mais teste no navegador
(Playwright) **provando cada defeito antes e depois** do conserto. Tudo publicado.

> ⚠️ **Lição de método (vale pras próximas IAs):** dentro do `editor.html`, `history` é uma variável
> **do editor** (a pilha do Desfazer), mas de FORA — no console ou num teste — `window.history` é o
> **histórico do navegador**. Medir por ali dá número errado e inventa bug que não existe. Meça pelo
> **comportamento**: o botão `#undo` está ligado? o que a peça mostra depois de UM Desfazer?
> E confira se a aba está **desenhando** (`document.visibilityState`): aba escondida **não dispara
> evento de rolagem**, e aí parece que o painel de camadas não segue o slide — mas segue.

### Os 5 que doíam de verdade (todos reproduzidos no navegador)

1. **O Desfazer comia duas edições de uma vez.** Encostar numa barrinha (Escurecer/Clarear, Brilho ou
   Transparência) e sair de **Tab** — ou abrir a paleta de cor e **desistir** — deixava um "retrato"
   preso. Esse retrato velho era usado na **próxima** mexida: um único Ctrl+Z voltava tudo o que
   tinha sido feito no meio, **sem passo intermediário pra recuperar**. Provado: mover o título +
   mexer na película sumiam juntos. **Raiz:** o retrato era tirado *antes* de saber se algo ia mudar
   (no `pointerdown`/`keydown`). **Conserto:** o retrato passou a ser tirado no `input` — o primeiro
   instante em que a mudança é certa e a peça ainda não foi tocada. Sem mexida, nada fica preso.
   (O conserto de 02/08 tinha tapado só o caso do clique-sem-mexer.)
2. **A prévia congelava com o cadeado ligado.** Travava uma camada no slide 1, rolava pra longe → a
   lista passava a mostrar o slide à vista, **o cadeado sumia da lista** e clicar na prévia não
   selecionava mais nada (travado é assim de propósito). Ficava sem saída até rolar de volta.
   **Conserto:** enquanto houver trava, a lista fica no slide dela — o cadeado está sempre ao alcance.
3. **O "📋 Colar HTML" descartava a peça aberta mesmo sem nada pra colar.** Ele "esquecia a pasta"
   na **primeira linha**, antes de olhar a área de transferência. Com ela vazia (ou cancelando a
   janelinha), a peça continuava na tela mas **perdia a pasta do Salvar, o nome do arquivo e os
   endereços das fotos** — que somem 3 segundos depois. **Conserto:** só esquece depois de ter HTML
   em mãos (mesmo cuidado que o `loadFolder` já tinha).
4. **O painel "Camadas" não escondia.** O `.sec` tem `display:flex` no CSS, que vence o atributo
   `hidden` — a seção aparecia vazia mesmo mandada sumir (53 px de nada na tela). É a **armadilha
   nº 6 do handoff**, reintroduzida. **Conserto:** `.sec[hidden]{display:none}`.
5. **Arraste "fantasma" depois de "Ver código todo".** O realce era apagado mas a variável continuava
   apontando pro elemento: ele ainda respondia ao arraste do mouse — **movia a peça sozinho** e
   trocava o código todo da caixa pelo código só daquele elemento. **Conserto:** soltar o elemento.

### Os 8 achados na leitura do código

6. **Foto corrompida abria calada.** O aviso de "foto não apareceu" só olhava endereços **locais** —
   mas numa peça aberta pela pasta toda foto vira endereço interno. Resultado: arquivo **encontrado
   mas ilegível** (foto pela metade, Drive sincronizando) passava batido e o slide abria vazio, sem
   avisar — exatamente o acidente que esse aviso existe pra evitar. **Conserto:** agora entra na
   lista, marcada **"está na pasta, mas não abriu"**, com o caminho de verdade e um conselho próprio
   (esperar o Drive ficar VERDE / trocar a cópia) — porque renomear não resolve esse caso.
7. **Arrastar-e-soltar lia os dados tarde demais.** As rotas reserva (`webkitGetAsEntry` e a lista de
   arquivos) eram lidas **depois** de uma espera, e o navegador **tranca** os dados do arraste nesse
   ponto. Quando a rota moderna não servia (HTML solto, navegador sem ela), o arquivo não abria e
   nada era dito. **Conserto:** colher tudo no primeiro instante, com o arraste ainda "quente".
8. **Película com maiúscula ficava invisível pra metade do editor.** O painel de Camadas reconhecia
   `Veil`/`Overlay` (busca sem diferenciar maiúscula), mas os "Atalhos da capa" e o botão 🎚️ da foto
   **não** — e respondiam *"não achei a película desta capa"*. **Conserto:** as duas buscas agora
   ignoram maiúscula/minúscula.
9. **"Aplicar mudança" não encerrava a digitação.** `editingEl`/`svgEditingEl` podiam ficar apontando
   pra um elemento que deixou de existir (armadilha nº 1 do handoff). **Conserto:** encerra antes de
   trocar o elemento, e zera as duas.
10. **Salvar podia trocar o caminho de uma foto.** Quando a mesma foto era citada de **dois jeitos**
    (`fotos/a.jpg` e `./fotos/a.jpg`), as duas dividiam o mesmo endereço interno e no Salvar as duas
    voltavam com o caminho da **última** — a outra quebrava. **Conserto:** um endereço interno por
    arquivo **e por caminho escrito**. Na peça comum nada muda.
11. **O aviso de foto não era refeito depois do Desfazer** (podia ficar desatualizado). Corrigido.
12. **`server.mjs`: endereço mal formado virava erro 500.** Agora vira um **400** curto.
13. **404 do `favicon.ico` a cada abertura.** Sujava o console e podia esconder erro de verdade.
    Corrigido com um ícone vazio no `<head>`. **Console agora: 0 erro, 0 aviso.**

### O que foi testado DEPOIS (tudo passou)
Carrossel 3 slides → **PNG 2160×2700** ✅ · abrir pela pasta com religação das fotos ✅ · Salvar
devolve **o caminho exato** que a peça escreveu ✅ · salvar **sem marcador interno** ✅ · painel certo
pra cada elemento (foto/película/brilho/texto) ✅ · foto: setas, zoom, **espelhar sobrevive ao zoom**,
↺ desfazer ✅ · editar texto no lugar ✅ · **texto de desenho (SVG)** ✅ · Adicionar brilho + Desfazer ✅ ·
3 edições = **3 Desfazeres** ✅ · Remover + Desfazer ✅ · Colar com conteúdo ✅ · barra de slides ✅ ·
camadas com olho e cadeado ✅ · servidor: 400/200/404 nas rotas certas ✅ · **0 erro de JS** ✅.

### O que NÃO foi mexido (de propósito)
- **Barrinhas do Brilho com valor fora da escala** (ex.: um brilho de 800 px numa barra que vai até
  600): o número mostrado é o verdadeiro, só a barrinha fica no limite. "Consertar" isso faria o
  brilho **encolher sozinho** na próxima mexida — o remédio seria pior.
- **Escape não fecha a janela do Gerar PNG.** É falta de conforto, não defeito; e Escape já tem dono
  em outros lugares (encerrar digitação, fechar a janelinha de escolher HTML).

---

**(2026-07-28 a 08-02) 📖 SUBSISTEMA LIVRINHO 14×21 — TUDO FEITO, e ⏸️ PAUSADO em 09/08 a pedido do Carlos
(leia o bloco `🎯 O FOCO` no topo antes de retomar qualquer coisa daqui):** o Carlos
apontou um livrinho infantil feito por **outro sistema** (`E:\…\matrix-books\livrinho-sao-lourenco-maria-fumaca\
matrix-portable-preview` — **pasta de referência, não mexer**) e perguntou se dava pra editar aqui e **exportar
as páginas em PNG pra gráfica imprimir** (livreto grampeado 14×21 cm).
**Diagnóstico:** aquele arquivo é um **aplicativo** (capa que abre, página que vira) e o texto das 12 páginas
**não está no HTML** — mora numa lista dentro do `app.js`. Como o editor edita e salva **o que está na tela**,
a edição seria **apagada** ao reabrir (o script remonta tudo). Não é bug: é formato incompatível.
**Decisão do Carlos:** em vez de ensinar o editor a mexer em JavaScript (mecanismo novo, frágil), **mudar o
formato na origem** — ele leva a receita pro outro sistema.
🚨 **REGRA QUE O CARLOS DEIXOU GRAVADA (2026-07-28):** o **carrossel do Instagram é sagrado** — é o que ele usa
**todos os dias**; o livrinho é bônus (1× por semana). **Nada deste subsistema pode balançar o caminho do
carrossel.** Na dúvida, ganha o carrossel.
- **✅ PASSO 1 — o molde (FEITO e testado):** nasceu `Subsistemas/Fluxo do Subsistema Livrinho/` com
  `LEIA-PRIMEIRO.md`, `RECEITA-PARA-O-OUTRO-SISTEMA.md` (a especificação, auto-suficiente, é o que o Carlos
  entrega) e `molde-livrinho-14x21.html` (o molde funcionando, capa + 12 páginas). **A ideia:** o livrinho
  **se disfarça de carrossel** — cada página é um `<section class="slide">`, só que com medida de livro
  (**848×1264 na tela → 1696×2528 no PNG**, o mesmo truque do 1080→2160). Por isso o `editor.html`
  **não precisou aprender nada novo**. ⚠️ **Zero linha do editor foi tocada** (`git diff` dos arquivos já
  existentes: **vazio**) — só entraram arquivos novos.
  **Testado no navegador** (Playwright, no `editor.html` oficial, servidor 4599): as **13 páginas** aparecem na
  barrinha `[1]…[13]`; **toda página mede 848×1264**; o caminho clicável desce até `h2.page-title`; **ferramentas
  de foto e de texto abrem**; **Atalhos da capa** aparecem; a película **`veil` é reconhecida**; o painel de
  **camadas** lista; a **edição de texto** entra e o **salvo sai limpo** (sem `contenteditable`/marcas, com
  `./assets/…` preservado, **sem base64**, e a `<meta>` do tamanho intacta); o **aviso de foto faltando** dispara
  com nome + descrição + slide certos. **0 erro de JS** (os 404 eram as fotos, carregado sem a pasta).
  E o **motor do PNG** foi rodado num script à parte (sem tocar no projeto): mediu 13 páginas de 848×1264 e
  gerou 3 páginas em **1696×2528 exatos** — a prova de que o molde exporta no tamanho de gráfica.
- **✅ AUDITORIA DO "GERAR PNG" (feita antes de mexer, a pedido do Carlos):** li o caminho inteiro
  (`editor.html` → `server.mjs` → `scripts/render-core.mjs`). **Achados, por peso:**
  🔴 **(1) A janela dos PNGs comia memória à toa** — cada miniatura de **120px de altura** recebia o **PNG
  inteiro** embutido (`thumb.style.backgroundImage = 'url("data:image/png;base64,…")'`), então o navegador abria a
  imagem toda (2160×2700) só pra desenhar a tampinha. Um carrossel de 10 slides gastava ~230 MB só de miniatura,
  mais ~80 MB de texto base64. Era o achado mais pesado e **não tinha a ver com o livrinho — era do carrossel**.
  ✅ **CORRIGIDO em 2026-07-28** (o Carlos pediu depois) — ver o bloco abaixo.
  🟡 **(2) "2160×2700" escrito à mão em 4 lugares** → mentia em peça que não fosse 4:5. **CORRIGIDO** (ver abaixo).
  🟡 **(3) "sempre 2160" nunca foi verdade:** a conta é `2160 ÷ largura do slide` com piso 1 — slide mais largo
  que 2160 sai maior que 2160. 🟡 **(4) só o PRIMEIRO slide é medido** (`.first()`): o viewport e a ampliação de
  TODOS vêm dele; peça com slides de tamanhos diferentes sai torta. 🟡 **(5) medida quebrada → PNG com 1 px a
  mais/menos** (acontece com `vw`/`%`; pro Instagram é indiferente, **pra gráfica não** — por isso o molde usa px
  fixo). ⚪ **(6)** o Gerar PNG só tem foto em alta se a peça foi aberta **pela pasta**. ⚪ **(7)** o limite de
  100 MB conta as fotos da pasta, não o HTML (foto embutida escapa). ⚪ **(8)** o rótulo "Mantém o 4:5" do Ajustar
  foto está datado — **a ferramenta NÃO assume 4:5** (usa `cover` + %; funciona em qualquer proporção, confirmado
  no livrinho). **(3)–(8) ✅ TODOS CORRIGIDOS depois** — ver o bloco da 2ª auditoria abaixo.
- **✅ PASSO 2 — a peça declara a largura do PNG (FEITO e testado):** o robô agora lê
  `<meta name="sv-export-largura">` **na passada de medição que já abre o Chrome**; achou número válido, usa;
  **senão, `TARGET_W = 2160` de sempre**. Mexeu **só** em `scripts/render-core.mjs` — o `editor.html` não
  precisou saber de nada. **Três blindagens:** sem plaquinha → 2160 · lixo (letra, vazia, `0`, negativa,
  `1696.5`, `99999`) → 2160 · erro na leitura → 2160. Aceita só **inteiro de 200 a 8000** (espaços tolerados).
  🛡️ **PROVA DE QUE O CARROSSEL NÃO MUDOU:** o mesmo carrossel de 3 slides 1080×1350 (foto, gradiente em texto,
  brilho, sombra) foi renderizado pelo robô **de antes** e pelo **de agora** → os 3 PNGs saíram com o **mesmo
  hash SHA-256**, byte a byte idênticos, 2160×2700. As **10 blindagens** passaram. O livrinho saiu **1696×2528**
  nas 13 páginas.
- **✅ PASSO 2b — o editor mostra o tamanho REAL (FEITO e testado):** o robô devolve `largura`/`altura` de cada
  PNG **lidos do cabeçalho do próprio arquivo** (IHDR — número de verdade, não conta que arredonda), e o editor
  mostra o que veio: no aviso, no contador e em cada cartão (`01.png · 1696×2528`). Slides de tamanhos diferentes
  viram "tamanhos variados". **Testado no navegador** (Playwright, `editor.html` oficial, servidor de teste numa
  porta separada pra não mexer no do Carlos): carrossel → *"PNGs fiéis em 2160×2700"*; livrinho → *"PNGs fiéis em
  1696×2528"*, 13 cartões. **0 erro de JS** (os 404 eram as fotos, peça carregada sem a pasta).
- **✅ ACHADO 🔴 CORRIGIDO — miniaturas leves na janela do Gerar PNG (FEITO e testado):** mexeu **só no
  `editor.html`**, dentro do painel de PNG. Três coisas: (a) a tampinha passou a usar o **encolhedor que já
  existia** (`shrinkToUrl`), que ganhou um **2º argumento opcional** de tamanho máximo — **sem 2º argumento o
  comportamento é o de hoje** (`MAX_PREVIEW_SIDE = 1400`), então as fotos da prévia não mudam em nada; a
  miniatura pede **320px**; (b) a lista `ultimos` deixou de guardar o **texto base64** (~8 MB por PNG) e passou a
  guardar o **blob** — o "Baixar" já recebia blob, e o ZIP lê os bytes **só na hora do clique**; (c) os endereços
  das miniaturas são **liberados** ao fechar o painel e ao gerar de novo, com um **token de geração** pra uma
  miniatura atrasada não vazar depois que outra geração começou.
  **Medido no navegador** (livrinho de 13 páginas, artes reais): as **13 miniaturas juntas pesam 0,3 MB** (antes
  eram os 13 PNGs inteiros, ~78 MB, e ~300 MB já decodificados); a **memória do JavaScript foi de 4 MB pra 9 MB**
  (antes só o base64 já seria ~104 MB). **Downloads conferidos de verdade** (interceptando o link): "Baixar"
  entregou `livrinho-02.png` de 5,94 MB com **assinatura de PNG**, e "Baixar tudo" entregou `livrinho.zip` de
  81,29 MB com **assinatura de ZIP**, com o botão reabilitando no fim. **Vazamento testado:** endereço de
  miniatura da geração anterior **fica morto** depois de fechar o painel. **Regressão do carrossel pela
  interface:** 3 slides, *"PNGs fiéis em 2160×2700"*, miniaturas prontas, download OK. **0 erro de JS.**
  ⚪ **Achado novo, pequeno, NÃO mexido:** o nome do download usa o `lastBaseName`, que **não é zerado** ao abrir
  um HTML avulso/colar depois de ter aberto uma pasta — o arquivo sai com o nome da peça ANTERIOR.
- **✅ 2ª AUDITORIA + AS 6 ARMADILHAS RESTANTES CORRIGIDAS (o Carlos pediu "corrige os 6, sem exceção"):** a
  vistoria dos 4 lugares que seriam tocados achou **mais 5 coisas** que não estavam na lista:
  **N1** a medição roda numa janela de **1280×1600** e a foto numa janela do **tamanho do slide** — peça com
  medida relativa (`vw`/`%`) muda de layout entre as duas e o slide fotografado não é o que foi medido;
  **N2** um slide escondido **derrubava a geração inteira** (não havia proteção por slide);
  **N3** o robô manda até **20 endereços** das imagens quebradas e o editor **jogava todos fora**, mostrando só a
  quantidade; **N4** a trava de **cima** (8×) também desobedecia a plaquinha calada; **N5** o `JSON.stringify` do
  envio monta o corpo inteiro na memória num pico só.
  **O que entrou** (`render-core.mjs` + `editor.html`):
  **(5)+N1** — uma medida só, **arredondada**, usada na conta E na janela; e o robô **confere a medida de novo
  dentro da janela da foto**, avisando quando o slide muda de tamanho entre as duas passadas. Medida quebrada
  (ex.: 540,4px) vira **aviso**, não um PNG torto em silêncio.
  **(4)** — os slides são **agrupados por tamanho** e cada grupo é fotografado com a ampliação dele. Peça com
  todos iguais (todo carrossel) = **1 grupo = caminho idêntico ao de antes**. Peça misturada ganha aviso.
  **(3)+N4** — a trava de **baixo** (que forçava no mínimo 1× e impedia obedecer uma largura menor) **saiu**; a
  de **cima** (8×) **ficou**, porque o Chrome não desenha acima de ~16.000px — mas agora **avisa** quando age.
  **N2** — proteção **slide a slide**: um slide problemático vira aviso e os outros são salvos.
  **(7)+N5** — a trava de tamanho passou a medir o **corpo inteiro do envio** (HTML + fotos em base64), não só as
  fotos da pasta, e a mensagem **diz o que está pesando** (código × fotos).
  **(6)+N3** — o painel agora **lista quais** imagens falharam (até 6), em vez de só contar.
  **(8)** — "Mantém o 4:5" virou "Mantém o formato do slide".
  **(9)** — `lastBaseName` passou a ser **zerado** no `forgetFolderAssets()`.
  🛡️ **PROVA:** o carrossel de 3 slides foi renderizado pelo robô **de antes** e pelo **de agora** — **mesmo
  hash SHA-256, byte a byte idêntico**, 2160×2700, mesmo depois do laço ter sido reescrito.
  **7 testes do robô, todos OK:** tamanhos diferentes (2160×2700, 2160×2700, 2160×2160 + aviso) · medida quebrada
  (avisa) · slide escondido (salva 01 e 03, avisa do 2) · pedir 540 num slide de 1080 → **540×675** (antes saía
  1080×1350) · pedir 8000 num slide de 400 → 3200×4000 **com aviso** · imagem quebrada **diz o endereço** ·
  carrossel comum **sem aviso nenhum**. **No navegador:** aviso lista o arquivo que faltou · nome esquecido ao
  colar (`livrinho` → nulo; baixa como `01.png`/`carrossel.zip`) · trava de tamanho barrou um HTML de 145 MB
  **antes de enviar**, culpando o código · livrinho 13 páginas em 1696×2528 · carrossel 3 slides em 2160×2700.
  **0 erro de JS.**
  ⚠️ **Nota honesta:** a igualdade byte a byte vale **na mesma rodada**. Um slide com **texto em gradiente** deu
  hash diferente entre rodadas separadas (variação de rasterização do Chrome) — por isso o antes/depois é sempre
  comparado **na mesma execução**.
- **✅ TESTE DE PONTA A PONTA (a corrente inteira, com as fotos de verdade):** montei a pasta da peça com o
  molde + as **13 artes reais (44 MB)** e mandei pelo mesmo caminho do botão **📁 Abrir peça** (`loadFolder`).
  Resultado: **13 páginas**, as **13 fotos desenharam**, **zero aviso de foto faltando**, 13 assets em alta
  registrados pro robô. Editei um título pela prévia, cliquei **🖼️ Gerar PNG** e vieram **13 PNGs em 1696×2528**,
  **sem aviso de imagem quebrada**, com a edição dentro. É o elo que faltava: abrir pela pasta → editar →
  exportar no tamanho de gráfica.
- **✅ (2026-08-02) 🫧 NOVO PAINEL: TRANSPARÊNCIA (+ conserto de um defeito antigo do Desfazer):** o Carlos
  quis deixar o cartãozinho de texto do livrinho vazado, pra a arte aparecer por trás. **A distinção que
  importa:** `opacity` desbota **o texto junto** (leitura sofre); mexer só na **cor de fundo** deixa o texto
  sólido. O painel tem os dois modos, com **"Só o fundo" como padrão**.
  **Onde aparece:** `#transptools` é o **primeiro painel que NÃO é exclusivo** — ele aparece **junto** com o
  painel específico (Ajustar foto / Ajustar texto / Ajustes rápidos), porque transparência vale pra todos. A
  única exceção é a **película**, que já tem o Escurecer/Clarear dela.
  **📄 Aplicar em todas as páginas** — a **primeira coisa do editor que mexe em vários slides de uma vez**.
  Alvo = mesma etiqueta + mesmas classes (fora as internas `__ya_*`), dentro de cada slide do `slideList()`.
  A auditoria mostrou que **o Desfazer já dava conta sozinho**: ele guarda um **retrato do documento inteiro**,
  então envolver a mudança em UM `comHistorico` faz **um Ctrl+Z voltar as 12 páginas juntas** — confirmado no
  teste. E a contagem é **honesta**: conta o que REALMENTE mudou ("mudei 11 elementos… (1 já estava assim)");
  apertar de novo diz *"já estavam assim — nada mudou"* e **não gasta passo do Desfazer**.
  🔧 **DEFEITO ANTIGO CONSERTADO (achado na auditoria):** o "antes" dos sliders (`ovBefore` na película, `antes`
  no brilho) só era limpo no evento `change` — que **não dispara se o valor não muda**. Clicar na barrinha sem
  mexer deixava o retrato **preso**; depois de outras edições, o próximo arrasto gravava aquele retrato VELHO e
  **um Ctrl+Z voltava demais**, levando as edições do meio junto. Conserto: `pointerup`/`keyup` também confirmam.
  **Testado com a peça REAL do Carlos** (12 cartões, com as edições dele de `translate`+`scale`): painel aparece
  junto com o de elemento · lê o valor certo (92%) · "só o fundo" muda o fundo e **o texto fica em opacity 1** ·
  as edições dele **convivem** no mesmo `style` · aplicar em todas = 12/12 · **um Desfazer volta as 12 e as
  edições dele sobrevivem** · "tudo junto" aplica `opacity` · Reset limpa só o que o painel escreveu · elemento
  **sem fundo** trava a barrinha e explica · **película não mostra o painel** · foto mostra os dois painéis.
  **Regressão do carrossel:** 3 slides, aplicar em todas OK, **salvo sai limpo**, **Gerar PNG em 2160×2700**.
  **0 erro de JS.** E o teste que reproduz o defeito antigo do Desfazer passou.
- **✅ (2026-08-02) O LIVRINHO ANIMADO + A MOLDURA BRANCA RESOLVIDA:** o Carlos editou a peça de
  verdade (`D:\00- CODIGO\matrix-editor-reference` ⚠️ **essa pasta JÁ NÃO EXISTE — sumiu; ver "CAMINHOS QUE
  MORRERAM" no topo** — ele subiu o cartão de texto 14px e reduziu pra 92,6% nas
  12 páginas) e pediu **duas saídas do mesmo trabalho**: a peça de trabalho (páginas → PNG pra gráfica) e o
  **livrinho que abre e vira página**, pra mandar pra irmã dele (que não mexe com computador e tinha gostado do
  livrinho da outra IA). **A direção é o que faz funcionar:** as páginas são a **fonte da verdade** e o livrinho
  é **descartável** — o script lê as `<section class="slide">` e as embrulha **inteiras**, com o CSS original.
  Nada é redigitado, então **não há como perder edição**. Ferramenta guardada em
  `Subsistemas/Fluxo do Subsistema Livrinho/ferramentas/montar-livrinho-animado.mjs`. **Por enquanto é "na mão"**
  (decisão do Carlos): ele pede, a IA roda. Virar botão ficou pra depois. Entregue em
  `D:\00- CODIGO\livrinho-o-trem-das-aguas-PARA-ENVIAR` (~5,7 MB, pasta com HTML + assets + LEIA-ISTO.txt)
  — ⚠️ **essa pasta também JÁ NÃO EXISTE mais neste PC** (o Carlos a moveu/apagou); pra refazer, use a
  ferramenta `montar-livrinho-animado.mjs` do subsistema.
  **Testado no navegador:** abre/fecha, vira e volta, para no fim, setas do teclado, clique na página, reabre,
  **0 erro de JS**. Ajustes que o Carlos pediu no caminho: o livro estava **pequeno** (eu reservava 190px fixos
  de rodapé — agora **mede** o rodapé de verdade, e entrou um botão **Tela cheia**: 676×504 → **1322×985**).
  🎯 **E o achado dele:** as ilustrações pareciam de **tamanhos diferentes**. Medi as 13: a moldura branca
  desenhada dentro do JPG **variava de 0 px (`pagina-05`) a 119 px (`pagina-03`)**. Corrigido com
  `ferramentas/tirar-moldura-das-artes.ps1` (corta a moldura de cada uma e devolve em 1696×2528, sangrando).
  **Originais preservados em `assets-originais/`.** Preço: estica 7–16% e come ~4 mm de desenho em cima/baixo.
  **O conserto definitivo continua sendo a outra IA gerar as artes já sangrando** — está na receita.
- **⚠️ ACHADO IMPORTANTE (nas artes, não no código):** as 12 ilustrações têm uma **moldura branca desenhada
  dentro do próprio JPG** — **~86 a 92 px (≈ 7 a 8 mm)**, medido pixel a pixel na `pagina-01.jpg`. Numa peça
  impressa isso vira faixa branca em volta e **acaba com a sangria** (se a faca cair 1 mm pra dentro, aparece
  uma tira branca torta). As artes precisam ir **até a borda**. Remendo provisório: zoom ~1,15× no ✂️ Ajustar
  foto, página por página.
- **Pendências não-código:** arte da **capa** (`assets/capa.jpg`, 1696×2528) ainda não existe (o molde já tem o
  lugar dela); confirmar com a gráfica se querem **contracapa** e se aceitam **PNG** ou preferem **PDF**.

**(2026-07-24) 🎚️ ESCURECER/CLAREAR não achava a película "veil" (✅ CORRIGIDO e testado):** o Carlos abriu a
peça "Beleza do zero" (`final.html`, feita pelo studio), clicou na foto do slide 6 e no "🎚️ Escurecer/Clarear"
— e veio *"Não achei a 'película' (overlay/scrim) desta capa"*. **Causa:** essas peças nomeiam a camada de
escurecimento como **`veil`** (`<div class="veil">`), mas o editor só reconhecia classes com **"overlay"** ou
**"scrim"**. (Não foi regressão da auditoria — essa parte não foi tocada; provável que "antes funcionava"
porque as versões pesadas anteriores tinham uma `overlay` criada pelo "Adicionar imagem".) **Correção:** o
editor agora reconhece **"veil"** também. E o reconhecimento — que estava **COPIADO em 5 lugares** (atalho da
capa, painel de camadas, ferramenta "Escurecer/Clarear", detecção de seleção, e o `overlayEl` do painel) e foi
por isso que o "veil" escapou de todos — virou **UM lugar só** (`PELICULA_RE` + `isPelicula()` +
`acharPelicula()`). Assim, um nome novo entra num ponto e vale pra tudo. **Testado no navegador** (Playwright):
na estrutura fiel do slide 6 (`img.photo` + `div.veil`), o atalho aparece, acha a película sem alerta, abre o
painel, nomeia a camada "Escurecimento" e o slider muda o escurecimento; **regressão** OK (`overlay`/`scrim`
seguem detectados, texto comum não é confundido). **0 erro de JS.**

**(2026-07-24) 🔍 AUDITORIA PROFUNDA — correções por etapa:** o Carlos pediu uma vistoria minuciosa de todo
o código. Rodei **3 auditores adversariais em paralelo** (histórico/eventos · salvar/PNG/pasta · ferramentas
de foto/texto) + minha leitura das ~2.500 linhas + **verificação de cada achado no navegador** (Playwright).
**Boa notícia:** nada catastrófico, nada irreversível, e a área mais recente (espelhar/zoom/enquadrar) passou
**limpa**. Achados confirmados viram correção **por etapa de prioridade** (autorizado pelo Carlos, 2026-07-24).
- **✅ ETAPA 1 (impacto alto) — FEITA e testada:**
  1. **Brilho atrás da foto de fundo** (`addBokeh`): usar "🖼️ Adicionar imagem" e depois "✨ Adicionar brilho"
     fazia o brilho nascer como `firstChild` com `z-index:auto`, ATRÁS da foto opaca (o mesmo sumiço de antes,
     por outro caminho). **Correção:** se o slide tem foto de fundo (`<img>` position:absolute), o brilho entra
     LOGO DEPOIS dela, com o mesmo `z-index` → fica na frente da foto, atrás do texto/película. Sem foto de
     fundo, mantém o brilho clássico (firstChild) — zero mudança nas peças que já funcionavam.
  2. **Texto SVG apagava a cor das palavras** (`closeSvgTextEdit`): editar um `<text>` com `<tspan>`s coloridos
     colapsava tudo numa cor só, **em silêncio**. **Correção:** quando há tspans, o editor **pergunta antes**
     (confirm) e ensina o caminho seguro (dois cliques na palavra colorida editam só ela). Texto simples troca
     direto, como antes.
  3. **Salvar na pasta errada após "Abrir peça" cancelado** (`loadFolder`): o `dirHandle` (alvo do Salvar) era
     fixado ANTES de a peça carregar; se o open fosse cancelado ou a pasta não tivesse HTML (os `return`), o
     Salvar mirava a pasta nova com a peça velha. **Correção:** o handle vira **candidato**; o `loadFolder` só
     o adota NO FIM, quando a peça realmente carrega. Open cancelado → tudo continua na peça/pasta anterior.
  **Testado no navegador:** brilho aparece na frente da foto (confirmado por captura); aviso do SVG nos 3
  caminhos (recusa preserva a cor / aceita junta / texto simples troca sem perguntar); salvar mira a pasta
  certa no sucesso e mantém a anterior no cancelamento; e a **regressão** do "Abrir peça" normal segue intacta
  (foto casa, Salvar devolve `./assets/…` sem base64, aviso de foto faltando dispara). **0 erro de JS.**
- **✅ ETAPA 2 (irritação + memória) — FEITA e testada:**
  4. **Ctrl+Z "morto"** (`comHistorico`): botões (centralizar, zoom no limite, "↺ desfazer" sem ajuste,
     "Aplicar" sem mexer no código) gravavam um passo mesmo sem mudar nada — daí um Ctrl+Z "gastava" o passo
     vazio e parecia travado. **Correção:** um ajudante `comHistorico()` tira um retrato ANTES, roda a ação e
     só grava no Desfazer **se a peça mudou de verdade** (o mesmo padrão que arrastes e sliders já usavam).
     Convertidos: setas/zoom/centro (elemento), ajustar foto, ajustar texto, "Aplicar", cor/reset do overlay
     e do brilho, mover brilho.
  5. **Peso de memória do "Adicionar imagem"** (`MAX_HISTORY_BYTES`): com a foto EMBUTIDA (base64), cada um dos
     30 retratos do histórico copiava a foto inteira → memória enchia e o navegador travava. **Correção:** além
     do teto de 30 passos, agora há um teto de **PESO (~80 MB)**: solta os retratos mais antigos até caber
     (mantém ao menos 1). Peças leves seguem com os 30 desfazeres; só as pesadas guardam menos.
  **Testado no navegador:** reset no-op e "Aplicar" sem mudança **não** geram passo (undo fica desabilitado);
  mudança real gera e desfaz limpo; cadeia de 3 desfazeres encadeados OK; e o teto de memória cortou 20
  retratos de 5 MB pra caber nos 80 MB. **0 erro de JS.**
- **✅ ETAPA 3 (bordas) — FEITA e testada:**
  6. **Delete apagava o selecionado com foco num controle** (`handleGlobalKeys`): mexer num slider de
     "Escurecer/Clarear" e apertar Delete removia a película. **Correção:** quando o foco está num controle de
     formulário (INPUT/TEXTAREA/SELECT — slider, seletor de cor, campo), o Delete é pra ele, não remove o
     elemento. Delete "normal" (sem foco em campo) segue removendo.
  7. **"Ver código todo" não encerrava a digitação** (`#full`): abria o código inteiro com a digitação ainda
     ativa por baixo. **Correção:** encerra a edição de texto (comum e SVG) antes de mostrar o documento.
  8. **Limite do Gerar PNG desalinhado** (editor 140 MB × servidor 150 MB, mas o corpo vai em base64 +33%):
     fotos ~112–140 MB passavam no editor e o servidor derrubava depois. **Correção:** limite do editor baixou
     pra ~100 MB (→ ~133 MB de corpo, abaixo do teto do servidor).
  9. **`shrinkToUrl` podia devolver endereço morto** se o canvas falhasse (`toBlob` = null): revogava a foto e
     devolvia o endereço já revogado → foto sumia sem cair no aviso. **Correção:** se o canvas falha, devolve a
     original **sem** revogar.
  10. **`pickName` sensível a maiúscula no Windows:** podia sobrescrever um `-editado.html` já existente com
     caixa diferente. **Correção:** compara ignorando maiúscula/minúscula.
  **Testado no navegador:** Delete com foco num campo não remove (e sem foco remove normal); "Ver código todo"
  encerra a digitação; foto grande encolhe e o Salvar devolve `./assets/…` sem base64; `pickName` pula nome
  já existente mesmo com caixa diferente. **0 erro de JS.**
- **✅ ETAPA 4 (bordas raríssimas) — FEITA e testada** (o Carlos pediu "atacar tudo pra rodar liso"):
  (a) **nome de arquivo ambíguo:** se o MESMO nome existe em pastas diferentes, o casamento "2ª chance por
     nome" é DESLIGADO pra aquele nome (senão duas fotos diferentes casariam na mesma) — o endereço que não
     casa por caminho completo vira aviso, em vez de mostrar a foto errada.
  (b) **salvar preserva o endereço exato:** em vez de forçar tudo pra `./…`, o Salvar devolve o endereço que a
     peça escreveu (`ref.caminho`) — mantém `../pasta-irmã/x.jpg` e o `%20` do espaço.
  (c) **contagem de slides:** `slideList()` (e a barra de slides, que agora usa ela) ignora `.slide-wrapper`
     ANINHADO — conta igual ao robô do Gerar PNG, sem divergir.
  (d) **enquadramento em `px`:** `getObjPos` agora converte `px` → `%` no espaço do "cover", pra a foto não dar
     um pulinho no 1º arraste (antes caía no centro). `%` continua exato; sem medida, cai no centro (seguro).
  (e) **caixinha de texto SVG:** com texto centralizado/à direita, a caixa é movida pra a esquerda (metade da
     folga no centro, a folga toda à direita) pra o texto digitado ficar sobre o texto real (era ~19px torto).
  **Testado no navegador:** `../` e `%20` preservados no salvar; nome ambíguo NÃO casa (vira aviso) e nome
  único casa; wrapper aninhado conta 2 (não 3); `getObjPos` de `0px`→0%, `-225px`→~50%, `%` exato; caixinha
  centralizada desloca 19px (e "start" não desloca). **Regressão** do fluxo comum intacta (`./assets` salva
  exato, sem base64). **0 erro de JS.**
- **Limite declarado (não é bug):** o aviso de foto faltando enxerga `<img>`; foto de **fundo por CSS** não é
  detectada.

**(2026-07-23) ⚠️ AVISO DE FOTO QUE NÃO APARECEU + 📁 UMA porta só de abrir (✅ FEITO e testado):**
**O caso que gerou isto (vale ler — explica tudo):** o Carlos abriu a peça "Beleza do zero" pela pasta
`D:\TEMPORARIA\Nova pasta (2)`. O HTML pedia `./assets/01-hero.jpg` e `./assets/06-pratica.jpg`, mas a pasta
`assets/` só tinha arquivos com nome do Gemini (`Gemini_Generated_Image_….jpg`). O editor procurou pelo nome,
não achou, e **abriu os slides sem foto — calado**. O Carlos achou que a peça era assim e usou o
**🖼️ Adicionar imagem** (que embute em base64, de propósito) pra pôr as fotos: **17 KB → 6,9 MB**. O mundo
editorial (`sistema-de-ideas-html-sv`) veio perguntar se o **Salvar** estava convertendo foto referenciada
em base64 — **não estava**: provado em teste (salvo com 449 caracteres, `src="./assets/01-hero.jpg"` de volta,
zero base64, com espelho/zoom/enquadramento junto). A causa era o silêncio do editor.
**O que entrou:**
**(a) ⚠️ Aviso de foto faltando** — faixa laranja no alto da prévia listando o **nome exato** que falta, a
**descrição** da foto (o `alt` da peça) e **em que slide** ela entra, com botão 📋 **Copiar os nomes** e um
alerta explícito pra **NÃO** usar o "Adicionar imagem" pra resolver. ⚠️ **Decisão de projeto:** o aviso mora
na **PRÉVIA, não no botão de abrir** — quem responde é o próprio navegador ("esta `<img>` desenhou?"), então
vale pra **toda** porta (pasta, arrastar, colar, exemplo) e pega também nome trocado, caminho errado e arquivo
corrompido. Se tivesse sido preso ao "Abrir pasta", não cobriria justamente a porta que o Carlos temia errar.
**(b) 📁 UMA porta só** — o "📂 Abrir HTML" saiu; ficou só **"📁 Abrir peça"** (pede a PASTA). Motivo: com dois
botões o Carlos podia, na pressa, abrir pela porta errada e cair no MESMO estrago. Nada se perdeu: **arrastar
e soltar continua aceitando pasta OU arquivo solto** (e o aviso detecta os dois casos, com conselho diferente
pra cada um).
**(c) 🐛 Nome agora casa ignorando MAIÚSCULA/minúscula** (achado pela auditoria — era o mais grave): pro Windows
`01-Hero.JPG` e `01-hero.jpg` são o MESMO arquivo; pro editor eram diferentes. Sem isso o aviso viraria
armadilha — o Carlos renomearia certo e o editor insistiria que faltava. Junto: `?versao=2` no fim, `%20` de
espaço, `\` do Windows e `./` da frente agora também são tolerados (`normRef()`).
**(d) 🐛 Vazamento de memória** — as fotos da peça anterior nunca eram liberadas; abrir várias peças seguidas
ia entupindo o navegador. Agora são liberadas (com 3s de atraso, pra prévia velha não piscar).
🔧 **Como funciona por dentro:** a busca **inverteu de sentido** — antes era "para cada ARQUIVO da pasta, o
HTML cita ele?"; agora é "para cada endereço que o HTML CITA, existe arquivo?". É esse sentido que revela o
que **falta** (o que alimenta o aviso), e de quebra passou a entender `url(…)` do CSS sem aspas.
⚠️ **Limite declarado:** o aviso enxerga `<img>`. Foto posta como **fundo por CSS** não é detectada.
⚠️ **Ficou de fora (decisão do Carlos):** freio de pasta gigante. Como o botão de pasta virou a única porta,
apontar uma pasta enorme (tipo Downloads) faz o editor ler tudo sem limite e pode travar.
**Testado no navegador** (Playwright, no `editor.html` oficial): pasta com nome MAIÚSCULO casa; nome com
espaço e com `?v=2` casam; foto ausente vira aviso com nome+descrição+slide certos; pasta completa fica
**quieta**; peça **sem foto nenhuma** fica quieta; arquivo solto recebe o conselho **diferente** ("abra pela
pasta"); e o **Salvar** continua devolvendo `./assets/…` sem base64 — **0 erro de JS**.

**(2026-07-22) ⇄ ESPELHAR A FOTO + 🐛 o zoom apagava o enquadramento (✅ FEITO e testado):** o Carlos viu o
botão "virar na horizontal" do app Fotos do Windows e pediu o mesmo no editor. **Antes de implementar rodou a
1ª auditoria pré-implementação** (regra nova, ver `CLAUDE.md`) — e ela pagou: achou **um bug que já existia**
e **uma armadilha** que teria virado "bug misterioso". Saíram as duas coisas juntas:
**(a) ⇄ Espelhar** — botão novo no painel **✂️ Ajustar foto**. O espelho é `transform: scaleX(-1)` no `<img>`:
**não toca no arquivo da foto**, não recorta, não recomprime — e vai junto no **Salvar** e no **Gerar PNG**.
⚠️ **Armadilha (a que a auditoria pegou):** os dois mecanismos de enquadramento **reescrevem ou apagam o
`transform`** em 4 pontos (arrastar com/sem zoom, dar zoom, voltar pro 1×) — se cada um escrevesse direto, o
espelho **sumiria sozinho**. Por isso TODA escrita passa por `setPhotoTf()`, que recoloca o espelho. Outra:
**sem zoom** o enquadramento é `object-position`, e o espelho é aplicado **depois** — o lado inverte na tela,
então o X é invertido de propósito pra a foto continuar **seguindo o mouse** (medido no navegador: nos dois
modos a foto anda **51px pra direita** quando se arrasta pra direita).
**(b) 🐛 Zoom jogava fora o enquadramento** — enquadrar a foto, dar zoom + e voltar pro 1× **apagava o ajuste**
e a foto pulava pro original. `zoomPhoto()` limpava `transform` + `object-position` + `object-fit` de uma vez.
Agora volta **só o zoom**; o enquadramento e o espelho ficam (e o `object-fit` só sai se não sobrou nada).
📌 **Nota pro mundo central (html-studio):** a regra antiga era "**nunca os dois mecanismos ativos**"
(`object-position` **ou** `transform`). Pra consertar o bug (b), agora eles **coexistem** enquanto há zoom —
o `object-position` é o enquadramento de base e o `transform` é só o zoom/pan. **Vale conferir com o
html-studio** se ele lê os dois. **Testado no navegador** (Playwright): espelho liga/desliga, sobrevive a
zoom/arraste nos dois modos, o **↺ desfazer** limpa tudo, o **Ctrl+Z** volta passo a passo, o **salvo sai
limpo com o espelho**, o botão só aparece pra foto, e o enquadramento **sobrevive ao vai-e-volta do zoom**
(38% antes → 38% depois) — **0 erro de JS**.

**(2026-07-22) 🐛 BRILHO NASCIA ATRÁS DO SLIDE (✅ CORRIGIDO e testado):** o Carlos gravou a tela mostrando
que, ao clicar em **✨ Adicionar brilho**, a bolinha de luz **sumia** — só aparecia o pedaço que "escapava"
pra **fora** da borda do slide. **Causa:** `addBokeh()` inseria o brilho no `.slide-wrapper` (a **moldura de
fora**, a que segura a legenda "SLIDE 3") e **antes** do `.slide`. Como o `.slide` tem **fundo opaco**, ele
funcionava como uma cortina fechada por cima: o brilho estava lá, mas **atrás**. De quebra, a centralização
inicial media a **moldura** em vez do slide, então já nascia deslocado. **Correção:** a mesma descida que o
"Adicionar imagem" já fazia — se o alvo não for `.slide`, entra no `.slide` interno antes de inserir
(`editor.html`, `addBokeh()`). **Testado no navegador** (Playwright, no `editor.html` oficial): o brilho
nasce **dentro** do slide, **centro exato batendo com o centro do slide**, como 1º filho (atrás do texto,
na frente do fundo — igual aos bokehs originais), **recortado** na borda; 2º brilho idem; **Desfazer**
(Ctrl+Z) volta certo. ⚠️ **Armadilha pra não repetir:** `targetSlideForInsert()` devolve o
**`.slide-wrapper`**, NÃO o `.slide` — quem for inserir qualquer coisa dentro do slide tem que descer.

**(2026-07-20) 🖼️ ADICIONAR IMAGEM — foto de FUNDO forçada (✅ FEITO e testado):** o Carlos tinha uma peça
(uma capa) **feita SEM foto** — fundo em degradê + "cartãozinho" desenhado por código — e queria **forçar uma
imagem de fundo** só pra ver como ficaria e poder ajustar (ele até pôs a foto numa pasta `assets`, mas o "Abrir
pasta" **ignora** imagem que o código não menciona — de propósito, pra não pesar). Solução (aprovada por **Prévia
A**): botão **🖼️ Adicionar imagem** no topo (irmão do ✨ Adicionar brilho) → escolhe um PNG/JPG do PC → a foto
entra como **FUNDO do slide à vista** (`<img class="hero-photo">`, atrás do texto), **embutida no próprio arquivo**
(base64 — arquivo único, não depende da pasta). Junto entra uma **película de escurecimento** suave (classe
`overlay`) pro texto branco continuar legível. Como a foto vira `<img>` e a película é `overlay`, os **"Atalhos da
capa"** (🖼️ Editar imagem / 🎚️ Escurecer-Clarear), o **Ajustar foto** e o **Painel de Camadas** já a reconhecem
**sozinhos** (reúso total). Entra no **Desfazer** (Ctrl+Z). **Testado no navegador** (Playwright, no `editor.html`
oficial): botão abre o seletor, foto entra de fundo atrás do texto, o **Salvar** sai com a foto embutida e
**limpo**, os Atalhos da Capa + Escurecer/Clarear funcionam, o **Desfazer** remove foto+película com o texto
intacto — **0 erro de JS**. Detalhe técnico (armadilha evitada): `targetSlideForInsert()` devolve o
`.slide-wrapper`, mas a foto é inserida no `.slide` **interno** (o retângulo com `overflow:hidden`) pra ficar
recortada e atrás do `.pad`. Prévia local: `previas/previa-adicionar-imagem.html`.

**(2026-07-18) ✏️ EDITAR TEXTO DE DESENHO / SVG (✅ FEITO e testado):** o Carlos tentou editar os textos
de um **card em SVG** (um "desenho" feito por código — os cards do *Fluxo Gerador de Cards Visuais* da
Pedra Mística) e **não conseguia trocar as palavras**: ao dar dois cliques, o modo de edição **abria mas
travava** (o navegador NÃO deixa digitar dentro de um `<text>` de SVG via `contenteditable`). Solução
(aprovada por **Prévia A**): quando o texto é de SVG, o editor abre uma **caixinha de digitar comum por
cima do texto** (posicionada e com a fonte escalada pra casar); **Enter** confirma, **Esc** cancela,
clicar fora confirma. A caixinha **vive na janela do editor, NÃO dentro da peça** — então **nunca vaza
pro arquivo salvo** (só troca o texto do elemento). Integrada ao **Desfazer** (Ctrl+Z) e limpa nos 4
pontos de troca de DOM (armadilha #1 do handoff). **Testado no navegador** (Playwright): 2 cliques abrem
a caixinha, a troca funciona, o **salvo sai limpo** com o texto novo, o **Desfazer** volta, a prévia
**não congela**, textos **centralizados/à direita** acompanham, **Esc** cancela, e o **texto HTML comum
segue no caminho antigo** (regressão OK) — **0 erro de JS**. Prévia local: `previas/previa-editar-texto-svg.html`.

**(1) Pasta `Subsistemas/`:** o Carlos organizou o mundo por **"subsistemas"** — cada
fluxo/ferramenta grande ganha uma **pasta-casa própria** (receita + exemplos + ferramentas). Nasceu
**`Subsistemas/`** e a 1ª casa: **`Fluxo do Subsistema Slide Mestre/`** (`LEIA-PRIMEIRO.md`). Padrão
dos próximos: **`Fluxo do Subsistema [nome]`** (o próximo cogitado: **SVG**).

**(2) Painel de Camadas (✅ COMPLETO — 3 passos, tudo testado):** o Carlos pediu pra **arrastar
qualquer elemento** com o mouse (hoje só o **texto** arrasta; **SVG e brilho não**) e pra resolver o
"como clicar no que está **atrás**". Solução aprovada por ele via **Prévia A**: um **painel de
camadas estilo Photoshop** na direita do editor. Está sendo feito em **3 passos**: **✅ passo 1 (no
ar e testado)** — a **lista** das camadas do slide (Foto, Escurecimento, Brilho 1/2, Ícone, Texto)
com **clicar pra selecionar**, inclusive as escondidas atrás; **✅ passo 2 (no ar e testado)** — 🔒
**travar (cadeado) + arrastar** qualquer elemento (o SVG inteiro, o brilho) sem pegar o vizinho — tem
um cadeado em cada camada; **✅ passo 3** — 👁 **olho** (mostrar/esconder; o escondido PERSISTE no salvo e no PNG — estilo Photoshop, escolha do Carlos). *(No passo 2
apareceu e foi corrigido um bug: abrir uma 2ª peça SEM recarregar o editor deixava o painel usando a
peça antiga — resolvido zerando a seleção ao ligar cada prévia nova.)* Prévia local (fora do Git):
`previas/previa-camadas.html`.

**(3) Painéis que RECOLHEM (✅ FEITO e testado):** o Carlos mostrou (prints do editor + do Photoshop)
que a **coluna da direita** estava **sufocada** — tanta coisa empilhada que o **código sumia** (virava
uma tirinha de 1 linha). Solução aprovada por **Prévia A**: a direita virou **3 seções que recolhem** —
**Camadas · Ajustes · Código** — cada uma com título clicável (setinha ▾). Fecha o que não usa → o
**código estica** (testado: de ~22px pra ~298px). O editor **lembra** o que ficou fechado
(`localStorage`). Ordem combinada com o Carlos: **arrumar o espaço primeiro** (isto), *depois* voltar
pro painel de camadas (passo 2 e 3). Prévia local: `previas/previa-paineis.html`.

**(4) Auditoria profunda + correções (✅ FEITO, 2026-07-06):** o Carlos pediu uma varredura do
`editor.html`. Fiz minha análise + **2 revisores independentes** (subagentes). Achados e **corrigidos
(todos testados no Chrome)** — 7 bugs: (a) **família do cadeado** — `layerLock` ficava preso num
elemento que sumia ao desfazer / trocar peça / remover / aplicar mudança → a prévia "congelava"
(zerado nos 4 pontos); (b) `suppressClick` pendente engolia o 1º clique depois de um arraste abortado;
(c) **cursor do editor vazava** no salvo/PNG (`cursor:move` no `<body>` — agora limpo no Salvar e no
snapshot do Desfazer); (d) **painel de camadas / Adicionar brilho** falhavam em peças `.slide-wrapper`
(seletor de slide unificado num só lugar: `slideList`/`centralSlide`); (e) as camadas agora **seguem o
slide à vista** ao rolar (antes ficavam no slide do elemento selecionado); (f) **numeração** cobre
Foto/Escurecimento duplicados, não só Brilho/Ícone; (g) abrir HTML avulso / colar / exemplo **depois**
de uma pasta fazia o Salvar gravar na **pasta antiga** e o PNG usar imagens erradas — agora "esquece"
a pasta (`forgetFolderAssets`). **7 bugs, 0 em aberto.** Verificado no navegador (3 lotes de teste +
regressão, 0 erros de JS).

**(5) Arrastar-e-soltar a pasta (✅ FEITO, 2026-07-06):** o Carlos pediu pra **arrastar a pasta**
(peça + imagens) do explorador **direto pro editor**, em vez de clicar "Abrir pasta" e caçar no HD.
Feito: ao arrastar, a tela acende um **"📁 Solte a pasta aqui"**; ao soltar, abre igual ao "Abrir
pasta" (religando as imagens) — e, no Chrome, pega o **handle da pasta** (`getAsFileSystemHandle`),
então dá pra **salvar de volta** nela também. O botão "Abrir pasta" continua como alternativa. Reusa
`loadFolder`/`collectFromHandle`. **2 bugs pegos pelo olho do Carlos e corrigidos:** o overlay
aparecia sozinho ao abrir (o `display:flex` vencia o atributo `hidden` → resolvido com
`.dropzone[hidden]{display:none}`); e o overlay **piscava** ao arrastar (troquei o contador
dragenter/dragleave por **dragover + timer**, jeito robusto). Testado no navegador + confirmado pelo
Carlos arrastando de verdade.

⚠️ **ATENÇÃO, PRÓXIMA IA:** o **"Fluxo de trabalho: Slide-mestre"** (detalhado logo abaixo)
**ATUALIZA uma regra antiga** (a IA **PODE** editar/replicar as peças **quando o Carlos pedir**) e
tem **casa própria** em `Subsistemas/`. O trabalho anterior no editor (Desfazer, Remover, Salvar
como, ✨ Adicionar brilho) **continua no ar e no GitHub**. Num PC novo: leia este arquivo +
`CLAUDE.md` + `memoria/LEIA-PRIMEIRO-BRIEFING.md`.

> ⚠️ **O QUE A PRÓXIMA IA PRECISA SABER NUM PC NOVO:**
> - O editor agora roda em **Node** (`server.mjs`), **não mais em Python**. O PC novo
>   precisa ter o **Node instalado** (o `Abrir-Editor-HTML.bat` avisa se faltar). No 1º
>   uso, o `.bat` instala sozinho a `playwright-core` (leve — usa o Chrome do PC pra o
>   "Gerar PNG", sem baixar Chromium). O `Desligar-Editor-HTML.bat` mata a porta 4599.
> - Os `.bat` estão em **CRLF** (travado por `.gitattributes`). A ferramenta Write gera
>   LF — se editar um `.bat`, **converter pra CRLF** (senão o duplo-clique não roda nada).
> - `node_modules/` e `previas/` ficam **FORA do Git** (local-only): num PC novo o `.bat`
>   recria o `node_modules`; `previas/` (só rascunhos) é recriada quando precisar.
> - **Google Drive VERDE** antes de mexer: os assets pesados das peças (imagens/fontes)
>   viajam pelo Drive, **não** pelo Git.

## 🧩 Fluxo de trabalho: Slide-mestre (NOVO — 2026-07-05) — LEIA PRIMEIRO
> 🏠 **AGORA TEM CASA PRÓPRIA (2026-07-05):** este fluxo ganhou uma pasta dedicada com o manual
> completo — `Subsistemas/Fluxo do Subsistema Slide Mestre/LEIA-PRIMEIRO.md`. O resumo abaixo
> continua valendo; o manual detalhado (e o que crescer: exemplos, ferramentas) mora lá.

**O que é:** um jeito combinado de trabalhar quando o Carlos tem um HTML com **vários slides
iguais** (um carrossel, ex.: 9 slides) e quer que um ajuste feito em UM slide **se repita nos
outros do mesmo tipo** — sem ele ajustar um por um na mão. Ele acerta **um slide** (o "mestre") e
a **IA replica** o padrão pro resto. **Nome oficial (batizado pelo Carlos): "Fluxo de trabalho:
Slide-mestre".**

**⚠️ MUDANÇA DE REGRA (Carlos confirmou em 2026-07-05):** antes, este mundo dizia *"a IA só
constrói o editor; NÃO edita as peças do Carlos nem gera cópias editadas"* (acordo antigo com o
`html-studio`). **Isso mudou.** Agora **a IA PODE editar/replicar as peças do Carlos, QUANDO ELE
PEDIR** — o Slide-mestre é justamente isso. A regra antiga fica **superada** por esta (a menção
antiga na seção "Esclarecimento de papéis", mais abaixo, já está marcada como atualizada).

**Como o Slide-mestre funciona (passo a passo — siga sempre):**
1. O Carlos diz qual **arquivo** e qual **slide** ele mexeu (ex.: *"mexi no slide 2, replica"*).
2. A IA **descobre sozinha** o que mudou — compara o slide editado com os outros do mesmo tipo e
   acha a(s) diferença(s) (posição/`transform`, ícone, cor, tamanho, etc.).
3. Antes de aplicar, a IA **mostra em português comum o que detectou** e **confirma o escopo**
   (quais slides recebem). Slides de **tipo diferente** (ex.: capa e fechamento) normalmente
   ficam **de fora** — confirmar com o Carlos.
4. A IA **aplica só nos slides do mesmo molde**.
5. A IA **salva numa CÓPIA nova** (ex.: `final-editado-2.html`) pra **não perder o original** —
   a não ser que o Carlos peça pra salvar por cima.
6. A IA **confere pela estrutura** (ex.: contar quantas vezes o ajuste aparece) que replicou na
   medida certa — nem a mais, nem a menos.

**Caso real já feito (o teste que validou o fluxo):** arquivo `D:\TEMPORARIA\HTML TESTE\
final-editado.html` (9 slides, "7 palavras que o inglês não traduz"). O Carlos editou o **slide
2** (subiu o bloco de texto 48px + desceu/encolheu a marca-d'água do fundo pra ~63%). A IA
detectou os 2 ajustes e replicou nos **slides 3 a 8** (os slides de "palavra"), **poupando** o
slide 1 (capa com foto) e o 9 (fechamento). Resultado salvo em `final-editado-2.html`. Conferido:
7 ocorrências de cada ajuste (o slide 2 original + os 6 replicados). **Aprovado pelo Carlos.**
> Obs.: a pasta `D:\TEMPORARIA\` é **local deste PC** — os arquivos de teste **não viajam** pro
> PC novo, e tudo bem (eram só pra validar o fluxo). O que importa é o **passo a passo** acima.
> Obs.2: eu (IA) também salvei esse fluxo numa **memória automática** (`fluxo-slide-mestre`), mas
> essa memória fica numa pasta **local do PC** (`.claude\...`) que **NÃO viaja pelo Git** — por
> isso o registro que vale pro PC novo é ESTE aqui, no `STATUS-AGORA.md`.

---

**O que saiu na sessão ANTERIOR do editor (tudo testado e no GitHub):** **✨ Adicionar brilho (bokeh) + painel
de ajuste.** Botão **"✨ Adicionar brilho"** no topo insere uma bolinha de luz (bokeh)
**"completa em si mesma"** (estilos inline — funciona em qualquer slide) no slide à vista, já
selecionada; dá pra pôr **quantas quiser**. Ao selecionar um brilho, aparece um painel com
**Tamanho, Cor** (Ciano/Lilás/Roxo/Branco + cor livre)**, Intensidade e Suavidade** (borrado),
+ **mover/centralizar** (e arrastar). Tudo escrito **inline** (o CSS nunca é reprocessado),
integrado ao **Desfazer** (Ctrl+Z) e ao **Remover**; também ajusta os bokehs que **já existem**
na peça (lê do CSS). Testado no Chrome real (14 checagens da função + regressão Desfazer/Remover
+ layout/Salvar como). **Prévia A aprovada** pelo Carlos (em `previas/previa-brilho.html`,
local-only). Empurrado pro GitHub. — Antes: **💾 "Salvar como…" + reorganização
da barra de botões.** Novo botão **Salvar como…** (ao lado do Salvar) abre a **janela nativa
"salvar aonde"** (`showSaveFilePicker`) pra escolher **pasta + nome** (o **Salvar** continua
salvando a cópia sozinho, como antes). **Lembra a última pasta** usada (opção `id` — vale
até depois de fechar/abrir o editor; na 1ª vez começa na pasta da peça, se houver uma
aberta). Botões reorganizados a pedido do Carlos —
**Cabeçalho:** Abrir HTML · Abrir pasta · Salvar · Salvar como · Desfazer · Remover · Gerar
PNG; **Rodapé:** Aplicar mudança · Ver código todo · Colar HTML · Exemplo (o **Remover**
subiu pro topo; **Colar HTML** e **Exemplo** desceram pro rodapé). **Testado no Chrome real:**
ordem dos botões conferida, "Salvar como" grava o HTML final, botões movidos seguem
funcionando, e **regressão do Desfazer/Remover OK**. **Prévia A aprovada** pelo Carlos antes
(em `previas/previa-botoes.html`, local-only). Empurrado pro GitHub. — Antes: **↩ Desfazer
(estilo Photoshop) + 🗑 Remover elemento** no editor. Agora dá pra **apagar qualquer elemento** da peça
(um ícone SVG, um bloco, um texto): clica nele na prévia → botão **"🗑 Remover"** (ou
tecla **Delete**) e ele some. E um **Desfazer de verdade**: **Ctrl+Z** (ou botão **"↩
Desfazer"** no topo) volta as **últimas 30 edições**, uma a uma — remoção, mover, zoom,
texto, escurecer/clarear, tudo. Por baixo: um histórico que guarda **"retratos" limpos**
do documento (sem os marcadores internos, **mantendo as imagens** da prévia); ao desfazer,
recoloca o retrato **sem recarregar a prévia** (os cliques continuam ligados) e **preserva
a rolagem**. Cada gesto vira **1 passo** (um arrasto inteiro, uma digitação inteira = um
Desfazer só). **Testado no Chrome de verdade** (playwright, 22 verificações + 5 de imagem):
remover pelo botão e pelo Delete, desfazer pelo Ctrl+Z e pelo botão, **3 remoções seguidas
desfeitas uma a uma** (o "estilo Photoshop"), desfazer edição de texto, **cliques ainda
funcionam depois do Desfazer**, e **as imagens voltam a renderizar** após o undo — **zero
erro de JavaScript**. Empurrado pro GitHub. — Antes: **🎚️ Escurecer / Clarear a foto
(overlay)** no editor. Ao selecionar a "película" (`.overlay`) por cima da imagem da
capa, aparece um painel: **Cor** (Preto/Branco + presets **oficiais da marca** — Roxo
`#3E3B75`, Lilás `#6B66CC`, Ciano `#8BE6F5` — + **seletor livre**) e barras **Escurecer
tudo (a foto toda) / Topo / Meio / Baixo** ("Jeito A": no máximo tudo escurece; o
"Escurecer tudo" é um piso uniforme e as zonas têm "platô" pra cada barra pegar). Ao selecionar, o painel **lê o gradiente atual** (do CSS ou
inline) pra iniciar sem "pulo"; ao mexer, escreve um `linear-gradient` **inline** no
overlay (o CSS global nunca é reprocessado); **"Voltar ao original"** tira o inline e
restaura o CSS de fábrica. O ajuste é **preservado ao salvar**. Alinhado com a IA do
**HTML Studio** (recado + 2 HTMLs de exemplo). Validado no navegador (leitura do
gradiente do CSS, ajuste, salvar preserva, reset restaura). Aprovado via **Prévia A
dentro da interface real** (em `previas/`). **Cores oficiais da marca já aplicadas**
(Preto `#0A0612`, Roxo `#3E3B75`, Lilás `#6B66CC`, Ciano `#8BE6F5`, Branco — confirmadas
com a IA do html-studio). Empurrado pro GitHub. — Antes: **🖼️ Gerar PNG (alta resolução, fiel)** no editor. Botão no topo → painel "Carrossel pronto"
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
- ⚠️ **ESCLARECIMENTO DE PAPÉIS (o Carlos alinhou com o studio) — ATUALIZADO em
  2026-07-05, VER RESSALVA NO FIM:** quem **edita
  as peças é o CARLOS, à mão, no gosto dele**. A IA deste mundo **só constrói e
  evolui o editor** — dá dica só se ele pedir; **não edita as peças por ele nem
  gera cópias editadas**. O studio tinha se confundido (achou que a IA editava);
  já foi corrigido. É o propósito original: liberdade de edição pro Carlos.
  > 🔄 **RESSALVA (2026-07-05):** esta regra foi **atualizada pelo Carlos**. Agora a
  > IA **PODE editar/replicar as peças, QUANDO ELE PEDIR** — é o **"Fluxo de trabalho:
  > Slide-mestre"** (ver a seção no topo deste arquivo). O padrão segue sendo o Carlos
  > editar à mão; mas, quando ele pedir pra replicar/repetir um padrão, a IA faz.

## Como ABRIR e FECHAR o editor (IMPORTANTE — mudou)
- **Abrir:** dois cliques em `Abrir-Editor-HTML.bat`. Ele liga o **motorzinho Node**
  (`server.mjs`) num endereço local (`http://localhost:4599`) e abre o **Chrome**
  sozinho. **No 1º uso num PC novo** pode demorar uns segundos (o `.bat` instala a
  `playwright-core`). Precisa ter o **Node** instalado (o `.bat` avisa se faltar).
  **NÃO** abrir o `editor.html` com dois cliques direto — vira `file://`, e nesse modo
  o "salvar na pasta" e o "Gerar PNG" não funcionam. Precisa ser Chrome/Edge.
- **Fechar:** feche a janela preta, OU dois cliques em `Desligar-Editor-HTML.bat`
  (desliga o servidor com segurança — mira só a porta 4599).

## O que já está pronto (estado atual do `editor.html`)
- **Clicar → código → editar ao vivo** (o coração original). O CSS NUNCA é
  reprocessado (gradiente, glow, sombra, blend ficam 100% fiéis).
- **🫧 Transparência — NOVO (2026-08-02):** aparece **junto** com o painel específico
  (é o **único painel não-exclusivo**) em qualquer elemento com texto ou foto; a
  película fica de fora, que já tem o Escurecer/Clarear dela. Dois modos: **"Só o
  fundo"** (padrão — mexe só na cor de fundo, o **texto continua sólido e legível**) e
  **"Tudo junto"** (`opacity`, desbota o texto também). Tem **📄 Aplicar em todas as
  páginas** — a **primeira coisa do editor que mexe em vários slides de uma vez** — que
  volta **inteira com um Ctrl+Z** (o Desfazer guarda um retrato do documento todo) e
  **conta só o que realmente mudou**. Por baixo: `#transptools`, `window.__tpSync`.
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
- **✏️ Editar TEXTO de DESENHO (SVG `<text>`) — NOVO (2026-07-18):** em **cards feitos em SVG** (desenho
  por código), o texto não é texto de site comum — o navegador **não deixa digitar dentro dele** (o modo
  antigo "abria mas travava"). Agora, ao dar **dois cliques** num texto de SVG, abre uma **caixinha por
  cima** pra digitar (**Enter** confirma · **Esc** cancela · clicar fora confirma). A caixinha vive **fora
  da peça** (na janela do editor), então **não vaza pro salvo** — só troca a palavra. Entra no **Desfazer**.
  O texto de site comum continua editando **no lugar** (contenteditable), como antes.
- **🖼️ Adicionar imagem (foto de FUNDO) — NOVO (2026-07-20):** botão **🖼️ Adicionar imagem** no topo (família
  do ✨ Adicionar brilho). Escolhe um PNG/JPG do PC e **força a foto como FUNDO** do slide à vista — **mesmo que
  a peça tenha sido feita SEM foto**. A foto entra **embutida no arquivo** (base64; arquivo único, sem depender de
  pasta), **atrás do texto**, já com uma **película de escurecimento** (pro texto branco continuar legível). A
  foto vira `<img class="hero-photo">` e a película é `overlay` → os **Atalhos da capa** (Editar imagem /
  Escurecer-Clarear), o **Ajustar foto** (zoom/enquadrar) e o **Painel de Camadas** já pegam nela; entra no
  **Desfazer**. Por baixo: `addImageBackground()` insere no `.slide` interno, logo antes do `.pad`. Testado no
  Chrome real (Playwright).
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
- **🎚️ Escurecer / Clarear a foto (overlay) — NOVO:** reconhece a "película" tanto
  como **`overlay`** (wiki/runv) quanto **`hero-scrim`** (7-palavras) — qualquer classe
  com "overlay" ou "scrim". Como o scrim costuma ficar ATRÁS do texto (difícil de
  clicar), tem a **barra "Atalhos da capa"** (aparece ao clicar em qualquer parte de
  um slide com foto): botões **🖼️ Editar imagem** e **🎚️ Escurecer/Clarear** que pulam
  DIRETO pro elemento certo (sem caçar na árvore do código). Painel com **Cor**
  (Preto/Branco + presets
  **oficiais da marca** + **seletor livre**) e barras **Escurecer tudo / Topo / Meio /
  Baixo** (no máximo, tudo escurece). Ao selecionar, **lê o gradiente atual** pra
  iniciar sem pulo; ao ajustar, escreve `linear-gradient` **inline** (o CSS global
  nunca é tocado); **↺ Voltar ao original** restaura o CSS de fábrica; o ajuste é
  **salvo** junto. Espelha a técnica de overlay do html-studio. Validado no navegador.
- **↩ Desfazer (Ctrl+Z, 30 passos) — NOVO (2026-07-05):** histórico estilo Photoshop.
  Botão **↩ Desfazer** no topo + **Ctrl+Z** voltam as últimas **30 edições** (remoção,
  mover, zoom, texto, escurecer/clarear, brilho). Guarda "retratos" **limpos** do documento
  (sem marcadores internos, **mantendo as imagens** da prévia); ao desfazer, recoloca
  head+body **sem recarregar a prévia** (os cliques seguem ligados) e **preserva a rolagem**.
  Cada gesto = **1 passo** (um arrasto/uma digitação inteiros). Testado no Chrome real.
- **🗑 Remover elemento — NOVO (2026-07-05):** botão **🗑 Remover** (no topo) + tecla
  **Delete** apagam o elemento selecionado; entra no Desfazer (Ctrl+Z traz de volta).
  Não deixa apagar o `<body>`/`<html>`.
- **💾 Salvar como… — NOVO (2026-07-05):** botão ao lado do Salvar; abre a **janela nativa
  "salvar aonde"** (`showSaveFilePicker`) pra escolher **pasta + nome** (pode substituir).
  **Lembra a última pasta** usada (opção `id`, vale entre sessões; na 1ª vez começa na pasta
  da peça, se aberta). O **Salvar** normal segue salvando a cópia automática como antes.
- **✨ Adicionar brilho (bokeh) + painel — NOVO (2026-07-05):** botão **✨ Adicionar brilho**
  insere uma bolinha de luz (bokeh) **"completa em si mesma"** (estilos inline — funciona em
  qualquer slide) no slide à vista, já selecionada; **quantas quiser**. Ao selecionar um
  brilho, painel com **Tamanho, Cor** (Ciano/Lilás/Roxo/Branco + cor livre)**, Intensidade,
  Suavidade** (blur) + **mover/centralizar/arrastar**. Escreve tudo **inline** (CSS nunca
  reprocessado); também ajusta os bokehs **que já vêm na peça** (lê do CSS). Os adicionados
  são **clicáveis** (`pointer-events:auto`). Por baixo: `addBokeh()`, painel lê/escreve como
  o de overlay. Testado no Chrome real (14 checagens + regressão).
- **Barra de botões reorganizada — NOVO (2026-07-05):** **Cabeçalho:** Abrir HTML · Abrir
  pasta · Salvar · Salvar como · Desfazer · Remover · Adicionar brilho · Gerar PNG.
  **Rodapé (embaixo do código):** Aplicar mudança · Ver código todo · Colar HTML · Exemplo.

## Atalhos e arquivos novos (tudo já no Git)
- `Abrir-Editor-HTML.bat` — liga o **motorzinho Node** (`server.mjs`) e abre no Chrome.
  No 1º uso num PC novo, instala sozinho a `playwright-core` (pecinha leve).
- `Desligar-Editor-HTML.bat` — desliga o servidor (botão de pânico/limpeza).
- `server.mjs` — motorzinho Node: serve o editor + atende o "Gerar PNG".
- `scripts/render-core.mjs` — o robô que gera os PNGs fiéis (playwright-core + Chrome).

## Caminhos importantes
- Mundo local: `D:\WORKSPACE\Special Vision\portal-idea-editor-html`
  - ⚠️ **A pasta MUDOU DE LUGAR em 2026-08-29.** Antes era `D:\PORTAL IDEA\portal-idea-editor-html`
    (essa pasta hoje está **vazia** — o ecossistema inteiro foi pra `D:\WORKSPACE\Special Vision\`).
    **Nenhum código quebrou:** o `.bat`, o `server.mjs` e os ganchos usam caminho relativo
    (“a pasta onde eu estou”). Só os **mapas escritos** apontavam pro lugar velho — corrigidos.
- Conversa entre mundos (local-only, fora do Git): `D:\WORKSPACE\Special Vision\conversa-entre-mundos\`
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
2. **📦 `npm install`** — o `node_modules/` **não viaja** pelo Git. Sem isso o
   **Gerar PNG não funciona** (falta o `playwright-core`). O `Abrir-Editor-HTML.bat`
   tenta instalar sozinho no 1º uso, mas rodar à mão é mais garantido.
3. **🟢 Google Drive:** confirme que os ASSETS das peças (imagens/fontes) terminaram
   de baixar (ícone verde). Eles viajam pelo Drive, **não** pelo Git.
3. **Ler o retrato vivo:** este `STATUS-AGORA.md`.
4. **`conversa-entre-mundos`** é local-only (fora do Git) — copie à mão se for o caso.

### Ao SAIR de um PC/chat (antes de desligar / trocar)
- [ ] **Git publicado:** tudo commitado e empurrado (o vigia avisa se sobrou commit).
- [ ] **🟢 Google Drive sincronizado** (verde) antes de desligar — causa #1 de PC desatualizado.
- [ ] **`conversa-entre-mundos` com backup**, se mexeu nela.

## Próximo passo — PRÓXIMA IA, RETOME ASSIM  *(reescrito em 2026-08-09)*

### Onde a conversa parou, exatamente
O Carlos **trocou de PC** e pediu pra consolidar tudo. Antes disso ele fez duas coisas
importantes que definem o rumo:
1. **Chamou o foco de volta:** o mundo é pra **editar HTML de peças de cliente**. O livrinho
   virou distração e **está pausado**. (Detalhes no bloco `🎯 O FOCO`, no topo.)
2. **Pediu a auditoria** dessa área. Feita, **nada quebrado**, resultado no mesmo bloco.

### As perguntas que estavam em aberto — ✅ AMBAS RESPONDIDAS em 2026-08-29
(o texto ~~riscado~~ é o estado antigo, mantido pra contar a história)
1. ✅ **RESPONDIDA em 2026-08-29** — 🫧 **O painel de Transparência**: ele mandou **tirar de vez**.
   Removido do `editor.html` (painel + o bloco de código dele + os 4 fios). O código vive no
   histórico do Git (commit anterior a essa remoção) se um dia o livrinho voltar. As peças que já
   foram editadas com ele **continuam iguais** — o que ele escrevia era CSS de verdade
   (`opacity` / cor com transparência) dentro do elemento, não uma marca do editor.
2. ✅ **RESPONDIDA em 2026-08-29** — 🎨 **O painel de Cor do texto**: ele avaliou a Prévia A e
   mandou implementar. **Está no `editor.html`**, com um acréscimo decidido por ele: pinta também
   **texto de desenho (SVG)**, que se pinta por `fill` e não por `color`. Testado no navegador
   (leitura da cor · pintura · atalhos vindos da peça · aplicar em todas · Desfazer passo a passo ·
   salvar limpo · **Gerar PNG 3 slides em 2160×2700**). ⚠️ Ressalva: pintar a caixa só "desce" a
   cor pros filhos **sem cor própria** — ver o aviso no topo de
   [`logs/handoff/PENDENTE-painel-cor-do-texto.md`](logs/handoff/PENDENTE-painel-cor-do-texto.md).
   ~~O painel de Cor do texto ficou **pronto e testado numa Prévia A**, mas **ele não chegou a
   aprovar** — a sessão virou antes. O código está guardado em
   [`logs/handoff/PENDENTE-painel-cor-do-texto.md`](logs/handoff/PENDENTE-painel-cor-do-texto.md)
   (a prévia em si **não viaja**: `previas/` é local-only). **Não aplique sem o "vai" dele.**~~

### Se ele quiser retomar o livrinho (só se ele pedir)
Está tudo pronto em `Subsistemas/Fluxo do Subsistema Livrinho/` — molde, receita pro outro
sistema e duas ferramentas (montar o livrinho animado · tirar a moldura das artes). O que
faltava era **não-código**: artes novas sangrando até a borda, a arte da capa, e confirmar com a
gráfica (contracapa? PNG ou PDF?). ⚠️ As pastas de trabalho em `D:\00- CODIGO\` **sumiram** — a
peça que ele tinha editado (cartão de texto subido 14px e reduzido pra 92,6%) **se perdeu**; o
molde no Git é o ponto de partida de novo.

### O jeito de trabalhar com ele (não improvise)
- **Conversar → Prévia A → ele aprova ("vai") → aplica no `editor.html` → testa no navegador →
  publica.** Ele **não programa**: traduza todo termo técnico, **uma pergunta por vez**, respostas
  curtas.
- **Sempre pergunte "quer auditoria antes?"** depois do "vai" e **antes da primeira linha** — nunca
  pule, nem em mudança pequena.
- **Publicar depois de sucesso é pré-autorizado** (implementou + testou funcionando → commit e push
  na hora, e atualize este arquivo). Se falhou ou ficou pela metade, **não suba**.
- Ideias antigas que ele levantou e nunca foram feitas (**só se ele pedir**): copiar/colar/duplicar
  elementos entre slides · mais "botões de adicionar elemento" (o ✨ brilho foi o primeiro da
  família) · arrastar as bordas da caixa de texto com o mouse · janela de recorte de foto completa.
- 🧪 **Como testar o editor no navegador** (sem depender do Carlos clicar): há memória
  auto (`testar-editor-no-navegador`) com a receita — dirige o Chrome real com o
  **playwright-core** do projeto contra o servidor em `http://localhost:4599/editor.html`
  (esperar o `#__ya_style` aparecer antes de interagir). **Ligue o servidor** com
  `node server.mjs` (ou o `.bat`) — nesta sessão ele estava **desligado** ao encerrar.
- Evoluções antigas possíveis, **só se o usuário pedir**:
  - **Arrastar as bordas da caixa de texto com o mouse** (alças, igual Photoshop).
  - **Janela de recorte de foto completa** (quadro 4:5 travado e arrastável).
- **Regras de sempre:** conversar antes; aprovação explícita antes de criar/editar;
  traduzir todo termo técnico (ele **não programa**); **uma pergunta/etapa de cada vez**,
  respostas curtas; testar no navegador antes de dizer que funciona; no fim do chat,
  atualizar este arquivo.
