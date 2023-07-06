import u, { Element } from "umbrellajs";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Scroll {

    export interface ScrollCoordinates {
        element: HTMLElement;
        x: number;
        y: number;
    }

    /**
     * Getting scroll coordinates
     * @param {Element | string} target target element
     * @returns {{ element: Element, x: number, y: number }[]} scrollItems
     */
    export function getScrollCoordinates(target: Element): Array<ScrollCoordinates> {
        const scrollItems = [];
        let targetUEl: any = u(target);

        do {
            if (!targetUEl) targetUEl = false;
            if (!targetUEl.first()) targetUEl = false;
            try {
                const element = targetUEl.first() as HTMLElement;
                const rect = targetUEl.size();
                if (
                    element.scrollHeight !== rect.height ||
                    element.scrollWidth !== rect.width
                ) {
                    scrollItems.push({
                        element,
                        x: element.scrollLeft,
                        y: element.scrollTop,
                    });
                }
                targetUEl = targetUEl.parent();
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
    export function smoothScroll(elem: HTMLElement | undefined, options: ScrollIntoViewOptions) {
        return new Promise<boolean>((resolve) => {
            if (!elem) return resolve(false);
            elem.scrollIntoView(Object.assign({ behavior: "auto" }, options));
            setTimeout(() => resolve(true), 180);
        });
    }

}