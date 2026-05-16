import type { BotSummary } from "@/types";
import Link from "next/link";

export function BotCard({ bot }: { bot: BotSummary }) {
  const total = bot.live + bot.die + bot.sem || 1;
  const livePct = (bot.live / total) * 100;
  const diePct  = (bot.die  / total) * 100;
  const semPct  = (bot.sem  / total) * 100;

  return (
    <Link
      href={`/bots/${bot.botKey}`}
      className="block rounded p-4 relative corner-bracket transition-all duration-200"
      style={{
        background: "linear-gradient(135deg, rgba(210,0,45,0.04) 0%, #0b0311 100%)",
        border: "1px solid rgba(210,0,45,0.18)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.border = "1px solid rgba(210,0,45,0.4)";
        el.style.boxShadow = "0 0 20px rgba(210,0,45,0.12)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.border = "1px solid rgba(210,0,45,0.18)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="font-mono text-sm font-bold" style={{ color: "#f0d5da" }}>
            {bot.botTitle}
          </div>
          <div className="font-mono text-xs mt-0.5" style={{ color: "#4a1525" }}>
            {bot.botUsername ?? bot.botKey}
          </div>
        </div>
        <div
          className="font-mono text-xs font-bold px-2 py-0.5 rounded"
          style={{
            background: "rgba(210,0,45,0.1)",
            border: "1px solid rgba(210,0,45,0.25)",
            color: "#e0002d",
          }}
        >
          {bot.total.toLocaleString("pt-BR")}
        </div>
      </div>

      {/* Distribution bar */}
      <div className="flex h-1 rounded overflow-hidden mb-3 gap-px" style={{ background: "rgba(210,0,45,0.08)" }}>
        {livePct > 0 && <div style={{ width: `${livePct}%`, background: "#00e854", boxShadow: "0 0 4px #00e854" }} />}
        {diePct > 0  && <div style={{ width: `${diePct}%`,  background: "#ff1a40", boxShadow: "0 0 4px #ff1a40" }} />}
        {semPct > 0  && <div style={{ width: `${semPct}%`,  background: "#ff6d10" }} />}
      </div>

      {/* Counts */}
      <div className="grid grid-cols-3 gap-1 mb-3">
        {[
          { label: "LIVE", val: bot.live,  color: "#00e854" },
          { label: "DIE",  val: bot.die,   color: "#ff1a40" },
          { label: "SEM",  val: bot.sem,   color: "#ff6d10" },
        ].map(({ label, val, color }) => (
          <div
            key={label}
            className="text-center py-1.5 rounded"
            style={{ background: "rgba(210,0,45,0.06)", border: "1px solid rgba(210,0,45,0.1)" }}
          >
            <div className="font-mono text-sm font-bold" style={{ color, textShadow: `0 0 6px ${color}55` }}>
              {val}
            </div>
            <div className="font-mono text-xs" style={{ color: "#4a1525" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs font-mono pt-2.5"
        style={{ borderTop: "1px solid rgba(210,0,45,0.12)" }}
      >
        <div>
          <span style={{ color: "#4a1525" }}>renda: </span>
          <span style={{ color: "#00e854", fontWeight: 700 }}>
            {bot.topIncome != null ? `R$ ${bot.topIncome.toLocaleString("pt-BR")}` : "—"}
          </span>
        </div>
        <div>
          <span style={{ color: "#4a1525" }}>score: </span>
          <span style={{ color: "#c084fc", fontWeight: 700 }}>{bot.topScore ?? "—"}</span>
        </div>
        <div>
          <span style={{ color: "#4a1525" }}>docs: </span>
          <span style={{ color: "#9a3050" }}>{bot.uniqueDocuments}</span>
        </div>
        <div style={{ color: "#4a1525" }} className="truncate">
          {bot.lastSavedAt ? new Date(bot.lastSavedAt).toLocaleDateString("pt-BR") : "—"}
        </div>
      </div>
    </Link>
  );
}
