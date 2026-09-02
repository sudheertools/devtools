import { hexToRgb, rgbToHsl, hslToRgb, rgbToHex } from "./color";

function rotateHue(h: number, degrees: number): number {
  return ((h + degrees) % 360 + 360) % 360;
}

function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

export function generateComplementary(hex: string): string[] {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [hex, hslToHex(rotateHue(hsl.h, 180), hsl.s, hsl.l)];
}

export function generateAnalogous(hex: string): string[] {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [
    hslToHex(rotateHue(hsl.h, -30), hsl.s, hsl.l),
    hex,
    hslToHex(rotateHue(hsl.h, 30), hsl.s, hsl.l),
  ];
}

export function generateTriadic(hex: string): string[] {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [
    hex,
    hslToHex(rotateHue(hsl.h, 120), hsl.s, hsl.l),
    hslToHex(rotateHue(hsl.h, 240), hsl.s, hsl.l),
  ];
}

export function generateSplitComplementary(hex: string): string[] {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [
    hex,
    hslToHex(rotateHue(hsl.h, 150), hsl.s, hsl.l),
    hslToHex(rotateHue(hsl.h, 210), hsl.s, hsl.l),
  ];
}

export function generateTetradic(hex: string): string[] {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [
    hex,
    hslToHex(rotateHue(hsl.h, 90), hsl.s, hsl.l),
    hslToHex(rotateHue(hsl.h, 180), hsl.s, hsl.l),
    hslToHex(rotateHue(hsl.h, 270), hsl.s, hsl.l),
  ];
}
