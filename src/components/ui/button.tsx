"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[color-mix(in_oklab,var(--accent)_85%,white)] shadow-[0_14px_36px_-16px_color-mix(in_oklab,var(--accent)_70%,transparent)]",
  secondary:
    "bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-[var(--fg)] hover:bg-[color-mix(in_oklab,var(--accent)_22%,transparent)] border border-[color-mix(in_oklab,var(--accent)_35%,transparent)]",
  ghost: "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[color-mix(in_oklab,var(--fg)_8%,transparent)]",
  outline:
    "border border-[var(--line-strong)] text-[var(--fg)] hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]",
  danger:
    "bg-[color-mix(in_oklab,var(--danger)_15%,transparent)] text-[var(--danger)] border border-[color-mix(in_oklab,var(--danger)_35%,transparent)] hover:bg-[color-mix(in_oklab,var(--danger)_24%,transparent)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-xl gap-1.5",
  md: "h-11 px-5 text-sm rounded-xl gap-2",
  lg: "h-13 px-7 text-base rounded-2xl gap-2.5",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none",
        "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-2)]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
