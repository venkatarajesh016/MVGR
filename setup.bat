@echo off
echo.
echo Campus Navigation System - Setup Script
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo [OK] Node.js is installed
node -v
echo.

REM Backend setup
echo [INFO] Setting up backend...
cd backend

if not exist ".env" (
    echo [WARNING] Creating .env file from example...
    copy .env.example .env
    echo [WARNING] Please edit backend\.env with your credentials:
    echo    - MongoDB URI
    echo    - Mapbox Token
    echo.
)

echo [INFO] Installing backend dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Backend installation failed
    exit /b 1
)

echo [OK] Backend dependencies installed
cd ..

REM Frontend setup
echo.
echo [INFO] Setting up frontend...
cd frontend

echo [INFO] Installing frontend dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Frontend installation failed
    exit /b 1
)

echo [OK] Frontend dependencies installed
cd ..

REM Success message
echo.
echo ==========================================
echo [OK] Setup completed successfully!
echo.
echo Next steps:
echo 1. Edit backend\.env with your credentials
echo 2. Start backend: cd backend ^&^& npm start
echo 3. Start frontend: cd frontend ^&^& npm run dev
echo 4. Open http://localhost:3000
echo.
echo Documentation:
echo - README.md - Main documentation
echo - QUICK_START.md - Quick start guide
echo - UI_IMPROVEMENTS.md - UI features
echo - COMPONENT_GUIDE.md - Component reference
echo.
echo Happy coding!
pause
