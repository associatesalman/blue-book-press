"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { pages } from "@/data/pages";
import { EASE, LineReveal } from "./motion";

/** Closing invitation on brand blue: an oversized, left-set statement and two actions. */
export function PortfolioCta() {
  return (
    <section aria-labelledby="portfolio-cta-title" className="bg-brand py-[clamp(5rem,11vw,10rem)] text-white">
      <div className="container-site grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-10">
        <div className="lg:col-span-8">
          <p className="eyebrow flex items-center gap-3 text-white/80">
            <span aria-hidden className="h-0.5 w-8 bg-white" />
            Your book, next
          </p>
          <LineReveal
            id="portfolio-cta-title"
            className="mt-6 text-[clamp(2.8rem,7vw,6.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
            lines={["Your Book Could Be", "Part of What", <span key="c" className="italic">Comes Next</span>]}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="lg:col-span-4"
        >
          <p className="text-lead text-white/85">
            Work with Blue Book Press to transform your manuscript into a professionally developed, beautifully presented, and
            reader-ready publication.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button href={pages["start-your-book"].path} variant="light" arrow className="whitespace-nowrap">
              Start Your Publishing Journey
            </Button>
            <Button href={pages["author-services"].path} variant="outline-light" className="whitespace-nowrap">
              Explore Our Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
