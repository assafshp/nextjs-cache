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
  // Set a reasonable timeout for static generation
  staticPageGenerationTimeout: 120
}

module.exports = nextConfig
