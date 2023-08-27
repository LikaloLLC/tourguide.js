import { Step, StepData } from "./types/Step";
import { CacheManager } from "./cachemanager/CacheManager";
import { TourOptions, Tour as ITour, TourAction, Helpers } from "./types";
import PopoverStep from "./step/PopoverStep";
import ActionHandler from "./handler/ActionHandler";
import { ContentDecorator } from "./decorator/ContentDecorator";
export default class Tour implements ITour {
    static readonly ActionHandler: typeof ActionHandler;
    static readonly ContentDecorator: typeof ContentDecorator;
    static readonly MarkdownDecorator: ContentDecorator;
    static readonly PopoverStep: typeof PopoverStep;
    static readonly Helpers: Helpers;
    private _options;
    private _steps;
    private _current;
    private _active;
    private _ready;
    private _stepsSrc;
    private _initialposition;
    private _containerElement;
    private _shadowRoot;
    private _cacheManager;
    private _helpers;
    get cacheManager(): CacheManager;
    get currentstep(): Step<StepData>;
    get length(): number;
    get steps(): Step<StepData>[];
    get hasnext(): boolean;
    get nextstep(): number;
    get previousstep(): number;
    get options(): TourOptions;
    get helpers(): Helpers;
    constructor(options?: Partial<TourOptions>);
    private _initSteps;
    private _onTourReady;
    private _injectStyles;
    private _keyboardHandler;
    private _decorateText;
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