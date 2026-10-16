"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Silent, looping background-style video. Always muted (no audio track is
 * ever played), autoplays only where the browser allows, and pauses while
 * off-screen. Reduced-motion visitors get a still frame with controls.
 */
export function FeatureVideo({ src, label, className }: { src: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    video.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      controls={!!reduced}
      disablePictureInPicture
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
