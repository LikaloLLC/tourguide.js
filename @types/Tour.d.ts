import Tour from ".";
import { ActionHandlerType, TourAction } from "./ActionHandler";
import { CacheManager } from "./CacheManager";
import { ContentDecoratorType } from "./ContentDecorator";
import { AbstractStep, StepData } from "./Step";

export enum StepsSource {
    DOM,
    JSON,
    REMOTE
}

export enum TourNavigationDirection {
    FORWARD,
    BACKWARD
}

export enum TourStopState {
    COMPLETE,
    INCOMPLETE,
    SKIPPED
}

export enum CacheKeys {
    "LastInitilized" = "timestamp",
    "IsStarted" = "started",
    "CurrentProgress" = "progress"
}

export interface KeyboardNavigationOptions {
    next?: string | null;
    prev?: string | null;
    first?: string | null;
    last?: string | null;
    complete?: string | null;
    stop?: string | null;
}


export interface TourOptions {
    identifier: string;
    root: string;
    selector: string;
    steps: Array<StepData>;
    src: string;
    request: Record<string, any>;
    restoreinitialposition: boolean;
    preloadimages: boolean;
    resumeOnLoad: boolean;
    keyboardNavigation: KeyboardNavigationOptions;
    stepFactory: Array<{ new(data: any, context: Tour): AbstractStep }>;
    actionHandlers: Array<ActionHandlerType>;
    contentDecorators: Array<ContentDecoratorType>;
    cacheManagerFactory: { new(identifier: string): CacheManager };
    style: TourStyle;
    // AdditionalData
    additionalData?: any;
}

export interface TourStyle {
    fontFamily?: string;
    fontSize?: string;
    tooltipWidth?: string;
    stepCardRadius?: string;

    overlayColor?: string;
    textColor?: string;
    mutedTextColor?: string;
    accentColor?: string;

    borderColor?: string;
    focusColor?: string;
    bulletColor?: string;
    bulletVisitedColor?: string;
    bulletCurrentColor?: string;
    stepButtonCloseColor?: string;
    stepButtonPrevColor?: string;
    stepButtonNextColor?: string;
    stepButtonCompleteColor?: string;
    stepFooterColor?: string;
    stepCardPadding?: string;
    backgroundColor?: string;
}