import type { TelegramRecord } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { DocumentPrefixBadge } from "./DocumentPrefixBadge";
import Link from "next/link";

type Props = {
  title: string;
  records: TelegramRecord[];
  valueKey: "incomeAmount" | "score";
  accent: "live" | "die" | "score";
};

const fmt = (v: number | null, key: "incomeAmount" | "score") =>
  v == null ? "—" : key === "incomeAmount" ? `R$ ${v.toLocaleString("pt-BR")}` : String(v);

const accentColor = { live: "#00e854", die: "#ff1a40", score: "#c084fc" };

export function RankTable({ title, records, valueKey, accent }: Props) {
  const color = accentColor[accent];
  return (
    <div
      className="flex flex-col rounded overflow-hidden"
      style={{ background: "#0b0311", border: "1px solid rgba(210,0,45,0.18)" }}
    >
      {/* Title bar */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ borderBottom: "1px solid rgba(210,0,45,0.14)" }}
      >
        <div className="w-1 h-3 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
        <span className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: "#6e0018" }}>
          {title}
        </span>
      </div>

      <div className="divide-y" style={{ borderColor: "rgba(210,0,45,0.08)" }}>
        {records.slice(0, 10).map((r, i) => (
          <Link
            key={r.id}
            href={`/records/${r.id}`}
            className="flex items-center gap-3 px-4 py-2.5 transition-colors"
            style={{ color: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(210,0,45,0.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span className="font-mono text-xs w-4 shrink-0" style={{ color: "#4a1525" }}>
              {i + 1}
            </span>
            <DocumentPrefixBadge prefix={r.documentPrefix} />
            <span className="flex-1 font-mono text-xs truncate" style={{ color: "#9a3050" }}>
              {r.name ?? r.botTitle}
            </span>
            <StatusBadge flag={r.flag} />
            <span
              className="font-mono text-xs font-bold w-28 text-right shrink-0"
              style={{ color, textShadow: `0 0 8px ${color}55` }}
            >
              {fmt(r[valueKey], valueKey)}
            </span>
          </Link>
        ))}
        {records.length === 0 && (
          <div className="px-4 py-6 text-center font-mono text-xs" style={{ color: "#4a1525" }}>
            sem dados
          </div>
        )}
      </div>
    </div>
  );
}
