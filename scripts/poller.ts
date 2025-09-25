import { getSettings } from "../lib/config"; import { fetchAndUpsert } from "../lib/ingest"; import { ensureLockTable, acquireLock, releaseLock } from "../lib/lock"; import { setLastIngest } from "../lib/metrics";
const JOB_NAME="news-ingest"; let timer: NodeJS.Timeout|null=null; let shuttingDown=false; let running=false;
function minutesToMs(min:number){ const m=Math.max(1,Math.min(360,Math.floor(min))); return m*60*1000; }
async function tick(){ if(shuttingDown||running) return; running=true; try{
  await ensureLockTable(); const settings=await getSettings().catch(()=>({pollIntervalMinutes:45, allowedSources:["gp.se","dn.se","svd.se","expressen.se","aftonbladet.se"], queries:[]}));
  const intervalMs=minutesToMs(settings.pollIntervalMinutes ?? 45);
  const got=await acquireLock(JOB_NAME, Math.min(intervalMs, 20*60*1000));
  if(!got){ log("Skip (lock busy)"); } else {
    log("Start"); const t0=Date.now(); await fetchAndUpsert(settings.queries, settings.allowedSources); await setLastIngest(new Date()); log(`Done in ${Date.now()-t0} ms`); await releaseLock(JOB_NAME);
  }
  if(!shuttingDown) timer=setTimeout(tick, intervalMs);
} catch(err){ console.error("[poller] Error", err); timer=setTimeout(tick, minutesToMs(45)); } finally { running=false; } }
function log(m:string){ console.log(`[poller] ${new Date().toISOString()} — ${m}`); }
const startDelay=Math.floor(Math.random()*3000); setTimeout(()=>{ log(`Boot (delay=${startDelay}ms)`); tick(); }, startDelay);
async function shutdown(){ if(shuttingDown) return; shuttingDown=true; if(timer) clearTimeout(timer); const t0=Date.now(); while(running && Date.now()-t0<20000){ await new Promise(r=>setTimeout(r,250)); } process.exit(0); }
process.on("SIGINT", shutdown); process.on("SIGTERM", shutdown);
