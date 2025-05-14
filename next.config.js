/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Enable disk caching features
    serverActions: {
      enabled: true
    }
  },
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  // Disable automatic static optimization
  staticPageGenerationTimeout: 0,
  // Don't cache pages by default
  unstable_cachePages: false
}

module.exports = nextConfig
