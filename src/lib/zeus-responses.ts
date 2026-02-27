import { config } from "@/config/prospect";
import type { ZeusQA } from "@/types/prospect";

export const STARTER_CHIPS = config.zeus.starterChips;

export function matchResponse(input: string): string {
  const lower = input.toLowerCase();
  const responses: ZeusQA[] = config.zeus.responses;

  let bestMatch: ZeusQA | null = null;
  let bestScore = 0;

  for (const qa of responses) {
    let score = 0;
    for (const kw of qa.keywords) {
      if (lower.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }

  return bestMatch && bestScore > 0 ? bestMatch.answer : config.zeus.fallbackMessage;
}

/**
 * Try to fetch an answer from the Zeus API.
 * Returns the answer string or null if unavailable / timed out.
 * Only called when local keyword match score is 0 and apiUrl is configured.
 */
export async function fetchApiResponse(query: string): Promise<string | null> {
  const apiUrl = config.zeus.apiUrl;
  if (!apiUrl) return null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(
      `${apiUrl}/api/v1/qbo/chat?query=${encodeURIComponent(query)}`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();
    if (data.status === "ok" && data.answer) {
      return data.answer;
    }
    return null;
  } catch {
    return null;
  }
}
