"use client";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard": "DASHBOARD",
  "/records":   "REGISTROS",
  "/bots":      "BOTS / GRUPOS",
  "/extension": "EXTENSÃO",
};

export function Header() {
  const path = usePathname();
  const base  = "/" + path.split("/")[1];
  const title = titles[base] ?? "DETALHE";

  return (
    <header
      className="h-11 flex items-center px-4 gap-4 shrink-0 relative"
      style={{
        background: "#06010a",
        borderBottom: "1px solid rgba(210,0,45,0.2)",
      }}
    >
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(210,0,45,0.6) 30%, rgba(210,0,45,0.6) 70%, transparent)" }}
      />

      {/* Breadcrumb indicator */}
      <div className="flex items-center gap-2">
        <div
          className="w-px h-4"
          style={{ background: "rgba(210,0,45,0.5)" }}
        />
        <span
          className="font-mono text-xs tracking-[0.18em] font-bold"
          style={{ color: "#ff1a40" }}
        >
          {title}
        </span>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-4">
        <span className="font-mono text-xs hidden sm:block" style={{ color: "#4a1525" }}>
          XavierHub Telegram Saver
        </span>

        {/* Status pill */}
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-xs"
          style={{
            background: "rgba(0,232,84,0.08)",
            border: "1px solid rgba(0,232,84,0.22)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#00e854", boxShadow: "0 0 6px #00e854", animation: "pulse-r 2.5s ease-in-out infinite" }}
          />
          <span style={{ color: "#00e854" }}>LIVE</span>
        </div>
      </div>
    </header>
  );
}
