import { ActionHandler as ActionHandlerType, Tour, TourAction } from "../types";
export type ActionHandlerFn = (event: Event, action: TourAction, context: Tour) => void;
export default function ActionHandler(name: string, handlerFn: ActionHandlerFn): ActionHandlerType;