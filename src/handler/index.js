export default class ActionHandler {
    constructor(name, handlerFn) {
        this.name = name;
        this.onAction = handlerFn;
    }
}