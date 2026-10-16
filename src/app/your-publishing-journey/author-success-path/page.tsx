import { PagePlaceholder } from "@/components/common/PagePlaceholder";
import { getBreadcrumbs, pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("success-path");

export default function Page() {
  return <PagePlaceholder page={pages["success-path"]} trail={getBreadcrumbs("success-path")} />;
}
