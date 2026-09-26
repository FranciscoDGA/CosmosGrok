"use client";

import type { AppSnapshot, Conversation, Progress, Settings } from "@/lib/types";

const PREFIX = "cosmosgrok:";
export const KEYS = {
  settings: `${PREFIX}settings`,
  profile: `${PREFIX}profile`,
  progress: `${PREFIX}progress`,
  conversations: `${PREFIX}conversations`,
  onboarded: `${PREFIX}onboarded`,
} as const;

export const defaultSettings: Settings = {
  theme: "dark",
  lang: "auto",
  depth: "medium",
};

export const defaultProgress: Progress = {
  explored: {},
  achievements: [],
  messagesSent: 0,
  reads: 0,
  deepUses: 0,
  lastActiveDay: "",
  streak: 0,
  lastAchievementAt: 0,
};

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...(JSON.parse(raw) as T) };
  } catch {
    return fallback;
  }
}

export function readList<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export function write(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota cheia ou modo privado: seguimos sem salvar */
  }
}

export function remove(...keys: string[]): void {
  if (typeof window === "undefined") return;
  for (const key of keys) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* noop */
    }
  }
}

export function loadSnapshot(): AppSnapshot {
  return {
    settings: readJSON<Settings>(KEYS.settings, defaultSettings),
    profile: readJSON<{ name: string }>(KEYS.profile, { name: "" }),
    progress: readJSON<Progress>(KEYS.progress, defaultProgress),
    conversations: readList<Conversation>(KEYS.conversations),
  };
}

export function saveConversations(list: Conversation[]): void {
  // Mantém apenas as 40 conversas mais recentes para não estourar a quota.
  write(KEYS.conversations, [...list].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 40));
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function dayIndex(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
}

export function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
