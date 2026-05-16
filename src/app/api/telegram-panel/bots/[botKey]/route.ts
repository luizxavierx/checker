import { NextRequest, NextResponse } from "next/server";
import { getBotDetail } from "@/lib/data";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ botKey: string }> }
) {
  try {
    const { botKey } = await params;
    return NextResponse.json(await getBotDetail(botKey));
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 502 });
  }
}
