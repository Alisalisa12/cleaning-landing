import createNextIntlPlugin from "next-intl/plugin";

// Путь до серверного конфига запроса next-intl (i18n/request.js)
const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
