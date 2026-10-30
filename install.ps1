# MonoForge 1-Line Installer for Windows PowerShell
# Usage: iwr -useb https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/install.ps1 | iex

$ErrorActionPreference = "Stop"

Write-Host "🔥 =======================================" -ForegroundColor Magenta
Write-Host "⚡ MonoForge — Fast One-Line Installer" -ForegroundColor Cyan
Write-Host "🔥 =======================================" -ForegroundColor Magenta

$targetDir = "monoforge"

# Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "❌ Error: Node.js is required (v20+ recommended). Please install from https://nodejs.org"
}

# Enter or clone
if ((Test-Path "package.json") -and (Select-String -Path "package.json" -Pattern '"name": "monoforge"' -Quiet)) {
    Write-Host "📁 Already inside MonoForge workspace." -ForegroundColor Green
} else {
    if (Test-Path $targetDir) {
        Write-Host "📁 Directory $targetDir already exists, entering..." -ForegroundColor Yellow
        Set-Location $targetDir
    } else {
        Write-Host "📥 Cloning MonoForge..." -ForegroundColor Cyan
        git clone https://github.com/yuvraj-thakur-exe/MONOFORGE.git $targetDir
        Set-Location $targetDir
    }
}

# Enable Corepack and run pnpm
Write-Host "📦 Ensuring pnpm via Corepack..." -ForegroundColor Cyan
try {
    corepack enable
} catch {
    # continue
}

Write-Host "🚀 Installing dependencies..." -ForegroundColor Cyan
corepack pnpm install

Write-Host "✨ MonoForge is ready! Launching dev server on http://localhost:3000..." -ForegroundColor Green
corepack pnpm dev
