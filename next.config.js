/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_NETWORK_ID: 5777,
        NEXT_PUBLIC_TARGET_CHAIN_ID: 1337,
        SECRET_COOKIE_PASSWORD: "z5c4kUE635h1Sg#^m@6aG7I%ZisBf821",
        INFURA_PROJECT_ID: "",
        INFURA_SECRET_KEY: "",
    },
};

module.exports = nextConfig;