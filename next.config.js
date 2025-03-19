/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/orb1',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/orb1',
  trailingSlash: true,
}

module.exports = nextConfig 