import { ActionHandler as ActionHandlerType } from "../types";
export type ActionHandlerFn = (event: any, action: any, context: any) => void;
export default function ActionHandler(name: string, handlerFn: ActionHandlerFn): ActionHandlerType;
