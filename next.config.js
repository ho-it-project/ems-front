/** @type {import('next').NextConfig} */

const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;
const socketSubdomain = process.env.NEXT_PUBLIC_SOCKET_SUBDOMAIN;
console.log(`${protocol}://api.${domain}/${apiPrefix}/:path*`);
console.log(`${protocol}://${socketSubdomain}.${domain}/socket.io/:path*/`);
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
          ? `${protocol}://${socketSubdomain}.${domain}/socket.io/:path*/`
          : "http://localhost:8001/socket.io/:path*/",
      },
    ];
  },
  webpack: (config, { webpack }) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      "supports-color": "commonjs supports-color",
    });
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /import2/, // adjust the module name
      })
    );
    return config;
  },
};

module.exports = nextConfig;
