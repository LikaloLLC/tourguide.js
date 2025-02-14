import Tour from ".";

export type ActionHandlerFn = (event: Event, action: TourAction, context: Tour) => void;

export interface ActionHandlerType {
    name: string;
    onAction: ActionHandlerFn;
}

export interface TourAction {
    action: string;
    label: string;
    primary?: boolean;
    href?: string;
    attributes?: Record<string, string>;
    payload?: any;
}

export default function ActionHandler(name: string, handlerFn: ActionHandlerFn): ActionHandlerType;