import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local development
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Vercel blob storage
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      // Strapi media URLs - updated configuration
      {
        protocol: "https",
        hostname: "meaningful-harmony-6ce09bfa4a.media.strapiapp.com",
        pathname: "/**", // Allow all paths under this domain
      },
    ],
  },
};

export default nextConfig;
