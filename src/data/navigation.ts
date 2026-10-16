import type { LucideIcon } from "lucide-react";
import { categories, type ServiceCategorySlug } from "./categories";
import { pages } from "./pages";
import { getServicesByCategory, serviceHref } from "./services";

export type NavLink = { label: string; href: string; description?: string; icon?: LucideIcon };
export type NavGroup = { heading?: string; links: NavLink[] };
export type NavItem = {
  label: string;
  href: string;
  /** One-line intro shown in the dropdown panel. */
  description?: string;
  /** Simple dropdown links. */
  children?: NavLink[];
  /** Mega-menu columns (service categories). */
  groups?: NavGroup[];
  /** Rendered as the header call-to-action button. */
  cta?: boolean;
};

const link = (key: keyof typeof pages, label?: string): NavLink => ({
  label: label ?? pages[key].title,
  href: pages[key].path,
});

/** Builds mega-menu columns for a category, split by sub-group when it has them. */
function serviceGroups(category: ServiceCategorySlug): NavGroup[] {
  const cat = categories.find((c) => c.slug === category)!;
  const items = getServicesByCategory(category);
  const toLink = (s: (typeof items)[number]): NavLink => ({
    label: s.navLabel ?? s.title,
    href: serviceHref(s),
    description: s.summary,
    icon: s.icon,
  });
  if (!cat.groups) return [{ links: items.map(toLink) }];
  return cat.groups.map((heading) => ({
    heading,
    links: items.filter((s) => s.group === heading).map(toLink),
  }));
}

/** Primary navigation — 8 items, shown in the header and mobile menu. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "The Press", href: pages["the-press"].path },
  {
    label: "Publishing Pathways",
    href: pages["publishing-pathways"].path,
    description: categories[0].summary,
    groups: serviceGroups("publishing-pathways"),
  },
  {
    label: "Author Services",
    href: pages["author-services"].path,
    description: categories[1].summary,
    groups: serviceGroups("author-services"),
  },
  {
    label: "Marketing & Visibility",
    href: pages["marketing-visibility"].path,
    description: categories[2].summary,
    groups: serviceGroups("marketing-visibility"),
  },
  { label: "Portfolio", href: pages.portfolio.path },
  {
    label: "Author Resources",
    href: pages["author-resources"].path,
    description: "Practical guidance for every stage of writing and publishing.",
    children: [link("author-resources", "Articles"), link("faqs")],
  },
  {
    label: "Start Your Book",
    href: pages["start-your-book"].path,
    cta: true,
    description: "Tell us about your book — we reply personally.",
    children: [link("start-your-book", "Contact Us"), link("book-consultation"), link("get-a-quote")],
  },
];

/** Policy pages — footer Legal column and the policy pages themselves. */
export const legalNav: NavLink[] = [
  link("privacy"),
  link("terms"),
  link("cookie-policy"),
  link("refund-policy"),
  link("accessibility", "Accessibility"),
];

/** Footer link columns. Only completed, working pages belong here. */
export const footerNav: NavGroup[] = [
  {
    heading: "Explore",
    links: [link("home"), link("the-press"), link("portfolio"), link("author-resources", "Articles"), link("faqs")],
  },
  {
    heading: "Services",
    links: [link("publishing-pathways"), link("author-services"), link("marketing-visibility")],
  },
  {
    heading: "Get Started",
    links: [link("book-consultation", "Consultation"), link("start-your-book")],
  },
  { heading: "Legal", links: legalNav },
];

/** Shown in the footer bottom bar. */
export const footerBottomNav: NavLink[] = [link("privacy"), link("terms")];
