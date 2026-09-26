"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock, MessageCircle, Orbit, Atom, Cpu, Lightbulb, Brain } from "lucide-react";
import { useApp } from "@/components/providers";
import { categoryLabel } from "@/lib/data/topics";
import type { Category, Topic } from "@/lib/types";
import { cn } from "@/lib/cn";

const categoryIcon: Record<Category, typeof Orbit> = {
  space: Orbit,
  science: Atom,
  ai: Cpu,
  philosophy: Lightbulb,
  mind: Brain,
};

export function CategoryIcon({ category, size = 15 }: { category: Category; size?: number }) {
  const Icon = categoryIcon[category];
  return <Icon size={size} strokeWidth={1.8} />;
}

export function CategoryChip({ category }: { category: Category }) {
  const { t } = useApp();
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_60%,transparent)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-[var(--fg-muted)]">
      <CategoryIcon category={category} size={12} />
      {t(categoryLabel[category])}
    </span>
  );
}

export function TopicCard({
  topic,
  index = 0,
  compact = false,
}: {
  topic: Topic;
  index?: number;
  compact?: boolean;
}) {
  const { t, lang } = useApp();
  const askPrompt =
    lang === "pt"
      ? `Me explique sobre ${topic.title.pt}`
      : `Explain ${topic.title.en} to me`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-elevated)_86%,transparent)] p-5 transition-all duration-300",
        "hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] hover:shadow-[0_24px_60px_-32px_var(--accent)]",
        compact && "p-4",
      )}
      style={{ animation: `fade-up .5s cubic-bezier(.22,1,.36,1) ${Math.min(index * 60, 400)}ms both` }}
    >
      <div className="flex items-start justify-between gap-3">
        <CategoryChip category={topic.category} />
        <span className="inline-flex items-center gap-1 text-[11px] text-[var(--fg-faint)]">
          <Clock size={12} />
          {t("common.minutes", { n: topic.minutes })}
        </span>
      </div>

      <h3
        className={cn(
          "mt-3.5 font-display font-semibold leading-snug",
          compact ? "text-base" : "text-lg",
        )}
      >
        {topic.title[lang]}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
        {topic.excerpt[lang]}
      </p>

      <div className="mt-4 flex items-center gap-2 border-t border-[var(--line)] pt-3.5">
        <Link
          href={`/leitura/${topic.slug}`}
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[var(--line)] px-3 py-2 text-xs font-medium text-[var(--fg)] transition hover:bg-[color-mix(in_oklab,var(--fg)_7%,transparent)]"
        >
          <BookOpen size={14} />
          {t("explore.read")}
        </Link>
        <Link
          href={`/chat?q=${encodeURIComponent(askPrompt)}&context=${topic.slug}`}
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] px-3 py-2 text-xs font-medium text-[var(--accent)] transition hover:bg-[color-mix(in_oklab,var(--accent)_26%,transparent)]"
        >
          <MessageCircle size={14} />
          {t("explore.ask")}
        </Link>
      </div>
    </article>
  );
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition hover:gap-2.5"
    >
      {children}
      <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
