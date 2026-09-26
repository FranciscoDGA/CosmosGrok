import type { Lang, TKey } from "@/lib/i18n";

export type Depth = "short" | "medium" | "deep";
export type ThemeMode = "dark" | "light" | "system";
export type Category = "space" | "science" | "ai" | "philosophy" | "mind";
export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
  depth?: Depth;
  createdAt: number;
  /** Slug do artigo/tema que deu contexto à conversa, se houver. */
  contextSlug?: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
  contextSlug?: string;
}

export interface Settings {
  theme: ThemeMode;
  lang: Lang | "auto";
  depth: Depth;
}

export interface Profile {
  name: string;
}

export interface Progress {
  /** slug -> quantidade de interações */
  explored: Record<string, number>;
  achievements: string[];
  messagesSent: number;
  reads: number;
  deepUses: number;
  /** YYYY-MM-DD */
  lastActiveDay: string;
  streak: number;
  /** última data em que uma conquista foi anunciada (evitar spam) */
  lastAchievementAt: number;
}

export interface AppSnapshot {
  settings: Settings;
  profile: Profile;
  progress: Progress;
  conversations: Conversation[];
}

export interface Topic {
  slug: string;
  category: Category;
  minutes: number;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  body: Record<Lang, string[]>;
  related: string[];
  /** palavras-chave usadas pelo motor local de respostas */
  keywords: string[];
}

export interface FeedCard {
  id: string;
  category: Category;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  slug?: string;
  prompt?: string;
}

export interface AchievementDef {
  id: string;
  nameKey: TKey;
  descKey: TKey;
}
