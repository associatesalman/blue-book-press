"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE, Kicker, LineReveal, useReducedMotionSafe } from "./motion";

const VIDEO = "/portfolio/portfolio-videos/portfolio-video-1-web.mp4"; // 1080×1920, 5 s, 3.5 MB

const STEPS = [
  { n: "01", title: "Manuscript", text: "Read for structure, voice and audience before anything is designed." },
  { n: "02", title: "Edition", text: "Edited, typeset and dressed in a cover that states its promise in seconds." },
  { n: "03", title: "Shelf", text: "Metadata, distribution and positioning, so the book reaches its readers." },
];

/**
 * Cinematic introduction: oversized statement on white beside a tall
 * portrait film that scales up as it arrives and hangs over the edge into
 * the black collection below. The film is silent, loops, never shows
 * controls, and only plays while near the viewport.
 */
export function PortfolioReel() {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.86, 1]);
  const plate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 0]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    if (reduced) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      rootMargin: "200px 0px",
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section aria-labelledby="reel-title" className="relative z-10 bg-white pt-[clamp(4.5rem,9vw,8rem)] pb-section lg:pb-0">
      <div className="container-site grid gap-y-14 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-6 lg:pb-[clamp(6rem,12vw,10rem)]">
          <Kicker>Inside the work</Kicker>
          <LineReveal
            id="reel-title"
            className="mt-7 text-[clamp(2.6rem,5.6vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink"
            lines={[
              "From manuscript",
              "to the shelf",
              <span key="c" className="italic text-brand">
                it was written for.
              </span>,
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="mt-8 max-w-lg text-lead text-ink-muted"
          >
            Every book in this portfolio began as a file and a conversation. Editors, designers and a publishing team shaped
            each one into an edition that belongs on its shelf.
          </motion.p>

          <ol className="mt-14 grid gap-px border-y border-line sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.1 }}
                className="border-line py-6 sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0"
              >
                <span className="font-serif text-[2.6rem] font-semibold leading-none text-brand">{s.n}</span>
                <p className="mt-3 font-serif text-[1.35rem] font-semibold text-ink">{s.title}</p>
                <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-muted">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Film: layered over a black plate, overlapping into the next section on desktop */}
        <div className="relative lg:col-span-5 lg:col-start-8 lg:-mb-[clamp(8rem,16vw,14rem)]">
          <p className="eyebrow mb-4 flex items-center justify-between text-[0.72rem] text-ink-muted">
            <span>Studio film</span>
            <span className="tabular-nums">Silent · Loop</span>
          </p>
          <div ref={frame} className="relative mx-auto max-w-[24rem] lg:max-w-none">
            <motion.span aria-hidden style={{ y: plate }} className="absolute -bottom-4 -right-4 left-6 top-10 bg-ink" />
            <motion.div style={{ scale }} className="relative aspect-[9/16] origin-top overflow-hidden bg-black">
              <video
                ref={video}
                src={VIDEO}
                aria-label="Studio film from the Blue Book Press portfolio"
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                disableRemotePlayback
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
