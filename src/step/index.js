import u from "umbrellajs";
// import scrollIntoView from "scroll-into-view";
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
import snarkdown from "snarkdown";
// data-step="title: Step1; content: .../<>"

// function getEventType(event) {
//   let eventType = "";
//   if (typeof event === "string") {
//     eventType = event;
//   } else if (typeof event === "object") {
//     eventType = event.type;
//   }

//   return eventType;
// }

// function getEventAttrs(event) {
//   if (typeof event === "object") {
//     return Object.entries(event)
//       .map(([key, value]) => ({ key, value }));
//   }

//   return [];
// }

// function getPosition(align) {
//   if (align === "top") return 0.1;
//   if (align === "bottom") return 0.9;
//   if (align === "center") return 0.5;

//   return 0;
// }

export default class Step {
  get el() {
    if (!this.container) {
      const image = u(`<div role="figure" class="guided-tour-step-image">${this.image ? `<img src="${this.image}" />` : ""}</div>`);
      const content = u(`<div class="guided-tour-step-content-wrapper">
        <div id="tooltip-title-${this.index}" role="heading" class="guided-tour-step-title">${this.context._decorateText(this.title, this)}</div>
        <div class="guided-tour-step-content">${this.context._decorateText(this.content, this)}</div>
      </div>`);
      if (Array.isArray(this.actions) && this.actions.length > 0) {
        const actions = u(`<div class="guided-tour-step-actions">
          ${this.actions
            .map((action, index) => `<${action.href ? "a" : "button"} id="${action.id}" ${action.href ? `href="${action.href}"` : ""} ${action.target ? `target="${action.target}"` : ""} class="button${action.primary ? " primary" : ""}" data-index="${index}">${action.label}</${action.href ? "a" : "button"}>`)
            .join("")
          }
        </div>`);
        actions.find('a, button').on('click', e => {
          const action = this.actions[parseInt(e.target.dataset.index)];
          if (action.action) e.preventDefault();
          this.context.action(e, action);
        });
        content.append(actions);
      }
      const highlight = this.highlight = u("<div class=\"guided-tour-step-highlight\"></div>");
      const tooltip = this.tooltip = u("<div role=\"document\" class=\"guided-tour-step-tooltip\"></div>");
      const tooltipinner = u(`<div class="guided-tour-step-tooltip-inner${this.layout === "horizontal" ? " step-layout-horizontal" : ""}"></div>`);
      const container = u(`<div class="guided-tour-step-content-container"></div>`);
      container.append(image).append(content);

      if (this.navigation) {
        const arrow = this.arrow = u("<div aria-hidden=\"true\" class=\"guided-tour-arrow\"><div aria-hidden=\"true\" class=\"guided-tour-arrow-inner\"></div></div>");
        const footer = u(`<div class="guided-tour-step-footer">
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
                  ${this.context._steps.length > 1 ? `<div class="guided-tour-step-bullets">
                      <ul>${this.context._steps.map((step, i) => `<li><button title="Go to step ${i + 1}" data-index="${i}" class="${step.index < this.index ? "complete" : step.index == this.index ? "current" : ""}"></button></li>`).join("")}</ul>
                  </div>` : ""}
              </div>`);
        footer.find(".guided-tour-step-button-prev").on("click", this.context.previous);
        footer.find(".guided-tour-step-button-next").on("click", this.context.next);
        footer.find(".guided-tour-step-button-close").on("click", this.context.stop);
        footer.find(".guided-tour-step-button-complete").on("click", this.context.complete);
        footer.find(".guided-tour-step-bullets button").on("click", (e) => this.context.go(parseInt(u(e.target).data("index"))));
        tooltipinner.append(arrow).append(container).append(footer);
      } else tooltipinner.append(container);
      tooltip.append(tooltipinner);
      this.container = u(`<div role="dialog" aria-labelleby="tooltip-title-${this.index}" class="guided-tour-step${this.first ? " guided-tour-step-first" : ""}${this.last ? " guided-tour-step-last" : ""}"></div>`);
      this.container.append(highlight).append(tooltip);
    }
    return this.container;
  }
  get target() {
    return this._target || this._selector && u(this._selector).first();
  }
  set target(target) {
    this._target = target;
  }
  constructor(step, context) {
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
      if (!(step.hasOwnProperty("title") && step.hasOwnProperty("content") && step.hasOwnProperty("step"))) {
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
    this.content = snarkdown(data.content);
    this.image = data.image;
    this.width = data.width;
    this.height = data.height;
    this.layout = data.layout || "vertical";
    this.align = data.align || "auto";
    this.overlay = data.overlay !== false;
    this.navigation = data.navigation !== false;
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
    if (data.actions) {
      if (!Array.isArray(data.actions)) {
        console.error(new Error(`actions must be array but got ${typeof data.actions}`));
      } else {
        this.actions = data.actions;
      }
    }
    this.adjust = this.adjust.bind(this);
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
      const tooltipRect = getBoundingClientRect(tooltip, this.context._options.root);

      if(this.width) highlightStyle.width = tooltipRect.width = this.width;
      if(this.height) highlightStyle.height = tooltipRect.height = this.height;

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
        view.height - targetRect.viewBottom > tooltipRect.height + marginVerticalSize ||
        targetRect.viewTop < tooltipRect.height + marginVerticalSize
      ) {
        tootipStyle.top = targetRect.top + targetRect.height;
        // tootipStyle.bottom = "unset";
        tooltip.addClass("guided-tour-arrow-top");
        tooltipBRL = parseNumber(getStyle(tooltip, "border-top-left-radius"));
        tooltipBRR = parseNumber(getStyle(tooltip, "border-top-right-radius"));
      } else {
        tootipStyle.top = targetRect.top - tooltipRect.height - marginVerticalSize;
        // tootipStyle.bottom = "unset";
        tooltip.addClass("guided-tour-arrow-bottom");
        tooltipBRL = parseNumber(getStyle(tooltip, "border-bottom-left-radius"));
        tooltipBRR = parseNumber(getStyle(tooltip, "border-bottom-right-radius"));
      }
      // Adjust vertical position
      if (tootipStyle.top + tooltipRect.height > view.rootHeight) {
        tootipStyle.top = view.rootHeight - tooltipRect.height - marginVerticalSize;
      }

      const arrowRect = getBoundingClientRect(arrow, this.context._options.root);

      // Compute horizontal position
      if (
        view.width - targetRect.left > tooltipRect.width + marginHorizontalSize ||
        targetRect.right < tooltipRect.width + marginHorizontalSize
      ) {
        tootipStyle.left = targetRect.left;
        // tootipStyle.right = "unset";
        if (targetRect.width / 2 > tooltipRect.width) arrowStyle.right = 8;
        else arrowStyle.left = clamp(targetRect.width / 2, tooltipBRL + 2, tooltipRect.width - arrowRect.width - tooltipBRR - 2);
      } else {
        tootipStyle.left = targetRect.right - tooltipRect.width;
        // tootipStyle.right = "unset";
        if (targetRect.width / 2 > tooltipRect.width) arrowStyle.left = 18;
        else arrowStyle.right = clamp(targetRect.width / 2, tooltipBRR + 2, tooltipRect.width - arrowRect.width - tooltipBRL - 2);
      }

      setStyle(highlight, highlightStyle);
      setStyle(tooltip, tootipStyle);
      setStyle(arrow, arrowStyle);
      // tooltip.first().style.opacity = 0.1;
    } else {
      const highlight = this.highlight;
      const tooltip = this.tooltip;

      const tooltipRect = getBoundingClientRect(tooltip, this.context._options.root);

      const highlightStyle = {};
      const tootipStyle = {};

      highlightStyle.top = 0;
      highlightStyle.left = 0;
      highlightStyle.width = 0;
      highlightStyle.height = 0;

      tootipStyle.top = view.height / 2 + view.scrollY - view.rootTop - (tooltipRect.height / 2);
      tootipStyle.left = view.width / 2 + view.scrollX - view.rootLeft - (tooltipRect.width / 2);
      tootipStyle.bottom = "unset";
      tootipStyle.right = "unset";

      tooltip.addClass("guided-tour-arrow-none");

      setStyle(highlight, highlightStyle);
      setStyle(tooltip, tootipStyle);
      highlight.first().style.boxShadow = "none";
      // tooltip.first().style.opacity = 0.1;
      if (this.overlay) this.context._overlay.show();
    }
  }
  adjust() {
    const view = getViewportRect(this.context._options.root);

    const tooltip = this.tooltip;

    const tooltipRect = getBoundingClientRect(tooltip, this.context._options.root);

    const tootipStyle = {};

    if(this.width) tootipStyle.width = tooltipRect.width = this.width;
    if(this.height) tootipStyle.height = tooltipRect.height = this.height;
    if (tooltipRect.viewTop < 8) {
      tootipStyle.top = 8;
    } else if (tooltipRect.viewTop + tooltipRect.height + 8 > view.rootHeight) {
      tootipStyle.top = view.rootHeight - tooltipRect.height - 8;
    }
    if (tooltipRect.viewLeft < 42) {
      tootipStyle.left = 32;
    } else if (tooltipRect.viewLeft + tooltipRect.width + 42 > view.rootWidth) {
      tootipStyle.left = view.rootWidth - tooltipRect.width - 32;
    }

    setStyle(tooltip, tootipStyle);
    requestAnimationFrame(() => tooltip.first().scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest"
    }));
    // tooltip.first().style.opacity = 1;
  }
  cancel() {
    if (this._timerHandler) clearTimeout(this._timerHandler);
    if (this._scrollCancel) this._scrollCancel();
  }
  show() {
    this.cancel();
    if (!this.active) {
      const show = () => {
        this.el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
        this.context._overlay.hide();
        this.position();
        this.adjust();
        if (this.navigation)
          this.container.find(".guided-tour-step-button-next, .guided-tour-step-button-complete").first().focus();
        this.active = true;
      };
      if (isTargetValid(this.target)) {
        this.target.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest"
        });
        //   this._scrollCancel = scrollIntoView(this.target, {
        //     time: this.context.options.animationspeed,
        //     cancellable: false,
        //     align: {
        //       top: getPosition(this.context.options.align),
        //       left: 0.5
        //     }
        //   }, show);
      }
      // else 
      this._timerHandler = setTimeout(show, this.context.options.animationspeed);
      return true;
    }
    return false;
  }
  hide() {
    this.cancel();
    if (this.active) {
      this.el.removeClass("active");
      this.tooltip.removeClass("guided-tour-arrow-top");
      this.tooltip.removeClass("guided-tour-arrow-bottom");
      if (this.overlay) this.context._overlay.show();
      this.active = false;
      return true;
    }
    return false;
  }
  toJSON() {
    const { index, title, content, image, active } = this;
    return { index, title, content, image, active };
  }
}
