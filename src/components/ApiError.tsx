interface ApiErrorProps {
  message?: string;
  hint?: string;
}

export function ApiError({ message, hint }: ApiErrorProps) {
  const isDown = message?.includes("521") || message?.includes("522") || message?.includes("523");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[40vh] gap-6 text-center px-4"
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: "rgba(224,0,45,0.08)", border: "1px solid rgba(224,0,45,0.3)" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e0002d" strokeWidth="1.5">
          <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        </svg>
      </div>

      <div className="space-y-1.5">
        <p
          className="font-mono text-sm uppercase tracking-widest"
          style={{ color: "#e0002d" }}
        >
          {isDown ? "Backend Indisponível" : "Erro de Conexão"}
        </p>
        {message && (
          <p className="font-mono text-xs" style={{ color: "#4a1525" }}>
            {message}
          </p>
        )}
      </div>

      {isDown && (
        <div
          className="rounded px-4 py-3 text-left max-w-md space-y-1.5"
          style={{ background: "rgba(224,0,45,0.05)", border: "1px solid rgba(224,0,45,0.12)" }}
        >
          <p className="font-mono text-xs" style={{ color: "#9a3050" }}>
            Erro 521 — o servidor de origem não está respondendo ao Cloudflare.
          </p>
          <p className="font-mono text-xs" style={{ color: "#4a1525" }}>
            Verifique na Vercel se{" "}
            <span style={{ color: "#e0002d" }}>PHP_API_URL</span> e{" "}
            <span style={{ color: "#e0002d" }}>PHP_API_KEY</span> estão configurados
            e se o servidor PHP está no ar.
          </p>
        </div>
      )}

      {hint && (
        <p className="font-mono text-xs" style={{ color: "#4a1525" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
