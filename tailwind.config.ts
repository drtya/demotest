import { generateSpace, generateStyle } from './src/lib/utils/tailwind';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: '768px',
        laptop: '1024px',
        desktop: '1280px',
      },
      colors: {
        background: 'rgb(var(--background))',
        pink: {
          DEFAULT: 'rgb(var(--pink))',
          80: 'rgba(var(--pink), 0.80)',
          60: 'rgba(var(--pink), 0.60)',
          40: 'rgba(var(--pink), 0.40)',
          20: 'rgba(var(--pink), 0.20)',
        },
        card: 'rgb(var(--card))',
        menuColor: 'rgb(var(--menubar))',
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          80: 'rgba(var(--primary),0.80)',
          60: 'rgba(var(--primary),0.60)',
          40: 'rgba(var(--primary),0.40)',
          20: 'rgba(var(--primary),0.20)',
        },
        white: {
          DEFAULT: 'rgb(var(--white-foreground))',
          80: 'rgba(var(--white-foreground),0.80)',
          60: 'rgba(var(--white-foreground),0.60)',
          45: 'rgba(var(--white-foreground),0.45)',
          20: 'rgba(var(--white-foreground),0.20)',
          10: 'rgba(var(--white-foreground),0.10)',
        },
        black: {
          DEFAULT: 'var(--black-foreground)',
          80: 'rgba(var(--black-foreground),0.80)',
          60: 'rgba(var(--black-foreground),0.60)',
          45: 'rgba(var(--black-foreground),0.45)',
          20: 'rgba(var(--black-foreground),0.20)',
          10: 'rgba(var(--black-foreground),0.10)',
        },
      },
      backgroundImage: {
        gradient: 'var(--gradient)',
      },
      textColor: {
        pink: {
          DEFAULT: 'rgb(var(--pink))',
          60: 'rgba(var(--pink), 60)',
        },
        white: {
          DEFAULT: 'rgb(var(--white-foreground))',
          80: 'rgba(var(--white-foreground),0.80)',
          60: 'rgba(var(--white-foreground),0.60)',
          45: 'rgba(var(--white-foreground),0.45)',
        },
        black: {
          DEFAULT: 'var(--black-foreground)',
          80: 'rgba(var(--black-foreground),0.80)',
          60: 'rgba(var(--black-foreground),0.60)',
          45: 'rgba(var(--black-foreground),0.45)',
        },
      },
      borderColor: {
        pink: 'rgb(var(--pink))',
        input: 'rgb(var(--input-line))',
      },
      padding: {
        button: '9px',
        input: '12px 16px',
        mainLayout: '36px 32px 45px',
        menuList: '12px 30px',
        headerAuth:'30px',
      },
      borderRadius: {
        button: '10px',
        input: '10px',
      },
      borderWidth: {
        secondaryButton: '2px',
      },
      fontFamily: {
        sans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.menuIconSize': {
          width: '24px',
          height: '24px',
        },
        '.menuImage': {
          background:
            "url('../../assets/images/menuBg.png') center bottom/cover no-repeat",
        },
        '.w-register-form': generateStyle('width', 270, 384),
        '.w-navbar': generateStyle('width', 180, 256),
        '.text-size32': generateStyle('fontSize', 20, 32),
        '.text-size20': generateStyle('fontSize', 16, 20),
        '.text-size16': generateStyle('fontSize', 13, 16),
        '.text-size15': generateStyle('fontSize', 12, 15),
        '.text-size14': generateStyle('fontSize', 11, 14),
        '.text-size12': generateStyle('fontSize', 9, 12),
        '.space-y-custom40': {
          '& > * + *': generateStyle('marginTop', 26, 40),
        },
        '.space-y-custom32': {
          '& > * + *': generateStyle('marginTop', 18, 32),
        },
        '.space-y-custom24': {
          '& > * + *': generateStyle('marginTop', 12, 24),
        },
        '.space-y-custom16': {
          '& > * + *': generateStyle('marginTop', 10, 16),
        },
        '.space-y-custom10': {
          '& > * + *': generateStyle('marginTop', 7, 10),
        },
        ...generateSpace('.mb-custom', 'marginBottom'),
        ...generateSpace('.mt-custom', 'marginTop'),
        ...generateSpace('.m-custom', 'margin'),
        ...generateSpace('.gap-custom', 'gap'),
        ...generateSpace('.pt-custom', 'paddingTop'),
        ...generateSpace('.pb-custom', 'paddingBottom'),
      });
    }),
  ],
};

export default config;
