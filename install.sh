#!/usr/bin/env bash
# MonoForge 1-Line Installer & Quickstart
# Usage: curl -fsSL https://raw.githubusercontent.com/monoforge/MONOFORGE/main/install.sh | bash

set -e

echo "🔥 ======================================="
echo "⚡ MonoForge — Fast One-Line Installer"
echo "🔥 ======================================="

TARGET_DIR="monoforge"

# Check Node.js
if ! command -v node >/dev/null 2>&1; then
  echo "❌ Error: Node.js is required (v20+ recommended). Please install Node.js from https://nodejs.org"
  exit 1
fi

NODE_MAJOR=$(node -v | cut -d'.' -f1 | tr -d 'v')
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "⚠️ Warning: Detected Node $(node -v). Node 20.x, 22.x, or 24.x is recommended."
fi

# Clone or enter directory
if [ -f "package.json" ] && grep -q '"name": "monoforge"' "package.json" 2>/dev/null; then
  echo "📁 Already inside MonoForge workspace."
else
  if [ -d "$TARGET_DIR" ]; then
    echo "📁 Directory $TARGET_DIR already exists, entering..."
    cd "$TARGET_DIR"
  else
    echo "📥 Cloning MonoForge..."
    git clone https://github.com/monoforge/MONOFORGE.git "$TARGET_DIR"
    cd "$TARGET_DIR"
  fi
fi

# Enable Corepack and pnpm
echo "📦 Ensuring pnpm is enabled via Corepack..."
corepack enable >/dev/null 2>&1 || true

if command -v pnpm >/dev/null 2>&1; then
  PKG_MGR="pnpm"
else
  PKG_MGR="corepack pnpm"
fi

echo "🚀 Installing dependencies with $PKG_MGR..."
$PKG_MGR install

echo "✨ MonoForge is ready! Launching local development server..."
echo "🌐 Open http://localhost:3000 in your browser."
$PKG_MGR dev
