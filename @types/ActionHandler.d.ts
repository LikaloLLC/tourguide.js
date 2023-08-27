import Tour from ".";

export type ActionHandlerFn = (event: Event, action: TourAction, context: Tour) => void;

export interface ActionHandlerType {
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

export default function ActionHandler(name: string, handlerFn: ActionHandlerFn): ActionHandlerType;