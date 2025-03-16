import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['tailwindcss.com'],
  },
  env: {
    REACT_APP_ENV: 'development',
    REACT_APP_URL: 'https://fakestoreapi.com',
  },
};

export default nextConfig;
