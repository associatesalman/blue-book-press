import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingSoloPage } from "@/components/marketing/MarketingSoloPage";
import { PagePlaceholder } from "@/components/common/PagePlaceholder";
import { getMarketingServicePage } from "@/data/marketingServicePages";
import { mvServices } from "@/data/marketingVisibility";
import { getBreadcrumbs, pages } from "@/data/pages";
import { getService, getServicesByCategory, serviceHref, services } from "@/data/services";

const CATEGORY = "marketing-visibility";
type Props = { params: Promise<{ slug: string }> };

// Only the services listed in data/services.ts exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return getServicesByCategory(CATEGORY).map((s) => ({ slug: s.slug }));
}

/** Display title: the hub's service name where it differs (e.g. "Book Marketing Strategy"). */
const titleFor = (slug: string, fallback: string) => mvServices.find((s) => s.slug === slug)?.name ?? fallback;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(CATEGORY, slug);
  if (!service) return {};
  const content = getMarketingServicePage(slug);
  return {
    title: titleFor(slug, service.title),
    description: content?.hero.purpose ?? service.summary,
    alternates: { canonical: serviceHref(service) },
  };
}

/** Solo Marketing & Visibility page ("campaign" template). */
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(CATEGORY, slug);
  if (!service) notFound();

  if (!getMarketingServicePage(slug)) {
    const trail = [...getBreadcrumbs(CATEGORY), { path: serviceHref(service), title: service.title, description: service.summary }];
    return <PagePlaceholder page={{ title: service.title, description: service.summary }} trail={trail} />;
  }

  // Related services may sit in any category (e.g. Author Bio Writing).
  const related = (service.related ?? [])
    .map((s) => services.find((x) => x.slug === s))
    .filter((s) => !!s)
    .map((s) => ({ slug: s.slug, title: titleFor(s.slug, s.title), href: serviceHref(s) }));

  return (
    <MarketingSoloPage
      slug={slug}
      title={titleFor(slug, service.title)}
      related={related}
      category={{ label: pages[CATEGORY].title, href: pages[CATEGORY].path }}
    />
  );
}
