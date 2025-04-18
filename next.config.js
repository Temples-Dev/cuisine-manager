/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'example.com', // Replace with your actual image host
            port: '',                // Leave empty unless using a specific port
            pathname: '/**',         // Wildcard to allow all paths
          },
        //   // Add more domains if needed:
        //   {
        //     protocol: 'https',
        //     hostname: 'upload.wikimedia.org',
        //     pathname: '/wikipedia/commons/**',
        //   },
        ],
      },
};

export default config;
