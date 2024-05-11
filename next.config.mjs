/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          // fixes proxy-agent dependencies
          net: false,
          tls: false,
          fs: false,
          process: false,
          child_process: false,
        },
      };
    }

    return config;
  },
};

export default nextConfig;
