import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '**',
      },
    ],
  },
  env: {
    REACT_APP_ENV: 'development',
    REACT_APP_URL: 'https://fakestoreapi.com',
  },
};

export default nextConfig;
