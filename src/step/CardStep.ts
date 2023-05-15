import { AlignedPlacement } from "../utils/position";
import PopoverStep from "./PopoverStep";

import Style from "./PopoverStep.scss";

interface CardStepData {
    placement: AlignedPlacement
}

export default class CardStep extends PopoverStep<CardStepData> {
    static Type: string = "card";
    static Style: string = Style;
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
        this.context.helpers.position(
            document.body,
            this.$tooltip?.first(),
            [
                this.context.helpers.positionfixed({
                    placement: this.data.placement,
                    padding: 25
                }),

            ]
        );
    }
}