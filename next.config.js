// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // other config options

  // Configure allowed image domains using remotePatterns (replacing deprecated domains)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'game.shacksevo.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'portal.shacksevo.co',
        pathname: '/**',
      },
    ],
  },

  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://game.shacksevo.co"
          }
        ],
      },
    ];
  },

  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_GAME_URL: process.env.NEXT_PUBLIC_GAME_URL,
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    NEXT_PUBLIC_PARTNER_ID: process.env.NEXT_PUBLIC_PARTNER_ID,
    NEXT_PUBLIC_PROVIDER: process.env.NEXT_PUBLIC_PROVIDER,
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    NEXT_PUBLIC_STAGING_URL: process.env.NEXT_PUBLIC_STAGING_URL,
    NEXT_PUBLIC_PRODUCTION_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
    NEXT_PUBLIC_CASHIER_URL: process.env.NEXT_PUBLIC_CASHIER_URL,
    NEXT_PUBLIC_IP_ADDRESS: process.env.NEXT_PUBLIC_IP_ADDRESS,
    NEXT_PUBLIC_DEV_SPIN_WHEEL: process.env.NEXT_PUBLIC_DEV_SPIN_WHEEL,
    NEXT_PUBLIC_PROD_SPIN_WHEEL: process.env.NEXT_PUBLIC_PROD_SPIN_WHEEL,
    NEXT_PUBLIC_HIGHLIGHT_ID: process.env.NEXT_PUBLIC_HIGHLIGHT_ID,
    NEXT_PUBLIC_ENCRYPTION_KEY: process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
    NEXT_PUBLIC_MONNIFY_API_KEY: process.env.NEXT_PUBLIC_MONNIFY_API_KEY,
    NEXT_PUBLIC_MONNIFY_CONTRACT_CODE: process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE,
    NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  },

  // Redirects removed - handled by pages/index.tsx getServerSideProps
};

module.exports = nextConfig;
