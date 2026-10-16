import type { ArticleBlock } from "./articles";
import type { PageKey } from "./pages";
import { site } from "./site";

/**
 * Policy pages (/privacy-policy, /terms-and-conditions, /cookie-policy,
 * /refund-policy, /accessibility).
 *
 * The text is deliberately general and makes no claims the codebase cannot
 * support. TODO(site owner) — before launch, have these reviewed by a legal
 * adviser and confirm, then add where relevant:
 *  - the legal entity name and registered business address
 *  - the governing law / jurisdiction for the Terms
 *  - the service providers that receive form data (hosting, email delivery,
 *    CRM) and the retention periods you actually apply
 *  - the final contact email (site.email is still a placeholder)
 * None of these are displayed until confirmed, so no placeholder text appears
 * on the live pages. Update `lastUpdated` whenever a policy changes.
 */
export const legalConfig = {
  lastUpdated: "2026-10-15",
  contactEmail: site.email,
} as const;

export type LegalKey = Extract<PageKey, "privacy" | "terms" | "cookie-policy" | "refund-policy" | "accessibility">;

export type LegalDoc = {
  /** One-paragraph summary shown under the title. */
  intro: string;
  body: ArticleBlock[];
};

const email = legalConfig.contactEmail;

export const legalDocs: Record<LegalKey, LegalDoc> = {
  privacy: {
    intro: `This policy explains what information ${site.name} collects through this website, why we collect it, how we look after it and the choices you have. We aim to collect only what we need to respond to you and to provide the services you ask for.`,
    body: [
      { type: "h2", text: "Information you give us through forms" },
      {
        type: "p",
        text: "When you use our consultation, Start Your Book, contact or newsletter forms, we receive the information you choose to enter. Required fields are marked on each form; everything else is optional.",
      },
      { type: "h2", text: "Contact information" },
      {
        type: "p",
        text: "This includes your name, email address and, if you provide them, your phone number, preferred contact method and time zone. We use these details to reply to you in the way you asked.",
      },
      { type: "h2", text: "Project and manuscript information" },
      {
        type: "p",
        text: "You may tell us about your book — for example its title, genre, stage, goals, timeline and budget range. We use this to understand your project and suggest suitable next steps.",
      },
      { type: "h2", text: "Uploaded files" },
      {
        type: "p",
        text: "Some forms let you attach a manuscript or sample. Files you upload are used only to evaluate your enquiry or to deliver the services you request, and are handled in line with our agreement with you. We do not publish, sell or share your manuscript, and submitting a file does not transfer any rights in your work to us.",
      },
      { type: "h2", text: "Technical and usage data" },
      {
        type: "p",
        text: "Like most websites, the servers that deliver this site process basic technical information, such as your IP address, browser type and the pages requested, so that pages can be delivered securely and problems can be investigated. We do not currently use analytics or advertising tools to track how individual visitors use the site.",
      },
      { type: "h2", text: "Cookies" },
      {
        type: "p",
        text: "This website does not currently set analytics, advertising or tracking cookies. Our Cookie Policy explains this in more detail and how it would change if that ever changes.",
      },
      { type: "h2", text: "How we use information" },
      {
        type: "ul",
        items: [
          "To respond to your enquiry or consultation request.",
          "To understand your project and recommend possible next steps.",
          "To provide services you have agreed to in a written service agreement.",
          "To send our newsletter, only if you have subscribed — every issue lets you unsubscribe.",
          "To keep the website secure and working properly.",
          "To meet legal, accounting or regulatory obligations.",
        ],
      },
      { type: "p", text: "We do not sell your personal information, and we do not use it for unrelated purposes without telling you." },
      { type: "h2", text: "Service providers" },
      {
        type: "p",
        text: "We use trusted service providers to run this website and handle enquiries — for example hosting, email delivery and tools that receive form submissions. They process information on our behalf and only for those purposes. You can contact us to ask which providers are involved in handling your information.",
      },
      { type: "h2", text: "Data retention" },
      {
        type: "p",
        text: "We keep enquiry information for as long as needed to respond and to follow up on your request. If you become a client, we keep project information for the duration of our work together and afterwards for as long as reasonably required for records, legal or accounting purposes. Information we no longer need is deleted or anonymised.",
      },
      { type: "h2", text: "Data protection" },
      {
        type: "p",
        text: "Information sent through our forms travels over an encrypted connection. We limit access to the people who need it to respond to you or deliver your project, and we take reasonable steps to protect it. No method of transmission or storage is completely secure, but we work to keep your information safe.",
      },
      { type: "h2", text: "Your rights" },
      {
        type: "p",
        text: "Depending on where you live, you may have the right to:",
      },
      {
        type: "ul",
        items: [
          "Ask for a copy of the personal information we hold about you.",
          "Ask us to correct information that is inaccurate or incomplete.",
          "Ask us to delete your information, where we are not required to keep it.",
          "Object to, or ask us to limit, certain uses of your information.",
          "Withdraw consent you have given, such as for our newsletter, at any time.",
        ],
      },
      { type: "h2", text: "Contacting us about your information" },
      {
        type: "p",
        text: `To make a request or ask a question about this policy, email ${email}. We may need to confirm your identity before acting on a request, and we will respond as promptly as we can.`,
      },
      { type: "h2", text: "Changes to this policy" },
      {
        type: "p",
        text: "We may update this policy as our website or services change. The date at the top of this page shows when it was last updated. Significant changes will be made clear on this page.",
      },
    ],
  },

  terms: {
    intro: `These terms apply when you use the ${site.name} website and when you contact us about our services. Please read them carefully. By using the website you agree to them.`,
    body: [
      { type: "h2", text: "Using this website" },
      {
        type: "p",
        text: "You may browse and use this website for your own personal, non-commercial purposes. Please do not misuse it — for example by attempting to disrupt it, gain unauthorised access, or submit false or harmful information through our forms.",
      },
      { type: "h2", text: "Informational content" },
      {
        type: "p",
        text: "Articles, FAQs and other content on this website offer general guidance about writing and publishing. They are not legal, financial or professional advice for your specific situation, and publishing platforms may change their own rules at any time.",
      },
      { type: "h2", text: "Consultation and project requests" },
      {
        type: "p",
        text: "Submitting a consultation request, project form or enquiry does not create a contract, does not commit you to buying a service, and does not commit us to accepting a project. It simply starts a conversation.",
      },
      { type: "h2", text: "Service agreements" },
      {
        type: "p",
        text: "Paid services are provided only under a separate written service agreement. That agreement sets out the scope of work, timelines, fees, payment terms, revisions and any cancellation or refund conditions. If anything in the agreement differs from these terms, the signed agreement applies.",
      },
      { type: "h2", text: "Payments" },
      {
        type: "p",
        text: "Fees and payment schedules are confirmed in writing before work begins. Costs charged by third parties — such as advertising spend, printing or platform fees — are separate unless your agreement says otherwise.",
      },
      { type: "h2", text: "Intellectual property" },
      {
        type: "p",
        text: `The design, text and graphics of this website belong to ${site.name} or are used with permission. You may not copy or reuse them without our written consent, except as allowed by law. Book covers and titles shown in our portfolio belong to their respective authors and rights holders.`,
      },
      { type: "h2", text: "Author-provided materials" },
      {
        type: "p",
        text: "When you share a manuscript, images or other materials, you confirm that you own them or have permission to use them. We use your materials only to evaluate your enquiry or to deliver the services you have requested.",
      },
      { type: "h2", text: "Rights and royalties" },
      {
        type: "p",
        text: "Authors retain 100% of their rights and royalties. Working with us does not transfer ownership of your book to us. Any specific arrangements relating to work we create for you are set out in your service agreement.",
      },
      { type: "h2", text: "Third-party platforms" },
      {
        type: "p",
        text: "Publishing and retail platforms — such as online bookstores, print-on-demand distributors and audiobook services — operate under their own terms, policies, review processes and royalty rates. We cannot control their decisions, timelines or changes to their services.",
      },
      { type: "h2", text: "Publishing and marketing limitations" },
      {
        type: "p",
        text: "Publishing and marketing outcomes depend on many factors outside anyone's control, including reader demand, competition and platform algorithms. For that reason:",
      },
      {
        type: "ul",
        items: [
          "We do not guarantee book sales, income or royalties.",
          "We do not guarantee rankings, bestseller status or reviews.",
          "We do not guarantee media coverage or responses to press outreach.",
          "Distribution makes a book available to order; it does not guarantee placement on bookstore or library shelves.",
        ],
      },
      { type: "h2", text: "Limitation of liability" },
      {
        type: "p",
        text: "We work to keep this website accurate and available, but we cannot promise it will always be error-free or uninterrupted. To the extent permitted by law, we are not responsible for losses arising from your use of the website or reliance on its general content. Nothing in these terms limits liability that cannot be limited by law. Liability relating to paid services is set out in your service agreement.",
      },
      { type: "h2", text: "Links to other websites" },
      { type: "p", text: "Where we link to other websites, we do so for convenience. We are not responsible for their content or practices." },
      { type: "h2", text: "Changes to these terms" },
      {
        type: "p",
        text: "We may update these terms from time to time. The date at the top of this page shows when they were last changed. Continuing to use the website after changes means you accept the updated terms.",
      },
      { type: "h2", text: "Contact" },
      { type: "p", text: `If you have a question about these terms, email ${email}.` },
    ],
  },

  "cookie-policy": {
    intro: "Cookies are small files a website can store in your browser. This page explains how this website uses them — which, at present, is very little — and the choices you have.",
    body: [
      { type: "h2", text: "Our current approach" },
      {
        type: "p",
        text: "This website does not currently set analytics, advertising, social media or other tracking cookies, and it does not use them to build a profile of you. Because no non-essential cookies are used, we do not show a cookie consent banner.",
      },
      { type: "h2", text: "Essential cookies" },
      {
        type: "p",
        text: "Essential cookies are those strictly needed for a website to work, such as keeping a connection secure. The website does not currently rely on any cookies of its own to work. If our hosting or security infrastructure needs to use strictly necessary cookies in future, they would be used only for that purpose.",
      },
      { type: "h2", text: "Analytics cookies" },
      {
        type: "p",
        text: "We do not currently use analytics tools. If we decide to measure how the website is used, we will update this policy first and ask for your consent before any non-essential analytics cookies are set.",
      },
      { type: "h2", text: "Preference cookies" },
      {
        type: "p",
        text: "The website does not store preference cookies. Settings such as reduced motion are read directly from your device and are not saved by us.",
      },
      { type: "h2", text: "Third-party cookies" },
      {
        type: "p",
        text: "Fonts, images and videos on this website are delivered from our own website, and we do not embed third-party players, widgets or advertising that set cookies. If you follow a link to another website, that site's own cookie policy applies.",
      },
      { type: "h2", text: "Your cookie choices" },
      {
        type: "p",
        text: "If we introduce non-essential cookies in future, we will add a clear way to accept or reject them and to change your choice at any time, and this page will list them.",
      },
      { type: "h2", text: "Browser settings" },
      {
        type: "p",
        text: "Most browsers let you view, block and delete cookies through their settings. Blocking cookies will not affect your use of this website as it works today. Your browser's help pages explain how to manage these settings.",
      },
      { type: "h2", text: "Questions" },
      { type: "p", text: `If you have a question about cookies on this website, email ${email}.` },
    ],
  },

  "refund-policy": {
    intro: `This page explains how ${site.name} approaches refund requests. Because each project is different, the details that apply to you are set out in your signed service agreement.`,
    body: [
      { type: "h2", text: "Your service agreement comes first" },
      {
        type: "p",
        text: "Refund eligibility depends on the signed service agreement for your project. It describes the work, the payment schedule and any cancellation or refund conditions. If anything on this page differs from your signed agreement, the agreement applies.",
      },
      { type: "h2", text: "Work already completed" },
      {
        type: "p",
        text: "Our services involve time and expertise from the moment a project begins. Work that has already been completed or delivered — for example an edit, a design draft or formatted files — may not be refundable.",
      },
      { type: "h2", text: "Third-party costs" },
      {
        type: "p",
        text: "Some projects involve costs paid to other companies, such as ISBNs, printing, advertising spend, stock images or platform fees. Costs that have already been incurred with third parties may not be refundable.",
      },
      { type: "h2", text: "Custom creative and editorial work" },
      {
        type: "p",
        text: "Editing, writing, cover design and other custom work is created specifically for your book. Your agreement may set specific conditions for this type of work, such as the number of revision rounds included and what happens if a project is paused or cancelled part-way through.",
      },
      { type: "h2", text: "Requesting a review" },
      {
        type: "p",
        text: `If you are unhappy with any part of our work or would like to discuss cancelling or a refund, please contact us at ${email} with your name, project details and a short explanation. We will review your request against your agreement and the work completed, and respond as promptly as we can.`,
      },
      { type: "h2", text: "No outcome-based refunds" },
      {
        type: "p",
        text: "Because no publisher can guarantee sales, rankings, reviews, media coverage or bookstore placement, refunds are not based on those outcomes. They are reviewed according to the work described in your agreement.",
      },
    ],
  },

  accessibility: {
    intro: `${site.name} wants everyone to be able to use this website comfortably, including people who use assistive technology, a keyboard or other ways of browsing.`,
    body: [
      { type: "h2", text: "Our commitment" },
      {
        type: "p",
        text: "We design and build this website with accessibility in mind and aim to follow the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. Accessibility is ongoing work, and we review pages as they are added and changed.",
      },
      { type: "h2", text: "Keyboard navigation" },
      {
        type: "ul",
        items: [
          "All menus, links, buttons, accordions and forms can be used with a keyboard.",
          "A “Skip to content” link lets you bypass the main navigation.",
          "A clearly visible outline shows which element has keyboard focus.",
          "Menus can be closed with the Escape key.",
        ],
      },
      { type: "h2", text: "Readable text and contrast" },
      {
        type: "p",
        text: "We use a large base text size, generous line spacing and strong contrast between text and background. Pages can be zoomed and resized without losing content.",
      },
      { type: "h2", text: "Forms" },
      {
        type: "p",
        text: "Every form field has a visible label. Required fields are marked, error messages explain what to correct and are announced to screen readers, and keyboard focus moves to the first field that needs attention.",
      },
      { type: "h2", text: "Images and alternative text" },
      {
        type: "p",
        text: "Meaningful images, such as book covers, have text descriptions. Purely decorative images are hidden from screen readers so they do not get in the way.",
      },
      { type: "h2", text: "Reduced motion" },
      {
        type: "p",
        text: "If your device is set to reduce motion, smooth scrolling is turned off and animations are minimised. Videos that play automatically are silent and decorative.",
      },
      { type: "h2", text: "Reporting an accessibility issue" },
      {
        type: "p",
        text: `If you find any part of this website difficult to use, please tell us. Email ${email} with the page address and a short description of the problem, and let us know if you would like the information in another format. We will do our best to help and to fix the issue.`,
      },
    ],
  },
};
