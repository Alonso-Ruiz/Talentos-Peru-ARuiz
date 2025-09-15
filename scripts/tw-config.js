window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',           
  theme: {
    extend: {
      colors: {
        tpBlue: '#0077FF',
        tpBlueHover: '#005FCC',
        tpSky: '#4DB6FF',
        tpYellow: '#FFCC00',
        tpText: '#000000',
        tpMuted: '#102748',
        tpFaint: '#999999',
        tpBorder: '#E0E0E0',
        tpBorderAlt: '#A9C6ED',
        tpIconPrimary: '#055FE1',
        tpIconSecondary: '#173966'
      },
      borderRadius: { xl2: '1rem' },
      boxShadow: { soft: '0 6px 18px rgba(0,0,0,0.06)' }
    }
  }
};
