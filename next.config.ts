import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    // 95 is used for full-width hero artwork where text in the image must stay crisp.
    qualities: [75, 95],
    // Editorial photography on the solo service pages.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // Older paths kept working after pages moved.
  async redirects() {
    return [
      // The old Bookshelf landing page is now the Portfolio.
      { source: "/bookshelf", destination: "/portfolio", permanent: true },
      { source: "/book-consultation", destination: "/consultation", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
    ];
  },
};

export default nextConfig;
