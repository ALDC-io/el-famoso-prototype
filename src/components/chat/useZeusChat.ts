"use client";

import { useState, useCallback, useRef } from "react";
import { matchResponse, fetchApiResponse } from "@/lib/zeus-responses";
import { config } from "@/config/prospect";

export interface ChatMessage {
  id: string;
  role: "user" | "zeus";
  text: string;
}

export function useZeusChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [processing, setProcessing] = useState(false);
  const lockedRef = useRef(false);

  const appendZeusMessage = useCallback((answer: string) => {
    const zeusMsg: ChatMessage = {
      id: `z-${Date.now()}`,
      role: "zeus",
      text: answer,
    };
    setMessages((prev) => [...prev, zeusMsg]);
    const maxTypewriterMs = answer.length * 25 + 2000;
    setTimeout(() => {
      if (lockedRef.current) {
        lockedRef.current = false;
        setProcessing(false);
      }
    }, maxTypewriterMs);
  }, []);

  const send = useCallback((text: string) => {
    if (lockedRef.current || !text.trim()) return;

    lockedRef.current = true;
    setProcessing(true);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);

    const localAnswer = matchResponse(text);
    const isLocalMatch = localAnswer !== config.zeus.fallbackMessage;
    const delay = 800 + Math.random() * 700;

    if (isLocalMatch || !config.zeus.apiUrl) {
      // Local match found or no API configured — use local answer
      setTimeout(() => appendZeusMessage(localAnswer), delay);
    } else {
      // No local match — try API fallback, then fall back to local fallback
      fetchApiResponse(text).then((apiAnswer) => {
        setTimeout(() => appendZeusMessage(apiAnswer || localAnswer), delay);
      });
    }
  }, [appendZeusMessage]);

  const unlock = useCallback(() => {
    lockedRef.current = false;
    setProcessing(false);
  }, []);

  const clear = useCallback(() => {
    setMessages([]);
    lockedRef.current = false;
    setProcessing(false);
  }, []);

  return { messages, processing, send, unlock, clear };
}
