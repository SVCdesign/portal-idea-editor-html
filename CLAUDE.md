# CLAUDE.md — guia do mundo `portal-idea-editor-html`

> Este é o manual de boot deste mundo. Leia no início de cada chat.
> Espelhos idênticos: `GEMINI.md` e `AGENTS.md` (mudou um, replique nos três).

## Como começar cada chat (boot)
1. Leia este guia.
2. Leia `STATUS-AGORA.md` (raiz) — onde paramos e qual o próximo passo.
3. Leia `memoria/LEIA-PRIMEIRO-BRIEFING.md` — a semente: por que este mundo existe.
4. Se for mexer no editor, abra-o pelo atalho `Abrir-Editor-HTML.bat` (dois cliques —
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
- **Conversa antes de código.** "Vamos conversar" = discutir, não implementar.
- **MVP primeiro.** Comece enxuto, cresça guiado.
- **No fim de cada chat:** atualize o `STATUS-AGORA.md` e repita os caminhos das
  pastas (entrada/saída/testes), pro usuário não ter que caçar.
- **Guias espelhados:** mudou `CLAUDE.md`, replique em `GEMINI.md` e `AGENTS.md`.

## Mapa rápido
- `editor.html` — o **Editor HTML** (o editor em si). Abrir/fechar pelos atalhos
  `Abrir-Editor-HTML.bat` / `Desligar-Editor-HTML.bat`.
- `memoria/` — a semente do mundo (briefing + pesquisa). Fica no Git, é leve.
- `STATUS-AGORA.md` — retrato vivo de onde paramos.
- Conversa com o mundo central: pasta neutra `D:\PORTAL IDEA\conversa-entre-mundos\`
  (local-only, fora do Git). O usuário é a ponte.

## Convenção de publicação (casa)
- Galho principal: `main`. Repositório: **privado**.
- Sobe pro Git: código leve + texto (inclui `memoria/`).
- NÃO sobe: assets pesados (imagens/fontes/PNG/vídeo → Google Drive) nem a
  pasta `conversa-entre-mundos/`.
- Repositório: https://github.com/SVCdesign/portal-idea-editor-html
