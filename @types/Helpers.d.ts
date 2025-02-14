import u from "umbrellajs";
import { AbstractStep } from "./Step";
import { Color, Position, Scroll, Style } from "../src/utils";

export type Helpers = {
    assert(condition: any, message: string): boolean;
    clamp(value: number, min: number, max?: number): number;
    decorate(text: string, step: AbstractStep): string;
    getMaxZIndex(): number;
    Color: typeof Color;
    Style: typeof Style;
    Scroll: typeof Scroll;
    Position: typeof Position;
    u: typeof u;
};