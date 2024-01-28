/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background:"rgba(246, 244, 244, 1)",
        primaryColor:"#0067FF",
        yellowColor:"#FEB60D",
        purpleColor:"#9771FF",
        irisBlueColor:"#01B5C5",
        headingColor:"#181A1E",
        textColor:"#4E545F",
        customRed:"#FF0000 ",
        card:"#AF69EF",
        lavender:"#E39FF6",
        periwinkle:"#BE93D4",
        ivory:"#FFFFF0",
        cream:"#FFFDD0",
        arctic:"#82EEFD",
        turquoise:'#00FFEF',
        skyblue:"#87CEEB",
        denim:'#1560BD',
        yellow:"#FEB60D",
        lightyellow:"rgba(254, 182, 13, .2)",
        darkblack:'#D9D1E0'

      },
      boxShadow:{
        panelShadow:"rgba(17,12,46, 0.15) 0px 48px 100px 0px;",
      },
    },
  },
  plugins: [],
}

