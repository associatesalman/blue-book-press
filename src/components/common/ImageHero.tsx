"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/common/Button";
import { useServicePageReady } from "@/components/common/ServicePageLoader";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

type Link = { label: string; href: string };

export type ImageHeroContent = {
  image: { src: string; alt: string; width: number; height: number };
  /** Heading split into words, so each can rise in turn. */
  title: string[];
  /** Words from this index on are set in brand blue. */
  accentFrom: number;
  subtitle: string;
  primary: Link;
  secondary: Link;
  /** "split" (default): heading beside the text. "center": one centred column. */
  align?: "split" | "center";
};

/**
 * Full-bleed artwork hero for service category pages. The artwork carries its
 * own lettering, so it is left clean edge to edge (no text laid over it); the
 * page heading, subtitle and CTAs sit in a white editorial band beneath. The
 * frame takes the artwork's exact aspect ratio at every width, so nothing
 * important is ever cropped. Its entrance waits for the service-page loader.
 */
export function ImageHero({ content }: { content: ImageHeroContent }) {
  const { image, title, accentFrom, subtitle, primary, secondary, align = "split" } = content;
  const center = align === "center";
  const ready = useServicePageReady();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Gentle push-in as the hero scrolls away (scale only, so no edge ever shows).
  const zoom = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.04]);

  return (
    <section className="bg-white">
      <div
        ref={ref}
        className="relative w-full overflow-hidden bg-white"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={ready ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <motion.div className="absolute inset-0" style={{ scale: zoom }}>
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduced ? 1 : 1.12 }}
              animate={ready ? { scale: 1 } : undefined}
              transition={{ duration: 2.2, ease: EASE }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                quality={95}
                sizes="100vw"
                className="object-cover object-[50%_58%]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div
        className={cn(
          "container-site grid gap-8 pb-[clamp(3rem,6vw,5rem)] pt-[clamp(2.5rem,5vw,4.5rem)]",
          center ? "justify-items-center text-center" : "lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16",
        )}
      >
        <h1 className={cn("text-[clamp(2.5rem,5.6vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink", center && "max-w-5xl")}>
          {title.map((word, i) => (
            <span key={word + i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={cn("inline-block", i >= accentFrom && "text-brand")}
                initial={{ y: "105%" }}
                animate={ready ? { y: "0%" } : undefined}
                transition={{ duration: 1, ease: EASE, delay: 0.55 + i * 0.07 }}
              >
                {word}
              </motion.span>
              {i < title.length - 1 && " "}
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 1 }}
        >
          <p className={cn("text-lead text-ink-soft", center && "mx-auto max-w-2xl")}>{subtitle}</p>
          <div className={cn("mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap", center && "sm:justify-center")}>
            <Button href={primary.href} arrow>
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="outline">
              {secondary.label}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
