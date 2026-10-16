/**
 * Registry of every static (non-service) page. Used for page metadata,
 * breadcrumbs, the footer and the sitemap. Service pages come from
 * `services.ts`; case-study and article detail pages from their own data.
 */
export type PageKey =
  | "home"
  | "the-press"
  | "our-story"
  | "why-choose-us"
  | "journey"
  | "success-path"
  | "publishing-pathways"
  | "author-services"
  | "marketing-visibility"
  | "portfolio"
  | "bookshelf"
  | "featured-authors"
  | "case-studies"
  | "author-resources"
  | "faqs"
  | "start-your-book"
  | "book-consultation"
  | "get-a-quote"
  | "privacy"
  | "terms"
  | "cookie-policy"
  | "refund-policy"
  | "accessibility";

export type PageEntry = {
  path: string;
  title: string;
  description: string;
  /** Breadcrumb parent. */
  parent?: PageKey;
};

export const pages: Record<PageKey, PageEntry> = {
  home: {
    path: "/",
    title: "Home",
    description: "A modern classic publishing house for memoirs, family histories, fiction and children's books.",
  },
  "the-press": {
    path: "/the-press",
    title: "The Press",
    description:
      "Blue Book Press helps authors shape, prepare, publish and share their books — editing, design, distribution, audiobooks and marketing, with authors keeping full ownership.",
    parent: "home",
  },
  "our-story": {
    path: "/the-press/our-story",
    title: "Our Story",
    description: "How we began, and why we believe every life and every story deserves a beautiful book.",
    parent: "the-press",
  },
  "why-choose-us": {
    path: "/the-press/why-choose-us",
    title: "Why Choose Us",
    description: "Personal guidance, professional craft and honest advice from first page to final copy.",
    parent: "the-press",
  },
  journey: {
    path: "/your-publishing-journey",
    title: "Your Publishing Journey",
    description: "A clear, step-by-step look at how your manuscript becomes a published book.",
    parent: "home",
  },
  "success-path": {
    path: "/your-publishing-journey/author-success-path",
    title: "Author Success Path",
    description: "What happens after publication — and how we help your book keep finding readers.",
    parent: "journey",
  },
  "publishing-pathways": {
    path: "/publishing-pathways",
    title: "Publishing Pathways",
    description:
      "Book publishing, self-publishing support, Amazon KDP, eBook, paperback, hardcover, audiobook and global distribution — clear publishing routes with professional support.",
    parent: "home",
  },
  "author-services": {
    path: "/author-services",
    title: "Author Services",
    description: "Editing, design, formatting and book setup services for authors.",
    parent: "home",
  },
  "marketing-visibility": {
    path: "/marketing-visibility",
    title: "Marketing & Visibility",
    description: "Thoughtful marketing services that help readers discover your book.",
    parent: "home",
  },
  portfolio: {
    path: "/portfolio",
    title: "Portfolio",
    description:
      "The Blue Book Press portfolio — romance, dark romance, gothic fiction, thrillers, self-help and children's books developed, designed, published and positioned with their authors.",
    parent: "home",
  },
  bookshelf: {
    path: "/bookshelf",
    title: "Bookshelf",
    description: "Browse books we have proudly helped bring to life.",
    parent: "home",
  },
  "featured-authors": {
    path: "/bookshelf/featured-authors",
    title: "Featured Authors",
    description: "Meet some of the authors we have had the privilege of publishing.",
    parent: "bookshelf",
  },
  "case-studies": {
    path: "/bookshelf/case-studies",
    title: "Case Studies",
    description: "The stories behind the books — from first conversation to finished copy.",
    parent: "bookshelf",
  },
  "author-resources": {
    path: "/author-resources",
    title: "Author Resources",
    description: "Practical publishing guidance for authors — writing, editing, book design, publishing, distribution and marketing.",
    parent: "home",
  },
  faqs: {
    path: "/faqs",
    title: "FAQs",
    description: "Straightforward answers about our process, services, ownership, publishing platforms, timelines and author support.",
    parent: "author-resources",
  },
  "start-your-book": {
    path: "/start-your-book",
    title: "Start Your Book",
    description:
      "Begin a new book project or continue an unfinished manuscript. Tell us what you already have and we will suggest a practical path forward.",
    parent: "home",
  },
  "book-consultation": {
    path: "/consultation",
    title: "Book a Consultation",
    description:
      "Request a free, no-obligation publishing consultation. Tell us about your book and the Blue Book Press team will help you understand the next practical step.",
    parent: "home",
  },
  "get-a-quote": {
    path: "/get-a-quote",
    title: "Get a Publishing Quote",
    description: "Receive a clear, itemised quote tailored to your book.",
    parent: "start-your-book",
  },
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description: "How Blue Book Press collects, uses and protects the information you share through this website and our forms.",
    parent: "home",
  },
  terms: {
    path: "/terms-and-conditions",
    title: "Terms and Conditions",
    description: "The terms that apply when you use the Blue Book Press website and request information about our services.",
    parent: "home",
  },
  "cookie-policy": {
    path: "/cookie-policy",
    title: "Cookie Policy",
    description: "How the Blue Book Press website uses cookies and similar technologies, and the choices available to you.",
    parent: "home",
  },
  "refund-policy": {
    path: "/refund-policy",
    title: "Refund Policy",
    description: "How refund requests for Blue Book Press services are reviewed under each signed service agreement.",
    parent: "home",
  },
  accessibility: {
    path: "/accessibility",
    title: "Accessibility Statement",
    description: "Our commitment to making the Blue Book Press website usable for everyone, and how to tell us about any barriers.",
    parent: "home",
  },
};

/** Breadcrumb trail from Home to the given page (inclusive). */
export function getBreadcrumbs(key: PageKey): PageEntry[] {
  const trail: PageEntry[] = [];
  let current: PageKey | undefined = key;
  while (current) {
    trail.unshift(pages[current]);
    current = pages[current].parent;
  }
  return trail;
}
