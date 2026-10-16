"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Button } from "@/components/common/Button";
import { articleHref, formatDate, type Article } from "@/data/articles";
import { EASE } from "@/components/portfolio/motion";

/** Large split feature: editorial image on one side, the story on the other. */
export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <section aria-labelledby="featured-article-title" className="bg-white pb-[clamp(3.5rem,7vw,6rem)]">
      <div className="container-site">
        <div className="grid border-y border-line lg:grid-cols-12">
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
            className="relative aspect-[4/3] overflow-hidden bg-mist lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]"
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 46rem, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            className="flex flex-col py-9 lg:col-span-5 lg:py-12 lg:pl-12"
          >
            <p className="eyebrow flex items-center gap-3 text-[0.75rem] text-ink-muted">
              Featured article
              <span aria-hidden className="h-px flex-1 bg-line" />
            </p>
            <p className="eyebrow mt-8 text-[0.75rem] text-brand">{article.category}</p>
            <h2
              id="featured-article-title"
              className="mt-3 text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.025em] text-ink"
            >
              {article.title}
            </h2>
            <p className="mt-5 text-[1.075rem] leading-relaxed text-ink-soft">{article.excerpt}</p>
            <div className="mt-auto pt-8">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.92rem] text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden className="size-4 text-brand" />
                  {article.readMinutes} min read
                </span>
                <span aria-hidden>·</span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </p>
              <Button href={articleHref(article)} arrow className="mt-6">
                Read Article
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
