import { LegalPage } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("accessibility");

export default function Page() {
  return <LegalPage doc="accessibility" />;
}
