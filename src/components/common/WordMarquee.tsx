import type { ComponentType } from "react";
import { cn } from "@/lib/cn";

export type MarqueeItem = { label: string; icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }> };

/**
 * Huge marquee placed under a service-category hero. One slow row of
 * display-size type on white, alternating ink and brand blue, each label led
 * by its icon in a thin blue ring. Pauses on hover; edges fade into the page.
 */
export function WordMarquee({ items, label, duration = 70 }: { items: MarqueeItem[]; label: string; duration?: number }) {
  const loop = [...items, ...items];
  return (
    <section aria-label={label} className="relative overflow-hidden border-y border-line bg-white py-[clamp(1.75rem,4vw,3.25rem)]">
      <ul
        className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((item, i) => {
          const Icon = item.icon;
          return (
            <li
              key={`${item.label}-${i}`}
              aria-hidden={i >= items.length || undefined}
              className="flex shrink-0 items-center gap-[clamp(0.9rem,2vw,1.75rem)] whitespace-nowrap pr-[clamp(2.5rem,6vw,5.5rem)]"
            >
              <span className="flex size-[clamp(2.75rem,5.5vw,4.75rem)] shrink-0 items-center justify-center rounded-full border-2 border-brand/25 text-brand">
                <Icon aria-hidden className="size-[42%]" />
              </span>
              <span
                className={cn(
                  "text-[clamp(2.6rem,7.2vw,6.75rem)] font-bold leading-none tracking-[-0.04em]",
                  // Colour by position in the original list so the duplicated half matches exactly at the loop seam.
                  (i % items.length) % 2 === 0 ? "text-ink" : "text-brand",
                )}
              >
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[8vw] bg-gradient-to-r from-white to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[8vw] bg-gradient-to-l from-white to-transparent" />
    </section>
  );
}
