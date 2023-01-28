export const randomise = (min: number, max: number) => {
  return (Math.floor(Math.random() * (max-min))) + min
}

// https://www.30secondsofcode.org/js/s/rgb-to-hsl
export const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

// https://www.30secondsofcode.org/js/s/hsl-to-rgb
export const hslToRgb = (h:number , s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number )=>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

export function luminance(r:number, g:number, b:number) {
  var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928
          ? v / 12.92
          : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// calculate the color contrast between black
export const contrast = (background: number, foreground:number) => { 
  return foreground > background 
    ? ((background + 0.05) / (foreground + 0.05))
    : ((foreground + 0.05) / (background + 0.05));
}

export const generateColors = () => { 
  console.log('GENERATING')
  let c = { r: randomise(0, 255), g: randomise(0, 255), b: randomise(0, 255) }
  let hsl = rgbToHsl(c.r, c.g, c.b)

  const newRgb = hslToRgb(hsl[0], 20, hsl[2])
  
  let background = `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`
  
  const blackLum = luminance(0, 0, 0);
  const whiteLum = luminance(255, 255, 255);
  const backgroundLum = luminance(newRgb[0], newRgb[1], newRgb[2])
  
  const blackOnColor = contrast(backgroundLum, blackLum)
  const whiteOnColor = contrast(backgroundLum, whiteLum)
  
  let foreground = blackOnColor > whiteOnColor ? 'rgb(255,255,255)' : 'rgb(0,0,0)'
  
  return { foreground, background }
}