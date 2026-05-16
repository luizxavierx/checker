import { NextResponse } from "next/server";
import { getSummary } from "@/lib/data";

export async function GET() {
  try {
    return NextResponse.json(await getSummary());
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 502 });
  }
}
