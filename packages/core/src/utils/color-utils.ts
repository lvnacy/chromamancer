/**
 * Color Manipulation Utilities
 * Functions for working with colors
 */

import type {
    ColorHex,
    ThemeType
} from '../types/index';

/**
 * Parse a hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Handle short form (#fff -> #ffffff)
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  
  // Handle alpha channel (ignore it)
  if (hex.length === 8) {
    hex = hex.slice(0, 6);
  }
  
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  
  return { r, g, b };
}

/**
 * Convert RGB values to hex
 */
export function rgbToHex(
    r: number,
    g: number,
    b: number
): ColorHex {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(
    r: number,
    g: number,
    b: number
): {
    h: number;
    s: number;
    l: number
} {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  
  if (max === min) {
    return { h: 0, s: 0, l };
  }
  
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
  let h = 0;
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    case b:
      h = ((r - g) / d + 4) / 6;
      break;
  }
  
  return { h: h * 360, s, l };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(
    h: number,
    s: number,
    l: number
): {
    r: number;
    g: number;
    b: number
} {
  h /= 360;
  
  if (s === 0) {
    const gray = Math.round(l * 255);
    return { r: gray, g: gray, b: gray };
  }
  
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  
  const r = hue2rgb(p, q, h + 1/3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1/3);
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Lighten a color by a percentage
 */
export function lighten(hex: string, amount: number): ColorHex {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Increase lightness
  hsl.l = Math.min(1, hsl.l + amount);
  
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Darken a color by a percentage
 */
export function darken(hex: string, amount: number): ColorHex {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Decrease lightness
  hsl.l = Math.max(0, hsl.l - amount);
  
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Saturate a color by a percentage
 */
export function saturate(hex: string, amount: number): ColorHex {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  hsl.s = Math.min(1, hsl.s + amount);
  
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Desaturate a color by a percentage
 */
export function desaturate(hex: string, amount: number): ColorHex {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  hsl.s = Math.max(0, hsl.s - amount);
  
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Set alpha channel on a color
 */
export function setAlpha(hex: string, alpha: number): string {
  // Remove existing alpha if present
  hex = hex.replace(/^#/, '');
  if (hex.length === 8) {
    hex = hex.slice(0, 6);
  }
  
  // Convert alpha (0-1) to hex (00-ff)
  const alphaHex = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  
  return `#${hex}${alphaHex}`;
}

/**
 * Mix two colors together
 */
export function mix(
    hex1: string,
    hex2: string,
    weight: number = 0.5
): ColorHex {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  
  const r = Math.round(rgb1.r * (1 - weight) + rgb2.r * weight);
  const g = Math.round(rgb1.g * (1 - weight) + rgb2.g * weight);
  const b = Math.round(rgb1.b * (1 - weight) + rgb2.b * weight);
  
  return rgbToHex(r, g, b);
}

/**
 * Generate a color for a specific semantic purpose
 */
export function generateColor(
  type: 'error' | 'warning' | 'info' | 'success' | 'accent',
  themeType: ThemeType
): ColorHex {
  const isDark = themeType === 'dark' || themeType === 'hc';
  
  switch (type) {
    case 'error':
      return isDark ? '#f48771' : '#e51400';
    case 'warning':
      return isDark ? '#cca700' : '#bf8803';
    case 'info':
      return isDark ? '#75beff' : '#006ab1';
    case 'success':
      return isDark ? '#89d185' : '#388a34';
    case 'accent':
      return isDark ? '#0e639c' : '#005fb8';
  }
}

/**
 * Check if a color is light or dark
 */
export function isLight(hex: string): boolean {
  const rgb = hexToRgb(hex);
  
  // Calculate relative luminance
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  const luminance = 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
  
  return luminance > 0.5;
}

/**
 * Ensure good contrast between two colors
 * Returns adjusted foreground color if needed
 */
export function ensureContrast(
  foreground: string,
  background: string,
  targetRatio: number = 4.5
): ColorHex {
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);
  
  const getLuminance = (rgb: { r: number; g: number; b: number }) => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
  };
  
  const fgLum = getLuminance(fgRgb);
  const bgLum = getLuminance(bgRgb);
  
  const ratio = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);
  
  if (ratio >= targetRatio) {
    return foreground; // Already has good contrast
  }
  
  // Adjust foreground to meet contrast ratio
  const bgIsLight = isLight(background);
  return bgIsLight ? darken(foreground, 0.3) : lighten(foreground, 0.3);
}