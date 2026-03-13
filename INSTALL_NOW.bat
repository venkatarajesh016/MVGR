@echo off
echo ========================================
echo   Installing Packages...
echo ========================================
echo.

echo [1/2] Installing Frontend Packages...
cd frontend
call npm install
echo.

echo [2/2] Installing Backend Packages...
cd ..\backend
call npm install
echo.

echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Packages installed:
echo - Frontend: react-router-dom
echo - Backend: bcryptjs, jsonwebtoken
echo.
echo Next: Close any running servers and run START_APP.bat
echo.
pause
