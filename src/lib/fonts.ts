import { Newsreader, Source_Sans_3 } from "next/font/google";

/** Headings: Newsreader — warm editorial serif with optical sizing. */
export const headingFont = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-heading",
  display: "swap",
});

/** Body: Source Sans 3 — clean, open and highly legible at large sizes. */
export const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
