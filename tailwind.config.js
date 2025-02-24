/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    container: false, // تعطيل الإعداد الافتراضي للحاوية
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-color-background': 'var(--main-color-background-css)',
        'section-color': 'var(--section-color-css)',
        'main-color': 'var(--main-color-css)',
        'main-color-hover': 'var(--main-color-hover-css)',
        'color-text-1': 'var(--color-text-1-css)',
        'color-text-2': 'var(--color-text-2-css)',
        'color-hover-text-2': 'var(--color-hover-text-2-css)',
        'color-border': 'var(--color-border-css)',
        'button-color': 'var(--button-color-css)',
        'button-hover-color': 'var(--button-hover-color-css)',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          margin: '0 auto',
          padding: '1rem', 
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1280px',
          },
          '@screen xl': {
            maxWidth: '1400px',
          },
        },
      });
    },
  ],
};
