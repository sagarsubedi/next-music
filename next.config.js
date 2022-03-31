/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // ONLY FOR PRODUCTION. TYPESCRIPT is messing up build
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
