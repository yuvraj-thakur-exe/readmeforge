#!/usr/bin/env bash
# ReadmeForge Agent Skill Installer
# Installs .agents/skills/readmeforge/SKILL.md into current workspace or global agents directory

set -euo pipefail

TARGET_DIR="${1:-.agents/skills/readmeforge}"
echo "📦 Installing ReadmeForge Agent Skill to ${TARGET_DIR}..."

mkdir -p "${TARGET_DIR}"

BASE_URL="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/.agents/skills/readmeforge/SKILL.md"

if command -v curl >/dev/null 2>&1; then
  curl -fsSL "${BASE_URL}" -o "${TARGET_DIR}/SKILL.md"
elif command -v wget >/dev/null 2>&1; then
  wget -qO "${TARGET_DIR}/SKILL.md" "${BASE_URL}"
else
  echo "❌ Error: Neither curl nor wget is available." >&2
  exit 1
fi

echo "✅ ReadmeForge Agent Skill installed successfully at ${TARGET_DIR}/SKILL.md"
echo "💡 Any AI agent (Claude Code, Cursor, Devin, Antigravity) will now detect and use ReadmeForge!"
