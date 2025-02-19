import { Scroll } from "../../src/utils/scroll";
import U from "umbrellajs";

describe("Scroll", () => {
    let target: any;
    let element: HTMLDivElement;

    const intersectionObserverMock = (fn: any) => {
        setTimeout(() => {
            fn([
                {isIntersecting: true}
            ]);
        }, 50);
        return ({
            observe: () => undefined,
            disconnect: () => undefined
        })
    }
    window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

    beforeEach(() => {
        target = U('<div style="width: 100px; height: 100px;"></div>') as any;
        target.size = jest.fn(() => ({
            "x": 0,
            "y": 0,
            "bottom": 0,
            "height": 100,
            "left": 0,
            "right": 0,
            "top": 0,
            "width": 100
        }));
        element = target.first();
        (element as any).getBoundingClientRect = jest.fn(() => ({
            "x": 0,
            "y": 0,
            "bottom": 0,
            "height": 100,
            "left": 0,
            "right": 0,
            "top": 0,
            "width": 100
        }));
        element.scrollTo = jest.fn();
        element.scrollIntoView = jest.fn();
        document.body.appendChild(element);
    });

    it("should return correct scroll coordinates", () => {
        const scrollItems = Scroll.getScrollCoordinates(target as any);
        expect(scrollItems).toBeInstanceOf(Array);
        expect(scrollItems.length).toBeGreaterThan(0);
    });

    it("should animate smooth scrolling", async () => {
        const scrollItems = [
            { element: element, x: 100, y: 100 }
        ];
        await Scroll.animateScroll(scrollItems as any, 500);
        expect(element.scrollTo).toHaveBeenCalledWith(100, 100);
    });

    it("should smooth scroll an element", async () => {
        await Scroll.smoothScroll(element, { behavior: "smooth" });
        expect(element.scrollIntoView).toHaveBeenCalled();
    });
});
