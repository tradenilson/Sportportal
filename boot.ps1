Param([string]$Port="3000")
Write-Host "==> Sportportalen nyinstallation (port $Port)" -ForegroundColor Cyan
if (!(Test-Path .env)) { if (Test-Path .env.example) { Copy-Item .env.example .env } else { 'DATABASE_URL="file:./dev.db"' | Out-File -Encoding utf8 .env } }
if (!(Test-Path .env.local)) { if (Test-Path .env.example) { Copy-Item .env.example .env.local } else { 'DATABASE_URL="file:./dev.db"' | Out-File -Encoding utf8 .env.local } }
node -v
try { npm ci --no-audit --no-fund } catch { npm i --no-audit --no-fund }
npx prisma generate
npx prisma migrate dev --name init --schema=prisma/schema.prisma
npx tsx scripts/setup-fts.ts
Start-Process -NoNewWindow npm -ArgumentList "run","dev","--","-p",$Port
Start-Sleep -Seconds 6
try { (Invoke-WebRequest -UseBasicParsing http://localhost:$Port/api/health).Content.Substring(0,400) } catch { $_.Exception.Message }
try { (Invoke-WebRequest -UseBasicParsing http://localhost:$Port/api/cron).Content.Substring(0,400) } catch { $_.Exception.Message }
try { (Invoke-WebRequest -UseBasicParsing http://localhost:$Port/api/news?topic=frolunda).Content.Substring(0,400) } catch { $_.Exception.Message }
Write-Host "==> DONE. Open http://localhost:$Port" -ForegroundColor Green
