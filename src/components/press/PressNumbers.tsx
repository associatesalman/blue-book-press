import { Counter } from "@/components/common/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { pressNumbers } from "@/data/thePress";
import { cn } from "@/lib/cn";

/**
 * Blue band of large, counting process figures. Cards invert to white on
 * hover; the ownership figure sits on a black block as the accent.
 * Service/process numbers only — no sales claims.
 */
export function PressNumbers() {
  return (
    <section className="bg-brand py-section text-white">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <p className="eyebrow inline-flex rounded-full bg-ink px-4 py-2">The Press in Numbers</p>
            <h2 className="mt-5 max-w-2xl text-headline text-white">The scope behind every book we publish.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[1.02rem] leading-relaxed text-white/80">
              No inflated sales figures — just the services, structure and standards every author can rely on.
            </p>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {pressNumbers.map((n, i) => {
            const accent = n.suffix === "%";
            return (
              <StaggerItem
                as="li"
                key={n.label}
                className={cn(
                  "group relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-[1.75rem] p-8 transition-[background-color,color,translate,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1.5 sm:p-9",
                  accent
                    ? "bg-ink hover:shadow-[0_40px_60px_-30px_rgba(0,0,0,0.6)]"
                    : "border border-white/25 hover:border-white hover:bg-white hover:text-ink hover:shadow-[0_40px_60px_-30px_rgba(0,0,0,0.45)]",
                )}
              >
                <div className="flex items-start justify-between">
                  <p className="flex items-start font-serif text-[clamp(4.6rem,8vw,7.2rem)] font-semibold leading-[0.85] tracking-[-0.04em] tabular-nums">
                    <Counter to={n.value} suffix={n.suffix} />
                    {n.plus && (
                      <span
                        className={cn(
                          "ml-1 text-[0.5em] leading-none transition-colors duration-500",
                          accent ? "text-brand" : "text-white/70 group-hover:text-brand",
                        )}
                      >
                        +
                      </span>
                    )}
                  </p>
                  <span
                    className={cn(
                      "font-serif text-[1rem] font-semibold transition-colors duration-500",
                      accent ? "text-white/50" : "text-white/60 group-hover:text-ink-muted",
                    )}
                  >
                    0{i + 1}
                  </span>
                </div>
                <div
                  className={cn(
                    "mt-8 border-t pt-5 transition-colors duration-500",
                    accent ? "border-white/20" : "border-white/25 group-hover:border-line",
                  )}
                >
                  <p className="text-[1.25rem] font-semibold">{n.label}</p>
                  <p
                    className={cn(
                      "mt-1.5 text-[0.98rem] leading-relaxed transition-colors duration-500",
                      accent ? "text-white/70" : "text-white/75 group-hover:text-ink-muted",
                    )}
                  >
                    {n.note}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
