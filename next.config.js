/** @type {import('next').NextConfig} */

const path = require("path");
const nextConfig = {
  transpilePackages: ['ahooks'],
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "./src")],
    additionalData: "@import './src/assets/css/mixin.scss';",
  },
}

module.exports = nextConfig
