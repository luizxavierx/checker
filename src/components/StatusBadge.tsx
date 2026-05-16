import type { StatusFlag } from "@/types";

const cfg = {
  LIVE: {
    bg:     "rgba(0,232,84,0.08)",
    border: "rgba(0,232,84,0.3)",
    color:  "#00e854",
    shadow: "0 0 8px rgba(0,232,84,0.25)",
    dot:    "#00e854",
  },
  DIE: {
    bg:     "rgba(255,26,64,0.1)",
    border: "rgba(255,26,64,0.4)",
    color:  "#ff1a40",
    shadow: "0 0 10px rgba(255,26,64,0.35)",
    dot:    "#ff1a40",
  },
  SEM: {
    bg:     "rgba(255,109,16,0.08)",
    border: "rgba(255,109,16,0.28)",
    color:  "#ff6d10",
    shadow: "0 0 8px rgba(255,109,16,0.2)",
    dot:    "#ff6d10",
  },
};

export function StatusBadge({ flag }: { flag: StatusFlag }) {
  const c = cfg[flag];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-xs font-bold tracking-widest"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.color,
        boxShadow: c.shadow,
      }}
    >
      <span
        className="w-1 h-1 rounded-full shrink-0"
        style={{ background: c.dot, boxShadow: `0 0 4px ${c.dot}` }}
      />
      {flag}
    </span>
  );
}
