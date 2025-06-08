# Script simple para SecondTrade
Write-Host "Iniciando SecondTrade..." -ForegroundColor Green

# Variables globales para los jobs
$Global:ApiJob = $null
$Global:FrontendJob = $null

# Función para limpiar al salir
function Stop-AllJobs {
    Write-Host "Deteniendo servicios..." -ForegroundColor Yellow
    if ($Global:ApiJob) { Stop-Job $Global:ApiJob -ErrorAction SilentlyContinue; Remove-Job $Global:ApiJob -Force -ErrorAction SilentlyContinue }
    if ($Global:FrontendJob) { Stop-Job $Global:FrontendJob -ErrorAction SilentlyContinue; Remove-Job $Global:FrontendJob -Force -ErrorAction SilentlyContinue }
    Write-Host "Servicios detenidos" -ForegroundColor Green
}

# Capturar Ctrl+C
try {
    [Console]::CancelKeyPress.Add({
        param($sender, $e)
        $e.Cancel = $true
        Stop-AllJobs
        exit
    })
} catch {}

# 1. Activar entorno y ejecutar API
Write-Host "1. Iniciando API..." -ForegroundColor Cyan
$Global:ApiJob = Start-Job -ScriptBlock {
    param($Path)
    Set-Location "$Path\Api"
    & ".\venv\Scripts\Activate.ps1"
    & uvicorn main:app --reload --host localhost --port 8000
} -ArgumentList $PWD

# 2. Ejecutar Frontend
Write-Host "2. Iniciando Frontend..." -ForegroundColor Cyan
$Global:FrontendJob = Start-Job -ScriptBlock {
    param($Path)
    Set-Location "$Path\Front"
    & npm run dev
} -ArgumentList $PWD

Write-Host "Frontend iniciado!" -ForegroundColor Green
Write-Host ""
Write-Host "SecondTrade ejecutandose:" -ForegroundColor White
Write-Host "  API:      http://localhost:8000" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener todo" -ForegroundColor Yellow

# Mantener script vivo
try {
    while ($true) {
        Start-Sleep 5
    }
} catch {
    Stop-AllJobs
} finally {
    Stop-AllJobs
}
