/** @type {import('next').NextConfig} */

const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;
console.log(`${protocol}://api.${domain}/${apiPrefix}/:path*`);
const nextConfig = {
  reactStrictMode: true,
  experimental: { instrumentationHook: true },
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: domain
          ? `${protocol}://api.${domain}/${apiPrefix}/:path*`
          : "http://localhost:8000/api/:path*",
      },
      {
        source: "/socket.io/:path*",
        destination: domain
          ? `${protocol}://socket.${domain}/socket.io/:path*/`
          : "http://localhost:8001/socket.io/:path*",
      },
    ];
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /import2/, // adjust the module name
      })
    );
    return config;
  },
};

module.exports = nextConfig;
