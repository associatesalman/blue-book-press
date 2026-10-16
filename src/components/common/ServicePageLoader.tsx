"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useLenis } from "@/components/common/Providers";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION_MS = 1600;

/** Soft cloud shapes (brand blue at low opacity, heavily blurred). x/y are % of each cloud's own size. */
const clouds = [
  { size: 46, x: -32, y: -22, delay: 0 },
  { size: 38, x: 30, y: -28, delay: 0.08 },
  { size: 42, x: -26, y: 30, delay: 0.16 },
  { size: 36, x: 34, y: 26, delay: 0.12 },
  { size: 30, x: 0, y: 0, delay: 0.2 },
];
const pct = (n: number) => `${n}%`;

const LoaderContext = createContext(true);

/**
 * True once the service-page loader has finished (always true outside one).
 * Heroes use it to start their entrance as the clouds part.
 */
export const useServicePageReady = () => useContext(LoaderContext);

/**
 * Cloud intro for SERVICE pages only — category hubs and solo service pages.
 * Mounted from `template.tsx` in each service-category route folder so it
 * replays on every navigation into those pages, and never on Home, The Press
 * or other general pages. ~1.6s; skipped for reduced-motion visitors.
 */
export function ServicePageLoader({ label, children }: { label: string; children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();
  const [show, setShow] = useState(true);

  // Hold page scrolling while the intro plays (Lenis may initialise a moment later).
  useEffect(() => {
    if (show && !reducedMotion) lenis?.stop();
    else lenis?.start();
  }, [show, reducedMotion, lenis]);

  useEffect(() => {
    if (reducedMotion) {
      setShow(false);
      return;
    }
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      root.style.overflow = "";
      setShow(false);
    }, DURATION_MS);
    return () => {
      window.clearTimeout(t);
      root.style.overflow = "";
    };
  }, [reducedMotion]);

  return (
    <LoaderContext.Provider value={!show}>
      <AnimatePresence>
        {show && !reducedMotion && (
          <motion.div
            key="service-loader"
            aria-hidden
            className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-white"
            exit={{ opacity: 0, transition: { duration: 0.9, ease: EASE, delay: 0.15 } }}
          >
            {clouds.map((c, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-brand/[0.13] blur-[70px]"
                style={{
                  width: `${c.size}vmax`,
                  height: `${c.size}vmax`,
                  left: "50%",
                  top: "50%",
                  marginLeft: `-${c.size / 2}vmax`,
                  marginTop: `-${c.size / 2}vmax`,
                }}
                initial={{ opacity: 0, scale: 0.55, x: pct(c.x), y: pct(c.y) }}
                animate={{ opacity: 1, scale: 1, x: pct(c.x * 0.55), y: pct(c.y * 0.55) }}
                exit={{ opacity: 0, scale: 1.6, x: pct(c.x * 2.4), y: pct(c.y * 2.4), transition: { duration: 1, ease: EASE } }}
                transition={{ duration: 1.4, ease: EASE, delay: c.delay }}
              />
            ))}

            <motion.div
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.4, ease: EASE } }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            >
              <Image src="/logo-trimmed.png" alt="" width={387} height={240} priority className="h-16 w-auto" />
              <p className="eyebrow mt-5 text-ink">{label}</p>
              <span className="mt-4 block h-0.5 w-40 overflow-hidden rounded-full bg-line">
                <motion.span
                  className="block h-full origin-left bg-brand"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
                />
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </LoaderContext.Provider>
  );
}
