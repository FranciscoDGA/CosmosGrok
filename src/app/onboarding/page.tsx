"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Compass, Layers, MessageCircle, Sparkles } from "lucide-react";
import { useApp } from "@/components/providers";
import { ParticleField } from "@/components/particle-field";
import { KEYS } from "@/lib/storage";
import { cn } from "@/lib/cn";
import type { TKey } from "@/lib/i18n";

const slides: { icon: typeof Sparkles; titleKey: TKey; descKey: TKey }[] = [
  { icon: Sparkles, titleKey: "onboarding.1.t", descKey: "onboarding.1.d" },
  { icon: MessageCircle, titleKey: "onboarding.2.t", descKey: "onboarding.2.d" },
  { icon: Layers, titleKey: "onboarding.3.t", descKey: "onboarding.3.d" },
  { icon: Compass, titleKey: "onboarding.4.t", descKey: "onboarding.4.d" },
];

export default function OnboardingPage() {
  const { t } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const current = slides[step];
  const Icon = current.icon;
  const isLast = step === slides.length - 1;

  const finish = () => {
    try {
      window.localStorage.setItem(KEYS.onboarded, "1");
    } catch {
      /* noop */
    }
    router.push("/");
  };

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[var(--bg)]">
      <ParticleField density={0.00012} />

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <span className="font-display text-base font-semibold">{t("app.name")}</span>
        <button
          onClick={finish}
          className="cursor-pointer text-sm text-[var(--fg-faint)] transition hover:text-[var(--fg)]"
        >
          {t("onboarding.skip")}
        </button>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 pb-10 text-center">
        <div
          key={step}
          className="animate-fade-up"
          style={{ animationDuration: "0.45s" }}
        >
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] text-[var(--accent)] animate-float">
            <Icon size={34} strokeWidth={1.5} />
          </span>

          <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[var(--fg-faint)]">
            {t("onboarding.step", { current: step + 1, total: slides.length })}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {t(current.titleKey)}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[var(--fg-muted)]">
            {t(current.descKey)}
          </p>
        </div>

        {/* dots */}
        <div className="mt-10 flex justify-center gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === step ? "w-7 bg-[var(--accent)]" : "w-1.5 bg-[var(--line-strong)]",
              )}
            />
          ))}
        </div>

        <div className="mt-9 flex items-center justify-between gap-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm text-[var(--fg-muted)] transition hover:text-[var(--fg)]",
              step === 0 && "invisible",
            )}
          >
            <ArrowLeft size={16} />
            {t("common.back")}
          </button>

          <button
            onClick={() => (isLast ? finish() : setStep((s) => s + 1))}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_40px_-18px_var(--accent)] transition hover:brightness-110 active:scale-[0.98]"
          >
            {isLast ? t("onboarding.start") : t("common.next")}
            <ArrowRight size={16} />
          </button>
        </div>
      </main>

      <p className="relative z-10 pb-7 text-center text-xs text-[var(--fg-faint)]">
        {t("app.tagline")}
      </p>
    </div>
  );
}
