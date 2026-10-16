import { ClosingCta } from "@/components/common/ClosingCta";
import { ImageHero } from "@/components/common/ImageHero";
import { WordMarquee } from "@/components/common/WordMarquee";
import { PathwaysBreakdown } from "@/components/pathways/PathwaysBreakdown";
import { PathwaysDefine } from "@/components/pathways/PathwaysDefine";
import { PathwaysDistribution } from "@/components/pathways/PathwaysDistribution";
import { PathwaysServices } from "@/components/pathways/PathwaysServices";
import { PathwaysVideo } from "@/components/pathways/PathwaysVideo";
import { ppCta, ppHero, ppMarquee } from "@/data/publishingPathways";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("publishing-pathways");

/** Publishing Pathways — category hub introducing all eight publishing services. */
export default function PublishingPathwaysPage() {
  return (
    <>
      <ImageHero content={ppHero} />
      <WordMarquee items={ppMarquee} label="Publishing formats and platforms" />
      <PathwaysDefine />
      <PathwaysServices />
      <PathwaysVideo />
      <PathwaysBreakdown />
      <PathwaysDistribution />
      <ClosingCta content={ppCta} />
    </>
  );
}
