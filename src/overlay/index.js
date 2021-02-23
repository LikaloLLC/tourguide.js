import u from "umbrellajs";

export default class Overlay {
  get el() {
    if (!this.container) {
      this.container = u("<div role=\"dialog\" class=\"guided-tour-overlay\"></div>");
    }
    return this.container;
  }
  constructor(context) {
    this.context = context;
    this.container = null;
    this.active = false;
  }
  attach(root) {
    u(root).append(this.el);
  }
  remove() {
    this.hide();
    this.el.remove();
  }
  show() {
    if (!this.active) {
      this.el.addClass("active");
      this.active = true;
      return true;
    }
    return false;
  }
  hide() {
    if (this.active) {
      this.el.removeClass("active");
      this.active = false;
      return true;
    }
    return false;
  }
  toJSON() {
    const { active } = this;
    return { active };
  }
}
