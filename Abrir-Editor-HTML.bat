@echo off
chcp 65001 >nul
title Editor HTML (NAO FECHAR enquanto usar)
cd /d "%~dp0"

echo.
echo   ============================================
echo      EDITOR HTML - edicao de alta fidelidade
echo   ============================================
echo.

where python >nul 2>nul
if errorlevel 1 (
  echo   [ERRO] Nao encontrei o Python neste computador.
  echo   Avise o assistente que a gente resolve de outro jeito.
  echo.
  pause
  exit /b
)

echo   O Editor HTML esta iniciando...
echo   Uma aba vai abrir sozinha no seu navegador.
echo.
echo   IMPORTANTE: nao feche esta janela preta enquanto
echo   estiver usando o editor. Para fechar o editor,
echo   basta fechar esta janela.
echo.

rem espera 2 segundos e abre o navegador no endereco certo
rem o ?v=%RANDOM% forca o navegador a carregar SEMPRE a versao mais nova (sem cache)
start "" /min cmd /c "timeout /t 2 >nul & start http://localhost:4599/editor.html?v=%RANDOM%"

rem liga o endereco local (fica rodando ate fechar a janela)
python -m http.server 4599
