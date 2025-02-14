import { Element } from "umbrellajs";
import {GUID} from "../utils/guid";
import Tour, { AbstractStep, StepData } from "../../@types";

export abstract class Step<StepDataType = StepData> implements AbstractStep<StepDataType> {
  static Type = "default";
  static Style = "";
  readonly uid: string = GUID();
  context: Tour;
  index = 0;
  active = false;
  first = false;
  last = false;
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