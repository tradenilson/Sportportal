import { NextRequest, NextResponse } from "next/server";
import { searchFts } from "@/lib/fts";
export const revalidate = 0;
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q"); if (!q?.trim()) return NextResponse.json({ items: [] });
  const items = await searchFts(q.trim()); return NextResponse.json({ items });
}
