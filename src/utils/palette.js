const base = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b'
}

const core = {
  dayblue:    '#59C9F1',
  nightblue:  '#151152',
  red:        '#B52121',
  brown:      '#6B3710',
  sand:       '#DDA059',
  yellow:     '#FFD921',
  green:      '#58AC14',
  pink:       '#ee729c',
  gray:       '#545863'
};

const rgbToHex = (r, g, b) => {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  return `#${r.toString(16).toUpperCase().padStart(2, "0")}${g
    .toString(16)
    .toUpperCase()
    .padStart(2, "0")}${b.toString(16).toUpperCase().padStart(2, "0")}`;
};

// const hslToHex = (h, s, l) => {
//   const rgb = hslToRGB(h, s, l);
//   return rgbToHex(Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]));
// };

const hexToRGB = (hex) => {
  hex = hex.toString().replace("#", "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  return [
    parseInt(hex.substr(0, 2), 16),
    parseInt(hex.substr(2, 2), 16),
    parseInt(hex.substr(4, 2), 16)
  ];
};

// RGB -> HSL / HSL -> RGB: http://jsfiddle.net/sangdol/euSLy/4/
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
const rgbToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  // (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
};

const hexToHSL = (hex) => {
  const rgb = hexToRGB(hex);
  return rgbToHSL(rgb[0], rgb[1], rgb[2]);
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
const hslToRGB = (h, s, l) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const matchColor = (hex, compHex) => {
  const HSL = hexToHSL(hex);
  const compHSL = hexToHSL(compHex);

  const newRGB = hslToRGB(HSL[0], HSL[1], compHSL[2]);

  return rgbToHex(newRGB[0], newRGB[1], newRGB[2]);
};

const generatePalette = (colors, range) => {
  let p = {}
  const colorKeys = Object.keys(colors)
  const rangeKeys = Object.keys(range)

  for(var i = 0; i < colorKeys.length; i++) {
    const colorKey = colorKeys[i]

    p[colorKey] = {
      DEFAULT: colors[colorKey]
    }

    for(var j = 0; j < rangeKeys.length; j++) {
      const rangeKey = rangeKeys[j]
      p[colorKey][rangeKey] = matchColor(colors[colorKey], range[rangeKey])
    }

  }

  return p;
}
const corePalette = generatePalette(core, base);

const palette = {
  transparent: "transparent",
  current: "currentColor",
  white: "white",
  black: "black",
  light: base[50],
  dark: base[900],
  ...corePalette,
};

//module.exports = palette // this is for const palette = require('...')
export default palette