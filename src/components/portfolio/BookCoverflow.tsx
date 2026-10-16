"use client";

import Image from "next/image";
import { motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "./motion";

export type CoverflowItem = { slug: string; title: string; author: string; cover: string };

/**
 * A physical book built from CSS 3D faces: the real cover on the front, a
 * spine sampled from the cover's left edge, and page blocks. The cover stays
 * a crisp HTML image at every angle. Used only inside the portfolio sliders.
 */
export function Book3D({ cover, priority }: { cover: string; priority?: boolean }) {
  return (
    <div className="book3d">
      <div className="book3d__front">
        <Image src={cover} alt="" fill quality={95} priority={priority} sizes="(min-width: 1024px) 300px, 220px" className="object-cover" draggable={false} />
        <span aria-hidden className="book3d__sheen" />
      </div>
      <div aria-hidden className="book3d__spine" style={{ backgroundImage: `url("${cover}")` }} />
      <div aria-hidden className="book3d__pages" />
      <div aria-hidden className="book3d__top" />
      <div aria-hidden className="book3d__bottom" />
      <div aria-hidden className="book3d__back" />
    </div>
  );
}

/** Horizontal offset of a slide `o` positions away from the active one, in book widths. */
const xFor = (o: number, gap: number) => {
  const a = Math.abs(o);
  const d = a <= 1 ? a * gap : gap + (a - 1) * gap * 0.62;
  return Math.sign(o) * d;
};

/**
 * Coverflow stage shared by the Best Selling and Upcoming sliders. The active
 * book faces the reader with a slight turn that shows its spine; neighbours
 * angle towards it in depth. Drag / swipe, click a neighbour, or use the
 * arrow keys while the stage is focused.
 */
export function BookCoverflow({
  items,
  active,
  onChange,
  label,
  tone = "light",
  gap = 1.05,
  compact,
  className,
}: {
  items: CoverflowItem[];
  active: number;
  onChange: (index: number) => void;
  label: string;
  tone?: "light" | "dark";
  /** Distance between the active book and its neighbours, in book widths. */
  gap?: number;
  /** Slightly smaller books (Upcoming Releases). */
  compact?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();
  const stage = useRef<HTMLDivElement>(null);
  const [bookWidth, setBookWidth] = useState(240);
  const [drag, setDrag] = useState(0);
  const moved = useRef(false);
  // Pointer tilt on the active book (mouse only): x, y in -1…1.
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => {
      const w = el.querySelector<HTMLElement>(".book3d")?.offsetWidth;
      if (w) setBookWidth(w);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = (i: number) => onChange(Math.max(0, Math.min(items.length - 1, i)));
  const spacing = bookWidth * gap;

  const onPan = (_: PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 6) moved.current = true;
    const frac = -info.offset.x / spacing;
    // Rubber-band past the first and last book.
    const target = active + frac;
    const over = target < 0 ? target : target > items.length - 1 ? target - (items.length - 1) : 0;
    setDrag(frac - over * 0.7);
  };
  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    let next = Math.round(active + drag);
    if (next === active && Math.abs(info.velocity.x) > 350) next = active + (info.velocity.x < 0 ? 1 : -1);
    setDrag(0);
    go(next);
    window.setTimeout(() => (moved.current = false), 0);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse" || drag !== 0 || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width) * 2 - 1, y: ((e.clientY - r.top) / r.height) * 2 - 1 });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: items.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    go(keys[e.key]);
  };

  return (
    <div className={className}>
      <motion.div
        ref={stage}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${label} — use the arrow keys to browse`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPan={onPan}
        onPanEnd={onPanEnd}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        className={cn(
          "coverflow relative mx-auto w-full cursor-grab touch-pan-y select-none outline-offset-8 active:cursor-grabbing",
          compact && "coverflow--compact",
        )}
      >
        {items.map((item, i) => {
          const o = i - active - drag;
          const a = Math.abs(o);
          const visible = a < 3.2;
          const focus = 1 - Math.min(a, 1);
          const turn = -Math.max(-1, Math.min(1, o)) * 36 + (14 + tilt.x * 9) * focus;
          return (
            <motion.div
              key={item.slug}
              className="coverflow__slide"
              initial={false}
              animate={{
                x: xFor(o, spacing),
                z: -Math.min(a, 3) * bookWidth * 0.55,
                rotateY: reduced ? 0 : turn,
                rotateX: reduced ? 0 : -tilt.y * 5 * focus,
                scale: 1 + 0.04 * focus,
                opacity: visible ? (a > 2.2 ? Math.max(0, 1 - (a - 2.2)) : 1) : 0,
              }}
              transition={drag !== 0 ? { duration: 0 } : { type: "spring", stiffness: 110, damping: 22, mass: 1 }}
              style={{ zIndex: 100 - Math.round(a * 10), pointerEvents: visible ? "auto" : "none" }}
            >
              <button
                type="button"
                tabIndex={-1}
                aria-hidden={i !== active}
                aria-label={i === active ? `${item.title} by ${item.author}` : `Show ${item.title}`}
                onClick={() => !moved.current && go(i)}
                className="block"
              >
                <Book3D cover={item.cover} priority={false} />
              </button>
              <span aria-hidden className={cn("coverflow__shadow", tone === "dark" && "coverflow__shadow--dark")} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/** Previous / next buttons plus a slide counter. */
export function CoverflowControls({
  count,
  active,
  onChange,
  label,
  tone = "light",
  className,
}: {
  count: number;
  active: number;
  onChange: (index: number) => void;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const btn = cn(
    "flex size-13 items-center justify-center rounded-full border-2 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-30",
    tone === "light"
      ? "border-ink text-ink enabled:hover:bg-ink enabled:hover:text-white"
      : "border-white/70 text-white enabled:hover:bg-white enabled:hover:text-ink",
  );
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button type="button" className={btn} onClick={() => onChange(active - 1)} disabled={active === 0} aria-label={`Previous ${label}`}>
        <ArrowLeft aria-hidden className="size-5" />
      </button>
      <p className={cn("min-w-[4.5rem] text-center font-serif text-[1.1rem] tabular-nums", tone === "light" ? "text-ink" : "text-white")}>
        <span className="font-semibold">{String(active + 1).padStart(2, "0")}</span>
        <span className={tone === "light" ? "text-ink-muted" : "text-white/50"}> / {String(count).padStart(2, "0")}</span>
      </p>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(active + 1)}
        disabled={active === count - 1}
        aria-label={`Next ${label}`}
      >
        <ArrowRight aria-hidden className="size-5" />
      </button>
    </div>
  );
}
