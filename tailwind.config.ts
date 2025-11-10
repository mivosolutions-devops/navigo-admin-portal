const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cardBg: {
          DEFAULT: "var(--card-bg)",
        },
        "slate-10": {
          DEFAULT: "rgba(255, 255, 255, 0.30)",
        },
        shadow: {
          400: "rgba(112, 144, 176, 0.1)",
          500: "rgba(112, 144, 176, 0.08)",
        },
        blue: {
          custom: "#557EC5",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      backgroundImage: {
        "auth-bg-signup":
          'url("/auth-bg.svg"), linear-gradient(357deg, #00D56B 0%, #28A265 78.62%)',
        "auth-bg-signin":
          'url("/auth-bg.svg"), linear-gradient(142deg, #00D56B 0%, #28A265 100%)',
        "auth-vector": "url('/auth-vector.svg')",
        "auth-bg-recover": "url('/auth-bg-recover.svg')",
        "logo-gradient":
          "linear-gradient(85deg, #28A265 10.01%, #00D56B 114.53%)",
        "analytics-card-bg": "url('/analytics-card-bg.svg')",
      },
      backgroundSize: {
        "auth-bg": "80rem",
        "analytics-card-size": "150%",
      },
      gridTemplateColumns: {
        otp: "repeat(4, minmax(0, 4rem))",
      },
      gridTemplateRows: {
        otp: "repeat(4, minmax(0, 4rem))",
      },
    },
    // screens: {
    //   sm: "576px",
    //   "sm-max": { max: "576px" },
    //   "sm-max-2": "680px",
    //   md: "768px",
    //   "md-max": { max: "768px" },
    //   lg: "992px",
    //   "lg-max": { max: "992px" },
    //   xl: "1200px",
    //   "xl-max": { max: "1200px" },
    //   "2xl": "1320px",
    //   "2xl-max": { max: "1320px" },
    //   "3xl": "1600px",
    //   "3xl-max": { max: "1600px" },
    //   "4xl": "1850px",
    //   "4xl-max": { max: "1850px" },
    // }
  },
  plugins: [require("tailwindcss-animate")],
};
