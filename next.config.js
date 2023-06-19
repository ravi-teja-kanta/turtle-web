/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'https',
          hostname: 'ik.imagekit.io'
        }
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
        },
        {
          source: '/terms-and-conditions',
          destination: '/TermsAndConditions.html'
        },
        {
          source: '/privacy-policy',
          destination: '/PrivacyPolicy.html'
        }
      ];
    },
}

module.exports = nextConfig
