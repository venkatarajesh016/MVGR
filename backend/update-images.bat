@echo off
echo ========================================
echo   Updating Waypoint Images to Picsum
echo ========================================
echo.
echo Connecting to database...
node update-images-manual.js
echo.
echo ========================================
echo   Update Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Refresh your browser (Ctrl + Shift + R)
echo 2. Test navigation to see images
echo.
pause
