"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  History,
  Loader2,
  Plus,
  Send,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useApp } from "@/components/providers";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { Depth } from "@/lib/types";
import { topicsBySlug } from "@/lib/data/topics";

const depthOrder: Depth[] = ["short", "medium", "deep"];
const depthLabel: Record<Depth, "chat.depth.short" | "chat.depth.medium" | "chat.depth.deep"> = {
  short: "chat.depth.short",
  medium: "chat.depth.medium",
  deep: "chat.depth.deep",
};
const depthHint: Record<
  Depth,
  "chat.depth.short.hint" | "chat.depth.medium.hint" | "chat.depth.deep.hint"
> = {
  short: "chat.depth.short.hint",
  medium: "chat.depth.medium.hint",
  deep: "chat.depth.deep.hint",
};

export function ChatPanel({
  contextSlug,
  onClearContext,
  className = "",
}: {
  contextSlug?: string;
  onClearContext?: () => void;
  className?: string;
}) {
  const {
    t,
    active,
    conversations,
    pending,
    error,
    settings,
    updateSettings,
    send,
    openConversation,
    deleteConversation,
    lang,
  } = useApp();

  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const seeded = useRef(false);

  const messages = active?.messages ?? [];
  const effectiveContext = contextSlug ?? active?.contextSlug;
  const contextTopic = effectiveContext ? topicsBySlug[effectiveContext] : undefined;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, pending, error]);

  const submit = async () => {
    const text = input.trim();
    if (!text || pending) return;
    setInput("");
    if (taRef.current) taRef.current.style.height = "auto";
    await send(text, { contextSlug: effectiveContext });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submit();
    }
  };

  /* envio automático vindo da home: /chat?q=... */
  useEffect(() => {
    if (seeded.current) return;
    const search = new URLSearchParams(window.location.search);
    const preset = search.get("q");
    if (!preset) {
      seeded.current = true;
      return;
    }
    seeded.current = true;
    const ctx = search.get("context") ?? undefined;
    void send(preset, { contextSlug: ctx });
    window.history.replaceState(null, "", "/chat");
  }, [send]);

  const suggestions = [1, 2, 3, 4].map((n) =>
    t(`chat.suggestions.${n}` as "chat.suggestions.1"),
  );

  return (
    <div className={cn("flex min-h-0 flex-1 gap-0", className)}>
      {/* Histórico */}
      <div
        className={cn(
          "hidden w-60 shrink-0 flex-col border-r border-[var(--line)] lg:flex",
          showHistory && "flex",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--fg-faint)]">
            {t("chat.history")}
          </span>
          <button
            onClick={() => {
              openConversation(null);
            }}
            className="cursor-pointer rounded-lg p-1.5 text-[var(--fg-faint)] transition hover:bg-[color-mix(in_oklab,var(--fg)_8%,transparent)] hover:text-[var(--fg)]"
            title={t("chat.new")}
            aria-label={t("chat.new")}
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
          {conversations.length === 0 && (
            <p className="px-2 py-6 text-xs leading-relaxed text-[var(--fg-faint)]">
              {t("chat.empty.title")}
            </p>
          )}
          {conversations.map((c) => (
            <div key={c.id} className="group relative">
              <button
                onClick={() => openConversation(c.id)}
                className={cn(
                  "w-full cursor-pointer truncate rounded-lg px-3 py-2.5 pr-8 text-left text-xs transition",
                  c.id === active?.id
                    ? "bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] text-[var(--fg)]"
                    : "text-[var(--fg-muted)] hover:bg-[color-mix(in_oklab,var(--fg)_7%,transparent)]",
                )}
              >
                {c.title}
              </button>
              <button
                onClick={() => deleteConversation(c.id)}
                className="absolute right-1.5 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-md p-1.5 text-[var(--fg-faint)] hover:text-[var(--danger)] group-hover:block"
                aria-label={t("common.delete")}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Conversa */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[var(--line)] px-4 py-3 sm:px-6">
          <button
            onClick={() => setShowHistory((v) => !v)}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-[var(--line)] text-[var(--fg-muted)] transition hover:text-[var(--fg)] lg:hidden"
            aria-label={t("chat.history")}
          >
            <History size={16} />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-base font-semibold">
              {active?.title ?? t("chat.title")}
            </h1>
            <p className="hidden truncate text-xs text-[var(--fg-faint)] sm:block">
              {t("chat.subtitle")}
            </p>
          </div>

          {/* Profundidade */}
          <div
            className="flex items-center rounded-xl border border-[var(--line)] p-1"
            role="group"
            aria-label={t("chat.depth.label")}
          >
            {depthOrder.map((d) => (
              <button
                key={d}
                onClick={() => updateSettings({ depth: d })}
                title={t(depthHint[d])}
                aria-pressed={settings.depth === d}
                className={cn(
                  "cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-medium transition sm:px-3",
                  settings.depth === d
                    ? "bg-[color-mix(in_oklab,var(--accent)_20%,transparent)] text-[var(--fg)]"
                    : "text-[var(--fg-faint)] hover:text-[var(--fg)]",
                )}
              >
                {t(depthLabel[d])}
              </button>
            ))}
          </div>
        </div>

        {/* Mensagens */}
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {contextTopic && (
            <div className="mx-auto mb-5 flex max-w-3xl items-center gap-3 rounded-xl border border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)] px-4 py-2.5 text-xs">
              <BookOpen size={15} className="shrink-0 text-[var(--accent-2)]" />
              <span className="truncate">{t("chat.context", { title: contextTopic.title[lang] })}</span>
              {onClearContext && (
                <button
                  onClick={onClearContext}
                  className="ml-auto cursor-pointer text-[var(--fg-faint)] hover:text-[var(--fg)]"
                  aria-label={t("chat.clearContext")}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {messages.length === 0 && !pending ? (
            <div className="mx-auto flex max-w-2xl flex-col items-center py-10 text-center">
              <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] text-[var(--accent)] animate-float">
                <Sparkles size={26} strokeWidth={1.6} />
              </span>
              <h2 className="font-display text-2xl font-semibold">{t("chat.empty.title")}</h2>
              <p className="mt-2 max-w-md text-sm text-[var(--fg-muted)]">{t("chat.empty.sub")}</p>

              <div className="mt-7 w-full text-left">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--fg-faint)]">
                  {t("chat.suggestions.t")}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => void send(s, { contextSlug: effectiveContext })}
                      className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-elevated)_70%,transparent)] px-4 py-3 text-left text-sm text-[var(--fg-muted)] transition hover:border-[color-mix(in_oklab,var(--accent)_45%,transparent)] hover:text-[var(--fg)]"
                    >
                      <span>{s}</span>
                      <ChevronRight
                        size={15}
                        className="shrink-0 opacity-0 transition group-hover:opacity-100"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-5">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  {m.role === "assistant" && (
                    <span className="mr-3 mt-1 hidden h-8 w-8 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] text-xs font-semibold text-[var(--accent)] sm:grid">
                      C
                    </span>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[78%]",
                      m.role === "user"
                        ? "bg-[var(--accent)] text-white rounded-br-md"
                        : "border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-elevated)_85%,transparent)] rounded-bl-md text-[var(--fg)]",
                    )}
                  >
                    {m.role === "assistant" ? (
                      <Markdown text={m.content} />
                    ) : (
                      <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{m.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {pending && (
                <div className="flex items-center gap-3 text-sm text-[var(--fg-faint)]">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] text-xs font-semibold text-[var(--accent)]">
                    C
                  </span>
                  <span className="flex items-center gap-2">
                    <Loader2 size={15} className="animate-spin" />
                    {t("chat.assistant.name")} · {t("chat.assistant.typing")}
                  </span>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-[color-mix(in_oklab,var(--danger)_40%,transparent)] bg-[color-mix(in_oklab,var(--danger)_12%,transparent)] px-4 py-3 text-sm text-[var(--danger)]">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-[var(--line)] px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-[var(--line-strong)] bg-[color-mix(in_oklab,var(--bg-elevated)_90%,transparent)] p-2 focus-within:border-[color-mix(in_oklab,var(--accent)_60%,transparent)]">
            <textarea
              ref={taRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${Math.min(e.currentTarget.scrollHeight, 160)}px`;
              }}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder={t("chat.placeholder")}
              aria-label={t("chat.placeholder")}
              className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-2.5 py-2.5 text-[15px] leading-6 text-[var(--fg)] outline-none placeholder:text-[var(--fg-faint)]"
            />
            <Button
              onClick={() => void submit()}
              disabled={pending || !input.trim()}
              size="md"
              aria-label={t("chat.send")}
              className="h-11 w-11 shrink-0 !px-0"
            >
              <Send size={17} />
            </Button>
          </div>
          <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-[var(--fg-faint)]">
            {t(depthHint[settings.depth])} ·{" "}
            <Link href="/config" className="underline decoration-dotted hover:text-[var(--fg)]">
              {t("settings.title")}
            </Link>
          </p>
        </div>
      </div>

      {/* Histórico em folha (mobile / toggle) */}
      {showHistory && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            className="absolute inset-0 bg-black/55"
            onClick={() => setShowHistory(false)}
            aria-label={t("common.close")}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col border-r border-[var(--line)] bg-[var(--bg)]">
            <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3.5">
              <span className="text-sm font-semibold">{t("chat.history")}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    openConversation(null);
                    setShowHistory(false);
                  }}
                  className="cursor-pointer rounded-lg p-2 text-[var(--fg-faint)] hover:text-[var(--fg)]"
                  aria-label={t("chat.new")}
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => setShowHistory(false)}
                  className="cursor-pointer rounded-lg p-2 text-[var(--fg-faint)] hover:text-[var(--fg)]"
                  aria-label={t("common.close")}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto p-2">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    openConversation(c.id);
                    setShowHistory(false);
                  }}
                  className={cn(
                    "w-full cursor-pointer truncate rounded-lg px-3 py-2.5 text-left text-sm",
                    c.id === active?.id
                      ? "bg-[color-mix(in_oklab,var(--accent)_16%,transparent)]"
                      : "text-[var(--fg-muted)] hover:bg-[color-mix(in_oklab,var(--fg)_7%,transparent)]",
                  )}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
