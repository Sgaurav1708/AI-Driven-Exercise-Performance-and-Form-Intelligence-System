@echo off
cd /d "%~dp0"
start "" "http://127.0.0.1:4173"
where node >nul 2>nul
if %errorlevel% equ 0 (
  node server.mjs
) else (
  "C:\Users\Gaurav Kumar\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" server.mjs
)
pause
