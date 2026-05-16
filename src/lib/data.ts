/**
 * Server-side data access layer.
 * Pages call these functions directly — no HTTP self-call.
 * API routes proxy the same logic for client-side use.
 */
import { phpFetch } from "./api";
import {
  mockSummary,
  mockRecordsResponse,
  mockDetail,
  mockBots,
  mockBotDetail,
  mockExtension,
} from "./mock";
import type {
  SummaryResponse,
  RecordsResponse,
  TelegramRecordDetail,
  BotSummary,
  BotDetail,
  ExtensionStatus,
} from "@/types";

const MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export async function getSummary(): Promise<SummaryResponse> {
  if (MOCKS) return mockSummary;
  return phpFetch<SummaryResponse>("/summary");
}

export async function getRecords(
  params: Record<string, string>
): Promise<RecordsResponse> {
  if (MOCKS) return mockRecordsResponse;
  return phpFetch<RecordsResponse>("/records", params);
}

export async function getRecord(
  id: string
): Promise<{ ok: boolean; record: TelegramRecordDetail }> {
  if (MOCKS) return { ok: true, record: { ...mockDetail, id: Number(id) } };
  return phpFetch<{ ok: boolean; record: TelegramRecordDetail }>(
    `/records/${id}`
  );
}

export async function getBots(): Promise<{ ok: boolean; bots: BotSummary[] }> {
  if (MOCKS) return { ok: true, bots: mockBots };
  return phpFetch<{ ok: boolean; bots: BotSummary[] }>("/bots");
}

export async function getBotDetail(
  botKey: string
): Promise<{ ok: boolean; bot: BotDetail }> {
  if (MOCKS) return { ok: true, bot: { ...mockBotDetail, botKey } };
  return phpFetch<{ ok: boolean; bot: BotDetail }>(`/bots/${botKey}`);
}

export async function getExtensionStatus(): Promise<{
  ok: boolean;
  extension: ExtensionStatus;
}> {
  if (MOCKS) return { ok: true, extension: mockExtension };
  return phpFetch<{ ok: boolean; extension: ExtensionStatus }>(
    "/extension-status"
  );
}
