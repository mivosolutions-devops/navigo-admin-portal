/** @type {import('next').NextConfig} */
const autoCert = require("anchor-pki/auto-cert/integrations/next");

const withAutoCert = autoCert({
  enabledEnv: "development",  // Ensure "development" is the environment you want
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

module.exports = withAutoCert(nextConfig);
