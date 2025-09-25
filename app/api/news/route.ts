import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic");
  const items = await prisma.newsItem.findMany({
    where: { visible: true },
    orderBy: [{ pinned: "desc" }, { publishedAt: "desc" }, { id: "desc" }],
    take: 120
  });
  const filtered = topic
    ? items.filter(it => Array.isArray(it.topics as any) && (it.topics as any[]).includes(topic))
    : items;
  return NextResponse.json(filtered.map(it => ({
    id: it.id, title: it.title, source: it.source, sourceUrl: it.sourceUrl,
    excerpt: it.excerpt, publishedAt: it.publishedAt, pinned: it.pinned,
    visible: it.visible, topics: it.topics
  })));
}
