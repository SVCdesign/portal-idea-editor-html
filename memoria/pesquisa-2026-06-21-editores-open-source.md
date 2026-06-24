# Pesquisa profunda — editores HTML/CSS open-source de alta fidelidade (2026-06-21)

> **Origem:** pesquisa profunda (deep-research) rodada em 2026-06-21 a pedido do usuário, depois que o GrapesJS foi rejeitado.
> **Método:** 5 ângulos de busca → 20 fontes coletadas → 84 afirmações extraídas → 25 verificadas com voto adversarial (3 juízes cada; precisa 2/3 pra derrubar) → 21 confirmadas, 4 derrubadas.
> **Pergunta:** qual editor open-source, mais robusto que o GrapesJS, edita HTML existente com **alta fidelidade de CSS** (sem quebrar gradiente em texto, glow, blend, pseudo-elementos), rodável local, idealmente visual + código.

---

## Veredito em uma frase

**Nenhum editor *visual* open-source maduro preserva CSS avançado de forma confiável.** Todos os bons ingerem o CSS num modelo interno próprio e **regeneram** o CSS na exportação — e é nessa regeneração que os efeitos finos quebram. O caminho seguro pra fidelidade é **código + prévia ao vivo local** (o CSS nunca é tocado) ou **um editor pequeno próprio**.

---

## Tabela comparativa

| Editor | Licença | Modo | Importa HTML/CSS existente? | Preserva CSS avançado? |
|---|---|---|---|---|
| **GrapesJS** | BSD-3 | Visual + código | Sim | ❌ Regenera e quebra. A **doc oficial admite** que o parser via CSSOM do navegador é "altamente inconsistente" (reordena `box-shadow`, converte cores pra `rgba`, variáveis em shorthand viram string vazia). |
| **Silex v3** | livre | Visual | Sim | ❌ **Construído em cima do GrapesJS** → herda o mesmo defeito. |
| **Webstudio** | AGPL-3.0 (copyleft forte) | Visual | Sim, mas converte CSS em "design tokens" | ❌ Usa **CSS atômico** (uma propriedade por regra) e regenera; **não suporta seletores combinados** (`.classe.ativa`). Escape-hatch "HTML Embed" preserva CSS exato, mas aí não dá pra editar visualmente. |
| **Puck** | MIT | Visual | ❌ **Não importa HTML** — é editor de **componentes React**. | — |
| **Plasmic** | misto | Visual | ❌ Foco em importar de Figma, não HTML solto. | — |
| **VS Code Live Preview** (Microsoft) | MIT | Código + prévia ao vivo | ✅ Abre o arquivo direto | ✅ **Não toca no CSS** — só serve e mostra num navegador real. |
| **vscode-web-visual-editor** | MIT | Híbrido (clica/arrasta no HTML-fonte) | ✅ Edita o HTML-fonte real | ✅ Não reprocessa o CSS. Mexe em estrutura/posição; não estiliza regras CSS avançadas visualmente. |
| **Web-Maker** | MIT | Código + prévia ao vivo (offline) | ✅ | ✅ Playground, não reprocessa. |
| **Phoenix Code** | open-source | Código + prévia ao vivo | ✅ | ✅ Live Preview em tempo real. |

> Métricas de GitHub (estrelas/commits/releases) eram de jun/2026 e mudam com o tempo — reconferir quando for decidir.

---

## Quem tem o MESMO problema do GrapesJS (evitar pra fidelidade)

- **GrapesJS** — a falha que quebrou os 7 títulos do carrossel é **assumida na doc oficial**, não foi azar.
- **Silex** — é GrapesJS por baixo.
- **Webstudio** — regenera via CSS atômico + licença AGPL "contaminante".

## Quem preserva melhor o gradiente em texto e cia.

Só as ferramentas que **não regeneram o CSS**: as de **código + prévia ao vivo** (VS Code Live Preview, Web-Maker, Phoenix Code) e o **vscode-web-visual-editor** (que edita o HTML-fonte direto). Fidelidade = 100% porque é o próprio HTML rodando num navegador real.

---

## Recomendação da pesquisa

1. **VS Code Live Preview** (Microsoft, MIT) — código + prévia ao vivo, risco zero de quebra de CSS. Caminho mais simples e seguro. **Não** tem "clicar→código".
2. **vscode-web-visual-editor** (MIT) — clica no elemento → acende no código-fonte; edita estrutura/posição sem reprocessar o CSS. É o que mais se aproxima do desejo do usuário ("clicar e achar"), mantendo fidelidade. Ajuste fino de estilo ainda é editar o texto do CSS, mas **sabendo onde**.
3. **Construir um editor pequeno próprio** (a "casinha da IA do editor") sobre o `.idea.json` + render real em iframe — elimina 100% o problema de reprocessamento e alinha com a arquitetura já existente do Portal IDEA.

---

## Afirmações DERRUBADAS na verificação (registrar pra não repetir como verdade)

- ❌ "O editor visual do Webstudio **não consegue** criar gradiente em texto visualmente" — derrubada (2 de 3 juízes). O ponto que **continua de pé** é o de **regenerar/quebrar no round-trip**, não o de "não criar".
- ❌ "Plasmic importa **só** de Figma" — derrubada (3 de 3). Evitar afirmar isso categoricamente.
- ❌ "Phoenix Code é o sucessor oficial do Brackets feito pela equipe brackets.io" — derrubada (2 de 3). Não afirmar a linhagem oficial.
- ❌ "Webstudio combina edição visual + HTML/CSS completo de forma transparente" — derrubada (3 de 3).

## Ressalvas honestas

- Nada foi testado com os arquivos reais do usuário — conclusões vêm de doc oficial e arquitetura declarada, não de um round-trip empírico.
- **Mitigação não testada do GrapesJS:** ele oferece `setCustomParserCss` + plugin `grapesjs-parser-postcss`; em tese um parser PostCSS custom poderia melhorar o round-trip. Vale um teste isolado de 1 slide antes de descartar de vez, já que o GrapesJS já estava montado.

## Perguntas em aberto que a pesquisa levantou

1. O GrapesJS com parser PostCSS custom salvaria `background-clip:text`? (teste isolado de 1 slide)
2. O usuário precisa mesmo de visual arrastar-soltar, ou código + prévia ao vivo basta?
3. Vale construir um painel próprio sobre o `.idea.json` + iframe (render real), eliminando o reprocessamento? (mais alinhado com a arquitetura já planejada)
4. Em que navegador os slides finais são consumidos? Se for sempre Chromium, ferramentas com motor de navegador real garantem render idêntico à produção.

---

## Fontes principais (qualidade entre parênteses)

- github.com/GrapesJS/grapesjs (primária) · grapesjs.com/docs/guides/Custom-CSS-parser.html (primária)
- github.com/silexlabs/Silex (primária) · github.com/silexlabs/grapesjs-css-variables (primária)
- github.com/webstudio-is/webstudio (primária) · webstudio.is/faq/styling (primária) · help.webstudio.is/importing-a-static-website-into-webstudio (oficial)
- github.com/puckeditor/puck (primária) · github.com/measuredco/puck/discussions/503 (fórum)
- github.com/plasmicapp/plasmic (primária)
- github.com/urin/vscode-web-visual-editor (primária)
- github.com/microsoft/vscode-livepreview (primária)
- phcode.io (primária) · github.com/chinchang/web-maker (primária)
- openalternative.co/alternatives/plasmic (secundária) · unlayer.com/blog/grapesjs-alternative-top-options (blog)
