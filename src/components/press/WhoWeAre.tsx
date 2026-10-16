"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Check } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { whoWeAre } from "@/data/thePress";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -15% 0px" } as const;

/** Split layout: copy on the left, a stack of editorial cards (cover · edited page · approval) on the right. */
export function WhoWeAre() {
  return (
    <section className="border-t border-line bg-white py-section">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <SectionHeader eyebrow={whoWeAre.eyebrow} title={whoWeAre.title} />
          <div className="mt-7 space-y-5 text-lead text-ink-soft">
            {whoWeAre.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <ul className="mt-8 space-y-3">
            {whoWeAre.points.map((pt, i) => (
              <Reveal as="li" key={pt} delay={0.2 + i * 0.08} x={-20} y={0} className="flex items-start gap-3 font-semibold text-ink">
                <CheckCircle2 aria-hidden className="mt-0.5 size-6 shrink-0 text-brand" />
                {pt}
              </Reveal>
            ))}
          </ul>
        </div>

        <EditorialStack />
      </div>
    </section>
  );
}

function EditorialStack() {
  return (
    <div aria-hidden className="relative mx-auto h-[26rem] w-full max-w-[34rem] sm:h-[30rem]">
      {/* Book cover */}
      <motion.div
        className="absolute left-0 top-10 w-[40%] sm:left-2"
        initial={{ opacity: 0, x: -40, rotate: -14 }}
        whileInView={{ opacity: 1, x: 0, rotate: -7 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.2, ease: EASE }}
        whileHover={{ rotate: -4, y: -8 }}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-[4px] shadow-[0_30px_50px_-24px_rgba(0,0,0,0.55)]">
          <Image src="/portfolio/books-web/touching-oblivion.jpg" alt="" fill sizes="14rem" className="object-cover" />
          <span className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/35 to-transparent" />
        </div>
      </motion.div>

      {/* Edited manuscript page */}
      <motion.div
        className="absolute right-0 top-0 w-[56%] rounded-2xl border border-line bg-white p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] sm:p-7"
        initial={{ opacity: 0, y: 40, rotate: 6 }}
        whileInView={{ opacity: 1, y: 0, rotate: 3 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
        whileHover={{ rotate: 1, y: -6 }}
      >
        <p className="eyebrow text-[0.7rem] text-ink-muted">Manuscript · Draft 2</p>
        <p className="mt-3 font-serif text-[1.45rem] font-semibold leading-tight text-ink">Chapter One</p>
        <div className="mt-4 space-y-2.5">
          {[100, 94, 88, 97, 60].map((w, i) => (
            <span key={i} className="block h-2 rounded-full bg-line" style={{ width: `${w}%` }} />
          ))}
          <span className="relative block h-2 w-[82%] rounded-full bg-brand/25">
            <span className="absolute -right-1 -top-1 h-4 w-0.5 bg-brand" />
          </span>
          {[92, 76].map((w, i) => (
            <span key={i} className="block h-2 rounded-full bg-line" style={{ width: `${w}%` }} />
          ))}
        </div>
        <p className="mt-5 rounded-lg border-l-2 border-brand bg-mist px-3 py-2 text-[0.85rem] leading-snug text-ink-soft">
          <span className="font-semibold text-brand">Editor&apos;s note:</span> a lovely opening — tighten the second
          paragraph so the reader meets Grace sooner.
        </p>
      </motion.div>

      {/* Approval card */}
      <motion.div
        className="absolute bottom-0 right-[4%] w-[80%] rounded-2xl bg-ink p-5 text-white sm:right-[8%] sm:w-[62%] sm:p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
        whileHover={{ rotate: 0, y: -6 }}
      >
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-brand">
            <Check className="size-5" strokeWidth={3} />
          </span>
          <div>
            <p className="font-semibold">Final proof approved</p>
            <p className="text-[0.9rem] text-white/65">by the author — ready to publish</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-1.5 text-center text-[0.75rem] font-semibold sm:gap-2 sm:text-[0.8rem]">
          {["Paperback", "eBook", "Audiobook"].map((f) => (
            <span key={f} className="rounded-full border border-white/20 py-1.5 text-white/85">
              {f}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
