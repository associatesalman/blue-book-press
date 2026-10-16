import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Tone = "light" | "blue" | "dark";

/**
 * Eyebrow + serif heading + optional intro. `tone="blue"` is for use on the
 * brand-blue sections (white text, black eyebrow pill); `tone="dark"` for
 * black sections (white text, brand-blue eyebrow).
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
  size = "default",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
  /** `xl`: larger, heavier heading and eyebrow for service pages. */
  size?: "default" | "xl";
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <div className={cn(centered && "mx-auto text-center", size === "xl" ? "max-w-4xl" : "max-w-3xl", className)}>
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "eyebrow inline-flex items-center gap-3",
              size === "xl" && "text-[0.9rem] tracking-[0.18em]",
              tone === "blue" ? "rounded-full bg-ink px-4 py-2 text-white" : "text-brand",
            )}
          >
            {tone !== "blue" && <span aria-hidden className="h-0.5 w-8 bg-brand" />}
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <Heading
          className={cn(
            "mt-5",
            size === "xl"
              ? "text-[clamp(2.5rem,5.4vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.03em]"
              : "text-headline",
            tone === "light" ? "text-ink" : "text-white",
          )}
        >
          {title}
        </Heading>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-6 text-lead",
              tone === "blue" ? "text-white/85" : tone === "dark" ? "text-white/70" : "text-ink-muted",
              centered && "mx-auto",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
