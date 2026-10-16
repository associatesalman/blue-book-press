import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { mvCta } from "@/data/marketingVisibility";

/** 7 · Closing CTA on brand blue, with the language of visibility drifting slowly behind it. */
export function MarketingClosing() {
  const words = [...mvCta.marquee, ...mvCta.marquee];
  return (
    <section className="relative overflow-hidden bg-brand py-[clamp(6rem,12vw,11rem)] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden">
        <div className="flex w-max animate-marquee motion-reduce:animate-none" style={{ animationDuration: "80s" }}>
          {words.map((w, i) => (
            <span key={i} className="px-8 font-serif text-[clamp(6rem,14vw,13rem)] italic leading-none text-white/[0.06]">
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="container-site relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-5xl text-[clamp(2.7rem,6.4vw,6rem)] font-bold leading-[0.98] tracking-[-0.045em]">{mvCta.title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-2xl text-lead text-white/80">{mvCta.text}</p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={mvCta.primary.href} variant="light" arrow>
              {mvCta.primary.label}
            </Button>
            <Button href={mvCta.secondary.href} variant="outline-light">
              {mvCta.secondary.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
