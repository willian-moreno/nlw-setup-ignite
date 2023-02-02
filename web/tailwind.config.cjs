/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090a',
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))'
      },
      animation: {
        'scale-in': '0.3s scale-in forwards',
        'fade-slide-in-y-top': '0.3s fade-slide-in-y-top forwards',
        'fade-slide-in-x-right': '0.3s fade-slide-in-x-right forwards',
        'fade-slide-out-x-right': '0.5s fade-slide-out-x-right forwards',
      },
      keyframes: {
        'scale-in': {
          from: { transform: 'scale(0)' },
          to: { transform: 'scale(1)' },
        },

        'fade-slide-in-y-top': {
          from: { transform: 'translate3d(-50%, -90vh, 0)' },
          to: { transform: 'translate3d(-50%, -50%, 0)' },
        },

        'fade-slide-in-x-right': {
          '0%': {
            transform: 'translateX(90vh)'
          },

          '80%': {
            transform: 'translateX(-50px)'
          },

          '100%': {
            transform: 'translateX(0px)'
          },
        },

        'fade-slide-out-x-right': {
          '0%': {
            transform: 'translateX(0px)'
          },

          '20%': {
            transform: 'translateX(-50px)'
          },

          '100%': {
            transform: 'translateX(90vh)'
          },
        },
      }
    },
  },
  plugins: [],
}
