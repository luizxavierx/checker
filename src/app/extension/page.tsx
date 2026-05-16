export const dynamic = "force-dynamic";

import { getExtensionStatus } from "@/lib/data";
import { ExtensionStatusWidget } from "@/components/ExtensionStatusWidget";

export default async function ExtensionPage() {
  const data = await getExtensionStatus();

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
