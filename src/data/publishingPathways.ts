import { BookCopy, Globe2, Headphones, TabletSmartphone, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  FaAmazon,
  FaBarcode,
  FaBook,
  FaBookBookmark,
  FaBookOpen,
  FaGlobe,
  FaHeadphones,
  FaLayerGroup,
  FaMagnifyingGlass,
  FaPenNib,
  FaTabletScreenButton,
  FaTags,
} from "react-icons/fa6";
import { SiApple, SiAudible, SiGoogleplay, SiRakutenkobo } from "react-icons/si";
import type { ClosingCtaContent } from "@/components/common/ClosingCta";
import type { ImageHeroContent } from "@/components/common/ImageHero";
import type { MarqueeItem } from "@/components/common/WordMarquee";
import { pages } from "./pages";
import { getServicesByCategory, serviceHref, type Service } from "./services";

/**
 * Content for /publishing-pathways — the category hub for all eight
 * Publishing Pathways services. Titles, icons and links come from
 * services.ts; this file adds the page-specific copy.
 */

export const ppMedia = {
  /** Glowing-book artwork (from public/publishing pathways/hero image background.png). */
  hero: {
    src: "/publishing-pathways/pathways-hero.webp",
    width: 1672,
    height: 941,
    alt: "A reader walks a beam of light rising from an open book — Blue Book Press Publishing Pathways",
  },
  /** 9:16 portrait clip, served from the folder it was uploaded to. */
  video: { src: "/publishing%20pathways/publishing-pathways-service.mp4" },
};

export const ppHero: ImageHeroContent = {
  image: ppMedia.hero,
  title: ["Every", "Route", "From", "Manuscript", "to", "Reader"],
  accentFrom: 4,
  subtitle:
    "Print, digital, audio and worldwide distribution — Blue Book Press helps you choose the right publishing pathway and prepares every edition properly.",
  primary: { label: "Explore the Pathways", href: "#pathways" },
  secondary: { label: "Get a Publishing Consultation", href: pages["book-consultation"].path },
};

export const ppMarquee: MarqueeItem[] = [
  { label: "Book Publishing", icon: FaBookOpen },
  { label: "Self-Publishing", icon: FaPenNib },
  { label: "Amazon KDP", icon: FaAmazon },
  { label: "eBook Publishing", icon: FaTabletScreenButton },
  { label: "Paperback", icon: FaBook },
  { label: "Hardcover", icon: FaBookBookmark },
  { label: "Global Distribution", icon: FaGlobe },
  { label: "Audiobook Production", icon: FaHeadphones },
  { label: "ISBN", icon: FaBarcode },
  { label: "Metadata", icon: FaTags },
  { label: "BISAC", icon: FaLayerGroup },
  { label: "Keywords", icon: FaMagnifyingGlass },
];

export const ppDefine = {
  eyebrow: "What Publishing Pathways Means",
  term: "pathway",
  definition: "the route a finished manuscript takes to reach its readers — in print, on screen, in audio, or all three.",
  title: "One manuscript. Several ways to reach readers.",
  text: "A publishing pathway is more than an upload. It is the format, the platforms, the setup details and the decisions behind them. We help you choose the right route for your goals, then prepare each edition so it is ready for the stores and readers it is meant for.",
  formats: [
    { icon: BookCopy, title: "Print", text: "Paperback and hardcover editions prepared to printer specification.", formats: "Paperback · Hardcover" },
    { icon: TabletSmartphone, title: "Digital", text: "Reflowable eBooks that read comfortably on any device.", formats: "Kindle · EPUB" },
    { icon: Headphones, title: "Audio", text: "Professionally narrated audiobooks ready for audio retailers.", formats: "Audiobook" },
    { icon: Globe2, title: "Global", text: "Listings with major retailers and distribution networks worldwide.", formats: "Retailers · Libraries" },
  ] satisfies { icon: LucideIcon; title: string; text: string; formats: string }[],
  essentials: ["ISBN", "Metadata", "BISAC categories", "Keywords", "Pricing guidance", "Print-on-demand setup", "File preparation"],
};

type PathwayDetail = { text: string; useCase: string; bullets: string[] };

const details: Record<string, PathwayDetail> = {
  "book-publishing": {
    text: "A complete, guided publishing service. One team coordinates editing, design, formatting and setup, and explains each decision before it is made.",
    useCase: "Authors who want a professional result without managing every specialist.",
    bullets: ["Editorial, design and formatting coordinated", "ISBN, metadata and listings handled", "One dedicated publishing manager"],
  },
  "self-publishing-support": {
    text: "Publish under your own name and accounts, with an experienced team beside you for setup, uploads and the decisions that matter.",
    useCase: "Authors who want full control, ownership and royalties.",
    bullets: ["You keep rights and royalties", "Accounts and uploads set up with you", "Expert answers whenever you need them"],
  },
  "amazon-kdp-publishing": {
    text: "Your book set up properly on Kindle Direct Publishing — listing, categories, keywords and pricing — in eBook, paperback or both.",
    useCase: "Authors launching on the world's largest book store.",
    bullets: ["Listing, categories and keywords", "Pricing and royalty options explained", "Kindle and print editions linked"],
  },
  "global-book-distribution": {
    text: "Distribution through major online retailers and wholesale networks, with consistent metadata so your book is easy to find everywhere.",
    useCase: "Authors who want availability beyond a single store.",
    bullets: ["Wide online retailer availability", "Library and bookstore ordering channels", "Consistent details across platforms"],
  },
  "ebook-publishing": {
    text: "Clean, reflowable eBook files that adapt to every screen and let readers choose a comfortable text size.",
    useCase: "Reaching readers on Kindle, tablets and phones.",
    bullets: ["Kindle and EPUB conversion", "Linked contents and clean images", "Tested on common reading devices"],
  },
  "paperback-publishing": {
    text: "A print-ready interior and full-wrap cover built to your trim size and page count, set up for print-on-demand.",
    useCase: "An affordable, giftable print edition.",
    bullets: ["Trim size and paper guidance", "Print-ready interior and cover", "Print-on-demand setup"],
  },
  "hardcover-publishing": {
    text: "A durable, premium edition with case-laminate or dust-jacket covers designed precisely to specification.",
    useCase: "Keepsakes, family histories, gifts and libraries.",
    bullets: ["Case-laminate or dust-jacket options", "Spine and jacket designed to spec", "Premium, long-lasting finish"],
  },
  "audiobook-production": {
    text: "Narrator casting, directed recording, editing and mastering — produced to the standards audio retailers require.",
    useCase: "Reaching listeners who read with their ears.",
    bullets: ["Narrator casting and direction", "Editing and mastering to spec", "Delivery to audio platforms"],
  },
};

export type Pathway = Service & PathwayDetail & { href: string };

export const pathways: Pathway[] = getServicesByCategory("publishing-pathways").map((s) => ({
  ...s,
  ...details[s.slug],
  href: serviceHref(s),
}));

const pathway = (slug: string) => pathways.find((p) => p.slug === slug)!;

export const ppVideo = {
  eyebrow: "From File to Format",
  title: "Every edition, prepared together.",
  text: "Behind each pathway is careful, coordinated work — files built to each platform's specification, proofs approved by you, and a release planned across formats.",
  points: [
    { title: "Built to specification", text: "Print PDFs, covers and eBook files checked against each platform's requirements." },
    { title: "Approved by you", text: "Nothing is published until you have reviewed the proofs and listings." },
    { title: "Released in step", text: "Print, digital and audio editions linked and launched in a planned order." },
  ],
};

/** "If you want …" → the pathway(s) that fit. */
export const ppBreakdown = {
  eyebrow: "Pathways Breakdown",
  title: "Which pathway fits you?",
  intro: "Start from what you want for your book. Many authors combine pathways — we help you decide the order.",
  rows: [
    { want: "An Amazon launch", pathways: [pathway("amazon-kdp-publishing")] },
    { want: "Print copies", pathways: [pathway("paperback-publishing"), pathway("hardcover-publishing")] },
    { want: "Digital readers", pathways: [pathway("ebook-publishing")] },
    { want: "Wider reach", pathways: [pathway("global-book-distribution")] },
    { want: "Listeners", pathways: [pathway("audiobook-production")] },
    { want: "Guidance and control", pathways: [pathway("self-publishing-support")] },
  ],
};

export const ppDistribution = {
  eyebrow: "Global Distribution",
  title: "Available where readers already buy books.",
  text: "We prepare your book for major online retailers and wholesale networks, so readers can find and order it in many countries.",
  /**
   * Brand icons where an official mark exists in react-icons; otherwise the
   * closest neutral icon with a clear label (Kindle, Barnes & Noble).
   */
  platforms: [
    { name: "Amazon", icon: FaAmazon },
    { name: "Kindle", icon: FaTabletScreenButton },
    { name: "Apple Books", icon: SiApple },
    { name: "Google Play Books", icon: SiGoogleplay },
    { name: "Kobo", icon: SiRakutenkobo },
    { name: "Barnes & Noble", icon: FaBookOpen },
    { name: "Audible & audio", icon: SiAudible },
    { name: "Global distribution", icon: FaGlobe },
  ] satisfies { name: string; icon: IconType }[],
  note: "Availability across platforms does not guarantee physical bookstore shelf placement.",
};

export const ppCta: ClosingCtaContent = {
  eyebrow: "Publishing Consultation",
  title: "Not sure which publishing path",
  accent: "fits your book?",
  text: "Blue Book Press can help you review your goals, understand your options, and choose the publishing route that makes the most sense for your manuscript.",
  points: ["No-obligation consultation", "We reply personally", "A clear plan in plain language"],
  primary: { label: "Get a Publishing Consultation", href: pages["book-consultation"].path },
  secondary: { label: "Explore Author Services", href: pages["author-services"].path },
};
