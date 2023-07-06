import { TourStyle } from "../types";
import { clamp } from "./clamp";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Color {

    type RGB = [number, number, number];
    type HSL = RGB;

    export function hexToRGB(hex: string): RGB {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return [
            parseInt(result?.[1] || "", 16),
            parseInt(result?.[2] || "", 16),
            parseInt(result?.[3] || "", 16)
        ];
    }

    export function componentToHex(c: number): string {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    export function rgbToHex(r: number, g: number, b: number): string {
        return "#" + componentToHex(Math.floor(r)) + componentToHex(Math.floor(g)) + componentToHex(Math.floor(b));
    }

    export function RGBToHSL(r: number, g: number, b: number): HSL {
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
    }

    export function HSLToRGB(h: number, s: number, l: number): RGB {
        s /= 100;
        l /= 100;
        const k = (n: number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [255 * f(0), 255 * f(8), 255 * f(4)];
    }

    export function hexToHSL(hex: string) {
        return RGBToHSL(...hexToRGB(hex));
    }

    export function HSLToHex(h: number, s: number, l: number): string {
        return rgbToHex(...HSLToRGB(h, s, l));
    }

    export function adjust(hex: string, h: number, s: number, l: number): string {
        const hsl = hexToHSL(hex);
        hsl[0] = clamp(hsl[0] * h, 0, 255);
        hsl[1] = clamp(hsl[1] * s, 0, 255);
        hsl[2] = clamp(hsl[2] * l, 0, 255);
        return HSLToHex(...hsl);
    }

    export function setAutoColors(defaultStyle: TourStyle, optionsStyle: TourStyle) {
        const style = Object.assign(defaultStyle, optionsStyle || {});
        const filter = /Color$/;
        const { accentColor = "" } = style;
        Object.keys(style)
            .filter(key => filter.test(key) && (style as any)[key] === "auto")
            .forEach(key => {
                switch (key) {
                    case "focusColor":
                    case "stepButtonNextColor":
                    case "stepButtonCompleteColor":
                    case "bulletCurrentColor":
                        style[key] = accentColor;
                        break;
                    case "bulletColor":
                        style[key] = adjust(accentColor, 1, 0.8, 1.4);
                        break;
                    case "bulletVisitedColor":
                        style[key] = adjust(accentColor, 1, 0.3, 1.2);
                        break;
                    case "stepButtonPrevColor":
                    case "stepButtonCloseColor":
                        style[key] = adjust(accentColor, 1, 0.2, 0.8);
                        break;
                }
            });
        return style;
    }

}