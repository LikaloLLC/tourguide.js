import { Element } from "umbrellajs";
import { Tour } from "./Tour";
import { TourAction } from "./ActionHandler";
export interface StepData {
    type?: string;
    index: number;
    hidden: boolean;
    selector: string | null | undefined;
    actions: Array<TourAction>;
}
export declare abstract class Step<StepDataType = StepData> {
    static Type: string;
    static Style: string;
    context: Tour;
    index: number;
    active: boolean;
    first: boolean;
    last: boolean;
    data: StepDataType;
    constructor(data: StepDataType, context: Tour);
    abstract attach(parent: Element): void;
    show(): void;
    hide(): void;
    abstract remove(): void;
}
