import u from "umbrellajs";
import Icons from "./icons";
import {
  animateScroll,
  clamp,
  assert,
  colorObjToStyleVarString,
  getScrollCoordinates,
  getMaxZIndex,
} from "./utils";
import {
  setAutoColors
} from "./utils/color";
import {
  positionTooltip
} from "./utils/position";
import ActionHandler from "./handler";
import ContentDecorator from "./decorator";
import DefaultStep from "./step/PopoverStep";
import VideoPlayerStep from "./step/VideoPlayer";
import NavigationStep from "./step/NavigationStep";
import ActionStep from "./step/ActionStep";
import CacheManager from "./cachemanager/SessionCacheManager";
import snarkdown from "snarkdown";

import Style from "../scss/style.scss";

const NOOP = () => { };

const StepsSource = {
  DOM: 0,
  JSON: 1,
  REMOTE: 2,
};

const CacheKeys = {
  "LastInitilized": "timestamp",
  "IsStarted": "started",
  "CurrentProgress": "progress"
};

const defaultKeyNavOptions = {
  next: "ArrowRight",
  prev: "ArrowLeft",
  first: "Home",
  last: "End",
  complete: null,
  stop: "Escape",
};

const defaultStyle = {
  fontFamily: "sans-serif",
  fontSize: "14px",
  tooltipWidth: "40vw",

  overlayColor: "rgba(0, 0, 0, 0.5)",
  textColor: "#333",
  accentColor: "#0d6efd",

  focusColor: "auto",
  bulletColor: "auto",
  bulletVisitedColor: "auto",
  bulletCurrentColor: "auto",
  stepButtonCloseColor: "auto",
  stepButtonPrevColor: "auto",
  stepButtonNextColor: "auto",
  stepButtonCompleteColor: "auto",
  backgroundColor: "#fff",
};

const defaultOptions = {
  identifier: "default",
  root: "body",
  selector: "[data-tour]",
  animationspeed: 120,
  padding: 5,
  steps: null,
  src: null,
  restoreinitialposition: true,
  preloadimages: false,
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
  stepFactory: [DefaultStep, NavigationStep, VideoPlayerStep, ActionStep],
  actionHandlers: [],
  contentDecorators: [],
  cacheManagerFactory: CacheManager,
  resumeOnLoad: true,
  onStart: NOOP,
  onStop: NOOP,
  onComplete: NOOP,
  onStep: NOOP,
  onAction: NOOP,
};

function isEventAttrbutesMatched(event, keyOption, type = "keyup") {
  if (typeof event === "object") {
    let eventAttrsMap = { type };
    if (typeof keyOption === "number") {
      eventAttrsMap.keyCode = keyOption;
    } else if (typeof keyOption === "string") {
      eventAttrsMap.key = keyOption;
    } else if (typeof keyOption === "object") {
      eventAttrsMap = { ...keyOption, type };
    } else {
      throw new Error(
        "keyboardNavigation option invalid. should be predefined object or false. Check documentation."
      );
    }

    const eventAttrs = Object.entries(eventAttrsMap).map(([key, value]) => ({
      key,
      value,
    }));
    return !eventAttrs.filter((attr) => event[attr.key] !== attr.value).length;
  }

  return false;
}

export default class Tour {
  get cacheManager() {
    return this._cacheManager ||
      (this._cacheManager = new this.options.cacheManagerFactory(this.options.identifier));
  }
  get currentstep() {
    return this._steps[this._current];
  }
  get length() {
    return this._steps.length;
  }
  get steps() {
    return this._steps.filter(step => !step.hidden);
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
  constructor(options = {}) {
    this._options = Object.assign(
      {},
      defaultOptions,
      options,
      {
        style: setAutoColors(
          defaultStyle,
          options.colors || options.style
        )
      }
    );
    this._u = u;
    this._steps = [];
    this._current = 0;
    this._active = false;
    this._stepsSrc = StepsSource.DOM;
    this._ready = false;
    this._initialposition = null;
    this._containerElement = document.createElement("div");
    this._containerElement.classList.add("__guided-tour-container");
    u(this._options.root).append(this._containerElement);
    this._shadowRoot = this._containerElement.attachShadow({ mode: "closed" });
    this._injectIcons();
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
    if (
      typeof this._options.steps === "object" &&
      Array.isArray(this._options.steps)
    ) {
      this._stepsSrc = StepsSource.JSON;
      this._initSteps(this._options.steps);
      this._ready = true;
      this._onTourReady();
    } else if (typeof this._options.src === "string") {
      this._stepsSrc = StepsSource.REMOTE;
      fetch(new Request(this._options.src, this._options.request)).then(
        (response) =>
          response.json().then((data) => {
            this._initSteps(data);
            this._ready = true;
            this._onTourReady();
          })
      );
    } else if (u(this._options.selector).length > 0) {
      this._stepsSrc = StepsSource.DOM;
      this._ready = true;
      this._onTourReady();
    } else {
      throw new Error("Tour is not configured properly. Check documentation.");
    }
  }
  _initSteps(steps) {
    this._steps = steps.map((data, index) => {
      if (data.title)
        data.title = this._decorateText(data.title, data);
      if (data.content) {
        data.content = this._decorateText(
          snarkdown(data.content), data
        );
      }
      const stepType = data.type || "default";
      const StepFactory = this._options.stepFactory.find(f => f.type === stepType);
      assert(StepFactory, `No factory for step of type ${stepType}. Check your setup.`);
      return new StepFactory({ ...data, index: data.index || index }, this);
    });
  }
  _onTourReady() {
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
  _injectIcons() {
    if (u("#GuidedTourIconSet", this._shadowRoot).length === 0) {
      u(this._shadowRoot).append(u(Icons));
    }
  }
  _injectStyles() {
    const style = u(
      `<style>${Style}</style>`
    );
    u(this._shadowRoot).append(style);
    const colors = u(
      `<style>${colorObjToStyleVarString(
        this._options.style,
        "--tourguide"
      )}</style>`
    );
    u(this._shadowRoot).append(colors);
  }
  _keyboardHandler(event) {
    if (
      this._options.keyboardNavigation.next &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.next)
    ) {
      this.next();
    } else if (
      this._options.keyboardNavigation.prev &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.prev)
    ) {
      this.previous();
    } else if (
      this._options.keyboardNavigation.first &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.first)
    ) {
      this.go(0);
    } else if (
      this._options.keyboardNavigation.last &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.last)
    ) {
      this.go(this._steps.length - 1);
    } else if (
      this._options.keyboardNavigation.stop &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.stop)
    ) {
      this.stop();
    } else if (
      this._options.keyboardNavigation.complete &&
      isEventAttrbutesMatched(event, this._options.keyboardNavigation.complete)
    ) {
      this.complete();
    }
  }
  _decorateText(text, step) {
    let _text = text;
    this._options.contentDecorators.forEach(decorator => {
      if (decorator.test(_text)) _text = decorator.render(_text, step, this);
    });
    return _text;
  }
  _positionTooltip() {
    return positionTooltip.apply(this, arguments);
  }
  init() {
    this.reset();
    this._steps = this._steps.sort((a, b) => a.index - b.index);
    this._steps[0].first = true;
    this._steps[this.length - 1].last = true;
  }
  reset() {
    if (this._active) this.stop();
    if (this._stepsSrc === StepsSource.DOM) {
      this._steps = [];
    }
    this._current = 0;
    this.cacheManager.set(CacheKeys.IsStarted, true);
  }
  start(step = 0) {
    if (this._ready) {
      this._containerElement.style.zIndex = (getMaxZIndex() + 1);
      if (this._options.restoreinitialposition) {
        this._initialposition = getScrollCoordinates(this._options.root);
      }
      if (!this._active) {
        this.cacheManager.set(CacheKeys.IsStarted, true);
        u(this._options.root).addClass("__guided-tour-active");
        this.init();
        this._steps.forEach((step) => step.attach(this._shadowRoot));
        this._current = step;
        this.currentstep.show();
        this._active = true;
        this._options.onStart(this._options);

        if (this._options.keyboardNavigation) {
          assert(
            Object.prototype.toString.call(this._options.keyboardNavigation) === "[object Object]",
            "keyboardNavigation option invalid. should be predefined object or false. Check documentation."
          );
          u(":root").on("keyup", this._keyboardHandler);
        }
      } else {
        this.go(step, "start");
      }
    } else {
      setTimeout(() => {
        this.start(step);
      }, 50);
    }
  }
  action(event, action) {
    if (this._active) {
      switch (action.action) {
        case "next": this.next(); break;
        case "previous": this.previous(); break;
        case "stop": this.stop(); break;
        case "complete": this.complete(); break;
        default: {
          const handler = this._options.actionHandlers
            .find(handler => handler.name === action.action);
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
  next(e) {
    e && e.preventDefault && e.preventDefault();
    e && e.stopPropagation && e.stopPropagation();
    if (this._active) {
      this.go(this.nextstep, "next");
    }
  }
  previous(e) {
    e && e.preventDefault && e.preventDefault();
    e && e.stopPropagation && e.stopPropagation();
    if (this._active) {
      this.go(this.previousstep, "previous");
    }
  }
  go(step, type) {
    if (this._active && this._current !== step) {
      this.currentstep.hide();
      this._current = clamp(step, 0, this.length - 1);
      this.currentstep.show();
      this._options.onStep(this.currentstep, type);
      this.cacheManager.set(CacheKeys.CurrentProgress, this._current);
    }
  }
  stop() {
    if (this._active) {
      this.currentstep.hide();
      this._active = false;
      this._steps.forEach((step) => step.remove());
      u(this._options.root).removeClass("__guided-tour-active");
      if (this._options.keyboardNavigation) {
        u(":root").off("keyup", this._keyboardHandler);
      }
      if (this._options.restoreinitialposition && this._initialposition) {
        animateScroll(this._initialposition, this._options.animationspeed);
      }
      this._options.onStop(this._options);
      this.cacheManager.set(CacheKeys.IsStarted, false);
      this.cacheManager.clear(CacheKeys.CurrentProgress);
    }
  }
  complete() {
    if (this._active) {
      this.stop();
      this._options.onComplete();
    }
  }
  deinit() {
    if (this._ready) {
      this._containerElement.remove();
      this._containerElement = null;
      this._active = false;
      this._ready = false;
    }
  }
}
Tour.ActionHandler = ActionHandler;
Tour.ContentDecorator = ContentDecorator;
Tour.DefaultStep = DefaultStep;