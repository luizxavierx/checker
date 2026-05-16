export const dynamic = "force-dynamic";

import { getExtensionStatus } from "@/lib/data";
import { ExtensionStatusWidget } from "@/components/ExtensionStatusWidget";
import { ApiError } from "@/components/ApiError";

export default async function ExtensionPage() {
  let data: Awaited<ReturnType<typeof getExtensionStatus>>;
  try {
    data = await getExtensionStatus();
  } catch (e) {
    return <ApiError message={String(e)} />;
  }

  if (!data.ok || !data.extension) {
    return (
      <div className="py-10 text-center font-mono text-sm" style={{ color: "#ff1a40" }}>
        Extensão não encontrada
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className="font-mono text-xs uppercase tracking-widest"
        style={{ color: "#4a1525" }}
      >
        Status da Extensão Chrome
      </div>
      <ExtensionStatusWidget ext={data.extension} />
    </div>
  );
}
