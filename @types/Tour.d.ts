import { ActionHandler, TourAction } from "./ActionHandler";
import { AbstractCacheManager, CacheManager } from "./CacheManager";
import { ContentDecorator } from "./ContentDecorator";
import { Helpers } from "./Helpers";
import { AbstractStep, StepData } from "./Step";

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
    animationspeed: number;
    steps: Array<StepData>;
    src: string;
    request: Record<string, any>;
    restoreinitialposition: boolean;
    preloadimages: boolean;
    resumeOnLoad: boolean;
    keyboardNavigation: KeyboardNavigationOptions;
    stepFactory: Array<{ new(data: any, context: Tour): AbstractStep }>;
    actionHandlers: Array<ActionHandler>;
    contentDecorators: Array<ContentDecorator>;
    cacheManagerFactory: { new(identifier: string): CacheManager };
    style: TourStyle;
    onStart: (context: Tour) => void;
    onStop: (context: Tour) => void;
    onComplete: (context: Tour) => void;
    onStep: (step: AbstractStep, context: Tour) => void;
    onAction: (event: Event, action: TourAction, context: Tour) => void;
}

export class Tour {
    static readonly DefaultKeyNavOptions: KeyboardNavigationOptions;
    static readonly DefaultTourStyles: TourStyle;
    static readonly DefaultTourOptions: TourOptions;
    static readonly ActionHandler: ActionHandler;
    static readonly ContentDecorator: ContentDecorator;
    static readonly Abstracts: {
        AbstractCacheManager: AbstractCacheManager,
        Step: AbstractStep
    };
    static readonly Helpers: Helpers;
    get cacheManager(): CacheManager;
    get currentstep(): AbstractStep<StepData>;
    get length(): number;
    get steps(): AbstractStep<StepData>[];
    get hasnext(): boolean;
    get nextstep(): number;
    get previousstep(): number;
    get options(): TourOptions;
    get helpers(): Helpers;
    constructor(options?: Partial<TourOptions>);
    reset(): void;
    start(step?: number): void;
    action(event: Event, action: TourAction): void;
    next(e?: Event): void;
    previous(e?: Event): void;
    go(step: number): void;
    stop(): void;
    complete(): void;
    deinit(): void;
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