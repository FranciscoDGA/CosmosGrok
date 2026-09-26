"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Compass, HelpCircle, MessageCircle, Sparkles, Zap } from "lucide-react";
import { useApp } from "@/components/providers";
import { ParticleField } from "@/components/particle-field";
import { ArrowLink, TopicCard } from "@/components/topic-card";
import { Button } from "@/components/ui/button";
import { dailyFacts, dailyQuestions, topics } from "@/lib/data/topics";
import { KEYS, dayIndex } from "@/lib/storage";

export default function HomePage() {
  const { t, lang } = useApp();
  const router = useRouter();

  /* Primeira visita: onboarding leve antes do app. */
  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEYS.onboarded)) router.replace("/onboarding");
    } catch {
      /* storage indisponível: segue direto */
    }
  }, [router]);

  const idx = dayIndex() % 7;
  const question = dailyQuestions[lang][idx];
  const fact = dailyFacts[lang][idx];
  const featured = topics.slice(0, 6);

  const stats = [
    { value: String(topics.length), label: t("home.hero.stat1") },
    { value: "3", label: t("home.hero.stat2") },
    { value: "PT · EN", label: t("home.hero.stat3") },
  ];

  const steps = [
    { icon: HelpCircle, t: t("home.how.1.t"), d: t("home.how.1.d") },
    { icon: Zap, t: t("home.how.2.t"), d: t("home.how.2.d") },
    { icon: Sparkles, t: t("home.how.3.t"), d: t("home.how.3.d") },
  ];

  return (
    <div>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <ParticleField className="opacity-80" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--accent) 55%, transparent) 0%, transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[color-mix(in_oklab,var(--bg)_60%,transparent)] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)] backdrop-blur">
            <span className="h-1.5 w-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-[var(--accent-2)]" />
            {t("home.hero.badge")}
          </span>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
            {t("home.hero.title1")}{" "}
            <span className="text-gradient">{t("home.hero.title2")}</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
            {t("home.hero.sub")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/chat">
              <Button size="lg">
                {t("home.hero.cta")}
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/explorar">
              <Button size="lg" variant="outline">
                <Compass size={18} />
                {t("home.hero.cta2")}
              </Button>
            </Link>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-semibold text-[var(--fg)] sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- Pergunta / Fato do dia ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--accent)_40%,transparent)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t("home.daily.question")}
            </p>
            <p className="mt-3 font-display text-xl leading-snug font-medium sm:text-2xl">
              {question}
            </p>
            <Link
              href={`/chat?q=${encodeURIComponent(question)}`}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              <MessageCircle size={15} />
              {t("home.daily.open")}
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-elevated)_86%,transparent)] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-2)]">
              {t("home.daily.fact")}
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--fg)] sm:text-lg">
              {fact.text}
            </p>
            {fact.slug && (
              <Link
                href={`/leitura/${fact.slug}`}
                className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[var(--accent-2)] hover:underline"
              >
                {t("home.daily.ask")}
                <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- Feed ---------------- */}
      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-8 sm:pb-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-faint)]">
              {t("home.feed.eyebrow")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              {t("home.feed.title")}
            </h2>
          </div>
          <ArrowLink href="/explorar">{t("home.feed.all")}</ArrowLink>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((topic, i) => (
            <TopicCard key={topic.slug} topic={topic} index={i} compact />
          ))}
        </div>
      </section>

      {/* ---------------- Como funciona ---------------- */}
      <section className="border-t border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-subtle)_70%,transparent)]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t("home.how.title")}</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.t}
                  className="rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-elevated)_80%,transparent)] p-6"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] text-[var(--accent)]">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[var(--fg-faint)]">
                    0{i + 1}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{s.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- CTA final ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-8 sm:py-20">
        <p className="font-display text-2xl font-semibold sm:text-4xl">
          {t("app.tagline")}
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--fg-muted)]">
          {t("app.pitch")}
        </p>
        <Link href="/chat" className="mt-7 inline-block">
          <Button size="lg">
            {t("home.hero.cta")}
            <ArrowRight size={18} />
          </Button>
        </Link>
      </section>
    </div>
  );
}
