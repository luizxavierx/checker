"use client";

type Props = {
  page: number;
  totalPages: number;
  perPage: number;
  total: number;
  onPageChange: (p: number) => void;
  onPerPageChange: (n: number) => void;
};

const btnStyle = (disabled: boolean) => ({
  background: "transparent",
  border: "1px solid rgba(210,0,45,0.18)",
  color: disabled ? "#2a0810" : "#6e0018",
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.35 : 1,
  fontFamily: "Consolas, monospace",
  fontSize: "0.7rem",
  padding: "3px 8px",
  borderRadius: "3px",
  transition: "all 0.15s",
});

export function Pagination({ page, totalPages, perPage, total, onPageChange, onPerPageChange }: Props) {
  return (
    <div
      className="flex items-center justify-between gap-4 flex-wrap pt-3 mt-2"
      style={{ borderTop: "1px solid rgba(210,0,45,0.14)" }}
    >
      <div className="flex items-center gap-2 font-mono text-xs" style={{ color: "#4a1525" }}>
        <span>{total.toLocaleString("pt-BR")} reg.</span>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="font-mono text-xs px-1 py-0.5 rounded"
          style={{
            background: "#06010a",
            border: "1px solid rgba(210,0,45,0.2)",
            color: "#9a3050",
          }}
        >
          {[10, 25, 50].map((n) => (
            <option key={n} value={n}>{n}/pág</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        {[
          { label: "«", action: () => onPageChange(1),              disabled: page <= 1 },
          { label: "‹", action: () => onPageChange(page - 1),       disabled: page <= 1 },
          { label: null },
          { label: "›", action: () => onPageChange(page + 1),       disabled: page >= totalPages },
          { label: "»", action: () => onPageChange(totalPages),     disabled: page >= totalPages },
        ].map((btn, i) =>
          btn.label === null ? (
            <span key={i} className="px-3 font-mono text-xs" style={{ color: "#9a3050" }}>
              {page} <span style={{ color: "#4a1525" }}>/ {totalPages}</span>
            </span>
          ) : (
            <button
              key={i}
              onClick={btn.action}
              disabled={btn.disabled}
              style={btnStyle(!!btn.disabled)}
            >
              {btn.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
