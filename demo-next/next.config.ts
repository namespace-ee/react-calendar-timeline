import type { NextConfig } from "next";
import { resolve } from 'path'
import path from 'node:path'


const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // "react-calendar-timeline-4ef/styles.css":path.resolve(__dirname,"../dist/styles.css"),
      'react-calendar-timeline-4ef': path.resolve(__dirname, '../dist/react-calendar-timeline-4ef.es.js'),
    };
    return config;
  },
};

export default nextConfig;
