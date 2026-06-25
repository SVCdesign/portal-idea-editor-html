# STATUS-AGORA — `portal-idea-editor-html`

**Atualizado:** 2026-06-24 · **Motivo:** troca de PC (handoff completo)

## Em uma frente
Mundo recém-nascido (laboratório de edição HTML de alta fidelidade). Onboarding
com a IA central (`portal-idea-studio`) concluído, esqueleto da raiz criado e
**1ª publicação no GitHub feita**. O usuário está **trocando de PC agora** — este
arquivo é o ponto de retomada. Nenhuma frente de código aberta no momento.

## O que já está pronto (estado atual)
- `editor.html` — a casinha (opção B) funcionando: prévia em `<iframe>` que
  renderiza o HTML de verdade + ponte clicar→código + edição ao vivo, **sem
  reprocessar o CSS**. Testada de ponta a ponta (gradiente sobrevive).
- `memoria/` — `LEIA-PRIMEIRO-BRIEFING.md` (a semente: por que o mundo existe) +
  `pesquisa-2026-06-21-editores-open-source.md` (por que editores prontos foram
  descartados).
- `CLAUDE.md` + espelhos `GEMINI.md`/`AGENTS.md` (idênticos) + este `STATUS-AGORA.md`.
- Git no galho `main`, com remote `origin` ligado e **sincronizado** com o GitHub.
- Repositório **privado**: https://github.com/SVCdesign/portal-idea-editor-html
- Onboarding com a studio: turnos 01–03 lidos, turno-02 respondido. (Pendente:
  turno-04, opcional — avisar a studio que a publicação foi feita.)

## ⚠️ Troca de PC — COMO RETOMAR NO PC NOVO
1. **Puxar o mundo do GitHub:** clonar `https://github.com/SVCdesign/portal-idea-editor-html.git`
   para `D:\PORTAL IDEA\portal-idea-editor-html` (ou rodar `git pull` se já existir).
   Isso traz TUDO que está versionado (editor, guias, memória).
2. **Boot:** ler `CLAUDE.md` → este `STATUS-AGORA.md` → `memoria/LEIA-PRIMEIRO-BRIEFING.md`.
3. **Ver o editor:** abrir `editor.html` no navegador (dois cliques, seguro).
4. **A conversa entre mundos NÃO vem pelo GitHub** (é local-only, fora do Git).
   Se ela não estiver no PC novo, o usuário precisa copiá-la manualmente para
   `D:\PORTAL IDEA\conversa-entre-mundos\` (ex.: via pen drive / Google Drive).

## Próximo passo de PRODUTO — PRÓXIMA IA, RETOME ASSIM:
- O passo natural (sugerido pela studio e acordado) é **o usuário abrir a casinha
  e testar com um HTML real dele** (botão "📂 Abrir HTML") pra sentir o que falta.
- **NÃO programar evolução nenhuma antes desse teste.** Primeiro escutar o usuário,
  depois mexer. Direções possíveis (só depois): destacar o trecho no código fonte
  completo, edição visual arrastar-soltar, ou encaixe no `.idea.json` + render fiel.
- Pendência leve e opcional: escrever `turno-04-editor-html-para-studio.md`
  avisando a studio que a publicação no GitHub foi concluída.

## Caminhos importantes
- Mundo local: `D:\PORTAL IDEA\portal-idea-editor-html`
- Editor: `D:\PORTAL IDEA\portal-idea-editor-html\editor.html`
- GitHub (privado): https://github.com/SVCdesign/portal-idea-editor-html
- Conversa com a studio (LOCAL-ONLY, fora do Git):
  `D:\PORTAL IDEA\conversa-entre-mundos\portal-idea-studio + portal-idea-editor-html\2026-06-24-boas-vindas-e-onboarding\`
- Snapshots de handoff: `logs/handoff/`
