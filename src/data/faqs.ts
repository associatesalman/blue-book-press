/**
 * General FAQs for /faqs. Answers stay honest: no guaranteed sales, rankings,
 * reviews, media coverage or bookstore placement, and no fixed prices or
 * timelines — those depend on each project and are confirmed in writing.
 */
export const faqCategories = [
  "Getting Started",
  "Editing",
  "Design and Formatting",
  "Publishing",
  "Distribution",
  "Marketing",
  "Author Services",
  "Rights and Royalties",
  "Payments and Timelines",
] as const;

export type FaqCategory = (typeof faqCategories)[number];

export type Faq = {
  /** Stable id used for deep links (/faqs#…). */
  id: string;
  q: string;
  /** One or more short paragraphs. */
  a: string[];
  category: FaqCategory;
};

type Entry = [q: string, ...a: string[]];

const groups: Record<FaqCategory, Entry[]> = {
  "Getting Started": [
    [
      "How do I begin working with Blue Book Press?",
      "Start by contacting us through the form on this page or the Start Your Book page. Tell us a little about your book, where it is now and what you would like help with.",
      "We will reply personally, ask any questions we need, and suggest a practical next step. There is no obligation to go ahead.",
    ],
    [
      "Does my manuscript need to be completed?",
      "No. We can talk with you at any stage, including while you are still writing. Some services, such as developmental feedback, can help shape a book in progress.",
      "Most editing, design and publishing work does begin once the manuscript is complete, because later changes often affect earlier stages.",
    ],
    [
      "Can you review my manuscript before recommending a service?",
      "Yes. We would rather understand your book before recommending anything. Depending on the manuscript, this may be a conversation about your goals, a look at a sample, or a fuller manuscript assessment.",
      "Our aim is to recommend only what your book genuinely needs.",
    ],
    [
      "Do you work with first-time authors?",
      "Yes. Many of the authors we work with are publishing for the first time. We explain each stage in plain language and you make the final decisions throughout.",
    ],
    [
      "Which genres do you support?",
      "We work across fiction and non-fiction, including romance and dark romance, thrillers and suspense, memoir and family history, self-help, faith-based books and children's books.",
      "If your book falls outside these, contact us anyway — we will tell you honestly whether we are the right fit.",
    ],
  ],
  Editing: [
    [
      "What is the difference between developmental, line, and copy editing?",
      "Developmental editing looks at the whole book: structure, story, pacing, characters or argument. Line editing refines the writing sentence by sentence — rhythm, clarity and word choice. Copy editing corrects grammar, spelling, punctuation and consistency.",
      "Proofreading is a final check, usually on the formatted pages, to catch any remaining errors before publication.",
    ],
    [
      "Will editing change my voice?",
      "Good editing should make your book sound more like you, not less. Editors suggest changes and explain their reasoning, and you decide what to accept.",
      "If anything in your style is deliberate, tell your editor at the start so it is respected.",
    ],
    [
      "Can I request revisions after receiving edited files?",
      "Yes. Edits are returned with tracked changes and comments so you can review everything. If you have questions or want something revisited, you can raise it with us.",
      "The exact number of review rounds included is agreed before the work begins, so it is clear from the start.",
    ],
    [
      "How long does the editing process take?",
      "It depends on the type of editing, the length of the manuscript and how much work it needs. A copy edit of a shorter book takes less time than a developmental edit of a long one.",
      "We will give you an estimated schedule before work begins, based on your specific manuscript.",
    ],
  ],
  "Design and Formatting": [
    [
      "What files are needed for cover design?",
      "To start, we need the final title, subtitle and author name exactly as they should appear, the genre, and any ideas or examples you like.",
      "For print covers, we also need the trim size, the final page count (which determines spine width), the back cover description, a short author bio, and the ISBN for the barcode.",
    ],
    [
      "Do you design paperback, hardcover, and eBook covers?",
      "Yes. Each format needs its own file: an eBook cover is a front image, while paperback and hardcover covers include a spine and back cover sized to that edition.",
    ],
    [
      "What is interior book formatting?",
      "Formatting (also called typesetting or interior layout) turns your manuscript into properly designed pages. It covers typefaces, margins, line spacing, chapter openings, headers, page numbers and front and back matter.",
      "Print and eBook editions are prepared separately, because eBook text reflows to fit different screens.",
    ],
    [
      "Can an existing cover or layout be redesigned?",
      "Yes. We can redesign a cover or interior for a book that is already published. Depending on how much changes, a redesigned edition may need updated files on each platform, and in some cases a new ISBN.",
    ],
  ],
  Publishing: [
    [
      "Can you help publish on Amazon KDP?",
      "Yes. We can prepare your files and guide or handle the setup on Amazon Kindle Direct Publishing for eBook, paperback and hardcover editions.",
      "Your KDP account stays in your name, with your own payment details, so you remain in control of the listing and your royalties.",
    ],
    [
      "Do you support paperback, hardcover, and eBook formats?",
      "Yes. We can help with any combination of eBook, paperback and hardcover, and with audiobook production as a separate service.",
    ],
    [
      "Who owns the published book?",
      "You do. Authors retain 100% of the rights to their work. Blue Book Press does not take ownership of your book or its rights.",
    ],
    [
      "Can you help republish an existing book?",
      "Yes. If your book is already published and you want to improve it — new editing, a new cover, better formatting or updated metadata — we can help you plan and prepare a new edition.",
    ],
    [
      "What are ISBN and metadata?",
      "An ISBN (International Standard Book Number) is a unique number that identifies a specific edition and format of your book. Each print format normally needs its own.",
      "Metadata is the information that describes your book to retailers: title, author name, description, categories, keywords, price and format details. Accurate metadata helps the right readers find your book.",
    ],
  ],
  Distribution: [
    [
      "Which publishing platforms do you support?",
      "We commonly work with Amazon KDP and IngramSpark, and can help make eBooks available through stores such as Apple Books, Barnes & Noble and Google Play Books. The right mix depends on your formats and goals.",
    ],
    [
      "Does distribution guarantee placement inside physical bookstores?",
      "No. Distribution makes your book available for bookstores and libraries to order. It does not guarantee that any store will stock it on its shelves.",
      "Physical placement is each store's own decision, often influenced by local demand, events and relationships. We will always be clear about this difference.",
    ],
    [
      "Can my book be available internationally?",
      "Yes. Through online retailers and print-on-demand distribution, your book can be made available in many countries. Availability, pricing and delivery vary by platform and region.",
    ],
    [
      "Can you help with print-on-demand setup?",
      "Yes. Print-on-demand means copies are printed as they are ordered, so you do not need to buy a large print run. We can prepare your files and help set up the relevant platforms.",
    ],
  ],
  Marketing: [
    [
      "Do you guarantee book sales?",
      "No. No honest publisher or marketing service can guarantee sales, rankings, reviews or media coverage.",
      "What we can do is help your book be well prepared and clearly positioned, and plan marketing activities that give interested readers the best chance to find it.",
    ],
    [
      "What is included in a book marketing strategy?",
      "A strategy usually starts with understanding your readers and your goals. It may include positioning, launch planning, advertising, social media, A+ Content, press outreach and an author website.",
      "We recommend only the activities that suit your book and budget.",
    ],
    [
      "Can you help with Amazon Ads and A+ Content?",
      "Yes. We can set up and manage Amazon advertising campaigns, and design A+ Content — the images and formatted sections that appear further down an Amazon book page.",
      "Advertising results vary, and ad spend is separate from our service fees.",
    ],
    [
      "Do you provide press release support?",
      "Yes. We can write and prepare a press release about your book. Distributing a release does not guarantee that any outlet will cover it.",
    ],
    [
      "Can you help build an author website?",
      "Yes. We design author websites that present you and your books clearly, with links to where readers can buy them and a way to contact you.",
    ],
  ],
  "Author Services": [
    [
      "What author services do you offer?",
      "Our author services include editing and proofreading, developmental, line and copy editing, cover design, interior formatting and layout, ISBN and metadata setup, book description writing and author bio writing.",
    ],
    [
      "Can I choose individual services instead of a full package?",
      "Yes. You can work with us on a single service — such as a cover or a copy edit — or on several stages together. We will recommend what makes sense for your book.",
    ],
    [
      "Do you write book descriptions and author bios?",
      "Yes. We write book descriptions for back covers and retailer pages, and author bios in short and long versions, all reviewed and approved by you.",
    ],
    [
      "Can you help with audiobook production?",
      "Yes. We offer audiobook production as part of our publishing pathways. Contact us to talk through your book and the options available.",
    ],
  ],
  "Rights and Royalties": [
    [
      "Will Blue Book Press take ownership of my book?",
      "No. Authors retain 100% of their rights. We do not take ownership of your book, your manuscript or any edition we help you publish.",
    ],
    [
      "Does the author retain royalties?",
      "Yes. Authors retain 100% of their royalties. Royalties from retailers are paid by those platforms directly to you, according to each platform's own royalty terms.",
    ],
    [
      "Will the author control their publishing accounts?",
      "Yes. Publishing accounts such as Amazon KDP are set up in your name, with your own payment and tax details. You keep access and control.",
    ],
    [
      "Is the service exclusive?",
      "Working with us does not give us exclusive rights to your book. Some retail programmes, such as KDP Select for eBooks, have their own exclusivity terms — we will explain these so you can decide whether to enrol.",
    ],
  ],
  "Payments and Timelines": [
    [
      "How is the project cost determined?",
      "Cost depends on the services you choose, the length and condition of the manuscript, and the formats you need. After understanding your book, we provide a clear, itemised quote before any work begins.",
    ],
    [
      "Are payment plans available?",
      "Payment arrangements depend on the project. Please ask when you request a quote and we will explain the options available for your book.",
    ],
    [
      "How long does the complete publishing process take?",
      "It varies with the services involved, the length of the book and how quickly decisions and approvals happen. A book that only needs formatting and setup moves faster than one that needs several rounds of editing.",
      "We will give you an estimated schedule once we understand your project.",
    ],
    [
      "What can affect a project timeline?",
      "Common factors include the amount of editing needed, the number of revision rounds, the time taken to review and approve each stage, printed proof delivery, and platform review periods.",
      "Clear feedback and timely approvals are the most reliable ways to keep a project moving.",
    ],
  ],
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64)
    .replace(/-+$/, "");

export const faqs: Faq[] = faqCategories.flatMap((category) =>
  groups[category].map(([q, ...a]) => ({ id: slug(q), q, a, category })),
);
