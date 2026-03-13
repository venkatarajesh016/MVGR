@echo off
title Campus Navigator - Quick Start
color 0E

cls
echo.
echo    ╔════════════════════════════════════════╗
echo    ║                                        ║
echo    ║     CAMPUS NAVIGATOR - QUICK START     ║
echo    ║                                        ║
echo    ╚════════════════════════════════════════╝
echo.
echo.
echo    This will automatically:
echo.
echo    ✓ Install all required packages
echo    ✓ Start backend server (port 5000)
echo    ✓ Start frontend server (port 3000)
echo    ✓ Open your browser
echo.
echo    Time needed: 2-3 minutes
echo.
echo    Press any key to start...
echo.
pause >nul

call AUTO_SETUP_AND_RUN.bat
