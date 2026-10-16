"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const cta = primaryNav.find((i) => i.cta)!;

/**
 * Compact sticky header: logo · pill navigation · CTA. Slides away while
 * scrolling down and returns on the slightest scroll up; gains a frosted
 * background and hairline once the page has moved.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > 320 && y > lastY.current + 2) setHidden(true);
      else if (y < lastY.current - 2 || y <= 320) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[translate,background-color,box-shadow,border-color] duration-500 ease-[var(--ease-soft)]",
        hidden && !menuOpen && "-translate-y-full",
        scrolled || menuOpen
          ? "border-line bg-white/90 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "border-transparent bg-white",
      )}
    >
      <div className="mx-auto flex h-header max-w-[90rem] items-center justify-between gap-4 px-5 sm:px-8 nav:px-7">
        <Logo priority className="h-10 sm:h-11" />
        <DesktopNav />
        <div className="flex items-center gap-2.5">
          <Link
            href={cta.href}
            className="group hidden h-11 items-center gap-2 rounded-full bg-brand pl-5 pr-1.5 text-[15px] font-semibold whitespace-nowrap text-white transition-colors duration-300 hover:bg-ink md:inline-flex"
          >
            {cta.label}
            <span className="flex size-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight aria-hidden className="size-4" />
            </span>
          </Link>
          <MobileMenu onOpenChange={setMenuOpen} />
        </div>
      </div>
    </header>
  );
}
