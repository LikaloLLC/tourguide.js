import { Color } from "../../src/utils/color";

describe("Color", () => {
    describe("hexToRGB", () => {
        it("should convert hex color to RGB", () => {
            expect(Color.hexToRGB("#ff0000")).toEqual([255, 0, 0]);
            expect(Color.hexToRGB("#00ff00")).toEqual([0, 255, 0]);
            expect(Color.hexToRGB("#0000ff")).toEqual([0, 0, 255]);
        });
    });

    describe("componentToHex", () => {
        it("should convert component to hex", () => {
            expect(Color.componentToHex(255)).toBe("ff");
            expect(Color.componentToHex(0)).toBe("00");
        });
    });

    describe("rgbToHex", () => {
        it("should convert RGB to hex", () => {
            expect(Color.rgbToHex(255, 0, 0)).toBe("#ff0000");
            expect(Color.rgbToHex(0, 255, 0)).toBe("#00ff00");
            expect(Color.rgbToHex(0, 0, 255)).toBe("#0000ff");
        });
    });

    describe("RGBToHSL", () => {
        it("should convert RGB to HSL", () => {
            expect(Color.RGBToHSL(255, 0, 0)).toEqual([0, 100, 50]);
            expect(Color.RGBToHSL(0, 255, 0)).toEqual([120, 100, 50]);
            expect(Color.RGBToHSL(0, 0, 255)).toEqual([240, 100, 50]);
        });
    });

    describe("HSLToRGB", () => {
        it("should convert HSL to RGB", () => {
            expect(Color.HSLToRGB(0, 100, 50)).toEqual([255, 0, 0]);
            expect(Color.HSLToRGB(120, 100, 50)).toEqual([0, 255, 0]);
            expect(Color.HSLToRGB(240, 100, 50)).toEqual([0, 0, 255]);
        });
    });

    describe("hexToHSL", () => {
        it("should convert hex to HSL", () => {
            expect(Color.hexToHSL("#ff0000")).toEqual([0, 100, 50]);
            expect(Color.hexToHSL("#00ff00")).toEqual([120, 100, 50]);
            expect(Color.hexToHSL("#0000ff")).toEqual([240, 100, 50]);
        });
    });

    describe("HSLToHex", () => {
        it("should convert HSL to hex", () => {
            expect(Color.HSLToHex(0, 100, 50)).toBe("#ff0000");
            expect(Color.HSLToHex(120, 100, 50)).toBe("#00ff00");
            expect(Color.HSLToHex(240, 100, 50)).toBe("#0000ff");
        });
    });

    describe("adjust", () => {
        it("should adjust the color based on given h, s, l factors", () => {
            expect(Color.adjust("#ff0000", 1, 1, 1)).toBe("#ff0000");
            expect(Color.adjust("#00ff00", 0.5, 0.5, 0.5)).toBe("#7f7f7f");
            expect(Color.adjust("#0000ff", 2, 1, 1)).toBe("#ff00ff");
        });
    });

    describe("setAutoColors", () => {
        it("should set auto colors based on default and options style", () => {
            const defaultStyle = {};
            const optionsStyle = { accentColor: "#000000" };
            expect(Color.setAutoColors(defaultStyle, optionsStyle)).toEqual({});
        });
    });
});
