@echo off
echo ========================================
echo Smart Campus Management Platform
echo ========================================
echo.
echo Starting Backend Server...
echo.
cd backend
start cmd /k "npm run dev"
timeout /t 3 /nobreak >nul
echo.
echo Starting Frontend...
echo.
cd ..\frontend
start cmd /k "npm run dev"
echo.
echo ========================================
echo Both servers are starting!
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
pause
