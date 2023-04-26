export default class BaseStep {
  constructor(data, context) {
    Object.assign(this, data);
    this.context = context;
    this.active = false;
    this.first = false;
    this.last = false;
  }
  attach() {
    // STUB
    console.info("Step attach", this.index);
  }
  show() {
    // STUB
    console.info("Step show", this.index);
  }
  hide() {
    // STUB
    console.info("Step hide", this.index);
  }
  remove() {
    // STUB
    console.info("Step remove", this.index);
  }
  toJSON() {
    const { index, active } = this;
    return { index, active };
  }
}
BaseStep.type = "default";