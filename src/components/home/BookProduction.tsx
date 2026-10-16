import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { TextLink } from "@/components/common/Button";
import { ImageReveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { production } from "@/data/home";

/** Book production craft + setup (formatting, formats, ISBN, metadata/BISAC/keywords). */
export function BookProduction() {
  return (
    <section className="bg-mist py-section">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <ImageReveal className="relative order-last lg:order-first">
          <div className="relative overflow-hidden rounded-3xl bg-[#e9e9e9]">
            <Image
              src={production.image.src}
              alt={production.image.alt}
              width={1068}
              height={1472}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="h-auto w-full"
            />
          </div>
          <div className="absolute bottom-6 right-6 rounded-2xl bg-ink px-6 py-5 text-white shadow-xl sm:bottom-8 sm:right-8">
            <p className="font-serif text-[1.35rem] font-semibold leading-tight">Print · eBook · Audio</p>
            <p className="mt-1 text-[0.95rem] text-white/75">Every edition, set up correctly.</p>
          </div>
        </ImageReveal>

        <div>
          <SectionHeader eyebrow={production.eyebrow} title={production.title} intro={production.text} />
          <Stagger as="ul" className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {production.items.map((item) => (
              <StaggerItem as="li" key={item.title} className="flex gap-3.5">
                <CheckCircle2 aria-hidden className="mt-0.5 size-6 shrink-0 text-brand" />
                <div>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-[0.98rem] leading-relaxed text-ink-muted">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <TextLink href="/author-services/book-formatting" className="text-ink decoration-brand hover:text-brand">
              Book Formatting
            </TextLink>
            <TextLink href="/author-services/isbn-setup" className="text-ink decoration-brand hover:text-brand">
              ISBN & Metadata Setup
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
