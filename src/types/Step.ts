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

export abstract class Step<StepDataType = StepData> {
    static Type: string = "default";
    static Style: string = "";
    context: Tour;
    index: number = 0;
    active: boolean = false;
    first: boolean = false;
    last: boolean = false;
    data!: StepDataType;
    constructor(data: StepDataType, context: Tour) {
      this.data = data;
      this.context = context;
    }
    abstract attach(parent: Element): void;
    show() {
      !this.active && (this.active = true);
    }
    hide() {
      this.active && (this.active = false);
    }
    abstract remove(): void;
  }