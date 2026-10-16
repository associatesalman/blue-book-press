import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { LineReveal } from "@/components/portfolio/motion";
import { pages } from "@/data/pages";
import { site } from "@/data/site";

const explore = [
  { label: "Publishing Pathways", text: "Routes from manuscript to marketplace.", href: pages["publishing-pathways"].path },
  { label: "Author Services", text: "Editing, design, formatting and setup.", href: pages["author-services"].path },
  { label: "Marketing & Visibility", text: "Helping readers discover your book.", href: pages["marketing-visibility"].path },
];

/** Contact section after the FAQ accordion: direct routes to a person, plus service links. */
export function StillNeedHelp() {
  return (
    <section aria-labelledby="still-title" className="bg-brand py-[clamp(4rem,8vw,6.5rem)] text-white">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-white/80">
            <span aria-hidden className="h-0.5 w-8 bg-white" />
            We're here to help
          </p>
          <LineReveal
            id="still-title"
            className="mt-6 text-[clamp(2.3rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
            lines={["Still Have Questions?"]}
          />
          <Reveal delay={0.15} y={18}>
            <p className="mt-6 max-w-xl text-lead text-white/85">
              Tell us where you are in your publishing journey, and our team will help you understand the most suitable next step.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={pages["start-your-book"].path} variant="light" arrow className="whitespace-nowrap">
                Contact Us
              </Button>
              <Button href={pages["book-consultation"].path} variant="outline-light" className="whitespace-nowrap">
                <Phone aria-hidden className="size-4.5" />
                Book a Phone Consultation
              </Button>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="mt-7 inline-flex items-center gap-2.5 text-[1.05rem] font-semibold text-white underline decoration-white/40 decoration-2 underline-offset-[6px] transition-colors hover:decoration-white"
            >
              <Mail aria-hidden className="size-5" />
              {site.email}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-5 lg:pt-3">
          <p className="eyebrow text-[0.75rem] text-white/70">Explore our services</p>
          <ul className="mt-4 border-t border-white/30">
            {explore.map((l) => (
              <li key={l.href} className="border-b border-white/30">
                <Link href={l.href} className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block font-serif text-[1.35rem] font-semibold leading-tight">{l.label}</span>
                    <span className="mt-1 block text-[0.95rem] text-white/75">{l.text}</span>
                  </span>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-white/60 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-brand">
                    <ArrowUpRight aria-hidden className="size-5 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#ask"
            className="group mt-6 inline-flex items-center gap-2 font-semibold text-white"
          >
            Or send us a question below
            <ArrowRight aria-hidden className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
