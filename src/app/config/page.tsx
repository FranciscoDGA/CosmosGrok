"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Info, Languages, MessageCircle, Moon, Palette, RotateCcw, Sun } from "lucide-react";
import { useApp } from "@/components/providers";
import { cn } from "@/lib/cn";
import type { Depth, ThemeMode } from "@/lib/types";
import type { Lang, TKey } from "@/lib/i18n";

const themeOptions: { value: ThemeMode; icon: typeof Moon; labelKey: TKey }[] = [
  { value: "dark", icon: Moon, labelKey: "settings.theme.dark" },
  { value: "light", icon: Sun, labelKey: "settings.theme.light" },
  { value: "system", icon: Palette, labelKey: "settings.theme.system" },
];

const langOptions: { value: Lang | "auto"; labelKey: TKey }[] = [
  { value: "auto", labelKey: "settings.language.auto" },
  { value: "pt", labelKey: "settings.language.pt" },
  { value: "en", labelKey: "settings.language.en" },
];

const depthOptions: { value: Depth; labelKey: TKey; hintKey: TKey }[] = [
  { value: "short", labelKey: "chat.depth.short", hintKey: "chat.depth.short.hint" },
  { value: "medium", labelKey: "chat.depth.medium", hintKey: "chat.depth.medium.hint" },
  { value: "deep", labelKey: "chat.depth.deep", hintKey: "chat.depth.deep.hint" },
];

function Option({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm transition",
        active
          ? "border-[color-mix(in_oklab,var(--accent)_60%,transparent)] bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-[var(--fg)]"
          : "border-[var(--line)] text-[var(--fg-muted)] hover:text-[var(--fg)]",
      )}
    >
      {children}
      {active && <Check size={15} className="ml-auto text-[var(--accent)]" />}
    </button>
  );
}

export default function ConfigPage() {
  const { t, settings, updateSettings, resetAll } = useApp();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const id = setTimeout(() => setSaved(false), 1600);
    return () => clearTimeout(id);
  }, [saved]);

  const change = (patch: Partial<typeof settings>) => {
    updateSettings(patch);
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--fg-faint)]">
            CosmosGrok
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            {t("settings.title")}
          </h1>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">{t("settings.sub")}</p>
        </div>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--success)_40%,transparent)] px-3 py-1.5 text-xs text-[var(--success)] transition-opacity",
            saved ? "opacity-100" : "opacity-0",
          )}
        >
          <Check size={13} />
          {t("settings.saved")}
        </span>
      </div>

      {/* Aparência */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
          <Palette size={17} className="text-[var(--accent)]" />
          {t("settings.appearance")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <Option
                key={opt.value}
                active={settings.theme === opt.value}
                onClick={() => change({ theme: opt.value })}
              >
                <Icon size={16} />
                {t(opt.labelKey)}
              </Option>
            );
          })}
        </div>

        <h3 className="mb-3 mt-7 flex items-center gap-2 text-sm font-medium text-[var(--fg-muted)]">
          <Languages size={15} />
          {t("settings.language")}
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {langOptions.map((opt) => (
            <Option
              key={opt.value}
              active={settings.lang === opt.value}
              onClick={() => change({ lang: opt.value })}
            >
              {t(opt.labelKey)}
            </Option>
          ))}
        </div>
      </section>

      {/* Chat */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
          <MessageCircle size={17} className="text-[var(--accent)]" />
          {t("settings.chat")}
        </h2>
        <p className="mb-3 text-sm text-[var(--fg-muted)]">{t("settings.defaultDepth")}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {depthOptions.map((opt) => (
            <Option
              key={opt.value}
              active={settings.depth === opt.value}
              onClick={() => change({ depth: opt.value })}
            >
              <span className="text-left">
                <span className="block font-medium">{t(opt.labelKey)}</span>
                <span className="mt-0.5 block text-[11px] font-normal text-[var(--fg-faint)]">
                  {t(opt.hintKey)}
                </span>
              </span>
            </Option>
          ))}
        </div>
      </section>

      {/* Dados */}
      <section className="mt-10 rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-elevated)_86%,transparent)] p-5">
        <h2 className="font-display text-lg font-semibold">{t("settings.data")}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-muted)]">
          {t("settings.data.desc")}
        </p>
        <button
          onClick={() => {
            if (window.confirm(t("settings.data.confirm"))) resetAll();
          }}
          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[color-mix(in_oklab,var(--danger)_45%,transparent)] bg-[color-mix(in_oklab,var(--danger)_12%,transparent)] px-4 py-2.5 text-sm font-medium text-[var(--danger)] transition hover:bg-[color-mix(in_oklab,var(--danger)_20%,transparent)]"
        >
          <RotateCcw size={15} />
          {t("settings.data.clear")}
        </button>
      </section>

      {/* Sobre */}
      <section className="mt-8 rounded-2xl border border-[var(--line)] p-5">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
          <Info size={17} className="text-[var(--accent-2)]" />
          {t("settings.about")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
          {t("settings.about.desc")}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/onboarding" className="text-[var(--accent)] hover:underline">
            {t("onboarding.1.t")} →
          </Link>
          <Link href="/mapa" className="text-[var(--accent)] hover:underline">
            {t("map.title")} →
          </Link>
        </div>
        <p className="mt-6 text-xs text-[var(--fg-faint)]">CosmosGrok · v0.1.0</p>
      </section>
    </div>
  );
}
