import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base:        "#040108",
        panel:       "#06010a",
        card:        "#0b0311",
        "card-h":    "#110418",
        "b0":        "#1c0620",
        "b1":        "rgba(210,0,45,0.16)",
        "b2":        "rgba(210,0,45,0.32)",
        red:         "#e0002d",
        "red-hi":    "#ff1a40",
        "red-lo":    "#6e0018",
        live:        "#00e854",
        die:         "#ff1a40",
        sem:         "#ff6d10",
        score:       "#c084fc",
        primary:     "#f0d5da",
        muted:       "#9a3050",
        dim:         "#4a1525",
      },
      fontFamily: {
        mono: ["Consolas", "JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        "r":   "0 0 0 1px rgba(210,0,45,0.25), 0 0 12px rgba(210,0,45,0.15)",
        "r-md":"0 0 0 1px rgba(210,0,45,0.4),  0 0 24px rgba(210,0,45,0.25)",
        "r-lg":"0 0 0 1px rgba(210,0,45,0.5),  0 0 40px rgba(210,0,45,0.35)",
        "live":"0 0 10px rgba(0,232,84,0.3)",
        "die": "0 0 10px rgba(255,26,64,0.4)",
      },
      animation: {
        "pulse-r": "pulse-r 2.5s ease-in-out infinite",
        "blink":   "blink 1s step-end infinite",
        "scan":    "scan 10s linear infinite",
      },
      keyframes: {
        "pulse-r": {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.35" },
        },
        "blink": {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
        "scan": {
          "0%":   { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100px" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
