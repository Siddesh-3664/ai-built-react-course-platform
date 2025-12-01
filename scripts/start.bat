@echo off
echo ========================================
echo   React Mastery Course - Quick Start
echo ========================================
echo.

REM Get the directory where this script is located
set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..

echo Starting servers...
echo.

REM Start Backend Server
echo [1/3] Starting Backend Server (Port 3001)...
start "Backend Server" cmd /k "cd /d %PROJECT_DIR% && node server/server.js"
timeout /t 3 /nobreak >nul

REM Start Frontend Server  
echo [2/3] Starting Frontend Server (Port 3000)...
start "Frontend Server" cmd /k "cd /d %PROJECT_DIR% && npx serve public -l 3000"
timeout /t 3 /nobreak >nul

REM Open Browser
echo [3/3] Opening browser...
timeout /t 2 /nobreak >nul
start http://localhost:3000

echo.
echo ========================================
echo   Servers Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press any key to stop servers...
pause >nul

REM Stop servers
echo.
echo Stopping servers...
taskkill /FI "WindowTitle eq Backend Server*" /T /F >nul 2>&1
taskkill /FI "WindowTitle eq Frontend Server*" /T /F >nul 2>&1

echo Servers stopped.
echo.
pause
