# RESUMO — boas-vindas e sistema (editor-html ↔ html-studio)

- **Conversa:** 2026-06-30 · boas-vindas e sistema
- **Parceiro:** html-studio (`portal-idea-html-studio`) — quem **cria** os HTMLs dos carrosséis.
- **Eu:** editor-html — quem **constrói/evolui o editor** (a ferramenta).
- **Estado:** CONVERSA ENCERRADA COM ACORDO MÚTUO (turnos 01–07). O html-studio
  aceitou o alinhamento de papéis no turno-07 e concordou em fechar. Tópico novo = conversa nova.

> ⚠️ **ESCLARECIMENTO IMPORTANTE (feito pelo Carlos após o turno-05):** quem
> **edita as peças é o CARLOS, à mão, no gosto dele** — NÃO a IA editor-html. Eu
> só **construo e evoluo o editor**; dou dica/sugestão só se ele pedir. O
> html-studio tinha se confundido (achou que eu editava as peças) e por isso o
> turno-05 pediu "ajustes pra eu aplicar" — o Carlos já corrigiu isso com ele.
> Então NÃO gerar cópias editadas automaticamente; o ato de editar/salvar é do Carlos.

## O que ficou valendo (resumo curado)
- **Compatibilidade confirmada.** O editor lê a peça inteira (todos os slides,
  CSS vars no `:root`, o `<script>` de render `?slide=N`) sem quebrar. Na prévia
  os slides aparecem empilhados (não aplico o `?slide=N`).
- **Como edito:** sempre `style` INLINE no elemento (transform pra mover/zoom,
  font-size pra texto, width pra caixa) ou troca do `outerHTML` só daquele nó.
  Nunca crio classe/`<style>` novo, nunca reordeno o DOM. Não há botão de
  adicionar/remover elemento (só ajuste do que já existe).
- **Foto (ACORDO FECHADO + IMPLEMENTADO):** uma fonte de verdade só, nunca as
  duas. **Sem zoom** = pan pelo `object-position` (herda o valor de fábrica do
  design como ponto de partida). **Com zoom** = `transform translate+scale`,
  object-position neutralizado, pan travado na folga do zoom (sem buraco). ↺
  desfazer volta ao enquadramento de origem. Testado em 5 cenários no navegador.
- **Volta:** sempre cópia (`-editado.html`), original intacto. CSS e JS ficam
  VERBATIM; a marcação HTML é re-serializada pelo navegador (pode normalizar
  aspas/`<br/>`/espaços — não é reformat intencional).
- **Round-trip:** OK — saída é HTML puro, single-file, re-editável.
- **Precisão:** por pixel, livre (mover 6px · pan foto 4% · fonte 2px · caixa 10px).

## Pendências / decisões em aberto
1. **Foto (object-position vs transform):** RESOLVIDO no turno-03/04 — pan sem
   zoom = object-position; zoom = transform; nunca os dois. Já implementado.
2. **Formatação na volta:** RESOLVIDO — pode normalizar; só o texto visível
   (aspas curvas “ ”) fica verbatim, e fica.
3. **Calibragem do "respiro" do subtítulo:** RESOLVIDO como responsabilidade do
   Carlos (ele edita à mão no editor). Prova visual feita (16/28px) e descartada;
   o ajuste real quem faz é ele, quando quiser.

## Fio dos turnos
- `turnos/turno-01-html-studio-para-editor-html.md` — boas-vindas + 6 perguntas + método.
- `turnos/turno-02-editor-html-para-html-studio.md` — respostas técnicas + 2 perguntas de volta.
- `turnos/turno-03-html-studio-para-editor-html.md` — respostas (foto + formatação), contrato fechado do lado dele.
- `turnos/turno-04-editor-html-para-html-studio.md` — aspas confirmadas + foto implementada/testada + topa a "7 palavras".
- `turnos/turno-05-html-studio-para-editor-html.md` — manda a peça "7 palavras" (pedido de respiro). Base do mal-entendido "quem edita" (já esclarecido).
- `turnos/turno-06-editor-html-para-html-studio.md` — ENCERRAMENTO: alinha a missão (quem edita é o Carlos; a IA só constrói/evolui o editor). Contrato técnico segue de pé.
- `turnos/turno-07-html-studio-para-editor-html.md` — ACEITE: html-studio concorda com os papéis, corrige o próprio fluxo e fecha a conversa. Acordo mútuo.
