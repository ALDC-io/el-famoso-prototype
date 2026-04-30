"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SUGGESTED_QUESTIONS } from "@/lib/chat/suggested-questions";

// ── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// ── PDF report generator ────────────────────────────────────────────────────

function formatForPrint(text: string): string {
  // Extract and preserve SVGs
  const svgBlocks: string[] = [];
  let processed = text.replace(/<svg[\s\S]*?<\/svg>/gi, (match) => {
    svgBlocks.push(match);
    return `%%SVG_${svgBlocks.length - 1}%%`;
  });

  // Markdown tables → HTML tables
  processed = processed.replace(
    /(?:^|\n)((?:\|.+\|\s*\n){2,})/g,
    (_match, tableBlock: string) => {
      const rows = tableBlock.trim().split("\n").filter((r: string) => r.trim());
      if (rows.length < 2) return tableBlock;
      const isSep = /^\|[\s\-:|]+\|$/.test(rows[1].trim());
      const dataRows = isSep ? [rows[0], ...rows.slice(2)] : rows;
      const hasHeader = isSep;
      const parseRow = (row: string) => row.split("|").slice(1, -1).map((c: string) => c.trim());
      let html = '<table>';
      dataRows.forEach((row: string, i: number) => {
        const cells = parseRow(row);
        const tag = hasHeader && i === 0 ? "th" : "td";
        html += "<tr>" + cells.map((c: string) => `<${tag}>${c}</${tag}>`).join("") + "</tr>";
      });
      return html + "</table>";
    },
  );

  // Standard markdown
  processed = processed
    .replace(/```[\s\S]*?```/g, (m) => `<pre><code>${m.replace(/```\w*\n?/, "").replace(/```$/, "")}</code></pre>`)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li class="numbered">$1</li>')
    .replace(/^---$/gm, '<hr/>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");

  // Restore SVGs — convert dark-mode SVGs to light. Skip if already light.
  const DARK_BG_RE = /fill="#(111827|0a0a1a|1a1a2e|0f172a|1e1e2e|0d1117|18181b|1f2937|374151)"/i;
  svgBlocks.forEach((svg, i) => {
    const isDarkSource = DARK_BG_RE.test(svg);
    let lightSvg = svg;
    if (isDarkSource) {
      lightSvg = svg
        // Dark backgrounds → white
        .replace(/fill="#111827"/gi, 'fill="#ffffff"')
        .replace(/fill="#0a0a1a"/gi, 'fill="#ffffff"')
        .replace(/fill="#1a1a2e"/gi, 'fill="#ffffff"')
        .replace(/fill="#0f172a"/gi, 'fill="#ffffff"')
        .replace(/fill="#1e1e2e"/gi, 'fill="#ffffff"')
        .replace(/fill="#0d1117"/gi, 'fill="#ffffff"')
        .replace(/fill="#18181b"/gi, 'fill="#ffffff"')
        .replace(/fill="#1f2937"/gi, 'fill="#f8fafc"')
        .replace(/fill="#374151"/gi, 'fill="#f1f5f9"')
        // Protect the background rect BEFORE the white-text→dark-text rule
        // so the bg stays light instead of getting flipped to dark slate.
        // Match on width="780" — the prompt enforces this constant for the
        // bg rect specifically, so it's a more reliable selector than rx="N".
        .replace(/<rect(\s+width="780"[^>]*?)fill="#ffffff"([^>]*?)>/, '<rect$1fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"$2>')
        // Light/white text → dark (now safe — bg rect already protected)
        .replace(/fill="#e2e8f0"/gi, 'fill="#1e293b"')
        .replace(/fill="#f1f5f9"/gi, 'fill="#334155"')
        .replace(/fill="#cbd5e1"/gi, 'fill="#475569"')
        .replace(/fill="#ffffff"/gi, 'fill="#1e293b"')
        // Muted text stays readable
        .replace(/fill="#94a3b8"/gi, 'fill="#64748b"')
        .replace(/fill="#64748b"/gi, 'fill="#475569"')
        .replace(/fill="#9ca3af"/gi, 'fill="#6b7280"')
        .replace(/fill="#6b7280"/gi, 'fill="#4b5563"')
        // Strokes
        .replace(/stroke="#e2e8f0"/gi, 'stroke="#334155"')
        .replace(/stroke="#94a3b8"/gi, 'stroke="#64748b"')
        .replace(/stroke="#ffffff"/gi, 'stroke="#1e293b"')
        .replace(/stroke="#374151"/gi, 'stroke="#cbd5e1"')
        // Semi-transparent fills on dark → bump for white bg
        .replace(/opacity="0\.08"/g, 'opacity="0.12"')
        .replace(/opacity="0\.05"/g, 'opacity="0.08"');
    }
    processed = processed.replace(`%%SVG_${i}%%`, `<div class="chart">${lightSvg}</div>`);
  });

  return `<p>${processed}</p>`;
}

function generateReport(_query: string, response: string) {
  const now = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>El Famoso Commerce Intelligence Report</title>
<style>
  @page { margin: 0.75in; size: letter; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none; }
  }
  * { box-sizing: border-box; }
  body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; max-width: 960px; margin: 0 auto; padding: 48px 40px; color: #1e293b; line-height: 1.7; font-size: 13.5px; }

  /* Header */
  .header { display: flex; align-items: center; gap: 16px; border-bottom: 3px solid #C25800; padding-bottom: 20px; margin-bottom: 32px; }
  .header-logo { width: 36px; height: 36px; background: #C25800; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .header-logo svg { width: 20px; height: 20px; }
  .header-text h1 { font-size: 20px; color: #C25800; margin: 0; letter-spacing: -0.3px; }
  .header-text p { font-size: 11px; color: #94a3b8; margin: 4px 0 0; }

  /* Typography */
  h2 { font-size: 17px; color: #C25800; margin: 28px 0 12px; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0; }
  h3 { font-size: 14.5px; color: #9A4700; margin: 22px 0 8px; }
  h4 { font-size: 13.5px; color: #1e293b; margin: 18px 0 6px; font-weight: 600; }
  p { margin: 8px 0; }
  strong { color: #0f172a; }
  em { color: #475569; }
  code { background: #f1f5f9; padding: 1px 5px; border-radius: 3px; font-size: 12px; color: #C25800; }
  pre { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; overflow-x: auto; font-size: 12px; margin: 16px 0; }
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 24px 0; }

  /* Lists */
  li { margin: 4px 0 4px 20px; list-style: disc; }
  li.numbered { list-style: decimal; }

  /* Tables */
  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12.5px; }
  th { text-align: left; padding: 10px 12px; background: #FFF4E6; color: #C25800; font-weight: 600; border-bottom: 2px solid #C25800; }
  td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
  tr:nth-child(even) td { background: #f8fafc; }

  /* Charts */
  .chart { margin: 24px 0; padding: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; page-break-inside: avoid; }
  .chart svg { width: 100%; height: auto; }

  /* Footer */
  .footer { margin-top: 48px; padding-top: 16px; border-top: 2px solid #C25800; display: flex; justify-content: space-between; align-items: center; }
  .footer-left { font-size: 10px; color: #94a3b8; }
  .footer-right { font-size: 10px; color: #94a3b8; text-align: right; }
  .footer-brand { font-weight: 600; color: #C25800; }

  /* Print button */
  .print-bar { position: fixed; top: 0; left: 0; right: 0; background: #C25800; padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; z-index: 100; }
  .print-bar span { color: white; font-size: 13px; font-weight: 500; }
  .print-bar button { background: white; color: #C25800; border: none; padding: 6px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; }
  .print-bar button:hover { opacity: 0.9; }
</style></head><body>

<div class="print-bar no-print">
  <span>El Famoso Commerce Intelligence Report</span>
  <button onclick="window.print()">Save as PDF</button>
</div>

<div class="header">
  <div class="header-logo">
    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  </div>
  <div class="header-text">
    <h1>El Famoso Commerce Intelligence Report</h1>
    <p>${now} &nbsp;|&nbsp; Powered by Zeus Chat</p>
  </div>
</div>

${formatForPrint(response)}

<div class="footer">
  <div class="footer-left">
    <span class="footer-brand">El Famoso</span> &nbsp; Commerce Intelligence System<br/>
    Answers grounded in El Famoso’s operational baseline. Verify against source systems for board-ready decisions.
  </div>
  <div class="footer-right">
    &copy; ${new Date().getFullYear()} Analytic Labs Data Corporation<br/>
    el-famoso.analyticlabs.io
  </div>
</div>

</body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}

// ── Rich content renderer (markdown + SVG + tables) ─────────────────────────

/**
 * Split content into text before any incomplete SVG, completed SVGs, and
 * trailing text after SVGs. During streaming, an incomplete <svg> block
 * is buffered and shown as a placeholder instead of being injected as
 * broken HTML (which the browser would destroy).
 */
function splitSvgContent(text: string): {
  before: string;
  svgBlocks: string[];
  pendingSvg: boolean;
  after: string;
} {
  const svgBlocks: string[] = [];
  let remaining = text;
  let before = "";
  let after = "";

  // Extract all complete <svg>...</svg> blocks
  const completeSvgRe = /<svg[\s\S]*?<\/svg>/gi;
  let lastEnd = 0;
  let match;
  const parts: string[] = [];

  while ((match = completeSvgRe.exec(remaining)) !== null) {
    parts.push(remaining.slice(lastEnd, match.index));
    svgBlocks.push(match[0]);
    parts.push(`%%SVG_BLOCK_${svgBlocks.length - 1}%%`);
    lastEnd = match.index + match[0].length;
  }

  const tail = remaining.slice(lastEnd);
  parts.push(tail);
  remaining = parts.join("");

  // Check for an incomplete <svg that hasn't closed yet
  const pendingIdx = remaining.indexOf("<svg");
  if (pendingIdx !== -1) {
    before = remaining.slice(0, pendingIdx);
    after = "";
    return { before, svgBlocks, pendingSvg: true, after };
  }

  return { before: remaining, svgBlocks, pendingSvg: false, after };
}

function renderMarkdownOnly(text: string): string {
  // 1. Render markdown tables
  let processed = text.replace(
    /(?:^|\n)((?:\|.+\|\s*\n){2,})/g,
    (_match, tableBlock: string) => {
      const rows = tableBlock.trim().split("\n").filter((r: string) => r.trim());
      if (rows.length < 2) return tableBlock;

      const isSep = /^\|[\s\-:|]+\|$/.test(rows[1].trim());
      const dataRows = isSep ? [rows[0], ...rows.slice(2)] : rows;
      const hasHeader = isSep;

      const parseRow = (row: string) =>
        row.split("|").slice(1, -1).map((c: string) => c.trim());

      let html = '<table class="w-full my-3 text-xs border-collapse">';
      dataRows.forEach((row: string, i: number) => {
        const cells = parseRow(row);
        const isHead = hasHeader && i === 0;
        const tag = isHead ? "th" : "td";
        const cellClass = isHead
          ? "px-2 py-1.5 text-left font-semibold text-primary border-b border-slate-300 bg-slate-50"
          : "px-2 py-1.5 text-left text-foreground/70 border-b border-slate-200/70";
        html += "<tr>";
        cells.forEach((c: string) => {
          html += `<${tag} class="${cellClass}">${c}</${tag}>`;
        });
        html += "</tr>";
      });
      html += "</table>";
      return html;
    },
  );

  // 2. Standard markdown
  processed = processed
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```\w*\n?/, "").replace(/```$/, "");
      return `<pre class="my-2 rounded-lg bg-slate-50 p-3 text-xs overflow-x-auto"><code>${code}</code></pre>`;
    })
    .replace(/`([^`]+)`/g, '<code class="rounded bg-slate-100 px-1 py-0.5 text-xs text-primary">$1</code>')
    .replace(/^#### (.+)$/gm, '<h4 class="text-sm font-semibold text-foreground/90 mt-3 mb-1">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold text-primary mt-3 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-semibold text-primary mt-4 mb-1">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-foreground/80">$1</li>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-4 list-decimal text-foreground/80">$1</li>')
    .replace(/^---$/gm, '<hr class="my-3 border-slate-200" />')
    // Confidence badge — render inline **Confidence: High (94%)** as styled badge
    .replace(
      /\*\*Confidence:\s*(High|Moderate|Low)\s*\((\d+)%\)\*\*/g,
      (_m: string, level: string, pct: string) => {
        const color = level === "High" ? "#10b981" : level === "Moderate" ? "#f59e0b" : "#ef4444";
        return `<span style="display:inline-flex;align-items:center;gap:6px;background:${color}15;color:${color};border-radius:9999px;padding:2px 10px;font-size:11px;font-weight:700;margin:4px 0"><span style="width:6px;height:6px;border-radius:50%;background:${color};display:inline-block"></span>${level} confidence — ${pct}%</span>`;
      },
    )
    // Sources block — style the **Sources:** section
    .replace(
      /\*\*Sources:\*\*/g,
      '<div style="margin-top:12px;padding:10px 14px;border:1px solid #E2E8F0;border-radius:10px;background:#F8FAFC"><p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#C25800;margin-bottom:6px">Sources</p>',
    )
    .replace(/\n\n/g, '<div class="mt-2"></div>')
    .replace(/\n/g, "<br />");

  return processed;
}

function renderMarkdown(text: string, streaming: boolean = true): string {
  const { before, svgBlocks, pendingSvg } = splitSvgContent(text);

  // Render the markdown portion (everything outside SVG)
  let html = renderMarkdownOnly(before);

  // Restore completed SVG blocks
  svgBlocks.forEach((svg, i) => {
    const wrapped = `<div class="my-4 w-full overflow-x-auto rounded-lg border border-slate-200 bg-white p-4 shadow-sm" style="min-height:400px">${svg.replace(/<svg/, '<svg style="width:100%;height:auto;min-height:380px"')}</div>`;
    html = html.replace(`%%SVG_BLOCK_${i}%%`, wrapped);
  });

  if (pendingSvg) {
    if (streaming) {
      // Still streaming — show animated placeholder
      html += `<div class="my-4 flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div class="flex gap-1">
          <span class="h-2 w-2 rounded-full bg-primary/60 animate-typing-cursor" style="animation-delay:0s"></span>
          <span class="h-2 w-2 rounded-full bg-primary/60 animate-typing-cursor" style="animation-delay:0.2s"></span>
          <span class="h-2 w-2 rounded-full bg-primary/60 animate-typing-cursor" style="animation-delay:0.4s"></span>
        </div>
        <span class="text-xs text-primary/70">Generating visualization...</span>
      </div>`;
    } else {
      // Streaming ended — force-render the incomplete SVG with a closing tag
      const svgStart = text.lastIndexOf("<svg");
      if (svgStart !== -1) {
        let rawSvg = text.slice(svgStart);
        // Auto-close if truncated
        if (!rawSvg.includes("</svg>")) {
          rawSvg += "</svg>";
        }
        html += `<div class="my-4 w-full overflow-x-auto rounded-lg border border-slate-200 bg-white p-4 shadow-sm" style="min-height:400px">${rawSvg.replace(/<svg/, '<svg style="width:100%;height:auto;min-height:380px"')}</div>`;
      }
    }
  }

  return html;
}

// ── Component ───────────────────────────────────────────────────────────────

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [sessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [input]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      setShowSuggestions(false);

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: text.trim(),
      };
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setIsStreaming(true);

      try {
        const history = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text.trim(),
            history,
            sessionId,
          }),
        });

        if (!res.ok) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id
                ? {
                    ...m,
                    content:
                      "I apologize, but I encountered an error processing your request. Please try again.",
                  }
                : m,
            ),
          );
          setIsStreaming(false);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) return;

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.type === "token") {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsg.id
                        ? { ...m, content: m.content + data.text }
                        : m,
                    ),
                  );
                }
              } catch {
                // skip
              }
            }
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? {
                  ...m,
                  content:
                    "Connection lost. Please check your network and try again.",
                }
              : m,
          ),
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, messages, sessionId],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">
              Zeus Chat <span className="font-normal text-foreground/65">|</span> <span className="font-normal text-primary">El Famoso</span>
            </h1>
            <p className="text-xs text-foreground/65">
              Commerce intelligence across every channel and catalog
            </p>
          </div>
          <div className="ml-auto flex gap-2">
          </div>
        </div>
      </div>

      {/* ── Messages ───────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-5xl space-y-4">
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="space-y-6">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h2 className="mb-2 text-base font-semibold text-primary">
                  Zeus Chat — Music Merch Operations Intelligence
                </h2>
                <p className="text-sm leading-relaxed text-foreground/70">
                  This system provides evidence-based answers about El Famoso&apos;s
                  music-merchandise e-commerce operations — channel performance,
                  fulfillment metrics, catalog sell-through, demand spikes, and
                  cross-channel margin analysis. Every answer cites its source
                  system and confidence rating.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  Ask about specific channels (Shopify, Amazon, eBay, Faire),
                  fulfillment SLAs, tour-driven demand, or build a board-ready
                  drop playbook.
                </p>
              </div>

              {/* Suggested questions */}
              {showSuggestions && (
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                    Suggested questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(q.text)}
                        className="group rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-foreground/70 transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-foreground/90"
                      >
                        <span>{q.text}</span>
                        <span className="ml-2 text-xs text-foreground/70 group-hover:text-primary/50">
                          {q.tags.join(", ")}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Message list */}
          {messages.map((msg) => {
            const hasSvg = msg.role === "assistant" && /<svg/i.test(msg.content);
            return (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  hasSvg ? "w-full" : "max-w-[85%]"
                } ${
                  msg.role === "user"
                    ? "bg-primary/15 text-foreground"
                    : "border-l-2 border-primary/40 bg-white text-foreground shadow-sm"
                }`}
              >
                {msg.role === "assistant" ? (
                  msg.content ? (
                    <>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdown(
                            msg.content,
                            isStreaming && msg.id === messages[messages.length - 1]?.id,
                          ),
                        }}
                      />
                      {/* Per-response action buttons */}
                      {!(isStreaming && msg.id === messages[messages.length - 1]?.id) && (
                        <div className="mt-3 flex gap-2 border-t border-slate-200/70 pt-2">
                          <button
                            onClick={() => navigator.clipboard.writeText(msg.content)}
                            className="flex items-center gap-1 rounded px-2 py-1 text-[11px] text-foreground/60 transition-colors hover:bg-slate-50 hover:text-foreground/60"
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                            Copy
                          </button>
                          <button
                            onClick={() => {
                              const idx = messages.indexOf(msg);
                              const query = idx > 0 ? messages[idx - 1]?.content || "" : "";
                              generateReport(query, msg.content);
                            }}
                            className="flex items-center gap-1 rounded px-2 py-1 text-[11px] text-foreground/60 transition-colors hover:bg-slate-50 hover:text-foreground/60"
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Export PDF
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="animate-typing-cursor inline-block h-4 w-0.5 bg-primary/60" />
                  )
                ) : (
                  msg.content
                )}
              </div>
            </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Input ──────────────────────────────────────────────────────── */}
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about merch revenue, fulfillment, channel mix, tour spikes..."
            rows={1}
            className="flex-1 resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/55 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isStreaming}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-opacity hover:opacity-90 disabled:opacity-30"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className="mx-auto mt-2 max-w-5xl text-center text-[10px] text-foreground/70">
          Answers grounded in El Famoso’s operational baseline. Verify against
          authoritative sources before policy decisions.
        </p>
      </div>
    </div>
  );
}
