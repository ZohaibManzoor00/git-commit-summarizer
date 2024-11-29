import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**", // Match all paths under the hostname
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true // ! remove 
  }
};

export default config;
