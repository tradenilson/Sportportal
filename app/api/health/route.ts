import { NextResponse } from "next/server";
import { prisma } from "@/lib/db"; import { getMetrics } from "@/lib/metrics";
export const revalidate = 0;
export async function GET() {
  const metrics = await getMetrics(); const count = await prisma.newsItem.count();
  return NextResponse.json({ status: "ok", lastIngestAt: metrics.lastIngestAt || null, totalNews: count, now: new Date().toISOString() });
}
