Param([string]$BaseUrl = "http://localhost:3000")
Write-Host "=== Sportportalen Doctor ==="
try { node -v } catch { "Node saknas" }
foreach ($p in @("api/health","api/cron","api/news?topic=frolunda")) {
  "`n--- $p ---"
  try { $r = Invoke-WebRequest -UseBasicParsing "$BaseUrl/$p"; "HTTP $($r.StatusCode)"; $r.Content.Substring(0, [Math]::Min(400,$r.Content.Length)) } catch { $_.Exception.Message }
}
