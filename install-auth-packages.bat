@echo off
echo ========================================
echo   Installing Authentication Packages
echo ========================================
echo.

echo [1/2] Installing Frontend Packages...
cd frontend
call npm install react-router-dom
echo.

echo [2/2] Installing Backend Packages...
cd ..\backend
call npm install bcryptjs jsonwebtoken
echo.

echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Add JWT_SECRET to backend/.env
echo 2. Restart backend server
echo 3. Refresh browser
echo.
pause
