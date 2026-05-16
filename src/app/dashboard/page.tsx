export const dynamic = "force-dynamic";

import { getSummary } from "@/lib/data";
import { MetricCard } from "@/components/MetricCard";
import { RankTable } from "@/components/RankTable";
import { RecordsTable } from "@/components/RecordsTable";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div
        className="w-0.5 h-4 rounded-full shrink-0"
        style={{ background: "#e0002d", boxShadow: "0 0 6px #e0002d" }}
      />
      <span
        className="font-mono text-xs uppercase tracking-[0.18em]"
        style={{ color: "#6e0018" }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(210,0,45,0.12)" }} />
    </div>
  );
}

export default async function DashboardPage() {
  const data = await getSummary();
  const s    = data.stats;
  const fmtDate = (v: string | null) =>
    v ? new Date(v).toLocaleString("pt-BR") : "—";

  return (
    <div className="space-y-7">

      {/* Visão geral */}
      <div>
        <SectionTitle>Visão geral</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <MetricCard label="Mensagens"    value={s.messages.toLocaleString("pt-BR")}  accent="red" />
          <MetricCard label="CPFs / CNPJs" value={s.documents.toLocaleString("pt-BR")} accent="red" />
          <MetricCard label="Bots ativos"  value={s.bots}                              accent="red" />
          <MetricCard label="Enriquecidos" value={s.enriched.toLocaleString("pt-BR")}  accent="red" />
          <MetricCard
            label="Duplicados"
            value={s.duplicates}
            sub={`último: ${fmtDate(s.lastSavedAt)}`}
            accent="sem"
          />
        </div>
      </div>

      {/* Classificação */}
      <div>
        <SectionTitle>Classificação</SectionTitle>
        <div className="grid grid-cols-3 gap-2.5">
          <MetricCard label="LIVE" value={s.live.toLocaleString("pt-BR")} sub="renda ≥ R$ 1.000" accent="live" />
          <MetricCard label="DIE"  value={s.die.toLocaleString("pt-BR")}  sub="renda < R$ 1.000"  accent="die"  />
          <MetricCard label="SEM"  value={s.sem.toLocaleString("pt-BR")}  sub="renda ausente"     accent="sem"  />
        </div>
      </div>

      {/* Rankings */}
      <div>
        <SectionTitle>Rankings</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <RankTable title="Top Renda" records={data.topIncome} valueKey="incomeAmount" accent="live" />
          <RankTable title="Top Score" records={data.topScore}  valueKey="score"        accent="score" />
        </div>
      </div>

      {/* Tabela */}
      <div>
        <SectionTitle>Maiores rendas salvas</SectionTitle>
        <div
          className="rounded overflow-hidden"
          style={{ background: "#0b0311", border: "1px solid rgba(210,0,45,0.18)" }}
        >
          <RecordsTable records={data.topIncome} />
        </div>
      </div>

    </div>
  );
}
