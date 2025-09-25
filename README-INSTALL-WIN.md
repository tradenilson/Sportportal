# Sportportalen – Nyinstallation (Windows) på C:\sportportalen

## Förutsättningar
- **Node.js ≥ 18 (20 LTS rekommenderas)**. Installera via PowerShell (Admin):
```powershell
winget install OpenJS.NodeJS.LTS -h
```

## Installation (3 steg)
1. Skapa mappen **C:\sportportalen** och packa upp hela zippen där.
2. Öppna **PowerShell (Admin)** och kör:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
cd C:\sportportalen
.oot.ps1
```
3. Öppna **http://localhost:3000**.  
   Hälsa: **/api/health**, Cron: **/api/cron**, Frölunda: **/api/news?topic=frolunda**, Admin: **/admin**.

Om nätet blockerar Google News: kör seed för att se UI direkt:
```powershell
npx tsx scripts/seed.ts
```

Appen använder **relativa** API-anrop, så den funkar även om Next växlar port (3001/3002).
