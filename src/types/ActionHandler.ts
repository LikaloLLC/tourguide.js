import { Tour } from "./Tour";

export type ActionHandlerFn = (event: Event, action: TourAction, context: Tour) => void;

export interface ActionHandler {
    name: string;
    onAction: ActionHandlerFn;
}

export interface TourAction {
    action: string;
    label: string;
    href?: string;
    id?: string;
    target?: string;
    primary?: boolean;
}