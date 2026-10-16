import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { footerBottomNav, footerNav } from "@/data/navigation";
import { site } from "@/data/site";

/** Only real profile URLs are shown — placeholder links ("#") are skipped. */
const socials = site.socials.filter((s) => /^https:\/\//.test(s.href));

const focus = "rounded-sm focus-visible:outline-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="container-site grid grid-cols-2 gap-x-6 gap-y-11 py-14 sm:gap-x-8 lg:grid-cols-[1.7fr_repeat(4,minmax(0,1fr))] lg:gap-x-10 lg:py-16">
        {/* Brand */}
        <div className="col-span-2 max-w-sm lg:col-span-1">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="inline-flex h-18 items-center rounded-xl bg-white px-4 py-3 focus-visible:outline-white"
          >
            <Image src="/logo-trimmed.png" alt={site.name} width={387} height={240} className="h-full w-auto" />
          </Link>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-white/70">{site.description}</p>
          <a
            href={`mailto:${site.email}`}
            className={`mt-5 inline-flex items-center gap-2 text-[0.95rem] text-white/85 transition-colors hover:text-white ${focus}`}
          >
            <Mail aria-hidden className="size-5 shrink-0 text-brand" />
            {site.email}
          </a>
          {site.phone && <p className="mt-2 text-white/85">{site.phone}</p>}
          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center rounded-full border border-white/25 px-4 text-[0.9rem] text-white/85 transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-white"
                  >
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {footerNav.map((group) => (
          <nav key={group.heading} aria-labelledby={`footer-${group.heading}`}>
            <p id={`footer-${group.heading}`} className="mb-4 flex items-center gap-3 text-[0.82rem] font-bold uppercase tracking-[0.14em] text-white">
              <span aria-hidden className="h-0.5 w-5 bg-brand" />
              {group.heading}
            </p>
            <ul className="space-y-2.5">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`text-[0.98rem] text-white/70 transition-colors hover:text-white hover:underline hover:underline-offset-4 ${focus}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-[0.92rem] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerBottomNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={`transition-colors hover:text-white ${focus}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
