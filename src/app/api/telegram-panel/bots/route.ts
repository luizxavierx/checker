import { NextResponse } from "next/server";
import { getBots } from "@/lib/data";

export async function GET() {
  try {
    return NextResponse.json(await getBots());
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 502 });
  }
}
