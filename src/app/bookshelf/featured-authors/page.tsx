import { PagePlaceholder } from "@/components/common/PagePlaceholder";
import { getBreadcrumbs, pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("featured-authors");

export default function Page() {
  return <PagePlaceholder page={pages["featured-authors"]} trail={getBreadcrumbs("featured-authors")} />;
}
