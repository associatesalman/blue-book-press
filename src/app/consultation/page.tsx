import { ShieldCheck } from "lucide-react";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { FaqBlock, NumberedSteps } from "@/components/consultation/Sections";
import { ResourceHero, ResourcesCta } from "@/components/resources/ResourceSections";
import { pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("book-consultation");

const steps = [
  {
    title: "Tell Us About Your Book",
    text: "Share where your project is today, what you are working toward and where you would like support. A rough idea is enough to begin.",
  },
  {
    title: "We Review Your Goals",
    text: "A member of our team reads your request carefully, considers your manuscript stage and goals, and notes any questions we need to ask.",
  },
  {
    title: "We Recommend the Next Step",
    text: "We contact you using your preferred method to talk through practical options. You decide whether and how to go ahead.",
  },
];

const faqs = [
  {
    q: "Is the consultation free?",
    a: ["Yes. An initial consultation to understand your book and talk through options is free, and it does not commit you to any service."],
  },
  {
    q: "Do I need a completed manuscript?",
    a: [
      "No. You are welcome to request a consultation at any stage — from an early idea to a finished or already-published book. We will suggest steps that suit where you are now.",
    ],
  },
  {
    q: "Will I keep the rights to my book?",
    a: ["Yes. Authors retain 100% of their rights and royalties. Requesting a consultation, or working with us later, does not transfer ownership of your book."],
  },
  {
    q: "What happens after I submit the form?",
    a: [
      "Your request goes directly to our team. We review the details you shared and contact you using the method you chose, usually with a few questions about your book before suggesting a next step.",
    ],
  },
  {
    q: "Can I request support for an already-published book?",
    a: [
      "Yes. We can talk about improving an existing title — for example editing, a new cover or interior, updated metadata, wider distribution or marketing. Results such as sales or rankings cannot be guaranteed, but we will be clear about what each option involves.",
    ],
  },
];

export default function Page() {
  return (
    <>
      <ResourceHero
        centered
        label="Publishing Consultation"
        lines={["Let’s Talk About Your Book"]}
        description="Tell us where you are in your publishing journey, what you are working toward, and where you need support. Our team will review your information and help you understand the next practical step."
      >
        <p className="mx-auto mt-8 flex max-w-xl items-start justify-center gap-2.5 border-t border-line pt-6 text-left text-[0.98rem] leading-relaxed text-ink-soft sm:text-center">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
          <span>Your consultation request does not affect your ownership. Authors retain 100% of their rights and royalties.</span>
        </p>
      </ResourceHero>

      <ConsultationForm />

      <NumberedSteps id="process-title" label="How it works" title="A Clear, Simple Process" steps={steps} />

      <FaqBlock id="consult-faq-title" label="Consultation FAQ" title="Before You Request" items={faqs} />

      <ResourcesCta
        id="consult-cta-title"
        label="Wherever you are today"
        title="Every Book Begins at a Different Stage"
        text="Whether you are developing an idea, preparing a completed manuscript, or improving an existing publication, we can help you identify the most suitable next step."
        primary={{ label: "Start Your Book", href: pages["start-your-book"].path }}
        secondary={{ label: "Read the FAQs", href: pages.faqs.path }}
      />
    </>
  );
}
