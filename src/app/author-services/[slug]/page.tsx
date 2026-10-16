import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorServiceSoloPage } from "@/components/author-services/AuthorServiceSoloPage";
import { PagePlaceholder } from "@/components/common/PagePlaceholder";
import { getAuthorServicePage } from "@/data/authorServicePages";
import { asServices } from "@/data/authorServices";
import { getBreadcrumbs, pages } from "@/data/pages";
import { getService, getServicesByCategory, serviceHref } from "@/data/services";

const CATEGORY = "author-services";
type Props = { params: Promise<{ slug: string }> };

// Only the services listed in data/services.ts exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return getServicesByCategory(CATEGORY).map((s) => ({ slug: s.slug }));
}

/** Display title: the hub's card title where it differs (e.g. "ISBN & Metadata Setup"). */
const titleFor = (slug: string, fallback: string) => asServices.find((c) => c.slug === slug)?.title ?? fallback;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(CATEGORY, slug);
  if (!service) return {};
  const content = getAuthorServicePage(slug);
  return {
    title: titleFor(slug, service.title),
    description: content?.hero.purpose ?? service.summary,
    alternates: { canonical: serviceHref(service) },
  };
}

/** Solo Author Services page (stacked-sheet editorial template). */
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(CATEGORY, slug);
  if (!service) notFound();
  const content = getAuthorServicePage(slug);

  if (!content) {
    const trail = [...getBreadcrumbs(CATEGORY), { path: serviceHref(service), title: service.title, description: service.summary }];
    return <PagePlaceholder page={{ title: service.title, description: service.summary }} trail={trail} />;
  }

  const next = content.cta.next
    .map((s) => getService(CATEGORY, s))
    .filter((s) => !!s)
    .map((s) => ({ slug: s.slug, title: titleFor(s.slug, s.title), href: serviceHref(s), summary: s.summary }));

  return (
    <AuthorServiceSoloPage
      slug={slug}
      title={titleFor(slug, service.title)}
      content={content}
      next={next}
      category={{ label: pages[CATEGORY].title, href: pages[CATEGORY].path }}
    />
  );
}
