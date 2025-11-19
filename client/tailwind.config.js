/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",   // App Router
        "./pages/**/*.{js,ts,jsx,tsx}", // Si usas Pages Router
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",   // Si tienes carpetas dentro de src
    ],
    theme: {
        extend: {
        colors: {
            primary: "#1e40af",
            secondary: "#64748b",
            accent: "#22d3ee",
        },
        fontFamily: {
            sans: ["var(--font-geist-sans)", "sans-serif"],
            mono: ["var(--font-geist-mono)", "monospace"],
        },
        },
    },
    plugins: [],
};
