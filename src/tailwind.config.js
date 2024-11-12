// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require("daisyui"),
    ],
    daisyui: {
      themes: ["dark"], // Habilita o tema dark
    },
  }
  