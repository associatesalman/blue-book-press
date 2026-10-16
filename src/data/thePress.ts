import { statList } from "./stats";
import {
  AudioLines,
  BookHeart,
  Baby,
  BookMarked,
  Briefcase,
  Compass,
  FileCheck2,
  Globe2,
  GraduationCap,
  Handshake,
  KeyRound,
  Layers,
  LibraryBig,
  Megaphone,
  Palette,
  PenLine,
  Rocket,
  ScrollText,
  Settings2,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { services } from "./services";

/** Content for /the-press. Service links resolve from services.ts so they never drift. */

export const pressHero = {
  eyebrow: "The Press",
  title: "The Press Behind Meaningful Stories",
  text: "Blue Book Press helps authors shape, prepare, publish, and share their books with the care of a traditional publishing house and the flexibility modern writers need.",
  primary: { label: "Start Your Publishing Journey", href: "/start-your-book" },
  secondary: { label: "Explore Publishing Pathways", href: "/publishing-pathways" },
  covers: [
    "/portfolio/books-web/graves.jpg",
    "/portfolio/books-web/the-insanity-criterion.jpg",
    "/portfolio/books-web/emotional-intelligence-for-anxiety.jpg",
    "/portfolio/books-web/seeing-sound.jpg",
    "/portfolio/books-web/life-after-phantom.jpg",
  ],
};

export const whoWeAre = {
  eyebrow: "Who We Are",
  title: "A modern publishing house, built around the author.",
  paragraphs: [
    "Blue Book Press was created for authors who want more than a quick upload. We support writers through the full publishing journey, from manuscript preparation and editorial refinement to book design, formatting, distribution, audiobook production, and marketing visibility.",
    "We work the way a traditional house works — with editors, designers and production specialists who care about the finished book — but we never ask you to give up your rights or your voice. You decide what your book becomes. We bring the experience to make it happen properly.",
  ],
  points: [
    "Editors, designers and production specialists under one roof",
    "Print, eBook and audiobook editions from a single manuscript",
    "Your rights, your royalties, your name on the cover",
  ],
};

export type Pillar = { icon: LucideIcon; title: string; text: string; serviceSlugs: string[] };

export const pillars: Pillar[] = [
  {
    icon: PenLine,
    title: "Editorial Refinement",
    text: "Developmental guidance, line and copy editing, and a final proofread — all in service of your voice, never replacing it.",
    serviceSlugs: ["developmental-editing", "line-editing", "copy-editing", "editing-proofreading"],
  },
  {
    icon: Palette,
    title: "Book Design & Formatting",
    text: "Covers designed for your genre and readers, and interiors typeset with the care a printed book deserves.",
    serviceSlugs: ["cover-design", "interior-layout-design", "book-formatting"],
  },
  {
    icon: Settings2,
    title: "Publishing Setup",
    text: "ISBNs, metadata, categories and keywords, retailer accounts and platform files — prepared correctly the first time.",
    serviceSlugs: ["book-publishing", "self-publishing-support", "amazon-kdp-publishing", "isbn-setup", "metadata-optimization", "bisac-keyword-research"],
  },
  {
    icon: Globe2,
    title: "Global Distribution",
    text: "Paperback, hardcover and eBook editions made available to online retailers, bookstores and libraries worldwide.",
    serviceSlugs: ["global-book-distribution", "paperback-publishing", "hardcover-publishing", "ebook-publishing"],
  },
  {
    icon: AudioLines,
    title: "Audiobook Production",
    text: "Narrator casting, studio recording, editing and mastering to the standards audio retailers require.",
    serviceSlugs: ["audiobook-production"],
  },
  {
    icon: Megaphone,
    title: "Marketing & Visibility",
    text: "Launch planning, Amazon advertising, social promotion, press outreach and retailer page design.",
    serviceSlugs: ["book-marketing", "amazon-ads", "social-media-promotion", "press-release", "a-plus-content-design", "book-trailer"],
  },
  {
    icon: UserRound,
    title: "Author Brand Support",
    text: "The words and presence that introduce you to readers — your description, your biography and your website.",
    serviceSlugs: ["book-description-writing", "author-bio-writing", "author-website-design"],
  },
];

export const pillarServices = (p: Pillar) =>
  p.serviceSlugs.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean);

/** The shared site-wide figures (data/stats.ts), shaped for the counting band. */
export const pressNumbers: { value: number; plus?: boolean; suffix?: string; label: string; note: string }[] = statList.map((s) => ({
  value: s.value,
  plus: s.suffix === "+",
  suffix: s.suffix === "%" ? "%" : undefined,
  label: s.label,
  note: s.note,
}));

export const vision = {
  eyebrow: "Our Vision",
  quote:
    "Every author has a reason for writing. Our vision is to help those stories move from private manuscripts into professionally prepared books that can reach readers across print, digital, audio, and global platforms.",
  signoff: "The Blue Book Press promise",
};

export const method: { title: string; text: string; detail: string }[] = [
  {
    title: "Understand the author's story and goals",
    text: "We begin by listening — to what your book is about, who it is for, and what success would mean to you.",
    detail: "Free consultation · written recommendation",
  },
  {
    title: "Review and refine the manuscript",
    text: "An editorial assessment shapes the right level of editing, from structural guidance to a final proofread.",
    detail: "Developmental, line & copy editing",
  },
  {
    title: "Design the book experience",
    text: "Cover, interior, typography and trim size are designed together, so the book feels right in the hand and on screen.",
    detail: "Cover · interior · formatting",
  },
  {
    title: "Prepare publishing files and metadata",
    text: "Print-ready and eBook files, ISBNs, categories, keywords and descriptions are prepared and checked line by line.",
    detail: "ISBN · BISAC · keywords · retailer files",
  },
  {
    title: "Set up distribution and launch",
    text: "Your editions go live on the platforms you choose, with proofs approved by you before anything is released.",
    detail: "Print · eBook · audio · worldwide",
  },
  {
    title: "Build visibility through marketing support",
    text: "Optional launch and promotion support helps the right readers discover your book after publication.",
    detail: "Launch plans · ads · press · social",
  },
];

export const differences: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Compass, title: "Full publishing journey support", text: "From the first conversation to life after launch — not a single task handed back to you half-finished." },
  { icon: Layers, title: "Print, eBook and audiobook capability", text: "Every major format produced from one manuscript, so your editions stay consistent." },
  { icon: BookMarked, title: "Editorial and design under one roof", text: "Editors and designers work together on your book instead of passing files between strangers." },
  { icon: FileCheck2, title: "Platform-ready publishing setup", text: "Files, metadata and accounts prepared to each retailer's specification, so nothing is rejected." },
  { icon: Rocket, title: "Marketing and author visibility", text: "Practical, honest promotion support that matches your goals and budget." },
  { icon: KeyRound, title: "You keep control and ownership", text: "Your rights and royalties stay with you, and nothing is published without your approval." },
  { icon: Handshake, title: "A guided process, not DIY confusion", text: "Clear explanations at every step, from a team that answers your questions personally." },
];

/**
 * Audience types for "Built for Storytellers". Each has a matching cover from
 * /public/storytellers (web-optimised copies of portfolio covers), shown only
 * in that section. Replace a file there to change its image.
 */
export type Storyteller = { icon: LucideIcon; title: string; text: string; image: { src: string; alt: string } };

const cover = (file: string, alt: string) => ({ src: `/storytellers/${file}.webp`, alt });

export const storytellers: Storyteller[] = [
  { icon: BookHeart, title: "Memoir writers", text: "Preserve a life's story with the care it deserves — for family, for history, for readers yet to meet you.", image: cover("memoir", "The Devil: Diary of an Addict, Part Two — book cover") },
  { icon: Sparkles, title: "Fiction authors", text: "Novels and series edited, designed and positioned to stand alongside the books your readers already love.", image: cover("fiction", "What Fits by Kenneth McKuhen II — book cover") },
  { icon: Baby, title: "Children's book authors", text: "Picture books and early readers with layouts and illustrations that work on the page and in small hands.", image: cover("childrens", "A Baptism Book for Girls — book cover") },
  { icon: GraduationCap, title: "Educational authors", text: "Guides, workbooks and learning resources formatted for clarity, structure and real classroom use.", image: cover("educational", "Emotional Intelligence for Anxiety by Somer Zappe — book cover") },
  { icon: Briefcase, title: "Professional experts", text: "Books that share your expertise and strengthen your reputation, prepared to a professional standard.", image: cover("professional", "When Everything Changes by Linda Rose Cooper — book cover") },
  { icon: ScrollText, title: "First-time authors", text: "Patient, plain-language guidance for anyone publishing a book for the very first time.", image: cover("first-time", "Escape Velocity by Jake Grenier — book cover") },
  { icon: LibraryBig, title: "Previously published authors", text: "New editions, reissued backlist titles, audiobook versions and fresh marketing for books already out in the world.", image: cover("previously-published", "Touching Oblivion by Albany Walker — book cover") },
];

export const pressCta = {
  title: "Your story deserves a publishing path built with care.",
  text: "Whether your manuscript is finished, still developing, or ready for a wider audience, Blue Book Press can help you plan the next step with clarity.",
  primary: { label: "Book a Consultation", href: "/consultation" },
  secondary: { label: "View Our Services", href: "/publishing-pathways" },
};
