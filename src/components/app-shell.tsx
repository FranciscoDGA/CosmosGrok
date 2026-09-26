"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import {
  Award,
  Compass,
  Home,
  Map as MapIcon,
  MessageCircle,
  Moon,
  Settings,
  Sun,
  Trophy,
  User,
} from "lucide-react";
import { useApp } from "@/components/providers";
import { cn } from "@/lib/cn";
import type { Lang, TKey } from "@/lib/i18n";

const items: { href: string; label: TKey; icon: typeof Home; mobile: boolean }[] = [
  { href: "/", label: "nav.home", icon: Home, mobile: true },
  { href: "/chat", label: "nav.chat", icon: MessageCircle, mobile: true },
  { href: "/explorar", label: "nav.explore", icon: Compass, mobile: true },
  { href: "/mapa", label: "nav.map", icon: MapIcon, mobile: true },
  { href: "/perfil", label: "nav.profile", icon: User, mobile: true },
  { href: "/config", label: "nav.settings", icon: Settings, mobile: false },
];

function Logo() {
  const { t } = useApp();
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)] text-white shadow-[0_10px_26px_-12px_var(--accent)]">
        <span className="absolute h-2.5 w-2.5 rounded-full bg-white" />
        <span className="absolute h-6 w-6 rounded-full border border-white/50" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        {t("app.name")}
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const {
    t,
    lang,
    settings,
    updateSettings,
    achievementToast,
    dismissAchievement,
    progress,
  } = useApp();

  const unlockedCount = progress.achievements.length;

  /* Onboarding ocupa a tela inteira (sem navegação). */
  if (pathname.startsWith("/onboarding")) {
    return <div className="min-h-dvh">{children}</div>;
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const toggleTheme = () => {
    const current = document.documentElement.dataset.theme ?? "dark";
    updateSettings({ theme: current === "dark" ? "light" : "dark" });
  };

  const cycleLang = () => {
    const next: Lang = lang === "pt" ? "en" : "pt";
    updateSettings({ lang: next });
  };

  return (
    <div className="relative min-h-dvh">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-white"
      >
        {t("nav.skip")}
      </a>

      {/* ---------- Sidebar (desktop) ---------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] backdrop-blur-xl md:flex">
        <div className="px-5 py-6">
          <Logo />
          <p className="mt-3 text-xs leading-relaxed text-[var(--fg-faint)]">
            {t("app.tagline")}
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-3" aria-label={t("nav.menu")}>
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                  active
                    ? "bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] text-[var(--fg)] font-medium"
                    : "text-[var(--fg-muted)] hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)] hover:text-[var(--fg)]",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 h-5 w-1 rounded-full transition-all",
                    active ? "bg-[var(--accent)] opacity-100" : "opacity-0",
                  )}
                />
                <Icon size={18} strokeWidth={1.8} />
                {t(item.label)}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-[var(--line)] p-4">
          <div className="flex items-center justify-between rounded-xl border border-[var(--line)] p-1">
            {(["pt", "en"] as Lang[]).map((code) => (
              <button
                key={code}
                onClick={() => updateSettings({ lang: code })}
                className={cn(
                  "flex-1 cursor-pointer rounded-lg px-2 py-1.5 text-xs font-medium transition",
                  lang === code
                    ? "bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] text-[var(--fg)]"
                    : "text-[var(--fg-faint)] hover:text-[var(--fg)]",
                )}
                aria-pressed={lang === code}
              >
                {code === "pt" ? "PT-BR" : "EN"}
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm text-[var(--fg-muted)] transition hover:text-[var(--fg)]"
            aria-label={t("theme.toggle")}
          >
            {settings.theme === "light" ? (
              <>
                <Sun size={16} /> {t("settings.theme.light")}
              </>
            ) : (
              <>
                <Moon size={16} /> {t("settings.theme.dark")}
              </>
            )}
          </button>

          <div className="flex items-center gap-2 rounded-xl bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] px-3 py-2.5 text-xs text-[var(--fg-muted)]">
            <Trophy size={14} className="text-[var(--accent)]" />
            <span>{unlockedCount} / 9</span>
            <span className="ml-auto">{t("profile.insignia")}</span>
          </div>
        </div>
      </aside>

      {/* ---------- Topbar (mobile) ---------- */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] px-4 py-3 backdrop-blur-xl md:hidden">
        <Logo />
        <div className="flex items-center gap-2">
          <button
            onClick={cycleLang}
            className="cursor-pointer rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-xs font-medium text-[var(--fg-muted)]"
            aria-label={t("settings.language")}
          >
            {lang === "pt" ? "PT" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-[var(--line)] text-[var(--fg-muted)]"
            aria-label={t("theme.toggle")}
          >
            {settings.theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            href="/config"
            className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--line)] text-[var(--fg-muted)]"
            aria-label={t("nav.settings")}
          >
            <Settings size={16} />
          </Link>
        </div>
      </header>

      {/* ---------- Conteúdo ---------- */}
      <main id="conteudo" className="pb-24 md:pb-0 md:pl-64">
        {children}
      </main>

      {/* ---------- Bottom nav (mobile) ---------- */}
      <nav
        aria-label={t("nav.menu")}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto flex max-w-md items-stretch justify-around px-2 py-1.5">
          {items
            .filter((i) => i.mobile)
            .map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex min-w-14 flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] transition",
                    active ? "text-[var(--accent)]" : "text-[var(--fg-faint)]",
                  )}
                >
                  <Icon size={19} strokeWidth={active ? 2.2 : 1.7} />
                  {t(item.label)}
                </Link>
              );
            })}
        </div>
      </nav>

      {/* ---------- Toast de conquista ---------- */}
      {achievementToast && (
        <div className="fixed bottom-24 right-4 z-50 max-w-xs animate-fade-up md:bottom-auto md:right-6 md:top-6">
          <button
            onClick={dismissAchievement}
            className="flex w-full cursor-pointer items-start gap-3 rounded-2xl border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[var(--bg-elevated)] p-4 text-left shadow-[var(--shadow)]"
          >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] text-[var(--accent)]">
              <Award size={18} />
            </span>
            <span>
              <span className="block text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">
                {t("achievements.unlock")}
              </span>
              <span className="mt-0.5 block text-sm font-medium">
                {t(`achievements.${achievementToast}` as TKey)}
              </span>
              <span className="mt-0.5 block text-xs text-[var(--fg-muted)]">
                {t(`achievements.${achievementToast}.d` as TKey)}
              </span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
