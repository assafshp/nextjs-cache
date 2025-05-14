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
  // Configure caching behavior
  staticPageGenerationTimeout: 120,
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 5,
  }
}

module.exports = nextConfig
