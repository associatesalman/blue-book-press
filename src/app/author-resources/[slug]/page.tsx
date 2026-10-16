import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { ImageReveal, Reveal } from "@/components/common/Reveal";
import { LineReveal } from "@/components/portfolio/motion";
import { ArticleBody } from "@/components/resources/ArticleBody";
import { MediumStory } from "@/components/resources/ArticlePreview";
import { ArticleToc } from "@/components/resources/ArticleToc";
import { ResourcesCta } from "@/components/resources/ResourceSections";
import {
  EDITORIAL_TEAM,
  articleHref,
  articles,
  formatDate,
  getArticle,
  headingId,
  relatedArticles,
} from "@/data/articles";
import { pages } from "@/data/pages";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getArticle((await params).slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: articleHref(item) },
    openGraph: { type: "article", title: item.title, description: item.excerpt, publishedTime: item.date },
  };
}

const categoryHref = (c: string) => `${pages["author-resources"].path}?category=${c.toLowerCase().replace(/\s+/g, "-")}#articles`;

/** Reusable article template: header, image, body with contents, related reading and a contact CTA. */
export default async function Page({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const toc = article.body.filter((b) => b.type === "h2").map((b) => ({ id: headingId(b.text), text: b.text }));
  const showToc = toc.length >= 3;
  const related = relatedArticles(article);

  return (
    <>
      <article aria-labelledby="article-title">
        <header className="bg-white pt-[clamp(2rem,5vw,3.5rem)]">
          <div className="container-site">
            <nav aria-label="Breadcrumb" className="text-[0.92rem] text-ink-muted">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <li>
                  <Link href="/" className="hover:text-brand">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href={pages["author-resources"].path} className="hover:text-brand">
                    Articles
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href={categoryHref(article.category)} className="hover:text-brand">
                    {article.category}
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="mt-[clamp(2.5rem,6vw,4.5rem)] max-w-4xl">
              <Reveal y={14}>
                <Link href={categoryHref(article.category)} className="eyebrow text-[0.78rem] text-brand hover:text-ink">
                  {article.category}
                </Link>
              </Reveal>
              <LineReveal
                id="article-title"
                as="h1"
                onMount
                delay={0.1}
                className="mt-5 text-[clamp(2.2rem,4.8vw,4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink"
                lines={[article.title]}
              />
              <Reveal delay={0.25} y={16}>
                <p className="mt-7 max-w-3xl text-lead text-ink-soft">{article.intro}</p>
              </Reveal>
              <Reveal delay={0.35} y={12}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-[0.95rem] text-ink-muted">
                  <p className="flex items-center gap-3">
                    <span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-brand font-serif text-[1.05rem] font-semibold text-white">
                      B
                    </span>
                    <span>
                      By <span className="font-semibold text-ink">{EDITORIAL_TEAM}</span>
                    </span>
                  </p>
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden className="size-4 text-brand" />
                    {article.readMinutes} min read
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        <div className="container-site mt-[clamp(2.5rem,5vw,4rem)]">
          <ImageReveal delay={0.3} className="relative aspect-[4/3] overflow-hidden bg-mist sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              priority
              sizes="(min-width: 1280px) 76rem, 100vw"
              className="object-cover"
            />
          </ImageReveal>
        </div>

        <div className="container-site py-[clamp(3rem,7vw,5.5rem)]">
          <div className="mx-auto grid max-w-[66rem] gap-10 lg:grid-cols-[14rem_minmax(0,42rem)] lg:justify-between lg:gap-16">
            {showToc ? (
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <ArticleToc items={toc} />
              </aside>
            ) : (
              <span className="hidden lg:block" />
            )}
            <div>
              <ArticleBody blocks={article.body} />

              <footer className="mt-14 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.95rem] text-ink-muted">
                  Filed under{" "}
                  <Link href={categoryHref(article.category)} className="font-semibold text-ink underline underline-offset-4 hover:text-brand">
                    {article.category}
                  </Link>
                </p>
                <Link
                  href={pages["author-resources"].path}
                  className="group inline-flex items-center gap-2 font-semibold text-ink hover:text-brand"
                >
                  <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-1" />
                  All articles
                </Link>
              </footer>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-white py-section">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-title" className="text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] tracking-[-0.03em] text-ink">
                Related articles
              </h2>
              <Link href={pages["author-resources"].path} className="font-semibold text-ink underline decoration-2 underline-offset-[6px] hover:text-brand">
                View all articles
              </Link>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <MediumStory key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ResourcesCta
        id="article-cta-title"
        label="Personal guidance"
        title="Ready to Talk About Your Book?"
        text="Tell us where your manuscript is today. We'll help you understand the most suitable next step — with no obligation."
        primary={{ label: "Contact Our Team", href: pages["start-your-book"].path }}
        secondary={{ label: "Book a Consultation", href: pages["book-consultation"].path }}
      />
    </>
  );
}
