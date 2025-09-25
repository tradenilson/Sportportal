import { prisma } from "./db";
export async function ensureLockTable(){ await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS job_lock (name TEXT PRIMARY KEY, lease_until INTEGER)`); }
export async function acquireLock(name: string, ttlMs=20*60*1000){ const now=Date.now(); const lease=now+ttlMs;
  await prisma.$executeRawUnsafe(`INSERT INTO job_lock(name, lease_until) VALUES (?, ?) ON CONFLICT(name) DO UPDATE SET lease_until = CASE WHEN job_lock.lease_until < ? THEN excluded.lease_until ELSE job_lock.lease_until END`, name, lease, now);
  const row = await prisma.$queryRawUnsafe<{lease_until:number}[]>(`SELECT lease_until FROM job_lock WHERE name = ?`, name);
  return row.length>0 && row[0].lease_until >= lease;
}
export async function releaseLock(name:string){ await prisma.$executeRawUnsafe(`UPDATE job_lock SET lease_until = ? WHERE name = ?`, Date.now(), name); }
