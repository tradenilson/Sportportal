import { NextResponse } from "next/server";
import { getSettings } from "@/lib/config"; import { fetchAndUpsert } from "@/lib/ingest";
import { ensureLockTable, acquireLock, releaseLock } from "@/lib/lock"; import { setLastIngest } from "@/lib/metrics";
export const revalidate = 0;
export async function GET() {
  await ensureLockTable(); const s = await getSettings();
  const got = await acquireLock("news-ingest", Math.min((s.pollIntervalMinutes ?? 45) * 60_000, 20 * 60_000));
  if (!got) return NextResponse.json({ skipped: true, reason: "lock" });
  await fetchAndUpsert(s.queries, s.allowedSources); await setLastIngest(new Date()); await releaseLock("news-ingest");
  return NextResponse.json({ ok: true });
}
