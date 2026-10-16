import { marqueeWords } from "@/data/portfolio";

/**
 * One slow marquee of the portfolio's range on brand blue. Pauses on hover;
 * reduced-motion visitors get a still row (see animations.css).
 */
export function PortfolioMarquee() {
  const loop = [...marqueeWords, ...marqueeWords];
  return (
    <section aria-label="Genres and disciplines in the portfolio" className="overflow-hidden bg-brand py-[clamp(1.75rem,4vw,3rem)] text-white">
      <p className="sr-only">{marqueeWords.join(", ")}</p>
      <ul aria-hidden className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]" style={{ animationDuration: "60s" }}>
        {loop.map((word, i) => (
          <li key={`${word}-${i}`} className="flex shrink-0 items-center whitespace-nowrap">
            <span className="text-[clamp(2.4rem,6.6vw,6rem)] font-bold uppercase leading-none tracking-[-0.03em]">{word}</span>
            <span className="mx-[clamp(1.25rem,3vw,2.75rem)] size-[clamp(0.6rem,1.1vw,0.95rem)] rounded-full bg-white" />
          </li>
        ))}
      </ul>
    </section>
  );
}
