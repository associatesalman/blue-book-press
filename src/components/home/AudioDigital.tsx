import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { audioDigital } from "@/data/home";
import { cn } from "@/lib/cn";

/** Audiobook (black panel) and eBook (light panel) side by side. */
export function AudioDigital() {
  return (
    <section className="bg-white pb-section">
      <div className="container-site">
        <SectionHeader align="center" eyebrow={audioDigital.eyebrow} title={audioDigital.title} />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {audioDigital.formats.map((f, i) => {
            const dark = i === 0;
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 0.12} x={dark ? -24 : 24} y={0}>
                <Link
                  href={f.href}
                  className={cn(
                    "group flex h-full flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-12",
                    dark ? "bg-ink text-white" : "border border-line bg-mist text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-16 items-center justify-center rounded-2xl",
                      dark ? "bg-brand text-white" : "bg-ink text-white",
                    )}
                  >
                    <Icon aria-hidden className="size-7" />
                  </span>
                  <h3 className={cn("mt-8 text-title", dark ? "text-white" : "text-ink")}>{f.title}</h3>
                  <p className={cn("mt-4 text-[1.05rem] leading-relaxed", dark ? "text-white/75" : "text-ink-muted")}>{f.text}</p>
                  <ul className="mt-7 space-y-3">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-center gap-3">
                        <Check aria-hidden className="size-5 shrink-0 text-brand" strokeWidth={3} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-10 font-semibold underline decoration-brand decoration-2 underline-offset-[6px]">
                    Learn about {f.title}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
