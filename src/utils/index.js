import u from "umbrellajs";
export * from "./assert";

export function clamp(number, min, max) {
  min = isNaN(min) ? number : min;
  max = isNaN(max) ? number : max;
  return Math.max(min, Math.min(number, max));
}

export function parseNumber(number, parseTo = "float") {
  if (typeof number === "number") return number;
  let ret = 0;
  try {
    if (parseTo === "int") {
      ret = Number.parseInt(number);
    } else {
      ret = Number.parseFloat(number);
    }
  } catch (error) {
    ret = 0;
  }
  if (Number.isNaN(ret)) {
    return 0;
  }
  return ret;
}

export function getDataContents(data = "", defaults = {}) {
  const parts = data.split(";");
  let result = { ...defaults };
  parts.forEach((part) => {
    const entries = (part || "").split(":");
    result[(entries[0] || "").trim()] = (entries[1] || "").trim();
  });
  return result;
}

export function isTargetValid(target) {
  return target && target.offsetParent !== null;
}

/**
 * getting bounding client rect and additional properties
 * @param {Element | string} element target element or selector
 * @param {Element} root root element
 * @returns {{ width: number, height: number, top: number, bottom: number, left: number, right: number, viewTop: number, viewBottom: number, viewLeft: number, viewRight: number }} object
 */
export function getBoundingClientRect(element, root) {
  const rect = u(element).size();
  const view = getViewportRect(root);

  return {
    width: rect.width,
    height: rect.height,
    top: rect.top + view.scrollY,
    bottom: rect.bottom + view.scrollY,
    left: rect.left + view.scrollX,
    right: rect.right + view.scrollX,
    viewTop: rect.top,
    viewBottom: rect.bottom,
    viewLeft: rect.left,
    viewRight: rect.right,
  };
}

/**
 * getting viewport rect and additional properties
 * @param {Element | string} element target element or selector
 * @returns {{ width: number, height: number, scrollX: number, scrollY: number, rootWidth: number, rootHeight: number, rootTop: number, rootLeft: number }} object
 */
export function getViewportRect(element) {
  try {
    const rect = u(element).size();
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      rootWidth: rect.width,
      rootHeight: rect.height,
      rootTop: rect.top,
      rootLeft: rect.left,
    };
  } catch (error) {
    console.error(error);
    throw Error(`element is invalid: ${element}`);
  }
}

/**
 * alternative for jQuery .css() get method
 * @param {Element | string} element target element or selector
 * @param {string} css3Prop css3 property
 * @returns {string} value
 */
export function getStyle(element, css3Prop) {
  const originalEl = u(element).first();

  // FF, Chrome etc.
  if (window.getComputedStyle) {
    try {
      return getComputedStyle(originalEl).getPropertyValue(css3Prop);
    } catch (e) {
      return "";
    }
  } else {
    // IE
    if (originalEl.currentStyle) {
      try {
        return originalEl.currentStyle[css3Prop];
      } catch (e) {
        return "";
      }
    }
  }
  return "";
}

export function setStyle(element, styleObj) {
  Object.keys(styleObj).forEach((key) => {
    if (typeof styleObj[key] === "number") {
      styleObj[key] = Math.floor(styleObj[key]) + "px";
    }
  });
  Object.assign(u(element).first().style, styleObj);
}

/**
 * convert the color object to the sets of css variables
 * @param {Object<string, string | number>} colors color object
 * @param {string} [prefix] prefix of css variable name. default: "--tourguide"
 * @param {string} [selector] target css selector. default: ":root"
 * @returns {string} converted string
 * @example
 *  input: { overlay: "gray", background: "white", bulletCurrent: "red" }
 *  output: ":root { --tourguide-overlay: gray; --tourguide-background: white; --tourguide-bullet-current: red; }"
 */
export function colorObjToStyleVarString(colors, prefix = "--tourguide", selector = ":host") {
  const styleArray = [];
  Object.entries(colors).forEach(([key, value]) => {
    const splitNameArray = [prefix];
    let prevIndex = 0;
    for (let i = 0; i < key.length; i += 1) {
      if ("A" <= key[i] && key[i] <= "Z") {
        splitNameArray.push(key.substring(prevIndex, i).toLowerCase());
        prevIndex = i;
      }
    }
    splitNameArray.push(key.substring(prevIndex, key.length).toLowerCase());
    styleArray.push(`${splitNameArray.join("-")}: ${value}`);
  });
  return `${selector} {\n${styleArray.join(";\n")};\n}`;
}

/**
 * scroll element by coordinates (cross browser support)
 * @param {Element} element target element
 * @param {number} x scroll offset from left
 * @param {number} y scroll offset from top
 */
export function setElementScroll(element, x, y) {
  if (element.self === element) {
    element.scrollTo(x, y);
  } else {
    element.scrollLeft = x;
    element.scrollTop = y;
  }
}

/**
 * Smooth scroll element by coordinates (cross browser support)
 * @param {{ element: Element, x: number, y: number }[]} scrollItems
 * @param {number} time duration time
 */
export function animateScroll(scrollItems, time) {
  const startTime = Date.now();

  function raf(task) {
    if ("requestAnimationFrame" in window) {
      return window.requestAnimationFrame(task);
    }

    setTimeout(task, 16);
  }

  function ease(v) {
    return 1 - Math.pow(1 - v, v / 2);
  }

  function animate(el, x, y) {
    if (!el) {
      console.warn(`target element ${el} not found, skip`);
      return;
    }

    const diffTime = Date.now() - startTime;
    const timeValue = Math.min((1 / time) * diffTime, 1);
    const easeValue = 1 - ease(timeValue);

    const differenceX = x - el.scrollLeft;
    const differenceY = y - el.scrollTop;

    setElementScroll(el, x - differenceX * easeValue, y - differenceY * easeValue);

    if (diffTime >= time) {
      setElementScroll(el, x, y);
      return;
    }

    raf(animate.bind(null, el, x, y));
  }

  scrollItems.forEach((item) => {
    animate(item.element, item.x, item.y);
  });
}

/**
 * Getting scroll coordinates (cross browser support)
 * @param {Element | string} target target element
 * @returns {{ element: Element, x: number, y: number }[]} scrollItems
 */
export function getScrollCoordinates(target) {
  const scrollItems = [];
  let targetUEl = u(target);

  do {
    if (!targetUEl) targetUEl = false;
    if (!targetUEl.first()) targetUEl = false;
    try {
      const element = targetUEl.first();
      if (
        element.scrollHeight !== element.height ||
        element.scrollWidth !== element.width
      ) {
        scrollItems.push({
          element: targetUEl.first(),
          x: targetUEl.first().scrollLeft,
          y: targetUEl.first().scrollTop,
        });
      }
      targetUEl = targetUEl.parent();
    } catch (error) {
      targetUEl = false;
    }
  } while (targetUEl);

  return scrollItems;
}

export function getMaxZIndex() {
  return Math.max(
    ...Array.from(document.querySelectorAll('body *'), el =>
      parseFloat(window.getComputedStyle(el).zIndex),
    ).filter(zIndex => !Number.isNaN(zIndex)),
    0,
  );
}