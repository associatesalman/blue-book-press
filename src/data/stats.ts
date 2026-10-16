/**
 * The one set of trust figures used across the site (homepage "Welcome to The
 * Press", The Press numbers band, The Press services panel). Change a figure
 * here and it changes everywhere — never hard-code these numbers elsewhere.
 * Process and scope figures only; no sales or outcome guarantees.
 */
export type SiteStat = { value: number; suffix: "+" | "%"; label: string; note: string };

export const siteStats = {
  works: {
    value: 4000,
    suffix: "+",
    label: "Published works & author projects supported",
    note: "Books and author projects guided from manuscript to readers.",
  },
  services: {
    value: 25,
    suffix: "+",
    label: "Publishing & author services",
    note: "Each with its own dedicated page and specialist.",
  },
  formats: {
    value: 5,
    suffix: "+",
    label: "Publishing formats",
    note: "Kindle, EPUB, paperback, hardcover and audiobook.",
  },
  categories: {
    value: 10,
    suffix: "+",
    label: "Book categories supported",
    note: "From fiction and memoir to children's, business and educational books.",
  },
  pages: {
    value: 40,
    suffix: "+",
    label: "Pages of author guidance",
    note: "Service guides, resources and answers across the site.",
  },
  ownership: {
    value: 100,
    suffix: "%",
    label: "Author ownership focus",
    note: "Your rights, your royalties and your final approval.",
  },
} satisfies Record<string, SiteStat>;

/** Display order wherever the full set is shown. */
export const statList: SiteStat[] = [
  siteStats.works,
  siteStats.services,
  siteStats.formats,
  siteStats.categories,
  siteStats.pages,
  siteStats.ownership,
];

export const formatStat = (s: SiteStat) => `${s.value}${s.suffix}`;
