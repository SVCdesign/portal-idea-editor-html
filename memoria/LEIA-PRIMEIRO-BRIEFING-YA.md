# Briefing — nascimento do mundo `portal-idea-editor-html` (Ya)

> **O que é este arquivo:** a **semente** de um mundo novo que ainda **não nasceu**. Foi escrito em **2026-06-21** dentro do mundo central (`portal-idea-studio`) porque o usuário ia **trocar de PC** e quis deixar tudo registrado pro próximo chat continuar. Quando a IA deste mundo central abrir de novo (no PC novo), é por aqui que ela retoma a conversa do mundo novo.
>
> **Para quem este briefing fala:** em parte pro próximo chat da IA central (pra ela saber onde paramos), e em parte pra **Ya** — o nome combinado da IA que vai cuidar do mundo novo `portal-idea-editor-html`.

---

## 1. O que é o mundo `portal-idea-editor-html`

Um **mundo separado, isolado, de teste/laboratório** — pasta e repositório próprios, fora do sistema central. O nome local será `D:\PORTAL IDEA\portal-idea-editor-html` e o repositório no GitHub seguirá o mesmo nome (`SVCdesign/portal-idea-editor-html`).

**Por que existe:** o usuário sente **muita falta da fidelidade do HTML** — o nível em que o slide final sai **exatamente igual** ao HTML original. O editor atual do sistema central (React + Konva) **traduz** o HTML pra camadas e perde ~10% de fidelidade (gap de fonte Inter web vs. canvas, e efeitos finos de CSS que não sobrevivem à tradução). O usuário quer um lugar pra **experimentar um editor de verdadeira alta fidelidade SEM poluir o sistema central**.

**MUITO IMPORTANTE — isto NÃO é pra abandonar o editor central.** O editor Konva continua vivo e é a fonte de verdade do design. O mundo novo é um **laboratório paralelo**, não um substituto.

---

## 2. O que o usuário quer do editor (na voz dele)

> "Quero clicar num elemento (por exemplo, um texto) na tela e o editor me mostrar, de forma interativa, **onde aquilo está no código** e **como editar** — em vez de eu ficar perdido procurando no meio do código sem saber onde mexer."

Traduzindo em requisitos:

1. **Fidelidade de CSS é inegociável (requisito #1).** O editor não pode quebrar efeitos avançados: gradiente em texto (`background` + `-webkit-background-clip: text` + `color: transparent`), `mix-blend-mode`, `box-shadow`/`text-shadow` (glow), filtros, pseudo-elementos (`::before`/`::after`), `backdrop-filter`, `clip-path`, fontes web. **O CSS do usuário é a fonte de verdade e NÃO pode ser reprocessado/regenerado.**
2. **Ponte "clicar → código".** Clicar no elemento na prévia e ele acender/mostrar o pedaço de código correspondente.
3. **Edição:** o ideal seria visual (arrastar-soltar) **e** código no mesmo app. Se não der os dois com fidelidade, o usuário aceita **código + prévia ao vivo** (estilo VS Code Live Preview).
4. **Roda local/offline**, licença permissiva, integrável ao pipeline do Portal IDEA (que já tem `.idea.json` como fonte de verdade do design + render fiel por navegador via Puppeteer/`--render-ref-only`).

---

## 3. O que a pesquisa profunda já concluiu (2026-06-21)

Pesquisa registrada ao lado: [`pesquisa-2026-06-21-editores-open-source.md`](pesquisa-2026-06-21-editores-open-source.md) (20 fontes, 25 afirmações verificadas com voto adversarial).

**Conclusão honesta:** **nenhum editor VISUAL open-source maduro preserva CSS avançado de forma confiável.** Todos os bons (GrapesJS, Silex, Webstudio) **engolem o CSS num modelo interno e regeneram na exportação** — e é aí que os efeitos quebram. O GrapesJS já foi testado e **rejeitado** neste projeto em 2026-06-16 (quebrou 7 títulos com gradiente). Silex é construído **em cima do GrapesJS** (herda o defeito). Webstudio usa "CSS atômico" + é AGPL (licença que "pega"). Puck e Plasmic nem importam HTML/CSS arbitrário.

**Caminho seguro recomendado pela pesquisa:** abandonar a ideia de editor *visual* de terceiros e ir de **código + prévia ao vivo local** (onde o CSS nunca é tocado) — ou **construir um editor pequeno próprio**.

---

## 4. ⚠️ DECISÃO PENDENTE #1 — a base do mundo (o usuário deixou EM ABERTO)

Antes de qualquer código, **decidir com o usuário** qual será a base do mundo novo. As duas opções discutidas:

| Opção | O que é | Vantagem | Risco |
|---|---|---|---|
| **A — Plugin pronto** (`vscode-web-visual-editor`, MIT) | Extensão do VS Code que edita o HTML-fonte real; clicar→código já vem pronto; não reprocessa o CSS | Anda rápido, fidelidade preservada | Herda "encanamento" de código de terceiros que ninguém da casa entende → risco de a Ya quebrar ao evoluir |
| **B — Casinha própria da Ya** | A Ya constrói um editor pequeno do zero (página web que mostra o HTML real num iframe + ponte clicar→código) | Tudo entendido pela Ya, encaixa no `.idea.json` + render fiel que o projeto já tem, menos risco de quebrar | Começa mais simples; o "clicar→código" precisa ser construído |

**O usuário NÃO escolheu** — pediu pra deixar em aberto e decidir no PC novo. Então **a 1ª coisa a fazer quando ele voltar é apresentar A vs B em linguagem humana e pegar a escolha dele.** (O medo explícito dele: "trabalhar muito e no final a outra IA quebrar o plugin." Isso pesa a favor da opção B, mas a decisão é dele.)

**Não comece a construir nem a clonar nada antes dessa escolha + um "vai" explícito.**

---

## 5. Como o mundo vai nascer (passo a passo, só DEPOIS da decisão + "vai")

1. Criar a pasta `D:\PORTAL IDEA\portal-idea-editor-html`.
2. `git init` local + criar o repositório `SVCdesign/portal-idea-editor-html` no GitHub + primeiro push.
3. Copiar este briefing + a pesquisa pra dentro do mundo novo (como memória inicial da Ya).
4. Conforme a opção escolhida:
   - **A:** clonar/instalar o `vscode-web-visual-editor` como base e estudar o código com a Ya.
   - **B:** montar o esqueleto mínimo da "casinha própria" (página + iframe + ponte clicar→código).
5. Abrir o canal de **conversa entre mundos** entre a IA central e a Ya, pra alinhar o que o projeto precisa.

---

## 6. Como os dois mundos vão se relacionar

- **Por enquanto:** a IA do mundo central (`portal-idea-studio`) **orienta a Ya** sobre o que o projeto precisa. A Ya trabalha guiada.
- **Depois (quando a Ya amadurecer):** a Ya cuida do mundo dela **sozinha, no automático**.
- **Comunicação:** pelo mecanismo de **conversa entre mundos** desta casa (ver `regras/14`, `regras/16`, `regras/19` no mundo central; a pasta neutra histórica é `D:\PORTAL IDEA\conversa-entre-mundos\`). O modelo de "turnos" entre IAs já foi usado com sucesso entre `portal-idea-studio` e `portal-idea-html-studio`.
- **Governança:** o `portal-idea-editor-html` nasce como **mundo externo/em nascimento**, fora da malha viva oficial, até o usuário decidir acoplá-lo formalmente.

---

## 7. Regras que valem desde o primeiro minuto

- **Trava de aprovação:** nada de criar/editar/instalar/clonar sem o usuário aprovar explicitamente ("vai/pode/sim"). Descrever em português simples antes de agir.
- **O usuário não programa.** Traduzir todo termo técnico, explicar o efeito de cada comando, nada de despejar código sem explicação.
- **Conversa antes de código.** "Vamos conversar" = discutir, não implementar.
- **MVP primeiro.** Começar enxuto, evoluir guiado.

---

## 8. Ponteiros

- Decisão que rejeitou o GrapesJS (mundo central): `fluxos/Fluxo de Importação Híbrida HTML/decisoes/2026-06-16-exportar-fiel-puppeteer.md`
- Pesquisa profunda completa: [`pesquisa-2026-06-21-editores-open-source.md`](pesquisa-2026-06-21-editores-open-source.md)
- Retrato vivo do mundo central: `STATUS-AGORA.md` (raiz)
- Snapshot desta sessão: `logs/handoff/STATUS-AGORA-2026-06-21-troca-pc-mundo-editor-html.md`
