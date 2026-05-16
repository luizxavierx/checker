type Accent = "red" | "live" | "die" | "sem" | "score";

type Props = {
  label: string;
  value: string | number;
  sub?: string;
  accent?: Accent;
};

const styles: Record<Accent, { color: string; border: string; glow: string; bg: string }> = {
  red:   { color: "#e0002d", border: "rgba(210,0,45,0.3)",  glow: "rgba(210,0,45,0.12)",  bg: "rgba(210,0,45,0.06)" },
  live:  { color: "#00e854", border: "rgba(0,232,84,0.28)", glow: "rgba(0,232,84,0.10)",  bg: "rgba(0,232,84,0.04)" },
  die:   { color: "#ff1a40", border: "rgba(255,26,64,0.35)",glow: "rgba(255,26,64,0.14)", bg: "rgba(255,26,64,0.06)" },
  sem:   { color: "#ff6d10", border: "rgba(255,109,16,0.3)",glow: "rgba(255,109,16,0.10)",bg: "rgba(255,109,16,0.04)" },
  score: { color: "#c084fc", border: "rgba(192,132,252,0.3)",glow: "rgba(192,132,252,0.10)",bg: "rgba(192,132,252,0.04)" },
};

export function MetricCard({ label, value, sub, accent = "red" }: Props) {
  const s = styles[accent];
  return (
    <div
      className="rounded p-4 flex flex-col gap-1.5 relative corner-bracket"
      style={{
        background: `linear-gradient(135deg, ${s.bg} 0%, #0b0311 100%)`,
        border: `1px solid ${s.border}`,
        boxShadow: `0 0 16px ${s.glow}, inset 0 0 16px ${s.glow}`,
      }}
    >
      <div
        className="text-xs font-mono uppercase tracking-[0.14em]"
        style={{ color: "#4a1525" }}
      >
        {label}
      </div>
      <div
        className="text-2xl font-mono font-bold leading-none"
        style={{ color: s.color, textShadow: `0 0 12px ${s.color}55` }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-xs font-mono" style={{ color: "#4a1525" }}>
          {sub}
        </div>
      )}

      {/* Accent left bar */}
      <div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r"
        style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
      />
    </div>
  );
}
