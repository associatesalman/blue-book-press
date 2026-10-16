import type { Metadata, Viewport } from "next";
import { CustomCursor } from "@/components/common/CustomCursor";
import { Providers } from "@/components/common/Providers";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/data/site";
import { bodyFont, headingFont } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  metadataBase: new URL(site.url),
  icons: { icon: "/logo.png" },
  openGraph: { title: site.name, description: site.description, siteName: site.name, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CustomCursor />
        </Providers>
      </body>
    </html>
  );
}
