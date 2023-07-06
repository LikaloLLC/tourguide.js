import { Element } from "umbrellajs";
import { TourStyle } from "../types";
export declare namespace Style {
    /**
     * alternative for jQuery .css() get method
     * @param {Element | string} element target element or selector
     * @param {string} css3Prop css3 property
     * @returns {string} value
     */
    function getStyle(element: string, css3Prop: string): string;
    function setStyle(element: Element, styleObj: Record<string, string | number>): Element;
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
    function colorObjToStyleVarString(colors: TourStyle, prefix?: string, selector?: string): string;
}
