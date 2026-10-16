import { AuthorServicesDefine } from "@/components/author-services/AuthorServicesDefine";
import { AuthorServicesProcess } from "@/components/author-services/AuthorServicesProcess";
import { AuthorServicesShowcase } from "@/components/author-services/AuthorServicesShowcase";
import { ClosingCta } from "@/components/common/ClosingCta";
import { ImageHero } from "@/components/common/ImageHero";
import { WordMarquee } from "@/components/common/WordMarquee";
import { asCta, asHero, asMarquee } from "@/data/authorServices";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("author-services");

/** Author Services — category hub introducing all ten Author Services. */
export default function AuthorServicesPage() {
  return (
    <>
      <ImageHero content={asHero} />
      <WordMarquee items={asMarquee} label="Author Services" />
      <AuthorServicesDefine />
      <AuthorServicesShowcase />
      <AuthorServicesProcess />
      <ClosingCta content={asCta} />
    </>
  );
}
