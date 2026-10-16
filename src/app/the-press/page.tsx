import { FinalCTA } from "@/components/home/FinalCTA";
import { Differences } from "@/components/press/Differences";
import { Method } from "@/components/press/Method";
import { PressHero } from "@/components/press/PressHero";
import { PressNumbers } from "@/components/press/PressNumbers";
import { Storytellers } from "@/components/press/Storytellers";
import { Vision } from "@/components/press/Vision";
import { WhatWeDo } from "@/components/press/WhatWeDo";
import { WhoWeAre } from "@/components/press/WhoWeAre";
import { pressCta } from "@/data/thePress";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("the-press");

export default function ThePressPage() {
  return (
    <>
      <PressHero />
      <WhoWeAre />
      <WhatWeDo />
      <PressNumbers />
      <Vision />
      <Method />
      <Differences />
      <Storytellers />
      <FinalCTA content={pressCta} />
    </>
  );
}
