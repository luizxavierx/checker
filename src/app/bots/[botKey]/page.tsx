export const dynamic = "force-dynamic";

import { getBotDetail } from "@/lib/data";
import { MetricCard } from "@/components/MetricCard";
import { RankTable } from "@/components/RankTable";
import { RecordsTable } from "@/components/RecordsTable";
import { ApiError } from "@/components/ApiError";
import Link from "next/link";

export default async function BotDetailPage({
  params,
}: {
  params: Promise<{ botKey: string }>;
}) {
  const { botKey } = await params;
  let data: Awaited<ReturnType<typeof getBotDetail>>;
  try {
    data = await getBotDetail(botKey);
  } catch (e) {
    return <ApiError message={String(e)} />;
  }

  if (!data.ok || !data.bot) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <div className="font-mono text-sm" style={{ color: "#ff1a40" }}>
          Bot não encontrado
        </div>
        <Link
          href="/bots"
          className="font-mono text-xs"
          style={{ color: "#e0002d" }}
        >
          ← Voltar
        </Link>
      </div>
    );
  }

  const b = data.bot;
  const fmtDate = (s: string | null) =>
    s ? new Date(s).toLocaleString("pt-BR") : "—";

  return (
    <div className="space-y-6">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-xs">
        <Link href="/bots" style={{ color: "#4a1525" }}>
          ← Bots
        </Link>
        <span style={{ color: "#2a0810" }}>/</span>
        <span style={{ color: "#e0002d" }}>{b.botTitle}</span>
      </div>

      {/* Bot header */}
      <div
        className="rounded p-4 relative"
        style={{
          background: "linear-gradient(135deg, rgba(210,0,45,0.05) 0%, #0b0311 100%)",
          border: "1px solid rgba(210,0,45,0.22)",
          boxShadow: "0 0 20px rgba(210,0,45,0.06)",
        }}
      >
        <div
          className="absolute left-0 top-4 bottom-4 w-0.5 rounded-r"
          style={{ background: "#e0002d", boxShadow: "0 0 6px #e0002d" }}
        />
        <div className="pl-3">
          <div className="font-mono text-xl font-bold" style={{ color: "#f0d5da" }}>
            {b.botTitle}
          </div>
          <div className="font-mono text-xs mt-1" style={{ color: "#4a1525" }}>
            {b.botUsername ?? b.botKey} · último: {fmtDate(b.lastSavedAt)}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <MetricCard label="Total"       value={b.total}              accent="red"   />
        <MetricCard label="Docs únicos" value={b.uniqueDocuments}    accent="red"   />
        <MetricCard label="LIVE"        value={b.live}               accent="live"  />
        <MetricCard label="DIE"         value={b.die}                accent="die"   />
        <MetricCard label="SEM"         value={b.sem}                accent="sem"   />
        <MetricCard label="Top score"   value={b.topScore ?? "—"}    accent="score" />
      </div>

      {/* Rank tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <RankTable title="Top Renda" records={b.topIncomeRecords} valueKey="incomeAmount" accent="live" />
        <RankTable title="Top Score" records={b.topScoreRecords}  valueKey="score"        accent="score" />
      </div>

      {/* Duplicates */}
      {b.duplicates.length > 0 && (
        <div
          className="rounded overflow-hidden"
          style={{ background: "#0b0311", border: "1px solid rgba(210,0,45,0.16)" }}
        >
          <div
            className="px-4 py-2.5 font-mono text-xs uppercase tracking-widest flex items-center gap-2"
            style={{ borderBottom: "1px solid rgba(210,0,45,0.12)", color: "#6e0018" }}
          >
            <div
              className="w-1 h-3 rounded-full"
              style={{ background: "#e0002d", boxShadow: "0 0 6px #e0002d" }}
            />
            Duplicados
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(210,0,45,0.06)" }}>
            {b.duplicates.map((d) => (
              <div
                key={d.document}
                className="flex items-center justify-between px-4 py-2 font-mono text-xs"
              >
                <span style={{ color: "#e0002d" }}>{d.document.slice(0, 6)}···</span>
                <span style={{ color: "#ff6d10" }}>{d.count}×</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Records table */}
      <div
        className="rounded overflow-hidden"
        style={{ background: "#0b0311", border: "1px solid rgba(210,0,45,0.16)" }}
      >
        <div
          className="px-4 py-2.5 font-mono text-xs uppercase tracking-widest flex items-center gap-2"
          style={{ borderBottom: "1px solid rgba(210,0,45,0.12)", color: "#6e0018" }}
        >
          <div
            className="w-1 h-3 rounded-full"
            style={{ background: "#e0002d", boxShadow: "0 0 6px #e0002d" }}
          />
          Registros do bot
        </div>
        <RecordsTable records={b.records} />
      </div>

    </div>
  );
}
