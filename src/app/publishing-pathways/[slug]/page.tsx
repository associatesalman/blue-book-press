import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PathwaySoloPage } from "@/components/service/PathwaySoloPage";
import { pages } from "@/data/pages";
import { getPathwayPage } from "@/data/pathwayPages";
import { getService, getServicesByCategory, serviceHref } from "@/data/services";

const CATEGORY = "publishing-pathways";
type Props = { params: Promise<{ slug: string }> };

// Only the services listed in data/services.ts exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return getServicesByCategory(CATEGORY).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(CATEGORY, slug);
  const content = getPathwayPage(slug);
  if (!service || !content) return {};
  return {
    title: service.title,
    description: content.hero.subtitle,
    alternates: { canonical: serviceHref(service) },
  };
}

/** Solo Publishing Pathways service page (blue editorial template, seven sections). */
export default async function PublishingServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(CATEGORY, slug);
  const content = getPathwayPage(slug);
  if (!service || !content) notFound();
  const related = content.fit.related
    .map((s) => getService(CATEGORY, s))
    .filter((s) => !!s)
    .map((s) => ({ slug: s.slug, title: s.title, href: serviceHref(s) }));
  return (
    <PathwaySoloPage
      slug={slug}
      title={service.title}
      content={content}
      related={related}
      category={{ label: pages[CATEGORY].title, href: pages[CATEGORY].path }}
    />
  );
}
