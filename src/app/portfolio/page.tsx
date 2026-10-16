import { BestSellingSlider } from "@/components/portfolio/BestSellingSlider";
import { PortfolioCta } from "@/components/portfolio/PortfolioCta";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioMarquee } from "@/components/portfolio/PortfolioMarquee";
import { PortfolioReel } from "@/components/portfolio/PortfolioReel";
import { PortfolioWall } from "@/components/portfolio/PortfolioWall";
import { ProjectStories } from "@/components/portfolio/ProjectStories";
import { PublishingCraft } from "@/components/portfolio/PublishingCraft";
import { UpcomingSlider } from "@/components/portfolio/UpcomingSlider";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("portfolio");

/**
 * Portfolio — an exhibition of the work, alternating black, white and blue:
 * hero (mockup) → studio film → collection wall → best selling →
 * project stories → upcoming → marquee → craft → closing CTA.
 * 3D appears only inside the Best Selling and Upcoming sliders.
 */
export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioReel />
      <PortfolioWall />
      <BestSellingSlider />
      <ProjectStories />
      <UpcomingSlider />
      <PortfolioMarquee />
      <PublishingCraft />
      <PortfolioCta />
    </>
  );
}
