import u from "umbrellajs";
import scrollIntoView from "scroll-into-view";
import {
  clamp,
  getDataContents,
  getBoundingClientRect,
  isTargetValid,
  getViewportRect,
  setStyle,
  assert,
  // getStyle,
  // parseNumber,
} from "../utils";
import {
  computePosition,
  offset,
  arrow,
  // shift,
  flip,
  // detectOverflow
  autoPlacement
} from '@floating-ui/dom';
import snarkdown from "snarkdown";

const keepinview = ({ padding = 0 }) => ({
  name: "keepinview",
  fn({ x, y, rects, middlewareData, platform }) {
    const documentDimentions = platform.getDimensions(document.body);
    const _x = clamp(x, padding, documentDimentions.width - rects.floating.width - padding);
    const _y = clamp(y, padding, documentDimentions.height - rects.floating.height - padding);
    const dx = x - _x;
    const dy = y - _y;
    const { arrow } = middlewareData;
    if (arrow) {
      if (arrow.x && dx) arrow.x += dx;
      if (arrow.y && dy) arrow.y += dy;
    }
    return { x: _x, y: _y };
  }
});

function positionTooltip(target, tooltipEl, arrowEl, context) {
  //context._options.root
  computePosition(
    target, tooltipEl, {
    // placement: 'bottom-start',
    middleware: [
      // flip(),
      autoPlacement({
        alignment: 'bottom-start',
      }),
      offset((props) => {
        const side = props.placement.split("-")[0];
        switch (side) {
          case "top":
            return 32;
          case "left":
          case "right":
            return 24;
          default: return 6;
        }
      }), arrow({
        element: arrowEl,
        padding: 8
      }), keepinview({
        padding: 24
      })],
  }
  ).then(({ x, y, middlewareData, placement }) => {
    setStyle(tooltipEl, {
      left: `${x}px`,
      top: `${y}px`,
    });
    if (middlewareData.arrow) {
      const side = placement.split("-")[0];
      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[side];
      setStyle(arrowEl, {
        left: middlewareData.arrow.x != null ? `${middlewareData.arrow.x}px` : '',
        top: middlewareData.arrow.y != null ? `${middlewareData.arrow.y}px` : '',
        right: "",
        bottom: "",
        [staticSide]: `${-arrowEl.offsetWidth / 2}px`,
      });
    }
  });
}

export default class Step {
  get el() {
    if (!this.container) {
      const image = u(`<div role="figure" class="guided-tour-step-image">${this.image ? `<img src="${this.image}" />` : ""}</div>`);
      const content = u(`<div class="guided-tour-step-content-wrapper">
        <div id="tooltip-title-${this.index}" role="heading" class="guided-tour-step-title">${this.context._decorateText(this.title, this)}</div>
        <div class="guided-tour-step-content">${this.context._decorateText(this.content, this)}</div>
      </div>`);
      content.find('a').on('click', e => {
        this.context.action(e, { action: "link" });
      });
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
      const tooltip = this.tooltip = u("<div role=\"document\" class=\"guided-tour-step-tooltip\"></div>");
      if (this.width) setStyle(tooltip, { width: this.width + "px", maxWidth: this.width + "px" });
      if (this.height) setStyle(tooltip, { height: this.height  + "px", maxHeight: this.height  + "px" });
      const tooltipinner = u(`<div class="guided-tour-step-tooltip-inner${this.layout === "horizontal" ? " step-layout-horizontal" : ""}"></div>`);
      const container = u(`<div class="guided-tour-step-content-container"></div>`);
      container.append(image).append(content);
      const arrow = this.arrow = u(`<div class="guided-tour-arrow"></div>`);
      if (this.navigation) {
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
      } else tooltipinner.append(arrow).append(container);
      tooltip.append(tooltipinner);
      this.container = u(`<div role="dialog" aria-labelleby="tooltip-title-${this.index}" class="guided-tour-step${this.first ? " guided-tour-step-first" : ""}${this.last ? " guided-tour-step-last" : ""}"></div>`);
      if (this.overlay && isTargetValid(this.target)) {
        const highlight = this.highlight = u("<div class=\"guided-tour-step-highlight\"></div>");
        this.container.append(highlight).append(tooltip);
      } else this.container.append(tooltip);
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
      data = step;
      this._selector = step.selector;
    } else {
      this.target = step;
      data = getDataContents(u(step).data("tour"));
    }

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

    this.index = parseInt(data.step);
    this.title = data.title;
    this.content = snarkdown(data.content);
    this.image = data.image;
    this.width = data.width;
    this.height = data.height;
    this.layout = data.layout || "vertical";
    this.placement = data.placement || "bottom";
    this.overlay = data.overlay !== false;
    this.navigation = data.navigation !== false;
    if (data.image &&
      context.options.preloadimages &&
      !(/^data:/i.test(data.image))) {
      const preload = new Image();
      // preload.onload = (e) => {
      // };
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
    // this.adjust = this.adjust.bind(this);
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
    const tooltip = this.tooltip;
    const highlight = this.highlight;
    let highlightStyle = {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    };

    if (isTargetValid(this.target)) {
      if (this.overlay && this.highlight) {
        const targetRect = getBoundingClientRect(this.target, this.context._options.root);
        highlightStyle.top = `${targetRect.top - this.context.options.padding}px`;
        highlightStyle.left = `${targetRect.left - this.context.options.padding}px`;
        highlightStyle.width = `${targetRect.width + this.context.options.padding * 2}px`;
        highlightStyle.height = `${targetRect.height + this.context.options.padding * 2}px`;
        setStyle(highlight, highlightStyle);
      }
      positionTooltip(this.target, tooltip.first(), this.arrow.first(), this.context);
    } else {
      if (this.overlay && this.highlight) setStyle(highlight, highlightStyle);

      const tootipStyle = {};
      const tooltipRect = getBoundingClientRect(tooltip, this.context._options.root);
      tootipStyle.top = view.height / 2 + view.scrollY - view.rootTop - (tooltipRect.height / 2);
      tootipStyle.left = view.width / 2 + view.scrollX - view.rootLeft - (tooltipRect.width / 2);
      tootipStyle.bottom = "unset";
      tootipStyle.right = "unset";
      tooltip.addClass("guided-tour-arrow-none");
      setStyle(tooltip, tootipStyle);
      if (this.overlay) this.context._overlay.show();
    }
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
        this.active = true;
        this.container.find(".guided-tour-step-tooltip, button.primary, .guided-tour-step-button-complete, .guided-tour-step-button-next").last().focus({
          preventScroll: true
        });
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
