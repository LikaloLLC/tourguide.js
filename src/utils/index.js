import u from "umbrellajs";

export function clamp(number, min, max) {
  min = isNaN(min) ? number : min;
  max = isNaN(max) ? number : max;
  return Math.max(min, Math.min(number, max));
}

export function getDataContents(data = "", defaults = {}) {
  const parts = data.split(";");
  let result = { ...defaults };
  parts.forEach(part => {
    const entries = (part || "").split(":");
    result[(entries[0] || "").trim()] = (entries[1] || "").trim();
  });
  return result;
}

export function getBoundingClientRect(el) {
  const rect = u(el).size();
  const view = getViewportRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    viewtop: rect.top - view.scrollY,
    viewbottom: rect.bottom - view.scrollY,
    viewleft: rect.left - view.scrollX,
    viewright: rect.right - view.scrollX
  };
}

export function getViewportRect() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    bodyWidth: document.body.clientWidth,
    bodyHeight: document.body.clientHeight
  };
}

export const isMobile = false;