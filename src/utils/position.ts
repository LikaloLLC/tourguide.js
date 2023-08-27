import {
    offset as __offset,
    autoPlacement as __autoPlacement,
    computePosition,
    Middleware,
    MiddlewareArguments,
    ReferenceElement,
} from "@floating-ui/dom";
import { clamp } from "./clamp";
import { Style } from "./style";

function getWindowComputedView() {
    const top = window.scrollY;
    const left = window.scrollX;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const bottom = top + height;
    const right = left + width;
    return {
        x: left,
        y: top,
        left,
        top,
        bottom,
        right,
        width,
        height
    };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Position {

    export interface KeepinviewProps {
        padding: number;
    }

    export const keepinview: (options: KeepinviewProps) => Middleware = ({ padding = 0 }) => ({
        name: "keepinview",
        fn({ x, y, rects, middlewareData }) {
            const viewDimentions = getWindowComputedView();
            const _x = clamp(x, viewDimentions.left + padding, viewDimentions.right - rects.floating.width - padding);
            const _y = clamp(y, viewDimentions.top + padding, viewDimentions.bottom - rects.floating.height - padding);
            const dx = x - _x;
            const dy = y - _y;
            const { arrow } = middlewareData;
            if (arrow) {
                if (arrow.x && dx) arrow.x += dx;
                if (arrow.y && dy) arrow.y += dy;
            }
            return { x: _x, y: _y };
        }
    });

    export type AlignedPlacement = "top-start" | "top-center" | "top-end" | "middle-start" | "middle-center" | "middle-end" | "bottom-start" | "bottom-center" | "bottom-end";

    export interface PositionfixedProps {
        placement: AlignedPlacement;
        padding: number;
    }

    export const positionfixed: (options?: PositionfixedProps) => Middleware = (options) => ({
        name: "positionInView",
        options,
        fn({ x, y, rects, elements }) {
            let _x = x, _y = y;
            const { placement = "middle-center", padding = 0 } = options || {};
            const { width, height } = getWindowComputedView();
            const [align_y, align_x] = placement.split("-");
            switch (align_x) {
                case "start": _x = padding; break;
                case "center": _x = (width / 2) - (rects.floating.width / 2); break;
                case "end": _x = width - rects.floating.width - padding; break;
            }
            switch (align_y) {
                case "top": _y = padding; break;
                case "middle": _y = (height / 2) - (rects.floating.height / 2); break;
                case "bottom": _y = height - rects.floating.height - padding; break;
            }
            elements.floating.style.position = "fixed";
            return ({ x: _x, y: _y });
        }
    });

    export const positionabsolute: () => Middleware = () => ({
        name: "positionabsolute",
        fn({ elements }) {
            elements.floating.style.position = "absolute";
            return ({ data: {} });
        }
    });

    export interface HighlightProps {
        element: HTMLElement;
        padding?: number;
        centered?: boolean;
    }

    export const highlight: (options: HighlightProps) => Middleware = (options) => ({
        name: "highlight",
        options,
        fn(state) {
            const { element, padding = 0, centered = false } = options || {};
            const { rects } = state;
            const data = {
                top: "0",
                left: "0",
                width: "0",
                height: "0"
            };
            if (centered) {
                data.top = "50vh";
                data.left = "50vw";
                data.width = "0";
                data.height = "0";
            } else {
                data.top = `${rects.reference.y - padding}px`;
                data.left = `${rects.reference.x - padding}px`;
                data.width = `${rects.reference.width + padding * 2}px`;
                data.height = `${rects.reference.height + padding * 2}px`;
            }
            Style.setStyle(element, data);
            return ({
                data
            });
        }
    });

    export function offsetAssist(props: MiddlewareArguments) {
        const side = props.placement.split("-")[0];
        switch (side) {
            case "top":
                return 24;
            case "left":
            case "right":
                return 20;
            case "bottom":
            default: return 10;
        }
    }

    export const offset = __offset(offsetAssist);

    export function position(reference: ReferenceElement, tooltip: HTMLElement, middleware: Array<Middleware | null | undefined | false> = []) {
        return computePosition(reference, tooltip, {
            middleware
        }).then((data) => {
            Style.setStyle(tooltip, {
                left: `${data.x}px`,
                top: `${data.y}px`,
            });
            return data;
        });
    }

    export const autoPlacement = __autoPlacement;

    // export const arrow = __arrow;
    export const arrow: (options: {
        element: HTMLElement;
        padding?: number;
    }) => Middleware = (options) => ({
        name: "arrow",
        options,
        fn(state) {
            const { element, padding = 0 } = options || {};
            const { rects, placement } = state;
            const data = {
                top: "0",
                left: "0",
            };
            switch (placement) {
                case "left-start":
                    data.top = padding + "px";
                    data.left = rects.floating.width + "px";
                    break;
                case "left-end":
                    data.top = (rects.floating.height - padding) + "px";
                    data.left = rects.floating.width + "px";
                    break;
                case "right-start":
                    data.top = padding + "px";
                    break;
                case "right-end":
                    data.top = (rects.floating.height - padding) + "px";
                    break;
                case "top-start":
                    data.top = rects.floating.height + "px";
                    data.left = padding + "px";
                    break;
                case "top-end":
                    data.top = rects.floating.height + "px";
                    data.left = (rects.floating.width - padding) + "px";
                    break;
                case "bottom-start":
                    data.left = padding + "px";
                    break;
                case "bottom-end":
                    data.left = (rects.floating.width - padding) + "px";
                    break;
            }
            Style.setStyle(element, data);
            return {
                data
            };
        }
    })

}