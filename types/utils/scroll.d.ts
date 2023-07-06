import { Element } from "umbrellajs";
export declare namespace Scroll {
    interface ScrollCoordinates {
        element: HTMLElement;
        x: number;
        y: number;
    }
    /**
     * Getting scroll coordinates
     * @param {Element | string} target target element
     * @returns {{ element: Element, x: number, y: number }[]} scrollItems
     */
    function getScrollCoordinates(target: Element): Array<ScrollCoordinates>;
    /**
     * scroll element by coordinates (cross browser support)
     * @param {Element} element target element
     * @param {number} x scroll offset from left
     * @param {number} y scroll offset from top
     */
    function setElementScroll(element: HTMLElement, x: number, y: number): void;
    /**
     * Smooth scroll element by coordinates (cross browser support)
     * @param {{ element: Element, x: number, y: number }[]} scrollItems
     * @param {number} time duration time
     */
    function animateScroll(scrollItems: Array<ScrollCoordinates>, time: number): Promise<boolean[]>;
    function smoothScroll(elem: HTMLElement | undefined, options: ScrollIntoViewOptions): Promise<boolean>;
}
