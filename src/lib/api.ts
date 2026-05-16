const BASE = process.env.PHP_API_URL ?? "";
const KEY = process.env.PHP_API_KEY ?? "";

export async function phpFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE}/api/telegram-panel${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== "") url.searchParams.set(k, v);
    });
  }
  const res = await fetch(url.toString(), {
    headers: { "X-XH-Panel-Key": KEY },
    next: { revalidate: 15 },
  });
  if (!res.ok) throw new Error(`PHP API error ${res.status}: ${path}`);
  return res.json();
}
