import PopoverBaseStep from "./PopoverStep";
import {
    assert,
} from "../utils";

export default class ActionStep extends PopoverBaseStep {
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
    constructor(data, context) {
        super(data, context);
        this.alignment = data.alignment || context.options.alignment || ActionStep.defaults.alignment;
        this._onAction = this._onAction.bind(this);
    }
    _validate(data) {
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
    }
    _onAction(e) {
        this.context.next();
    }
    show() {
      const result = super.show();
      if (result) document.addEventListener("click", this._onAction);
      return result;
    }
    hide() {
      const result = super.hide();
      if (result) document.removeEventListener("click", this._onAction);
      return result;
    }
}
ActionStep.defaults = {
    alignment: "bottom-start",
};
ActionStep.type = "action";