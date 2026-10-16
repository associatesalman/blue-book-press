import { AudioDigital } from "@/components/home/AudioDigital";
import { AuthorServices } from "@/components/home/AuthorServices";
import { AuthorSupport } from "@/components/home/AuthorSupport";
import { BookProduction } from "@/components/home/BookProduction";
import { BookshelfShowcase } from "@/components/home/BookshelfShowcase";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { JourneyPreview } from "@/components/home/JourneyPreview";
import { MarketingVisibility } from "@/components/home/MarketingVisibility";
import { Partners } from "@/components/home/Partners";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { PublishingPathways } from "@/components/home/PublishingPathways";
import { TrustIntro } from "@/components/home/TrustIntro";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("home");

export default function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <TrustIntro />
      <PublishingPathways />
      <AuthorServices />
      <BookProduction />
      <BookshelfShowcase />
      <PortfolioPreview />
      <MarketingVisibility />
      <JourneyPreview />
      <AudioDigital />
      <WhyChooseUs />
      <AuthorSupport />
      <FinalCTA />
    </>
  );
}
