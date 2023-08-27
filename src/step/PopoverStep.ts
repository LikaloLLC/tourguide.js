// import scrollIntoView from "scroll-into-view";
import { StepData, Tour } from "../../@types";
import { Element, U } from "umbrellajs";
import { Alignment } from "@floating-ui/dom";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import Style from "./PopoverStep.scss";
import { Step } from "../abstracts/Step";

export type PopoverLayout = "horizontal" | "vertical";

export interface PopoverStepData extends StepData {
    image: string;
    width?: number;
    height?: number;
    title: string;
    content: string;
    layout: PopoverLayout;
    alignment: Alignment;
    navigation: boolean;
}

const popoverStepDataDefaults: PopoverStepData = {
    layout: "vertical",
    image: "",
    title: "",
    content: "",
    actions: [],
    index: 0,
    selector: undefined,
    navigation: true,
    alignment: "start",
    hidden: false
}

export default class PopoverStep<AdditionalStepData = object> extends Step<PopoverStepData & AdditionalStepData> {
    static Style: string = Style;
    $container!: U;
    $highlight!: U;
    $tooltip!: U;
    $arrow!: U;
    get _image(): U {
        return this.context.helpers.u(`<figure class="guided-tour-step-image">${this.data.image ? `<img src="${this.data.image}" />` : ""}</figure>`);
    }
    get _content(): U {
        const content = this.context.helpers.u(`<div class="guided-tour-step-content-wrapper">
                <div id="tooltip-title-${this.data.index}" role="heading" class="guided-tour-step-title">${this.data.title}</div>
                <div class="guided-tour-step-content">${this.data.content}</div>
            </div>`);
        if (Array.isArray(this.data.actions) && this.data.actions.length > 0) {
            const actions = this.context.helpers.u(`<div class="guided-tour-step-actions">
                    ${this.data.actions
                    .map((action, index) => `<${action.href ? "a" : "button"} id="${action.id}" ${action.href ? `href="${action.href}"` : ""} ${action.target ? `target="${action.target}"` : ""} class="button${action.primary ? " primary" : ""}" data-index="${index}">${action.label}</${action.href ? "a" : "button"}>`)
                    .join("")
                }
                </div>`);
            actions.find("a, button").on("click", (e: Event) => {
                const action = this.data.actions[parseInt((e?.target as any).dataset.index)];
                if (action.action) e.preventDefault();
                this.context.action(e, action);
            });
            content.append(actions);
        }
        return content;
    }
    get _footer(): U {
        return this.context.helpers.u(
            `<div class="guided-tour-step-bullets">
                <ul>${this.context.steps.map((step, i) => `<li>
                    <button title="Go to step ${i + 1}" data-index="${i}" class="${step.index < this.index ? "complete" : step.index == this.index ? "current" : ""}"></button>
                    </li>`).join("")}</ul>
            </div>`
        );
    }
    get _navigation(): U {
        const footer = this.context.helpers.u("<div class=\"guided-tour-step-footer\"></div>");
        if (this.data.navigation)
            footer.append(
                this.context.helpers.u(
                    `<button class="guided-tour-step-button guided-tour-step-button-close" title="End tour">
                        <svg class="guided-tour-icon" viewBox="0 0 20 20" width="16" height="16"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M16,16 L4,4"></path><path d="M16,4 L4,16"></path></g></svg>
                    </button>
                    ${!this.first ? `<button class="guided-tour-step-button guided-tour-step-button-prev" title="Prev step">
                      <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32">
                      <polyline points="12 4 6 10 12 16" fill="none" stroke="currentColor" stroke-width="1"></polyline>
                      </svg>
                    </button>` : ""}
                    ${this.last ? `<button class="guided-tour-step-button guided-tour-step-button-complete" title="Complete tour">
                      <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32">
                      <polyline points="4,10 8,15 17,4" fill="none" stroke="currentColor" stroke-width="1"></polyline>
                      </svg>
                    </button>` : `<button class="guided-tour-step-button guided-tour-step-button-next" title="Next step">
                      <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32">
                      <polyline points="7 4 13 10 7 16" fill="none" stroke="currentColor" stroke-width="1"></polyline>
                      </svg>
                    </button>`}`
                )
            );
        if (this.context.steps.length > 1)
            footer.append(
                this._footer
            );
        footer.find(".guided-tour-step-button-prev").on("click", this.context.previous);
        footer.find(".guided-tour-step-button-next").on("click", this.context.next);
        footer.find(".guided-tour-step-button-close").on("click", this.context.stop);
        footer.find(".guided-tour-step-button-complete").on("click", this.context.complete);
        footer.find(".guided-tour-step-bullets button").on("click", (e: any) => this.context.go(parseInt(this.context.helpers.u(e.target as HTMLElement).data("index"))));
        return footer;
    }
    get _container(): U {
        return this.context.helpers.u(`<div role="dialog" aria-labelleby="tooltip-title-${this.data.index}" class="guided-tour-step${this.first ? " guided-tour-step-first" : ""}${this.last ? " guided-tour-step-last" : ""}"><div class="guided-tour-step-clickblock"></div></div>`);
    }
    get _highlight(): U {
        return this.$highlight = this.context.helpers.u("<div class=\"guided-tour-step-highlight\"></div>");
    }
    get _el(): U {
        if (!this.$container) {
            const tooltip = this.$tooltip = this.context.helpers.u("<div role=\"document\" class=\"guided-tour-step-tooltip\"></div>");
            if (this.data.width) this.context.helpers.Style.setStyle(tooltip, { width: this.data.width + "px", maxWidth: this.data.width + "px" });
            if (this.data.height) this.context.helpers.Style.setStyle(tooltip, { height: this.data.height + "px", maxHeight: this.data.height + "px" });
            const tooltipinner = this.context.helpers.u(`<div class="guided-tour-step-tooltip-inner${this.data.layout === "horizontal" ? " step-layout-horizontal" : ""}"></div>`);
            const container = this.context.helpers.u("<div class=\"guided-tour-step-content-container\"></div>");
            container.append(this._image).append(this._content);
            const arrow = this.$arrow = this.context.helpers.u("<div class=\"guided-tour-arrow\"></div>");
            const navigation = this._navigation;
            tooltipinner
                .append(arrow)
                .append(container).append(navigation);
            tooltip.append(tooltipinner);
            this.$container = this._container;
            this.$container.append(this._highlight).append(tooltip);
        }
        return this.$container;
    }
    constructor(data: PopoverStepData & AdditionalStepData, context: Tour) {
        super(Object.assign({}, popoverStepDataDefaults, data), context);
        this._validate(this.data);
        this._decorate(this.data);
        // this._scrollCancel = null;
        this.data.layout = data.layout;
        if (data.image &&
            context.options.preloadimages &&
            !(/^data:/i.test(data.image))) {
            const preload = new Image();
            preload.onerror = () => {
                console.error(new Error(`Invalid image URL: ${data.image}`));
                this.data.image = "";
            };
            preload.src = this.data.image;
        }

        this.data.actions = [];
        if (data.actions) {
            if (!Array.isArray(data.actions)) {
                console.error(new Error(`actions must be array but got ${typeof data.actions}`));
            } else {
                this.data.actions = data.actions;
            }
        }
    }
    _validate(data: PopoverStepData) {
        this.context.helpers.assert((
            Object.prototype.hasOwnProperty.call(data, "title")
        ),
            "missing required step parameter: title\n" +
            JSON.stringify(data, null, 2) + "\n" +
            "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach"
        );
        this.context.helpers.assert((
            Object.prototype.hasOwnProperty.call(data, "content")
        ),
            "missing required step parameter: content\n" +
            JSON.stringify(data, null, 2) + "\n" +
            "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach"
        );
    }
    _decorate(data: PopoverStepData) {
        data.title = this.context.helpers.decorate(data.title, this);
        data.content = this.context.helpers.decorate(data.content, this);
    }
    _cancel() {
        // if (this._scrollCancel) this._scrollCancel();
    }
    _position($target: U) {
        const _target = $target?.first();
        if (!_target) this.$arrow.addClass("no-arrow ");
        else this.$arrow.removeClass("no-arrow ");
        this.context.helpers.Position.position(
            _target || document.body,
            this.$tooltip?.first() as HTMLElement,
            _target
                ? [
                    this.context.helpers.Position.positionabsolute(),
                    this.context.helpers.Position.autoPlacement({
                        alignment: this.data.alignment,
                        padding: 24
                    }),
                    this.context.helpers.Position.highlight({
                        element: this.$highlight?.first() as HTMLElement,
                        padding: 5
                    }),
                    this.context.helpers.Position.offset,
                    this.context.helpers.Position.arrow({
                        element: this.$arrow?.first() as HTMLElement,
                        padding: 18
                    }),
                    this.context.helpers.Position.keepinview({
                        padding: 24
                    })
                ]
                : [
                    this.context.helpers.Position.positionfixed(),
                    this.context.helpers.Position.highlight({
                        element: this.$highlight?.first() as HTMLElement,
                        centered: true
                    }),
                ]
        );
    }
    attach(parent: Element) {
        this.context.helpers.u(parent).append(this._el);
    }
    show() {
        this._cancel();
        if (!this.active) {
            super.show();
            const $target = this.context.helpers.u(this.data.selector || "null");
            this.context.helpers.Scroll.smoothScroll($target.first() as HTMLElement, { block: "center" }).then(() => {
                this._position($target);
                this.context.helpers.Style.setStyle(this.$container as U, {
                    opacity: 1
                });
                (this.$container?.find(".guided-tour-step-tooltip, button.button, button.primary, .guided-tour-step-button-complete, .guided-tour-step-button-next").last() as any).focus({
                    preventScroll: true
                });
            });
            this._el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
            return true;
        }
        return false;
    }
    hide() {
        this._cancel();
        if (this.active) {
            this.context.helpers.Style.setStyle(this.$container as U, {
                opacity: 0
            });
            this._el.removeClass("active");
            super.hide();
            return true;
        }
        return false;
    }
    remove() {
        this.hide();
        this._el.remove();
    }
}