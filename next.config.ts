import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Evita que o Turbopack suba até a home dir (ex.: package-lock.json solto em C:\Users). */
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
