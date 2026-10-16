/** The three service categories. Each has a hub page at `/${slug}`. */
export type ServiceCategorySlug = "publishing-pathways" | "author-services" | "marketing-visibility";

export type ServiceCategory = {
  slug: ServiceCategorySlug;
  title: string;
  summary: string;
  /** Optional sub-groups, in display order (used by the mega menu and hub page). */
  groups?: string[];
};

export const categories: ServiceCategory[] = [
  {
    slug: "publishing-pathways",
    title: "Publishing Pathways",
    summary:
      "Every route from finished manuscript to published book — print, digital and audio — with distribution to readers worldwide.",
  },
  {
    slug: "author-services",
    title: "Author Services",
    summary:
      "Careful editing, thoughtful design and the essential setup that makes a book ready for the shelf.",
    groups: ["Editing", "Design & Formatting", "Book Setup", "Book Copy"],
  },
  {
    slug: "marketing-visibility",
    title: "Marketing & Visibility",
    summary: "Gentle, effective ways to help the right readers find, notice and remember your book.",
  },
];

export const getCategory = (slug: ServiceCategorySlug) => categories.find((c) => c.slug === slug)!;
