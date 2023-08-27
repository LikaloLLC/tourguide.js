function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var umbrella_min = {exports: {}};

/* Umbrella JS 3.3.0 umbrellajs.com */

(function (module) {
var u=function(t,e){return this instanceof u?t instanceof u?t:((t="string"==typeof t?this.select(t,e):t)&&t.nodeName&&(t=[t]),void(this.nodes=this.slice(t))):new u(t,e)};u.prototype={get length(){return this.nodes.length}},u.prototype.nodes=[],u.prototype.addClass=function(){return this.eacharg(arguments,function(t,e){t.classList.add(e);})},u.prototype.adjacent=function(o,t,i){return "number"==typeof t&&(t=0===t?[]:new Array(t).join().split(",").map(Number.call,Number)),this.each(function(n,r){var e=document.createDocumentFragment();u(t||{}).map(function(t,e){e="function"==typeof o?o.call(this,t,e,n,r):o;return "string"==typeof e?this.generate(e):u(e)}).each(function(t){this.isInPage(t)?e.appendChild(u(t).clone().first()):e.appendChild(t);}),i.call(this,n,e);})},u.prototype.after=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t.nextSibling);})},u.prototype.append=function(t,e){return this.adjacent(t,e,function(t,e){t.appendChild(e);})},u.prototype.args=function(t,e,n){return (t="string"!=typeof(t="function"==typeof t?t(e,n):t)?this.slice(t).map(this.str(e,n)):t).toString().split(/[\s,]+/).filter(function(t){return t.length})},u.prototype.array=function(o){var i=this;return this.nodes.reduce(function(t,e,n){var r;return o?(r="string"==typeof(r=(r=o.call(i,e,n))||!1)?u(r):r)instanceof u&&(r=r.nodes):r=e.innerHTML,t.concat(!1!==r?r:[])},[])},u.prototype.attr=function(t,e,r){return r=r?"data-":"",this.pairs(t,e,function(t,e){return t.getAttribute(r+e)},function(t,e,n){n?t.setAttribute(r+e,n):t.removeAttribute(r+e);})},u.prototype.before=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t);})},u.prototype.children=function(t){return this.map(function(t){return this.slice(t.children)}).filter(t)},u.prototype.clone=function(){return this.map(function(t,e){var n=t.cloneNode(!0),r=this.getAll(n);return this.getAll(t).each(function(t,e){for(var n in this.mirror)this.mirror[n]&&this.mirror[n](t,r.nodes[e]);}),n})},u.prototype.getAll=function(t){return u([t].concat(u("*",t).nodes))},u.prototype.mirror={},u.prototype.mirror.events=function(t,e){if(t._e)for(var n in t._e)t._e[n].forEach(function(t){u(e).on(n,t.callback);});},u.prototype.mirror.select=function(t,e){u(t).is("select")&&(e.value=t.value);},u.prototype.mirror.textarea=function(t,e){u(t).is("textarea")&&(e.value=t.value);},u.prototype.closest=function(e){return this.map(function(t){do{if(u(t).is(e))return t}while((t=t.parentNode)&&t!==document)})},u.prototype.data=function(t,e){return this.attr(t,e,!0)},u.prototype.each=function(t){return this.nodes.forEach(t.bind(this)),this},u.prototype.eacharg=function(n,r){return this.each(function(e,t){this.args(n,e,t).forEach(function(t){r.call(this,e,t);},this);})},u.prototype.empty=function(){return this.each(function(t){for(;t.firstChild;)t.removeChild(t.firstChild);})},u.prototype.filter=function(e){var t=e instanceof u?function(t){return -1!==e.nodes.indexOf(t)}:"function"==typeof e?e:function(t){return t.matches=t.matches||t.msMatchesSelector||t.webkitMatchesSelector,t.matches(e||"*")};return u(this.nodes.filter(t))},u.prototype.find=function(e){return this.map(function(t){return u(e||"*",t)})},u.prototype.first=function(){return this.nodes[0]||!1},u.prototype.generate=function(t){return /^\s*<tr[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().nodes:/^\s*<t(h|d)[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().children().nodes:/^\s*</.test(t)?u(document.createElement("div")).html(t).children().nodes:document.createTextNode(t)},u.prototype.handle=function(){var t=this.slice(arguments).map(function(e){return "function"==typeof e?function(t){t.preventDefault(),e.apply(this,arguments);}:e},this);return this.on.apply(this,t)},u.prototype.hasClass=function(){return this.is("."+this.args(arguments).join("."))},u.prototype.html=function(e){return void 0===e?this.first().innerHTML||"":this.each(function(t){t.innerHTML=e;})},u.prototype.is=function(t){return 0<this.filter(t).length},u.prototype.isInPage=function(t){return t!==document.body&&document.body.contains(t)},u.prototype.last=function(){return this.nodes[this.length-1]||!1},u.prototype.map=function(t){return t?u(this.array(t)).unique():this},u.prototype.not=function(e){return this.filter(function(t){return !u(t).is(e||!0)})},u.prototype.off=function(t,e,n){var r=null==e&&null==n,o=null,i=e;return "string"==typeof e&&(o=e,i=n),this.eacharg(t,function(e,n){u(e._e?e._e[n]:[]).each(function(t){(r||t.orig_callback===i&&t.selector===o)&&e.removeEventListener(n,t.callback);});})},u.prototype.on=function(t,e,o){function i(t,e){try{Object.defineProperty(t,"currentTarget",{value:e,configurable:!0});}catch(t){}}var c=null,n=e;"string"==typeof e&&(c=e,n=o,e=function(n){var r=arguments;u(n.currentTarget).find(c).each(function(t){var e;t.contains(n.target)&&(e=n.currentTarget,i(n,t),o.apply(t,r),i(n,e));});});function r(t){return e.apply(this,[t].concat(t.detail||[]))}return this.eacharg(t,function(t,e){t.addEventListener(e,r),t._e=t._e||{},t._e[e]=t._e[e]||[],t._e[e].push({callback:r,orig_callback:n,selector:c});})},u.prototype.pairs=function(r,t,e,o){var n;return void 0!==t&&(n=r,(r={})[n]=t),"object"==typeof r?this.each(function(t,e){for(var n in r)"function"==typeof r[n]?o(t,n,r[n](t,e)):o(t,n,r[n]);}):this.length?e(this.first(),r):""},u.prototype.param=function(e){return Object.keys(e).map(function(t){return this.uri(t)+"="+this.uri(e[t])}.bind(this)).join("&")},u.prototype.parent=function(t){return this.map(function(t){return t.parentNode}).filter(t)},u.prototype.prepend=function(t,e){return this.adjacent(t,e,function(t,e){t.insertBefore(e,t.firstChild);})},u.prototype.remove=function(){return this.each(function(t){t.parentNode&&t.parentNode.removeChild(t);})},u.prototype.removeClass=function(){return this.eacharg(arguments,function(t,e){t.classList.remove(e);})},u.prototype.replace=function(t,e){var n=[];return this.adjacent(t,e,function(t,e){n=n.concat(this.slice(e.children)),t.parentNode.replaceChild(e,t);}),u(n)},u.prototype.scroll=function(){return this.first().scrollIntoView({behavior:"smooth"}),this},u.prototype.select=function(t,e){return t=t.replace(/^\s*/,"").replace(/\s*$/,""),/^</.test(t)?u().generate(t):(e||document).querySelectorAll(t)},u.prototype.serialize=function(){var r=this;return this.slice(this.first().elements).reduce(function(e,n){return !n.name||n.disabled||"file"===n.type||/(checkbox|radio)/.test(n.type)&&!n.checked?e:"select-multiple"===n.type?(u(n.options).each(function(t){t.selected&&(e+="&"+r.uri(n.name)+"="+r.uri(t.value));}),e):e+"&"+r.uri(n.name)+"="+r.uri(n.value)},"").slice(1)},u.prototype.siblings=function(t){return this.parent().children(t).not(this)},u.prototype.size=function(){return this.first().getBoundingClientRect()},u.prototype.slice=function(t){return t&&0!==t.length&&"string"!=typeof t&&"[object Function]"!==t.toString()?t.length?[].slice.call(t.nodes||t):[t]:[]},u.prototype.str=function(e,n){return function(t){return "function"==typeof t?t.call(this,e,n):t.toString()}},u.prototype.text=function(e){return void 0===e?this.first().textContent||"":this.each(function(t){t.textContent=e;})},u.prototype.toggleClass=function(t,e){return !!e===e?this[e?"addClass":"removeClass"](t):this.eacharg(t,function(t,e){t.classList.toggle(e);})},u.prototype.trigger=function(t){var o=this.slice(arguments).slice(1);return this.eacharg(t,function(t,e){var n,r={bubbles:!0,cancelable:!0,detail:o};try{n=new window.CustomEvent(e,r);}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,o);}t.dispatchEvent(n);})},u.prototype.unique=function(){return u(this.nodes.reduce(function(t,e){return null!=e&&!1!==e&&-1===t.indexOf(e)?t.concat(e):t},[]))},u.prototype.uri=function(t){return encodeURIComponent(t).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},u.prototype.wrap=function(t){return this.map(function(e){return u(t).each(function(t){!function(t){for(;t.firstElementChild;)t=t.firstElementChild;return u(t)}(t).append(e.cloneNode(!0)),e.parentNode.replaceChild(t,e);})})},module.exports&&(module.exports=u,module.exports.u=u);
}(umbrella_min));

var u = umbrella_min.exports;

class AbstractCacheManager {
  constructor() {
    let identifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    _defineProperty(this, "identifier", "");
    this.identifier = identifier;
  }
}

class MemoryCacheManager extends AbstractCacheManager {
  constructor() {
    super(...arguments);
    _defineProperty(this, "_memory", {});
  }
  get(key) {
    return this._memory[key];
  }
  set(key, value) {
    return this._memory[key] = value;
  }
  clear(key) {
    this._memory[key] = undefined;
  }
}

class Step {
  constructor(data, context) {
    _defineProperty(this, "index", 0);
    _defineProperty(this, "active", false);
    _defineProperty(this, "first", false);
    _defineProperty(this, "last", false);
    this.data = data;
    this.context = context;
  }
  show() {
    !this.active && (this.active = true);
  }
  hide() {
    this.active && (this.active = false);
  }
}
_defineProperty(Step, "Type", "default");
_defineProperty(Step, "Style", "");

let StepsSource = /*#__PURE__*/function (StepsSource) {
  StepsSource[StepsSource["DOM"] = 0] = "DOM";
  StepsSource[StepsSource["JSON"] = 1] = "JSON";
  StepsSource[StepsSource["REMOTE"] = 2] = "REMOTE";
  return StepsSource;
}({});
let CacheKeys = /*#__PURE__*/function (CacheKeys) {
  CacheKeys["LastInitilized"] = "timestamp";
  CacheKeys["IsStarted"] = "started";
  CacheKeys["CurrentProgress"] = "progress";
  return CacheKeys;
}({});

function assert(condition, message) {
  if (!condition) throw "TourguideJS: ".concat(message);
  return true;
}

function clamp(value, min) {
  let max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NaN;
  min = isNaN(min) ? value : min;
  max = isNaN(max) ? value : max;
  return Math.max(min, Math.min(value, max));
}

// eslint-disable-next-line @typescript-eslint/no-namespace
let Color;
(function (_Color) {
  function hexToRGB(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt((result === null || result === void 0 ? void 0 : result[1]) || "", 16), parseInt((result === null || result === void 0 ? void 0 : result[2]) || "", 16), parseInt((result === null || result === void 0 ? void 0 : result[3]) || "", 16)];
  }
  _Color.hexToRGB = hexToRGB;
  function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  _Color.componentToHex = componentToHex;
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(Math.floor(r)) + componentToHex(Math.floor(g)) + componentToHex(Math.floor(b));
  }
  _Color.rgbToHex = rgbToHex;
  function RGBToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s ? l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s : 0;
    return [60 * h < 0 ? 60 * h + 360 : 60 * h, 100 * (s ? l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s)) : 0), 100 * (2 * l - s) / 2];
  }
  _Color.RGBToHSL = RGBToHSL;
  function HSLToRGB(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  }
  _Color.HSLToRGB = HSLToRGB;
  function hexToHSL(hex) {
    return RGBToHSL(...hexToRGB(hex));
  }
  _Color.hexToHSL = hexToHSL;
  function HSLToHex(h, s, l) {
    return rgbToHex(...HSLToRGB(h, s, l));
  }
  _Color.HSLToHex = HSLToHex;
  function adjust(hex, h, s, l) {
    const hsl = hexToHSL(hex);
    hsl[0] = clamp(hsl[0] * h, 0, 255);
    hsl[1] = clamp(hsl[1] * s, 0, 255);
    hsl[2] = clamp(hsl[2] * l, 0, 255);
    return HSLToHex(...hsl);
  }
  _Color.adjust = adjust;
  function setAutoColors(defaultStyle, optionsStyle) {
    const style = Object.assign(defaultStyle, optionsStyle || {});
    const filter = /Color$/;
    const {
      accentColor = ""
    } = style;
    Object.keys(style).filter(key => filter.test(key) && style[key] === "auto").forEach(key => {
      switch (key) {
        case "focusColor":
        case "stepButtonNextColor":
        case "stepButtonCompleteColor":
        case "bulletCurrentColor":
          style[key] = accentColor;
          break;
        case "bulletColor":
          style[key] = adjust(accentColor, 1, 0.8, 1.4);
          break;
        case "bulletVisitedColor":
          style[key] = adjust(accentColor, 1, 0.3, 1.2);
          break;
        case "stepButtonPrevColor":
        case "stepButtonCloseColor":
          style[key] = adjust(accentColor, 1, 0.2, 0.8);
          break;
      }
    });
    return style;
  }
  _Color.setAutoColors = setAutoColors;
})(Color || (Color = {}));

// eslint-disable-next-line @typescript-eslint/no-namespace
let Style$1;
(function (_Style) {
  function getStyle(element, css3Prop) {
    const originalEl = u(element).first();
    try {
      return getComputedStyle(originalEl).getPropertyValue(css3Prop);
    } catch (e) {
      return "";
    }
  }
  _Style.getStyle = getStyle;
  function setStyle(element, styleObj) {
    const style = {};
    Object.keys(styleObj).forEach(key => {
      style[key] = styleObj[key] + "";
    });
    Object.assign(u(element).first().style, style);
    return element;
  }
  _Style.setStyle = setStyle;
  function colorObjToStyleVarString(colors) {
    let prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "--tourguide";
    let selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ":host";
    const styleArray = [];
    Object.entries(colors).forEach(_ref => {
      let [key, value] = _ref;
      const splitNameArray = [prefix];
      let prevIndex = 0;
      for (let i = 0; i < key.length; i += 1) {
        if ("A" <= key[i] && key[i] <= "Z") {
          splitNameArray.push(key.substring(prevIndex, i).toLowerCase());
          prevIndex = i;
        }
      }
      splitNameArray.push(key.substring(prevIndex, key.length).toLowerCase());
      styleArray.push("".concat(splitNameArray.join("-"), ": ").concat(value));
    });
    return "".concat(selector, " {\n").concat(styleArray.join(";\n"), ";\n}");
  }
  _Style.colorObjToStyleVarString = colorObjToStyleVarString;
})(Style$1 || (Style$1 = {}));

function getMaxZIndex() {
  return Math.max(...Array.from(document.querySelectorAll('body *'), el => parseFloat(window.getComputedStyle(el).zIndex)).filter(zIndex => !Number.isNaN(zIndex)), 0);
}

// eslint-disable-next-line @typescript-eslint/no-namespace
let Scroll;
(function (_Scroll) {
  /**
   * Getting scroll coordinates
   * @param {Element | string} target target element
   * @returns {{ element: Element, x: number, y: number }[]} scrollItems
   */
  function getScrollCoordinates(target) {
    const scrollItems = [];
    let targetUEl = u(target);
    do {
      if (!targetUEl) targetUEl = false;
      if (!targetUEl.first()) targetUEl = false;
      try {
        const element = targetUEl.first();
        const rect = targetUEl.size();
        if (element.scrollHeight !== rect.height || element.scrollWidth !== rect.width) {
          scrollItems.push({
            element,
            x: element.scrollLeft,
            y: element.scrollTop
          });
        }
        targetUEl = targetUEl.parent();
      } catch (error) {
        targetUEl = false;
      }
    } while (targetUEl);
    return scrollItems;
  }
  _Scroll.getScrollCoordinates = getScrollCoordinates;
  function setElementScroll(element, x, y) {
    element.scrollTo(x, y);
  }
  _Scroll.setElementScroll = setElementScroll;
  function animateScroll(scrollItems, time) {
    const startTime = Date.now();
    function raf(task) {
      if ("requestAnimationFrame" in window) {
        return window.requestAnimationFrame(task);
      }
      return setTimeout(task, 16);
    }
    function ease(v) {
      return 1 - Math.pow(1 - v, v / 2);
    }
    function animate(el, x, y, resolve) {
      if (!el) {
        console.warn("target element ".concat(el, " not found, skip"));
        return;
      }
      const diffTime = Date.now() - startTime;
      const timeValue = Math.min(1 / time * diffTime, 1);
      const easeValue = 1 - ease(timeValue);
      const differenceX = x - el.scrollLeft;
      const differenceY = y - el.scrollTop;
      setElementScroll(el, x - differenceX * easeValue, y - differenceY * easeValue);
      if (diffTime >= time) {
        setElementScroll(el, x, y);
        return resolve(true);
      }
      raf(animate.bind(null, el, x, y, resolve));
    }
    return Promise.all(scrollItems.map(item => {
      return new Promise(resolve => animate(item.element, item.x, item.y, resolve));
    }));
  }
  _Scroll.animateScroll = animateScroll;
  function smoothScroll(elem, options) {
    return new Promise(resolve => {
      if (!elem) return resolve(false);
      elem.scrollIntoView(Object.assign({
        behavior: "auto"
      }, options));
      setTimeout(() => resolve(true), 180);
    });
  }
  _Scroll.smoothScroll = smoothScroll;
})(Scroll || (Scroll = {}));

const sides = ['top', 'right', 'bottom', 'left'];
const alignments = ['start', 'end'];
const placements = /*#__PURE__*/sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
const min = Math.min;
const max = Math.max;
const round = Math.round;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain positioning strategy.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    ...rects.floating,
    x,
    y
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => getAlignment(placement) === alignment), ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment)] : allowedPlacements.filter(placement => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter(placement => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'autoPlacement',
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== undefined || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));

      // Make `computeCoords` start from the right place.
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []), {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];

      // There are more placements to check.
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map(d => {
        const alignment = getAlignment(d.placement);
        return [d.placement, alignment && crossAxis ?
        // Check along the mainAxis and main crossAxis side.
        d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) :
        // Check only the mainAxis.
        d.overflows[0], d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d => d[2].slice(0,
      // Aligned placements should not check their opposite crossAxis
      // side.
      getAlignment(d[0]) ? 2 : 3).every(v => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      const {
        x,
        y
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};

function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle$1(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  return getCssDimensions(element);
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const window = getWindow(element);
  if (!isHTMLElement(element)) {
    return window;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}

const getElementRects = async function (_ref) {
  let {
    reference,
    floating,
    strategy
  } = _ref;
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
    floating: {
      x: 0,
      y: 0,
      ...(await getDimensionsFn(floating))
    }
  };
};

function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

function getWindowComputedView() {
  const top = window.scrollY;
  const left = window.scrollX;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const bottom = top + height;
  const right = left + width;
  return {
    x: left,
    y: top,
    left,
    top,
    bottom,
    right,
    width,
    height
  };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
let Position;
(function (_Position) {
  _Position.keepinview = _ref => {
    let {
      padding = 0
    } = _ref;
    return {
      name: "keepinview",
      fn(_ref2) {
        let {
          x,
          y,
          rects,
          middlewareData
        } = _ref2;
        const viewDimentions = getWindowComputedView();
        const _x = clamp(x, viewDimentions.left + padding, viewDimentions.right - rects.floating.width - padding);
        const _y = clamp(y, viewDimentions.top + padding, viewDimentions.bottom - rects.floating.height - padding);
        const dx = x - _x;
        const dy = y - _y;
        const {
          arrow
        } = middlewareData;
        if (arrow) {
          if (arrow.x && dx) arrow.x += dx;
          if (arrow.y && dy) arrow.y += dy;
        }
        return {
          x: _x,
          y: _y
        };
      }
    };
  };
  _Position.positionfixed = options => ({
    name: "positionInView",
    options,
    fn(_ref3) {
      let {
        x,
        y,
        rects,
        elements
      } = _ref3;
      let _x = x,
        _y = y;
      const {
        placement = "middle-center",
        padding = 0
      } = options || {};
      const {
        width,
        height
      } = getWindowComputedView();
      const [align_y, align_x] = placement.split("-");
      switch (align_x) {
        case "start":
          _x = padding;
          break;
        case "center":
          _x = width / 2 - rects.floating.width / 2;
          break;
        case "end":
          _x = width - rects.floating.width - padding;
          break;
      }
      switch (align_y) {
        case "top":
          _y = padding;
          break;
        case "middle":
          _y = height / 2 - rects.floating.height / 2;
          break;
        case "bottom":
          _y = height - rects.floating.height - padding;
          break;
      }
      elements.floating.style.position = "fixed";
      return {
        x: _x,
        y: _y
      };
    }
  });
  _Position.highlight = options => ({
    name: "highlight",
    options,
    fn(state) {
      const {
        element,
        padding = 0,
        centered = false
      } = options || {};
      const {
        rects
      } = state;
      const data = {
        top: "0",
        left: "0",
        width: "0",
        height: "0"
      };
      if (centered) {
        data.top = "50vh";
        data.left = "50vw";
        data.width = "0";
        data.height = "0";
      } else {
        data.top = "".concat(rects.reference.y - padding, "px");
        data.left = "".concat(rects.reference.x - padding, "px");
        data.width = "".concat(rects.reference.width + padding * 2, "px");
        data.height = "".concat(rects.reference.height + padding * 2, "px");
      }
      Style$1.setStyle(element, data);
      return {
        data
      };
    }
  });
  function offsetAssist(props) {
    const side = props.placement.split("-")[0];
    switch (side) {
      case "top":
        return 24;
      case "left":
      case "right":
        return 20;
      case "bottom":
      default:
        return 10;
    }
  }
  _Position.offsetAssist = offsetAssist;
  _Position.offset = offset(offsetAssist);
  function position(reference, tooltip) {
    let middleware = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return computePosition(reference, tooltip, {
      middleware
    }).then(data => {
      Style$1.setStyle(tooltip, {
        left: "".concat(data.x, "px"),
        top: "".concat(data.y, "px")
      });
      return data;
    });
  }
  _Position.position = position;
  _Position.autoPlacement = autoPlacement;
  _Position.arrow = options => ({
    name: "arrow",
    options,
    fn(state) {
      const {
        element,
        padding = 0
      } = options || {};
      const {
        rects,
        placement
      } = state;
      const data = {
        top: "0",
        left: "0"
      };
      switch (placement) {
        case "left-start":
          data.top = padding + "px";
          data.left = rects.floating.width + "px";
          break;
        case "left-end":
          data.top = rects.floating.height - padding + "px";
          data.left = rects.floating.width + "px";
          break;
        case "right-start":
          data.top = padding + "px";
          break;
        case "right-end":
          data.top = rects.floating.height - padding + "px";
          break;
        case "top-start":
          data.top = rects.floating.height + "px";
          data.left = padding + "px";
          break;
        case "top-end":
          data.top = rects.floating.height + "px";
          data.left = rects.floating.width - padding + "px";
          break;
        case "bottom-start":
          data.left = padding + "px";
          break;
        case "bottom-end":
          data.left = rects.floating.width - padding + "px";
          break;
      }
      Style$1.setStyle(element, data);
      return {
        data
      };
    }
  });
})(Position || (Position = {}));

var Utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  assert: assert,
  clamp: clamp,
  get Color () { return Color; },
  get Style () { return Style$1; },
  getMaxZIndex: getMaxZIndex,
  get Scroll () { return Scroll; },
  get Position () { return Position; }
});

var Style = ".guided-tour-step {\n  display: none;\n  opacity: 0;\n}\n.guided-tour-step .guided-tour-step-clickblock {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  pointer-events: all;\n}\n.guided-tour-step.active {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: all;\n  transition: opacity 150ms;\n}\n.guided-tour-step.active .guided-tour-step-highlight {\n  position: absolute;\n  box-sizing: border-box;\n  border-radius: 4px;\n  box-shadow: 0 0 0 999em var(--tourguide-overlay-color);\n  z-index: 1;\n}\n.guided-tour-step.active .guided-tour-step-tooltip {\n  position: absolute;\n  z-index: 2;\n  background-color: var(--tourguide-background-color);\n  width: var(--tourguide-tooltip-width);\n  max-width: max-content;\n  border-radius: 5px;\n  box-sizing: border-box;\n  box-shadow: 0 0 2.5em -0.8em #000, 0 0 10px -5px #000, 0 0 3px -1px #000;\n  transition: opacity 150ms;\n}\n@media screen and (max-width: 760px) {\n  .guided-tour-step.active .guided-tour-step-tooltip {\n    max-width: 85vw;\n    width: max-content !important;\n  }\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-arrow {\n  position: absolute;\n  width: 14px;\n  height: 14px;\n  background: var(--tourguide-background-color);\n  z-index: -1;\n  transform: rotate(45deg);\n  pointer-events: none;\n  margin-left: -7px;\n  margin-top: -7px;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-arrow.no-arrow {\n  display: none;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content-container {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  height: calc(100% - 2.6em);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-image {\n  flex-grow: 1;\n  flex-shrink: 1;\n  overflow: hidden;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-image img {\n  width: 100%;\n  height: 100%;\n  border-radius: 4px 4px 0 0;\n  object-fit: cover;\n  object-position: center;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content-wrapper {\n  margin: 1.2em 1.5em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-title {\n  font-size: 130%;\n  margin-bottom: 0.5em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content {\n  flex-shrink: 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content b,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content strong {\n  font-weight: bold;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content i,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content em {\n  font-style: italic;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content a {\n  cursor: pointer;\n  text-decoration: underline;\n  color: var(--tourguide-accent-color);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content mark {\n  background: inherit;\n  text-shadow: 0px 2px 4px #ff0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content code,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content dfn {\n  padding: 1px 6px 1px 4px;\n  border-radius: 4px;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content code {\n  background-color: #f0f0f0;\n  color: #e83e8c;\n  font-family: monospace;\n  font-size: 87.5%;\n  word-break: break-word;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content dfn {\n  font-style: italic;\n  background-color: #ffc6e5;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content p,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content blockquote {\n  margin: 1em 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content p:last-child,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul:last-child,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol:last-child,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content blockquote:last-child {\n  margin-bottom: 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content blockquote {\n  padding-left: 1em;\n  border-left: 4px solid silver;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol {\n  padding-left: 1.5em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul li,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol li {\n  margin: 0.3em 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions {\n  display: flex;\n  column-gap: 0.5em;\n  margin-top: 1.5em;\n  justify-content: end;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button {\n  color: var(--tourguide-accent-color);\n  padding: 0.5em 1em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button.primary {\n  background: var(--tourguide-accent-color);\n  padding: 0.5em 1.5em;\n  color: #fff;\n  border-radius: 4px;\n  font-size: 110%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button.primary:hover, .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button.primary:focus {\n  filter: brightness(120%);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-icon {\n  display: inline-block;\n  overflow: hidden;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button {\n  flex-direction: column;\n  justify-content: center;\n  /* <-- actual veertical align */\n  display: inline-flex;\n  text-align: center;\n  cursor: pointer;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button .guided-tour-icon {\n  align-self: center;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-close {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 2em;\n  height: 2em;\n  color: var(--tourguide-step-button-close-color);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-prev,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-next,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-complete {\n  width: 36px;\n  height: 36px;\n  background: var(--tourguide-background-color);\n  border-radius: 50%;\n  margin-top: -18px;\n  position: absolute;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-prev {\n  color: var(--tourguide-step-button-prev-color);\n  left: 0;\n  transform: translateX(-50%);\n  top: 50%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-next {\n  color: var(--tourguide-step-button-next-color);\n  right: 0;\n  transform: translateX(50%);\n  top: 50%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-complete {\n  color: var(--tourguide-step-button-complete-color);\n  right: 0;\n  transform: translateX(50%);\n  top: 50%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-footer {\n  flex-shrink: 0;\n  flex-grow: 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets {\n  text-align: center;\n  line-height: 16px;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul {\n  list-style: none;\n  margin: -0.5em 1em 0.5em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li {\n  display: inline-block;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li button {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  display: inline-block;\n  background-color: var(--tourguide-bullet-color);\n  border: 8px solid var(--tourguide-background-color);\n  box-sizing: content-box;\n  cursor: pointer;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li button.complete {\n  background-color: var(--tourguide-bullet-visited-color);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li button.current {\n  background-color: var(--tourguide-bullet-current-color);\n}\n@media screen and (min-width: 760px) {\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container {\n    flex-direction: row;\n    height: 100%;\n  }\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container .guided-tour-step-content-wrapper {\n    flex: 1 1 auto;\n  }\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container .guided-tour-step-image {\n    width: 50%;\n    margin-bottom: -24px;\n    flex: 0 0 auto;\n  }\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container .guided-tour-step-image img {\n    border-radius: 4px 0 0 4px;\n    height: 100%;\n    object-fit: cover;\n    object-position: center;\n  }\n}";

const popoverStepDataDefaults = {
  layout: "vertical",
  image: "",
  title: "",
  content: "",
  actions: [],
  index: 0,
  selector: undefined,
  navigation: true,
  alignment: "start",
  hidden: false
};
const positionabsolute = () => ({
  name: "positionabsolute",
  fn(_ref) {
    let {
      elements
    } = _ref;
    elements.floating.style.position = "absolute";
    return {
      data: {}
    };
  }
});
class PopoverStep extends Step {
  get _image() {
    return this.context.helpers.u("<figure class=\"guided-tour-step-image\">".concat(this.data.image ? "<img src=\"".concat(this.data.image, "\" />") : "", "</figure>"));
  }
  get _content() {
    const content = this.context.helpers.u("<div class=\"guided-tour-step-content-wrapper\">\n                <div id=\"tooltip-title-".concat(this.data.index, "\" role=\"heading\" class=\"guided-tour-step-title\">").concat(this.data.title, "</div>\n                <div class=\"guided-tour-step-content\">").concat(this.data.content, "</div>\n            </div>"));
    if (Array.isArray(this.data.actions) && this.data.actions.length > 0) {
      const actions = this.context.helpers.u("<div class=\"guided-tour-step-actions\">\n                    ".concat(this.data.actions.map((action, index) => "<".concat(action.href ? "a" : "button", " id=\"").concat(action.id, "\" ").concat(action.href ? "href=\"".concat(action.href, "\"") : "", " ").concat(action.target ? "target=\"".concat(action.target, "\"") : "", " class=\"button").concat(action.primary ? " primary" : "", "\" data-index=\"").concat(index, "\">").concat(action.label, "</").concat(action.href ? "a" : "button", ">")).join(""), "\n                </div>"));
      actions.find("a, button").on("click", e => {
        const action = this.data.actions[parseInt((e === null || e === void 0 ? void 0 : e.target).dataset.index)];
        if (action.action) e.preventDefault();
        this.context.action(e, action);
      });
      content.append(actions);
    }
    return content;
  }
  get _footer() {
    return this.context.helpers.u("<div class=\"guided-tour-step-bullets\">\n                <ul>".concat(this.context.steps.map((step, i) => "<li>\n                    <button title=\"Go to step ".concat(i + 1, "\" data-index=\"").concat(i, "\" class=\"").concat(step.index < this.index ? "complete" : step.index == this.index ? "current" : "", "\"></button>\n                    </li>")).join(""), "</ul>\n            </div>"));
  }
  get _navigation() {
    const footer = this.context.helpers.u("<div class=\"guided-tour-step-footer\"></div>");
    if (this.data.navigation) footer.append(this.context.helpers.u("<button class=\"guided-tour-step-button guided-tour-step-button-close\" title=\"End tour\">\n                        <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"16\" height=\"16\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M16,16 L4,4\"></path><path d=\"M16,4 L4,16\"></path></g></svg>\n                    </button>\n                    ".concat(!this.first ? "<button class=\"guided-tour-step-button guided-tour-step-button-prev\" title=\"Prev step\">\n                      <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                      <polyline points=\"12 4 6 10 12 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\"></polyline>\n                      </svg>\n                    </button>" : "", "\n                    ").concat(this.last ? "<button class=\"guided-tour-step-button guided-tour-step-button-complete\" title=\"Complete tour\">\n                      <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                      <polyline points=\"4,10 8,15 17,4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\"></polyline>\n                      </svg>\n                    </button>" : "<button class=\"guided-tour-step-button guided-tour-step-button-next\" title=\"Next step\">\n                      <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                      <polyline points=\"7 4 13 10 7 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\"></polyline>\n                      </svg>\n                    </button>")));
    if (this.context.steps.length > 1) footer.append(this._footer);
    footer.find(".guided-tour-step-button-prev").on("click", this.context.previous);
    footer.find(".guided-tour-step-button-next").on("click", this.context.next);
    footer.find(".guided-tour-step-button-close").on("click", this.context.stop);
    footer.find(".guided-tour-step-button-complete").on("click", this.context.complete);
    footer.find(".guided-tour-step-bullets button").on("click", e => this.context.go(parseInt(this.context.helpers.u(e.target).data("index"))));
    return footer;
  }
  get _container() {
    return this.context.helpers.u("<div role=\"dialog\" aria-labelleby=\"tooltip-title-".concat(this.data.index, "\" class=\"guided-tour-step").concat(this.first ? " guided-tour-step-first" : "").concat(this.last ? " guided-tour-step-last" : "", "\"><div class=\"guided-tour-step-clickblock\"></div></div>"));
  }
  get _highlight() {
    return this.$highlight = this.context.helpers.u("<div class=\"guided-tour-step-highlight\"></div>");
  }
  get _el() {
    if (!this.$container) {
      const tooltip = this.$tooltip = this.context.helpers.u("<div role=\"document\" class=\"guided-tour-step-tooltip\"></div>");
      if (this.data.width) this.context.helpers.Style.setStyle(tooltip, {
        width: this.data.width + "px",
        maxWidth: this.data.width + "px"
      });
      if (this.data.height) this.context.helpers.Style.setStyle(tooltip, {
        height: this.data.height + "px",
        maxHeight: this.data.height + "px"
      });
      const tooltipinner = this.context.helpers.u("<div class=\"guided-tour-step-tooltip-inner".concat(this.data.layout === "horizontal" ? " step-layout-horizontal" : "", "\"></div>"));
      const container = this.context.helpers.u("<div class=\"guided-tour-step-content-container\"></div>");
      container.append(this._image).append(this._content);
      const arrow = this.$arrow = this.context.helpers.u("<div class=\"guided-tour-arrow\"></div>");
      const navigation = this._navigation;
      tooltipinner.append(arrow).append(container).append(navigation);
      tooltip.append(tooltipinner);
      this.$container = this._container;
      this.$container.append(this._highlight).append(tooltip);
    }
    return this.$container;
  }
  constructor(data, context) {
    super(Object.assign({}, popoverStepDataDefaults, data), context);
    this._validate(this.data);
    this._decorate(this.data);
    // this._scrollCancel = null;
    this.data.layout = data.layout;
    if (data.image && context.options.preloadimages && !/^data:/i.test(data.image)) {
      const preload = new Image();
      preload.onerror = () => {
        console.error(new Error("Invalid image URL: ".concat(data.image)));
        this.data.image = "";
      };
      preload.src = this.data.image;
    }
    this.data.actions = [];
    if (data.actions) {
      if (!Array.isArray(data.actions)) {
        console.error(new Error("actions must be array but got ".concat(typeof data.actions)));
      } else {
        this.data.actions = data.actions;
      }
    }
  }
  _validate(data) {
    this.context.helpers.assert(Object.prototype.hasOwnProperty.call(data, "title"), "missing required step parameter: title\n" + JSON.stringify(data, null, 2) + "\n" + "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach");
    this.context.helpers.assert(Object.prototype.hasOwnProperty.call(data, "content"), "missing required step parameter: content\n" + JSON.stringify(data, null, 2) + "\n" + "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach");
  }
  _decorate(data) {
    data.title = this.context.helpers.decorate(data.title, this);
    data.content = this.context.helpers.decorate(data.content, this);
  }
  _cancel() {
    // if (this._scrollCancel) this._scrollCancel();
  }
  _position($target) {
    var _this$$tooltip, _this$$highlight, _this$$arrow, _this$$highlight2;
    const _target = $target === null || $target === void 0 ? void 0 : $target.first();
    if (!_target) this.$arrow.addClass("no-arrow ");else this.$arrow.removeClass("no-arrow ");
    this.context.helpers.Position.position(_target || document.body, (_this$$tooltip = this.$tooltip) === null || _this$$tooltip === void 0 ? void 0 : _this$$tooltip.first(), _target ? [positionabsolute(), this.context.helpers.Position.autoPlacement({
      alignment: this.data.alignment,
      padding: 24
    }), this.context.helpers.Position.highlight({
      element: (_this$$highlight = this.$highlight) === null || _this$$highlight === void 0 ? void 0 : _this$$highlight.first(),
      padding: 5
    }), this.context.helpers.Position.offset, this.context.helpers.Position.arrow({
      element: (_this$$arrow = this.$arrow) === null || _this$$arrow === void 0 ? void 0 : _this$$arrow.first(),
      padding: 18
    }), this.context.helpers.Position.keepinview({
      padding: 24
    })] : [this.context.helpers.Position.positionfixed(), this.context.helpers.Position.highlight({
      element: (_this$$highlight2 = this.$highlight) === null || _this$$highlight2 === void 0 ? void 0 : _this$$highlight2.first(),
      centered: true
    })]);
  }
  attach(parent) {
    this.context.helpers.u(parent).append(this._el);
  }
  show() {
    this._cancel();
    if (!this.active) {
      super.show();
      const $target = this.context.helpers.u(this.data.selector || "null");
      this.context.helpers.Scroll.smoothScroll($target.first(), {
        block: "center"
      }).then(() => {
        var _this$$container;
        this._position($target);
        this.context.helpers.Style.setStyle(this.$container, {
          opacity: 1
        });
        ((_this$$container = this.$container) === null || _this$$container === void 0 ? void 0 : _this$$container.find(".guided-tour-step-tooltip, button.button, button.primary, .guided-tour-step-button-complete, .guided-tour-step-button-next").last()).focus({
          preventScroll: true
        });
      });
      this._el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
      return true;
    }
    return false;
  }
  hide() {
    this._cancel();
    if (this.active) {
      this.context.helpers.Style.setStyle(this.$container, {
        opacity: 0
      });
      this._el.removeClass("active");
      super.hide();
      return true;
    }
    return false;
  }
  remove() {
    this.hide();
    this._el.remove();
  }
}
_defineProperty(PopoverStep, "Style", Style);

function ActionHandler(name, handlerFn) {
  return {
    name,
    onAction: handlerFn
  };
}

function parseProperties(props) {
  return (props || "").split(",").map(p => p.trim()).filter(Boolean);
}
function getMatches(str, regex) {
  const matches = [];
  let m;
  regex.lastIndex = 0;
  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    matches.push({
      match: m[0],
      start: m.index,
      length: m[0].length,
      properties: parseProperties(m[1])
    });
  }
  return matches;
}
class ContentDecorator {
  constructor(match, decoratorFn) {
    if (typeof match === 'string' && match) this.match = new RegExp("{s*".concat(match.trim(), "s*(,.+?)?s*?}"), 'gmi');else if (!match) this.match = false;else this.match = match;
    this.decoratorFn = decoratorFn;
  }
  test(text) {
    return this.match ? this.match.test(text) : true;
  }
  render(text, step, context) {
    try {
      const matches = this.match ? getMatches(text, this.match).reverse() : [];
      return this.decoratorFn(text, matches, step, context);
    } catch (e) {
      console.warn(e);
      return text;
    }
  }
}

var e={"":["<em>","</em>"],_:["<strong>","</strong>"],"*":["<strong>","</strong>"],"~":["<s>","</s>"],"\n":["<br />"]," ":["<br />"],"-":["<hr />"]};function n(e){return e.replace(RegExp("^"+(e.match(/^(\t| )+/)||"")[0],"gm"),"")}function r(e){return (e+"").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function t(a,c){var o,l,g,s,p,u=/((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:!\[([^\]]*?)\]\(([^)]+?)\))|(\[)|(\](?:\(([^)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm,m=[],h="",i=c||{},d=0;function f(n){var r=e[n[1]||""],t=m[m.length-1]==n;return r?r[1]?(t?m.pop():m.push(n),r[0|t]):r[0]:n}function $(){for(var e="";m.length;)e+=f(m[m.length-1]);return e}for(a=a.replace(/^\[(.+?)\]:\s*(.+)$/gm,function(e,n,r){return i[n.toLowerCase()]=r,""}).replace(/^\n+|\n+$/g,"");g=u.exec(a);)l=a.substring(d,g.index),d=u.lastIndex,o=g[0],l.match(/[^\\](\\\\)*\\$/)||((p=g[3]||g[4])?o='<pre class="code '+(g[4]?"poetry":g[2].toLowerCase())+'"><code'+(g[2]?' class="language-'+g[2].toLowerCase()+'"':"")+">"+n(r(p).replace(/^\n+|\n+$/g,""))+"</code></pre>":(p=g[6])?(p.match(/\./)&&(g[5]=g[5].replace(/^\d+/gm,"")),s=t(n(g[5].replace(/^\s*[>*+.-]/gm,""))),">"==p?p="blockquote":(p=p.match(/\./)?"ol":"ul",s=s.replace(/^(.*)(\n|$)/gm,"<li>$1</li>")),o="<"+p+">"+s+"</"+p+">"):g[8]?o='<img src="'+r(g[8])+'" alt="'+r(g[7])+'">':g[10]?(h=h.replace("<a>",'<a href="'+r(g[11]||i[l.toLowerCase()])+'">'),o=$()+"</a>"):g[9]?o="<a>":g[12]||g[14]?o="<"+(p="h"+(g[14]?g[14].length:g[13]>"="?1:2))+">"+t(g[12]||g[15],i)+"</"+p+">":g[16]?o="<code>"+r(g[16])+"</code>":(g[17]||g[1])&&(o=f(g[17]||"--"))),h+=l,h+=o;return (h+a.substring(d)+$()).replace(/^\n+|\n+$/g,"")}

const MarkdownDecorator = new ContentDecorator("", text => {
  return t(text);
});

class CardStep extends PopoverStep {
  get _container() {
    return this.context.helpers.u("<div role=\"dialog\" aria-labelleby=\"tooltip-title-".concat(this.data.index, "\" class=\"guided-tour-step").concat(this.first ? " guided-tour-step-first" : "").concat(this.last ? " guided-tour-step-last" : "", "\"></div>"));
  }
  get _highlight() {
    return this.context.helpers.u("<span></span>");
  }
  get _footer() {
    return this.context.helpers.u("<span></span>");
  }
  _position() {
    var _this$$tooltip;
    this.context.helpers.Position.position(document.body, (_this$$tooltip = this.$tooltip) === null || _this$$tooltip === void 0 ? void 0 : _this$$tooltip.first(), [this.context.helpers.Position.positionfixed({
      placement: this.data.placement,
      padding: 25
    })]);
  }
  attach(parent) {
    super.attach(parent);
    if (this.$arrow) {
      this.$arrow.addClass("no-arrow ");
    }
  }
}
_defineProperty(CardStep, "Type", "card");
_defineProperty(CardStep, "Style", "");

var BaseStyle = ":host {\n  position: absolute;\n  overflow: visible;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 0;\n  box-sizing: border-box;\n  line-height: 1.4;\n  text-align: left;\n  text-rendering: optimizespeed;\n  font-family: var(--tourguide-font-family);\n  font-size: var(--tourguide-font-size);\n  color: var(--tourguide-text-color);\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n  -moz-tab-size: 4;\n  /* 3 */\n  tab-size: 4;\n  /* 3 */\n}\n:host * {\n  margin: 0;\n  padding: 0;\n  background: none;\n  border: none;\n  border-width: 0;\n  border-style: none;\n  border-color: currentColor;\n  box-shadow: none;\n  color: inherit;\n  appearance: none;\n  font-size: inherit;\n  font-weight: inherit;\n  text-decoration: none;\n}\n:host a,\n:host button {\n  cursor: pointer;\n}\n:host a:hover, :host a:focus,\n:host button:hover,\n:host button:focus {\n  outline: 5px auto var(--tourguide-focus-color);\n}";

function getDataContents() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  let defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const parts = data.split(";");
  const result = {
    ...defaults
  };
  parts.forEach(part => {
    const entries = (part || "").split(":");
    result[(entries[0] || "").trim()] = (entries[1] || "").trim();
  });
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};
const defaultKeyNavOptions = {
  next: "ArrowRight",
  prev: "ArrowLeft",
  first: "Home",
  last: "End",
  complete: null,
  stop: "Escape"
};
const defaultStyle = {
  fontFamily: "sans-serif",
  fontSize: "14px",
  overlayColor: "rgba(0, 0, 0, 0.5)",
  textColor: "#333",
  accentColor: "#0d6efd",
  backgroundColor: "#fff",
  focusColor: "auto",
  tooltipWidth: "40vw",
  bulletColor: "auto",
  bulletVisitedColor: "auto",
  bulletCurrentColor: "auto",
  stepButtonCloseColor: "auto",
  stepButtonPrevColor: "auto",
  stepButtonNextColor: "auto",
  stepButtonCompleteColor: "auto",
  stepCardPadding: "5px"
};
const defaultOptions = {
  identifier: "default",
  root: "body",
  selector: "[data-tour]",
  animationspeed: 120,
  restoreinitialposition: true,
  preloadimages: true,
  resumeOnLoad: true,
  request: {
    options: {
      mode: "cors",
      cache: "no-cache"
    },
    headers: {
      "Content-Type": "application/json"
    }
  },
  keyboardNavigation: defaultKeyNavOptions,
  stepFactory: [PopoverStep, CardStep],
  actionHandlers: [],
  contentDecorators: [MarkdownDecorator],
  cacheManagerFactory: MemoryCacheManager,
  onStart: NOOP,
  onStop: NOOP,
  onComplete: NOOP,
  onStep: NOOP,
  onAction: NOOP,
  steps: [],
  src: "",
  style: defaultStyle
};
function isEventAttrbutesMatched(event, code) {
  return event.code === code;
}
class Tour {
  get cacheManager() {
    return this._cacheManager || (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._cacheManager = new this.options.cacheManagerFactory(this.options.identifier));
  }
  get currentstep() {
    return this._steps[this._current];
  }
  get length() {
    return this._steps.length;
  }
  get steps() {
    return this._steps.filter(step => !step.data.hidden);
  }
  get hasnext() {
    return this.nextstep !== this._current;
  }
  get nextstep() {
    return clamp(this._current + 1, 0, this.length - 1);
  }
  get previousstep() {
    return clamp(this._current - 1, 0);
  }
  get options() {
    return this._options;
  }
  get helpers() {
    return this._helpers || (this._helpers = {
      ...Tour.Helpers,
      decorate: this._decorateText.bind(this)
    });
  }
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _defineProperty(this, "_steps", []);
    _defineProperty(this, "_current", 0);
    _defineProperty(this, "_active", false);
    _defineProperty(this, "_ready", false);
    _defineProperty(this, "_stepsSrc", StepsSource.DOM);
    _defineProperty(this, "_initialposition", null);
    this._options = Object.assign({}, defaultOptions, options, {
      style: Color.setAutoColors(defaultStyle, options.style || {})
    });
    u(this._options.root).append(this._containerElement = u(document.createElement("div")).addClass("__guided-tour-container"));
    this._shadowRoot = this._containerElement.first().attachShadow({
      mode: "closed"
    });
    this._injectStyles();
    this.start = this.start.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.go = this.go.bind(this);
    this.stop = this.stop.bind(this);
    this.complete = this.complete.bind(this);
    // this.action = this.action.bind(this);
    this._keyboardHandler = this._keyboardHandler.bind(this);
    this.cacheManager.set(CacheKeys.LastInitilized, new Date());
    switch (true) {
      case typeof this._options.src === "string" && Boolean(this._options.src):
        {
          this._stepsSrc = StepsSource.REMOTE;
          fetch(new Request(this._options.src, this._options.request)).then(response => response.json().then(data => {
            this._initSteps(data);
            this._ready = true;
            this._onTourReady();
          }).catch(e => console.error(e))).catch(() => {
            assert(false, "Failed to fetch step data. Check documentation.");
          });
        }
        break;
      case Array.isArray(this._options.steps) && this._options.steps.length > 0:
        {
          this._stepsSrc = StepsSource.JSON;
          this._initSteps(this._options.steps);
          this._ready = true;
          this._onTourReady();
        }
        break;
      default:
        {
          this._stepsSrc = StepsSource.DOM;
          this._ready = true;
          this._onTourReady();
        }
    }
  }
  _initSteps(steps) {
    this._steps = steps.map(data => {
      var _this$_options$stepFa;
      const stepType = data.type || "default";
      const StepFactory = (_this$_options$stepFa = this._options.stepFactory) === null || _this$_options$stepFa === void 0 ? void 0 : _this$_options$stepFa.find(f => f.Type === stepType);
      assert(StepFactory, "No factory for step of type \"".concat(stepType, "\". Check your setup."));
      return new StepFactory({
        ...data
      }, this);
    }).sort((a, b) => a.data.index - b.data.index);
    this._steps.forEach((step, index) => {
      step.index = index;
    });
    this._steps[0].first = true;
    this._steps[this.length - 1].last = true;
  }
  _onTourReady() {
    if (this._ready && this.cacheManager.get(CacheKeys.IsStarted) && this.options.resumeOnLoad) {
      this._current = parseInt(this.cacheManager.get(CacheKeys.CurrentProgress));
      if (isNaN(this._current)) this._current = 0;
      this.start(this._current);
    }
  }
  _injectStyles() {
    const style = u("<style>".concat(BaseStyle, "</style>").concat(this.options.stepFactory.map(step => step.Style).filter(Boolean).map(style => "<style>".concat(style, "</style")).join("")));
    u(this._shadowRoot).append(style);
    const colors = u("<style>".concat(Style$1.colorObjToStyleVarString(this._options.style || {}, "--tourguide"), "</style>"));
    u(this._shadowRoot).append(colors);
  }
  _keyboardHandler(event) {
    var _this$_options$keyboa, _this$_options$keyboa2, _this$_options$keyboa3, _this$_options$keyboa4, _this$_options$keyboa5, _this$_options$keyboa6;
    if ((_this$_options$keyboa = this._options.keyboardNavigation) !== null && _this$_options$keyboa !== void 0 && _this$_options$keyboa.next && isEventAttrbutesMatched(event, this._options.keyboardNavigation.next)) {
      this.next();
    } else if ((_this$_options$keyboa2 = this._options.keyboardNavigation) !== null && _this$_options$keyboa2 !== void 0 && _this$_options$keyboa2.prev && isEventAttrbutesMatched(event, this._options.keyboardNavigation.prev)) {
      this.previous();
    } else if ((_this$_options$keyboa3 = this._options.keyboardNavigation) !== null && _this$_options$keyboa3 !== void 0 && _this$_options$keyboa3.first && isEventAttrbutesMatched(event, this._options.keyboardNavigation.first)) {
      this.go(0);
    } else if ((_this$_options$keyboa4 = this._options.keyboardNavigation) !== null && _this$_options$keyboa4 !== void 0 && _this$_options$keyboa4.last && isEventAttrbutesMatched(event, this._options.keyboardNavigation.last)) {
      this.go(this._steps.length - 1);
    } else if ((_this$_options$keyboa5 = this._options.keyboardNavigation) !== null && _this$_options$keyboa5 !== void 0 && _this$_options$keyboa5.stop && isEventAttrbutesMatched(event, this._options.keyboardNavigation.stop)) {
      this.stop();
    } else if ((_this$_options$keyboa6 = this._options.keyboardNavigation) !== null && _this$_options$keyboa6 !== void 0 && _this$_options$keyboa6.complete && isEventAttrbutesMatched(event, this._options.keyboardNavigation.complete)) {
      this.complete();
    }
    return true;
  }
  _decorateText(text, step) {
    var _this$_options$conten;
    let _text = text;
    (_this$_options$conten = this._options.contentDecorators) === null || _this$_options$conten === void 0 || _this$_options$conten.forEach(decorator => {
      if (decorator.test(_text)) _text = decorator.render(_text, step, this);
    });
    return _text;
  }
  reset() {
    if (this._active) this.stop();
    // if (this._stepsSrc === StepsSource.DOM) {
    //   this._steps = [];
    // }
    this._current = 0;
    this.cacheManager.set(CacheKeys.IsStarted, true);
  }
  start() {
    let step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (this._ready) {
      if (this._stepsSrc === StepsSource.DOM) {
        this._initSteps(u(this._options.selector).nodes.map(step => {
          const data = getDataContents(u(step).data("tour"));
          data.selector = step;
          return data;
        }));
        assert(this._steps.length > 0, "Found no tour steps on page. Please verify your setup.");
      }
      Style$1.setStyle(this._containerElement, {
        "z-index": getMaxZIndex() + 1
      });
      if (this._options.restoreinitialposition) {
        this._initialposition = Scroll.getScrollCoordinates(this._options.root);
      }
      if (!this._active) {
        var _this$_options$onStar, _this$_options;
        this.cacheManager.set(CacheKeys.IsStarted, true);
        u(this._options.root).addClass("__guided-tour-active");
        this.reset();
        this._steps.forEach(step => step.attach(this._shadowRoot));
        this._current = step;
        this.currentstep.show();
        this._active = true;
        (_this$_options$onStar = (_this$_options = this._options).onStart) === null || _this$_options$onStar === void 0 || _this$_options$onStar.call(_this$_options, this);
        if (this._options.keyboardNavigation) {
          assert(Object.prototype.toString.call(this._options.keyboardNavigation) === "[object Object]", "keyboardNavigation option invalid. should be predefined object or false. Check documentation.");
          u(":root").on("keyup", this._keyboardHandler);
        }
      } else {
        this.go(step);
      }
    } else {
      setTimeout(() => {
        this.start(step);
      }, 50);
    }
  }
  action(event, action) {
    if (this._active) {
      switch (action.action) {
        case "next":
          this.next();
          break;
        case "previous":
          this.previous();
          break;
        case "stop":
          this.stop();
          break;
        case "complete":
          this.complete();
          break;
        default:
          {
            var _this$_options$action;
            const handler = (_this$_options$action = this._options.actionHandlers) === null || _this$_options$action === void 0 ? void 0 : _this$_options$action.find(handler => handler.name === action.action);
            if (handler) handler.onAction(event, action, this);
          }
      }
      if (typeof this._options.onAction === "function") {
        this._options.onAction(event, action, this);
      }
    }
  }
  next(e) {
    e && e.preventDefault && e.preventDefault();
    e && e.stopPropagation && e.stopPropagation();
    if (this._active) {
      this.go(this.nextstep);
    }
  }
  previous(e) {
    e && e.preventDefault && e.preventDefault();
    e && e.stopPropagation && e.stopPropagation();
    if (this._active) {
      this.go(this.previousstep);
    }
  }
  go(step) {
    if (this._active && this._current !== step) {
      var _this$_options$onStep, _this$_options2;
      this.currentstep.hide();
      this._current = clamp(step, 0, this.length - 1);
      this.currentstep.show();
      (_this$_options$onStep = (_this$_options2 = this._options).onStep) === null || _this$_options$onStep === void 0 || _this$_options$onStep.call(_this$_options2, this.currentstep, this);
      this.cacheManager.set(CacheKeys.CurrentProgress, this._current);
    }
  }
  stop() {
    if (this._active) {
      var _this$_options$onStop, _this$_options3;
      this.currentstep.hide();
      Style$1.setStyle(this._containerElement, {
        "z-index": 0
      });
      this._active = false;
      this._steps.forEach(step => step.remove());
      u(this._options.root).removeClass("__guided-tour-active");
      if (this._options.keyboardNavigation) {
        u(":root").off("keyup", this._keyboardHandler);
      }
      if (this._options.restoreinitialposition && this._initialposition) {
        Scroll.animateScroll(this._initialposition, this._options.animationspeed);
      }
      (_this$_options$onStop = (_this$_options3 = this._options).onStop) === null || _this$_options$onStop === void 0 || _this$_options$onStop.call(_this$_options3, this);
      this.cacheManager.set(CacheKeys.IsStarted, false);
      this.cacheManager.clear(CacheKeys.CurrentProgress);
    }
  }
  complete() {
    if (this._active) {
      var _this$_options$onComp, _this$_options4;
      this.stop();
      (_this$_options$onComp = (_this$_options4 = this._options).onComplete) === null || _this$_options$onComp === void 0 || _this$_options$onComp.call(_this$_options4, this);
    }
  }
  deinit() {
    if (this._ready) {
      var _this$_containerEleme;
      (_this$_containerEleme = this._containerElement) === null || _this$_containerEleme === void 0 || _this$_containerEleme.remove();
      // delete this._containerElement;
      this._active = false;
      this._ready = false;
    }
  }
}
_defineProperty(Tour, "ActionHandler", ActionHandler);
_defineProperty(Tour, "ContentDecorator", ContentDecorator);
_defineProperty(Tour, "MarkdownDecorator", MarkdownDecorator);
_defineProperty(Tour, "PopoverStep", PopoverStep);
_defineProperty(Tour, "Helpers", {
  u,
  ...Utils
});

export { Tour as default };
