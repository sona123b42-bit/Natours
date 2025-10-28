/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75, 80, 85, 90, 95, 100], // ✅ Add allowed quality levels
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
