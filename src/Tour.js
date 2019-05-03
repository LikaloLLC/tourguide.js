import u from "umbrellajs";
import Icons from "./icons";
import Step from "./step";
import { clamp } from "./utils";

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
    this._options =
      Object.assign({
        root: "body",
        selector: "[data-tour]",
        animationspeed: 300,
        padding: 5,
        steps: null,
        src: null,
        request: {
          "options": {
            "mode": "cors",
            "cache": "no-cache"
          },
          "headers": {
            "Content-Type": "application/json"
          }
        },
        onStart: () => { },
        onStop: () => { },
        onComplete: () => { },
        onStep: () => { },
        onAction: () => { }
      }, options);
    this._steps = [];
    this._current = 0;
    this._active = false;
    this._stepsSrc = StepsSource.DOM;
    this._ready = false;
    this.start = this.start.bind(this);
    this.action = this.action.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.go = this.go.bind(this);
    this.stop = this.stop.bind(this);
    this.complete = this.complete.bind(this);
    this._injectIcons();
    if (typeof this._options.steps === "object" && Array.isArray(this._options.steps)) {
      this._stepsSrc = StepsSource.JSON;
      this._steps = this._options.steps.map(o => new Step(
        o,
        this
      ));
      this._ready = true;
    } else if (typeof this._options.stc === "string" && this._options.src.indexOf("http") === 0) {
      this._stepsSrc = StepsSource.REMOTE;
      fetch(new Request(this._options.src, this._options.request))
        .then(response => response.json().then(data => {
          data.map(o => new Step(
            o,
            this
          ));
          this._ready = true;
        }));
    } else if (u(this._options.selector).length > 0) {
      this._ready = true;
    } else {
      throw new Error("Tour is not configured properly. Check documentation.");
    }
  }
  _injectIcons() {
    if (u("#GuidedTourIconSet").length === 0) {
      u("body").append(u(Icons));
    }
  }
  init() {
    this.reset();
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
      if (!this._active) {
        u(this._options.root).addClass("guided-tour");
        this.init();
        this._steps.forEach(step => step.attach(this._options.root));
        this._current = step;
        this.currentstep.show();
        this._active = true;
        this._options.onStart(this._options);
      } else {
        this.go(step);
      }
    } else {
      throw new Error("Tour is not configured properly. Check documentation.");
    }
  }
  action(e) {
    if (this._active) {
      const { currentstep } = this;
      if (currentstep.actiontarget) {
        let actiontarget = u(currentstep.target).find(currentstep.actiontarget);
        if (actiontarget) {
          try {
            actiontarget.first().click();
          } catch(e) {
            // eslint-disable-next-line no-console
            console.warn(`Could not find actiontarget: ${currentstep.actiontarget} on step #${currentstep.index}`);
          }
        }
      }
      this._options.onAction(currentstep, e);
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
    if (this._active) {
      this.currentstep.hide();
      this._active = false;
      this._steps.forEach(step => step.remove());
      u(this._options.root).removeClass("guided-tour");
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
