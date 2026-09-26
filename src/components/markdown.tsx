import type { ReactNode } from "react";

/** Renderizador enxuto de Markdown (parágrafos, listas, negrito, código). */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold text-[var(--fg)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={key}
          className="rounded-md bg-[color-mix(in_oklab,var(--fg)_10%,transparent)] px-1.5 py-0.5 font-mono text-[0.9em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

export function Markdown({ text, className = "" }: { text: string; className?: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className={`space-y-3 text-[15px] leading-relaxed ${className}`}>
      {blocks.map((block, i) => {
        const key = `b-${i}`;
        const lines = block.split("\n");
        const isList = lines.every((l) => /^\s*[-•]\s+/.test(l) || l.trim() === "");

        if (isList) {
          return (
            <ul key={key} className="space-y-1.5 pl-1">
              {lines
                .filter((l) => l.trim())
                .map((line, j) => (
                  <li key={`${key}-${j}`} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{inline(line.replace(/^\s*[-•]\s+/, ""), `${key}-${j}`)}</span>
                  </li>
                ))}
            </ul>
          );
        }
        return <p key={key}>{inline(block, key)}</p>;
      })}
    </div>
  );
}
