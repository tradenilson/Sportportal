import { NextRequest, NextResponse } from "next/server";
import { getSettings, setSettings } from "@/lib/config";

export async function GET() { return NextResponse.json(await getSettings()); }
export async function PUT(req: NextRequest) {
  await setSettings(await req.json()); return NextResponse.json({ ok: true });
}
