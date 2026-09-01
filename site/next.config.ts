import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: nenhuma função de servidor, nenhum dado sai do navegador.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
