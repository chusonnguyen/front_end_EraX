module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "intel-blue": "#0071C5",
        "icon-gray": "#9998a7",
        "grey-theme-bg": "#f0f2f5",
      },
    },
    screens: {
      'sm': '768px',
      // => @media (min-width: 640px) { ... }

      'md': '1024px',
      // => @media (min-width: 1024px) { ... }

      'lg': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ]
}