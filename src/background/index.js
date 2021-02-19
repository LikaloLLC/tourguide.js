import u from "umbrellajs";

export default class Step {
  get el() {
    if (!this.container) {
      this.container = u("<div role=\"dialog\" class=\"guided-tour-background\"></div>");
    }
    return this.container;
  }
  constructor(context) {
    this.container = null;
    this.active = false;
    this.context = context;
  }
  attach(root) {
    u(root).append(this.el);
  }
  remove() {
    this.hide();
    this.el.remove();
  }
  show() {
    if (!this.visible) {
      this.el.addClass("active");
      this.visible = true;
      return true;
    }
    return false;
  }
  hide() {
    if (this.visible) {
      this.el.removeClass("active");
      this.visible = false;
      return true;
    }
    return false;
  }
  toJSON() {
    // eslint-disable-next-line no-undef
    return { active } = this;
  }
}
