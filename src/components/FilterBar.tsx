"use client";
import type { RecordsFilter } from "@/types";

type Props = {
  filter: RecordsFilter;
  onChange: (f: Partial<RecordsFilter>) => void;
};

const inputCls = "bg-panel rounded px-2 py-1.5 text-xs font-mono text-primary outline-none transition-all";
const inputStyle = {
  background: "#06010a",
  border: "1px solid rgba(210,0,45,0.2)",
  color: "#f0d5da",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-mono uppercase tracking-widest" style={{ color: "#4a1525" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function FilterBar({ filter, onChange }: Props) {
  return (
    <div
      className="rounded p-3 flex flex-wrap gap-2.5 items-end"
      style={{
        background: "linear-gradient(135deg, rgba(210,0,45,0.03) 0%, #0b0311 100%)",
        border: "1px solid rgba(210,0,45,0.16)",
      }}
    >
      <Field label="Busca">
        <input
          value={filter.q ?? ""}
          onChange={(e) => onChange({ q: e.target.value, page: 1 })}
          placeholder="nome, doc..."
          className={inputCls}
          style={{ ...inputStyle, width: 148 }}
        />
      </Field>

      <Field label="Prefixo 6d">
        <input
          value={filter.documentPrefix ?? ""}
          onChange={(e) => onChange({ documentPrefix: e.target.value, page: 1 })}
          maxLength={6}
          placeholder="123456"
          className={inputCls}
          style={{ ...inputStyle, width: 80, color: "#e0002d" }}
        />
      </Field>

      <Field label="Status">
        <select
          value={filter.status ?? ""}
          onChange={(e) => onChange({ status: e.target.value as RecordsFilter["status"], page: 1 })}
          className={inputCls}
          style={{ ...inputStyle, width: 90 }}
        >
          <option value="">Todos</option>
          <option value="LIVE">LIVE</option>
          <option value="DIE">DIE</option>
          <option value="SEM">SEM</option>
        </select>
      </Field>

      <Field label="Renda mín">
        <input
          value={filter.incomeMin ?? ""}
          onChange={(e) => onChange({ incomeMin: e.target.value, page: 1 })}
          type="number"
          placeholder="0"
          className={inputCls}
          style={{ ...inputStyle, width: 88, color: "#00e854" }}
        />
      </Field>

      <Field label="Renda máx">
        <input
          value={filter.incomeMax ?? ""}
          onChange={(e) => onChange({ incomeMax: e.target.value, page: 1 })}
          type="number"
          placeholder="∞"
          className={inputCls}
          style={{ ...inputStyle, width: 88, color: "#00e854" }}
        />
      </Field>

      <Field label="Score mín">
        <input
          value={filter.scoreMin ?? ""}
          onChange={(e) => onChange({ scoreMin: e.target.value, page: 1 })}
          type="number"
          placeholder="0"
          className={inputCls}
          style={{ ...inputStyle, width: 80, color: "#c084fc" }}
        />
      </Field>

      <Field label="Ordenar">
        <select
          value={filter.sort ?? "saved_desc"}
          onChange={(e) => onChange({ sort: e.target.value as RecordsFilter["sort"], page: 1 })}
          className={inputCls}
          style={{ ...inputStyle, width: 128 }}
        >
          <option value="saved_desc">Mais recente</option>
          <option value="income_desc">Maior renda</option>
          <option value="score_desc">Maior score</option>
          <option value="bot_asc">Bot A→Z</option>
        </select>
      </Field>

      <Field label="De">
        <input
          value={filter.from ?? ""}
          onChange={(e) => onChange({ from: e.target.value, page: 1 })}
          type="date"
          className={inputCls}
          style={inputStyle}
        />
      </Field>

      <Field label="Até">
        <input
          value={filter.to ?? ""}
          onChange={(e) => onChange({ to: e.target.value, page: 1 })}
          type="date"
          className={inputCls}
          style={inputStyle}
        />
      </Field>

      <button
        onClick={() =>
          onChange({ q: "", documentPrefix: "", status: "", incomeMin: "", incomeMax: "", scoreMin: "", scoreMax: "", from: "", to: "", sort: "saved_desc", page: 1 })
        }
        className="ml-auto px-3 py-1.5 rounded font-mono text-xs transition-all"
        style={{
          background: "rgba(210,0,45,0.06)",
          border: "1px solid rgba(210,0,45,0.2)",
          color: "#6e0018",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#e0002d";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(210,0,45,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#6e0018";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(210,0,45,0.2)";
        }}
      >
        limpar
      </button>
    </div>
  );
}
