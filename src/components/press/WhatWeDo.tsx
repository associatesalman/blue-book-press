import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { pages } from "@/data/pages";
import { serviceHref } from "@/data/services";
import { formatStat, siteStats } from "@/data/stats";
import { pillarServices, pillars } from "@/data/thePress";

/** Seven service pillars, each linking to the individual services it covers. */
export function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-mist py-section">
      <div className="container-site">
        <SectionHeader
          eyebrow="What We Do"
          title="Everything a book needs, in one publishing house."
          intro="Seven areas of expertise work together on every title — so your editing, design, publishing setup, distribution, audio and marketing all point in the same direction."
        />

        <Stagger as="ul" className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <StaggerItem
                as="li"
                key={p.title}
                className="group flex flex-col rounded-3xl border border-line bg-white p-7 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_30px_50px_-30px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-13 items-center justify-center rounded-2xl bg-ink text-white transition-colors duration-300 group-hover:bg-brand">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <span className="font-serif text-[1.1rem] font-semibold text-ink-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-[1.4rem] leading-snug text-ink">{p.title}</h3>
                <p className="mt-2.5 text-[0.98rem] leading-relaxed text-ink-muted">{p.text}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {pillarServices(p).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={serviceHref(s)}
                        className="inline-flex rounded-full border border-line px-3 py-1 text-[0.85rem] font-medium text-ink-soft transition-colors hover:border-brand hover:bg-brand hover:text-white"
                      >
                        {s.navLabel ?? s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}

          <StaggerItem as="li" className="flex flex-col justify-between rounded-3xl bg-brand p-7 text-white">
            <div>
              <p className="font-serif text-[clamp(3rem,5vw,4rem)] font-semibold leading-none">{formatStat(siteStats.services)}</p>
              <p className="mt-3 text-[1.35rem] font-semibold leading-snug">publishing & author services, chosen to fit your book.</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-white/80">
                Use the complete journey or only the parts you need — every service stands on its own.
              </p>
            </div>
            <Link
              href={pages["publishing-pathways"].path}
              className="group mt-8 inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-3 font-semibold transition-colors hover:bg-white hover:text-ink"
            >
              Browse all services
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
