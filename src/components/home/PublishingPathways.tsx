import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getCategory } from "@/data/categories";
import { pages } from "@/data/pages";
import { getServicesByCategory, serviceHref } from "@/data/services";

/** Blue section #1 — the eight publishing routes as a numbered editorial index. */
export function PublishingPathways() {
  const category = getCategory("publishing-pathways");
  const services = getServicesByCategory("publishing-pathways");

  return (
    <section className="bg-brand py-section text-white">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            tone="blue"
            eyebrow={category.title}
            title="Every road from manuscript to bookshelf."
            intro="Traditional-quality publishing or self-publishing support, print or digital, a single market or the whole world — choose the pathway that suits your book and your goals."
          />
          <Button href={pages["publishing-pathways"].path} variant="dark" arrow className="shrink-0 self-start lg:self-auto">
            All Publishing Pathways
          </Button>
        </div>

        <Stagger as="ul" className="mt-11 grid border-t border-white/25 md:grid-cols-2 md:gap-x-12" stagger={0.06}>
          {services.map((s, i) => (
            <StaggerItem as="li" key={s.slug} className="border-b border-white/25">
              <Link
                href={serviceHref(s)}
                className="group flex items-start gap-5 py-7 transition-colors md:px-3 md:hover:bg-white/[0.07]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-[0.95rem] font-bold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block font-serif text-title font-semibold">{s.title}</span>
                  <span className="mt-2 block text-[1.02rem] leading-relaxed text-white/80">{s.summary}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="mt-1.5 size-6 shrink-0 text-white/70 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
