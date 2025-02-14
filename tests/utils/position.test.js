import { Position } from "../../src/utils/position";

describe("Position", () => {
    describe("keepinview middleware", () => {
        it("should keep the tooltip within viewable area when padding is set", () => {
            const options = { padding: 10 };
            const middleware = Position.keepinview(options);
            const state = {
                x: 20,
                y: 20,
                rects: {
                    floating: { width: 50, height: 50 }
                }
            };
            const result = middleware.fn(state);
            expect(result.x).toBeGreaterThanOrEqual(10);
            expect(result.y).toBeGreaterThanOrEqual(10);
            expect(result.x).toBeLessThanOrEqual(70 - 50);
            expect(result.y).toBeLessThanOrEqual(70 - 50);
        });
    });

    describe("positionfixed middleware", () => {
        it("should position the tooltip fixedly based on placement and padding", () => {
            const options = { placement: "top-center", padding: 10 };
            const middleware = Position.positionfixed(options);
            const state = {
                x: 20,
                y: 20,
                rects: {
                    floating: { width: 50, height: 50 }
                },
                elements: {
                    floating: { style: {} }
                }
            };
            const result = middleware.fn(state);
            expect(state.elements.floating.style.position).toBe("fixed");
        });
    });

    describe("highlight middleware", () => {
        it("should highlight the element centered within viewable area", () => {
            const options = { element: document.createElement('div'), padding: 10, centered: true };
            const middleware = Position.highlight(options);
            const state = {
                rects: {
                    reference: { x: 20, y: 20, width: 50, height: 50 }
                }
            };
            const result = middleware.fn(state);
            expect(result.data.left).toBe("45vw");
            expect(result.data.top).toBe("45vh");
        });
    });
});
