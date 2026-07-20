/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  // Preflight is Tailwind's global reset — leaving it OFF so Tailwind's
  // utilities sit *alongside* the site's existing custom CSS (index.css)
  // without wiping its base styles. Only used by the cinematic hero.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        serifhero: ['"Instrument Serif"', 'serif'],
      },
      keyframes: {
        'train-bob': {
          '0%, 100%': { transform: 'translateY(0) scale(1.03)' },
          '50%': { transform: 'translateY(-6px) scale(1.03)' },
        },
      },
      animation: {
        // Constant scale(1.03) keeps the overlay edges off-screen while it bobs.
        'train-bob': 'train-bob 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
