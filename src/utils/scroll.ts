import u, { Umbrella as U } from "umbrellajs";
import { Element } from "@types";
import { isElementVisibleOnPage } from "./dom";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Scroll {

    export interface ScrollCoordinates {
        element: HTMLElement;
        x: number;
        y: number;
    }

    /**
     * Retrieves the scroll coordinates of all elements that have a non-zero scrollable area.
     *
     * @param target - The initial HTML element from which to start checking for scrollable areas.
     * @returns An array of objects containing the element, its horizontal (x) and vertical (y) scroll positions.
     */
    export function getScrollCoordinates(target: Element): Array<ScrollCoordinates> {
        const scrollItems = [];
        let targetUEl: U | boolean;
        targetUEl = u(target as U);

        do {
            if (!targetUEl) targetUEl = false;
            if (!(targetUEl as U).first()) targetUEl = false;
            try {
                const element = (targetUEl as U).first() as HTMLElement;
                const rect = (targetUEl as U).size();
                if (
                    element.scrollHeight !== rect?.height ||
                    element.scrollWidth !== rect?.width
                ) {
                    scrollItems.push({
                        element,
                        x: element.scrollLeft,
                        y: element.scrollTop,
                    });
                }
                targetUEl = (targetUEl as U).parent();
            } catch (error) {
                targetUEl = false;
            }
        } while (targetUEl);

        return scrollItems;
    }

    /**
     * scroll element by coordinates (cross browser support)
     * @param {Element} element target element
     * @param {number} x scroll offset from left
     * @param {number} y scroll offset from top
     */
    export function setElementScroll(element: HTMLElement, x: number, y: number) {
        element.scrollTo(x, y);
    }

    /**
     * Smooth scroll element by coordinates (cross browser support)
     * @param {{ element: Element, x: number, y: number }[]} scrollItems
     * @param {number} time duration time
     */
    export function animateScroll(scrollItems: Array<ScrollCoordinates>, time: number) {
        const startTime = Date.now();

        function raf(task: FrameRequestCallback) {
            if ("requestAnimationFrame" in window) {
                return window.requestAnimationFrame(task);
            }
            return setTimeout(task, 16);
        }

        function ease(v: number) {
            return 1 - Math.pow(1 - v, v / 2);
        }

        function animate(el: HTMLElement, x: number, y: number, resolve: (result: boolean) => void) {
            if (!el) {
                console.warn(`target element ${el} not found, skip`);
                return;
            }

            const diffTime = Date.now() - startTime;
            const timeValue = Math.min((1 / time) * diffTime, 1);
            const easeValue = 1 - ease(timeValue);

            const differenceX = x - el.scrollLeft;
            const differenceY = y - el.scrollTop;

            setElementScroll(el, x - differenceX * easeValue, y - differenceY * easeValue);

            if (diffTime >= time) {
                setElementScroll(el, x, y);
                return resolve(true);
            }

            raf(animate.bind(null, el, x, y, resolve));
        }

        return Promise.all(scrollItems.map((item) => {
            return new Promise<boolean>(resolve => animate(item.element, item.x, item.y, resolve));
        }));
    }

    /* 
     *
     * Promised based scrollIntoView( { behavior: 'smooth' } )
     * @param { Element } elem
     **  ::An Element on which we'll call scrollIntoView
     * @param { object } [options]
     **  ::An optional scrollIntoViewOptions dictionary
     * @return { Promise } (void)
     **  ::Resolves when the scrolling ends
     *
     */
    export function smoothScroll(element: HTMLElement | undefined, options: ScrollIntoViewOptions) {
        return new Promise<boolean>((resolve) => {
            if (!element || !isElementVisibleOnPage(element)) return resolve(false);
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        observer.disconnect();
                        setTimeout(() => resolve(true), 100);
                    }
                });
            }, { root: null, threshold: 0.5 });
            observer.observe(element);
            element.scrollIntoView(Object.assign({ behavior: "auto" }, options));
        });
    }

}