/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          olive: '#737B4C',
          rust: '#A05035',
          cream: '#E9DFC6',
          tan: '#B88D6A',
          brown: '#7C563D',
          // Map to semantic names
          primary: '#A05035',   // rust
          secondary: '#737B4C', // olive
          accent: '#B88D6A',    // tan
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
        boxShadow: {
          'soft': '0 4px 20px rgba(124, 86, 61, 0.1)',
          'card': '0 8px 30px rgba(124, 86, 61, 0.15)',
        },
      },
    },
    plugins: [],
  };