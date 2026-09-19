@echo off
setlocal
cd /d "%~dp0"

echo.
echo ==============================================
echo   Shopify UI Generator
echo ==============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Install Node.js 20 or newer from https://nodejs.org/
  echo Then run this file again.
  pause
  exit /b 1
)

for /f "tokens=1 delims=." %%v in ('node -p "process.versions.node"') do set NODE_MAJOR=%%v
if %NODE_MAJOR% LSS 20 (
  echo Node.js 20 or newer is required.
  echo Current version:
  node --version
  pause
  exit /b 1
)

echo [1/4] Clearing stale Next.js cache...
if exist .next rmdir /s /q .next
if exist tsconfig.tsbuildinfo del /f /q tsconfig.tsbuildinfo

echo [2/4] Checking project files...
node scripts/verify-project.cjs
if errorlevel 1 (
  echo.
  echo Project verification reported an issue.
  echo Check scripts/verify-project.cjs output above.
  pause
  exit /b 1
)

echo [3/4] Checking dependencies...
if not exist node_modules (
  call npm run setup
  if errorlevel 1 (
    echo.
    echo Setup failed.
    pause
    exit /b 1
  )
)

echo [4/4] Starting Shopify UI Generator...
echo.
echo Open http://localhost:3000 in your browser.
echo Press Ctrl+C to stop the server.
echo.
call npm run dev
endlocal
