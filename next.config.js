require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_ENV: process.env.BASE_ENV,
    BASE_API_URL: process.env.BASE_API_URL,
    AUTHORITY_PRIVATE_KEY: process.env.AUTHORITY_PRIVATE_KEY,
    RECAPTCHA_SITEKEY: process.env.RECAPTCHA_SITEKEY,
    RECAPTCHA_SECRETKEY: process.env.RECAPTCHA_SECRETKEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

module.exports = nextConfig;
