import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { FeatureVideo } from "@/components/common/FeatureVideo";
import { ImageReveal, Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { asMedia, asServices } from "@/data/authorServices";

/**
 * 4 · All ten Author Services. The silent studio video stays pinned beside the
 * cards on desktop (it is a 9:16 portrait clip, so it sits naturally as a tall
 * column); each card links to its solo service page.
 */
export function AuthorServicesShowcase() {
  return (
    <section id="services" className="scroll-mt-[var(--spacing-header)] bg-white py-section">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <SectionHeader size="xl" eyebrow="The Services" title="Ten services. Every page considered." />
          <Reveal delay={0.12}>
            <p className="text-lead text-ink-muted">
              Choose a single service or combine several — editorial, design and setup work are coordinated so each
              stage hands cleanly to the next. Every service has its own page with the full process.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,21rem)_1fr] lg:gap-12 xl:grid-cols-[minmax(0,23rem)_1fr] xl:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)] lg:self-start">
            <ImageReveal>
              <figure className="mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:max-w-none">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-mist p-1.5 shadow-[0_40px_80px_-45px_rgba(31,79,224,0.55)] ring-1 ring-brand/25 lg:max-h-[calc(100svh-var(--spacing-header)-7rem)] lg:w-full">
                  <div className="h-full overflow-hidden rounded-[1.6rem]">
                    <FeatureVideo src={asMedia.video.src} label="Blue Book Press author services in the studio" />
                  </div>
                </div>
                <figcaption className="mt-4 flex items-center gap-2.5 text-[0.92rem] text-ink-muted">
                  <span aria-hidden className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/60" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand" />
                  </span>
                  Inside the studio — manuscripts becoming books.
                </figcaption>
              </figure>
            </ImageReveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {asServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal as="li" key={s.slug} delay={(i % 2) * 0.1} className="flex">
                  <Link
                    href={s.href}
                    data-cursor="hover"
                    className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 transition-[border-color,translate,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_30px_60px_-40px_rgba(31,79,224,0.6)] sm:p-7"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-brand/20 text-brand transition-colors duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                        <Icon aria-hidden className="size-5.5" />
                      </span>
                      <span className="font-serif text-[0.95rem] font-semibold tabular-nums text-ink-muted transition-colors duration-500 group-hover:text-brand">
                        {String(s.index).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="relative mt-6 text-[1.35rem] font-semibold leading-snug text-ink">{s.title}</h3>
                    <p className="relative mt-2 leading-relaxed text-ink-muted">{s.text}</p>
                    <ul className="relative mt-5 space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[0.95rem] text-ink-soft">
                          <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.95rem] font-semibold text-ink transition-colors duration-300 group-hover:text-brand">
                      View service
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
