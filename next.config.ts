import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",       // for Unsplash images
      "avatars.githubusercontent.com" // for GitHub avatars
    ],
  },
};

export default nextConfig;