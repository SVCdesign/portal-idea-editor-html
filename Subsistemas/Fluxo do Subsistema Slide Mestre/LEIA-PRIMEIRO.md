# 🧩 Fluxo do Subsistema — Slide Mestre

> **O que é este arquivo:** a porta de entrada **e** o manual completo deste subsistema.
> Se você é uma IA começando agora, leia isto inteiro antes de mexer em qualquer
> carrossel do Carlos.
>
> **Criado em:** 2026-07-05 · **Dono do fluxo:** Carlos.

---

## Em uma frase
O Carlos acerta **UM slide** de um carrossel (o "mestre") e a **IA repete o mesmo
ajuste** nos outros slides iguais — sem ele ter que fazer um por um na mão.

## Quando usar
Quando o Carlos tem um HTML com **vários slides do mesmo tipo** (ex.: um carrossel de
9 slides) e quer que um ajuste feito num slide **se repita** nos outros do mesmo molde.

Exemplos de ajuste: subir/descer um bloco de texto, trocar um ícone, mudar uma cor,
mexer numa marca-d'água de fundo, ajustar um espaçamento, etc.

---

## ⚠️ Regra importante (o que mudou)
Antes, neste mundo, valia a regra: *"a IA só constrói o editor; **não** edita as peças
do Carlos"*. **Isso mudou** (o Carlos confirmou em **2026-07-05**).

👉 Agora a IA **PODE editar e replicar as peças — QUANDO O CARLOS PEDIR.** Este
subsistema é exatamente esse caso. O padrão continua sendo o Carlos editar à mão, no
gosto dele; mas quando ele pedir pra **"replicar" / "repetir o padrão"**, a IA faz.

---

## 👣 O passo a passo (a receita — siga sempre)

1. **O Carlos aponta** qual **arquivo** e qual **slide** ele mexeu.
   *(Ex.: "mexi no slide 2, replica pros outros".)*
2. **A IA descobre sozinha o que mudou:** compara o slide editado com os outros do
   mesmo tipo e acha a(s) diferença(s) — posição, ícone, cor, tamanho, etc.
3. **A IA confirma antes de aplicar:** explica **em português comum** o que detectou
   **e** confirma o **escopo** (quais slides recebem). Slides de **tipo diferente**
   (ex.: a capa e o slide de fechamento) normalmente ficam **de fora** — confirmar com
   o Carlos.
4. **A IA aplica** só nos slides do mesmo molde.
5. **A IA salva numa CÓPIA nova** (ex.: `final-editado-2.html`) pra **não perder o
   original** — a não ser que o Carlos peça pra salvar por cima.
6. **A IA confere pela estrutura** (ex.: conta quantas vezes o ajuste aparece) pra ter
   certeza que replicou na medida certa — **nem a mais, nem a menos**.

---

## ✅ O caso real que validou este fluxo
- **Arquivo:** um carrossel de 9 slides — *"7 palavras que o inglês não traduz"*.
- **O que o Carlos fez:** editou o **slide 2** — subiu o bloco de texto **48px** e
  desceu/encolheu a marca-d'água do fundo pra **~63%**.
- **O que a IA fez:** detectou os **2 ajustes** e replicou nos **slides 3 a 8** (os
  slides de "palavra"), **poupando** o slide 1 (capa com foto) e o 9 (fechamento).
- **Conferência:** 7 ocorrências de cada ajuste (o slide 2 original + os 6 replicados).
  **Aprovado pelo Carlos.**

> Obs.: os arquivos desse teste eram **locais e temporários** (não viajam entre PCs) —
> o que vale de verdade é o **passo a passo** acima.

---

## 🏠 O que mora (e vai morar) nesta pasta
Este subsistema é uma **casa completa** do assunto. Por enquanto tem a **receita**
(este arquivo). Conforme a gente for usando, aqui também podem entrar:

- **exemplos/** — casos reais já feitos, pra servir de referência.
- **ferramentas/** — se um dia este fluxo ganhar um atalho/script próprio.

*(Essas subpastas ainda não existem — a gente cria quando houver o que guardar dentro.)*

---

## 🧭 Regras de ouro (nunca quebrar)
- **Sempre salvar em cópia nova** (nunca por cima do original, salvo pedido explícito).
- **Poupar os slides de tipo diferente** (capa, fechamento) — confirmar o escopo antes.
- **Conferir pela contagem** que o número de ajustes bateu.
- **Falar em português comum** o que foi detectado, **antes** de aplicar.
