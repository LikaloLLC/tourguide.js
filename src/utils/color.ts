import { TourStyle } from "../../@types";
import { clamp } from "./clamp";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Color {

    type RGB = [number, number, number];
    type HSL = RGB;

/**
 * Converts a hexadecimal color code to an RGB color.
 *
 * The function takes a string representing a hexadecimal color and converts it to its corresponding RGB values.
 * Hexadecimal colors are represented as `#RRGGBB`, where RR, GG, and BB are two-digit hexadecimal numbers representing the red, green, and blue components of the color respectively.
 *
 * @param hex - A string representing a hexadecimal color code. It should be in the format `#RRGGBB`.
 * @returns An array containing three elements: [R, G, B]. Each element is a number between 0 and 255 representing the intensity of the red, green, and blue components of the color respectively.
 *
 * Example usage:
 * ```typescript
 * const rgb = Color.hexToRGB("#FFA501"); // [255, 165, 1]
 * console.log(rgb); // Output: [255, 165, 1]
 * ```
 */
    export function hexToRGB(hex: string): RGB {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return [
            parseInt(result?.[1] || "", 16),
            parseInt(result?.[2] || "", 16),
            parseInt(result?.[3] || "", 16)
        ];
    }

/**
 * Converts a color component (red, green, or blue) to its hexadecimal representation.
 *
 * @param c - A number representing the intensity of the red, green, or blue component of a color. It should be between 0 and 255.
 * @returns A string representing the hexadecimal value of the color component. The returned string will always have two digits, either padded with a leading zero if necessary.
 *
 * Example usage:
 * ```typescript
 * const hex = Color.componentToHex(255); // "FF"
 * console.log(hex); // Output: "FF"
 * ```
 */
    export function componentToHex(c: number): string {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

/**
 * Converts an RGB color to its hexadecimal representation.
 *
 * The function takes three numbers representing the red, green, and blue components of a color (each ranging from 0 to 255) and converts it to its corresponding hexadecimal color code.
 * Hexadecimal colors are represented as `#RRGGBB`, where RR, GG, and BB are two-digit hexadecimal numbers representing the red, green, and blue components of the color respectively.
 *
 * @param r - A number representing the intensity of the red component of the color. It should be between 0 and 255.
 * @param g - A number representing the intensity of the green component of the color. It should be between 0 and 255.
 * @param b - A number representing the intensity of the blue component of the color. It should be between 0 and 255.
 * @returns A string representing the hexadecimal color code in the format `#RRGGBB`.
 *
 * Example usage:
 * ```typescript
 * const hex = Color.rgbToHex(255, 165, 1); // "#FFA501"
 * console.log(hex); // Output: "#FFA501"
 * ```
 */
    export function rgbToHex(r: number, g: number, b: number): string {
        return "#" + componentToHex(Math.floor(r)) + componentToHex(Math.floor(g)) + componentToHex(Math.floor(b));
    }

/**
 * Converts an RGB color to its HSL representation.
 *
 * The function takes three numbers representing the red, green, and blue components of a color (each ranging from 0 to 255) and converts it to its corresponding HSL values.
 * HSL stands for Hue, Saturation, and Lightness, where:
 * - Hue (H) is an angle value usually represented in degrees on the color circle, ranging from 0° to 360°.
 * - Saturation (S) is a percentage value representing the intensity of the color, ranging from 0% (gray) to 100%.
 * - Lightness (L) is also a percentage value representing the lightness or darkness of the color, ranging from 0% (black) to 100%.
 *
 * @param r - A number representing the intensity of the red component of the color. It should be between 0 and 255.
 * @param g - A number representing the intensity of the green component of the color. It should be between 0 and 255.
 * @param b - A number representing the intensity of the blue component of the color. It should be between 0 and 255.
 * @returns An array containing three elements: [H, S, L]. Each element is a number representing the Hue, Saturation, and Lightness values respectively.
 *
 * Example usage:
 * ```typescript
 * const hsl = Color.RGBToHSL(255, 165, 1); // [39.08, 100, 50.19]
 * console.log(hsl); // Output: [39.08, 100, 50.19]
 * ```
 */
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
    
/**
 * Converts an HSL color to its RGB representation.
 *
 * The function takes three numbers representing the Hue, Saturation, and Lightness values of a color and converts it to its corresponding RGB values.
 * HSL stands for Hue, Saturation, and Lightness, where:
 * - Hue (H) is an angle value usually represented in degrees on the color circle, ranging from 0° to 360°.
 * - Saturation (S) is a percentage value representing the intensity of the color, ranging from 0% (gray) to 100%.
 * - Lightness (L) is also a percentage value representing the lightness or darkness of the color, ranging from 0% (black) to 100%.
 *
 * @param h - A number representing the Hue value of the color. It should be between 0 and 360.
 * @param s - A number representing the Saturation value of the color. It should be between 0 and 100.
 * @param l - A number representing the Lightness value of the color. It should be between 0 and 100.
 * @returns An array containing three elements: [R, G, B]. Each element is a number between 0 and 255 representing the intensity of the red, green, and blue components of the color respectively.
 *
 * Example usage:
 * ```typescript
 * const rgb = Color.HSLToRGB(39.08, 100, 50.19); // [255, 165, 1]
 * console.log(rgb); // Output: [255, 165, 1]
 * ```
 */
    export function HSLToRGB(h: number, s: number, l: number): RGB {
        s /= 100;
        l /= 100;
        const k = (n: number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [255 * f(0), 255 * f(8), 255 * f(4)];
    }

/**
 * Converts a hexadecimal color code to its HSL representation.
 *
 * The function takes a string representing the hexadecimal color code and converts it to its corresponding HSL values.
 * Hexadecimal colors are represented as `#RRGGBB`, where RR, GG, and BB are two-digit hexadecimal numbers representing the red, green, and blue components of the color respectively.
 *
 * @param hex - A string representing the hexadecimal color code in the format `#RRGGBB`.
 * @returns An array containing three elements: [H, S, L]. Each element is a number representing the Hue, Saturation, and Lightness values respectively.
 *
 * Example usage:
 * ```typescript
 * const hsl = Color.hexToHSL("#FFA501"); // [39.08, 100, 50.19]
 * console.log(hsl); // Output: [39.08, 100, 50.19]
 * ```
 */
    export function hexToHSL(hex: string): HSL {
        return RGBToHSL(...hexToRGB(hex));
    }

/**
 * Converts an HSL color to its hexadecimal representation.
 *
 * The function takes three numbers representing the Hue, Saturation, and Lightness values of a color and converts it to its corresponding hexadecimal color code.
 *
 * @param h - A number representing the Hue value of the color. It should be between 0 and 360.
 * @param s - A number representing the Saturation value of the color. It should be between 0 and 100.
 * @param l - A number representing the Lightness value of the color. It should be between 0 and 100.
 * @returns A string representing the hexadecimal color code in the format `#RRGGBB`.
 */
    export function HSLToHex(h: number, s: number, l: number): string {
        return rgbToHex(...HSLToRGB(h, s, l));
    }

/**
 * Adjusts the hue, saturation, and lightness of a given color.
 *
 * The function takes a hexadecimal color code and adjustment factors for hue, saturation, and lightness. It returns the adjusted color as a hexadecimal string.
 *
 * @param hex - A string representing the original hexadecimal color code in the format `#RRGGBB`.
 * @param h - A number between 0 and 1 that adjusts the hue of the color. 1 means no change, less than 1 decreases saturation, and greater than 1 increases it.
 * @param s - A number between 0 and 1 that adjusts the saturation of the color. 1 means no change, less than 1 decreases saturation, and greater than 1 increases it.
 * @param l - A number between 0 and 1 that adjusts the lightness of the color. 1 means no change, less than 1 decreases lightness, and greater than 1 increases it.
 * @returns A string representing the adjusted hexadecimal color code in the format `#RRGGBB`.
 */
    export function adjust(hex: string, h: number, s: number, l: number): string {
        const hsl = hexToHSL(hex);
        hsl[0] = clamp(hsl[0] * h, 0, 255);
        hsl[1] = clamp(hsl[1] * s, 0, 255);
        hsl[2] = clamp(hsl[2] * l, 0, 255);
        return HSLToHex(...hsl);
    }

/**
 * Automatically sets the color properties of a tour style object based on the accent color.
 *
 * This function iterates over the properties of the given `style` and `optionsStyle` objects, checking if their values are set to "auto". If so, it adjusts these properties according to specific rules:
 * - For focusColor, stepButtonNextColor, stepButtonCompleteColor, bulletCurrentColor, the color is directly set to the accentColor.
 * - For bulletColor, a slightly adjusted version of the accentColor (increased hue and saturation) is used.
 * - For bulletVisitedColor, an even more adjusted version of the accentColor (with increased hue) is used.
 * - For stepButtonPrevColor and stepButtonCloseColor, a further adjustment (decreasing lightness) is applied to the accentColor.
 *
 * @param defaultStyle - The base style object containing default color settings.
 * @param optionsStyle - An optional style object that can override some of the default colors with user-defined values.
 * @returns A new style object with auto-generated colors based on the accentColor and other specified rules.
 */
    export function setAutoColors(defaultStyle: TourStyle, optionsStyle?: TourStyle): TourStyle {
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