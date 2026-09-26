import { NextResponse } from "next/server";
import { generateReply } from "@/lib/chat/engine";
import type { Depth, Message } from "@/lib/types";
import type { Lang } from "@/lib/i18n";

export const runtime = "nodejs";

/**
 * Endpoint de chat. Assinatura pronta para LLM real:
 * basta configurar COSMOS_LLM_URL / COSMOS_LLM_KEY / COSMOS_LLM_MODEL
 * (ver src/lib/chat/engine.ts) — a UI não muda.
 */
export async function POST(request: Request) {
  let payload: {
    message?: unknown;
    depth?: unknown;
    lang?: unknown;
    history?: unknown;
    contextSlug?: unknown;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: "message_too_long" }, { status: 413 });
  }

  const depth: Depth =
    payload.depth === "short" || payload.depth === "deep" || payload.depth === "medium"
      ? payload.depth
      : "medium";
  const lang: Lang = payload.lang === "en" ? "en" : "pt";
  const history = Array.isArray(payload.history)
    ? (payload.history.filter(
        (m): m is Message =>
          !!m &&
          typeof (m as Message).content === "string" &&
          (m.role === "user" || m.role === "assistant"),
      ) as Message[])
    : [];
  const contextSlug =
    typeof payload.contextSlug === "string" && payload.contextSlug.length < 80
      ? payload.contextSlug
      : undefined;

  const reply = await generateReply({ message, depth, lang, history, contextSlug });

  return NextResponse.json({
    reply,
    meta: { depth, lang, engine: process.env.COSMOS_LLM_URL ? "llm" : "local" },
  });
}
