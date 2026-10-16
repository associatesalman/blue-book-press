"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/** Counts up from 0 to `to` the first time it scrolls into view. */
export function Counter({ to, suffix = "", duration = 1.8, className }: { to: number; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reducedMotion = useReducedMotion();

  // Once hydrated (and before it is seen), start from zero so the count-up has somewhere to go.
  useEffect(() => {
    if (ref.current && !reducedMotion && !inView) ref.current.textContent = `0${suffix}`;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reducedMotion) {
      el.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration, reducedMotion]);

  // Server/initial render shows the final value, so it is correct without JS.
  return (
    <span ref={ref} className={className}>
      {`${to}${suffix}`}
    </span>
  );
}
