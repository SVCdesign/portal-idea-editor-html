#!/usr/bin/env node
// =====================================================================
// sync-guard.mjs — guarda anti-esquecimento de sincronizacao entre PCs.
//
// Rodado AUTOMATICAMENTE por hooks (.claude/settings.json):
//   - modo "boot"  -> no inicio da sessao (SessionStart): avisa se este PC
//                     esta atrasado / adiantado / divergente vs o repositorio
//                     remoto, e lembra de conferir o drive de assets.
//   - modo "end"   -> ao fim de cada resposta (Stop): fica em SILENCIO quando
//                     nao ha risco; so fala se sobrou commit sem publicar.
//
// IMPORTANTE: este script NUNCA altera o repositorio. So LE o estado e
// imprime aviso. Sempre sai com codigo 0 (nunca trava a sessao).
// =====================================================================

import { execSync } from 'node:child_process';

const mode = process.argv[2] || 'boot';

function git(args, opts = {}) {
  return execSync(`git ${args}`, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
    timeout: opts.timeout ?? 10000
  }).trim();
}

function tryGit(args, opts) {
  try {
    return { ok: true, out: git(args, opts) };
  } catch {
    return { ok: false, out: '' };
  }
}

// Se nao for um repositorio git, sai quieto (nada a fazer).
if (!tryGit('rev-parse --is-inside-work-tree').ok) {
  process.exit(0);
}

const branch = tryGit('rev-parse --abbrev-ref HEAD').out || 'main';
const dirty = tryGit('status --porcelain').out;

// @{u} = upstream (ex.: origin/main). left = atras (behind), right = a frente (ahead).
function counts() {
  const r = tryGit('rev-list --left-right --count @{u}...HEAD');
  if (!r.ok) return null;
  const m = r.out.split(/\s+/).map((n) => parseInt(n, 10));
  if (m.length < 2 || Number.isNaN(m[0]) || Number.isNaN(m[1])) return null;
  return { behind: m[0], ahead: m[1] };
}

// --- modo END: silencioso, so alerta commit preso nesta maquina ---------
if (mode === 'end') {
  const c = counts();
  if (c && c.ahead > 0) {
    console.log(
      `\n⚠️  ANTI-ESQUECIMENTO: este PC tem ${c.ahead} commit(s) que ainda NAO foram pro repositorio remoto.\n` +
        `   Antes de trocar de PC, suba (git push) ou peca pra IA fazer commit + push.\n`
    );
  }
  process.exit(0);
}

// --- modo BOOT: retrato da sincronizacao --------------------------------
const fetched = tryGit('fetch', { timeout: 15000 }).ok;
const c = counts();

let linha;
if (!c) {
  linha = '🟡 Nao consegui comparar com o remoto (sem upstream ou sem internet). Confirme o sync na mao.';
} else if (!fetched) {
  linha = '🟡 Nao consegui falar com o remoto agora (offline?). A comparacao pode estar desatualizada.';
} else if (c.behind === 0 && c.ahead === 0) {
  linha = '✅ Este PC esta IGUAL ao remoto.';
} else if (c.behind > 0 && c.ahead === 0) {
  linha = `🔴 Este PC esta ATRASADO: o remoto tem ${c.behind} mudanca(s) que ainda nao chegaram aqui. BAIXE antes de trabalhar (git pull) — peca pra IA.`;
} else if (c.behind === 0 && c.ahead > 0) {
  linha = `🟠 Este PC esta ADIANTADO: ${c.ahead} commit(s) ainda nao subiram pro remoto. Outro PC veria um estado velho.`;
} else {
  linha = `🔴 DIVERGENTE: ${c.behind} mudanca(s) no remoto e ${c.ahead} aqui. Nao trate a continuidade como garantida — alinhe com a IA.`;
}

console.log('\n──────── GUARDA DE SINCRONIZACAO (PC <-> remoto) ────────');
console.log(`Branch: ${branch}`);
console.log(linha);
if (dirty) {
  console.log('📝 Ha arquivos modificados ainda nao salvos no Git (working tree sujo).');
}
// Lembrete adaptado ao mundo portal-idea-editor-html:
console.log('💡 Lembrete: o CODIGO viaja pelo Git, mas os ASSETS pesados (imagens/fontes');
console.log('   das pecas) viajam pelo GOOGLE DRIVE, NAO pelo Git. Confirme o Drive VERDE');
console.log('   (terminou de sincronizar) antes/depois de trocar de PC.');
console.log('   A pasta "conversa-entre-mundos" e LOCAL-ONLY (fora do Git): copie a mao');
console.log('   se trocar de PC.');
console.log('──────────────────────────────────────────────────────────\n');

process.exit(0);
