import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/common/PagePlaceholder";
import { getBreadcrumbs } from "@/data/pages";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getCaseStudy((await params).slug);
  return item ? { title: item.title, description: item.summary } : {};
}

export default async function Page({ params }: Props) {
  const item = getCaseStudy((await params).slug);
  if (!item) notFound();
  const page = { path: `/bookshelf/case-studies/${item.slug}`, title: item.title, description: item.summary };
  return <PagePlaceholder page={page} trail={[...getBreadcrumbs("case-studies"), page]} />;
}
