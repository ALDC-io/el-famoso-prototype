import { NextResponse } from "next/server";
import {
  buildElFamosoSystemPrompt,
  extractCommerceTerms,
  formatRAGResults,
} from "@/lib/chat/el-famoso-prompt";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 16000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ── POST handler ────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Chat service not configured" },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const {
      message,
      history = [],
      images,
      sessionId,
    }: {
      message: string;
      history: ChatMessage[];
      images?: { type: string; data: string }[];
      sessionId: string;
    } = body;

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // ── Conversation cap ──────────────────────────────────────────────────
    const MAX_EXCHANGES = 30;
    if (history.length >= MAX_EXCHANGES * 2) {
      const encoder = new TextEncoder();
      const limitStream = new ReadableStream({
        start(controller) {
          const msg =
            "Thanks for exploring Zeus Chat for El Famoso. " +
            "You’ve had a great session — to start a fresh conversation, " +
            "simply refresh the page.";
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "token", text: msg })}\n\n`,
            ),
          );
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "done" })}\n\n`,
            ),
          );
          controller.close();
        },
      });
      return new Response(limitStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // ── No external RAG — El Famoso doesn't have an ingested Zeus tenant.
    //    Term extraction kept for future hookup; passed empty results today.
    extractCommerceTerms(message);
    const ragText = formatRAGResults([]);
    const systemPrompt = buildElFamosoSystemPrompt(ragText);

    // ── Build messages (multimodal if images attached) ──────────────────
    const userContent =
      images && images.length > 0
        ? [
            ...images.map((img) => ({
              type: "image" as const,
              source: {
                type: "base64" as const,
                media_type: img.type,
                data: img.data,
              },
            })),
            { type: "text" as const, text: message },
          ]
        : message;

    const messages = [
      ...history.slice(-20),
      { role: "user" as const, content: userContent },
    ];

    // ── Stream from Anthropic API ─────────────────────────────────────────
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", response.status, errorText);
      return NextResponse.json(
        { error: "AI service error" },
        { status: 502 },
      );
    }

    // ── SSE stream ────────────────────────────────────────────────────────
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") continue;

                try {
                  const parsed = JSON.parse(data);

                  if (
                    parsed.type === "content_block_delta" &&
                    parsed.delta?.type === "text_delta"
                  ) {
                    controller.enqueue(
                      encoder.encode(
                        `data: ${JSON.stringify({ type: "token", text: parsed.delta.text })}\n\n`,
                      ),
                    );
                  }

                  if (parsed.type === "message_stop") {
                    controller.enqueue(
                      encoder.encode(
                        `data: ${JSON.stringify({ type: "done" })}\n\n`,
                      ),
                    );
                  }
                } catch {
                  // Skip unparseable lines
                }
              }
            }
          }
        } catch {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", message: "Stream interrupted" })}\n\n`,
            ),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
