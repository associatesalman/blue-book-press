import type { Metadata } from "next";
import { pages, type PageKey } from "@/data/pages";

/** Page metadata from the registry in data/pages.ts. */
export function pageMetadata(key: PageKey): Metadata {
  const page = pages[key];
  return {
    title: key === "home" ? undefined : page.title,
    description: page.description,
    alternates: { canonical: page.path },
  };
}
