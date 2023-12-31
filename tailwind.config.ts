
import type { Config, } from 'tailwindcss';

const config: Config = {

  darkMode: 'class',

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warning: "hsl(var(--warning))",
        "warning-foreground": "hsl(var(--warning-foreground))",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',

      },
      backgroundColor: {
        'primary': 'var(--background-start-rgb)',
        'btn-bg-rgb': 'var(--btn-bg-rgb)',
      },
      textColor: {
        'primary-foreground': 'var(--foreground-rgb)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
