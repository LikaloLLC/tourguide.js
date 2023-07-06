import u from "umbrellajs";
import { Color, Style, Scroll, Position } from "../utils";
import { Step } from "./Step";

export type Helpers = {
    assert(condition: any, message: string): boolean;
    clamp(value: number, min: number, max?: number): number;
    decorate(text: string, step: Step): string;
    getMaxZIndex(): number;
    Color: typeof Color;
    Style: typeof Style;
    Scroll: typeof Scroll;
    Position: typeof Position;
    u: typeof u;
};