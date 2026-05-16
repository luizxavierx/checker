import { NextResponse } from "next/server";
import { getExtensionStatus } from "@/lib/data";

export async function GET() {
  try {
    return NextResponse.json(await getExtensionStatus());
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 502 });
  }
}
