"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { crafts } from "@/data/portfolio";
import { EASE, Kicker, LineReveal, MaskReveal, Parallax } from "./motion";

/**
 * The complete craft: a pinned oversized heading with the print mockup on
 * the left, and six large editorial rows on the right, each linking to the
 * service behind it.
 */
export function PublishingCraft() {
  return (
    <section aria-labelledby="craft-title" className="bg-white py-section">
      <div className="container-site grid gap-x-[clamp(2.5rem,6vw,6rem)] gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Kicker>The complete craft</Kicker>
            <LineReveal
              id="craft-title"
              className="mt-6 text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-ink"
              lines={[
                "Everything",
                "on this page,",
                <span key="c" className="italic text-brand">
                  done in-house.
                </span>,
              ]}
            />
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-muted">
              Each discipline behind the portfolio is a service you can use for your own book.
            </p>
            <MaskReveal className="relative mt-10 hidden aspect-[1068/1100] max-w-[24rem] bg-mist lg:block" delay={0.1}>
              <Parallax speed={24} className="absolute inset-[-6%]">
                <Image
                  src="/portfolio/portfolio-mockup-3books.webp"
                  alt="Three hardcover editions from the portfolio, including A Tempting Arrangement by J. Wilder"
                  fill
                  sizes="24rem"
                  className="object-cover"
                />
              </Parallax>
            </MaskReveal>
          </div>
        </div>

        <ol className="border-t-2 border-ink lg:col-span-7">
          {crafts.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 2) * 0.06 }}
              className="border-b border-line"
            >
              <Link href={c.href} className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 py-[clamp(1.75rem,3vw,2.5rem)] sm:gap-x-8">
                <span className="font-serif text-[clamp(1.1rem,1.6vw,1.4rem)] font-semibold tabular-nums text-ink-muted transition-colors duration-300 group-hover:text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-2">
                    {c.title}
                  </span>
                  <span className="mt-3 block max-w-xl text-[1rem] leading-relaxed text-ink-soft">{c.text}</span>
                  <span className="mt-2 block text-[0.88rem] text-ink-muted">
                    <span className="font-semibold text-ink">Seen in:</span> {c.seen}
                  </span>
                </span>
                <span className="mt-1 flex size-12 items-center justify-center rounded-full border-2 border-ink/15 text-ink transition-all duration-300 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <ArrowUpRight aria-hidden className="size-5" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
