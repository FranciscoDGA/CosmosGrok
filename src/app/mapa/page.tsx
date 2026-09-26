"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, RotateCcw, Sparkles } from "lucide-react";
import { useApp } from "@/components/providers";
import { CategoryChip } from "@/components/topic-card";
import { topics, topicsBySlug } from "@/lib/data/topics";
import type { Category } from "@/lib/types";

const VIEW = { w: 1000, h: 640 };

const clusterCenter: Record<Category, { x: number; y: number }> = {
  space: { x: 225, y: 195 },
  science: { x: 775, y: 200 },
  ai: { x: 500, y: 130 },
  philosophy: { x: 275, y: 480 },
  mind: { x: 730, y: 470 },
};

/** Posições determinísticas (mesmas em SSR e cliente). */
function buildLayout() {
  const byCategory = new Map<Category, typeof topics>();
  for (const topic of topics) {
    const list = byCategory.get(topic.category) ?? [];
    list.push(topic);
    byCategory.set(topic.category, list);
  }

  const positions: Record<string, { x: number; y: number }> = {};
  for (const [category, list] of byCategory) {
    const center = clusterCenter[category];
    const radius = list.length <= 2 ? 90 : 115;
    list.forEach((topic, i) => {
      const angle = (i / list.length) * Math.PI * 2 - Math.PI / 2;
      positions[topic.slug] = {
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius * 0.86,
      };
    });
  }
  return positions;
}

const layout = buildLayout();

const edges = (() => {
  const seen = new Set<string>();
  const list: { a: string; b: string }[] = [];
  for (const topic of topics) {
    for (const rel of topic.related) {
      if (!topicsBySlug[rel]) continue;
      const key = [topic.slug, rel].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      list.push({ a: topic.slug, b: rel });
    }
  }
  return list;
})();

const bgStars = Array.from({ length: 70 }, (_, i) => ({
  x: (i * 137) % VIEW.w,
  y: (i * 89) % VIEW.h,
  r: (i % 4) * 0.5 + 0.6,
  o: ((i * 31) % 60) / 100 + 0.15,
}));

export default function MapaPage() {
  const { t, lang, progress, resetAll } = useApp();
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  const exploredCount = Object.keys(progress.explored).length;
  const connections = edges.filter(
    (e) => progress.explored[e.a] && progress.explored[e.b],
  ).length;

  const stage = useMemo(() => (exploredCount === 0 ? ("empty" as const) : ("active" as const)), [
    exploredCount,
  ]);

  const level = (slug: string): "new" | "growing" | "mastered" => {
    const count = progress.explored[slug] ?? 0;
    if (count >= 5) return "mastered";
    if (count >= 2) return "growing";
    return "new";
  };

  const open = (slug: string) => router.push(`/leitura/${slug}`);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--fg-faint)]">
            CosmosGrok
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            {t("map.title")}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[var(--fg-muted)]">{t("map.sub")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <div>
            <p className="font-display text-2xl font-semibold">{exploredCount}</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--fg-faint)]">
              {t("map.explored")}
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold">{connections}</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--fg-faint)]">
              {t("map.connections")}
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm(t("settings.data.confirm"))) resetAll();
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--line)] px-3 py-2 text-xs text-[var(--fg-muted)] transition hover:text-[var(--fg)]"
          >
            <RotateCcw size={13} />
            {t("map.reset")}
          </button>
        </div>
      </div>

      {/* legenda */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.12em] text-[var(--fg-faint)]">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent-2)]" />
          {t("map.legend.new")}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          {t("map.legend.growing")}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[color-mix(in_oklab,var(--accent)_75%,white)]" />
          {t("map.legend.mastered")}
        </span>
        <span className="ml-auto hidden text-[var(--fg-faint)] sm:inline">{t("map.hint")}</span>
      </div>

      {/* constelação */}
      <div className="relative mt-5 overflow-hidden rounded-3xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-subtle)_80%,transparent)]">
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="h-[420px] w-full sm:h-[560px]"
          role="img"
          aria-label={t("map.title")}
        >
          <defs>
            <radialGradient id="nebula" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
          </defs>

          <rect width={VIEW.w} height={VIEW.h} fill="url(#nebula)" />

          {bgStars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="var(--fg)" opacity={s.o} />
          ))}

          {/* conexões */}
          {edges.map(({ a, b }) => {
            const pa = layout[a];
            const pb = layout[b];
            if (!pa || !pb) return null;
            const active = progress.explored[a] && progress.explored[b];
            const dim = hovered && hovered !== a && hovered !== b;
            return (
              <line
                key={`${a}-${b}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={active ? "url(#edge)" : "var(--line-strong)"}
                strokeWidth={active ? 1.6 : 1}
                strokeOpacity={dim ? 0.12 : active ? 0.75 : 0.35}
                strokeDasharray={active ? undefined : "4 6"}
                className="transition-all duration-300"
              />
            );
          })}

          {/* estrelas / temas */}
          {topics.map((topic) => {
            const p = layout[topic.slug];
            if (!p) return null;
            const count = progress.explored[topic.slug] ?? 0;
            const lv = level(topic.slug);
            const radius = 7 + Math.min(count, 6) * 3.2;
            const dim = hovered && hovered !== topic.slug;
            const fill =
              lv === "mastered"
                ? "color-mix(in oklab, var(--accent) 75%, white)"
                : lv === "growing"
                  ? "var(--accent)"
                  : "var(--accent-2)";
            const label =
              topic.title[lang].length > 24
                ? `${topic.title[lang].slice(0, 23)}...`
                : topic.title[lang];

            return (
              <g
                key={topic.slug}
                transform={`translate(${p.x} ${p.y})`}
                className="cursor-pointer"
                opacity={dim ? 0.35 : 1}
                onMouseEnter={() => setHovered(topic.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(topic.slug)}
                onBlur={() => setHovered(null)}
                onClick={() => open(topic.slug)}
                tabIndex={0}
                role="link"
                aria-label={topic.title[lang]}
                onKeyDown={(e) => {
                  if (e.key === "Enter") open(topic.slug);
                }}
              >
                {count > 0 && (
                  <circle r={radius + 8} fill={fill} opacity={0.14}>
                    {count > 1 && (
                      <animate
                        attributeName="r"
                        values={`${radius + 6};${radius + 12};${radius + 6}`}
                        dur="3.6s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                )}
                <circle r={radius} fill={fill} opacity={count > 0 ? 1 : 0.45} />
                <circle r={Math.max(2, radius * 0.35)} fill="#fff" opacity={count > 0 ? 0.9 : 0.5} />

                <text
                  y={radius + 18}
                  textAnchor="middle"
                  fontSize="13"
                  fill="var(--fg-muted)"
                  opacity={hovered === topic.slug ? 1 : dim ? 0.5 : 0.85}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* painel do tema */}
        {hovered && topicsBySlug[hovered] && (
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] p-4 shadow-[var(--shadow)] sm:left-auto sm:w-80">
            <div className="flex items-center justify-between gap-3">
              <CategoryChip category={topicsBySlug[hovered].category} />
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--fg-faint)]">
                {t(`map.legend.${level(hovered)}` as "map.legend.new")}
              </span>
            </div>
            <p className="mt-2.5 font-display text-base font-semibold">
              {topicsBySlug[hovered].title[lang]}
            </p>
            <p className="mt-1 line-clamp-2 text-xs text-[var(--fg-muted)]">
              {topicsBySlug[hovered].excerpt[lang]}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--accent)]">
              {t("explore.read")} <ArrowUpRight size={13} />
            </span>
          </div>
        )}
      </div>

      {stage === "empty" && (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-[var(--line-strong)] p-8 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] text-[var(--accent)]">
            <Sparkles size={20} />
          </span>
          <p className="mt-4 font-display text-xl font-semibold">{t("map.empty.title")}</p>
          <p className="mt-1.5 max-w-md text-sm text-[var(--fg-muted)]">{t("map.empty.sub")}</p>
          <div className="mt-5 flex gap-3">
            <Link
              href="/chat"
              className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white"
            >
              {t("nav.chat")}
            </Link>
            <Link
              href="/explorar"
              className="rounded-xl border border-[var(--line-strong)] px-4 py-2.5 text-sm font-medium"
            >
              {t("nav.explore")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
