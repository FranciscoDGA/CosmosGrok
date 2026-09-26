"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { dictionaries, translate, type Lang, type TKey } from "@/lib/i18n";
import type {
  Conversation,
  Depth,
  Message,
  Progress,
  Settings,
  ThemeMode,
} from "@/lib/types";
import {
  KEYS,
  defaultProgress,
  defaultSettings,
  readJSON,
  readList,
  saveConversations,
  uid,
  write,
} from "@/lib/storage";
import { registerTopic, syncAchievements, touchStreak } from "@/lib/gamification";
import { topicsBySlug } from "@/lib/data/topics";
import { detectTopic } from "@/lib/chat/engine";

interface AppContextValue {
  hydrated: boolean;
  lang: Lang;
  t: (key: TKey, params?: Record<string, string | number>) => string;
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
  profileName: string;
  setProfileName: (name: string) => void;
  progress: Progress;
  conversations: Conversation[];
  activeId: string | null;
  active: Conversation | null;
  pending: boolean;
  error: string | null;
  achievementToast: string | null;
  dismissAchievement: () => void;
  openConversation: (id: string | null) => void;
  send: (text: string, opts?: { depth?: Depth; contextSlug?: string }) => Promise<void>;
  deleteConversation: (id: string) => void;
  registerRead: (slug: string) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "pt";
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "pt";
}

function resolveTheme(mode: ThemeMode): "dark" | "light" {
  if (mode !== "system") return mode;
  if (typeof window === "undefined" || !window.matchMedia) return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [profileName, setProfileNameState] = useState("");
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [achievementToast, setAchievementToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------- hidratação (deferida para não brigar com a hidratação do React) ---------- */
  useEffect(() => {
    const id = window.setTimeout(() => {
      const snap = {
        settings: readJSON<Settings>(KEYS.settings, defaultSettings),
        profile: readJSON<{ name: string }>(KEYS.profile, { name: "" }),
        progress: readJSON<Progress>(KEYS.progress, defaultProgress),
        conversations: readList<Conversation>(KEYS.conversations),
      };
      setSettings(snap.settings);
      setProfileNameState(snap.profile.name);
      setProgress(touchStreak(snap.progress));
      setConversations(snap.conversations);
      setActiveId(snap.conversations[0]?.id ?? null);
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  /* ---------- idioma ---------- */
  const lang: Lang =
    settings.lang === "auto"
      ? hydrated
        ? detectLang()
        : "pt"
      : settings.lang;

  /* ---------- tema ---------- */
  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = resolveTheme(
        hydrated ? settings.theme : "dark",
      );
    };
    apply();
    if (!hydrated || settings.theme !== "system" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [settings.theme, hydrated]);

  /* ---------- persistência ---------- */
  useEffect(() => {
    if (hydrated) write(KEYS.settings, settings);
  }, [settings, hydrated]);

  useEffect(() => {
    if (hydrated) write(KEYS.profile, { name: profileName });
  }, [profileName, hydrated]);

  useEffect(() => {
    if (hydrated) write(KEYS.progress, progress);
  }, [progress, hydrated]);

  useEffect(() => {
    if (hydrated) saveConversations(conversations);
  }, [conversations, hydrated]);

  const t = useCallback(
    (key: TKey, params?: Record<string, string | number>) => translate(lang, key, params),
    [lang],
  );

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const setProfileName = useCallback((name: string) => setProfileNameState(name.slice(0, 32)), []);

  const openConversation = useCallback((id: string | null) => setActiveId(id), []);

  const announce = useCallback((ids: string[]) => {
    if (ids.length === 0) return;
    setAchievementToast(ids[0]);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setAchievementToast(null), 4200);
  }, []);

  const dismissAchievement = useCallback(() => setAchievementToast(null), []);

  const registerRead = useCallback(
    (slug: string) => {
      setProgress((prev) => {
        const touched = touchStreak(prev);
        const withTopic = registerTopic(touched, slug);
        const withRead = { ...withTopic, reads: withTopic.reads + 1 };
        const { progress: merged, unlocked } = syncAchievements(withRead, topicsBySlug);
        if (unlocked.length) announce(unlocked);
        return merged;
      });
    },
    [announce],
  );

  const send = useCallback<AppContextValue["send"]>(
    async (text, opts) => {
      const trimmed = text.trim();
      if (!trimmed || pending) return;

      setError(null);
      const depth = opts?.depth ?? settings.depth;
      const contextSlug = opts?.contextSlug;
      const now = Date.now();

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: trimmed,
        depth,
        createdAt: now,
        contextSlug,
      };

      let conversationId = activeId;
      const existing = conversations.find((c) => c.id === conversationId);

      if (!existing) {
        const convo: Conversation = {
          id: uid(),
          title: trimmed.length > 42 ? `${trimmed.slice(0, 42)}…` : trimmed,
          createdAt: now,
          updatedAt: now,
          messages: [userMsg],
          contextSlug,
        };
        conversationId = convo.id;
        setConversations((prev) => [convo, ...prev]);
        setActiveId(convo.id);
      } else {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === existing.id
              ? {
                  ...c,
                  updatedAt: now,
                  messages: [...c.messages, userMsg],
                  contextSlug: contextSlug ?? c.contextSlug,
                }
              : c,
          ),
        );
      }

      // progresso: mensagem enviada + tema detectado + profundidade usada
      setProgress((prev) => {
        let next = touchStreak({ ...prev, messagesSent: prev.messagesSent + 1 });
        if (depth === "deep") next = { ...next, deepUses: next.deepUses + 1 };
        const topic = detectTopic(trimmed);
        if (topic) next = registerTopic(next, topic.slug);
        if (contextSlug) next = registerTopic(next, contextSlug);
        const { progress: merged, unlocked } = syncAchievements(next, topicsBySlug);
        if (unlocked.length) announce(unlocked);
        return merged;
      });

      setPending(true);
      try {
        const history = (existing?.messages ?? []).slice(-8);
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, depth, lang, history, contextSlug }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { reply: string };

        const assistantMsg: Message = {
          id: uid(),
          role: "assistant",
          content: data.reply,
          depth,
          createdAt: Date.now(),
          contextSlug,
        };
        setConversations((prev) =>
          prev.map((c) =>
            c.id === conversationId ? { ...c, messages: [...c.messages, assistantMsg] } : c,
          ),
        );
      } catch {
        setError(t("chat.error"));
      } finally {
        setPending(false);
      }
    },
    [activeId, conversations, lang, pending, settings.depth, t, announce],
  );

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const resetAll = useCallback(() => {
    setConversations([]);
    setProgress(defaultProgress);
    setProfileNameState("");
    setActiveId(null);
    setAchievementToast(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(KEYS.conversations);
      window.localStorage.removeItem(KEYS.progress);
      window.localStorage.removeItem(KEYS.profile);
    }
  }, []);

  const active = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      hydrated,
      lang,
      t,
      settings,
      updateSettings,
      profileName,
      setProfileName,
      progress,
      conversations,
      activeId,
      active,
      pending,
      error,
      achievementToast,
      dismissAchievement,
      openConversation,
      send,
      deleteConversation,
      registerRead,
      resetAll,
    }),
    [
      hydrated,
      lang,
      t,
      settings,
      updateSettings,
      profileName,
      setProfileName,
      progress,
      conversations,
      activeId,
      active,
      pending,
      error,
      achievementToast,
      dismissAchievement,
      openConversation,
      send,
      deleteConversation,
      registerRead,
      resetAll,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp precisa estar dentro de <AppProvider>");
  return ctx;
}

export { dictionaries };
