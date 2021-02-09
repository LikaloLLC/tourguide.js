import u from "umbrellajs";
import scrollIntoView from "scroll-into-view";
import {
  clamp,
  getDataContents,
  getBoundingClientRect,
  isTargetValid,
  getViewportRect,
  setStyle,
  getStyle,
  parseNumber,
} from "../utils";
import marked from "marked";
// data-step="title: Step1; content: .../<>"

export default class Step {
  get el() {
    if (!this.container) {
      const image = u(`<div role="figure" class="guided-tour-step-image">${this.image ? `<img src="${this.image}" />` : ""}</div>`);
      const title = u(`<div role="heading" class="guided-tour-step-title">${this.title}</div>`);
      const content = u(`<div class="guided-tour-step-content">${this.content}</div>`);
      const footer = u(`<div class="guided-tour-step-footer">
                <span role="button" class="guided-tour-step-button guided-tour-step-button-close" title="End tour">
                    <svg class="guided-tour-icon" viewBox="0 0 20 20" width="16" height="16"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tour-icon-close"></use></svg>
                </span>
                ${this.last ? `<span role="button" class="guided-tour-step-button guided-tour-step-button-complete" title="Complete tour">
                        <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tour-icon-complete"></use></svg>
                    </span>`: `<span role="button" class="guided-tour-step-button guided-tour-step-button-next" title="Next step">
                        <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tour-icon-next"></use></svg>
                    </span>`}
                ${this.context._steps.length > 1 ? `<div class="guided-tour-step-bullets">
                    <ul>${this.context._steps.map((step, i) => `<li  title="Go to step ${i + 1}" data-index="${i}" class="${step.index < this.index ? "complete" : step.index == this.index ? "current" : ""}"></li>`).join("")}</ul>
                </div>` : ""}
            </div>`);
      footer.find(".guided-tour-step-button-next").on("click", this.context.next);
      footer.find(".guided-tour-step-button-close").on("click", this.context.stop);
      footer.find(".guided-tour-step-button-complete").on("click", this.context.complete);
      footer.find(".guided-tour-step-bullets li").on("click", (e) => this.context.go(parseInt(u(e.target).data("index"))));
      const highlight = this.highlight = u("<div class=\"guided-tour-step-highlight\"></div>");
      const tooltip = this.tooltip = u("<div role=\"tooltip\" class=\"guided-tour-step-tooltip\"></div>");
      const tooltipinner = u("<div class=\"guided-tour-step-tooltip-inner\"></div>");
      const arrow = this.arrow = u("<div aria-hidden=\"true\" class=\"guided-tour-arrow\"><div aria-hidden=\"true\" class=\"guided-tour-arrow-inner\"></div></div>");
      tooltipinner.append(arrow).append(image).append(title).append(content).append(footer);
      tooltip.append(tooltipinner);
      this.container = u(`<div role="dialog" class="guided-tour-step${this.first ? " guided-tour-step-first" : ""}${this.last ? " guided-tour-step-last" : ""}"></div>`);
      this.container.append(highlight).append(tooltip);
    }
    return this.container;
  }
  get target() {
    return this._target || u(this._selector).first();
  }
  set target(target) {
    this._target = target;
  }
  constructor(step, context) {
    this.index = 0;
    this.image = null;
    this.title = "";
    this.content = "";
    this.active = false;
    this.first = false;
    this.last = false;

    this.container = null;
    this.highlight = null;
    this.tooltip = null;
    this.arrow = null;

    this.context = context;
    this._target = null;
    this._timerHandler = null;
    this._scrollCancel = null;

    let data;
    if (!(step instanceof HTMLElement)) {
      if(!(step.hasOwnProperty("title") && step.hasOwnProperty("content") && step.hasOwnProperty("step"))) {
        throw new Error(
          "invalid step parameter:\n" +
          JSON.stringify(step, null, 2) + "\n" +
          "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach"
        );
      }
      data = step;
      this._selector = step.selector;
    } else {
      this.target = step;
      data = getDataContents(u(step).data("tour"));
    }
    this.index = parseInt(data.step);
    this.title = data.title;
    this.content = data.content;
    if (data.marked) {
      this.content = marked(this.content);
    }
    this.image = data.image;
    if (data.image &&
      context.options.preloadimages &&
      !(/^data:/i.test(data.image))) {
      const preload = new Image();
      // preload.onload = (e) => {
      // };
      preload.onerror = () => {
        console.error(new Error(`image is not valid: ${data.image}`));
        this.image = null;
      };
      preload.src = this.image;
    }

    this.actions = [];
    if(data.actions) {
      if(!Array.isArray(data.actions)) {
        console.error(new Error(`actions must be array but got ${typeof data.actions}`));
      } else {
        this.actions = data.actions;
      }
    }

    this.onAction = this.onAction.bind(this);
  }
  attach(root) {
    u(root).append(this.el);
  }
  remove() {
    this.hide();
    this.el.remove();
  }
  position() {
    const view = getViewportRect(this.context._options.root);
    if (isTargetValid(this.target)) {
      const highlight = this.highlight;
      const tooltip = this.tooltip;
      const arrow = this.arrow;

      const highlightStyle = {};
      const tootipStyle = {};
      const arrowStyle = {};

      const targetRect = getBoundingClientRect(this.target, this.context._options.root);
      const tootipRect = getBoundingClientRect(tooltip, this.context._options.root);

      highlightStyle.top = targetRect.top - this.context.options.padding;
      highlightStyle.left = targetRect.left - this.context.options.padding;
      highlightStyle.width = targetRect.width + this.context.options.padding * 2;
      highlightStyle.height = targetRect.height + this.context.options.padding * 2;

      const marginVerticalSize = parseNumber(getStyle(tooltip, "margin-top")) + parseNumber(getStyle(tooltip, "margin-bottom"));
      const marginHorizontalSize = parseNumber(getStyle(tooltip, "margin-left")) + parseNumber(getStyle(tooltip, "margin-right"));

      let tooltipBRL = 0;
      let tooltipBRR = 0;

      // Compute vertical position
      if (
        view.height - targetRect.viewBottom > tootipRect.height + marginVerticalSize ||
        targetRect.viewTop < tootipRect.height + marginVerticalSize
      ) {
        tootipStyle.top = targetRect.top + targetRect.height;
        tooltip.addClass("guided-tour-arrow-top");
        tooltipBRL = parseNumber(getStyle(tooltip, "border-top-left-radius"));
        tooltipBRR = parseNumber(getStyle(tooltip, "border-top-right-radius"));
      } else {
        tootipStyle.bottom = view.rootHeight - targetRect.top;
        tooltip.addClass("guided-tour-arrow-bottom");
        tooltipBRL = parseNumber(getStyle(tooltip, "border-bottom-left-radius"));
        tooltipBRR = parseNumber(getStyle(tooltip, "border-bottom-right-radius"));
      }

      const arrowRect = getBoundingClientRect(arrow, this.context._options.root);

      // Compute horizontal position
      if (
        view.width - targetRect.left > tootipRect.width + marginHorizontalSize ||
        targetRect.right < tootipRect.width + marginHorizontalSize
      ) {
        tootipStyle.left = targetRect.left;
        if(targetRect.width / 2 > tootipRect.width) arrowStyle.right = 8;
        else arrowStyle.left = clamp(targetRect.width / 2, tooltipBRL + 2, tootipRect.width - arrowRect.width - tooltipBRR - 2);
      } else {
        tootipStyle.right = view.rootWidth - targetRect.right;
        if(targetRect.width / 2 > tootipRect.width) arrowStyle.left = 18;
        else arrowStyle.right = clamp(targetRect.width / 2, tooltipBRR + 2, tootipRect.width - arrowRect.width - tooltipBRL - 2);
      }

      setStyle(highlight, highlightStyle);
      setStyle(tooltip, tootipStyle);
      setStyle(arrow, arrowStyle);
      tooltip.first().style.opacity = 0.1;
    } else {
      const highlight = this.highlight;
      const tooltip = this.tooltip;

      const highlightStyle = {};
      const tootipStyle = {};

      highlightStyle.top = 0;
      highlightStyle.left = 0;
      highlightStyle.width = 0;
      highlightStyle.height = 0;

      tootipStyle.top = view.height / 2 + view.scrollY - view.rootTop;
      tootipStyle.left = view.width / 2 + view.scrollX - view.rootLeft;

      tooltip.addClass("guided-tour-arrow-none");
      tooltip.addClass("guided-tour-center");

      setStyle(highlight, highlightStyle);
      setStyle(tooltip, tootipStyle);
      highlight.first().style.boxShadow = "none";
      tooltip.first().style.opacity = 1;
      this.context._overlay.show();
    }
  }
  adjust() {
    const view = getViewportRect(this.context._options.root);

    const tooltip = this.tooltip;

    const tooltipRect = getBoundingClientRect(tooltip, this.context._options.root);

    const tootipStyle = {};

    if (tooltipRect.viewTop < 8) {
      tootipStyle.top = (8 - tooltipRect.viewTop) + tooltipRect.top;
      tootipStyle.bottom = "unset";
    } else if (tooltipRect.viewBottom + 8 > view.height) {
      tootipStyle.top = "unset";
      tootipStyle.bottom = view.rootHeight - (tooltipRect.bottom - (tooltipRect.viewBottom + 8 - view.height));
    }
    if (tooltipRect.viewLeft < 8) {
      tootipStyle.left = (8 - tooltipRect.viewLeft) + tooltipRect.left;
      tootipStyle.right = "unset";
    } else if (
      (view.width >= 760 && tooltipRect.viewRight + 38 > view.width) ||
      (view.width < 760 && tooltipRect.viewRight + 18 > view.width)
    ) {
      tootipStyle.left = "unset";
      tootipStyle.right = view.rootWidth - (tooltipRect.right - (tooltipRect.viewRight + (view.width >= 760 ? 38 : 18) - view.width));
    }

    setStyle(tooltip, tootipStyle);
    tooltip.first().style.opacity = 1;
  }
  cancel() {
    if(this._timerHandler) clearTimeout(this._timerHandler);
    if(this._scrollCancel) this._scrollCancel();
  }
  show() {
    this.cancel();
    if (!this.active) {
      const show = () => {
        this.context._overlay.hide();
        this.el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
        this.position();
        this.adjust();
        if(isTargetValid(this.target)) {
          if(getStyle(this.target, "position") === "static") {
            this.target.style.position = "relative";
          }
          u(this.target).addClass("guided-tour-target");
        }

        this.actions.forEach((a) => {
          try {
            u(a.target).on(a.event, this.onAction);
          } catch (error) {
            console.warn(`Could not find action.target: ${a.target} on step #${this.index}`);
            console.warn(error);
          }
        });

        this.active = true;
      };
      if (isTargetValid(this.target)) {
        this._scrollCancel = scrollIntoView(this.target, {
          time: this.context.options.animationspeed,
          cancellable: false,
        }, show);
      } else this._timerHandler = setTimeout(show, this.context.options.animationspeed);
      return true;
    }
    return false;
  }
  hide() {
    this.cancel();
    if (this.active) {
      if(isTargetValid(this.target)) {
        u(this.target).removeClass("guided-tour-target");
      }
      this.el.removeClass("active");
      this.tooltip.removeClass("guided-tour-arrow-top");
      this.tooltip.removeClass("guided-tour-arrow-bottom");
      this.context._overlay.show();

      this.actions.forEach((a) => {
        try {
          u(a.target).off(a.event, this.onAction);
        } catch (error) {
          console.warn(error);
        }
      });

      this.active = false;
      return true;
    }
    return false;
  }
  onAction(event) {
    const action = this.actions.find((a) => u(a.target).is(event.target));
    this.context.onAction(event, action);
  }
  toJSON() {
    const { index, title, content, image, active } = this;
    return { index, title, content, image, active };
  }
}
