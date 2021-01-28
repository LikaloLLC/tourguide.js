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
    top: rect.top + view.scrollY,
    bottom: rect.bottom + view.scrollY,
    left: rect.left + view.scrollX,
    right: rect.right + view.scrollX,
    viewtop: rect.top,
    viewbottom: rect.bottom,
    viewleft: rect.left,
    viewright: rect.right,
  };
}

export function getViewportRect() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
    bodyWidth: document.body.clientWidth,
    bodyHeight: document.body.clientHeight
  };
}

// { top, left, right, bottom, width, height }
export function setPosAndSize(uEl, object) {
  if(!Object.prototype.toString.call(object) === "[object Object]") return;
  if(Object.entries(object).length === 0) return;

  const originalEl = uEl.first();
  const styleStr = Object.entries(object).reduce((str, [key, value]) => {
    let s = str;
    s += key;
    s += ": ";
    if(typeof value === "number")
      s += `${value}px`;
    else
      s += value;
    s += ";";

    return s;
  }, "");
  originalEl.setAttribute("style", styleStr);
}

export const isMobile = false;