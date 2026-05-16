export function DocumentPrefixBadge({ prefix }: { prefix: string | null }) {
  if (!prefix) return <span className="font-mono text-xs" style={{ color: "#2a0810" }}>—</span>;
  return (
    <span className="font-mono text-xs tracking-wider">
      <span style={{ color: "#e0002d" }}>{prefix.slice(0, 6)}</span>
      <span style={{ color: "#4a1525" }}>···</span>
    </span>
  );
}
