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
      ];
    },
}

module.exports = nextConfig
