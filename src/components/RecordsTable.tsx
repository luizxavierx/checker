"use client";
import type { TelegramRecord } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { DocumentPrefixBadge } from "./DocumentPrefixBadge";
import { useRouter } from "next/navigation";

type Props = { records: TelegramRecord[] };

const fmtDate = (s: string | null) =>
  s ? new Date(s).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "—";

const HEADERS = ["#", "Doc (6d)", "Nome", "Bot", "Status", "Renda", "Score", "Salvo em"];

export function RecordsTable({ records }: Props) {
  const router = useRouter();
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse font-mono text-xs">
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(210,0,45,0.2)" }}>
            {HEADERS.map((h) => (
              <th
                key={h}
                className="text-left py-2.5 px-3 font-normal uppercase tracking-widest whitespace-nowrap"
                style={{ color: "#6e0018" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr
              key={r.id}
              onClick={() => router.push(`/records/${r.id}`)}
              className="cursor-pointer transition-colors"
              style={{ borderBottom: "1px solid rgba(210,0,45,0.08)" }}
            >
              <td className="py-2.5 px-3" style={{ color: "#4a1525" }}>{r.id}</td>
              <td className="py-2.5 px-3"><DocumentPrefixBadge prefix={r.documentPrefix} /></td>
              <td className="py-2.5 px-3 max-w-[130px] truncate" style={{ color: "#9a3050" }}>
                {r.name ?? "—"}
              </td>
              <td className="py-2.5 px-3" style={{ color: "#e0002d" }}>{r.botTitle}</td>
              <td className="py-2.5 px-3"><StatusBadge flag={r.flag} /></td>
              <td className="py-2.5 px-3 font-bold" style={{ color: "#00e854", textShadow: "0 0 8px rgba(0,232,84,0.3)" }}>
                {r.incomeAmount != null ? `R$ ${r.incomeAmount.toLocaleString("pt-BR")}` : "—"}
              </td>
              <td className="py-2.5 px-3" style={{ color: "#c084fc" }}>{r.score ?? "—"}</td>
              <td className="py-2.5 px-3 whitespace-nowrap" style={{ color: "#4a1525" }}>{fmtDate(r.savedAt)}</td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan={8} className="py-10 text-center" style={{ color: "#4a1525" }}>
                nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
