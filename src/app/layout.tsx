import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/providers";
import { AppShell } from "@/components/app-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CosmosGrok — Entenda o universo sem enrolação",
    template: "%s · CosmosGrok",
  },
  description:
    "App de exploração do conhecimento com IA: espaço, ciência, filosofia, tecnologia e pensamento crítico. Pergunte qualquer coisa — eu não minto (quase nunca).",
  applicationName: "CosmosGrok",
  keywords: ["ciência", "espaço", "IA", "filosofia", "cosmologia", "aprendizado"],
  openGraph: {
    title: "CosmosGrok",
    description: "O universo é estranho. Vamos entendê-lo juntos.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
    { media: "(prefers-color-scheme: light)", color: "#F4F6FF" },
  ],
  width: "device-width",
  initialScale: 1,
};

/** Aplica tema e idioma salvos antes da hidratação (evita flash). */
const bootstrap = `(function(){try{var s=JSON.parse(localStorage.getItem('cosmosgrok:settings')||'{}');var m=s.theme||'dark';var r=m==='system'?(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'):m;document.documentElement.setAttribute('data-theme',r);var l=s.lang&&s.lang!=='auto'?s.lang:((navigator.language||'pt').toLowerCase().indexOf('en')===0?'en':'pt');document.documentElement.lang=l==='en'?'en':'pt-BR';}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${space.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body className="min-h-dvh bg-[var(--bg)] text-[var(--fg)] antialiased">
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
