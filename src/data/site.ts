/**
 * Brand-wide constants. Name and contact details are placeholders until the
 * final brand name, phone and email are confirmed (see docs/SITE_PLAN.md §10).
 */
export const site = {
  name: "Blue Book Press",
  tagline: "Your Story, Beautifully Published",
  description:
    "A modern classic publishing house helping authors publish memoirs, family histories, fiction and children's books with care, craft and personal guidance.",
  url: "https://www.bluebookpress.com",
  email: "hello@bluebookpress.com",
  phone: "",
  platforms: ["Amazon", "Barnes & Noble", "Apple Books", "Google Play Books", "Audible", "IngramSpark"],
  /** TODO(site owner): replace "#" with real profile URLs — the footer hides links until then. */
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
} as const;
