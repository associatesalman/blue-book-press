"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { primaryNav, type NavItem, type NavLink } from "@/data/navigation";
import { pages } from "@/data/pages";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

const panel: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: EASE, staggerChildren: 0.022, delayChildren: 0.04 } },
  exit: { opacity: 0, y: -4, scale: 0.99, transition: { duration: 0.16, ease: EASE } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
};

const under = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);
const isActive = (pathname: string, i: NavItem) =>
  i.href === "/" ? pathname === "/" : under(pathname, i.href) || !!i.children?.some((c) => under(pathname, c.href));
const panelId = (label: string) => `nav-panel-${label.replace(/\W+/g, "-").toLowerCase()}`;

/**
 * Desktop navigation (nav breakpoint, 1280px+). Compact pill row with a
 * sliding hover highlight. Service categories open a floating mega card;
 * Author Resources opens a compact card. Hover, focus, click
 * and keyboard (ArrowDown to enter, ArrowUp/Down between links, Escape to
 * close and return focus, Tab past to close) all work.
 */
export function DesktopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  // Set while focus is returned to a trigger, so that focus doesn't reopen its menu.
  const restoringFocus = useRef(false);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const show = (label: string) => {
    cancelClose();
    setOpen(label);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };
  const close = useCallback(() => setOpen(null), []);

  useEffect(close, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = navRef.current?.querySelector<HTMLElement>(`[aria-controls="${panelId(open)}"]`);
      const hadFocus = navRef.current?.contains(document.activeElement);
      close();
      if (hadFocus && trigger) {
        restoringFocus.current = true;
        trigger.focus();
        restoringFocus.current = false;
      }
    };
    const onDown = (e: MouseEvent) => !navRef.current?.contains(e.target as Node) && close();
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", close);
    };
  }, [open, close]);

  const onKeyDown = (label: string) => (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key !== "ArrowDown") return;
    e.preventDefault();
    show(label);
    requestAnimationFrame(() => document.getElementById(panelId(label))?.querySelector<HTMLElement>("a")?.focus());
  };

  /** ArrowUp / ArrowDown move between the links of an open compact card. */
  const onPanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const links = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("a"));
    const i = links.indexOf(document.activeElement as HTMLElement);
    if (i === -1) return;
    e.preventDefault();
    links[(i + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length]?.focus();
  };

  const items = primaryNav.filter((i) => !i.cta);
  const mega = items.find((i) => i.label === open && i.groups);
  const highlight = open ?? hovered;

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="hidden nav:block"
      onBlur={(e) => {
        // Tabbing past the menu closes it (outside clicks are handled on mousedown).
        const next = e.relatedTarget as Node | null;
        if (next && !navRef.current?.contains(next)) close();
      }}
      onMouseLeave={() => {
        setHovered(null);
        scheduleClose();
      }}
    >
      <ul className="flex items-center gap-0.5 rounded-full border border-line bg-mist/80 p-[5px]">
        {items.map((it) => {
          const hasMenu = !!(it.children || it.groups);
          const expanded = open === it.label;
          const active = isActive(pathname, it);
          return (
            <li
              key={it.label}
              className={cn(it.children && "relative")}
              onMouseEnter={() => {
                setHovered(it.label);
                if (hasMenu) show(it.label);
                else scheduleClose();
              }}
            >
              <Link
                href={it.href}
                aria-current={pathname === it.href ? "page" : undefined}
                aria-expanded={hasMenu ? expanded : undefined}
                aria-controls={hasMenu ? panelId(it.label) : undefined}
                onFocus={() => hasMenu && !restoringFocus.current && show(it.label)}
                onKeyDown={hasMenu ? onKeyDown(it.label) : undefined}
                className={cn(
                  "relative flex h-10 items-center gap-1 rounded-full px-[11px] text-[15px] font-semibold tracking-[-0.005em] whitespace-nowrap transition-colors duration-200",
                  active ? "text-brand" : highlight === it.label ? "text-ink" : "text-ink-soft",
                )}
              >
                {highlight === it.label && (
                  <motion.span
                    layoutId="nav-highlight"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.18)]"
                  />
                )}
                {it.label}
                {hasMenu && (
                  <ChevronDown
                    aria-hidden
                    className={cn("size-3.5 opacity-70 transition-transform duration-300", expanded && "rotate-180")}
                  />
                )}
                {active && <span aria-hidden className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-brand" />}
              </Link>

              {/* Compact card (Author Resources) */}
              <AnimatePresence>
                {expanded && it.children && (
                  <motion.div
                    id={panelId(it.label)}
                    variants={panel}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    onMouseEnter={cancelClose}
                    onKeyDown={onPanelKeyDown}
                    style={{ x: "-50%" }}
                    className="absolute left-1/2 top-full z-50 w-72 origin-top pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.3)]">
                      {it.description && (
                        <motion.p variants={item} className="px-3 pb-2 pt-2 text-[14px] leading-snug text-ink-muted">
                          {it.description}
                        </motion.p>
                      )}
                      <ul>
                        {it.children.map((c) => (
                          <motion.li key={c.label} variants={item}>
                            <Link
                              href={c.href}
                              onClick={close}
                              className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-mist hover:text-brand"
                            >
                              {c.label}
                              <ArrowRight
                                aria-hidden
                                className="size-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                              />
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Floating mega card (service categories), centred under the header */}
      <AnimatePresence mode="wait">
        {mega?.groups && (
          <motion.div
            key={mega.label}
            id={panelId(mega.label)}
            variants={panel}
            initial="hidden"
            animate="show"
            exit="exit"
            onMouseEnter={cancelClose}
            className="absolute inset-x-0 top-full z-40 flex origin-top justify-center px-4 pt-2"
          >
            <div className="grid w-full max-w-[66rem] grid-cols-[1fr_15rem] gap-6 rounded-3xl border border-line bg-white p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]">
              <div>
                <motion.div variants={item} className="flex items-baseline justify-between gap-6 border-b border-line px-2 pb-4">
                  <p className="max-w-xl text-[15px] leading-relaxed text-ink-muted">{mega.description}</p>
                  <Link
                    href={mega.href}
                    onClick={close}
                    className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-brand"
                  >
                    View all
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>

                {mega.groups.length > 1 ? (
                  <div className="mt-4 grid grid-cols-4 gap-x-4">
                    {mega.groups.map((g) => (
                      <div key={g.heading}>
                        <motion.p variants={item} className="px-2 pb-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                          {g.heading}
                        </motion.p>
                        <ul>
                          {g.links.map((l) => (
                            <motion.li key={l.href} variants={item}>
                              <MegaLink link={l} onNavigate={close} compact />
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="mt-3 grid grid-cols-2 gap-x-3">
                    {mega.groups[0].links.map((l) => (
                      <motion.li key={l.href} variants={item}>
                        <MegaLink link={l} onNavigate={close} />
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              <motion.div variants={item} className="flex flex-col justify-between rounded-2xl bg-brand p-6 text-white">
                <div>
                  <p className="font-serif text-[1.35rem] font-semibold leading-tight">Not sure where to begin?</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-white/85">
                    Talk to a publishing specialist. We will recommend only what your book needs.
                  </p>
                </div>
                <Link
                  href={pages["book-consultation"].path}
                  onClick={close}
                  className="group mt-6 inline-flex h-11 items-center justify-between rounded-full bg-ink pl-5 pr-1.5 text-[15px] font-semibold transition-colors hover:bg-white hover:text-ink"
                >
                  Free Consultation
                  <span className="flex size-8 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:rotate-45">
                    <ArrowUpRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MegaLink({ link, onNavigate, compact }: { link: NavLink; onNavigate: () => void; compact?: boolean }) {
  const Icon = link.icon;
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className={cn(
        "group flex items-start gap-3 rounded-xl transition-colors hover:bg-mist",
        compact ? "px-2 py-2" : "px-2.5 py-3",
      )}
    >
      {Icon && !compact && (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mist text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
          <Icon aria-hidden className="size-[18px]" />
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand">
          {link.label}
        </span>
        {link.description && !compact && (
          <span className="mt-0.5 line-clamp-1 block text-[13.5px] leading-snug text-ink-muted">{link.description}</span>
        )}
      </span>
    </Link>
  );
}
