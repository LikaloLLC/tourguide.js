import u, { Element } from "umbrellajs";

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
    let scrollItems = [];
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
    // if (element.self === element) {
    element.scrollTo(x, y);
    // } else {
    //     element.scrollLeft = x;
    //     element.scrollTop = y;
    // }
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

    // scrollItems.forEach((item) => {
    //     animate(item.element, item.x, item.y);
    // });

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
        if(!elem) return resolve(false);
        elem.scrollIntoView(Object.assign({ behavior: "auto" }, options));
        setTimeout(() => resolve(true), 50);
        // // if (!(elem instanceof Element)) {
        // //     throw new TypeError('Argument 1 must be an Element');
        // // }
        // let same = 0; // a counter
        // let lastPos: number | null = null; // last known Y position
        // // pass the user defined options along with our default
        // const scrollOptions = Object.assign({ behavior: 'smooth' }, options);

        // // let's begin
        // elem.scrollIntoView(scrollOptions);
        // requestAnimationFrame(check);

        // // this function will be called every painting frame
        // // for the duration of the smooth scroll operation
        // function check() {
        //     // check our current position
        //     const newPos = elem.getBoundingClientRect().top;

        //     if (newPos === lastPos) { // same as previous
        //         if (same++ > 2) { // if it's more than two frames
        //             /* @todo: verify it succeeded
        //             * if(isAtCorrectPosition(elem, options) {
        //             *   resolve();
        //             * } else {
        //             *   reject();
        //             * }
        //             * return;
        //             */
        //             return resolve(true); // we've come to an halt
        //         }
        //     }
        //     else {
        //         same = 0; // reset our counter
        //         lastPos = newPos; // remember our current position
        //     }
        //     // check again next painting frame
        //     requestAnimationFrame(check);
        // }
    });
}
