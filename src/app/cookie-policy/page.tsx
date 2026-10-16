import { LegalPage } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("cookie-policy");

export default function Page() {
  return <LegalPage doc="cookie-policy" />;
}
