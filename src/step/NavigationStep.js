import BaseStep from "./BaseStep";

export default class NavigationStep extends BaseStep {
    constructor(data, context) {
        super(data, context);
    }
    show() {
        this.context.next();
        requestAnimationFrame(() =>
            window.location = this.target
        );
    }
}
NavigationStep.type = "navigate";