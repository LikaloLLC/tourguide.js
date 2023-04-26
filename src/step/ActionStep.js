import BaseStep from "./BaseStep";
import scrollIntoView from "scroll-into-view";
import {
  clamp,
  isTargetValid,
  assert,
} from "../utils";

export default class ActionStep extends BaseStep {
  get el() {
    if (!this.container) {
      const content = this.context._u(`<div class="guided-tour-action-content-wrapper">
          <div id="tooltip-title-${this.index}" role="heading" class="guided-tour-action-title">${this.title}</div>
        </div>`);
      const tooltip = this.tooltip = this.context._u("<div role=\"document\" class=\"guided-tour-step-tooltip action-tooltip\"></div>");
      const tooltipinner = this.context._u("<div class=\"guided-tour-step-tooltip-inner action-tooltip-inner\"></div>");
      const container = this.context._u("<div class=\"guided-tour-step-content-container action-content-container\"></div>");
      container.append(content);
      const arrow = this.arrow = this.context._u("<div class=\"guided-tour-arrow\"></div>");
      tooltipinner.append(arrow).append(container);
      tooltip.append(tooltipinner);
      this.container = this.context._u(`<div role="dialog" aria-labelleby="tooltip-title-${this.index}" class="guided-tour-step${this.first ? " guided-tour-step-first" : ""}${this.last ? " guided-tour-step-last" : ""}"></div>`);
      const highlight = this.highlight = this.context._u("<div class=\"guided-tour-step-highlight action-target\"><div class=\"radar\"><div class=\"radar-dot\"></div><div class=\"radar-circle\"></div></div></div>");
      this.container.append(highlight).append(tooltip);
    }
    return this.container;
  }
  get target() {
    return this._target || this._selector && this.context._u(this._selector).first();
  }
  set target(target) {
    this._target = target;
  }
  constructor(data, context) {
    super(data, context);
    this._target = null;
    this._timerHandler = null;
    this._scrollCancel = null;
    this._selector = data.selector;
    assert((
      data.hasOwnProperty("selector")
    ),
    "missing required step parameter: selector\n" +
            JSON.stringify(data, null, 2) + "\n" +
            "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach"
    );
    assert((
      data.hasOwnProperty("title")
    ),
    "missing required step parameter: title\n" +
            JSON.stringify(data, null, 2) + "\n" +
            "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach"
    );
    this.alignment = data.alignment || context.options.alignment || ActionStep.defaults.alignment;
    this._onAction = this._onAction.bind(this);
  }
  _cancel() {
    if (this._timerHandler) clearTimeout(this._timerHandler);
    if (this._scrollCancel) this._scrollCancel();
  }
  _position() {
    this.context._positionTooltip(
        this.target,
        this.tooltip.first(),
        this.arrow.first(),
        this.highlight.first(),
        this);
  }
  _onAction(e) {
    this.context.next();
  }
  attach(parent) {
    this.context._u(parent).append(this.el);
  }
  show() {
    this._cancel();
    if (!this.active) {
      const show = () => {
        this.el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
        this._position();
        this.active = true;
        this.container.find(".guided-tour-step-tooltip, button.primary, .guided-tour-step-button-complete, .guided-tour-step-button-next").last().focus({
          preventScroll: true
        });
        document.addEventListener("click", this._onAction);
      };
      const animationspeed = clamp(this.context.options.animationspeed, 120, 1000);
      if (isTargetValid(this.target)) {
        this._scrollCancel = scrollIntoView(this.target, {
          time: animationspeed,
          cancellable: false,
          align: {
            top: 0.5,
            left: 0.5
          }
        });
      }
      this._timerHandler = setTimeout(show, animationspeed * 3);
      return true;
    }
    return false;
  }
  hide() {
    this._cancel();
    document.removeEventListener("click", this._onAction);
    if (this.active) {
      this.el.removeClass("active");
      this.active = false;
      return true;
    }
    return false;
  }
  remove() {
    this.hide();
    this.el.remove();
  }
}
ActionStep.defaults = {
    alignment: "bottom-start",
};
ActionStep.type = "action";