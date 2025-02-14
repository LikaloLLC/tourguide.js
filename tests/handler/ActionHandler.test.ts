import ActionHandler, { ActionHandlerFn } from "../../src/handler/ActionHandler";
import Tour, { TourAction } from "@types";

describe("ActionHandler", () => {
    let mockEvent: Event;
    let mockContext: Tour;
    let mockAction: TourAction;
    let handlerFn: ActionHandlerFn;

    beforeEach(() => {
        mockEvent = new Event("test");
        mockContext = {} as Tour;
        mockAction = {} as TourAction;
        handlerFn = jest.fn();
    });

    it("should call the handler function with event and action", () => {
        const actionHandler = ActionHandler("test", handlerFn);
        actionHandler.onAction(mockEvent, mockAction, mockContext);
        expect(handlerFn).toHaveBeenCalledWith(mockEvent, mockAction, mockContext);
    });
});