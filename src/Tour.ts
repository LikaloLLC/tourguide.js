import u, { U } from "umbrellajs";

import MemoryCacheManager from "./cachemanager/InMemoryCacheManager";
import Guidedtour, {
  CacheKeys,
  KeyboardNavigationOptions,
  TourOptions,
  TourStyle,
  TourAction,
  Helpers,
  CacheManager,
  Direction,
  TourStopState,
  AbstractStep,
  StepData,
  StepsSource,
} from "../@types";
import { assert, clamp, getMaxZIndex, Style, Scroll, Color } from "./utils";
import * as Utils from "./utils";
import * as Abstracts from "./abstracts";

import PopoverStep from "./step/PopoverStep";
import ActionHandler from "./handler/ActionHandler";
import { ContentDecorator } from "./decorator/ContentDecorator";
import { MarkdownDecorator } from "./decorator/MarkdownDecorator";
import CardStep from "./step/CardStep";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import BaseStyle from "./Tour.scss";
import { getDataContents } from "./utils/dom";

export const defaultKeyNavOptions: KeyboardNavigationOptions = {
  next: "ArrowRight",
  prev: "ArrowLeft",
  first: "Home",
  last: "End",
  complete: null,
  stop: "Escape",
};

export const defaultStyle: TourStyle = {
  fontFamily: "sans-serif",
  fontSize: "14px",

  overlayColor: "rgb(0 100 255 / 25%)",
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

/**
 * Default options for a guided tour in the application.
 */
export const defaultOptions: TourOptions = {
  /**
   * A unique identifier for the tour instance, used to manage multiple tours.
   */
  identifier: "default",

  /**
   * The root element of the page on which the tour will be displayed.
   */
  root: "body",

  /**
   * A CSS selector for elements with the `data-tour` attribute, used to select the steps of the tour.
   */
  selector: "[data-tour]",

  /**
   * Whether to restore the position and visibility state of the tour on page load.
   * Defaults to `true`.
   */
  restoreinitialposition: true,

  /**
   * Whether to preload images for the tour steps before displaying them.
   * Defaults to `true`.
   */
  preloadimages: true,

  /**
   * Whether to resume the tour if it was in progress when the page was last loaded.
   * Defaults to `true`.
   */
  resumeOnLoad: true,

  /**
   * Configuration for making requests to fetch tour data from a server.
   */
  request: {
    options: {
      mode: "cors",
      cache: "no-cache",
    },
    headers: {
      "Content-Type": "application/json",
    },
  },

  /**
   * Keyboard navigation configuration for the tour.
   */
  keyboardNavigation: defaultKeyNavOptions,

  /**
   * A list of factories for creating new tour steps.
   */
  stepFactory: [PopoverStep, CardStep],

  /**
   * List of action handlers to be applied to the tour steps.
   */
  actionHandlers: [],

  /**
   * List of content decorators to be applied to the tour steps' content.
   */
  contentDecorators: [MarkdownDecorator],

  /**
   * The cache manager used for managing the state and data of the tour.
   */
  cacheManagerFactory: MemoryCacheManager,

  /**
   * A list of steps that make up the tour.
   */
  steps: [],

  /**
   * The source of the tour data (e.g., a URL or a local file path).
   */
  src: "",

  /**
   * Customizable styling options for the tour.
   */
  style: defaultStyle,
};

function isEventAttrbutesMatched(event: KeyboardEvent, code: number | string): boolean {
  return event.code === code;
}

/**
 * A class that manages guided tours in a web application. It provides an interface for creating, managing, and displaying interactive guided tours on a webpage. The tour can be customized with various options such as keyboard navigation settings, step types, action handlers, content decorators, and styling. It also supports data fetching from external sources to dynamically load tour steps.
 *
 * ### Possible Uses:
 * - **Guided Tours**: Enhance user experience by guiding users through the main features of an application or website with a series of informative and interactive steps.
 * - **Educational Tools**: Use guided tours as educational aids for new users, explaining complex functionalities in a step-by-step manner.
 * - **Help and Support**: Provide quick access to essential information and tutorials right within the product through guided tours that highlight key features or provide help messages.
 *
 * ### Key Features:
 * - **Step Management**: Easily add, remove, or modify steps in the tour using a variety of step types (e.g., popover, card).
 * - **Keyboard Navigation**: Support for navigating through steps using keyboard shortcuts, customizable by the user.
 * - **Dynamic Data Loading**: Fetch tour data from external sources to dynamically update tour content without hardcoding it.
 * - **Custom Styling**: Highly configurable styling options allow you to match the tour's appearance with your application's design language.
 * - **State Management**: Persistent state management ensures that users can resume tours where they left off even after navigating away and returning to the page.
 *
 * ### Usage Example:
 * ```typescript
 * const tour = new GuidedTour({
 *   identifier: "exampleTour",
 *   root: "#app",
 *   selector: "[data-tour-step]",
 *   steps: [
 *     { content: "Welcome to the app!", target: ".welcome" },
 *     { content: "Here's how you can use this feature.", target: ".feature-section" }
 *   ]
 * });
 *
 * tour.start();
 * ```
 */
class Tour implements Guidedtour {
  static readonly DefaultKeyNavOptions = defaultKeyNavOptions;
  static readonly DefaultTourStyles = defaultStyle;
  static readonly DefaultTourOptions = defaultOptions;
  static readonly ActionHandler = ActionHandler;
  static readonly ContentDecorator = ContentDecorator;
  static readonly Abstracts = Abstracts;
  static readonly Helpers: Helpers = {
    u,
    ...Utils
  } as never as Helpers;
  private _options: TourOptions;
  private _steps: Array<AbstractStep> = [];
  private _current = 0;
  private _active = false;
  private _ready = false;
  private _complete = false;
  private _stepsSrc: StepsSource = StepsSource.DOM;
  private _initialposition: Array<Scroll.ScrollCoordinates> | null = null;
  private _containerElement!: U;
  private _shadowRoot!: ShadowRoot;
  private _cacheManager!: CacheManager;
  private _helpers!: Helpers;
  /**
   * Get the cache manager instance. If it doesn't exist, create a new one using the factory provided in options.
   */
  get cacheManager(): CacheManager {
    return this._cacheManager ||
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (this._cacheManager = new this.options.cacheManagerFactory!(this.options.identifier as string));
  }

  /**
   * Get the current step in the tour.
   */
  get currentstep(): AbstractStep {
    return this._steps[this._current];
  }

  /**
   * Get the total number of steps in the tour.
   */
  get length(): number {
    return this._steps.length;
  }

  /**
   * Get all visible steps in the tour, excluding hidden ones.
   */
  get steps(): Array<AbstractStep> {
    return this._steps.filter(step => !step.data.hidden);
  }

  /**
   * Check if there is a next step available.
   */
  get hasnext(): boolean {
    return this.nextstep !== this._current;
  }

  /**
   * Get the index of the next step. If no next step exists, returns the current step index.
   */
  get nextstep(): number {
    return clamp(this._current + 1, 0, this.length - 1);
  }

  /**
   * Get the index of the previous step. If no previous step exists, returns the current step index.
   */
  get previousstep(): number {
    return clamp(this._current - 1, 0);
  }

  /**
   * Get the tour options object.
   */
  get options(): TourOptions {
    return this._options;
  }

  /**
   * Get the helpers object which includes utility functions for the tour.
   */
  get helpers(): Helpers {
    return this._helpers || (this._helpers = {
      ...Tour.Helpers,
      decorate: this._decorateText.bind(this)
    });
  }
  /**
   * Creates an instance of GuidedTour.
   * @param options - The configuration options for the guided tour.
   */
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
  /**
   * Initializes the steps for the tour.
   * @param steps - The array of step data.
   */
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
  /**
   * Triggers the tour ready event.
   */
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
      this._triggerCustomEvent("resume");
      this.start(this._current);
    }
  }
  /**
   * Injects the base and custom styles for the tour.
   */
  private _injectStyles() {
    const style = u(
      `<style>${BaseStyle}</style>${this.options.stepFactory.map((step: any) => step.Style).filter(Boolean).map((style: string) => `<style>${style}</style>`).join("")}`
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
  /**
   * Handles keyboard events for navigation and actions within the tour.
   * @param event - The KeyboardEvent to handle.
   */
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
  /**
   * Decorates the text content of a step with custom decorators if defined.
   * @param text - The raw text to be decorated.
   * @param step - The current step being processed.
   */
  private _decorateText(text: string, step: AbstractStep): string {
    let _text = text;
    this._options.contentDecorators?.forEach(decorator => {
      if (decorator.test(_text)) _text = decorator.render(_text, step, this);
    });
    return _text;
  }
  /**
   * Triggers a custom event on the tour container element.
   * @param type - The type of the custom event.
   * @param detail - Additional data to be included in the event.
   */
  private _triggerCustomEvent(type: string, detail: any = this) {
    const customEvent = new CustomEvent(type, {
      bubbles: false,
      cancelable: false,
      composed: false,
      detail
    });
    (this._containerElement.first() as HTMLElement).dispatchEvent(customEvent);
  }
  /**
   * Resets the tour state to its initial position.
   */
  reset() {
    if (this._active) this.stop();
    // if (this._stepsSrc === StepsSource.DOM) {
    //   this._steps = [];
    // }
    this._complete = false;
    this._current = 0;
    this.cacheManager.set(CacheKeys.IsStarted, true);
  }
  /**
   * Starts the tour from a specific step.
   * @param step - The index of the step to start from.
   */
  start(step = 0) {
    if (this._ready) {
      this._complete = false;
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
        this._triggerCustomEvent("start");
        this.cacheManager.set(CacheKeys.IsStarted, true);
        u(this._options.root).addClass("__guided-tour-active");
        this.reset();
        this._steps.forEach((step) => step.attach(this._shadowRoot as ShadowRoot));
        this._current = NaN;
        this._active = true;
        this.go(step);

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
  /**
   * Triggers a custom action based on the provided tour action.
   * @param event - The triggering event.
   * @param action - The action to be performed.
   */
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
      this._triggerCustomEvent("action", { action, context: this, trigger: event });
    }
  }
  /**
   * Moves to the next step in the tour.
   * @param e - The optional event that triggered the method call.
   */
  next(e?: Event) {
    e && e.preventDefault && e.preventDefault();
    e && e.stopPropagation && e.stopPropagation();
    if (this._active) {
      this.go(this.nextstep);
    }
  }
  /**
   * Moves to the previous step in the tour.
   * @param e - The optional event that triggered the method call.
   */
  previous(e?: Event) {
    e && e.preventDefault && e.preventDefault();
    e && e.stopPropagation && e.stopPropagation();
    if (this._active) {
      this.go(this.previousstep);
    }
  }
  /**
   * Moves to a specific step in the tour.
   * @param step - The index of the step to navigate to.
   */
  go(step: number) {
    if (this._active && this._current !== step) {
      const direction = this._current < step ? Direction.FORWARD : Direction.BACKWARD;
      this.currentstep?.hide();
      this._current = clamp(step, 0, this.length - 1);
      if (this.currentstep.data?.selector) {
        Scroll.smoothScroll(u(this.currentstep.data.selector).first() as HTMLElement, { block: "center" }).then(
          () => {
            this.currentstep.show(direction);
          });
      } else
        this.currentstep.show(direction);
      this.cacheManager.set(CacheKeys.CurrentProgress, this._current);
      this._triggerCustomEvent("step");
    }
  }
  /**
   * Stops and resets the tour.
   */
  stop() {
    if (this._active) {
      this.currentstep.hide();
      Style.setStyle(this._containerElement, { "z-index": 0 });
      this._active = false;
      this._steps.forEach((step) => step.remove(this._complete ? TourStopState.COMPLETE : TourStopState.INCOMPLETE));
      u(this._options.root).removeClass("__guided-tour-active");
      if (this._options.keyboardNavigation) {
        u(":root").off<KeyboardEvent>("keyup", this._keyboardHandler);
      }
      if (this._options.restoreinitialposition && this._initialposition) {
        Scroll.animateScroll(this._initialposition, 120);
      }
      this.cacheManager.set(CacheKeys.IsStarted, false);
      this.cacheManager.clear(CacheKeys.CurrentProgress);
      this._triggerCustomEvent("stop");
    }
  }
  /**
   * Completes the tour and marks it as finished.
   */
  complete() {
    if (this._active) {
      this._complete = true;
      this.stop();
      this._triggerCustomEvent("complete");
    }
  }
  /**
   * Removes the tour from the DOM and resets its state.
   */
  remove() {
    if (this._ready) {
      this._containerElement?.remove();
      // delete this._containerElement;
      this._active = false;
      this._ready = false;
    }
  }
  /**
   * Adds an event listener to the tour container element.
   * @param type - The type of the event to listen for.
   * @param listener - The function that handles the event.
   */
  addEventListener(type: string, listener: (event: Event) => void): void {
    this._containerElement.on(type, listener);
  }
  /**
   * Removes an event listener from the tour container element.
   * @param type - The type of the event to remove the listener for.
   * @param listener - The function that handles the event.
   */
  removeEventListener(type: string, listener: (event: Event) => void): void {
    this._containerElement.off(type, listener);
  }
}

export default  Tour;