/**
 * Retail and platform logos in /public/partners. Two source sizes exist
 * (300×117 tight crops and 500×300 padded artwork), so each carries a
 * display height that makes them read at a similar visual weight.
 */
export type Partner = { name: string; src: string; width: number; height: number; displayHeight: number };

const tight = { width: 300, height: 117, displayHeight: 44 };
const padded = { width: 500, height: 300, displayHeight: 72 };

export const partners: Partner[] = [
  { name: "Amazon", src: "/partners/Amazon.webp", ...tight },
  { name: "Barnes & Noble", src: "/partners/Barnes-Nobles.webp", ...tight },
  { name: "Walmart", src: "/partners/Walmart.webp", ...padded },
  { name: "Waterstones", src: "/partners/Waterstones-1.webp", ...tight },
  { name: "WHSmith", src: "/partners/WHSmith.webp", ...padded },
  { name: "Powell's City of Books", src: "/partners/Power-city-of-books.webp", ...tight },
  { name: "Scribd", src: "/partners/Scribd.webp", ...tight },
  { name: "tolino", src: "/partners/tolino.webp", ...padded },
  { name: "Trustpilot", src: "/partners/Trustpilot.webp", ...padded },
];
