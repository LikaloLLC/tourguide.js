import { TourStyle } from "../types";
export declare namespace Color {
    type RGB = [number, number, number];
    type HSL = RGB;
    export function hexToRGB(hex: string): RGB;
    export function componentToHex(c: number): string;
    export function rgbToHex(r: number, g: number, b: number): string;
    export function RGBToHSL(r: number, g: number, b: number): HSL;
    export function HSLToRGB(h: number, s: number, l: number): RGB;
    export function hexToHSL(hex: string): RGB;
    export function HSLToHex(h: number, s: number, l: number): string;
    export function adjust(hex: string, h: number, s: number, l: number): string;
    export function setAutoColors(defaultStyle: TourStyle, optionsStyle: TourStyle): TourStyle;
    export {};
}
