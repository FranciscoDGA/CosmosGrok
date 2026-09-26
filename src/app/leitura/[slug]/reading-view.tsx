"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { useApp } from "@/components/providers";
import { CategoryChip, TopicCard } from "@/components/topic-card";
import { topicsBySlug } from "@/lib/data/topics";
import type { Topic } from "@/lib/types";

export function ReadingView({ topic }: { topic: Topic }) {
  const { t, lang, registerRead } = useApp();
  const [progress, setProgress] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    registerRead(topic.slug);
  }, [topic.slug, registerRead]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const paragraphs = topic.body[lang];
  const related = topic.related.map((slug) => topicsBySlug[slug]).filter(Boolean);
  const askPrompt =
    lang === "pt"
      ? `Com base no texto sobre "${topic.title.pt}", me explique mais profundamente`
      : `Based on the text about "${topic.title.en}", explain it to me in more depth`;

  return (
    <div className="relative">
      {/* barra de progresso de leitura */}
      <div className="fixed inset-x-0 top-0 z-30 h-0.5 bg-[var(--line)] md:left-64">
        <div
          className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article className="mx-auto max-w-3xl px-5 pb-32 pt-8 sm:px-8 sm:pt-14">
        <Link
          href="/explorar"
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] transition hover:text-[var(--fg)]"
        >
          <ArrowLeft size={15} />
          {t("read.back")}
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CategoryChip category={topic.category} />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] uppercase tracking-wider text-[var(--fg-faint)]">
            {t("read.focusMode")}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[var(--fg-faint)]">
            {t("common.minutes", { n: topic.minutes })}
          </span>
        </div>

        <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.12] sm:text-5xl">
          {topic.title[lang]}
        </h1>

        <p className="mt-5 border-l-2 border-[var(--accent)] pl-4 text-lg leading-relaxed text-[var(--fg-muted)]">
          {topic.excerpt[lang]}
        </p>

        <div className="mt-9 space-y-6 text-[17px] leading-[1.8] text-[var(--fg)] sm:text-[18px]">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-[color-mix(in_oklab,var(--accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--accent)_9%,transparent)] p-6">
          <p className="font-display text-lg font-semibold">{t("read.end.title")}</p>
          <p className="mt-1.5 text-sm text-[var(--fg-muted)]">{t("read.end.sub")}</p>
          <Link
            href={`/chat?q=${encodeURIComponent(askPrompt)}&context=${topic.slug}`}
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
          >
            <MessageCircle size={15} />
            {t("read.askAbout")}
          </Link>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold">
              <Sparkles size={17} className="text-[var(--accent)]" />
              {t("explore.related")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((rel, i) => (
                <TopicCard key={rel.slug} topic={rel} index={i} compact />
              ))}
            </div>
          </section>
        )}
      </article>

      {/* ação flutuante */}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-30 flex justify-center px-4 md:bottom-6 md:justify-end md:pr-8">
        <Link
          href={`/chat?q=${encodeURIComponent(askPrompt)}&context=${topic.slug}`}
          className="pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--accent)_50%,transparent)] bg-[var(--bg-elevated)] px-5 py-3 text-sm font-medium shadow-[var(--shadow)] transition hover:-translate-y-0.5"
        >
          <MessageCircle size={16} className="text-[var(--accent)]" />
          {t("read.askAbout")}
        </Link>
      </div>
    </div>
  );
}
