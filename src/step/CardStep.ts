import { Position } from "../utils/position";
import { Element, U } from "umbrellajs";
import PopoverStep from "./PopoverStep";

interface CardStepData {
    placement: Position.AlignedPlacement
}

export default class CardStep extends PopoverStep<CardStepData> {
    static Type = "card";
    static Style = "";
    get _container() {
        return this.context.helpers.u(`<div role="dialog" aria-labelleby="tooltip-title-${this.data.index}" class="guided-tour-step${this.first ? " guided-tour-step-first" : ""}${this.last ? " guided-tour-step-last" : ""}"></div>`);
    }
    get _highlight() {
        return this.context.helpers.u("<span></span>");
    }
    get _footer() {
        return this.context.helpers.u("<span></span>");
    }
    _position() {
        this.context.helpers.Position.position(
            document.body,
            this.$tooltip?.first() as HTMLElement,
            [
                this.context.helpers.Position.positionfixed({
                    placement: this.data.placement,
                    padding: 25
                }),

            ]
        );
    }
    attach(parent: Element) {
        super.attach(parent);
        if (this.$arrow) {
            this.$arrow.addClass("no-arrow ");
        }
    }
}