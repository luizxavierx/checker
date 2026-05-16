export const dynamic = "force-dynamic";

import { getBots } from "@/lib/data";
import { BotCard } from "@/components/BotCard";
import { ApiError } from "@/components/ApiError";

export default async function BotsPage() {
  let data: Awaited<ReturnType<typeof getBots>>;
  try {
    data = await getBots();
  } catch (e) {
    return <ApiError message={String(e)} />;
  }
  const bots = data.bots ?? [];

  return (
    <div className="space-y-4">
      <div className="font-mono text-xs" style={{ color: "#4a1525" }}>
        {bots.length} bots / grupos
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {bots.map((bot) => (
          <BotCard key={bot.botKey} bot={bot} />
        ))}
      </div>
    </div>
  );
}
