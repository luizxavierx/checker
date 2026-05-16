"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard",    icon: "◉" },
  { href: "/records",   label: "Registros",     icon: "≡" },
  { href: "/bots",      label: "Bots / Grupos", icon: "⬡" },
  { href: "/extension", label: "Extensão",      icon: "◈" },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside
      className="w-12 md:w-52 flex flex-col shrink-0 relative"
      style={{
        background: "#06010a",
        borderRight: "1px solid rgba(210,0,45,0.2)",
      }}
    >
      {/* Vertical red accent line */}
      <div
        className="absolute right-0 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(210,0,45,0.5) 30%, rgba(210,0,45,0.5) 70%, transparent)" }}
      />

      {/* Logo */}
      <div
        className="h-12 flex items-center px-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(210,0,45,0.18)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-sm shrink-0 flex items-center justify-center text-xs"
            style={{
              background: "rgba(210,0,45,0.15)",
              border: "1px solid rgba(210,0,45,0.4)",
              color: "#e0002d",
              boxShadow: "0 0 8px rgba(210,0,45,0.3)",
            }}
          >
            ✕
          </div>
          <span
            className="hidden md:block font-mono text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: "#c0004a" }}
          >
            XH·PANEL
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-0.5 px-1.5">
        {nav.map((item) => {
          const active = path === item.href || path.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-2 py-2 rounded text-xs font-mono transition-all duration-150"
              style={
                active
                  ? {
                      background: "rgba(210,0,45,0.12)",
                      border: "1px solid rgba(210,0,45,0.3)",
                      color: "#ff1a40",
                      boxShadow: "0 0 10px rgba(210,0,45,0.15), inset 0 0 10px rgba(210,0,45,0.05)",
                    }
                  : {
                      background: "transparent",
                      border: "1px solid transparent",
                      color: "#4a1525",
                    }
              }
            >
              <span
                className="text-sm w-4 text-center shrink-0"
                style={{ color: active ? "#ff1a40" : "#6e0018" }}
              >
                {item.icon}
              </span>
              <span className="hidden md:block tracking-wider">{item.label}</span>
              {active && (
                <div
                  className="ml-auto hidden md:block w-1 h-1 rounded-full"
                  style={{ background: "#ff1a40", boxShadow: "0 0 6px #ff1a40" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-3 py-3 hidden md:flex items-center gap-2"
        style={{ borderTop: "1px solid rgba(210,0,45,0.14)" }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full animate-pulse-r"
          style={{ background: "#00e854", boxShadow: "0 0 6px #00e854" }}
        />
        <span className="font-mono text-xs" style={{ color: "#4a1525" }}>
          v2.4.1
        </span>
      </div>
    </aside>
  );
}
