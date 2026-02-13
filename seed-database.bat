@echo off
echo ========================================
echo Seeding Database with Sample Resources
echo ========================================
echo.
cd backend
node seed.js
echo.
echo ========================================
echo Database seeding complete!
echo ========================================
echo.
pause
