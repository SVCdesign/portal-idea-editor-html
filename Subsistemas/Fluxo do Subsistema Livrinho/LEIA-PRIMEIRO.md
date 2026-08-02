# 📖 Fluxo do Subsistema — Livrinho (14×21, para gráfica)

> **O que é este arquivo:** a porta de entrada deste subsistema. Se você é uma IA
> começando agora, leia isto antes de mexer em qualquer livrinho do Carlos.
>
> **Criado em:** 2026-07-28 · **Dono do fluxo:** Carlos.

---

## Em uma frase
Um **livro infantil de verdade** (livreto grampeado 14×21 cm) que o Carlos edita
no **Editor HTML** como se fosse um carrossel — e no fim exporta em **PNG** para
a gráfica imprimir.

## ⚠️ A regra que vale mais que tudo aqui
O **carrossel do Instagram é sagrado.** É o que o Carlos usa **todos os dias**. O
livrinho é **bônus** (uma vez por semana). **Nada deste subsistema pode balançar o
caminho do carrossel.** Se houver dúvida entre "fica mais bonito no livrinho" e
"não arrisca o carrossel", **ganha o carrossel, sempre.**

---

## De onde isto veio (o caso real)
O Carlos apontou um livrinho pronto, feito por **outro sistema**, para saber se dava
para editá-lo aqui:

`E:\Meu Drive\WORKSPACE_ASSETS\Code House\channel-studio-assets\matrix-books\livrinho-sao-lourenco-maria-fumaca\matrix-portable-preview`
*(pasta de referência — **não mexer nela**)*

Ela é um **livrinho animado**: capa que abre, página que vira, 4 arquivos
(`index.html` + `styles.css` + `app.js` + `assets/`). Bonito de mostrar, mas
**impossível de editar aqui** — porque o texto das 12 páginas **não está no HTML**:
está numa lista dentro do `app.js`, e o HTML nasce vazio.

**Por que isso trava tudo:** o Editor HTML edita e salva **o que está na tela**. O
Carlos trocaria a palavra, salvaria, e ao reabrir o script montaria tudo de novo,
**apagando a edição**. Não é bug do editor — é formato incompatível.

**A saída escolhida pelo Carlos:** em vez de ensinar o editor a mexer em JavaScript
(mecanismo novo, frágil), **mudar o formato na origem**. Ele leva a receita para o
outro sistema, que passa a gerar o livrinho já no molde que o editor domina.

---

## O que tem nesta pasta

| Arquivo | Para que serve |
|---|---|
| `LEIA-PRIMEIRO.md` | este guia |
| `RECEITA-PARA-O-OUTRO-SISTEMA.md` | a **especificação**, auto-suficiente. É o que o Carlos entrega ao sistema que gera os livrinhos. |
| `molde-livrinho-14x21.html` | o **molde funcionando**, já preenchido com a história de São Lourenço (capa + 12 páginas). Serve de exemplo **e** de peça inicial. |
| `ferramentas/montar-livrinho-animado.mjs` | transforma a peça EDITADA no **livrinho que abre e vira página** (o que o Carlos manda pra irmã). Ver abaixo. |
| `ferramentas/tirar-moldura-das-artes.ps1` | tira a **moldura branca** desenhada dentro dos JPGs e padroniza tudo em 1696×2528. |

---

## 📖 O livrinho animado (a "peça de mostrar")
O Carlos quer **duas saídas do mesmo trabalho**: a **peça de trabalho** (as páginas soltas,
que ele edita aqui e viram PNG pra gráfica) e a **peça de mostrar** (o livrinho que abre e
vira página, que ele manda pra irmã).

**A direção importa.** Pegar um livrinho-aplicativo e tentar editar por dentro é o que
quebrou lá atrás. O contrário é trivial: as **páginas são a fonte da verdade** e o livrinho
animado é **descartável** — o script lê as `<section class="slide">` da peça editada e as
embrulha **inteiras**, com o CSS original. Nada é redigitado, então **toda edição do Carlos
aparece sozinha** e não há como perdê-la. Editou de novo? Roda o script de novo.

`node "ferramentas/montar-livrinho-animado.mjs"` — os caminhos de entrada e saída estão nas
primeiras linhas do arquivo. Depois é preciso encolher as fotos pra tela (o script de
moldura serve de base) — o livrinho de 13 páginas fica em ~5,7 MB.

⚠️ **Por enquanto é "na mão" (decisão do Carlos, 2026-08-02):** ele pede, a IA roda. Virar
botão no editor ficou pra depois — *"depois a gente evolui com calma"*.

---

## A ideia em três linhas
1. **O livrinho se disfarça de carrossel.** Cada página é um `<section class="slide">`,
   igualzinho aos slides — só que com medida de livro.
2. Por isso o `editor.html` **não precisa aprender nada novo**: clicar, editar texto,
   arrastar, camadas, ajustar foto, desfazer, salvar — tudo já funciona de graça.
3. O **"Gerar PNG" já faz o recorte certo**: ele fotografa **só a caixa da página**.
   Fundo, espaço entre páginas, qualquer coisa de fora **não entra na foto**.

## As medidas (resumo)
- Na tela: **848 × 1264 px** · No PNG: **1696 × 2528 px** (o robô fotografa em 2×)
- No papel: 143,6 × 214,0 mm a 300 dpi → a gráfica corta em **140 × 210 mm**
- Margem segura para texto: **44 px** da borda
- Detalhes e o porquê de cada número: `RECEITA-PARA-O-OUTRO-SISTEMA.md`

---

## ⏳ O que AINDA falta (estado em 2026-07-28)

### Passo 1 — o molde ✅ FEITO
Estes três arquivos. **Não encostam em nenhuma linha do editor** — risco zero para
o carrossel.

### Passo 2 — o tamanho do PNG ✅ FEITO (2026-07-28, depois da auditoria)
O "Gerar PNG" saía **sempre em 2160 px de largura** (o padrão do Instagram). Agora a
peça pode **declarar a largura dela** — e o livrinho sai em **1696 × 2528**.

**Como ficou** (`scripts/render-core.mjs`): na passada de medição, que já abre o
Chrome, o robô lê `<meta name="sv-export-largura">`. Se achar um número válido, usa
ele; **senão usa o `TARGET_W = 2160` de sempre**. O `editor.html` não precisou saber
de nada disso.

**As três blindagens** (todas testadas): sem plaquinha → 2160 · plaquinha com letra,
vazia, zero, negativa, quebrada (1696.5) ou absurda (99999) → 2160 · erro na leitura
→ 2160. Aceita só inteiro entre 200 e 8000, com espaços em volta tolerados.

**A prova de que o carrossel não mudou:** o mesmo carrossel de 3 slides (1080×1350,
com foto, gradiente em texto, brilho e sombra) foi renderizado pelo robô **de antes**
e pelo **de agora**, e os PNGs saíram com o **mesmo hash SHA-256** — byte a byte
idênticos, 2160×2700. Esse teste vive em `previas/`-style, fora do Git; para repetir,
basta guardar uma cópia do `render-core.mjs` antes de mexer e comparar os hashes.

### Passo 2b — o editor mostra o tamanho real ✅ FEITO (2026-07-28)
O texto "2160×2700" estava **escrito à mão em 4 lugares** do `editor.html` e mentia em
qualquer peça que não fosse 4:5. Agora o robô devolve `largura` e `altura` de cada PNG
— **lidos do cabeçalho do próprio arquivo**, não calculados — e o editor mostra o que
veio, no aviso, no contador e em cada cartão. Peças com slides de tamanhos diferentes
aparecem como "tamanhos variados".

### Ainda em aberto (depende do Carlos)
- ⚠️ **MOLDURA BRANCA NAS ARTES — remendada em 2026-08-02; o conserto de verdade continua
  com a outra IA.** As artes vinham com uma borda branca desenhada **dentro** do JPG e —
  pior — **de tamanho diferente em cada uma**: `pagina-05` tinha **0 px** e `pagina-03`
  tinha **119 px**. Lado a lado no livrinho, as ilustrações pareciam de tamanhos
  diferentes (foi o **Carlos** quem viu). **Remendo aplicado:**
  `ferramentas/tirar-moldura-das-artes.ps1` mede a moldura de cada arte, corta e devolve em
  1696×2528 sangrando até a borda. **Preço:** estica de 7% a 16% (perde um tico de nitidez)
  e come ~4 mm de desenho em cima/embaixo. **Os originais ficaram guardados** em
  `assets-originais/`, ao lado de `assets/`. 👉 **Ainda vale cobrar da outra IA as artes já
  sangrando até a borda** — aí o remendo some e a qualidade é máxima.
- A arte da **capa** (`assets/capa.jpg`, 1696 × 2528 px) ainda não existe. O molde já
  tem o lugar dela e um fundo em degradê para não ficar feio enquanto isso.
- Confirmar com a gráfica se querem **contracapa** (o verso) como arte separada.
- Confirmar com a gráfica se aceitam **PNG** ou se preferem **PDF**.

---

## Como usar o molde hoje
1. Copiar `molde-livrinho-14x21.html` para uma pasta que tenha `assets/` com as artes.
2. Abrir o editor pelo atalho `Abrir-Editor-HTML.bat` (nunca abrir o `editor.html`
   com dois cliques — vira `file://` e o "salvar na pasta" para de funcionar).
3. **📁 Abrir peça** → apontar a pasta. As 13 páginas aparecem na barrinha do topo.
4. Editar à vontade: dois cliques no texto, arrastar, ajustar foto, camadas.
5. **💾 Salvar** grava uma cópia na mesma pasta (nunca por cima do original).
