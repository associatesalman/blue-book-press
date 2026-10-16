import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Brand logo. Uses `/logo-trimmed.png` — `/logo.png` with its transparent
 * padding cropped (387×240), so it can be sized by height without shrinking.
 */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src="/logo-trimmed.png"
        alt={site.name}
        width={387}
        height={240}
        priority={priority}
        className="h-full w-auto object-contain"
      />
    </Link>
  );
}
