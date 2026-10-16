import type { Metadata } from "next";
import { ArticleLibrary } from "@/components/resources/ArticleLibrary";
import { FeaturedArticle } from "@/components/resources/FeaturedArticle";
import { Newsletter } from "@/components/resources/Newsletter";
import { ResourceHero, ResourcesCta } from "@/components/resources/ResourceSections";
import { articles, featuredArticle } from "@/data/articles";
import { pages } from "@/data/pages";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Practical publishing guidance for authors — writing, editing, book design, publishing, distribution, marketing and author branding.",
  alternates: { canonical: pages["author-resources"].path },
};

export default function Page() {
  return (
    <>
      <ResourceHero
        label="Author Resources"
        lines={["Practical Publishing Guidance", <span key="b" className="text-brand">for Every Stage of Your Book</span>]}
        description="Explore clear, useful insights designed to help authors make informed decisions about writing, publishing, distribution, and book promotion."
      />
      <FeaturedArticle article={featuredArticle} />
      <ArticleLibrary items={articles.filter((a) => a.slug !== featuredArticle.slug)} />
      <Newsletter />
      <ResourcesCta
        id="articles-cta-title"
        label="Personal guidance"
        title="Have a Question About Your Book?"
        text="Speak with the Blue Book Press team and get clear guidance about your next publishing step."
        primary={{ label: "Contact Us", href: pages["start-your-book"].path }}
        secondary={{ label: "View FAQs", href: pages.faqs.path }}
      />
    </>
  );
}
