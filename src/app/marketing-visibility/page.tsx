import { ImageHero } from "@/components/common/ImageHero";
import { MarketingClosing } from "@/components/marketing/MarketingClosing";
import { MarketingOverview } from "@/components/marketing/MarketingOverview";
import { MarketingPortrait } from "@/components/marketing/MarketingPortrait";
import { MarketingProcess } from "@/components/marketing/MarketingProcess";
import { MarketingReel } from "@/components/marketing/MarketingReel";
import { MarketingServices } from "@/components/marketing/MarketingServices";
import { mvHero } from "@/data/marketingVisibility";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("marketing-visibility");

/**
 * Marketing & Visibility category page:
 * hero → overview → services → author presence → campaign reel → process → CTA.
 */
export default function MarketingVisibilityPage() {
  return (
    <>
      <ImageHero content={mvHero} />
      <MarketingOverview />
      <MarketingServices />
      <MarketingPortrait />
      <MarketingReel />
      <MarketingProcess />
      <MarketingClosing />
    </>
  );
}
