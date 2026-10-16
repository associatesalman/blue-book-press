import { PagePlaceholder } from "@/components/common/PagePlaceholder";
import { getBreadcrumbs, pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("why-choose-us");

export default function Page() {
  return <PagePlaceholder page={pages["why-choose-us"]} trail={getBreadcrumbs("why-choose-us")} />;
}
