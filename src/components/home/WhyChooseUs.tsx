import { Button } from "@/components/common/Button";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { whyChooseUs } from "@/data/home";
import { pages } from "@/data/pages";

/** Blue section #3 — six reasons, black icon discs as the accent. */
export function WhyChooseUs() {
  return (
    <section className="bg-brand py-section text-white">
      <div className="container-site">
        <SectionHeader
          tone="blue"
          align="center"
          eyebrow="Why Authors Choose Us"
          title="Professional publishing, with a personal touch."
        />

        <Stagger as="ul" className="mt-11 grid gap-px overflow-hidden rounded-3xl bg-white/20 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((r) => {
            const Icon = r.icon;
            return (
              <StaggerItem as="li" key={r.title} className="bg-brand p-8 sm:p-10">
                <span className="flex size-14 items-center justify-center rounded-full bg-ink">
                  <Icon aria-hidden className="size-6 text-white" />
                </span>
                <h3 className="mt-6 text-[1.5rem] leading-snug text-white">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-white/80">{r.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-12 text-center">
          <Button href={pages["why-choose-us"].path} variant="dark" arrow>
            Why Choose Us
          </Button>
        </div>
      </div>
    </section>
  );
}
