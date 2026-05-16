import { NextRequest, NextResponse } from "next/server";
import { phpFetch } from "@/lib/api";
import { mockRecordsResponse } from "@/lib/mock";
import type { RecordsResponse } from "@/types";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const params = Object.fromEntries(sp.entries());
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    return NextResponse.json(mockRecordsResponse);
  }
  try {
    const data = await phpFetch<RecordsResponse>("/records", params);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 502 });
  }
}
