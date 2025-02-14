import u, { Element } from "umbrellajs";
import { TourStyle } from "@types";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Style {

    /**
     * alternative for jQuery .css() get method
     * @param {Element | string} element target element or selector
     * @param {string} css3Prop css3 property
     * @returns {string} value
     */
    export function getStyle(element: string, css3Prop: string) {
        const originalEl = u(element).first() as HTMLElement;
        try {
            return getComputedStyle(originalEl).getPropertyValue(css3Prop);
        } catch (e) {
            return "";
        }
    }

    export function setStyle(element: Element, styleObj: Record<string, string | number>): Element {
        const style: Record<string, string> = {};
        Object.keys(styleObj).forEach((key) => {
            style[key] = styleObj[key] + "";
        });
        Object.assign((u(element).first() as HTMLElement).style, style);
        return element;
    }

    /**
     * convert the color object to the sets of css variables
     * @param {Object<string, string | number>} colors color object
     * @param {string} [prefix] prefix of css variable name. default: "--tourguide"
     * @param {string} [selector] target css selector. default: ":root"
     * @returns {string} converted string
     * @example
     *  input: { overlay: "gray", background: "white", bulletCurrent: "red" }
     *  output: ":root { --tourguide-overlay: gray; --tourguide-background: white; --tourguide-bullet-current: red; }"
     */
    export function colorObjToStyleVarString(colors: TourStyle, prefix = "--tourguide", selector = ":host") {
        const styleArray: Array<string> = [];
        Object.entries(colors).forEach(([key, value]) => {
            const splitNameArray = [prefix];
            let prevIndex = 0;
            for (let i = 0; i < key.length; i += 1) {
                if ("A" <= key[i] && key[i] <= "Z") {
                    splitNameArray.push(key.substring(prevIndex, i).toLowerCase());
                    prevIndex = i;
                }
            }
            splitNameArray.push(key.substring(prevIndex, key.length).toLowerCase());
            styleArray.push(`${splitNameArray.join("-")}: ${value}`);
        });
        return `${selector} {\n${styleArray.join(";\n")};\n}`;
    }

}