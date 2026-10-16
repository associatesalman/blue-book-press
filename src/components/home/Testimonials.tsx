import { Quote } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import { testimonials } from "@/data/testimonials";

/**
 * Author quotes. Renders nothing until real, approved testimonials are added
 * to data/testimonials.ts — the section never shows placeholder quotes.
 */
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <div className="mt-section border-t border-line pt-16">
      <h2 className="eyebrow text-brand">In Our Authors' Words</h2>
      <Stagger as="ul" className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem as="li" key={t.name}>
            <figure>
              <Quote aria-hidden className="size-8 text-brand" />
              <blockquote className="mt-4 font-serif text-[1.35rem] leading-snug text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-5">
                <span className="block font-semibold text-ink">{t.name}</span>
                <span className="text-ink-muted">{t.role}</span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
