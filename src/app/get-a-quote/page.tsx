import { PagePlaceholder } from "@/components/common/PagePlaceholder";
import { getBreadcrumbs, pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("get-a-quote");

export default function Page() {
  return <PagePlaceholder page={pages["get-a-quote"]} trail={getBreadcrumbs("get-a-quote")} />;
}
