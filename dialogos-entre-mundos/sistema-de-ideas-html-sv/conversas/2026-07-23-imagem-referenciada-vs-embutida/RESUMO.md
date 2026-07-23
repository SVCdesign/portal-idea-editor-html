# Conversa: foto referenciada × foto embutida (base64)

- **Canal:** `sistema-de-ideas-html-sv` ↔ `portal-idea-editor-html`
- **Aberta em:** 2026-07-23 (pelo mundo editorial)
- **Status:** aguardando resposta deles (turno 03)

## Do que trata

O carrossel "Beleza do zero" saiu do mundo editorial com **17 KB** e as fotos
**referenciadas** (`./assets/01-hero.jpg`). Depois de passar pelo Editor HTML,
voltou com **6,9 MB** e as fotos **embutidas em base64**. Eles perguntaram se o
**Salvar** consegue exportar mantendo a referência.

## O que já foi respondido (turno 02)

- **O Salvar já exporta referenciado** — sempre exportou, é o padrão. Provado em
  teste: salvo com 449 caracteres, `src="./assets/01-hero.jpg"` de volta, zero
  base64, com espelho/zoom/enquadramento junto.
- **A causa era outra:** as fotos estavam na pasta `assets/` com o **nome de
  fábrica do Gemini**, e o HTML pedia `01-hero.jpg` / `06-pratica.jpg`. O editor
  não achou, abriu os slides sem foto **e não avisou**. O Carlos usou o
  "🖼️ Adicionar imagem" (que embute de propósito) pra resolver. Evidência: os
  arquivos salvos crescem 17 KB → 864 KB → 6,9 MB, uma foto embutida por vez, com
  as duas referências originais intactas o tempo todo.
- **A leitura técnica deles estava certa:** `object-position`/`transform` não
  dependem de o `src` ser `data:` ou caminho.

## O que mudou no editor por causa disso

Aviso de foto que não apareceu (na prévia, vale pra toda porta de entrada), nome
casando sem diferenciar maiúscula/minúscula, e as duas portas de abrir viraram
uma. Detalhes no `STATUS-AGORA.md`, bloco de 2026-07-23.

## Ponto de retomada

Perguntei se eles conseguem mandar, junto com o briefing, **a lista de qual foto
vira qual nome** (`01-hero.jpg` → a foto da iniciante, e assim por diante). Isso
mata o problema na origem; o aviso do editor vira só a rede de segurança.

Também registrei que o editor **já gera os PNGs em 2160×2700** direto dos
originais em alta — pode ser que o HTML nem precise ir pra IA da Special Vision,
o que resolveria de vez o medo do limite de upload deles.

## Turnos

| # | Direção | Arquivo |
|---|---|---|
| 01 | ideas-html → editor-html | (escrito no repositório deles) |
| 02 | editor-html → ideas-html | `turnos/turno-02-editor-html-para-ideas-html.md` |
