@echo off
chcp 65001 >nul
title Editor HTML (NAO FECHAR enquanto usar)
cd /d "%~dp0"

echo.
echo   ============================================
echo      EDITOR HTML - edicao de alta fidelidade
echo   ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo   [ERRO] Nao encontrei o Node neste computador.
  echo   O Node e' o motorzinho que roda o editor e o "Gerar PNG".
  echo   Avise o assistente que a gente instala juntos.
  echo.
  pause
  exit /b
)

rem primeira vez neste PC: instala a pecinha do robo (Chrome ja instalado e usado)
if not exist "node_modules\playwright-core\package.json" (
  echo   Preparando pela primeira vez neste PC (instalando 1 pecinha leve)...
  echo   Isso so acontece uma vez. Aguarde...
  call npm install playwright-core
  echo.
)

echo   O Editor HTML esta iniciando...
echo   Uma aba vai abrir sozinha no seu navegador.
echo.
echo   IMPORTANTE: nao feche esta janela preta enquanto
echo   estiver usando o editor. Para fechar o editor,
echo   basta fechar esta janela.
echo.

rem espera 2 segundos e abre o navegador no endereco certo
start "" /min cmd /c "timeout /t 2 >nul & start http://localhost:4599/editor.html"

rem liga o motorzinho Node (serve o editor + atende o "Gerar PNG"); roda ate fechar a janela
node server.mjs
