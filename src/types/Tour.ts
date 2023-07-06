import { ActionHandler, TourAction } from "./ActionHandler";
import { CacheManager } from "./CacheManager";
import { ContentDecorator } from "./ContentDecorator";
import { Helpers } from "./Helpers";
import { Step, StepData } from "./Step";

export enum StepsSource {
    DOM,
    JSON,
    REMOTE
}

export enum CacheKeys {
    "LastInitilized" = "timestamp",
    "IsStarted" = "started",
    "CurrentProgress" = "progress"
}

export interface KeyboardNavigationOptions {
    next?: string | number | null;
    prev?: string | number | null;
    first?: string | number | null;
    last?: string | number | null;
    complete?: string | number | null;
    stop?: string | number | null;
}


export interface TourOptions {
    identifier: string;
    root: string;
    selector: string;
    animationspeed: number;
    steps: Array<StepData>;
    src: string;
    request: Record<string, any>;
    restoreinitialposition: boolean;
    preloadimages: boolean;
    resumeOnLoad: boolean;
    keyboardNavigation: KeyboardNavigationOptions;
    stepFactory: Array<{ new(data: any, context: Tour): Step }>;
    actionHandlers: Array<ActionHandler>;
    contentDecorators: Array<ContentDecorator>;
    cacheManagerFactory: { new(identifier: string): CacheManager };
    style: TourStyle;
    onStart: (context: Tour) => void;
    onStop: (context: Tour) => void;
    onComplete: (context: Tour) => void;
    onStep: (step: Step, context: Tour) => void;
    onAction: (event: Event, action: TourAction, context: Tour) => void;
}

export interface Tour {
    options: TourOptions;
    steps: Array<Step>;
    cacheManager: CacheManager;
    currentstep: Step;
    length: number;
    hasnext: boolean;
    nextstep: number;
    previousstep: number;
    helpers: Helpers;
    action(event: Event, action: any): void;
    go(step: number): void;
    next(e?: Event): void;
    previous(e?: Event): void;
    stop(): void;
    complete(): void;
}


export interface TourStyle {
    fontFamily?: string;
    fontSize?: string;
    tooltipWidth?: string;

    overlayColor?: string;
    textColor?: string;
    accentColor?: string;

    focusColor?: string;
    bulletColor?: string;
    bulletVisitedColor?: string;
    bulletCurrentColor?: string;
    stepButtonCloseColor?: string;
    stepButtonPrevColor?: string;
    stepButtonNextColor?: string;
    stepButtonCompleteColor?: string;
    stepCardPadding?: string;
    backgroundColor?: string;
}