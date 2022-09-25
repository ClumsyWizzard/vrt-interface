module.exports = {
    content: [
        "./node_modules/flowbite-react/**/*.js",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            fire: {
                100: "#EF6461",
                200: "#EB3633",
            },
            sunray: "#E0AA52",
            platinum: "#E8E9EB",
            alabaster: "#E0DFD5",
            onyx: "#313638",
            davys_gray: "#44484A",
        },
    },
    plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};