import Link from "next/link";
import type { PageEntry } from "@/data/pages";

/**
 * Temporary stand-in that proves each route resolves. Replaced page by page
 * as the real sections are built — delete once no route imports it.
 */
export function PagePlaceholder({ page, trail = [] }: { page: Pick<PageEntry, "title" | "description">; trail?: PageEntry[] }) {
  return (
    <section className="mx-auto max-w-prose px-gutter py-section">
      {trail.length > 1 && (
        <nav aria-label="Breadcrumb" className="mb-6 text-ink-muted">
          {trail.slice(0, -1).map((p) => (
            <span key={p.path}>
              <Link href={p.path} className="underline underline-offset-4">
                {p.title}
              </Link>
              {" / "}
            </span>
          ))}
        </nav>
      )}
      <h1 className="text-headline">{page.title}</h1>
      <p className="mt-4 text-lead text-ink-muted">{page.description}</p>
      <p className="mt-10 text-ink-muted">This page is planned and will be designed in a later phase.</p>
    </section>
  );
}
