import { topicsBySlug } from "@/lib/data/topics";
import type { Depth, Message } from "@/lib/types";
import type { Lang } from "@/lib/i18n";

/**
 * Motor de respostas do CosmosGrok.
 *
 * Camada de integração com LLM:
 *  - Defina `COSMOS_LLM_URL` (endpoint compatível com OpenAI Chat Completions)
 *    e `COSMOS_LLM_KEY` (opcional) para usar um modelo real.
 *  - Sem essas variáveis, o app responde com o motor local (regras + conteúdo curado),
 *    mantendo a mesma forma de resposta — a UI não precisa mudar.
 */

export interface ReplyInput {
  message: string;
  depth: Depth;
  lang: Lang;
  history: Message[];
  contextSlug?: string;
}

export function systemPrompt(depth: Depth, lang: Lang): string {
  const persona =
    lang === "pt"
      ? "Você é Cosmos, a IA do CosmosGrok: inteligente sem ser pedante, curioso, um pouco irreverente e sempre respeitoso com a inteligência do usuário. Nada de enrolação acadêmica."
      : "You are Cosmos, the AI of CosmosGrok: smart without being smug, curious, slightly irreverent, and always respectful of the user's intelligence. No academic filler.";
  const depthRule =
    depth === "short"
      ? lang === "pt"
        ? "Responda em no máximo 2 frases, direto ao ponto."
        : "Answer in at most 2 sentences, straight to the point."
      : depth === "medium"
        ? lang === "pt"
          ? "Responda em 1 parágrafo curto com contexto e uma analogia."
          : "Answer in one short paragraph with context and an analogy."
        : lang === "pt"
          ? "Responda em 3-4 parágrafos: intuição, mecanismo, evidência e uma pergunta aberta no fim."
          : "Answer in 3-4 paragraphs: intuition, mechanism, evidence, and one open question at the end.";
  return `${persona} Idioma: ${lang === "pt" ? "português do Brasil" : "English"}. ${depthRule}`;
}

function pickTopic(message: string) {
  const t = message.toLowerCase();
  let best: (typeof topicsBySlug)[string] | undefined;
  let bestScore = 0;
  for (const topic of Object.values(topicsBySlug)) {
    const score = topic.keywords.reduce((acc, k) => (t.includes(k) ? acc + k.length : acc), 0);
    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }
  return bestScore > 0 ? best : undefined;
}

/** Detecta o tema mais provável de uma mensagem (usado para mapear progresso). */
export function detectTopic(message: string) {
  return pickTopic(message);
}

function composeFromTopic(topic: NonNullable<ReturnType<typeof pickTopic>>, depth: Depth, lang: Lang) {
  const body = topic.body[lang];
  const intro = topic.excerpt[lang];
  if (depth === "short") return `${intro}`;
  if (depth === "medium") return `${intro}\n\n${body[0]}`;
  return [intro, ...body.slice(0, 4)].join("\n\n");
}

const fallbacks: Record<Lang, Record<Depth, (topicName?: string) => string>> = {
  pt: {
    short: () =>
      "Boa pergunta — e eu resisti à tentação de enrolar: a resposta curta é que ninguém sabe com certeza ainda, e quem diz que sabe está vendendo algo.",
    medium: () =>
      "Vamos por partes: o que você perguntou toca num ponto onde evidência e interpretação ainda disputam espaço. O padrão mais honesto é separar o que foi medido do que foi inferido — e perceber que a maior parte das certezas rápidas morre no segundo passo.",
    deep: () =>
      "Vamos desmontar isso em camadas.\n\nPrimeiro, o que é fato: existem medições robustas e replicadas sobre o assunto, mas elas descrevem o comportamento, não necessariamente a causa final. A parte mais fácil já está resolvida; a parte difícil é o 'porquê'.\n\nSegundo, a interpretação: há pelo menos duas leituras compatíveis com os dados — uma conservadora e uma mais especulativa. A ciência avança preferindo a conservadora até que uma previsão nova derrube a outra.\n\nTerceiro, o que mudaria minha mente: uma observação que só uma das hipóteses prevê. Sem isso, estamos no território do gosto.\n\nE você, de que lado os dados te parecem pender?",
  },
  en: {
    short: () =>
      "Good question — and I resisted the urge to ramble: the short answer is that nobody knows for sure yet, and whoever says they know is selling something.",
    medium: () =>
      "Let's break it down: what you asked touches a point where evidence and interpretation still compete for space. The most honest pattern is separating what was measured from what was inferred — and noticing most quick certainties die on the second step.",
    deep: () =>
      "Let's take this apart in layers.\n\nFirst, what's a fact: there are robust, replicated measurements on the subject, but they describe behavior, not necessarily the final cause. The easy part is solved; the hard part is the 'why'.\n\nSecond, the interpretation: at least two readings are compatible with the data — one conservative and one more speculative. Science advances by preferring the conservative one until a new prediction knocks the other down.\n\nThird, what would change my mind: an observation only one of the hypotheses predicts. Without it, we're in taste territory.\n\nAnd you — which side do the data seem to lean toward?",
  },
};

const greetings: Record<Lang, string> = {
  pt: "Oi. Estou curioso — o que está te incomodando hoje? Perguntas difíceis são bem-vindas.",
  en: "Hi. I'm curious — what's bugging you today? Hard questions are welcome.",
};

const identity: Record<Lang, string> = {
  pt: "Sou o Cosmos, a IA do CosmosGrok. Meu trabalho é explicar coisas complicadas sem infantilizar você — e admitir quando não sei (quase nunca é vergonhoso; é só honesto).",
  en: "I'm Cosmos, the AI of CosmosGrok. My job is to explain complicated things without talking down to you — and to admit when I don't know (it's rarely shameful; it's just honest).",
};

/** Resposta local determinística — usada quando não há LLM configurada. */
export function localReply({ message, depth, lang, contextSlug }: ReplyInput): string {
  const text = message.trim();

  if (contextSlug && topicsBySlug[contextSlug]) {
    const topic = topicsBySlug[contextSlug];
    const head =
      lang === "pt"
        ? `Sobre "${topic.title.pt}" — `
        : `About "${topic.title.en}" — `;
    return head + composeFromTopic(topic, depth, lang);
  }

  if (text.length < 3) return greetings[lang];
  if (/^(oi|olá|ola|hey|hi|hello|e aí|eai)\b/i.test(text)) return greetings[lang];
  if (/(quem (é|e) voc(ê|e)|who are you|o que voc(ê|e) faz)/i.test(text)) return identity[lang];
  if (/^(obrigad|valeu|thanks|thank you)/i.test(text)) {
    return lang === "pt"
      ? "Imagina. Curiosidade é o único superpoder que realmente importa — use à vontade."
      : "Anytime. Curiosity is the only superpower that really matters — use it freely.";
  }

  const topic = pickTopic(text);
  if (topic) return composeFromTopic(topic, depth, lang);

  return fallbacks[lang][depth]();
}

/** Chamada a LLM compatível com OpenAI. Retorna null se não configurada. */
async function callLLM(input: ReplyInput): Promise<string | null> {
  const url = process.env.COSMOS_LLM_URL;
  if (!url) return null;

  try {
    const messages = [
      { role: "system", content: systemPrompt(input.depth, input.lang) },
      ...input.history.slice(-8).map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: input.message },
    ];

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.COSMOS_LLM_KEY
          ? { Authorization: `Bearer ${process.env.COSMOS_LLM_KEY}` }
          : {}),
      },
      body: JSON.stringify({
        model: process.env.COSMOS_LLM_MODEL ?? "gpt-4o-mini",
        messages,
        temperature: 0.7,
      }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`LLM ${res.status}`);
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    return content?.trim() || null;
  } catch {
    // Fallback gracioso: nunca deixamos o usuário sem resposta.
    return null;
  }
}

export async function generateReply(input: ReplyInput): Promise<string> {
  const remote = await callLLM(input);
  if (remote) return remote;
  return localReply(input);
}
