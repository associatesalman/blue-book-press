import { BookOpenCheck, FileText, Fingerprint, LayoutTemplate, Palette, PenLine, type LucideIcon } from "lucide-react";
import type { ClosingCtaContent } from "@/components/common/ClosingCta";
import type { ImageHeroContent } from "@/components/common/ImageHero";
import type { MarqueeItem } from "@/components/common/WordMarquee";
import { pages } from "./pages";
import { getService, serviceHref } from "./services";

/**
 * Content for /author-services — the category hub introducing every Author
 * Services item. Icons and links come from services.ts; this file adds the
 * page-specific copy.
 */

export const asMedia = {
  /** Wide "Your Story" artwork (from public/author-services/hero-background.png). */
  hero: { src: "/author-services/hero.webp", width: 1672, height: 941, alt: "A reader walks beneath bookshelves that form the silhouette of an author's face" },
  /** Tall "Pick A Service" mockup (from public/author-services/for service right.png). */
  mockup: { src: "/author-services/pick-a-service.webp", width: 900, height: 1350, alt: "Open book holding colourful titles — Pick a Service, Blue Book Press Author Services" },
  video: { src: "/author-services/author-service.mp4" },
};

export const asHero: ImageHeroContent = {
  image: asMedia.hero,
  title: ["Author", "Services", "Built", "Around", "the", "Story"],
  accentFrom: 4,
  subtitle:
    "From manuscript refinement to book presentation, Blue Book Press helps authors prepare every detail with clarity, care, and professional polish.",
  primary: { label: "Explore Author Services", href: "#services" },
  secondary: { label: "Start Your Review", href: pages["start-your-book"].path },
};

export const asDefine = {
  eyebrow: "What Author Services Means",
  title: "Everything a manuscript needs before it meets readers.",
  text: "Author Services is the craft work between a finished draft and a published book. We refine the writing, shape how the pages look, design the cover and complete the setup details retailers expect — so your book is ready in every sense, not just written.",
  scope: [
    "Manuscript support",
    "Editing & proofreading",
    "Developmental editing",
    "Line editing",
    "Copy editing",
    "Formatting",
    "Interior layout",
    "Cover design",
    "ISBN & metadata",
    "Description & author bio",
  ],
  highlights: [
    { icon: BookOpenCheck, title: "Manuscript Support", text: "An honest read of where your draft stands and what it needs next." },
    { icon: PenLine, title: "Editorial Craft", text: "Developmental, line and copy editing, finished with a careful proofread." },
    { icon: LayoutTemplate, title: "Formatting & Layout", text: "Interiors set to print and eBook specification, designed to read beautifully." },
    { icon: Palette, title: "Cover Design", text: "A genre-right cover that looks at home on a shelf and in a thumbnail." },
    { icon: Fingerprint, title: "ISBN & Metadata", text: "Identifiers, categories and details registered correctly in your name." },
    { icon: FileText, title: "Book Copy", text: "A back-cover description and author bio that invite readers in." },
  ] satisfies { icon: LucideIcon; title: string; text: string }[],
};

type CardCopy = { slug: string; title?: string; text: string; bullets: [string, string] };

const cards: CardCopy[] = [
  { slug: "editing-proofreading", text: "A complete polish that corrects errors and sharpens clarity without losing your voice.", bullets: ["Grammar, spelling and clarity", "Final proofread before print"] },
  { slug: "developmental-editing", text: "Big-picture guidance on structure, pacing and character for a stronger draft.", bullets: ["Detailed editorial letter", "Structure and pacing notes"] },
  { slug: "line-editing", text: "Sentence-level refinement of rhythm, word choice and tone across every page.", bullets: ["Smoother, tighter prose", "Consistent voice and tone"] },
  { slug: "copy-editing", text: "Meticulous correction of grammar, punctuation and consistency.", bullets: ["House style applied", "Facts and names checked"] },
  { slug: "book-formatting", text: "Your manuscript prepared to exact print and eBook specifications.", bullets: ["Print-ready PDF and EPUB", "Upload-ready files"] },
  { slug: "interior-layout-design", text: "Considered typography, chapter openings and image placement.", bullets: ["Custom chapter styling", "Photos and captions placed"] },
  { slug: "cover-design", text: "A professional, genre-appropriate cover that stands out on any shelf.", bullets: ["Front, spine and back", "eBook and print versions"] },
  { slug: "isbn-setup", title: "ISBN & Metadata Setup", text: "Correct ISBNs, barcodes and book details for every edition.", bullets: ["Registered in your name", "Retailer-ready metadata"] },
  { slug: "book-description-writing", text: "A warm, compelling description that invites readers to open your book.", bullets: ["Back cover and online copy", "Written for your genre"] },
  { slug: "author-bio-writing", text: "A short, genuine biography that introduces you with confidence.", bullets: ["Short and long versions", "Matched to your book's tone"] },
];

export const asServices = cards.map((c, i) => {
  const s = getService("author-services", c.slug)!;
  return { ...c, index: i + 1, title: c.title ?? s.title, icon: s.icon, href: serviceHref(s) };
});

/** Huge marquee under the hero — label + the matching service's icon. */
export const asMarquee: MarqueeItem[] = (
  [
    ["Editing & Proofreading", "editing-proofreading"],
    ["Developmental Editing", "developmental-editing"],
    ["Line Editing", "line-editing"],
    ["Copy Editing", "copy-editing"],
    ["Book Formatting", "book-formatting"],
    ["Interior Layout", "interior-layout-design"],
    ["Cover Design", "cover-design"],
    ["ISBN Setup", "isbn-setup"],
    ["Metadata Optimization", "metadata-optimization"],
    ["Book Description", "book-description-writing"],
    ["Author Bio", "author-bio-writing"],
  ] as const
).map(([label, slug]) => ({ label, icon: getService("author-services", slug)!.icon }));

export const asProcess = {
  eyebrow: "How It Works",
  title: "From first read to publishing-ready, in five clear steps.",
  intro: "Every author starts somewhere different. The process stays the same: understand the book, then give it exactly the care it needs.",
  steps: [
    { title: "Review", text: "We read the manuscript or book files to understand where your book stands today." },
    { title: "Identify", text: "We pinpoint the editorial, design or setup support your book genuinely needs — nothing more." },
    { title: "Refine", text: "Our editors and designers refine the manuscript, layout or presentation with you." },
    { title: "Prepare", text: "Files, cover and details are finalised so the book meets publishing-ready standards." },
    { title: "Guide", text: "We walk you toward the next publishing step, so the book moves forward with confidence." },
  ],
};

export const asCta: ClosingCtaContent = {
  eyebrow: "Author Services Review",
  title: "Ready to prepare your book with",
  accent: "professional care?",
  text: "Whether your manuscript needs editing, formatting, design, or publishing-ready details, Blue Book Press can help you understand the next step clearly.",
  points: ["No-obligation review", "We reply personally", "A clear plan in plain language"],
  primary: { label: "Request an Author Services Review", href: pages["start-your-book"].path },
  secondary: { label: "View Publishing Pathways", href: pages["publishing-pathways"].path },
};
