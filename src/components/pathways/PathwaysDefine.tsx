import { DrawLine, Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ppDefine } from "@/data/publishingPathways";

/**
 * 3 · What Publishing Pathways means. A dictionary-style definition beside
 * the explanation, then the four routes a book can take as a connected row.
 */
export function PathwaysDefine() {
  return (
    <section className="bg-white py-section">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:pt-2">
            <p className="eyebrow inline-flex items-center gap-3 text-brand">
              <span aria-hidden className="h-0.5 w-8 bg-brand" />
              {ppDefine.eyebrow}
            </p>
            <p className="mt-8 font-serif text-[clamp(3.6rem,9vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-brand">
              path<span className="text-ink/25">·</span>way
            </p>
            <p className="mt-4 font-serif text-[1.1rem] italic text-ink-muted">noun</p>
            <p className="mt-4 max-w-xl border-l-2 border-brand pl-5 text-title text-ink">{ppDefine.definition}</p>
          </Reveal>

          <div>
            <SectionHeader size="xl" title={ppDefine.title} className="[&_h2]:mt-0" />
            <Reveal delay={0.12}>
              <p className="mt-6 text-lead text-ink-muted">{ppDefine.text}</p>
            </Reveal>
            <Stagger as="ul" className="mt-8 flex flex-wrap gap-2" stagger={0.04} aria-label="Setup included across pathways">
              {ppDefine.essentials.map((e) => (
                <StaggerItem
                  as="li"
                  key={e}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[0.9rem] font-medium text-ink-soft transition-colors duration-300 hover:border-brand hover:text-brand"
                >
                  <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                  {e}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <div className="relative mt-16 lg:mt-20">
          <div className="absolute inset-x-0 top-0 hidden lg:block">
            <DrawLine className="bg-line" />
          </div>
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0" stagger={0.1}>
            {ppDefine.formats.map((f, i) => {
              const Icon = f.icon;
              return (
                <StaggerItem
                  as="li"
                  key={f.title}
                  className="group relative rounded-3xl border border-line p-7 transition-colors duration-500 hover:border-brand/50 lg:rounded-none lg:border-0 lg:border-l lg:px-8 lg:pb-2 lg:pt-10 lg:first:border-l-0 lg:first:pl-0 lg:hover:border-line"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 hidden h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-x-100 lg:block"
                  />
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand/[0.08] text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                      <Icon aria-hidden className="size-5.5" />
                    </span>
                    <span className="font-serif text-[0.95rem] font-semibold text-ink-muted">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-[1.6rem] font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{f.text}</p>
                  <p className="mt-5 text-[0.9rem] font-semibold text-brand">{f.formats}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
