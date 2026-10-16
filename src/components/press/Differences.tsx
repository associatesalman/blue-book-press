import { Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { differences } from "@/data/thePress";
import { cn } from "@/lib/cn";

/**
 * What makes us different — a bento grid. Ownership (the promise authors
 * ask about most) leads as the large black block.
 */
export function Differences() {
  // Lead with ownership, then the rest in their original order.
  const lead = differences.find((d) => d.title.startsWith("You keep"))!;
  const rest = differences.filter((d) => d !== lead);
  const LeadIcon = lead.icon;

  return (
    <section className="bg-mist py-section">
      <div className="container-site">
        <SectionHeader
          align="center"
          eyebrow="What Makes Us Different"
          title="The support of a publisher. The freedom of an independent author."
        />

        <Stagger className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          <StaggerItem className="flex flex-col justify-between rounded-3xl bg-ink p-8 text-white sm:p-10 md:col-span-2 lg:row-span-2">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-brand">
              <LeadIcon aria-hidden className="size-7" />
            </span>
            <div className="mt-10">
              <h3 className="text-[clamp(1.8rem,3vw,2.6rem)] leading-tight text-white">{lead.title}.</h3>
              <p className="mt-4 max-w-md text-lead text-white/75">{lead.text}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["Your rights", "Your royalties", "Your final approval"].map((t) => (
                  <li key={t} className="rounded-full border border-white/25 px-4 py-1.5 text-[0.95rem] font-semibold">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {rest.map((d, i) => {
            const Icon = d.icon;
            // The last two blocks share the final row (two columns each).
            const wide = i >= rest.length - 2;
            return (
              <StaggerItem
                key={d.title}
                className={cn(
                  "group rounded-3xl border border-line bg-white p-7 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_26px_44px_-28px_rgba(0,0,0,0.35)]",
                  wide && "lg:col-span-2",
                )}
              >
                <Icon aria-hidden className="size-7 text-brand transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-5 text-[1.3rem] leading-snug text-ink">{d.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-muted">{d.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
