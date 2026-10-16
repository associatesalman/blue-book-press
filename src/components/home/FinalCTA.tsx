import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { finalCta } from "@/data/home";

type CtaContent = {
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

/** Blue closing invitation. Defaults to the homepage copy; other pages pass their own. */
export function FinalCTA({ content = finalCta }: { content?: CtaContent }) {
  return (
    <section className="bg-brand py-section text-white">
      <div className="container-site text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-headline text-white">{content.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-white/85">{content.text}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={content.primary.href} variant="dark" arrow className="w-full sm:w-auto">
            {content.primary.label}
          </Button>
          <Button href={content.secondary.href} variant="outline-light" className="w-full sm:w-auto">
            {content.secondary.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
