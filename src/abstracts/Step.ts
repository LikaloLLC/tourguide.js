import { Element } from "umbrellajs";
import {GUID} from "../utils/guid";
import Tour, { AbstractStep, StepData } from "@types";

/**
 * Represents an abstract step in a tour. 
 * This is an interface that defines the basic structure and properties
 * for all steps within a tour. It includes properties such as id (a unique identifier), title, description, element
 * to highlight (which should be an instance of Element from umbrellajs), and a callback function that will execute
 * when the step is completed. This abstract class can be extended to create additional step types, each with their
 * own specific properties and behaviors, allowing for customization based on different user experiences or application needs.
 */
export abstract class Step<StepDataType = StepData> implements AbstractStep<StepDataType> {
  /**
   * The type of the step, defaults to "default".
   */
  static Type = "default";
  /**
   * The style or appearance of the step, represented as a string.
   */
  static Style = "";
  /**
   * A unique identifier for the step, generated using GUID().
   */
  readonly uid: string = GUID();
  /**
   * The context in which the step is placed, typically a Tour object.
   */
  context: Tour;
  /**
   * The index of the step within its container.
   */
  index = 0;
  /**
   * Indicates whether the step is currently active.
   */
  active = false;
  /**
   * Indicates whether the step is the first in its sequence.
   */
  first = false;
  /**
   * Indicates whether the step is the last in its sequence.
   */
  last = false;
  /**
   * The data associated with the step, which must be provided when creating a new instance.
   */
  data!: StepDataType;
  constructor(data: StepDataType, context: Tour) {
    this.data = data;
    this.context = context;
  }
  /**
   * Attaches the step to a parent element in the DOM. This method must be implemented by concrete subclasses.
   */
  abstract attach(parent: Element): void;
  /**
   * Shows the step, setting its active state to true if it is not already active.
   */
  show() {
    !this.active && (this.active = true);
  }
  /**
   * Hides the step, setting its active state to false if it is currently active.
   */
  hide() {
    this.active && (this.active = false);
  }
  /**
   * Removes the step from its parent element in the DOM. This method must be implemented by concrete subclasses.
   */
  abstract remove(): void;
}