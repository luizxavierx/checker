import type { ExtensionStatus } from "@/types";

const logColors = {
  info:  { color: "#e0002d", bg: "rgba(210,0,45,0.06)"  },
  warn:  { color: "#ff6d10", bg: "rgba(255,109,16,0.06)" },
  error: { color: "#ff1a40", bg: "rgba(255,26,64,0.08)"  },
};

export function ExtensionStatusWidget({ ext }: { ext: ExtensionStatus }) {
  const fmtDate   = (s: string | null) => s ? new Date(s).toLocaleString("pt-BR") : "—";
  const versionOk = ext.version === ext.expectedVersion;

  const cards = [
    {
      label: "Status",
      value: ext.isOnline ? "● ONLINE" : "● OFFLINE",
      color: ext.isOnline ? "#00e854" : "#ff1a40",
      shadow: ext.isOnline ? "0 0 8px rgba(0,232,84,0.3)" : "0 0 8px rgba(255,26,64,0.3)",
    },
    {
      label: "Versão instalada",
      value: ext.version ?? "—",
      color: versionOk ? "#00e854" : "#ff1a40",
      shadow: "none",
    },
    {
      label: "Versão esperada",
      value: ext.expectedVersion ?? "—",
      color: "#e0002d",
      shadow: "none",
    },
    {
      label: "Último heartbeat",
      value: fmtDate(ext.lastHeartbeat),
      color: "#9a3050",
      shadow: "none",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded p-3 relative corner-bracket"
            style={{
              background: "linear-gradient(135deg, rgba(210,0,45,0.04) 0%, #0b0311 100%)",
              border: "1px solid rgba(210,0,45,0.18)",
            }}
          >
            <div className="font-mono text-xs uppercase tracking-widest mb-1.5" style={{ color: "#4a1525" }}>
              {c.label}
            </div>
            <div
              className="font-mono text-sm font-bold"
              style={{ color: c.color, textShadow: c.shadow }}
            >
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {/* Logs */}
      <div
        className="rounded overflow-hidden"
        style={{ background: "#0b0311", border: "1px solid rgba(210,0,45,0.16)" }}
      >
        <div
          className="px-4 py-2.5 font-mono text-xs uppercase tracking-widest flex items-center gap-2"
          style={{ borderBottom: "1px solid rgba(210,0,45,0.12)", color: "#6e0018" }}
        >
          <div className="w-1 h-3 rounded-full" style={{ background: "#e0002d", boxShadow: "0 0 6px #e0002d" }} />
          Logs recentes
        </div>
        <div className="divide-y max-h-72 overflow-y-auto" style={{ borderColor: "rgba(210,0,45,0.06)" }}>
          {ext.logs.length === 0 && (
            <div className="px-4 py-6 font-mono text-xs text-center" style={{ color: "#4a1525" }}>sem logs</div>
          )}
          {ext.logs.map((log, i) => {
            const lc = logColors[log.level];
            return (
              <div
                key={i}
                className="flex gap-3 px-4 py-2 font-mono text-xs"
                style={{ background: i % 2 === 0 ? "rgba(0,0,0,0.1)" : "transparent" }}
              >
                <span className="shrink-0" style={{ color: "#4a1525" }}>
                  {new Date(log.timestamp).toLocaleTimeString("pt-BR")}
                </span>
                <span
                  className="shrink-0 px-1.5 py-0 rounded uppercase tracking-widest"
                  style={{
                    fontSize: "0.6rem",
                    background: lc.bg,
                    color: lc.color,
                    alignSelf: "center",
                  }}
                >
                  {log.level}
                </span>
                <span style={{ color: "#9a3050" }}>{log.message}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
