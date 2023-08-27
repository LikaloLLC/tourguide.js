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
    function position(reference: ReferenceElement, tooltip: HTMLElement, middleware?: Array<Middleware | null | undefined | false>): Promise<import("@floating-ui/core").ComputePositionReturn>;
    const autoPlacement: (options?: {
        padding?: import("@floating-ui/utils").Padding | undefined;
        rootBoundary?: import("@floating-ui/core").RootBoundary | undefined;
        elementContext?: import("@floating-ui/core").ElementContext | undefined;
        altBoundary?: boolean | undefined;
        crossAxis?: boolean | undefined;
        alignment?: import("@floating-ui/utils").Alignment | null | undefined;
        autoAlignment?: boolean | undefined;
        allowedPlacements?: import("@floating-ui/utils").Placement[] | undefined;
        boundary?: import("@floating-ui/dom").Boundary | undefined;
    } | import("@floating-ui/dom").Derivable<{
        padding?: import("@floating-ui/utils").Padding | undefined;
        rootBoundary?: import("@floating-ui/core").RootBoundary | undefined;
        elementContext?: import("@floating-ui/core").ElementContext | undefined;
        altBoundary?: boolean | undefined;
        crossAxis?: boolean | undefined;
        alignment?: import("@floating-ui/utils").Alignment | null | undefined;
        autoAlignment?: boolean | undefined;
        allowedPlacements?: import("@floating-ui/utils").Placement[] | undefined;
        boundary?: import("@floating-ui/dom").Boundary | undefined;
    }> | undefined) => {
        name: string;
        options?: any;
        fn: (state: {
            platform: import("@floating-ui/core").Platform;
            x: number;
            y: number;
            initialPlacement: import("@floating-ui/utils").Placement;
            placement: import("@floating-ui/utils").Placement;
            strategy: import("@floating-ui/utils").Strategy;
            middlewareData: import("@floating-ui/core").MiddlewareData;
            rects: import("@floating-ui/utils").ElementRects;
            elements: import("@floating-ui/dom").Elements;
        }) => import("@floating-ui/core").MiddlewareReturn | Promise<import("@floating-ui/core").MiddlewareReturn>;
    };
    const arrow: (options: {
        element: HTMLElement;
        padding?: number;
    }) => Middleware;
}
