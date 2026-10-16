import { ContactForm } from "@/components/resources/ContactForm";
import { FaqExplorer } from "@/components/resources/FaqExplorer";
import { StillNeedHelp } from "@/components/resources/StillNeedHelp";
import { faqs } from "@/data/faqs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("faqs");

/** FAQPage structured data, generated from the same answers shown on the page. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqExplorer />
      <StillNeedHelp />
      <ContactForm />
    </>
  );
}
