import { Info } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ppDistribution } from "@/data/publishingPathways";

/** 7 · Global distribution — platform icon tiles beside the explanation and shelf-placement note. */
export function PathwaysDistribution() {
  return (
    <section className="bg-white py-section">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeader size="xl" eyebrow={ppDistribution.eyebrow} title={ppDistribution.title} />
          <Reveal delay={0.12}>
            <p className="mt-6 text-lead text-ink-muted">{ppDistribution.text}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 flex items-start gap-3 rounded-2xl border border-line px-5 py-4 text-[0.95rem] leading-relaxed text-ink-soft">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
              {ppDistribution.note}
            </p>
          </Reveal>
        </div>

        <Stagger as="ul" className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" stagger={0.06}>
          {ppDistribution.platforms.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem
                as="li"
                key={p.name}
                className="group flex aspect-square flex-col items-center justify-center gap-4 rounded-3xl border border-line bg-white p-4 text-center transition-[border-color,translate,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_24px_50px_-34px_rgba(31,79,224,0.55)]"
              >
                <Icon aria-hidden className="size-9 text-ink transition-[color,scale] duration-500 group-hover:scale-110 group-hover:text-brand sm:size-10" />
                <span className="text-[0.9rem] font-semibold leading-tight text-ink-soft">{p.name}</span>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
