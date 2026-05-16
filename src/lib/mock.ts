import type { SummaryResponse, RecordsResponse, TelegramRecordDetail, BotSummary, BotDetail, ExtensionStatus } from "@/types";

const now = new Date().toISOString();

export const mockRecords = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  botKey: `bot_${(i % 4) + 1}`,
  botTitle: ["NordicLeads", "XavierHub", "DataBot", "InfoSaver"][i % 4],
  botUsername: `@bot_${(i % 4) + 1}`,
  document: `${String(Math.floor(Math.random() * 999999)).padStart(6, "0")}XXX-XX`,
  documentPrefix: String(Math.floor(Math.random() * 999999)).padStart(6, "0"),
  name: ["João Silva", "Maria Santos", "Carlos Oliveira", "Ana Lima"][i % 4],
  incomeAmount: i % 7 === 0 ? null : i % 3 === 0 ? 500 + i * 10 : 1500 + i * 50,
  score: Math.floor(Math.random() * 900) + 100,
  scoreLabel: ["Bom", "Regular", "Excelente", "Ruim"][i % 4],
  power: ["Alto", "Médio", "Baixo"][i % 3],
  amount: i % 5 === 0 ? null : 10000 + i * 500,
  balanceAmount: i % 6 === 0 ? null : 5000 + i * 200,
  flag: (i % 7 === 0 ? "SEM" : i % 3 === 0 ? "DIE" : "LIVE") as "LIVE" | "DIE" | "SEM",
  savedAt: new Date(Date.now() - i * 3600000).toISOString(),
}));

export const mockSummary: SummaryResponse = {
  ok: true,
  stats: {
    messages: 1842,
    bots: 4,
    documents: 1247,
    enriched: 988,
    live: 712,
    die: 276,
    sem: 259,
    duplicates: 43,
    lastSavedAt: now,
  },
  extension: {
    version: "2.4.1",
    expectedVersion: "2.4.1",
    lastHeartbeat: now,
    lastSavedAt: now,
    isOnline: true,
    logs: [
      { timestamp: now, level: "info", message: "Extension started" },
      { timestamp: now, level: "info", message: "Connected to Telegram" },
    ],
  },
  topIncome: mockRecords.filter((r) => r.flag === "LIVE").slice(0, 10),
  topScore: [...mockRecords].sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 10),
};

export const mockRecordsResponse: RecordsResponse = {
  ok: true,
  items: mockRecords.slice(0, 25),
  page: 1,
  perPage: 25,
  total: 50,
  totalPages: 2,
};

export const mockDetail: TelegramRecordDetail = {
  ...mockRecords[0],
  emails: ["joao@example.com", "joao2@example.com"],
  phones: ["(71) 99999-1234", "(71) 98888-5678"],
  addresses: ["Rua das Flores, 123, Salvador, BA, 40000-000"],
  rawText: "CPF: 123456789-00\nNome: João Silva\nRenda: R$ 5.000,00\nScore: 850",
  parsedJson: { cpf: "12345678900", nome: "João Silva", renda: 5000, score: 850 },
  rawPayload: { source: "telegram", botKey: "bot_1", messageId: 12345 },
  partnerPayloadFiltered: { cpf: "12345678900", score: 850, renda: 5000 },
  partnerPayloadRaw: { cpf: "12345678900", score: 850, renda: 5000, raw: "..." },
  partnerName: "Consulta Premium",
};

export const mockBots: BotSummary[] = [
  { botKey: "bot_1", botTitle: "NordicLeads", botUsername: "@nordicleads", total: 540, uniqueDocuments: 480, live: 320, die: 100, sem: 120, topIncome: 18500, topScore: 920, lastSavedAt: now },
  { botKey: "bot_2", botTitle: "XavierHub", botUsername: "@xavierhub", total: 420, uniqueDocuments: 390, live: 210, die: 110, sem: 100, topIncome: 12000, topScore: 880, lastSavedAt: now },
  { botKey: "bot_3", botTitle: "DataBot", botUsername: "@databot", total: 580, uniqueDocuments: 510, live: 280, die: 180, sem: 120, topIncome: 22000, topScore: 950, lastSavedAt: now },
  { botKey: "bot_4", botTitle: "InfoSaver", botUsername: "@infosaver", total: 302, uniqueDocuments: 278, live: 150, die: 90, sem: 62, topIncome: 9800, topScore: 790, lastSavedAt: now },
];

export const mockBotDetail: BotDetail = {
  ...mockBots[0],
  topIncomeRecords: mockRecords.filter((r) => r.botKey === "bot_1" && r.flag === "LIVE").slice(0, 5),
  topScoreRecords: mockRecords.filter((r) => r.botKey === "bot_1").sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 5),
  duplicates: [{ document: "123456", count: 3 }, { document: "789012", count: 2 }],
  records: mockRecords.filter((r) => r.botKey === "bot_1"),
  totalPages: 2,
};

export const mockExtension: ExtensionStatus = {
  version: "2.4.1",
  expectedVersion: "2.4.1",
  lastHeartbeat: now,
  lastSavedAt: now,
  isOnline: true,
  logs: [
    { timestamp: new Date(Date.now() - 60000).toISOString(), level: "info", message: "Heartbeat OK" },
    { timestamp: new Date(Date.now() - 120000).toISOString(), level: "info", message: "Record saved: CPF 123456XXX" },
    { timestamp: new Date(Date.now() - 300000).toISOString(), level: "warn", message: "Rate limit approaching" },
    { timestamp: new Date(Date.now() - 600000).toISOString(), level: "info", message: "Connected to bot NordicLeads" },
    { timestamp: new Date(Date.now() - 3600000).toISOString(), level: "error", message: "API timeout, retried successfully" },
  ],
};
