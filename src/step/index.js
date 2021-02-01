import u from "umbrellajs";
import scrollIntoView from "scroll-into-view";
import { clamp, getDataContents, getBoundingClientRect, getViewportRect, setStyle, getStyle } from "../utils";
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
      highlight.on("click", this.context.action);
      const tooltip = this.tooltip = u("<div role=\"tooltip\" class=\"guided-tour-step-tooltip\"></div>");
      const tooltipinner = u("<div class=\"guided-tour-step-tooltip-inner\"></div>");
      const arrow = this.arrow = u("<div aria-hidden=\"true\" class=\"guided-tour-arrow\"></div>");
      tooltipinner.append(arrow).append(image).append(title).append(content).append(footer);
      tooltip.append(tooltipinner);
      this.container = u(`<div role="dialog" class="guided-tour-step${this.first ? " guided-tour-step-first" : ""}${this.last ? " guided-tour-step-last" : ""}"></div>`);
      this.container.append(highlight).append(tooltip);
    }
    return this.container;
  }
  get target() {
    return this._target || u(this.selector).first();
  }
  set target(target) {
    this._target = target;
  }
  constructor(step, context) {
    this.index = 0;
    this.first = false;
    this.last = false;
    this.target = null;
    this.container = null;
    this.highlight = null;
    this.tooltip = null;
    this.arrow = null;
    this.rect = {};
    this.image = null;
    this.title = "";
    this.content = "";
    this.active = false;
    this.context = null;
    this.visible = false;
    this._target = null;
    this.context = context;
    this._timerHandler = null;
    this._scrollCancel = null;
    let data;
    if (typeof step === "object") {
      if(!(step.hasOwnProperty("title") && step.hasOwnProperty("content") && step.hasOwnProperty("step"))) {
        throw new Error(
          "invalid step parameter:\n" +
          JSON.stringify(step, null, 2) + "\n" +
          "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach"
        );
      }
      data = step;
      this.selector = step.selector;
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
    this.actiontarget = data.actiontarget;
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
    if (this.target && this.target.offsetParent !== null) {
      const highlight = this.highlight;
      const tooltip = this.tooltip;
      const arrow = this.arrow;

      const highlightPAS = {};
      const tootipPAS = {};
      const arrowPAS = {};

      const targetRect = getBoundingClientRect(this.target, this.context._options.root);
      const tootipRect = getBoundingClientRect(tooltip, this.context._options.root);

      highlightPAS.top = targetRect.top - this.context.options.padding;
      highlightPAS.left = targetRect.left - this.context.options.padding;
      highlightPAS.width = targetRect.width + this.context.options.padding * 2;
      highlightPAS.height = targetRect.height + this.context.options.padding * 2;

      const marginVerticalSize = parseFloat(getStyle(tooltip, "margin-top")) + parseFloat(getStyle(tooltip, "margin-bottom"));
      const marginHorizontalSize = parseFloat(getStyle(tooltip, "margin-left")) + parseFloat(getStyle(tooltip, "margin-right"));

      // Compute vertical position
      if (
        view.height - targetRect.viewBottom > tootipRect.height + marginVerticalSize ||
        targetRect.viewTop < tootipRect.height + marginVerticalSize
      ) {
        tooltip.addClass("guided-tour-arrow-top");
        tootipPAS.top = targetRect.top + targetRect.height;
      } else {
        tooltip.addClass("guided-tour-arrow-bottom");
        tootipPAS.bottom = view.rootHeight - targetRect.top;
      }

      // Compute horizontal position
      if (
        view.width - targetRect.left > tootipRect.width + marginHorizontalSize ||
        targetRect.right < tootipRect.width + marginHorizontalSize
      ) {
        tootipPAS.left = targetRect.left;
        if(targetRect.width / 2 > tootipRect.width) arrowPAS.right = 8;
        else arrowPAS.left = clamp(targetRect.width / 2, 14, tootipRect.width - 14);
      } else {
        tootipPAS.right = view.rootWidth - targetRect.right;
        if(targetRect.width / 2 > tootipRect.width) arrowPAS.left = 18;
        else arrowPAS.right = clamp(targetRect.width / 2 - 8, 14, tootipRect.width - 14);
      }

      setStyle(highlight, highlightPAS);
      setStyle(tooltip, tootipPAS);
      setStyle(arrow, arrowPAS);
      tooltip.first().style.opacity = 0.1;
    } else {
      const highlight = this.highlight;
      const tooltip = this.tooltip;

      const highlightPAS = {};
      const tootipPAS = {};

      highlightPAS.top = 0;
      highlightPAS.left = 0;
      highlightPAS.width = 0;
      highlightPAS.height = 0;

      tootipPAS.top = view.height / 2 + view.scrollY - view.rootTop;
      tootipPAS.left = view.width / 2 + view.scrollX - view.rootLeft;

      tooltip.addClass("guided-tour-arrow-none");
      tooltip.addClass("guided-tour-center");

      setStyle(highlight, highlightPAS);
      setStyle(tooltip, tootipPAS);
      highlight.first().style.boxShadow = "none";
      tooltip.first().style.opacity = 0.1;
      this.context._background.show();
    }
  }
  adjust() {
    const view = getViewportRect(this.context._options.root);

    const tooltip = this.tooltip;
    const rect = getBoundingClientRect(tooltip, this.context._options.root);

    const tootipPAS = {};

    if (rect.viewTop < 0) {
      tootipPAS.top = 8 + view.scrollY;
      tootipPAS.bottom = "unset";
    } else if (rect.viewBottom > view.height) {
      tootipPAS.top = "unset";
      tootipPAS.bottom = view.rootHeight - rect.height - view.scrollY + 8;
    }
    if (rect.viewLeft < 0) {
      tootipPAS.left = 8 + view.scrollX;
      tootipPAS.right = "unset";
    } else if (
      (view.width >= 760 && rect.viewRight + 38 > view.width) ||
      (view.width < 760 && rect.viewRight + 18 > view.width)
    ) {
      tootipPAS.left = "unset";
      tootipPAS.right = view.rootWidth - view.width - view.scrollX + (view.width >= 760 ? 38 : 18);
    }

    setStyle(tooltip, tootipPAS);
    tooltip.first().style.opacity = 1;
  }
  cancel() {
    if(this._timerHandler) clearTimeout(this._timerHandler);
    if(this._scrollCancel) this._scrollCancel();
  }
  show() {
    this.cancel();
    if (!this.visible) {
      const show = () => {
        this.context._background.hide();
        this.el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
        this.position();
        this.adjust();
        this.visible = true;
      };
      if (this.target) {
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
    if (this.visible) {
      this.el.removeClass("active");
      this.tooltip.removeClass("guided-tour-arrow-top");
      this.tooltip.removeClass("guided-tour-arrow-bottom");
      this.visible = false;
      this.context._background.show();
      return true;
    }
    return false;
  }
  toJSON() {
    // eslint-disable-next-line no-undef
    return { index, title, contnet, image, active } = this;
  }
}
