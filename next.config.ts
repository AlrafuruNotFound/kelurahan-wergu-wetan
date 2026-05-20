import type { NextConfig } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const nextConfig: NextConfig = {
  // Izinkan HP mengambil file JavaScript (Webpack HMR) di mode dev
  // Next.js requires just the hostname/IP, no protocol!
  allowedDevOrigins: ["192.168.1.2", "localhost", "127.0.0.1"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      // Izinkan Server Actions dari localhost (dev), Network IP (mobile testing), DAN URL produksi
      allowedOrigins: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://localhost:3000",
        "https://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://192.168.1.2:3000",
        "http://192.168.1.2:3001",
        "https://192.168.1.2:3000",
        "https://192.168.1.2:3001",
        siteUrl,
      ],
    },
  },
};

export default nextConfig;
