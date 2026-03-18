/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:                   '#0056D2',
        'primary-container':       '#0056D2',
        'on-primary':              '#ffffff',
        'on-primary-fixed':        '#001847',
        'primary-fixed-dim':       '#b2c5ff',
        secondary:                 '#4a5d8e',
        surface:                   '#faf8ff',
        'surface-bright':          '#faf8ff',
        'surface-dim':             '#d9d9e4',
        'surface-container-lowest':'#ffffff',
        'surface-container-low':   '#f2f3fe',
        'surface-container':       '#ededf8',
        'surface-container-high':  '#e7e7f2',
        'surface-container-highest':'#e1e2ec',
        'surface-variant':         '#e1e2ec',
        'on-surface':              '#191b23',
        'on-surface-variant':      '#424654',
        'outline-variant':         '#c3c6d6',
        'inverse-surface':         '#2e3038',
        'error':                   '#ba1a1a',
        'error-container':         '#ffdad6',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        headline: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        sm:  '0.125rem',
        md:  '0.375rem',
        lg:  '0.25rem',
        xl:  '0.5rem',
        '2xl': '0.75rem',
        full: '0.75rem',
      },
      boxShadow: {
        soft: '0 20px 40px rgba(25,27,35,0.06)',
        blue: '0 8px 24px rgba(0,86,210,0.2)',
      },
    },
  },
  plugins: [],
}
