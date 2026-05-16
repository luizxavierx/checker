"use client";
import { useCallback, useEffect, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { RecordsTable } from "@/components/RecordsTable";
import { Pagination } from "@/components/Pagination";
import type { RecordsFilter, RecordsResponse } from "@/types";

export default function RecordsPage() {
  const [filter, setFilter] = useState<RecordsFilter>({ sort: "saved_desc", page: 1, perPage: 25 });
  const [data, setData] = useState<RecordsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([k, v]) => { if (v !== undefined && v !== "") params.set(k, String(v)); });
    const res = await fetch(`/api/telegram-panel/records?${params}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const updateFilter = (patch: Partial<RecordsFilter>) => setFilter((f) => ({ ...f, ...patch }));

  return (
    <div className="space-y-4">
      <FilterBar filter={filter} onChange={updateFilter} />
      <div className="bg-card border border-border-dim rounded">
        <div className="px-4 py-2 border-b border-border-dim flex items-center justify-between">
          <span className="text-xs font-mono text-dim uppercase tracking-widest">Registros</span>
          {loading && <span className="text-xs font-mono text-neon animate-pulse">carregando…</span>}
        </div>
        <RecordsTable records={data?.items ?? []} />
        {data && (
          <div className="px-4 pb-3">
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              perPage={data.perPage}
              total={data.total}
              onPageChange={(p) => updateFilter({ page: p })}
              onPerPageChange={(n) => updateFilter({ perPage: n, page: 1 })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
