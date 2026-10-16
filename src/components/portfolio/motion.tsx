"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Long, soft ease-out shared by every portfolio animation. */
export const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * prefers-reduced-motion, but false until after hydration so the server and
 * first client render match (framer's hook resolves instantly on the client).
 */
export function useReducedMotionSafe() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduced;
}

/**
 * Heading whose lines rise one by one out of a mask. Pass each line as a
 * separate node so breaks are controlled rather than left to the browser.
 */
export function LineReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  onMount = false,
  id,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Animate immediately (hero) instead of when scrolled into view. */
  onMount?: boolean;
  id?: string;
}) {
  // The heading itself is the in-view trigger: the masked lines start fully
  // clipped, so observing them directly would never fire.
  const Comp = motion[Tag];
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT };
  return (
    <Comp id={id} className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden pb-[0.1em] -mb-[0.1em]", lineClassName)}>
          <motion.span
            className="block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.1 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/** Flat image layer that drifts against the scroll. `speed` is the travel in px either side. */
export function Parallax({ children, speed = 60, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [speed, -speed]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Image mask that opens upward while its content settles from a slight zoom. */
export function MaskReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  /** Let children hang outside the box once revealed (layered compositions). */
  bleed?: boolean;
}) {
  const from = { up: "inset(100% 0% 0% 0%)", left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)" }[direction];
  const to = bleed ? "inset(-25% -25% -25% -25%)" : "inset(0% 0% 0% 0%)";
  return (
    <motion.div
      className={cn(!bleed && "overflow-hidden", className)}
      initial={{ clipPath: from }}
      whileInView={{ clipPath: to }}
      viewport={VIEWPORT}
      transition={{ duration: 1.25, ease: EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: bleed ? 1 : 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.6, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Small uppercase section label with a brand rule, used at the top of each section. */
export function Kicker({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark" | "blue"; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE }}
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "light" ? "text-brand" : tone === "dark" ? "text-white/70" : "text-white",
        className,
      )}
    >
      <span aria-hidden className={cn("h-0.5 w-8", tone === "blue" ? "bg-white" : "bg-brand")} />
      {children}
    </motion.p>
  );
}
