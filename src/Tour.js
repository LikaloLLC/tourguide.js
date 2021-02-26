import u from "umbrellajs";
import Icons from "./icons";
import Step from "./step";
import Overlay from "./overlay";
import { clamp, getViewportRect, colorObjToStyleVarString } from "./utils";

import "../scss/style.scss";

const StepsSource = {
  DOM: 0,
  JSON: 1,
  REMOTE: 2
};

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
        onStart: () => {},
        onStop: () => {},
        onComplete: () => {},
        onStep: () => {},
        onAction: () => {},
      },
      options,
      {
        colors: Object.assign(
          {
            overlay: "rgba(0, 0, 0, 0.5)",
            background: "#fff",
            bullet: "#ff4141",
            bulletVisited: "#aaa",
            bulletCurrent: "#b50000",
            stepButtonPrev: "#ff4141",
            stepButtonNext: "#ff4141",
            stepButtonComplete: "#b50000",
          },
          options.colors || {}
        ),
      }
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
  }
  _injectIcons() {
    if (u("#GuidedTourIconSet").length === 0) {
      u("body").append(u(Icons));
    }
  }
  _injectStyles() {
    // inject colors
    this._removeStyles();
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
        const { scrollX, scrollY } = getViewportRect(this._options.root);
        this._initialposition = {
          left: scrollX,
          top: scrollY,
          behavior: "smooth"
        };
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
      } else {
        this.go(step, "start");
      }
    } else {
      throw new Error("Tour is not configured properly. Check documentation.");
    }
  }
  action(event, action) {
    if (this._active) {
      const { currentstep } = this;
      if(typeof action.act === "function") {
        action.act(event, currentstep.toJSON(), action);
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
      if (this._options.restoreinitialposition) {
        u(this._options.root).first().scrollTo(this._initialposition);
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
