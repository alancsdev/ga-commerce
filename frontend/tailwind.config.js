const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      bk1: '1700px',
    },
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.overflow-custom-visible': {
          overflow: 'visible !important',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
});
