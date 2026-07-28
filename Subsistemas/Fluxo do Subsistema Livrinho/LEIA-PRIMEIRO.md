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

### Passo 2 — o tamanho do PNG ⏸️ NÃO COMEÇOU (precisa de auditoria antes)
Hoje o "Gerar PNG" sai **sempre em 2160 px de largura** (o padrão do Instagram).
Para o livrinho ele precisa sair em **1696**.

**Onde mora o número:** [`scripts/render-core.mjs`](../../scripts/render-core.mjs),
linha 12 — `const TARGET_W = 2160`. É usado em **uma linha só** (`dsf = TARGET_W /
box.width`).

**Duas notícias boas encontradas na análise:**
- O **1080×1350 do Instagram não está escrito em lugar nenhum**. O robô **mede o
  slide** e calcula a ampliação. Ele já é flexível por natureza.
- O molde já traz a plaquinha `<meta name="sv-export-largura" content="1696">`.
  Hoje ela é ignorada (inofensiva); no passo 2 ela passa a mandar.

**A trava de segurança combinada com o Carlos:**
> A regra vira *"se a peça declarar a largura, usa a dela; **se não declarar, 2160,
> exatamente como hoje**"*. Um carrossel não declara nada → cai no caminho antigo,
> idêntico. E **antes/depois** se gera o PNG de um carrossel de verdade e se
> **compara**: um pixel diferente = desfaz.

**Ordem combinada:** auditoria do "Gerar PNG" **primeiro**, só então o código.

### Ainda em aberto (depende do Carlos)
- ⚠️ **As artes atuais têm moldura branca desenhada dentro do arquivo** (~86 a 92 px,
  ≈ 7 a 8 mm — medido pixel a pixel na `pagina-01.jpg`). Numa peça impressa isso vira
  uma faixa branca em volta da página e **acaba com a sangria**: se a faca da gráfica
  cair 1 mm para dentro, aparece uma tira branca torta na borda. As artes precisam ir
  **até a borda do arquivo**. Remendo provisório: zoom de ~1,15× no **✂️ Ajustar foto**,
  página por página.
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
