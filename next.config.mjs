import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
  webpack: (config) => {
    // @splinetool/react-spline 의 exports 맵은 "import" 조건만 노출해
    // Next 서버 번들 해석에서 실패한다. ESM 엔트리로 직접 alias 하여 우회.
    config.resolve.alias["@splinetool/react-spline$"] = path.resolve(
      process.cwd(),
      "node_modules/@splinetool/react-spline/dist/react-spline.js",
    );
    return config;
  },
};

export default nextConfig;
