import { NextResponse } from "next/server";
import { phpFetch } from "@/lib/api";

export async function GET() {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    return NextResponse.json({ ok: true, events: [] });
  }
  try {
    const data = await phpFetch<{ ok: boolean; events: unknown[] }>("/events");
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 502 });
  }
}
