export const dynamic = "force-dynamic";

import { getRecord } from "@/lib/data";
import { RecordDetail } from "@/components/RecordDetail";
import { ApiError } from "@/components/ApiError";
import Link from "next/link";

export default async function RecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data: Awaited<ReturnType<typeof getRecord>>;
  try {
    data = await getRecord(id);
  } catch (e) {
    return <ApiError message={String(e)} />;
  }

  if (!data.ok || !data.record) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <div className="font-mono text-sm" style={{ color: "#ff1a40" }}>
          Registro não encontrado
        </div>
        <Link href="/records" className="font-mono text-xs" style={{ color: "#e0002d" }}>
          ← Registros
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 font-mono text-xs">
        <Link href="/records" style={{ color: "#4a1525" }}>
          ← Registros
        </Link>
        <span style={{ color: "#2a0810" }}>/</span>
        <span style={{ color: "#9a3050" }}>#{id}</span>
      </div>
      <RecordDetail record={data.record} />
    </div>
  );
}
