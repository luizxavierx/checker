import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite que o servidor Next.js faça fetch para o domínio da API PHP
  // Adicione outros domínios se necessário
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
