"use client";

import { useEffect, useRef, useState } from "react";

/** Elements that make the cursor expand. Cards opt in with `data-cursor="hover"`. */
const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, summary, [data-cursor="hover"]';
/** Sections with a dark (brand-blue or black) background, where the ring switches to white. */
const DARK = ".bg-brand, .bg-ink";

/**
 * Desktop-only trailing cursor: a white circle with a dotted brand-blue ring
 * that eases after the pointer and grows over interactive elements.
 *
 * Usability first: the native cursor stays visible (precise clicks and text
 * selection), the ring uses `mix-blend-mode: multiply` so its white fill
 * never hides the content beneath it, and it is never mounted on touch /
 * coarse-pointer devices.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        // First move: appear in place instead of sliding in from a corner.
        pos.x = target.x;
        pos.y = target.y;
        visible = true;
        ring.style.opacity = "1";
      }
      const el = e.target as Element | null;
      const hovering = !!el?.closest?.(INTERACTIVE);
      targetScale = hovering ? 1.75 : 1;
      ring.dataset.hover = String(hovering);
      ring.dataset.dark = String(!!el?.closest?.(DARK));
    };
    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
    };
    const onDown = () => (targetScale = Math.max(0.8, targetScale * 0.85));
    const onUp = () => (targetScale = ring.dataset.hover === "true" ? 1.75 : 1);

    const tick = () => {
      // Exponential smoothing gives the soft trailing motion.
      const k = reduced ? 1 : 0.2;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      scale += (targetScale - scale) * (reduced ? 1 : 0.18);
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ringRef} aria-hidden className="custom-cursor" style={{ opacity: 0 }} />;
}
