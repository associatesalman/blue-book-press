import Link from "next/link";
import { Mail } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { LineReveal } from "@/components/portfolio/motion";
import { ArticleBody } from "@/components/resources/ArticleBody";
import { ArticleToc } from "@/components/resources/ArticleToc";
import { formatDate, headingId } from "@/data/articles";
import { legalConfig, legalDocs, type LegalKey } from "@/data/legal";
import { legalNav } from "@/data/navigation";
import { pages } from "@/data/pages";

/** Simple, readable layout shared by the policy pages. */
export function LegalPage({ doc: key }: { doc: LegalKey }) {
  const page = pages[key];
  const doc = legalDocs[key];
  const toc = doc.body.filter((b) => b.type === "h2").map((b) => ({ id: headingId(b.text), text: b.text }));
  const others = legalNav.filter((l) => l.href !== page.path);

  return (
    <article aria-labelledby="legal-title">
      <header className="border-b border-line bg-white pb-[clamp(2.5rem,5vw,3.5rem)] pt-[clamp(2rem,5vw,3.5rem)]">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="text-[0.92rem] text-ink-muted">
            <ol className="flex flex-wrap items-center gap-x-2">
              <li>
                <Link href="/" className="hover:text-brand">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                {page.title}
              </li>
            </ol>
          </nav>
          <div className="mt-[clamp(2rem,5vw,3.5rem)] max-w-3xl">
            <p className="eyebrow flex items-center gap-3 text-brand">
              <span aria-hidden className="h-0.5 w-8 bg-brand" />
              Legal
            </p>
            <LineReveal
              id="legal-title"
              as="h1"
              onMount
              delay={0.08}
              className="mt-5 text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink"
              lines={[page.title]}
            />
            <Reveal delay={0.2} y={14}>
              <p className="mt-6 text-lead text-ink-soft">{doc.intro}</p>
              <p className="mt-5 text-[0.95rem] text-ink-muted">
                Last updated <time dateTime={legalConfig.lastUpdated}>{formatDate(legalConfig.lastUpdated)}</time>
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <div className="container-site py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid max-w-[66rem] gap-10 lg:grid-cols-[14rem_minmax(0,42rem)] lg:justify-between lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <ArticleToc items={toc} label="On this page" />
          </aside>
          <div>
            <ArticleBody blocks={doc.body} />

            <footer className="mt-14 border-t border-line pt-8">
              <p className="text-[1rem] text-ink-soft">Questions about this page?</p>
              <a
                href={`mailto:${legalConfig.contactEmail}`}
                className="mt-2 inline-flex items-center gap-2 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand"
              >
                <Mail aria-hidden className="size-4.5 text-brand" />
                {legalConfig.contactEmail}
              </a>
              <nav aria-label="Other policies" className="mt-10">
                <p className="eyebrow text-[0.72rem] text-ink-muted">Other policies</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  {others.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="font-semibold text-ink underline underline-offset-4 hover:text-brand">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}
