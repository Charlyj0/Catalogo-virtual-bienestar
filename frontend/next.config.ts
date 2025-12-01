import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: [
      "preview.redd.it",
      "res.cloudinary.com",   // ← añade Cloudinary
      "imgur.com",            // ← si usas Imgur
      "i.imgur.com"           // ← si usas enlaces directos de Imgur
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*"
      }
    ]
  }
}

export default nextConfig
