import u from "umbrellajs";
import Icons from "./icons";
import Step from "./step";
import Overlay from "./overlay";
import { animateScroll, clamp, colorObjToStyleVarString, getScrollCoordinates } from "./utils";

import "../scss/style.scss";

const StepsSource = {
  DOM: 0,
  JSON: 1,
  REMOTE: 2
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
      throw new Error("keyboardNavigation option invalid. should be predefined object or false. Check documentation.");
    }

    const eventAttrs = Object.entries(eventAttrsMap).map(([key, value]) => ({
      key,
      value,
    }));
    return !(eventAttrs.filter((attr) => event[attr.key] !== attr.value).length);
  }

  return false;
}

export default class Tour {
  get currentstep() {
    return this._steps[this._current];
  }
  get length() {
    return this._steps.length;
  }
  get steps() {
    return this._steps.map(step => step.toJSON());
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
    const defaultKeyNavOptions = {
      next: "ArrowRight",
      prev: "ArrowLeft",
      first: "Home",
      last: "End",
      complete: null,
      stop: "Escape"
    };

    const defaultColors = {
      overlay: "rgba(0, 0, 0, 0.5)",
      background: "#fff",
      bullet: "#ff4141",
      bulletVisited: "#aaa",
      bulletCurrent: "#b50000",
      stepButtonPrev: "#ff4141",
      stepButtonNext: "#ff4141",
      stepButtonComplete: "#b50000",
    };    

    this._options = Object.assign(
      {
        root: "body",
        selector: "[data-tour]",
        animationspeed: 300,
        padding: 5,
        steps: null,
        src: null,
        restoreinitialposition: true,
        preloadimages: false,
        request: {
          "options": {
            "mode": "cors",
            "cache": "no-cache",
          },
          "headers": {
            "Content-Type": "application/json",
          },
        },
        align: "top", // top, bottom, center
        keyboardNavigation: defaultKeyNavOptions,
        onStart: () => {},
        onStop: () => {},
        onComplete: () => {},
        onStep: () => {},
        onAction: () => {},
      },
      options,
      {
        colors: Object.assign(
          defaultColors,
          options.colors || {}
        ),
      },
    );
    this._overlay = null;
    this._steps = [];
    this._current = 0;
    this._active = false;
    this._stepsSrc = StepsSource.DOM;
    this._ready = false;
    this._initialposition = null;
    this._injectIcons();
    if (typeof this._options.steps === "object" && Array.isArray(this._options.steps)) {
      this._stepsSrc = StepsSource.JSON;
      this._steps = this._options.steps.map(o => new Step(
        o,
        this
      ));
      this._ready = true;
    } else if (typeof this._options.src === "string") {
      this._stepsSrc = StepsSource.REMOTE;
      fetch(new Request(this._options.src, this._options.request))
        .then(response => response.json().then(data => {
          this._steps = data.map(o => new Step(
            o,
            this
          ));
          this._ready = true;
        }));
    } else if (u(this._options.selector).length > 0) {
      this._stepsSrc = StepsSource.DOM;
      this._ready = true;
    } else {
      throw new Error("Tour is not configured properly. Check documentation.");
    }

    this.start = this.start.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.go = this.go.bind(this);
    this.stop = this.stop.bind(this);
    this.complete = this.complete.bind(this);
    this.action = this.action.bind(this);
    this._keyboardHandler = this._keyboardHandler.bind(this);
  }
  _injectIcons() {
    if (u("#GuidedTourIconSet").length === 0) {
      u("body").append(u(Icons));
    }
  }
  _injectStyles() {
    // inject colors
    this._removeStyles();
    // eslint-disable-next-line no-console
    console.log(this._options.colors);
    const colors = u(
      "<style id=\"tourguide-color-schema\">" +
      colorObjToStyleVarString(this._options.colors, "--tourguide") +
      "</style>"
    );
    u(":root > head").append(colors);
  }
  _removeStyles() {
    const colorStyleTags = u("style#tourguide-color-schema");
    if (colorStyleTags.length > 0) {
      colorStyleTags.remove();
    }
  }
  _keyboardHandler(event) {
    if (this._options.keyboardNavigation.next && isEventAttrbutesMatched(event, this._options.keyboardNavigation.next)) {
      this.next();
    } else if (this._options.keyboardNavigation.prev && isEventAttrbutesMatched(event, this._options.keyboardNavigation.prev)) {
      this.previous();
    } else if (this._options.keyboardNavigation.first && isEventAttrbutesMatched(event, this._options.keyboardNavigation.first)) {
      this.go(0);
    } else if (this._options.keyboardNavigation.last && isEventAttrbutesMatched(event, this._options.keyboardNavigation.last)) {
      this.go(this._steps.length - 1);
    } else if (this._options.keyboardNavigation.stop && isEventAttrbutesMatched(event, this._options.keyboardNavigation.stop)) {
      this.stop();
    } else if (this._options.keyboardNavigation.complete && isEventAttrbutesMatched(event, this._options.keyboardNavigation.complete)) {
      this.complete();
    }
  }
  init() {
    this.reset();
    u(this._options.root).addClass("guided-tour");
    this._overlay = new Overlay(this);
    if (this._stepsSrc === StepsSource.DOM) {
      const steps = u(this._options.selector).nodes;
      this._steps = steps.map(el => new Step(
        el,
        this
      ));
    }
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
  }
  start(step = 0) {
    if (this._ready) {
      this._injectStyles();
      if (this._options.restoreinitialposition) {
        this._initialposition = getScrollCoordinates(this._options.root);
      }
      if (!this._active) {
        u(this._options.root).addClass("guided-tour");
        this.init();
        this._overlay.attach(this._options.root);
        this._steps.forEach(step => step.attach(this._options.root));
        this._current = step;
        this.currentstep.show();
        this._active = true;
        this._options.onStart(this._options);

        if (this._options.keyboardNavigation) {
          if (Object.prototype.toString.call(this._options.keyboardNavigation) !== "[object Object]")
            throw new Error("keyboardNavigation option invalid. should be predefined object or false. Check documentation.");

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
      const { currentstep } = this;
      if(typeof action.act === "function") {
        action.act(event, currentstep.toJSON(), this, action);
      } else if(typeof action.act === "number") {
        this.go(action.act, "action");
      } else if(action.act === "next") {
        this.next();
      } else if(action.act === "previous") {
        this.previous();
      } else if(action.act === "stop") {
        this.stop();
      } else if(action.act === "complete") {
        this.complete();
      }

      if(this._options.onAction && typeof this._options.onAction === "function") {
        this._options.onAction(event, currentstep.toJSON(), action);
      }
    }
  }
  next() {
    if (this._active) {
      this.go(this.nextstep, "next");
    }
  }
  previous() {
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
    }
  }
  stop() {
    this._removeStyles();
    if (this._active) {
      this.currentstep.hide();
      this._active = false;
      this._overlay.remove();
      this._steps.forEach(step => step.remove());
      u(this._options.root).removeClass("guided-tour");
      if (this._options.keyboardNavigation) {
        u(":root").off("keyup", this._keyboardHandler);
      }
      if (this._options.restoreinitialposition && this._initialposition) {
        animateScroll(
          this._initialposition,
          this._options.animationspeed
        );
      }
      this._options.onStop(this._options);
    }
  }
  complete() {
    if (this._active) {
      this.stop();
      this._options.onComplete();
    }
  }
}
