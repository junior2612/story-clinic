module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { offwhite:"#FAF7F2", beige:"#E7DFD8", cacao:"#6B5B53", sand:"#D3C6B8", ink:"#2F2A26" },
      fontFamily: { sans: ["Inter","ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Arial","sans-serif"]},
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,0.06)" }
    }
  },
  plugins: []
}
