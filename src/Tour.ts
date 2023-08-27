import u, { U } from "umbrellajs";

import { Step, StepData } from "./types/Step";
import { CacheManager } from "./cachemanager/CacheManager";
import MemoryCacheManager from "./cachemanager/InMemoryCacheManager";
import {
  CacheKeys,
  KeyboardNavigationOptions,
  StepsSource, TourOptions,
  TourStyle,
  Tour as ITour,
  TourAction,
  Helpers
} from "./types";
import { assert, clamp, getMaxZIndex, Style, Scroll, Color } from "./utils";
import * as Utils from "./utils";

import PopoverStep from "./step/PopoverStep";
import ActionHandler from "./handler/ActionHandler";
import { ContentDecorator } from "./decorator/ContentDecorator";
import { MarkdownDecorator } from "./decorator/MarkdownDecorator";
import CardStep from "./step/CardStep";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import BaseStyle from "./Tour.scss";
import { getDataContents } from "./utils/dom";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => { };

const defaultKeyNavOptions: KeyboardNavigationOptions = {
  next: "ArrowRight",
  prev: "ArrowLeft",
  first: "Home",
  last: "End",
  complete: null,
  stop: "Escape",
};

const defaultStyle: TourStyle = {
  fontFamily: "sans-serif",
  fontSize: "14px",

  overlayColor: "rgba(0, 0, 0, 0.5)",
  textColor: "#333",
  accentColor: "#0d6efd",
  backgroundColor: "#fff",
  focusColor: "auto",

  tooltipWidth: "40vw",
  bulletColor: "auto",
  bulletVisitedColor: "auto",
  bulletCurrentColor: "auto",
  stepButtonCloseColor: "auto",
  stepButtonPrevColor: "auto",
  stepButtonNextColor: "auto",
  stepButtonCompleteColor: "auto",
  stepCardPadding: "5px",
};

const defaultOptions: TourOptions = {
  identifier: "default",
  root: "body",
  selector: "[data-tour]",
  animationspeed: 120,
  restoreinitialposition: true,
  preloadimages: true,
  resumeOnLoad: true,
  request: {
    options: {
      mode: "cors",
      cache: "no-cache",
    },
    headers: {
      "Content-Type": "application/json",
    },
  },
  keyboardNavigation: defaultKeyNavOptions,
  stepFactory: [PopoverStep, CardStep],
  actionHandlers: [],
  contentDecorators: [MarkdownDecorator],
  cacheManagerFactory: MemoryCacheManager,
  onStart: NOOP,
  onStop: NOOP,
  onComplete: NOOP,
  onStep: NOOP,
  onAction: NOOP,
  steps: [],
  src: "",
  style: defaultStyle
};

function isEventAttrbutesMatched(event: KeyboardEvent, code: number | string): boolean {
  return event.code === code;
}

export default class Tour implements ITour {
  static readonly ActionHandler = ActionHandler;
  static readonly ContentDecorator = ContentDecorator;
  static readonly MarkdownDecorator = MarkdownDecorator;
  static readonly PopoverStep = PopoverStep;
  static readonly Helpers: Helpers = {
    u,
    ...Utils
  } as never as Helpers;
  private _options: TourOptions;
  private _steps: Array<Step> = [];
  private _current = 0;
  private _active = false;
  private _ready = false;
  private _stepsSrc: StepsSource = StepsSource.DOM;
  private _initialposition: Array<Scroll.ScrollCoordinates> | null = null;
  private _containerElement!: U;
  private _shadowRoot!: ShadowRoot;
  private _cacheManager!: CacheManager;
  private _helpers!: Helpers;
  get cacheManager() {
    return this._cacheManager ||
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (this._cacheManager = new this.options.cacheManagerFactory!(this.options.identifier as string));
  }
  get currentstep() {
    return this._steps[this._current];
  }
  get length() {
    return this._steps.length;
  }
  get steps() {
    return this._steps.filter(step => !step.data.hidden);
  }
  get hasnext() {
    return this.nextstep !== this._current;
  }
  get nextstep() {
    return clamp(this._current + 1, 0, this.length - 1);
  }
  get previousstep() {
    return clamp(this._current - 1, 0);
  }
  get options() {
    return this._options;
  }
  get helpers() {
    return this._helpers || (this._helpers = {
      ...Tour.Helpers,
      decorate: this._decorateText.bind(this)
    });
  }
  constructor(options: Partial<TourOptions> = {}) {
    this._options = Object.assign(
      {},
      defaultOptions,
      options,
      {
        style: Color.setAutoColors(
          defaultStyle,
          options.style || {}
        )
      }
    );
    u(this._options.root).append(this._containerElement = u(document.createElement("div")).addClass("__guided-tour-container"));
    this._shadowRoot = (this._containerElement.first() as HTMLElement).attachShadow({ mode: "closed" });
    this._injectStyles();
    this.start = this.start.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.go = this.go.bind(this);
    this.stop = this.stop.bind(this);
    this.complete = this.complete.bind(this);
    // this.action = this.action.bind(this);
    this._keyboardHandler = this._keyboardHandler.bind(this);
    this.cacheManager.set(CacheKeys.LastInitilized, new Date());
    switch (true) {
      case (typeof this._options.src === "string" && Boolean(this._options.src)): {
        this._stepsSrc = StepsSource.REMOTE;
        fetch(new Request(this._options.src as string, this._options.request)).then(
          (response) =>
            response.json().then((data) => {
              this._initSteps(data);
              this._ready = true;
              this._onTourReady();
            }).catch(e => console.error(e))
        ).catch(() => {
          assert(false, "Failed to fetch step data. Check documentation.");
        });
      } break;
      case (Array.isArray(this._options.steps) && this._options.steps.length > 0): {
        this._stepsSrc = StepsSource.JSON;
        this._initSteps(this._options.steps);
        this._ready = true;
        this._onTourReady();
      } break;
      default: {
        this._stepsSrc = StepsSource.DOM;
        this._ready = true;
        this._onTourReady();
      }
    }
  }
  private _initSteps(steps: Array<StepData>) {
    this._steps = steps.map((data) => {
      const stepType = data.type || "default";
      const StepFactory = this._options.stepFactory?.find((f: any) => f.Type === stepType) as any;
      assert(StepFactory, `No factory for step of type "${stepType}". Check your setup.`);
      return new StepFactory({ ...data }, this);
    }).sort((a, b) => (a.data.index as number) - (b.data.index as number));
    this._steps.forEach((step, index) => {
      step.index = index;
    });
    this._steps[0].first = true;
    this._steps[this.length - 1].last = true;
  }
  private _onTourReady() {
    if (
      this._ready
      && this.cacheManager.get(CacheKeys.IsStarted)
      && this.options.resumeOnLoad
    ) {
      this._current = parseInt(
        this.cacheManager.get(CacheKeys.CurrentProgress)
      );
      if (isNaN(this._current)) this._current = 0;
      this.start(this._current);
    }
  }
  private _injectStyles() {
    const style = u(
      `<style>${BaseStyle}</style>${this.options.stepFactory.map((step: any) => step.Style).filter(Boolean).map((style: string) => `<style>${style}</style`).join("")}`
    );
    u(this._shadowRoot as ShadowRoot).append(style);
    const colors = u(
      `<style>${Style.colorObjToStyleVarString(
        this._options.style || {},
        "--tourguide"
      )}</style>`
    );
    u(this._shadowRoot as ShadowRoot).append(colors);
  }
  private _keyboardHandler(event: KeyboardEvent) {
    if (
      this._options.keyboardNavigation?.next &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.next)
    ) {
      this.next();
    } else if (
      this._options.keyboardNavigation?.prev &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.prev)
    ) {
      this.previous();
    } else if (
      this._options.keyboardNavigation?.first &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.first)
    ) {
      this.go(0);
    } else if (
      this._options.keyboardNavigation?.last &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.last)
    ) {
      this.go(this._steps.length - 1);
    } else if (
      this._options.keyboardNavigation?.stop &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.stop)
    ) {
      this.stop();
    } else if (
      this._options.keyboardNavigation?.complete &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.complete)
    ) {
      this.complete();
    }
    return true;
  }
  private _decorateText(text: string, step: Step): string {
    let _text = text;
    this._options.contentDecorators?.forEach(decorator => {
      if (decorator.test(_text)) _text = decorator.render(_text, step, this);
    });
    return _text;
  }
  reset() {
    if (this._active) this.stop();
    // if (this._stepsSrc === StepsSource.DOM) {
    //   this._steps = [];
    // }
    this._current = 0;
    this.cacheManager.set(CacheKeys.IsStarted, true);
  }
  start(step = 0) {
    if (this._ready) {
      if (this._stepsSrc === StepsSource.DOM) {
        this._initSteps(
          u(this._options.selector)
            .nodes.map(step => {
              const data = getDataContents<StepData>(u(step).data("tour"));
              data.selector = step as any;
              return data;
            })
        );
        assert(this._steps.length > 0, "Found no tour steps on page. Please verify your setup.");
      }
      Style.setStyle(this._containerElement, { "z-index": (getMaxZIndex() + 1) });
      if (this._options.restoreinitialposition) {
        this._initialposition = Scroll.getScrollCoordinates(this._options.root);
      }
      if (!this._active) {
        this.cacheManager.set(CacheKeys.IsStarted, true);
        u(this._options.root).addClass("__guided-tour-active");
        this.reset();
        this._steps.forEach((step) => step.attach(this._shadowRoot as ShadowRoot));
        this._current = step;
        this.currentstep.show();
        this._active = true;
        this._options.onStart?.(this);

        if (this._options.keyboardNavigation) {
          assert(
            Object.prototype.toString.call(this._options.keyboardNavigation) === "[object Object]",
            "keyboardNavigation option invalid. should be predefined object or false. Check documentation."
          );
          u(":root").on<KeyboardEvent>("keyup", this._keyboardHandler);
        }
      } else {
        this.go(step);
      }
    } else {
      setTimeout(() => {
        this.start(step);
      }, 50);
    }
  }
  action(event: Event, action: TourAction) {
    if (this._active) {
      switch (action.action) {
        case "next": this.next(); break;
        case "previous": this.previous(); break;
        case "stop": this.stop(); break;
        case "complete": this.complete(); break;
        default: {
          const handler = this._options.actionHandlers?.find(handler => handler.name === action.action);
          if (handler) handler.onAction(event, action, this);
        }
      }
      if (
        typeof this._options.onAction === "function"
      ) {
        this._options.onAction(event, action, this);
      }
    }
  }
  next(e?: Event) {
    e && e.preventDefault && e.preventDefault();
    e && e.stopPropagation && e.stopPropagation();
    if (this._active) {
      this.go(this.nextstep);
    }
  }
  previous(e?: Event) {
    e && e.preventDefault && e.preventDefault();
    e && e.stopPropagation && e.stopPropagation();
    if (this._active) {
      this.go(this.previousstep);
    }
  }
  go(step: number) {
    if (this._active && this._current !== step) {
      this.currentstep.hide();
      this._current = clamp(step, 0, this.length - 1);
      this.currentstep.show();
      this._options.onStep?.(this.currentstep, this);
      this.cacheManager.set(CacheKeys.CurrentProgress, this._current);
    }
  }
  stop() {
    if (this._active) {
      this.currentstep.hide();
      Style.setStyle(this._containerElement, { "z-index": 0 });
      this._active = false;
      this._steps.forEach((step) => step.remove());
      u(this._options.root).removeClass("__guided-tour-active");
      if (this._options.keyboardNavigation) {
        u(":root").off<KeyboardEvent>("keyup", this._keyboardHandler);
      }
      if (this._options.restoreinitialposition && this._initialposition) {
        Scroll.animateScroll(this._initialposition, this._options.animationspeed);
      }
      this._options.onStop?.(this);
      this.cacheManager.set(CacheKeys.IsStarted, false);
      this.cacheManager.clear(CacheKeys.CurrentProgress);
    }
  }
  complete() {
    if (this._active) {
      this.stop();
      this._options.onComplete?.(this);
    }
  }
  deinit() {
    if (this._ready) {
      this._containerElement?.remove();
      // delete this._containerElement;
      this._active = false;
      this._ready = false;
    }
  }
}