"use client";
import { useState } from "react";

export function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={copy}
      className="text-xs font-mono px-2.5 py-1 rounded transition-all duration-150"
      style={
        copied
          ? {
              background: "rgba(0,232,84,0.1)",
              border: "1px solid rgba(0,232,84,0.3)",
              color: "#00e854",
            }
          : {
              background: "rgba(210,0,45,0.06)",
              border: "1px solid rgba(210,0,45,0.22)",
              color: "#e0002d",
            }
      }
    >
      {copied ? "✓ copiado" : label}
    </button>
  );
}
