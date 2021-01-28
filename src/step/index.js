import u from "umbrellajs";
import scrollIntoView from "scroll-into-view";
import { clamp, getDataContents, getBoundingClientRect, getViewportRect, setPosAndSize } from "../utils";
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
    this.actiontarget = data.actiontarget;
    this.image = data.image;
    if (data.image &&
      context.options.preloadimages &&
      !(/^data:/i.test(data.image))) {
      const preload = new Image();
      // preload.onload = (e) => {
      // };
      preload.onerror = () => {
        this.image = null;
      };
      preload.src = this.image;
    }
  }
  attach(root = "body") {
    u(root).append(this.el);
  }
  remove() {
    this.hide();
    this.el.remove();
  }
  position() {
    const view = getViewportRect();
    // {"left":0,"right":400,"top":0,"height":300,"bottom":300,"width":400}
    if (this.target && this.target.offsetParent !== null) {
      const highlight = this.highlight;
      const tooltip = this.tooltip;
      const arrow = this.arrow;

      const highlightPAS = {};
      const tootipPAS = {};
      const arrowPAS = {};

      const rect = getBoundingClientRect(this.target);

      highlightPAS.top = rect.top - this.context.options.padding;
      highlightPAS.left = rect.left - this.context.options.padding;
      highlightPAS.width = rect.width + this.context.options.padding * 2;
      highlightPAS.height = rect.height + this.context.options.padding * 2;

      // Compute vertical position
      if (view.height / 2 > (rect.viewtop + rect.viewbottom) / 2) {
        tooltip.addClass("guided-tour-arrow-top");
        tootipPAS.top = rect.top + rect.height;
      } else {
        tooltip.addClass("guided-tour-arrow-bottom");
        tootipPAS.bottom = view.bodyHeight - rect.top;
      }
      // Compute horizontal position
      if (view.width / 2 > (rect.viewleft + rect.viewright) / 2) {
        tootipPAS.left = rect.left;
        arrowPAS.left = (rect.width > 400) ? 18 : clamp(rect.width / 2, 14, 386);
      } else {
        tootipPAS.right = Math.max(view.width - rect.viewright, 40) + view.scrollX;
        arrowPAS.right = ((view.width - rect.viewright) < 40 || (rect.width > 400)) ? 8 : clamp(rect.width / 2 - 8, 14, 386);
      }

      setPosAndSize(highlight, highlightPAS);
      setPosAndSize(tooltip, tootipPAS);
      setPosAndSize(arrow, arrowPAS);
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

      tootipPAS.top = view.height / 2 + view.scrollY;
      tootipPAS.left = view.width / 2 + view.scrollX;

      tooltip.addClass("guided-tour-arrow-none");
      tooltip.addClass("guided-tour-center");

      setPosAndSize(highlight, highlightPAS);
      setPosAndSize(tooltip, tootipPAS);
      highlight.first().style.boxShadow = "none";
      tooltip.first().style.opacity = 0.1;
      this.context._background.show();
    }
  }
  adjust() {
    const view = getViewportRect();

    const tooltip = this.tooltip;
    const rect = getBoundingClientRect(tooltip);

    const tootipPAS = {};

    if (rect.viewtop < 0) {
      tootipPAS.top = 8 + view.scrollY;
      tootipPAS.bottom = "none";
    } else if (rect.viewbottom > view.height) {
      tootipPAS.top = "none";
      tootipPAS.bottom = view.bodyHeight - rect.height - view.scrollY + 8;
    }
    if (rect.viewleft < 0) {
      tootipPAS.left = 8 + view.scrollX;
      tootipPAS.right = "none";
    } else if (rect.viewright > view.width) {
      tootipPAS.left = "none";
      tootipPAS.right = view.bodyWidth - view.width - view.scrollX + 8;
    }

    setPosAndSize(tooltip, tootipPAS);
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
        this.position();
        this.el.addClass("active");
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
