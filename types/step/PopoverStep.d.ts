import { Step, StepData, Tour } from "../types";
import { Element, U } from "umbrellajs";
import { Alignment } from "@floating-ui/dom";
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
export default class PopoverStep<AdditionalStepData = {}> extends Step<PopoverStepData & AdditionalStepData> {
    static Style: string;
    $container: U;
    $highlight: U;
    $tooltip: U;
    get _image(): U;
    get _content(): U;
    get _footer(): U;
    get _navigation(): U;
    get _container(): U;
    get _highlight(): U;
    get _el(): U;
    constructor(data: PopoverStepData & AdditionalStepData, context: Tour);
    _validate(data: PopoverStepData): void;
    _decorate(data: PopoverStepData): void;
    _cancel(): void;
    _position($target: U): void;
    attach(parent: Element): void;
    show(): boolean;
    hide(): boolean;
    remove(): void;
}
