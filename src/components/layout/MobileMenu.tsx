"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/common/Providers";
import { primaryNav, type NavItem } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Flattens an item's dropdown/mega links into one list (with group headings kept). */
function sections(item: NavItem) {
  if (item.groups) return item.groups;
  if (item.children) return [{ links: item.children }];
  return [];
}

/**
 * Below the nav breakpoint: a menu button opens a full-height panel under the
 * header with large, accordion-style sections. The panel is portalled to
 * <body> (the header's blur/slide effects would otherwise trap a fixed
 * child). Locks page scroll while open; closes on route change and Escape.
 */
export function MobileMenu({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const lenis = useLenis();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  // Panel starts exactly at the header's bottom edge.
  const [top, setTop] = useState(80);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    const header = buttonRef.current?.closest("header");
    if (header) setTop(header.getBoundingClientRect().bottom);
    setOpen((v) => !v);
  };

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => onOpenChange?.(open), [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      lenis?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const items = primaryNav.filter((i) => !i.cta);
  const cta = primaryNav.find((i) => i.cta)!;

  return (
    <div className="nav:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={toggle}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/80 px-4 text-[15px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        {open ? "Close" : "Menu"}
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                data-lenis-prevent
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-line bg-white"
                style={{ top }}
              >
                <nav aria-label="Mobile" className="container-site pb-16 pt-4">
                  <ul className="divide-y divide-line">
                    {items.map((item) => {
                      const subs = sections(item);
                      const isOpen = expanded === item.label;
                      if (!subs.length) {
                        return (
                          <li key={item.label}>
                            <Link href={item.href} className="block py-4 font-serif text-[1.6rem] font-semibold text-ink">
                              {item.label}
                            </Link>
                          </li>
                        );
                      }
                      return (
                        <li key={item.label}>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setExpanded(isOpen ? null : item.label)}
                            className="flex w-full items-center justify-between gap-4 py-4 text-left font-serif text-[1.6rem] font-semibold text-ink"
                          >
                            {item.label}
                            <ChevronDown
                              aria-hidden
                              className={cn("size-6 shrink-0 text-brand transition-transform duration-300", isOpen && "rotate-180")}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <div className="pb-5">
                                  <Link
                                    href={item.href}
                                    className="mb-3 flex min-h-12 items-center rounded-xl bg-mist px-4 font-semibold text-brand"
                                  >
                                    View {item.label}
                                  </Link>
                                  {subs.map((group, gi) => (
                                    <div key={group.heading ?? gi} className="mt-2">
                                      {"heading" in group && group.heading && (
                                        <p className="px-4 pb-1 pt-3 text-[0.85rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                                          {group.heading}
                                        </p>
                                      )}
                                      <ul>
                                        {group.links.map((l) => (
                                          <li key={l.href}>
                                            <Link href={l.href} className="block rounded-lg px-4 py-2.5 text-[1.075rem] text-ink-soft hover:text-brand">
                                              {l.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <Link
                      href={cta.href}
                      className="flex min-h-14 items-center justify-center rounded-full bg-brand px-6 text-[1.05rem] font-semibold text-white"
                    >
                      {cta.label}
                    </Link>
                    {cta.children
                      ?.filter((c) => c.href !== cta.href)
                      .map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="flex min-h-14 items-center justify-center rounded-full border-2 border-ink px-6 text-[1.05rem] font-semibold text-ink"
                        >
                          {c.label}
                        </Link>
                      ))}
                  </div>
                  <a href={`mailto:${site.email}`} className="mt-8 inline-flex items-center gap-2 text-ink-muted">
                    <Mail aria-hidden className="size-5" />
                    {site.email}
                  </a>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
