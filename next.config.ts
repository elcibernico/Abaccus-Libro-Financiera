import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf8")
);

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version || "1.0.0",
  },
};

export default nextConfig;
