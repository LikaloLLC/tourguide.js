import { Middleware, MiddlewareArguments, ReferenceElement } from "@floating-ui/dom";
export declare namespace Position {
    interface KeepinviewProps {
        padding: number;
    }
    const keepinview: (options: KeepinviewProps) => Middleware;
    type AlignedPlacement = "top-start" | "top-center" | "top-end" | "middle-start" | "middle-center" | "middle-end" | "bottom-start" | "bottom-center" | "bottom-end";
    interface PositionfixedProps {
        placement: AlignedPlacement;
        padding: number;
    }
    const positionfixed: (options?: PositionfixedProps) => Middleware;
    interface HighlightProps {
        element: HTMLElement;
        padding?: number;
        centered?: boolean;
    }
    const highlight: (options: HighlightProps) => Middleware;
    function offsetAssist(props: MiddlewareArguments): 10 | 20 | 24;
    const offset: import("@floating-ui/core").Middleware;
    function position(reference: ReferenceElement, tooltip: HTMLElement, middleware?: Array<Middleware | null | undefined | false>): Promise<import("@floating-ui/dom").ComputePositionReturn>;
    const autoPlacement: (options?: Partial<import("@floating-ui/core").AutoPlacementOptions & Omit<import("@floating-ui/core").DetectOverflowOptions, "boundary"> & {
        boundary: import("@floating-ui/dom").Boundary;
    }> | undefined) => Middleware;
    const arrow: (options: {
        element: HTMLElement;
        padding?: import("@floating-ui/dom").Padding | undefined;
    }) => Middleware;
}
