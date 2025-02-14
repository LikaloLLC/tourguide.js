import Tour, { ActionHandlerType, TourAction } from "@types";

export type ActionHandlerFn = (event: Event, action: TourAction, context: Tour) => void;

/**
 * Generates a function that creates an ActionHandler object for use in a tour.
 *
 * @param name - The unique identifier for the action handler.
 * @param handlerFn - The function that will handle the actions defined by the tour.
 * @returns An ActionHandlerType object containing the name and the onAction method.
 */
export default function ActionHandler(name: string, handlerFn: ActionHandlerFn): ActionHandlerType {
    return {
        name,
        onAction: handlerFn
    };
}