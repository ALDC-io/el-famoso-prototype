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
