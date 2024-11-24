import type { NextConfig } from "next";
import path from 'node:path'
import { resolve } from 'path'

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-calendar-timeline/dist/Timeline.scss': resolve(__dirname, '../src/lib/Timeline.scss'),
      'react-calendar-timeline/style.css': resolve(__dirname, '../dist/style.css'),
      'react-calendar-timeline': resolve(__dirname, '../src/index.ts'),
    }
    return config
  }
}
export default nextConfig;
