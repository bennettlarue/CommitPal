/* @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryDark: "#1c1c1c",
                secondaryDark: "#323232",
                whiteDark: "#E6E6E6",
                redDark: "#D64045",
                greenDark: "#10A778",
                blueDark: "#1E90FF",
                secondaryRed: "#B33A3A",
                secondaryGreen: "#0A8754",
                secondaryBlue: "#4169E1",
            },
        },
    },
    plugins: [],
};
