import React from "react";

export type Question = {
  questionText: {
    en: string;
    ar: string;
    ru: string;
    hi: string;
    ur: string;
  };
  description?: string;
  icon?: React.ReactNode;
  type: "bmi" | "yesno" | "gender" | "radio" | null;
  options: {
    label: { 
    en: string;
    ar: string;
    ru: string;
    hi: string;
    ur: string;
  };
    value: number;
    icon?: React.ReactNode;
  }[];
};

// ── Chat Types ──────────────────────────────────────────────────────
export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string; // ISO‑8601
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  lastMessagePreview: string;
}
