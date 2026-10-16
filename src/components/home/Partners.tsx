import Image from "next/image";
import { Reveal } from "@/components/common/Reveal";
import { partners, type Partner } from "@/data/partners";
import { cn } from "@/lib/cn";

/**
 * Retail & platform partners, directly under the hero: an editorial intro
 * on the left, two slow logo marquees (opposite directions) on the right.
 * Hovering a row pauses it and brings the logo to full colour.
 */
export function Partners() {
  const half = Math.ceil(partners.length / 2);
  const rows = [partners.slice(0, half), partners.slice(half)];

  return (
    <section aria-labelledby="partners-title" className="relative border-y border-line bg-mist">
      <div className="container-site grid items-center gap-8 py-12 lg:grid-cols-[22rem_1fr] lg:gap-12 lg:py-14">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-brand">
            <span aria-hidden className="h-0.5 w-8 bg-brand" />
            Distribution Partners
          </p>
          <h2 id="partners-title" className="mt-4 text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight text-ink">
            On the shelves readers already trust.
          </h2>
          <p className="mt-3 text-[1rem] leading-relaxed text-ink-muted">
            Print, eBook and audio editions made available through leading retailers and reading platforms.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="min-w-0 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {rows.map((row, r) => (
            <MarqueeRow key={r} logos={row} reverse={r === 1} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function MarqueeRow({ logos, reverse }: { logos: Partner[]; reverse?: boolean }) {
  // Two copies so the -50% translate loops seamlessly; repeated again if the row is short.
  const set = logos.length < 5 ? [...logos, ...logos] : logos;
  const loop = [...set, ...set];
  return (
    <div className="group overflow-hidden">
      <ul
        className={cn(
          "flex w-max group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {loop.map((p, i) => (
          <li
            key={`${p.name}-${i}`}
            aria-hidden={i >= set.length || undefined}
            className="mr-4 flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-line bg-white px-6 shadow-[0_6px_20px_-14px_rgba(0,0,0,0.25)] transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-16px_rgba(0,0,0,0.3)] sm:w-48"
          >
            <Image
              src={p.src}
              alt={i < logos.length ? p.name : ""}
              width={p.width}
              height={p.height}
              style={{ height: p.displayHeight }}
              className="w-auto max-w-full object-contain grayscale transition duration-300 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
