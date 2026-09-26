import type { AchievementDef, Progress, Topic } from "@/lib/types";
import { todayKey } from "@/lib/storage";

export const achievements: AchievementDef[] = [
  { id: "first_chat", nameKey: "achievements.first_chat", descKey: "achievements.first_chat.d" },
  { id: "black_hole", nameKey: "achievements.black_hole", descKey: "achievements.black_hole.d" },
  { id: "entropy", nameKey: "achievements.entropy", descKey: "achievements.entropy.d" },
  { id: "deep_diver", nameKey: "achievements.deep_diver", descKey: "achievements.deep_diver.d" },
  { id: "streak_3", nameKey: "achievements.streak_3", descKey: "achievements.streak_3.d" },
  { id: "streak_7", nameKey: "achievements.streak_7", descKey: "achievements.streak_7.d" },
  { id: "reader", nameKey: "achievements.reader", descKey: "achievements.reader.d" },
  { id: "cartographer", nameKey: "achievements.cartographer", descKey: "achievements.cartographer.d" },
  { id: "polymath", nameKey: "achievements.polymath", descKey: "achievements.polymath.d" },
];

/** Atualiza a sequência de dias com base na última atividade registrada. */
export function touchStreak(progress: Progress): Progress {
  const today = todayKey();
  if (progress.lastActiveDay === today) return progress;

  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const streak = progress.lastActiveDay === yesterday ? progress.streak + 1 : 1;
  return { ...progress, lastActiveDay: today, streak };
}

function unlockedIds(progress: Progress, topicsBySlug: Record<string, Topic>): string[] {
  const exploredSlugs = Object.keys(progress.explored);
  const categories = new Set(
    exploredSlugs.map((slug) => topicsBySlug[slug]?.category).filter(Boolean),
  );

  const checks: Record<string, boolean> = {
    first_chat: progress.messagesSent >= 1,
    black_hole: (progress.explored["buracos-negros"] ?? 0) > 0,
    entropy: (progress.explored["entropia"] ?? 0) > 0,
    deep_diver: progress.deepUses >= 5,
    streak_3: progress.streak >= 3,
    streak_7: progress.streak >= 7,
    reader: progress.reads >= 3,
    cartographer: exploredSlugs.length >= 8,
    polymath: categories.size >= 4,
  };

  return achievements.filter((a) => checks[a.id]).map((a) => a.id);
}

/**
 * Recalcula conquistas. Devolve apenas as novas (para animação de anúncio)
 * e devolve o progresso já consolidado.
 */
export function syncAchievements(
  progress: Progress,
  topicsBySlug: Record<string, Topic>,
): { progress: Progress; unlocked: string[] } {
  const ids = unlockedIds(progress, topicsBySlug);
  const known = new Set(progress.achievements);
  const unlocked = ids.filter((id) => !known.has(id));
  if (unlocked.length === 0) return { progress, unlocked: [] };
  return {
    progress: { ...progress, achievements: [...progress.achievements, ...unlocked] },
    unlocked,
  };
}

export function registerTopic(progress: Progress, slug: string): Progress {
  return {
    ...progress,
    explored: { ...progress.explored, [slug]: (progress.explored[slug] ?? 0) + 1 },
  };
}
