import { clamp } from ".";

export function hexToRGB(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
    return "#" + componentToHex(Math.floor(r)) + componentToHex(Math.floor(g)) + componentToHex(Math.floor(b));
}

export function RGBToHSL(r, g, b) {
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

export function HSLToRGB(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
}

export function hexToHSL(hex) {
    return RGBToHSL.apply(null, hexToRGB(hex));
}

export function HSLToHex(h, s, l) {
    return rgbToHex.apply(null, HSLToRGB(h, s, l));
}

export function adjust(hex, h, s, l) {
    const hsl = hexToHSL(hex);
    hsl[0] = clamp(hsl[0] * h, 0, 255);
    hsl[1] = clamp(hsl[1] * s, 0, 255);
    hsl[2] = clamp(hsl[2] * l, 0, 255);
    return HSLToHex.apply(null, hsl);
}

export function setAutoColors(defaultStyle, optionsStyle) {
    let style = Object.assign(defaultStyle, optionsStyle || {});
    const filter = /Color$/;
    const { accentColor } = style;
    Object.keys(style)
        .filter(key => filter.test(key) && style[key] === "auto")
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