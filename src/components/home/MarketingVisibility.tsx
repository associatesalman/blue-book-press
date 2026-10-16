import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getCategory } from "@/data/categories";
import { pages } from "@/data/pages";
import { getServicesByCategory, serviceHref } from "@/data/services";

/** Blue section #2 — marketing services, with Book Marketing as the black lead panel. */
export function MarketingVisibility() {
  const category = getCategory("marketing-visibility");
  const [lead, ...rest] = getServicesByCategory("marketing-visibility");
  const LeadIcon = lead.icon;

  return (
    <section className="bg-brand py-section text-white">
      <div className="container-site grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            tone="blue"
            eyebrow={category.title}
            title="A great book deserves to be found."
            intro="Publishing is the beginning, not the end. We help readers discover your book with honest, well-planned marketing — never hype, never pressure."
          />
          <Reveal delay={0.2} className="mt-10">
            <Link
              href={serviceHref(lead)}
              className="group block rounded-3xl bg-ink p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <LeadIcon aria-hidden className="size-9 text-white" />
              <p className="mt-5 font-serif text-[1.75rem] font-semibold leading-tight">{lead.title}</p>
              <p className="mt-3 leading-relaxed text-white/75">{lead.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold underline decoration-brand decoration-2 underline-offset-[6px]">
                Plan my launch
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>

        <div>
          <Stagger as="ul" className="grid sm:grid-cols-2 sm:gap-x-10" stagger={0.07}>
            {rest.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem as="li" key={s.slug} className="border-t border-white/25">
                  <Link href={serviceHref(s)} className="group block py-8">
                    <span className="flex size-12 items-center justify-center rounded-full bg-white text-brand transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
                      <Icon aria-hidden className="size-5.5" />
                    </span>
                    <span className="mt-5 flex items-center gap-2 font-serif text-[1.45rem] font-semibold">
                      {s.title}
                      <ArrowRight
                        aria-hidden
                        className="size-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </span>
                    <span className="mt-2 block leading-relaxed text-white/80">{s.summary}</span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
          <div className="mt-6 border-t border-white/25 pt-10">
            <Button href={pages["marketing-visibility"].path} variant="light" arrow>
              All Marketing Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
