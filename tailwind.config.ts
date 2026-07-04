import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────
//  Neo-Chrome 디자인 토큰
//  실제 색/간격/모션 값은 globals.css 의 :root 변수에 정의되어 있고,
//  여기서는 그 변수를 참조만 합니다. (하드코딩 금지 원칙)
// ─────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "rgb(var(--c-void) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--c-surface) / <alpha-value>)",
          raised: "rgb(var(--c-surface-raised) / <alpha-value>)",
        },
        line: "var(--c-line)",
        text: {
          DEFAULT: "rgb(var(--c-text) / <alpha-value>)",
          muted: "rgb(var(--c-text-muted) / <alpha-value>)",
          faint: "rgb(var(--c-text-faint) / <alpha-value>)",
        },
        chrome: {
          hi: "rgb(var(--c-chrome-hi) / <alpha-value>)",
          DEFAULT: "rgb(var(--c-chrome) / <alpha-value>)",
          lo: "rgb(var(--c-chrome-lo) / <alpha-value>)",
        },
        iris: {
          violet: "rgb(var(--c-iris-violet) / <alpha-value>)",
          cyan: "rgb(var(--c-iris-cyan) / <alpha-value>)",
          magenta: "rgb(var(--c-iris-magenta) / <alpha-value>)",
        },
        // ── 하위호환 별칭: 기존 컴포넌트가 참조하던 팔레트를
        //    Neo-Chrome 토큰으로 매핑해 일관성을 유지합니다.
        ink: {
          950: "rgb(var(--c-void) / <alpha-value>)",
          900: "rgb(var(--c-surface) / <alpha-value>)",
          800: "rgb(var(--c-surface-raised) / <alpha-value>)",
          700: "#20202a",
          600: "#2a2a36",
        },
        mist: {
          100: "rgb(var(--c-text) / <alpha-value>)",
          200: "#d4d4de",
          300: "rgb(var(--c-text-muted) / <alpha-value>)",
          400: "rgb(var(--c-text-faint) / <alpha-value>)",
        },
        drop: {
          light: "rgb(var(--c-iris-cyan) / <alpha-value>)",
          DEFAULT: "rgb(var(--c-iris-violet) / <alpha-value>)",
          deep: "#6d28d9",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // 모듈러 타입 스케일 (1.25 ratio 기반, clamp 반응형)
        "display-xl": [
          "clamp(3rem, 12vw, 11rem)",
          { lineHeight: "0.9", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "clamp(2.5rem, 8vw, 6rem)",
          { lineHeight: "0.92", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(2rem, 5vw, 3.5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.01em" },
        ],
      },
      spacing: {
        // 8pt 그리드 확장
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        chrome: "var(--shadow-chrome)",
        card: "var(--shadow-card)",
      },
      transitionTimingFunction: {
        expo: "var(--ease-out-expo)",
        smooth: "var(--ease-smooth)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        ripple: {
          "0%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(139,92,246,0.5)" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 24px rgba(139,92,246,0)" },
        },
      },
      animation: {
        floatUp: "floatUp var(--dur-slow) var(--ease-out-expo) both",
        marquee: "marquee 28s linear infinite",
        "marquee-slow": "marquee 48s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        "spin-slow": "spinSlow 24s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        ripple: "ripple 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
