import { DrawLine, Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { trustIntro } from "@/data/home";
import { cn } from "@/lib/cn";

export function TrustIntro() {
  return (
    <section className="bg-white py-section">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-brand">
                <span aria-hidden className="h-0.5 w-8 bg-brand" />
                {trustIntro.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-headline text-ink">{trustIntro.title}</h2>
            </Reveal>
          </div>
          <div className="space-y-5 text-lead text-ink-soft lg:pt-12">
            {trustIntro.text.map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <DrawLine className="mt-11 bg-ink" />
        <Stagger as="ul" className="grid grid-cols-2 lg:grid-cols-3">
          {trustIntro.facts.map((f, i) => (
            <StaggerItem
              as="li"
              key={f.label}
              className={cn(
                "border-line py-8 pr-6",
                i % 2 === 1 && "border-l pl-6",
                i >= 2 && "border-t",
                i % 3 === 0 ? "lg:border-l-0 lg:pl-0" : "lg:border-l lg:pl-8",
                i >= 3 ? "lg:border-t" : "lg:border-t-0",
              )}
            >
              <p className="font-serif text-[clamp(3rem,6vw,4.5rem)] font-semibold leading-none text-brand">{f.value}</p>
              <p className="mt-3 max-w-[14rem] text-[1rem] leading-snug text-ink-soft">{f.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
