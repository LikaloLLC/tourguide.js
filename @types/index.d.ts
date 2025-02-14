import ActionHandler, { TourAction } from "./ActionHandler";
import { AbstractCacheManager, CacheManager } from "./CacheManager";
import { ContentDecorator } from "./ContentDecorator";
import { Helpers } from "./Helpers";
import { AbstractStep, StepData } from "./Step";
import { KeyboardNavigationOptions, TourStyle, TourOptions } from "./Tour";

export default class Tour {
    static readonly DefaultKeyNavOptions: KeyboardNavigationOptions;
    static readonly DefaultTourStyles: TourStyle;
    static readonly DefaultTourOptions: TourOptions;
    static readonly ActionHandler: typeof ActionHandler;
    static readonly ContentDecorator: typeof ContentDecorator;
    static readonly Abstracts: {
        AbstractCacheManager: typeof AbstractCacheManager,
        Step: typeof AbstractStep
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
    remove(): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
}

export * from "./ActionHandler";
export * from "./CacheManager";
export * from "./ContentDecorator";
export * from "./Helpers";
export * from "./Step";
export * from "./Tour";