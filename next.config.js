/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: '/api/quote',
          destination: '/api/quote.ts',
        },
        {
          source: '/api/token',
          destination: '/api/token.ts',
        },
        {
          source: '/api/createTask',
          destination: '/api/createTask.ts',
        }
      ];
    },
}

module.exports = nextConfig
