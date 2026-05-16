import type { TelegramRecordDetail } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { CopyButton } from "./CopyButton";
import { JsonViewer } from "./JsonViewer";

const fmtMoney = (v: number | null) =>
  v != null ? `R$ ${v.toLocaleString("pt-BR")}` : "—";
const fmtDate = (s: string | null) =>
  s ? new Date(s).toLocaleString("pt-BR") : "—";

function DataField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded p-3 relative"
      style={{
        background: "linear-gradient(135deg, rgba(210,0,45,0.03) 0%, #0b0311 100%)",
        border: "1px solid rgba(210,0,45,0.16)",
      }}
    >
      <div
        className="font-mono text-xs uppercase tracking-widest mb-1.5"
        style={{ color: "#4a1525" }}
      >
        {label}
      </div>
      <div className="font-mono text-sm" style={{ color: "#f0d5da" }}>
        {children}
      </div>
    </div>
  );
}

export function RecordDetail({ record }: { record: TelegramRecordDetail }) {
  const doc6 = record.documentPrefix?.slice(0, 6) ?? record.document?.slice(0, 6) ?? "—";

  const summary = [
    `Nome: ${record.name ?? "—"}`,
    `CPF/CNPJ: ${doc6}···`,
    `Bot: ${record.botTitle}`,
    `Status: ${record.flag}`,
    `Renda: ${fmtMoney(record.incomeAmount)}`,
    `Score: ${record.score ?? "—"}`,
    `Salvo: ${fmtDate(record.savedAt)}`,
  ].join("\n");

  return (
    <div className="space-y-4">
      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="rounded p-4 flex items-start justify-between gap-4 flex-wrap relative"
        style={{
          background: "linear-gradient(135deg, rgba(210,0,45,0.06) 0%, #0b0311 100%)",
          border: "1px solid rgba(210,0,45,0.25)",
          boxShadow: "0 0 24px rgba(210,0,45,0.08)",
        }}
      >
        {/* Left accent */}
        <div
          className="absolute left-0 top-4 bottom-4 w-0.5 rounded-r"
          style={{ background: "#e0002d", boxShadow: "0 0 8px #e0002d" }}
        />
        <div className="pl-2">
          <div className="font-mono text-xl font-bold" style={{ color: "#f0d5da" }}>
            {record.name ?? "Sem nome"}
          </div>
          <div className="font-mono text-xs mt-1" style={{ color: "#4a1525" }}>
            ID #{record.id} · {record.botTitle} · {fmtDate(record.savedAt)}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <StatusBadge flag={record.flag} />
          <CopyButton text={doc6} label="prefixo" />
          <CopyButton text={summary} label="resumo" />
          <CopyButton text={JSON.stringify(record, null, 2)} label="JSON" />
        </div>
      </div>

      {/* ── Main data grid ─────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        <DataField label="Doc (6d)">
          <span style={{ color: "#e0002d" }}>{doc6}</span>
          <span style={{ color: "#4a1525" }}>···</span>
        </DataField>
        <DataField label="API parceira">
          <span style={{ color: "#9a3050" }}>{record.partnerName ?? "—"}</span>
        </DataField>
        <DataField label="Renda">
          <span style={{ color: "#00e854", fontWeight: 700, textShadow: "0 0 8px rgba(0,232,84,0.3)" }}>
            {fmtMoney(record.incomeAmount)}
          </span>
        </DataField>
        <DataField label="Score">
          <span style={{ color: "#c084fc", fontWeight: 700 }}>{record.score ?? "—"}</span>
        </DataField>
        <DataField label="Score label">
          <span style={{ color: "#9a3050" }}>{record.scoreLabel ?? "—"}</span>
        </DataField>
        <DataField label="Poder aquisitivo">
          <span style={{ color: "#9a3050" }}>{record.power ?? "—"}</span>
        </DataField>
        <DataField label="Valor">
          <span style={{ color: "#9a3050" }}>{fmtMoney(record.amount)}</span>
        </DataField>
        <DataField label="Saldo">
          <span style={{ color: "#9a3050" }}>{fmtMoney(record.balanceAmount)}</span>
        </DataField>
      </div>

      {/* ── Contact lists ──────────────────────────────────── */}
      {[
        { label: "E-mails",   items: record.emails    },
        { label: "Telefones", items: record.phones    },
        { label: "Endereços", items: record.addresses },
      ].map(({ label, items }) =>
        items.length > 0 ? (
          <div
            key={label}
            className="rounded p-3"
            style={{ background: "#0b0311", border: "1px solid rgba(210,0,45,0.14)" }}
          >
            <div
              className="font-mono text-xs uppercase tracking-widest mb-2"
              style={{ color: "#6e0018" }}
            >
              {label}
            </div>
            <div className="space-y-1">
              {items.map((v, i) => (
                <div key={i} className="font-mono text-xs" style={{ color: "#9a3050" }}>
                  {v}
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}

      {/* ── Raw text ───────────────────────────────────────── */}
      {record.rawText && (
        <div
          className="rounded p-3"
          style={{ background: "#0b0311", border: "1px solid rgba(210,0,45,0.14)" }}
        >
          <div
            className="font-mono text-xs uppercase tracking-widest mb-2"
            style={{ color: "#6e0018" }}
          >
            Texto bruto
          </div>
          <pre
            className="font-mono text-xs whitespace-pre-wrap break-all max-h-60 overflow-y-auto"
            style={{ color: "#9a3050" }}
          >
            {record.rawText}
          </pre>
        </div>
      )}

      {/* ── JSON payloads ──────────────────────────────────── */}
      <div className="space-y-2">
        <JsonViewer data={record.parsedJson}            label="parsedJson" />
        <JsonViewer data={record.rawPayload}            label="rawPayload" />
        <JsonViewer data={record.partnerPayloadFiltered} label="partnerPayloadFiltered" />
        <JsonViewer data={record.partnerPayloadRaw}     label="partnerPayloadRaw (completo)" />
      </div>
    </div>
  );
}
