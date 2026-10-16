import {
  AlignLeft,
  Barcode,
  BookCopy,
  BookMarked,
  BookOpen,
  Clapperboard,
  Compass,
  FileText,
  Globe,
  HandHeart,
  Headphones,
  LayoutPanelTop,
  LayoutTemplate,
  Megaphone,
  MonitorSmartphone,
  Newspaper,
  Palette,
  PenLine,
  Pilcrow,
  Search,
  Share2,
  ShoppingCart,
  SpellCheck,
  TabletSmartphone,
  Tags,
  Target,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCategorySlug } from "./categories";

export type ServiceFaq = { q: string; a: string };
export type ServiceStep = { title: string; text: string };
export type ServiceFeature = { title: string; text: string };

export type Service = {
  slug: string;
  category: ServiceCategorySlug;
  /** Sub-group inside the category (Author Services only). */
  group?: string;
  title: string;
  /** Shorter label for menus, when the title is long. */
  navLabel?: string;
  /** One or two sentences — used on cards, hubs and meta descriptions. */
  summary: string;
  icon: LucideIcon;
  /** Shown on the homepage services overview. */
  featured?: boolean;

  // Detailed page content — filled in during Phase 2 (service template).
  heroImage?: string;
  forWho?: string[];
  includes?: ServiceFeature[];
  steps?: ServiceStep[];
  deliverables?: string[];
  faqs?: ServiceFaq[];
  /** Slugs of related services. */
  related?: string[];
};

export const services: Service[] = [
  // ── Publishing Pathways ────────────────────────────────────────────────
  {
    slug: "book-publishing",
    category: "publishing-pathways",
    title: "Book Publishing",
    summary:
      "Complete, guided publishing from manuscript to finished book, with a dedicated manager beside you at every step.",
    icon: BookOpen,
    featured: true,
    related: ["self-publishing-support", "editing-proofreading", "cover-design"],
  },
  {
    slug: "self-publishing-support",
    category: "publishing-pathways",
    title: "Self-Publishing Support",
    summary:
      "Keep full ownership and royalties while we handle the technical work and explain each decision in plain language.",
    icon: HandHeart,
    featured: true,
    related: ["amazon-kdp-publishing", "isbn-setup", "book-formatting"],
  },
  {
    slug: "amazon-kdp-publishing",
    category: "publishing-pathways",
    title: "Amazon KDP Publishing",
    summary:
      "Your book set up correctly on Amazon Kindle Direct Publishing, in eBook and print, with pricing and categories chosen carefully.",
    icon: ShoppingCart,
    related: ["a-plus-content-design", "amazon-ads", "metadata-optimization"],
  },
  {
    slug: "global-book-distribution",
    category: "publishing-pathways",
    title: "Global Book Distribution",
    summary:
      "Reach readers in bookstores, libraries and online retailers around the world through trusted distribution networks.",
    icon: Globe,
    related: ["book-publishing", "isbn-setup", "metadata-optimization"],
  },
  {
    slug: "ebook-publishing",
    category: "publishing-pathways",
    title: "eBook Publishing",
    summary:
      "Clean, comfortable digital editions that read beautifully on Kindle, Apple Books, tablets and phones.",
    icon: TabletSmartphone,
    related: ["book-formatting", "amazon-kdp-publishing", "paperback-publishing"],
  },
  {
    slug: "paperback-publishing",
    category: "publishing-pathways",
    title: "Paperback Publishing",
    summary:
      "Print-ready paperbacks with the right trim size, paper and cover finish — the book you'll be proud to hand to family.",
    icon: BookCopy,
    related: ["hardcover-publishing", "interior-layout-design", "cover-design"],
  },
  {
    slug: "hardcover-publishing",
    category: "publishing-pathways",
    title: "Hardcover Publishing",
    summary:
      "Durable, elegant hardcover editions for keepsakes, gifts and libraries, with case-laminate or dust-jacket options.",
    icon: BookMarked,
    related: ["paperback-publishing", "cover-design", "interior-layout-design"],
  },
  {
    slug: "audiobook-production",
    category: "publishing-pathways",
    title: "Audiobook Production",
    summary:
      "Professional narration, recording and mastering so your story can be heard on Audible, Apple Books and more.",
    icon: Headphones,
    featured: true,
    related: ["book-publishing", "global-book-distribution", "book-marketing"],
  },

  // ── Author Services · Editing ──────────────────────────────────────────
  {
    slug: "editing-proofreading",
    category: "author-services",
    group: "Editing",
    title: "Editing & Proofreading",
    summary:
      "Polish your manuscript, correct errors and improve clarity while keeping your voice unmistakably your own.",
    icon: PenLine,
    featured: true,
    related: ["developmental-editing", "line-editing", "copy-editing"],
  },
  {
    slug: "developmental-editing",
    category: "author-services",
    group: "Editing",
    title: "Developmental Editing",
    summary:
      "Big-picture guidance on structure, pacing, characters and story flow — ideal for a first full draft.",
    icon: Compass,
    related: ["line-editing", "editing-proofreading", "book-publishing"],
  },
  {
    slug: "line-editing",
    category: "author-services",
    group: "Editing",
    title: "Line Editing",
    summary: "Sentence-by-sentence refinement of rhythm, word choice and tone so every page reads smoothly.",
    icon: Pilcrow,
    related: ["developmental-editing", "copy-editing", "editing-proofreading"],
  },
  {
    slug: "copy-editing",
    category: "author-services",
    group: "Editing",
    title: "Copy Editing",
    summary: "Careful correction of grammar, spelling, punctuation and consistency before your book goes to print.",
    icon: SpellCheck,
    related: ["line-editing", "editing-proofreading", "book-formatting"],
  },

  // ── Author Services · Design & Formatting ──────────────────────────────
  {
    slug: "book-formatting",
    category: "author-services",
    group: "Design & Formatting",
    title: "Book Formatting",
    summary: "Your manuscript prepared to exact print and eBook specifications, ready to upload without surprises.",
    icon: AlignLeft,
    related: ["interior-layout-design", "ebook-publishing", "paperback-publishing"],
  },
  {
    slug: "interior-layout-design",
    category: "author-services",
    group: "Design & Formatting",
    title: "Interior Layout Design",
    summary:
      "Considered typography, chapter openings and photo placement — especially valuable for memoirs and family histories.",
    icon: LayoutTemplate,
    related: ["book-formatting", "cover-design", "hardcover-publishing"],
  },
  {
    slug: "cover-design",
    category: "author-services",
    group: "Design & Formatting",
    title: "Cover Design",
    summary: "A professional, genre-appropriate cover that reflects your story and stands out on any shelf.",
    icon: Palette,
    featured: true,
    related: ["interior-layout-design", "book-description-writing", "paperback-publishing"],
  },

  // ── Author Services · Book Setup ───────────────────────────────────────
  {
    slug: "isbn-setup",
    category: "author-services",
    group: "Book Setup",
    title: "ISBN Setup",
    summary: "The right ISBNs and barcodes for each edition of your book, registered correctly in your name.",
    icon: Barcode,
    related: ["metadata-optimization", "bisac-keyword-research", "global-book-distribution"],
  },
  {
    slug: "metadata-optimization",
    category: "author-services",
    group: "Book Setup",
    title: "Metadata Optimization",
    summary:
      "Titles, subtitles, categories and details set up so retailers and readers can find your book easily.",
    icon: Tags,
    related: ["bisac-keyword-research", "isbn-setup", "book-description-writing"],
  },
  {
    slug: "bisac-keyword-research",
    category: "author-services",
    group: "Book Setup",
    title: "BISAC & Keyword Research",
    navLabel: "BISAC & Keywords",
    summary: "The best subject categories and search keywords for your book, chosen from real reader behaviour.",
    icon: Search,
    related: ["metadata-optimization", "amazon-ads", "amazon-kdp-publishing"],
  },

  // ── Author Services · Book Copy ────────────────────────────────────────
  {
    slug: "book-description-writing",
    category: "author-services",
    group: "Book Copy",
    title: "Book Description Writing",
    navLabel: "Book Descriptions",
    summary: "A warm, compelling back-cover and online description that invites readers to open your book.",
    icon: FileText,
    related: ["author-bio-writing", "a-plus-content-design", "metadata-optimization"],
  },
  {
    slug: "author-bio-writing",
    category: "author-services",
    group: "Book Copy",
    title: "Author Bio Writing",
    summary: "A short, genuine author biography that introduces you to readers with confidence.",
    icon: UserRound,
    related: ["book-description-writing", "author-website-design", "press-release"],
  },

  // ── Marketing & Visibility ─────────────────────────────────────────────
  {
    slug: "book-marketing",
    category: "marketing-visibility",
    title: "Book Marketing",
    summary: "A clear, realistic launch and promotion plan built around your book, your goals and your readers.",
    icon: Megaphone,
    featured: true,
    related: ["amazon-ads", "social-media-promotion", "press-release"],
  },
  {
    slug: "amazon-ads",
    category: "marketing-visibility",
    title: "Amazon Ads",
    summary: "Carefully managed Amazon advertising campaigns that put your book in front of interested readers.",
    icon: Target,
    related: ["bisac-keyword-research", "a-plus-content-design", "book-marketing"],
  },
  {
    slug: "a-plus-content-design",
    category: "marketing-visibility",
    title: "A+ Content Design",
    summary: "Attractive image-and-text panels for your Amazon book page that tell readers more about your story.",
    icon: LayoutPanelTop,
    related: ["amazon-ads", "book-description-writing", "amazon-kdp-publishing"],
  },
  {
    slug: "social-media-promotion",
    category: "marketing-visibility",
    title: "Social Media Promotion",
    summary: "Friendly, consistent posts and visuals that share your book with readers on the platforms they use.",
    icon: Share2,
    related: ["book-trailer", "book-marketing", "author-website-design"],
  },
  {
    slug: "press-release",
    category: "marketing-visibility",
    title: "Press Release",
    summary: "A professionally written announcement of your book, distributed to media outlets and local press.",
    icon: Newspaper,
    related: ["book-marketing", "author-bio-writing", "author-website-design"],
  },
  {
    slug: "author-website-design",
    category: "marketing-visibility",
    title: "Author Website Design",
    summary: "A simple, elegant home online for you and your books — easy for readers to visit and for you to update.",
    icon: MonitorSmartphone,
    featured: true,
    related: ["author-bio-writing", "social-media-promotion", "book-trailer"],
  },
  {
    slug: "book-trailer",
    category: "marketing-visibility",
    title: "Book Trailer & Visual Promo",
    navLabel: "Book Trailer",
    summary: "A short, tasteful video and promotional visuals that bring the mood of your book to life.",
    icon: Clapperboard,
    related: ["social-media-promotion", "book-marketing", "author-website-design"],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────

export const serviceHref = (s: Pick<Service, "category" | "slug">) => `/${s.category}/${s.slug}`;

export const getService = (category: ServiceCategorySlug, slug: string) =>
  services.find((s) => s.category === category && s.slug === slug);

export const getServicesByCategory = (category: ServiceCategorySlug) =>
  services.filter((s) => s.category === category);

export const getFeaturedServices = () => services.filter((s) => s.featured);

export const getRelatedServices = (s: Service) =>
  (s.related ?? []).map((slug) => services.find((x) => x.slug === slug)).filter((x): x is Service => !!x);
