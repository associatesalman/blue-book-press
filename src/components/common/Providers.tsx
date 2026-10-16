"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const LenisContext = createContext<Lenis | null>(null);

/** The site-wide Lenis instance (null when smooth scrolling is off). */
export const useLenis = () => useContext(LenisContext);

/**
 * Gentle site-wide smooth scrolling (Lenis, ~10 KB). Mouse-wheel and
 * keyboard scrolling are eased; touch devices keep native scrolling; it is
 * disabled entirely for visitors who prefer reduced motion.
 */
function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    // lerp-based easing follows the wheel continuously (no fixed-duration lag), which reads as smoother.
    const instance = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      autoRaf: true,
      // Anchors honour CSS scroll-padding-top + scroll-margin-top, like native hash scrolling.
      anchors: true,
    });
    setLenis(instance);
    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  // New page → start at the top immediately (unless the link targets an anchor).
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** App-wide client providers. Animations respect the OS "reduce motion" setting. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
