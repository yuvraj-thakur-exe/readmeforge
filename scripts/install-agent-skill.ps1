# ReadmeForge Agent Skill Installer for PowerShell
# Installs .agents/skills/readmeforge/SKILL.md into current workspace or global config

param(
  [string]$TargetDir = ".agents\skills\readmeforge"
)

$ErrorActionPreference = "Stop"

Write-Host "📦 Installing ReadmeForge Agent Skill to $TargetDir..." -ForegroundColor Cyan

if (-not (Test-Path $TargetDir)) {
  New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

$url = "https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/.agents/skills/readmeforge/SKILL.md"
$dest = Join-Path $TargetDir "SKILL.md"

Invoke-WebRequest -Uri $url -OutFile $dest

Write-Host "✅ ReadmeForge Agent Skill installed successfully at $dest" -ForegroundColor Green
Write-Host "💡 Any AI agent (Claude Code, Cursor, Devin, Antigravity) will now detect and use ReadmeForge!" -ForegroundColor Yellow
