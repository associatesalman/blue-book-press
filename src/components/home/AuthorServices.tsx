import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getCategory } from "@/data/categories";
import { pages } from "@/data/pages";
import { getServicesByCategory, serviceHref } from "@/data/services";

/** Author Services, laid out as four editorial columns (one per group) rather than a card grid. */
export function AuthorServices() {
  const category = getCategory("author-services");
  const services = getServicesByCategory("author-services");

  return (
    <section className="bg-white py-section">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow={category.title}
            title="The craft that turns a manuscript into a book."
            intro="Editing that respects your voice, design that suits your story, and the technical setup every professional book needs."
          />
          <Button href={pages["author-services"].path} variant="outline" arrow className="shrink-0 self-start lg:self-auto">
            All Author Services
          </Button>
        </div>

        <div className="mt-11 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {category.groups!.map((group, gi) => (
            <Reveal key={group} delay={gi * 0.08}>
              <div className="flex items-baseline gap-3 border-t-2 border-ink pt-5">
                <span className="font-serif text-[1.1rem] font-semibold text-brand">0{gi + 1}</span>
                <h3 className="text-[1.5rem] text-ink">{group}</h3>
              </div>
              <ul className="mt-5 space-y-5">
                {services
                  .filter((s) => s.group === group)
                  .map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.slug}>
                        <Link href={serviceHref(s)} className="group flex gap-3.5">
                          <Icon aria-hidden className="mt-1 size-5 shrink-0 text-brand" />
                          <span>
                            <span className="block font-semibold text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:text-brand group-hover:decoration-brand">
                              {s.title}
                            </span>
                            <span className="mt-1 block text-[0.98rem] leading-relaxed text-ink-muted">{s.summary}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
