import { ServicePageLoader } from "@/components/common/ServicePageLoader";

/**
 * Service pages only: the cloud loader plays on this category hub and on
 * every solo service page beneath it. A template (not a layout) remounts on
 * each navigation, so the intro replays when moving between service pages.
 */
export default function ServiceTemplate({ children }: { children: React.ReactNode }) {
  return <ServicePageLoader label="Publishing Pathways">{children}</ServicePageLoader>;
}
