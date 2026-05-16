export type StatusFlag = "LIVE" | "DIE" | "SEM";

export type TelegramRecord = {
  id: number;
  botKey: string;
  botTitle: string;
  botUsername: string | null;
  document: string | null;
  documentPrefix: string | null;
  name: string | null;
  incomeAmount: number | null;
  score: number | null;
  scoreLabel: string | null;
  power: string | null;
  amount: number | null;
  balanceAmount: number | null;
  flag: StatusFlag;
  savedAt: string | null;
};

export type TelegramRecordDetail = TelegramRecord & {
  emails: string[];
  phones: string[];
  addresses: string[];
  rawText: string | null;
  parsedJson: Record<string, unknown> | null;
  rawPayload: Record<string, unknown> | null;
  partnerPayloadFiltered: Record<string, unknown> | null;
  partnerPayloadRaw: Record<string, unknown> | null;
  partnerName: string | null;
};

export type BotSummary = {
  botKey: string;
  botTitle: string;
  botUsername: string | null;
  total: number;
  uniqueDocuments: number;
  live: number;
  die: number;
  sem: number;
  topIncome: number | null;
  topScore: number | null;
  lastSavedAt: string | null;
};

export type BotDetail = BotSummary & {
  topIncomeRecords: TelegramRecord[];
  topScoreRecords: TelegramRecord[];
  duplicates: { document: string; count: number }[];
  records: TelegramRecord[];
  totalPages: number;
};

export type SummaryStats = {
  messages: number;
  bots: number;
  documents: number;
  enriched: number;
  live: number;
  die: number;
  sem: number;
  duplicates: number;
  lastSavedAt: string | null;
};

export type SummaryResponse = {
  ok: boolean;
  stats: SummaryStats;
  extension: ExtensionStatus | null;
  topIncome: TelegramRecord[];
  topScore: TelegramRecord[];
};

export type RecordsResponse = {
  ok: boolean;
  items: TelegramRecord[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type ExtensionStatus = {
  version: string | null;
  expectedVersion: string | null;
  lastHeartbeat: string | null;
  lastSavedAt: string | null;
  isOnline: boolean;
  logs: ExtensionLog[];
};

export type ExtensionLog = {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
};

export type RecordsFilter = {
  q?: string;
  botKey?: string;
  documentPrefix?: string;
  status?: StatusFlag | "";
  incomeMin?: string;
  incomeMax?: string;
  scoreMin?: string;
  scoreMax?: string;
  from?: string;
  to?: string;
  sort?: "income_desc" | "score_desc" | "saved_desc" | "bot_asc";
  page?: number;
  perPage?: number;
};
