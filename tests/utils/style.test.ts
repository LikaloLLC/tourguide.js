import { Style } from "../../src/utils/style";
import { TourStyle } from "../../@types";

describe("Style", () => {
    let element: HTMLElement;

    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    describe("getStyle", () => {
        it("should return the correct value for an existing style property", () => {
            element.style.backgroundColor = "red";
            expect(Style.getStyle('div', 'background-color')).toBe('red');
        });

        it("should return an empty string for a non-existing style property", () => {
            expect(Style.getStyle('div', 'non-existing-property')).toBe('');
        });
    });

    describe("setStyle", () => {
        it("should set the correct styles on the element", () => {
            const styleObj: Record<string, string | number> = { backgroundColor: "blue", color: "white" };
            Style.setStyle(element, styleObj);
            expect(getComputedStyle(element).backgroundColor).toBe('blue');
            expect(getComputedStyle(element).color).toBe('white');
        });
    });

    describe("colorObjToStyleVarString", () => {
        it("should convert color object to a string of css variables", () => {
            const colors: TourStyle = { overlayColor: "gray", backgroundColor: "white", bulletCurrentColor: "red" };
            expect(Style.colorObjToStyleVarString(colors)).toBe(':host {\n--tourguide-overlay-color: gray;\n--tourguide-background-color: white;\n--tourguide-bullet-current-color: red;\n}');
        });
    });
});
