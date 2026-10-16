"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Long, soft ease-out — quick to start, gentle to settle. */
const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

type Tag = "div" | "li" | "p" | "span" | "ul" | "ol" | "section" | "figure";

/** Fade + gentle rise into view, once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  as = "div",
  ...rest
}: {
  children?: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  as?: Tag;
} & Omit<HTMLMotionProps<"div">, "children">) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y, x, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration: 1.05, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
};

/** Parent that staggers its <StaggerItem> children into view. */
export function Stagger({
  children,
  stagger = 0.08,
  as = "div",
  ...rest
}: { children: ReactNode; stagger?: number; as?: Tag } & Omit<HTMLMotionProps<"div">, "children">) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp variants={container} custom={stagger} initial="hidden" whileInView="show" viewport={VIEWPORT} {...rest}>
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  as = "div",
  ...rest
}: { children: ReactNode; as?: Tag } & Omit<HTMLMotionProps<"div">, "children">) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp variants={item} {...rest}>
      {children}
    </Comp>
  );
}

/** Thin rule that draws itself left → right. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={`block h-px origin-left ${className ?? "bg-line"}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}

/** Image wrapper that unveils with a soft upward wipe. */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(12% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
