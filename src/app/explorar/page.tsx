"use client";

import { useMemo, useState } from "react";
import { Compass } from "lucide-react";
import { useApp } from "@/components/providers";
import { TopicCard } from "@/components/topic-card";
import { categories, topics } from "@/lib/data/topics";
import { categoryLabel } from "@/lib/data/topics";
import { cn } from "@/lib/cn";
import type { Category } from "@/lib/types";
import { ParticleField } from "@/components/particle-field";

type Filter = Category | "all";

export default function ExplorarPage() {
  const { t } = useApp();
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(
    () => (filter === "all" ? topics : topics.filter((x) => x.category === filter)),
    [filter],
  );

  const filters: Filter[] = ["all", ...categories];

  return (
    <div className="relative">
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <ParticleField density={0.00005} className="opacity-70" />
        <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--fg-faint)]">
            <Compass size={13} />
            CosmosGrok
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {t("explore.title")}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
            {t("explore.sub")}
          </p>

          <div className="no-scrollbar -mx-5 mt-7 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  "shrink-0 cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition",
                  filter === f
                    ? "border-[color-mix(in_oklab,var(--accent)_60%,transparent)] bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] text-[var(--fg)]"
                    : "border-[var(--line)] text-[var(--fg-muted)] hover:text-[var(--fg)]",
                )}
              >
                {f === "all" ? t("explore.filter.all") : t(categoryLabel[f as Category])}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        {list.length === 0 ? (
          <p className="py-16 text-center text-sm text-[var(--fg-muted)]">{t("explore.empty")}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((topic, i) => (
              <TopicCard key={topic.slug} topic={topic} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
