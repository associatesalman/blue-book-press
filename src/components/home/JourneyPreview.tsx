import { TextLink } from "@/components/common/Button";
import { DrawLine, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { journeySteps } from "@/data/journey";
import { pages } from "@/data/pages";

/** "Your Publishing Journey" — six clear steps on a ruled timeline. */
export function JourneyPreview() {
  return (
    <section className="bg-white py-section">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Your Publishing Journey"
            title="Six clear steps. No surprises."
            intro="You always know where your book is, what happens next, and what is needed from you."
          />
          <TextLink href={pages.journey.path} className="shrink-0 text-ink decoration-brand hover:text-brand">
            See the full journey
          </TextLink>
        </div>

        <div className="relative mt-11">
          <DrawLine className="absolute left-0 right-0 top-[1.75rem] hidden bg-ink lg:block" />
          <Stagger as="ol" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6" stagger={0.1}>
            {journeySteps.map((step) => (
              <StaggerItem as="li" key={step.number} className="relative flex gap-5 lg:block">
                <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white font-serif text-[1.35rem] font-semibold text-ink transition-colors duration-300 hover:bg-brand hover:text-white lg:mb-7">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-[1.3rem] leading-snug text-ink">{step.title}</h3>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-muted">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
