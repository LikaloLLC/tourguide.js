import BaseStep from "./BaseStep";
import scrollIntoView from "scroll-into-view";
import {
  clamp,
  isTargetValid,
  setStyle,
  assert,
} from "../utils";

export default class PopoverBaseStep extends BaseStep {
  get _image() {
    return this.context._u(`<figure class="guided-tour-step-image">${this.image ? `<img src="${this.image}" />` : ""}</figure>`);
  }
  get _content() {
    const content = this.context._u(`<div class="guided-tour-step-content-wrapper">
    <div id="tooltip-title-${this.index}" role="heading" class="guided-tour-step-title">${this.title}</div>
    <div class="guided-tour-step-content">${this.content}</div>
  </div>`);
    if (Array.isArray(this.actions) && this.actions.length > 0) {
      const actions = this.context._u(`<div class="guided-tour-step-actions">
        ${this.actions
          .map((action, index) => `<${action.href ? "a" : "button"} id="${action.id}" ${action.href ? `href="${action.href}"` : ""} ${action.target ? `target="${action.target}"` : ""} class="button${action.primary ? " primary" : ""}" data-index="${index}">${action.label}</${action.href ? "a" : "button"}>`)
          .join("")
        }
      </div>`);
      actions.find("a, button").on("click", e => {
        const action = this.actions[parseInt(e.target.dataset.index)];
        if (action.action) e.preventDefault();
        this.context.action(e, action);
      });
      content.append(actions);
    }
    return content;
  }
  get el() {
    if (!this.container) {
      const tooltip = this.tooltip = this.context._u("<div role=\"document\" class=\"guided-tour-step-tooltip\"></div>");
      if (this.width) setStyle(tooltip, { width: this.width, maxWidth: this.width });
      if (this.height) setStyle(tooltip, { height: this.height, maxHeight: this.height });
      const tooltipinner = this.context._u(`<div class="guided-tour-step-tooltip-inner${this.layout === "horizontal" ? " step-layout-horizontal" : ""}"></div>`);
      const container = this.context._u("<div class=\"guided-tour-step-content-container\"></div>");
      container.append(this._image).append(this._content);
      const arrow = this.arrow = this.context._u("<div class=\"guided-tour-arrow\"></div>");
      if (this.navigation) {
        const footer = this.context._u(`<div class="guided-tour-step-footer">
                    <button class="guided-tour-step-button guided-tour-step-button-close" title="End tour">
                        <svg class="guided-tour-icon" viewBox="0 0 20 20" width="16" height="16"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tour-icon-close"></use></svg>
                    </button>
                    ${!this.first ? `<button class="guided-tour-step-button guided-tour-step-button-prev" title="Prev step">
                      <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tour-icon-prev"></use>
                      </svg>
                    </button>` : ""}
                    ${this.last ? `<button class="guided-tour-step-button guided-tour-step-button-complete" title="Complete tour">
                      <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tour-icon-complete"></use>
                      </svg>
                    </button>` : `<button class="guided-tour-step-button guided-tour-step-button-next" title="Next step">
                      <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tour-icon-next"></use>
                      </svg>
                    </button>`}
                    ${this.context.steps.length > 1 ? `<div class="guided-tour-step-bullets">
                        <ul>${this.context.steps.map((step, i) => `<li><button title="Go to step ${i + 1}" data-index="${step.index}" class="${step.index < this.index ? "complete" : step.index == this.index ? "current" : ""}"></button></li>`).join("")}</ul>
                    </div>` : ""}
                </div>`);
        footer.find(".guided-tour-step-button-prev").on("click", this.context.previous);
        footer.find(".guided-tour-step-button-next").on("click", this.context.next);
        footer.find(".guided-tour-step-button-close").on("click", this.context.stop);
        footer.find(".guided-tour-step-button-complete").on("click", this.context.complete);
        footer.find(".guided-tour-step-bullets button").on("click", (e) => this.context.go(parseInt(this.context._u(e.target).data("index"))));
        tooltipinner.append(arrow).append(container).append(footer);
      } else tooltipinner.append(arrow).append(container);
      tooltip.append(tooltipinner);
      this.container = this.context._u(`<div role="dialog" aria-labelleby="tooltip-title-${this.index}" class="guided-tour-step${this.first ? " guided-tour-step-first" : ""}${this.last ? " guided-tour-step-last" : ""}"></div>`);
      if (this.overlay) {
        const highlight = this.highlight = this.context._u("<div class=\"guided-tour-step-highlight\"></div>");
        this.container.append(highlight).append(tooltip);
      } else this.container.append(tooltip);
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
    this._validate(data);
    this._target = null;
    this._scrollCancel = null;
    this._selector = data.selector;
    this.layout = data.layout || PopoverBaseStep.defaults.layout;
    this.alignment = data.alignment || context.options.alignment || PopoverBaseStep.defaults.alignment;
    this.placement = data.placement || context.options.placement || PopoverBaseStep.defaults.placement;
    this.overlay = data.overlay !== false;
    this.navigation = data.navigation !== false;
    if (data.image &&
      context.options.preloadimages &&
      !(/^data:/i.test(data.image))) {
      const preload = new Image();
      preload.onerror = () => {
        console.error(new Error(`Invalid image URL: ${data.image}`));
        this.image = null;
      };
      preload.src = this.image;
    }

    this.actions = [];
    if (data.actions) {
      if (!Array.isArray(data.actions)) {
        console.error(new Error(`actions must be array but got ${typeof data.actions}`));
      } else {
        this.actions = data.actions;
      }
    }
  }
  _validate(data) {
    assert((
      data.hasOwnProperty("title")
    ),
      "missing required step parameter: title\n" +
      JSON.stringify(data, null, 2) + "\n" +
      "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach"
    );
    assert((
      data.hasOwnProperty("content")
    ),
      "missing required step parameter: content\n" +
      JSON.stringify(data, null, 2) + "\n" +
      "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach"
    );
  }
  _cancel() {
    if (this._scrollCancel) this._scrollCancel();
  }
  _position() {
    this.context._positionTooltip(
      this.target,
      this.tooltip.first(),
      this.arrow.first(),
      this.highlight && this.highlight.first(),
      this);
  }
  attach(parent) {
    this.context._u(parent).append(this.el);
  }
  show() {
    this._cancel();
    if (!this.active) {
      const onShow= () => {
        setStyle(this.container, {
          opacity: "1"
        });
        this.container.find(".guided-tour-step-tooltip, button.primary, .guided-tour-step-button-complete, .guided-tour-step-button-next").last().focus({
          preventScroll: true
        });
      };
      this.el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
      this._position();
      this.active = true;
      if(isTargetValid(this.target)) {
        const animationspeed = clamp(this.context.options.animationspeed, 120, 1000);
        this._scrollCancel = scrollIntoView(this.target, {
          time: animationspeed,
          cancellable: false,
          align: {
            top: 0.5,
            left: 0.5
          }
        }, onShow);
      } else onShow();
      return true;
    }
    return false;
  }
  hide() {
    this._cancel();
    if (this.active) {
      setStyle(this.container, {
        opacity: "0"
      });
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
PopoverBaseStep.defaults = {
  layout: "vertical",
  alignment: "bottom-start",
  placement: "middle-center",
};
PopoverBaseStep.type = "default";