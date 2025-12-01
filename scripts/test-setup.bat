@echo off
echo ========================================
echo Testing React Mastery Course Setup
echo ========================================
echo.

echo [1/4] Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js
    pause
    exit /b 1
)
echo ✅ Node.js installed
echo.

echo [2/4] Checking npm...
npm --version
if %errorlevel% neq 0 (
    echo ❌ npm not found!
    pause
    exit /b 1
)
echo ✅ npm installed
echo.

echo [3/4] Checking dependencies...
if not exist "node_modules\express" (
    echo ⚠️  Dependencies not found. Installing...
    npm install
) else (
    echo ✅ Dependencies already installed
)
echo.

echo [4/4] Checking MySQL connection...
echo ⚠️  MySQL check requires manual verification
echo    Please ensure:
echo    1. MySQL is installed and running
echo    2. Database 'react_course' exists
echo    3. Password is set in server.js (line 18)
echo.

echo ========================================
echo Setup Check Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Install MySQL if not installed
echo 2. Create database: CREATE DATABASE react_course;
echo 3. Update password in server.js
echo 4. Run: start.bat
echo.
pause
