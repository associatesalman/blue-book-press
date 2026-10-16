import { CalendarCheck, Mail } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { authorSupport } from "@/data/home";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { Testimonials } from "./Testimonials";

const callSteps = [
  "Tell us about your book and what you hope for it.",
  "We answer your questions and explain your options.",
  "You receive a clear, written recommendation — no obligation.",
];

/** Author confidence: the support promise, what a first call looks like, and real testimonials when available. */
export function AuthorSupport() {
  return (
    <section className="bg-white py-section">
      <div className="container-site">
        <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeader eyebrow={authorSupport.eyebrow} title={authorSupport.title} intro={authorSupport.text} />
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {authorSupport.promises.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title} delay={0.1 + i * 0.1} className="border-l-2 border-brand pl-6">
                    <Icon aria-hidden className="size-7 text-brand" />
                    <p className="mt-4 text-[1.2rem] font-semibold text-ink">{p.title}</p>
                    <p className="mt-2 leading-relaxed text-ink-muted">{p.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={0.15} className="rounded-3xl bg-ink p-8 text-white sm:p-10">
            <p className="eyebrow text-white/60">Your first conversation</p>
            <p className="mt-4 font-serif text-[1.9rem] font-semibold leading-tight">What happens on a free consultation?</p>
            <ol className="mt-8 space-y-6">
              {callSteps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand font-semibold">
                    {i + 1}
                  </span>
                  <span className="pt-1 leading-relaxed text-white/85">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col gap-4">
              <Button href={pages["book-consultation"].path} className="w-full hover:bg-white hover:text-ink">
                <CalendarCheck aria-hidden className="size-5" />
                Book a Free Consultation
              </Button>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center gap-2 text-white/75 transition-colors hover:text-white"
              >
                <Mail aria-hidden className="size-5" />
                or email {site.email}
              </a>
            </div>
          </Reveal>
        </div>

        <Testimonials />
      </div>
    </section>
  );
}
