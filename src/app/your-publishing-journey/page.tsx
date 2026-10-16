import { PagePlaceholder } from "@/components/common/PagePlaceholder";
import { getBreadcrumbs, pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("journey");

export default function Page() {
  return <PagePlaceholder page={pages["journey"]} trail={getBreadcrumbs("journey")} />;
}
