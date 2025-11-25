# Script para iniciar Next.js e abrir no navegador
Write-Host "Iniciando servidor Next.js..." -ForegroundColor Green

# Iniciar o servidor em background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev"

# Aguardar o servidor iniciar
Write-Host "Aguardando servidor iniciar..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Abrir no navegador
Write-Host "Abrindo http://localhost:3000 no navegador..." -ForegroundColor Green
Start-Process "http://localhost:3000"


