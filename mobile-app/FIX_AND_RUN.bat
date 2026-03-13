@echo off
REM Campus Navigation Mobile App - Complete Fix and Run Script

echo.
echo ========================================
echo Campus Navigation Mobile App
echo Complete Fix and Run
echo ========================================
echo.

REM Step 1: Clean everything
echo [1/4] Cleaning corrupted files...
if exist node_modules (
    rmdir /s /q node_modules
    echo Removed node_modules
)
if exist package-lock.json (
    del package-lock.json
    echo Removed package-lock.json
)
echo.

REM Step 2: Clear npm cache
echo [2/4] Clearing npm cache...
call npm cache clean --force
echo.

REM Step 3: Install dependencies
echo [3/4] Installing dependencies (5-10 minutes)...
call npm install --legacy-peer-deps --force
if errorlevel 1 (
    echo ERROR: Installation failed!
    echo Try running manually: npm install --legacy-peer-deps --force
    pause
    exit /b 1
)
echo.

REM Step 4: Start the app
echo [4/4] Starting Expo server...
echo.
echo Backend URL: http://10.0.2.2:5000 (Android Emulator)
echo.
echo Next steps:
echo - Press 'a' for Android emulator
echo - Press 'i' for iOS simulator
echo - Scan QR code with Expo Go app for physical device
echo.
call npm start

pause
