/** Case studies — each gets a detail page at /bookshelf/case-studies/[slug]. */
export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  bookSlug: string;
  challenge: string;
  approach: string;
  outcome: string;
  /** Service slugs. */
  services: string[];
};

export const caseStudies: CaseStudy[] = [];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
