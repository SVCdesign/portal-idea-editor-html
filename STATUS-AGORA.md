# STATUS-AGORA — `portal-idea-editor-html`

**Atualizado:** 2026-06-24

## Em uma frente
Mundo recém-nascido (laboratório de edição HTML de alta fidelidade). Acabou o
onboarding com a IA central (`portal-idea-studio`): mundo orientado, convenção da
casa alinhada. Agora nascendo o esqueleto da raiz e indo pra 1ª publicação no GitHub.

## O que já está pronto
- `editor.html` — a casinha (opção B) funcionando: prévia em iframe + ponte
  clicar→código + edição ao vivo, sem reprocessar CSS. Testada de ponta a ponta.
- `memoria/` — briefing (semente) + pesquisa que descartou editores prontos.
- `CLAUDE.md` + espelhos `GEMINI.md`/`AGENTS.md` + este `STATUS-AGORA.md` (esqueleto da raiz).
- Git local com commits, galho `master`, ainda sem remote.
- Repositório no GitHub criado e **vazio**, privado.
- Conversa de onboarding com a studio: turnos 01–03 lidos; turno-02 respondido.

## Próximo passo — PRÓXIMA IA, RETOME ASSIM:
1. Confirmar com o usuário o "vai".
2. Renomear o galho: `git branch -M main`.
3. Ligar o remote: `git remote add origin https://github.com/SVCdesign/portal-idea-editor-html.git`.
4. Publicar: `git push -u origin main`.
5. Conferir que o `editor.html` e a `memoria/` apareceram na página do GitHub.
(Sempre explicando cada passo em português e pedindo o sim antes de rodar.)

## Decisões em aberto
- Pra onde evoluir a casinha: só decidir DEPOIS do usuário testar com um HTML
  real dele (botão "Abrir HTML") e sentir o que falta. Não programar antes disso.
