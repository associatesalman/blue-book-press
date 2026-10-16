import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articleHref, formatDate, type Article } from "@/data/articles";
import { cn } from "@/lib/cn";

/** Category · date · reading time. */
export function ArticleMeta({ article, className, tone = "light" }: { article: Article; className?: string; tone?: "light" | "dark" }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.9rem]", tone === "light" ? "text-ink-muted" : "text-white/70", className)}>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden>·</span>
      <span>{article.readMinutes} min read</span>
    </p>
  );
}

export function CategoryLabel({ children, tone = "light" }: { children: string; tone?: "light" | "dark" }) {
  return <p className={cn("eyebrow text-[0.72rem]", tone === "light" ? "text-brand" : "text-white")}>{children}</p>;
}

/**
 * "Read Article" link stretched over its whole preview (the parent must be
 * `relative`), so the block is one click target and one tab stop.
 */
export function ReadLink({ article, className }: { article: Article; className?: string }) {
  return (
    <Link
      href={articleHref(article)}
      aria-label={`Read article: ${article.title}`}
      className={cn(
        "inline-flex items-center gap-2 text-[0.95rem] font-semibold text-ink underline decoration-2 underline-offset-[6px] transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-brand",
        className,
      )}
    >
      Read Article
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function Cover({ article, sizes, className, priority }: { article: Article; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden bg-mist", className)}>
      <Image
        src={article.image.src}
        alt={article.image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
      />
    </div>
  );
}

const titleHover = "transition-colors duration-300 group-hover:text-brand";

/** Lead story: wide image, then title and summary side by side. */
export function LeadStory({ article }: { article: Article }) {
  return (
    <article className="group relative">
      <Cover article={article} sizes="(min-width: 1280px) 76rem, 100vw" className="aspect-[4/3] sm:aspect-[16/8]" />
      <div className="mt-7 grid gap-5 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <CategoryLabel>{article.category}</CategoryLabel>
          <h3 className={cn("mt-3 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.08] tracking-[-0.025em] text-ink", titleHover)}>
            {article.title}
          </h3>
        </div>
        <div className="lg:col-span-5 lg:pt-7">
          <p className="text-[1.05rem] leading-relaxed text-ink-soft">{article.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <ArticleMeta article={article} />
            <ReadLink article={article} />
          </div>
        </div>
      </div>
    </article>
  );
}

/** Medium block: image above, compact text. */
export function MediumStory({ article }: { article: Article }) {
  return (
    <article className="group relative flex flex-col">
      <Cover article={article} sizes="(min-width: 768px) 38rem, 100vw" className="aspect-[3/2]" />
      <div className="mt-6 flex flex-1 flex-col">
        <CategoryLabel>{article.category}</CategoryLabel>
        <h3 className={cn("mt-2.5 text-[clamp(1.4rem,2.1vw,1.8rem)] leading-[1.15] tracking-[-0.02em] text-ink", titleHover)}>{article.title}</h3>
        <p className="mt-3 text-[1rem] leading-relaxed text-ink-muted">{article.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
          <ArticleMeta article={article} />
          <ReadLink article={article} />
        </div>
      </div>
    </article>
  );
}

/** Wide editorial row: thumbnail, headline, summary in one band. */
export function WideRow({ article }: { article: Article }) {
  return (
    <article className="group relative grid gap-5 border-t border-line py-8 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[16rem_minmax(0,1fr)_minmax(0,22rem)] lg:gap-10">
      <Cover article={article} sizes="(min-width: 1024px) 16rem, (min-width: 640px) 12rem, 100vw" className="aspect-[3/2] sm:aspect-[4/3]" />
      <div>
        <CategoryLabel>{article.category}</CategoryLabel>
        <h3 className={cn("mt-2.5 text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.18] tracking-[-0.02em] text-ink", titleHover)}>{article.title}</h3>
        <ArticleMeta article={article} className="mt-3" />
      </div>
      <div className="sm:col-start-2 lg:col-start-3">
        <p className="text-[1rem] leading-relaxed text-ink-muted">{article.excerpt}</p>
        <ReadLink article={article} className="mt-4" />
      </div>
    </article>
  );
}

/** Small supporting article: text only, numbered. */
export function SmallStory({ article, index }: { article: Article; index: number }) {
  return (
    <article className="group relative flex flex-col border-t-2 border-ink pt-5">
      <div className="flex items-baseline justify-between gap-4">
        <CategoryLabel>{article.category}</CategoryLabel>
        <span aria-hidden className="font-serif text-[1.1rem] font-semibold tabular-nums text-ink-muted">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <h3 className={cn("mt-3 text-[1.3rem] leading-[1.2] tracking-[-0.015em] text-ink", titleHover)}>{article.title}</h3>
      <p className="mt-2.5 text-[0.98rem] leading-relaxed text-ink-muted">{article.excerpt}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <ArticleMeta article={article} />
        <ReadLink article={article} />
      </div>
    </article>
  );
}
