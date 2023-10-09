/** @type {import('tailwindcss').Config} */
import { BOARD_DIM, TILE_DIM } from "./src/lib/const";

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "1.5rem",
            screens: {
                "2xl": "1360px",
            },
        },
        extend: {
            width: {
                board: `${BOARD_DIM.width * TILE_DIM.width}px`,
                tile: `${TILE_DIM.width}px`,
            },
            height: {
                board: `${BOARD_DIM.height * TILE_DIM.height}px`,
                tile: `${TILE_DIM.height}px`,
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            keyframes: {
                staticEffect: {
                    "0%": { backgroundPosition: "0% 0%" },
                    "25%": { backgroundPosition: "50% 50%" },
                    "50%": { backgroundPosition: "100% 0%" },
                    "75%": { backgroundPosition: "50% 100%" },
                    "100%": { backgroundPosition: "100% 100%" },
                },
            },
            animation: {
                static: "staticEffect 0.1s infinite",
            },
            colors: {
                gray: {
                    1: "#131313",
                    2: "#1b1b1b",
                    3: "#272727",
                    4: "#3d3d3d",
                    5: "#5d5d5d",
                    6: "#858585",
                    7: "#b4b4b4",
                    8: "#ffffff",
                },
                blue: {
                    1: "#c7cfdd",
                    2: "#92a1b9",
                    3: "#657392",
                    4: "#424c6e",
                    5: "#2a2f4e",
                    6: "#1a1932",
                    7: "#0e071b",
                },
                red: {
                    1: "#1c121c",
                    2: "#391f21",
                    3: "#5d2c28",
                    4: "#8a4836",
                    5: "#bf6f4a",
                    6: "#e69c69",
                    7: "#f6ca9f",
                    8: "#f9e6cf",
                    9: "#edab50",
                    10: "#e07438",
                    11: "#c64524",
                    12: "#8e251d",
                    13: "#ff5000",
                    14: "#ed7614",
                    15: "#ffa214",
                    16: "#ffc825",
                    17: "#ffeb57",
                },
                green: {
                    1: "#d3fc7e",
                    2: "#99e65f",
                    3: "#5ac54f",
                    4: "#33984b",
                    5: "#1e6f50",
                    6: "#134c4c",
                },
                darkblue: {
                    1: "#0c2e44",
                    2: "#00396d",
                    3: "#0069aa",
                    4: "#0098dc",
                    5: "#00cdf9",
                    6: "#0cf1ff",
                    7: "#94fdff",
                },
                purple: {
                    1: "#fdd2ed",
                    2: "#f389f5",
                    3: "#db3ffd",
                    4: "#7a09fa",
                    5: "#3003d9",
                    6: "#0c0293",
                    7: "#03193f",
                    8: "#3b1443",
                    9: "#622461",
                    10: "#93388f",
                    11: "#ca52c9",
                },
                pink: {
                    1: "#c85086",
                    2: "#f68187",
                    3: "#f5555d",
                    4: "#ea323c",
                    5: "#c42430",
                    6: "#891e2b",
                    7: "#571c27",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
