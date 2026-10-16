import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/common/Button";
import { FaqBlock, NumberedSteps } from "@/components/consultation/Sections";
import { ResourceHero } from "@/components/resources/ResourceSections";
import { StartProject } from "@/components/start/StartProject";
import { pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("start-your-book");

const next = [
  {
    title: "Initial project review",
    text: "A member of our team reads your details and any sample you shared to understand the book, its current stage and your goals.",
  },
  {
    title: "Recommended service pathway",
    text: "We suggest the support that seems most useful for your book — which may be one service, several, or simply advice on what to do next.",
  },
  {
    title: "Scope and timeline discussion",
    text: "We talk through what the work would involve, a realistic schedule and the cost, and answer your questions. Nothing is fixed until you are comfortable.",
  },
  {
    title: "Project onboarding",
    text: "If you decide to go ahead, we agree the details in a written service agreement and gather the files and information we need.",
  },
  {
    title: "Author approval before work begins",
    text: "Work starts only after you have approved the scope. You stay involved and make the final decisions at each stage.",
  },
];

const faqs = [
  {
    q: "Can I start with only an idea?",
    a: ["Yes. Many books begin as an idea. We can help you plan the structure and outline, and talk about whether writing support or ghostwriting would suit you."],
  },
  {
    q: "Can you work from interviews or recorded notes?",
    a: [
      "Yes. Recorded conversations, voice notes, journals and written notes can all be used as source material. A ghostwriter can organise them and shape them into chapters in your voice, with you reviewing the work as it develops.",
    ],
  },
  {
    q: "Can you help complete an unfinished manuscript?",
    a: ["Yes. We can review what you have written, give developmental feedback on the direction, and discuss writing support to help complete the remaining chapters."],
  },
  {
    q: "Can I use only one service?",
    a: ["Yes. You can choose a single service — such as editing or a cover — or several stages together. We will only recommend what your book genuinely needs."],
  },
  {
    q: "Who owns the completed book?",
    a: [
      "You do. The author retains 100% of their rights and royalties. Working with Blue Book Press, including on ghostwritten or edited material, does not transfer ownership of your book to us.",
    ],
  },
  {
    q: "Can you help republish an existing title?",
    a: [
      "Yes. If your book is already published, we can help you plan an improved edition — for example new editing, a redesigned cover or interior, or updated metadata — and prepare the files for republishing.",
    ],
  },
];

export default function Page() {
  return (
    <>
      <ResourceHero
        label="Start Your Book"
        lines={["Your Book Starts With", "What You Already Have"]}
        description="An idea, a rough draft, recorded notes, an unfinished manuscript, or a completed story can all become the starting point for a professionally developed book."
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="#starting-point" arrow className="whitespace-nowrap">
            Start My Project
          </Button>
          <Button href={pages["publishing-pathways"].path} variant="outline" className="whitespace-nowrap">
            Explore Publishing Pathways
          </Button>
        </div>
      </ResourceHero>

      <StartProject />

      <NumberedSteps
        id="next-title"
        label="What happens next"
        title="After You Send Your Details"
        intro="A clear, unhurried process — and you decide at every step."
        steps={next}
      >
        <p className="mt-8 flex items-start gap-3 border-l-4 border-brand bg-mist p-5 text-[1rem] leading-relaxed text-ink">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
          <span>
            Completing this form does not transfer ownership of your book and does not enrol you in a paid service. Authors retain 100% of their rights and royalties.
          </span>
        </p>
      </NumberedSteps>

      <FaqBlock id="start-faq-title" label="Start Your Book FAQ" title="Common First Questions" items={faqs} />
    </>
  );
}
