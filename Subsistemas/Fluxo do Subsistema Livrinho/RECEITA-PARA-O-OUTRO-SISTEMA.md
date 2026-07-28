# 📐 Receita do LIVRINHO 14×21 — formato para o Editor HTML

> **Para quem é este arquivo:** para o **sistema que gera os livrinhos**
> (a IA/ferramenta que criou o `matrix-portable-preview`). Este documento é
> **auto-suficiente** — pode ser enviado sozinho, sem mais nada junto.
>
> **Arquivo de exemplo, já pronto e funcionando:** `molde-livrinho-14x21.html`
> (na mesma pasta). Copiar dali é o caminho mais rápido.

---

## Por que este formato existe

O livrinho vai ser **editado à mão** no **Editor HTML** do Carlos e depois
**exportado em PNG** para a gráfica imprimir.

O Editor HTML tem uma característica que decide tudo: ele **renderiza o HTML de
verdade num `<iframe>` e nunca reprocessa o CSS** — então gradiente, sombra,
blend e fonte saem 100% fiéis. Em troca, ele trabalha **em cima do que está na
tela**: clicar num elemento mostra o código *dele*, e o "Salvar" grava **o
documento como ele está no navegador**.

**Consequência prática (o ponto mais importante desta receita):**

> ❌ **O conteúdo NÃO pode ser montado por JavaScript.**
> Se o texto e as imagens vivem numa lista dentro de um `.js` e o HTML nasce
> vazio, o editor até deixa mexer na tela — mas ao reabrir, o script monta tudo
> de novo e **apaga a edição**. Foi exatamente o que aconteceu na primeira
> versão (`app.js` com o array `pages`).
>
> ✅ **O texto e o `src` das imagens precisam estar escritos no HTML**, em
> etiquetas de verdade. Sem `innerHTML`, sem template, sem framework.

---

## O esqueleto (é o mesmo do carrossel)

Cada página é **uma `<section class="slide">`**, uma embaixo da outra, no `<body>`.
Nada de capa animada, virada de página, grampo desenhado ou painel lateral: isso
é **encenação de prévia** e não pode existir dentro da página, porque **entra na
foto que vai pra gráfica**.

```html
<section class="slide">
  <img class="page-photo" src="./assets/pagina-01.jpg" alt="descrição da arte">
  <div class="veil"></div>          <!-- opcional: escurecimento -->
  <div class="pad">
    <div class="page-copy">
      <h2 class="page-title">Título da página</h2>
      <p class="page-text">Texto da página, escrito aqui mesmo.</p>
    </div>
  </div>
  <span class="page-number">1</span>
</section>
```

### O que cada peça significa para o editor

| Elemento | Por que tem que ser assim |
|---|---|
| `<section class="slide">` | É como o editor e o robô do PNG **acham as páginas**. Uma página = um `.slide`. **Não aninhe** um `.slide` dentro de outro. |
| `<img class="page-photo">` | Tem que ser `<img>` de verdade (não `background-image`). É o que liga as ferramentas de **zoom, enquadrar e espelhar** a foto — e o **aviso de foto faltando**. |
| `<div class="veil">` | Nome reservado: o editor reconhece `veil`, `overlay` e `scrim` como "película" e abre o **Escurecer / Clarear**. Qualquer outro nome não é reconhecido. |
| `<div class="pad">` | A **área segura**. Todo texto vive aqui dentro, nunca encostado na borda (a gráfica corta a borda). |
| `alt="..."` | Aparece no aviso quando a arte está faltando. Descreva a cena em português. |

---

## As medidas (não invente outras)

| | Valor | Observação |
|---|---|---|
| Página na tela (CSS) | **848 × 1264 px** | é **metade** do tamanho final |
| Página no PNG | **1696 × 2528 px** | o robô fotografa em **2×** |
| No papel a 300 dpi | 143,6 × 214,0 mm | |
| Formato final (cortado) | **140 × 210 mm** | 14×21 cm, livreto grampeado |
| Sangria (a sobra cortada) | ~1,8 mm nas laterais · ~2,0 mm em cima/baixo | ≈ 11 px de CSS |
| Margem segura (`.pad`) | **44 px** da borda | nada de texto além disso |

**Por que "metade na tela e dobro no PNG":** é o mesmo truque que o carrossel do
Instagram já usa (1080 px na tela → 2160 px no PNG). A página fica confortável de
editar e o PNG sai grande e nítido. O texto **não** é ampliado como imagem — o
navegador redesenha tudo em alta resolução.

### As artes
- Entregar em **1696 × 2528 px** (é exatamente o tamanho da página no PNG).
- `.jpg` na pasta **`assets/`**, ao lado do HTML.
- Nomes: `capa.jpg`, `pagina-01.jpg` … `pagina-12.jpg`.
- **Sem texto queimado dentro da arte** — o texto é HTML, para poder ser corrigido.
- A arte sangra até a borda: nada importante nos **~3 mm** de fora, que serão cortados.

#### ⚠️ Achado nas artes atuais: moldura branca desenhada dentro do arquivo
As 12 artes do livrinho de São Lourenço têm uma **borda branca de ~86 a 92 px
(≈ 7 a 8 mm) desenhada dentro do próprio JPG**, em volta da ilustração — medido
pixel a pixel em `pagina-01.jpg`.

**Por que isso é um problema numa peça impressa:** a página fica com uma moldura
branca em volta, e não sobra **sangria** nenhuma. Se a faca da gráfica cair 1 mm
para dentro, aparece uma faixa branca torta na borda do livro.

**O que a arte precisa ser:** a ilustração tem que ir **até a borda do arquivo**,
sem moldura, sem margem branca. O que passar dos ~3 mm de fora é descartado no
corte — é para isso que serve a sangria.

*(Enquanto as artes novas não vêm, dá para disfarçar no editor: selecionar a foto,
abrir **✂️ Ajustar foto** e dar um zoom de ~1,15× — isso "come" a moldura branca.
É remendo, não solução: perde-se um pouco da arte e é preciso repetir página a
página.)*

### A plaquinha do tamanho
No `<head>`, uma linha só:

```html
<meta name="sv-export-largura" content="1696">
```

É por ela que o "Gerar PNG" vai saber que **esta peça é livrinho** e não
carrossel. Peça **sem** essa linha continua saindo em 2160 de largura (o padrão
do Instagram), como sempre foi.

---

## Regras da gráfica (livreto grampeado)

- O total de páginas do miolo tem que ser **múltiplo de 4**. Hoje: **12** ✅
- A **capa** é a primeira `<section class="slide">` do arquivo. Na exportação ela
  sai como **`01.png`**, e as páginas 1 a 12 saem como **`02.png` … `13.png`**.
- O PNG sai em **RGB**. A gráfica converte para CMYK na impressão e as cores podem
  ficar levemente mais apagadas — normal, só vale avisar a gráfica.

---

## Checklist rápido (antes de entregar um livrinho novo)

- [ ] Um `<section class="slide">` por página, sem aninhar
- [ ] `width: 848px; height: 1264px` na `.slide`
- [ ] Texto **escrito no HTML** (nenhum `.js` montando conteúdo)
- [ ] Foto como `<img class="page-photo">` com `src` para `./assets/…`
- [ ] `alt` preenchido em toda arte
- [ ] Nada de texto fora da `.pad` (margem de 44 px)
- [ ] `<meta name="sv-export-largura" content="1696">` no `<head>`
- [ ] Artes em 1696 × 2528 px dentro de `assets/`
- [ ] Miolo com número de páginas múltiplo de 4
