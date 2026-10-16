import { LegalPage } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("refund-policy");

export default function Page() {
  return <LegalPage doc="refund-policy" />;
}
