export const dynamic = "force-dynamic";

import { getBots } from "@/lib/data";
import { BotCard } from "@/components/BotCard";

export default async function BotsPage() {
  const data = await getBots();
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
