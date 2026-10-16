import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline" | "light" | "outline-light" | "brand-on-dark";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-ink",
  dark: "bg-ink text-white hover:bg-brand",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-ink hover:text-white",
  "outline-light": "border-2 border-white/80 text-white hover:bg-white hover:text-ink",
  /** Primary button for black sections (hover inverts to white instead of black). */
  "brand-on-dark": "bg-brand text-white hover:bg-white hover:text-ink",
};

/** Link styled as a button. Large tap target (min 52px) for comfortable use. */
export function Button({
  href,
  children,
  variant = "primary",
  arrow = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-7 text-[1rem] font-semibold transition-colors duration-300",
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight aria-hidden className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}

/** Underlined text link with a sliding arrow. */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-semibold underline decoration-2 underline-offset-[6px] transition-colors",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
