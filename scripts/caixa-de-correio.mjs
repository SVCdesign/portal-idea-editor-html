#!/usr/bin/env node
// =====================================================================
// caixa-de-correio.mjs — vigia da CAIXA DE CORREIO entre os sistemas.
//
// Rodado AUTOMATICAMENTE no inicio da sessao (hook SessionStart em
// .claude/settings.json), junto com o sync-guard. Ele responde UMA
// pergunta: "chegou recado novo do sistema-de-ideias?".
//
// Como ele sabe: compara os arquivos .md das pastas DELE
//   <caixa>/de-sistema-de-ideias/
//   <caixa>/ensinamentos/de-sistema-de-ideias/
// com o NOSSO marcador de leitura
//   <caixa>/lido-ate/editor-html.md
// Arquivo cujo nome NAO aparece no marcador = ainda nao lido.
//
// O QUE ELE MEXE:
//   - ⛔ NUNCA toca no repositorio do editor (este aqui).
//   - Na caixa (outro repositorio, que so serve pra recado) ele da um
//     `git pull --ff-only`: so avanca, nunca junta nem reescreve nada.
//     Se falhar (offline, ou mudanca local pendente la), ele avisa e
//     segue com o que tem no disco.
//   - Sempre sai com codigo 0: NUNCA trava a sessao.
// =====================================================================

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MEU_NOME = 'editor-html';                       // nosso nome no canal
const PAR = 'sistema-de-ideias-e-editor-html';        // a pasta da nossa conversa
const PASTAS_DELE = ['de-sistema-de-ideias', join('ensinamentos', 'de-sistema-de-ideias')];

const raizProjeto = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoCaixa = resolve(raizProjeto, '..', 'dialogos-entre-sistemas');
const pastaPar = join(repoCaixa, PAR);

const diz = (t) => console.log(t);

function tryGit(args, timeout = 15000) {
  try {
    return {
      ok: true,
      out: execSync(`git ${args}`, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
        timeout
      }).trim()
    };
  } catch {
    return { ok: false, out: '' };
  }
}

try {
  // --- a caixa existe nesta maquina? ---------------------------------
  if (!existsSync(pastaPar)) {
    diz('\n──────── CAIXA DE CORREIO ENTRE SISTEMAS ────────');
    diz('🟡 Nao achei a caixa nesta maquina. Esperava encontrar em:');
    diz(`   ${pastaPar}`);
    diz('   E o canal UNICO entre os sistemas do Carlos (repositorio privado no GitHub:');
    diz('   SVCdesign/dialogos-entre-sistemas). Sem ela, recado nenhum chega ate aqui.');
    diz('   👉 Pergunte ao Carlos se pode clonar, ao lado da pasta do editor.');
    diz('──────────────────────────────────────────────────\n');
    process.exit(0);
  }

  // --- baixa o que chegou (so avanca; nunca junta nem reescreve) ------
  const puxou = tryGit(`-C "${repoCaixa}" pull --ff-only`, 20000).ok;

  // --- o nosso marcador de leitura ------------------------------------
  const caminhoMarcador = join(pastaPar, 'lido-ate', `${MEU_NOME}.md`);
  const marcador = existsSync(caminhoMarcador) ? readFileSync(caminhoMarcador, 'utf8') : '';

  // --- o que esta nas pastas dele e nao consta no marcador ------------
  const novos = [];
  for (const pasta of PASTAS_DELE) {
    const dir = join(pastaPar, pasta);
    if (!existsSync(dir)) continue;
    for (const arq of readdirSync(dir)) {
      if (!arq.toLowerCase().endsWith('.md')) continue;
      // barra sempre pra frente ao mostrar (no Windows o join usa "\")
      if (!marcador.includes(arq)) novos.push({ pasta: pasta.replace(/\\/g, '/'), arq });
    }
  }

  diz('\n──────── CAIXA DE CORREIO ENTRE SISTEMAS ────────');
  if (!puxou) {
    diz('🟡 Nao consegui atualizar a caixa agora (sem internet, ou ha mudanca local la).');
    diz('   O que aparece abaixo e o que ja estava no disco — pode estar velho.');
  }
  if (novos.length === 0) {
    diz('📭 Caixa em dia: nenhum recado novo do sistema-de-ideias.');
  } else {
    diz(`📬 TEM ${novos.length} RECADO(S) NOVO(S) esperando — LEIA antes de comecar:`);
    for (const n of novos) diz(`   • ${n.pasta}/${n.arq}`);
    diz('   Depois de ler, atualize o marcador lido-ate/editor-html.md e, se responder,');
    diz('   escreva SO em de-editor-html/ (um recado = um arquivo).');
  }
  diz(`📁 Caixa: ${pastaPar}`);
  diz('──────────────────────────────────────────────────\n');
} catch {
  // qualquer imprevisto: fica quieto, nunca trava a sessao
}

process.exit(0);
