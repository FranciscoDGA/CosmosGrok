"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Award, Flame, Lock, MessageCircle, BookOpen, Star, Pencil, Check } from "lucide-react";
import { useApp } from "@/components/providers";
import { achievements } from "@/lib/gamification";
import { topicsBySlug } from "@/lib/data/topics";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export default function PerfilPage() {
  const { t, lang, profileName, setProfileName, progress, hydrated } = useApp();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const unlocked = useMemo(() => new Set(progress.achievements), [progress.achievements]);

  const topTopics = useMemo(() => {
    return Object.entries(progress.explored)
      .map(([slug, count]) => ({ topic: topicsBySlug[slug], count }))
      .filter((x) => x.topic)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [progress.explored]);

  const maxCount = topTopics[0]?.count ?? 1;
  const stats = [
    { icon: Star, value: Object.keys(progress.explored).length, label: t("profile.stats.topics") },
    { icon: MessageCircle, value: progress.messagesSent, label: t("profile.stats.messages") },
    { icon: BookOpen, value: progress.reads, label: t("profile.stats.reads") },
  ];

  const startEdit = () => {
    setDraft(profileName);
    setEditing(true);
  };

  const saveEdit = () => {
    setProfileName(draft.trim());
    setEditing(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Identidade */}
      <div className="flex flex-wrap items-center gap-5">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] font-display text-2xl font-semibold text-white">
          {(profileName || t("profile.guest")).charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                maxLength={32}
                className="w-56 rounded-xl border border-[var(--line-strong)] bg-[var(--bg-elevated)] px-3 py-2 text-lg font-medium outline-none focus:border-[var(--accent)]"
                aria-label={t("profile.editName")}
              />
              <Button size="sm" onClick={saveEdit}>
                <Check size={15} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="truncate font-display text-2xl font-semibold sm:text-3xl">
                {profileName || t("profile.guest")}
              </h1>
              <button
                onClick={startEdit}
                className="cursor-pointer rounded-lg p-1.5 text-[var(--fg-faint)] transition hover:text-[var(--fg)]"
                aria-label={t("profile.editName")}
              >
                <Pencil size={15} />
              </button>
            </div>
          )}
          <p className="mt-1 text-sm text-[var(--fg-muted)]">{t("profile.guest.sub")}</p>
        </div>

        {/* Sequência */}
        <div className="flex items-center gap-3 rounded-2xl border border-[color-mix(in_oklab,var(--accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] px-5 py-3.5">
          <Flame
            size={26}
            className={progress.streak > 0 ? "text-[var(--accent)]" : "text-[var(--fg-faint)]"}
          />
          <div>
            <p className="font-display text-xl font-semibold">
              {hydrated ? progress.streak : 0}
            </p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--fg-faint)]">
              {progress.streak > 0
                ? progress.streak === 1
                  ? t("profile.streak.days1")
                  : t("profile.streak.days", { n: progress.streak })
                : t("profile.streak.new")}
            </p>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-elevated)_86%,transparent)] p-4 sm:p-5"
            >
              <Icon size={17} className="text-[var(--accent)]" />
              <p className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{s.value}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-[var(--fg-faint)]">
                {s.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Conquistas */}
      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold sm:text-2xl">
            <Award size={19} className="text-[var(--accent)]" />
            {t("profile.achievements")}
          </h2>
          <span className="text-xs text-[var(--fg-faint)]">
            {t("profile.achievements.unlocked", {
              n: progress.achievements.length,
              total: achievements.length,
            })}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => {
            const has = unlocked.has(a.id);
            return (
              <div
                key={a.id}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-4 transition",
                  has
                    ? "border-[color-mix(in_oklab,var(--accent)_40%,transparent)] bg-[color-mix(in_oklab,var(--accent)_9%,transparent)]"
                    : "border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-elevated)_70%,transparent)] opacity-70",
                )}
              >
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                    has
                      ? "bg-[color-mix(in_oklab,var(--accent)_20%,transparent)] text-[var(--accent)]"
                      : "bg-[color-mix(in_oklab,var(--fg)_8%,transparent)] text-[var(--fg-faint)]",
                  )}
                >
                  {has ? <Award size={18} /> : <Lock size={16} />}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{t(a.nameKey)}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--fg-muted)]">
                    {t(a.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Temas mais explorados */}
      <section className="mt-12">
        <h2 className="mb-5 font-display text-xl font-semibold sm:text-2xl">
          {t("profile.topTopics")}
        </h2>

        {topTopics.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--line-strong)] p-8 text-center text-sm text-[var(--fg-muted)]">
            {t("profile.noTop")}
            <div className="mt-4">
              <Link href="/explorar" className="text-[var(--accent)] hover:underline">
                {t("home.hero.cta2")} →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {topTopics.map(({ topic, count }) => (
              <Link
                key={topic.slug}
                href={`/leitura/${topic.slug}`}
                className="flex items-center gap-4 rounded-xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-elevated)_80%,transparent)] px-4 py-3 transition hover:border-[color-mix(in_oklab,var(--accent)_45%,transparent)]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{topic.title[lang]}</span>
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--fg)_10%,transparent)]">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </span>
                </span>
                <span className="font-display text-lg font-semibold text-[var(--accent)]">
                  {count}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
