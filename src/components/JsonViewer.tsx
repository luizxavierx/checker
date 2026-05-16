"use client";
import { useState } from "react";

export function JsonViewer({ data, label }: { data: unknown; label?: string }) {
  const [open, setOpen] = useState(false);
  const str = JSON.stringify(data, null, 2);

  return (
    <div
      className="rounded overflow-hidden"
      style={{ border: "1px solid rgba(210,0,45,0.16)", background: "#0b0311" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 font-mono text-xs transition-colors"
        style={{ color: open ? "#e0002d" : "#6e0018" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e0002d")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = open ? "#e0002d" : "#6e0018")}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: "rgba(210,0,45,0.5)" }}>{open ? "▼" : "▶"}</span>
          <span className="uppercase tracking-widest" style={{ fontSize: "0.65rem" }}>
            {label ?? "JSON"}
          </span>
        </div>
        <span style={{ color: "#4a1525", fontSize: "0.65rem" }}>
          {data == null ? "null" : typeof data === "object" ? `{${Object.keys(data as object).length}}` : ""}
        </span>
      </button>

      {open && (
        <pre
          className="p-3 overflow-x-auto max-h-72 font-mono text-xs whitespace-pre-wrap break-all"
          style={{
            borderTop: "1px solid rgba(210,0,45,0.12)",
            color: "#9a3050",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          {str}
        </pre>
      )}
    </div>
  );
}
