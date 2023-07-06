/// <reference path="../../src/types/umbrellajs.d.ts" />
import { Position } from "../utils/position";
import PopoverStep from "./PopoverStep";
interface CardStepData {
    placement: Position.AlignedPlacement;
}
export default class CardStep extends PopoverStep<CardStepData> {
    static Type: string;
    static Style: string;
    get _container(): import("umbrellajs").U;
    get _highlight(): import("umbrellajs").U;
    get _footer(): import("umbrellajs").U;
    _position(): void;
}
export {};
