import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topics, topicsBySlug } from "@/lib/data/topics";
import { ReadingView } from "./reading-view";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const topic = topicsBySlug[slug];
  if (!topic) return { title: "Leitura" };
  return {
    title: topic.title.pt,
    description: topic.excerpt.pt,
  };
}

export default async function LeituraPage({ params }: Params) {
  const { slug } = await params;
  const topic = topicsBySlug[slug];
  if (!topic) notFound();
  return <ReadingView topic={topic} />;
}
