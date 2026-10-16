import { PagePlaceholder } from "@/components/common/PagePlaceholder";
import { getBreadcrumbs, pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("case-studies");

export default function Page() {
  return <PagePlaceholder page={pages["case-studies"]} trail={getBreadcrumbs("case-studies")} />;
}
