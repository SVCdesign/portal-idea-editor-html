# CLAUDE.md — guia do mundo `portal-idea-editor-html`

> Este é o manual de boot deste mundo. Leia no início de cada chat.
> Espelhos idênticos: `GEMINI.md` e `AGENTS.md` (mudou um, replique nos três).

## Como começar cada chat (boot)
1. Leia este guia.
2. Leia `STATUS-AGORA.md` (raiz) — onde paramos e qual o próximo passo.
3. Leia `memoria/LEIA-PRIMEIRO-BRIEFING.md` — a semente: por que este mundo existe.
4. Confira a **caixa de correio entre sistemas** — o canal **único** (decisão do Carlos,
   2026-09-26): `D:\WORKSPACE\Special Vision\dialogos-entre-sistemas\sistema-de-ideias-e-editor-html\`.
   De `git pull` lá dentro, leia o que for mais novo que `lido-ate\editor-html.md` nas pastas
   `de-sistema-de-ideias\` e `ensinamentos\de-sistema-de-ideias\`, e atualize o marcador.
   Nosso nome no canal é **`editor-html`** e a gente escreve **só** em `de-editor-html\`.
   Duas regras que não se negociam lá: nenhuma credencial (chave/token/senha), e o nome do
   membro protegido não se escreve em lugar nenhum (escreve-se `(a pessoa protegida)`).
5. Se for mexer no editor, abra-o pelo atalho `Abrir-Editor-HTML.bat` (dois cliques —
   liga o endereço local e abre no Chrome). NÃO abra `editor.html` direto: vira
   `file://` e o "salvar na pasta" não funciona.

## O que é este mundo
Um laboratório paralelo de **edição HTML de alta fidelidade**. Existe porque o
editor central (`portal-idea-studio`, React+Konva) perde ~10% de fidelidade ao
traduzir HTML pra camadas. Aqui o HTML é renderizado **de verdade** num `<iframe>`
e o CSS **nunca é reprocessado** — gradiente em texto, glow, blend, sombras e
fontes ficam 100% fiéis. NÃO substitui o editor central; é o experimento ao lado.

O coração é o `editor.html` (o **Editor HTML**, opção B): clica num elemento
na prévia → o código dele aparece e dá pra editar ao vivo, sem tocar no resto.

## Regras que NUNCA se quebram (o jeito do usuário)
- **O usuário não programa.** Traduza todo termo técnico pra português comum.
  Antes de rodar qualquer comando, diga o que faz e se é seguro/reversível.
- **Aprovação obrigatória.** Nada de criar/editar/instalar/publicar sem o "vai"
  explícito dele. Descreva → espere o sim → só então execute. Silêncio não é sim.
  (Única exceção: **publicar no GitHub logo após uma implementação bem-sucedida e
  testada** é pré-autorizado — ver "Convenção de publicação".)
- **Auditoria pré-implementação — PERGUNTE SEMPRE.** Depois do "vai" e **antes da
  primeira linha de código**, pergunte: *"quer uma auditoria antes?"*. Auditoria =
  uma **vistoria do pedaço do editor que vai ser mexido**, caçando **problema que
  já existe ali**: bug escondido, código repetido, armadilha conhecida (ver
  `STATUS-AGORA.md`) e o que vai **brigar** com a novidade. Serve pra não construir
  em cima de chão rachado. Se ele disser **sim** → audite, **mostre o achado em
  português comum** e espere ele decidir o que corrigir antes de seguir. Se disser
  **não** → vá direto pra implementação. **Nunca pule a pergunta**, nem em mudança
  pequena.
- **Conversa antes de código.** "Vamos conversar" / "modo conversa" / qualquer
  pedido de trocar ideia = **discutir, não implementar**. E, nesse modo, siga o
  **jeito de conversar do Carlos** (importante — ele NÃO programa):
  - **Uma pergunta de cada vez.** Peça pra ele mandar as dúvidas **por etapa**, uma
    a uma, e responda cada uma **curta e objetiva**. Despejar muita informação de
    uma vez o atrapalha. Não faça você mesmo uma enxurrada de perguntas, nem
    respostas longas: vá no ritmo dele, uma etapa por vez.
  - **Linguagem humana, o menos técnica possível.** Pode usar o termo técnico, mas
    **sempre explique em português comum** logo em seguida, de um jeito que quem
    não sabe programar entenda perfeitamente. Una os dois: o nome técnico **+** a
    tradução humana. (Ele já deixou isso explícito — não faça ele pedir de novo.)
- **MVP primeiro.** Comece enxuto, cresça guiado.
- **Prévia A vs Prévia B.** Quando o Carlos pedir uma **prévia**, confira qual:
  - **Prévia A (real / alta fidelidade):** um HTML que ele abre no navegador,
    **idêntico ao editor de verdade**, funcionando e **navegável** — como se ele
    estivesse usando o editor real, só que em forma de prévia. É pra **testar de
    verdade** antes de mexer no código oficial.
  - **Prévia B (rascunho / simples):** um HTML **simples**, só pra **mostrar a
    ideia** do que vai ser implementado (ex.: um botão, uma mudança pequena). Não
    precisa ser fiel nem funcional — é só pra **visualizar o conceito**.
  - **Onde ficam as prévias:** sempre na pasta **`previas/`** (na raiz). Ela é
    **local-only** (está no `.gitignore`, **não vem pelo Git**) — num PC novo pode
    não existir: **se não existir, crie**. Toda prévia nasce aí (nunca solta na
    raiz). Abre em `http://localhost:4599/previas/nome.html`.
- **No fim de cada chat:** atualize o `STATUS-AGORA.md` e repita os caminhos das
  pastas (entrada/saída/testes), pro usuário não ter que caçar.
- **Guias espelhados:** mudou `CLAUDE.md`, replique em `GEMINI.md` e `AGENTS.md`.

## Mapa rápido
- `editor.html` — o **Editor HTML** (o editor em si). Abrir/fechar pelos atalhos
  `Abrir-Editor-HTML.bat` / `Desligar-Editor-HTML.bat`.
- `memoria/` — a semente do mundo (briefing + pesquisa). Fica no Git, é leve.
- `Subsistemas/` — casas completas de cada fluxo/ferramenta do editor (a receita +
  exemplos + ferramentas, cada um na sua pasta). Padrão do nome:
  `Fluxo do Subsistema [nome]`. 1ª casa: **Slide Mestre** — ver
  `Subsistemas/Fluxo do Subsistema Slide Mestre/LEIA-PRIMEIRO.md`.
- `STATUS-AGORA.md` — retrato vivo de onde paramos.
- Conversa com os outros sistemas do Carlos: **um repositório só**, privado, no GitHub —
  `D:\WORKSPACE\Special Vision\dialogos-entre-sistemas\` (`SVCdesign/dialogos-entre-sistemas`).
  A nossa conversa com quem **cria o HTML das peças** fica em
  `sistema-de-ideias-e-editor-html\`; as regras de todos os pares, em `regras-comuns\LEIA.md`.
  Os dois lados escrevem no mesmo repositório e dão `git pull` — o Carlos não carrega mais
  arquivo na mão.
  📜 **História, não se aponta mais e não se apaga:** a pasta local
  `D:\WORKSPACE\Special Vision\conversa-entre-mundos\` e as pastas `dialogos-entre-mundos/`
  (a conversa de julho/2026 sobre foto embutida × referenciada está lá).

## Convenção de publicação (casa)
- **Auto-publicar após SUCESSO (regra do Carlos, 2026-07-01):** toda implementação
  **bem-sucedida** — feita **E** testada/verificada funcionando (no navegador) —
  deve ser **commitada e empurrada pro GitHub na hora**, sem esperar um novo "salva".
  Junto, atualize o `STATUS-AGORA.md` e diga o que subiu. **SÓ se bem-sucedida:** se
  o teste falhar, ficar pela metade ou houver qualquer dúvida, **NÃO suba** — pare e
  reporte. (A trava do "vai" continua valendo pra COMEÇAR a implementar; só o
  PUBLICAR depois do sucesso fica pré-autorizado.)
- Galho principal: `main`. Repositório: **privado**.
- Sobe pro Git: código leve + texto (inclui `memoria/`).
- NÃO sobe: assets pesados (imagens/fontes/PNG/vídeo → Google Drive) nem a
  pasta `conversa-entre-mundos/`.
- Repositório: https://github.com/SVCdesign/portal-idea-editor-html
