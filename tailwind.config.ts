import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent:         '#E85D2F',
        'accent-light': '#FBE9E2',
        'accent-dark':  '#B8401B',
        ink:            '#1C1A17',
        muted:          '#7A7468',
        'warm-mid':     '#9C8B7A',
        sand:           '#F5F0E8',
        paper:          '#EDE8DF',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
