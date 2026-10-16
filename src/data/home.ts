import { formatStat, statList } from "./stats";
import {
  BookOpenCheck,
  Globe,
  Handshake,
  Headphones,
  KeyRound,
  MessageCircleHeart,
  PenLine,
  ShieldCheck,
  TabletSmartphone,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";

/** Copy for the homepage sections. Services themselves come from services.ts. */

export const hero = {
  eyebrow: "A Modern Publishing House",
  title: "Publishing Stories That Deserve to Be Remembered",
  text: "From manuscript refinement to publishing, distribution, audiobook production, and author marketing, we help writers bring meaningful books to readers with care, clarity, and professional support.",
  primary: { label: "Start Your Publishing Journey", href: "/start-your-book" },
  secondary: { label: "Explore Our Services", href: "/publishing-pathways" },
  trust: ["Print, eBook & Audiobook", "Worldwide distribution", "One dedicated publishing team"],
};

export const trustIntro = {
  eyebrow: "Welcome to The Press",
  title: "Every book begins with a person and a story worth sharing.",
  text: [
    "Whether you are writing a memoir for your grandchildren, a family history, a first novel or a picture book, we guide you from finished manuscript to finished book — with editing, design, publishing and marketing under one roof.",
    "We explain every step in plain language, never rush a decision, and make sure the book that arrives at your door is one you are proud to hold.",
  ],
  /** Shared site-wide figures (data/stats.ts) so every page quotes the same numbers. */
  facts: statList.map((s) => ({ value: formatStat(s), label: s.label })),
};

export const production = {
  eyebrow: "Book Production",
  title: "Made properly, from the inside out.",
  text: "A professional book is hundreds of small decisions done right. We handle the craft and the technical setup so your book looks, reads and sells like it came from a major publisher.",
  image: { src: "/portfolio/portfolio-mockup-3books.webp", alt: "Three hardcover books from our portfolio" },
  items: [
    { title: "Formatting & interior layout", text: "Typesetting, chapter openings, photos and captions — print-ready and eBook-ready." },
    { title: "Paperback & hardcover setup", text: "Trim size, paper, binding, spine width and cover finish chosen with you." },
    { title: "ISBN & barcodes", text: "The right ISBN for every edition, registered correctly in your name." },
    { title: "Metadata, BISAC & keywords", text: "Categories and search terms that help retailers and readers find your book." },
  ],
};

export const audioDigital = {
  eyebrow: "Audiobook & Digital",
  title: "Your story, in every reader's favourite format.",
  formats: [
    {
      icon: Headphones as LucideIcon,
      title: "Audiobook Production",
      text: "Professional narrators, studio recording, careful editing and mastering to retailer standards — so your story can be heard on Audible, Apple Books and Spotify.",
      points: ["Narrator casting & auditions", "Studio recording & mastering", "Audible & retailer submission"],
      href: "/publishing-pathways/audiobook-production",
    },
    {
      icon: TabletSmartphone as LucideIcon,
      title: "eBook Publishing",
      text: "Clean, reflowable eBooks that read beautifully on Kindle, Apple Books, Kobo, tablets and phones — with adjustable text size for comfortable reading.",
      points: ["EPUB & Kindle formats", "Linked contents & images", "Global eBook retailers"],
      href: "/publishing-pathways/ebook-publishing",
    },
  ],
};

export const whyChooseUs: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: UserRoundCheck, title: "A real person, every step", text: "One dedicated publishing manager who knows your book and answers your questions." },
  { icon: KeyRound, title: "Your rights stay yours", text: "Your story, your name, your book. We publish it with you — never take it from you." },
  { icon: PenLine, title: "Editorial craft", text: "Experienced editors and designers who respect your voice and your vision." },
  { icon: Globe, title: "Truly worldwide reach", text: "Print, eBook and audio editions available through major retailers around the world." },
  { icon: ShieldCheck, title: "Clear, honest guidance", text: "Plain-language explanations and itemised quotes, with no pressure and no surprises." },
  { icon: BookOpenCheck, title: "Nothing goes out unapproved", text: "You review proofs at every stage. Your book is published only when you are happy." },
];

export const authorSupport = {
  eyebrow: "Author Support",
  title: "You will never be left wondering what happens next.",
  text: "Publishing can feel unfamiliar. That's why every author works with the same small team from start to finish — people who return your calls, explain your options and celebrate your launch with you.",
  promises: [
    { icon: MessageCircleHeart as LucideIcon, title: "Patient, personal answers", text: "Ask anything, as often as you need. There are no silly questions." },
    { icon: Handshake as LucideIcon, title: "Decisions made together", text: "We recommend; you decide. Every choice is explained before it's made." },
  ],
};

export const finalCta = {
  title: "Your story is ready. Let's give it the book it deserves.",
  text: "Book a free, no-obligation consultation. Tell us about your manuscript and we'll suggest the right path — in plain language, with no pressure.",
  primary: { label: "Book a Free Consultation", href: "/consultation" },
  secondary: { label: "Get a Publishing Quote", href: "/get-a-quote" },
};
