@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title Desligar Editor HTML
echo.
echo   ============================================
echo      DESLIGAR o Editor HTML
echo   ============================================
echo.
echo   Procurando o servidor do editor (porta 4599)...
echo.

set "achou="
set "jamatou= "
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":4599" ^| findstr "LISTENING"') do (
  echo !jamatou! | findstr " %%P " >nul
  if errorlevel 1 (
    taskkill /PID %%P /F >nul 2>nul
    echo    - servidor encerrado ^(PID %%P^)
    set "jamatou=!jamatou!%%P "
    set "achou=1"
  )
)

if not defined achou echo    Nenhum servidor estava ligado. Ja estava tudo desligado.

echo.
echo   Pronto. O Editor HTML foi desligado. Pode fechar esta janela.
echo.
pause
