function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
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
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

var u$2 = umbrella_min.exports;

var Icons = "<svg id=\"GuidedTourIconSet\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"display: none;\">\n<symbol id=\"tour-icon-close\" viewBox=\"0 0 20 20\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M16,16 L4,4\"></path><path d=\"M16,4 L4,16\"></path></g></symbol>\n<symbol id=\"tour-icon-next\" viewBox=\"0 0 20 20\"><polyline points=\"7 4 13 10 7 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\"></polyline></symbol>\n<symbol id=\"tour-icon-prev\" viewBox=\"0 0 20 20\"><polyline points=\"12 4 6 10 12 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\"></polyline></symbol>\n<symbol id=\"tour-icon-complete\" viewBox=\"0 0 20 20\"><polyline points=\"4,10 8,15 17,4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\"></polyline></symbol>\n</svg>";

function assert(assertion, message) {
  if (!assertion) throw "TourguideJS: ".concat(message);
  return true;
}

function clamp(number, min, max) {
  min = isNaN(min) ? number : min;
  max = isNaN(max) ? number : max;
  return Math.max(min, Math.min(number, max));
}
function isTargetValid(target) {
  return target && !!(target.offsetWidth || target.offsetHeight || target.getClientRects().length);
}
function setStyle(element, styleObj) {
  Object.keys(styleObj).forEach(function (key) {
    if (typeof styleObj[key] === "number") {
      styleObj[key] = Math.floor(styleObj[key]) + "px";
    }
  });
  Object.assign(u$2(element).first().style, styleObj);
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
function colorObjToStyleVarString(colors) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "--tourguide";
  var selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ":host";
  var styleArray = [];
  Object.entries(colors).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    var splitNameArray = [prefix];
    var prevIndex = 0;
    for (var i = 0; i < key.length; i += 1) {
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

/**
 * scroll element by coordinates (cross browser support)
 * @param {Element} element target element
 * @param {number} x scroll offset from left
 * @param {number} y scroll offset from top
 */
function setElementScroll$1(element, x, y) {
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
function animateScroll(scrollItems, time) {
  var startTime = Date.now();
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
      console.warn("target element ".concat(el, " not found, skip"));
      return;
    }
    var diffTime = Date.now() - startTime;
    var timeValue = Math.min(1 / time * diffTime, 1);
    var easeValue = 1 - ease(timeValue);
    var differenceX = x - el.scrollLeft;
    var differenceY = y - el.scrollTop;
    setElementScroll$1(el, x - differenceX * easeValue, y - differenceY * easeValue);
    if (diffTime >= time) {
      setElementScroll$1(el, x, y);
      return;
    }
    raf(animate.bind(null, el, x, y));
  }
  scrollItems.forEach(function (item) {
    animate(item.element, item.x, item.y);
  });
}

/**
 * Getting scroll coordinates (cross browser support)
 * @param {Element | string} target target element
 * @returns {{ element: Element, x: number, y: number }[]} scrollItems
 */
function getScrollCoordinates(target) {
  var scrollItems = [];
  var targetUEl = u$2(target);
  do {
    if (!targetUEl) targetUEl = false;
    if (!targetUEl.first()) targetUEl = false;
    try {
      var element = targetUEl.first();
      if (element.scrollHeight !== element.height || element.scrollWidth !== element.width) {
        scrollItems.push({
          element: targetUEl.first(),
          x: targetUEl.first().scrollLeft,
          y: targetUEl.first().scrollTop
        });
      }
      targetUEl = targetUEl.parent();
    } catch (error) {
      targetUEl = false;
    }
  } while (targetUEl);
  return scrollItems;
}
function getMaxZIndex() {
  return Math.max.apply(Math, _toConsumableArray(Array.from(document.querySelectorAll('body *'), function (el) {
    return parseFloat(window.getComputedStyle(el).zIndex);
  }).filter(function (zIndex) {
    return !Number.isNaN(zIndex);
  })).concat([0]));
}

function hexToRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(Math.floor(r)) + componentToHex(Math.floor(g)) + componentToHex(Math.floor(b));
}
function RGBToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  var l = Math.max(r, g, b);
  var s = l - Math.min(r, g, b);
  var h = s ? l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s : 0;
  return [60 * h < 0 ? 60 * h + 360 : 60 * h, 100 * (s ? l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s)) : 0), 100 * (2 * l - s) / 2];
}
function HSLToRGB(h, s, l) {
  s /= 100;
  l /= 100;
  var k = function k(n) {
    return (n + h / 30) % 12;
  };
  var a = s * Math.min(l, 1 - l);
  var f = function f(n) {
    return l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  };
  return [255 * f(0), 255 * f(8), 255 * f(4)];
}
function hexToHSL(hex) {
  return RGBToHSL.apply(null, hexToRGB(hex));
}
function HSLToHex(h, s, l) {
  return rgbToHex.apply(null, HSLToRGB(h, s, l));
}
function adjust(hex, h, s, l) {
  var hsl = hexToHSL(hex);
  hsl[0] = clamp(hsl[0] * h, 0, 255);
  hsl[1] = clamp(hsl[1] * s, 0, 255);
  hsl[2] = clamp(hsl[2] * l, 0, 255);
  return HSLToHex.apply(null, hsl);
}
function setAutoColors(defaultStyle, optionsStyle) {
  var style = Object.assign(defaultStyle, optionsStyle || {});
  var filter = /Color$/;
  var accentColor = style.accentColor;
  Object.keys(style).filter(function (key) {
    return filter.test(key) && style[key] === "auto";
  }).forEach(function (key) {
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

function t$1(t){return t.split("-")[0]}function e$1(t){return t.split("-")[1]}function n$2(e){return ["top","bottom"].includes(t$1(e))?"x":"y"}function i$1(t){return "y"===t?"height":"width"}function r$2(r,o,a){let{reference:l,floating:s}=r;const c=l.x+l.width/2-s.width/2,f=l.y+l.height/2-s.height/2,u=n$2(o),m=i$1(u),g=l[m]/2-s[m]/2,d="x"===u;let p;switch(t$1(o)){case"top":p={x:c,y:l.y-s.height};break;case"bottom":p={x:c,y:l.y+l.height};break;case"right":p={x:l.x+l.width,y:f};break;case"left":p={x:l.x-s.width,y:f};break;default:p={x:l.x,y:l.y};}switch(e$1(o)){case"start":p[u]-=g*(a&&d?-1:1);break;case"end":p[u]+=g*(a&&d?-1:1);}return p}const o$1=async(t,e,n)=>{const{placement:i="bottom",strategy:o="absolute",middleware:a=[],platform:l}=n,s=a.filter(Boolean),c=await(null==l.isRTL?void 0:l.isRTL(e));let f=await l.getElementRects({reference:t,floating:e,strategy:o}),{x:u,y:m}=r$2(f,i,c),g=i,d={},p=0;for(let n=0;n<s.length;n++){const{name:a,fn:h}=s[n],{x:y,y:x,data:w,reset:v}=await h({x:u,y:m,initialPlacement:i,placement:g,strategy:o,middlewareData:d,rects:f,platform:l,elements:{reference:t,floating:e}});u=null!=y?y:u,m=null!=x?x:m,d={...d,[a]:{...d[a],...w}},v&&p<=50&&(p++,"object"==typeof v&&(v.placement&&(g=v.placement),v.rects&&(f=!0===v.rects?await l.getElementRects({reference:t,floating:e,strategy:o}):v.rects),({x:u,y:m}=r$2(f,g,c))),n=-1);}return {x:u,y:m,placement:g,strategy:o,middlewareData:d}};function a$1(t){return "number"!=typeof t?function(t){return {top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function l$1(t){return {...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}async function s$1(t,e){var n;void 0===e&&(e={});const{x:i,y:r,platform:o,rects:s,elements:c,strategy:f}=t,{boundary:u="clippingAncestors",rootBoundary:m="viewport",elementContext:g="floating",altBoundary:d=!1,padding:p=0}=e,h=a$1(p),y=c[d?"floating"===g?"reference":"floating":g],x=l$1(await o.getClippingRect({element:null==(n=await(null==o.isElement?void 0:o.isElement(y)))||n?y:y.contextElement||await(null==o.getDocumentElement?void 0:o.getDocumentElement(c.floating)),boundary:u,rootBoundary:m,strategy:f})),w="floating"===g?{...s.floating,x:i,y:r}:s.reference,v=await(null==o.getOffsetParent?void 0:o.getOffsetParent(c.floating)),b=await(null==o.isElement?void 0:o.isElement(v))&&await(null==o.getScale?void 0:o.getScale(v))||{x:1,y:1},R=l$1(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({rect:w,offsetParent:v,strategy:f}):w);return {top:(x.top-R.top+h.top)/b.y,bottom:(R.bottom-x.bottom+h.bottom)/b.y,left:(x.left-R.left+h.left)/b.x,right:(R.right-x.right+h.right)/b.x}}const c$1=Math.min,f$1=Math.max;function u$1(t,e,n){return f$1(t,c$1(e,n))}const m$1=t=>({name:"arrow",options:t,async fn(r){const{element:o,padding:l=0}=null!=t?t:{},{x:s,y:c,placement:f,rects:m,platform:g}=r;if(null==o)return {};const d=a$1(l),p={x:s,y:c},h=n$2(f),y=e$1(f),x=i$1(h),w=await g.getDimensions(o),v="y"===h?"top":"left",b="y"===h?"bottom":"right",R=m.reference[x]+m.reference[h]-p[h]-m.floating[x],A=p[h]-m.reference[h],P=await(null==g.getOffsetParent?void 0:g.getOffsetParent(o));let T=P?"y"===h?P.clientHeight||0:P.clientWidth||0:0;0===T&&(T=m.floating[x]);const O=R/2-A/2,E=d[v],L=T-w[x]-d[b],D=T/2-w[x]/2+O,k=u$1(E,D,L),B=("start"===y?d[v]:d[b])>0&&D!==k&&m.reference[x]<=m.floating[x];return {[h]:p[h]-(B?D<E?E-D:L-D:0),data:{[h]:k,centerOffset:D-k}}}}),g$1={left:"right",right:"left",bottom:"top",top:"bottom"};function d$1(t){return t.replace(/left|right|bottom|top/g,(t=>g$1[t]))}function p$1(t,r,o){void 0===o&&(o=!1);const a=e$1(t),l=n$2(t),s=i$1(l);let c="x"===l?a===(o?"end":"start")?"right":"left":"start"===a?"bottom":"top";return r.reference[s]>r.floating[s]&&(c=d$1(c)),{main:c,cross:d$1(c)}}const h$1={start:"end",end:"start"};function y$1(t){return t.replace(/start|end/g,(t=>h$1[t]))}const x$1=["top","right","bottom","left"],w$1=x$1.reduce(((t,e)=>t.concat(e,e+"-start",e+"-end")),[]);const v$1=function(n){return void 0===n&&(n={}),{name:"autoPlacement",options:n,async fn(i){var r,o,a,l,c;const{x:f,y:u,rects:m,middlewareData:g,placement:d,platform:h,elements:x}=i,{alignment:v=null,allowedPlacements:b=w$1,autoAlignment:R=!0,...A}=n,P=function(n,i,r){return (n?[...r.filter((t=>e$1(t)===n)),...r.filter((t=>e$1(t)!==n))]:r.filter((e=>t$1(e)===e))).filter((t=>!n||e$1(t)===n||!!i&&y$1(t)!==t))}(v,R,b),T=await s$1(i,A),O=null!=(r=null==(o=g.autoPlacement)?void 0:o.index)?r:0,E=P[O];if(null==E)return {};const{main:L,cross:D}=p$1(E,m,await(null==h.isRTL?void 0:h.isRTL(x.floating)));if(d!==E)return {x:f,y:u,reset:{placement:P[0]}};const k=[T[t$1(E)],T[L],T[D]],B=[...null!=(a=null==(l=g.autoPlacement)?void 0:l.overflows)?a:[],{placement:E,overflows:k}],C=P[O+1];if(C)return {data:{index:O+1,overflows:B},reset:{placement:C}};const H=B.slice().sort(((t,e)=>t.overflows[0]-e.overflows[0])),V=null==(c=H.find((t=>{let{overflows:e}=t;return e.every((t=>t<=0))})))?void 0:c.placement,S=null!=V?V:H[0].placement;return S!==d?{data:{index:O+1,overflows:B},reset:{placement:S}}:{}}}};const T$1=function(i){return void 0===i&&(i=0),{name:"offset",options:i,async fn(r){const{x:o,y:a}=r,l=await async function(i,r){const{placement:o,platform:a,elements:l}=i,s=await(null==a.isRTL?void 0:a.isRTL(l.floating)),c=t$1(o),f=e$1(o),u="x"===n$2(o),m=["left","top"].includes(c)?-1:1,g=s&&u?-1:1,d="function"==typeof r?r(i):r;let{mainAxis:p,crossAxis:h,alignmentAxis:y}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return f&&"number"==typeof y&&(h="end"===f?-1*y:y),u?{x:h*g,y:p*m}:{x:p*m,y:h*g}}(r,i);return {x:o+l.x,y:a+l.y,data:l}}}};

function n$1(t){var e;return (null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function o(t){return n$1(t).getComputedStyle(t)}function i(t){return f(t)?(t.nodeName||"").toLowerCase():""}let r$1;function l(){if(r$1)return r$1;const t=navigator.userAgentData;return t&&Array.isArray(t.brands)?(r$1=t.brands.map((t=>t.brand+"/"+t.version)).join(" "),r$1):navigator.userAgent}function c(t){return t instanceof n$1(t).HTMLElement}function s(t){return t instanceof n$1(t).Element}function f(t){return t instanceof n$1(t).Node}function u(t){if("undefined"==typeof ShadowRoot)return !1;return t instanceof n$1(t).ShadowRoot||t instanceof ShadowRoot}function a(t){const{overflow:e,overflowX:n,overflowY:i,display:r}=o(t);return /auto|scroll|overlay|hidden/.test(e+i+n)&&!["inline","contents"].includes(r)}function d(t){return ["table","td","th"].includes(i(t))}function h(t){const e=/firefox/i.test(l()),n=o(t),i=n.backdropFilter||n.WebkitBackdropFilter;return "none"!==n.transform||"none"!==n.perspective||!!i&&"none"!==i||e&&"filter"===n.willChange||e&&!!n.filter&&"none"!==n.filter||["transform","perspective"].some((t=>n.willChange.includes(t)))||["paint","layout","strict","content"].some((t=>{const e=n.contain;return null!=e&&e.includes(t)}))}function g(){return !/^((?!chrome|android).)*safari/i.test(l())}function m(t){return ["html","body","#document"].includes(i(t))}const p={x:1,y:1};function y(t){const e=!s(t)&&t.contextElement?t.contextElement:s(t)?t:null;if(!e)return p;const n=e.getBoundingClientRect(),i=o(e);let r=n.width/parseFloat(i.width),l=n.height/parseFloat(i.height);return r&&Number.isFinite(r)||(r=1),l&&Number.isFinite(l)||(l=1),{x:r,y:l}}function w(t,e,o,i){var r,l,c,f;void 0===e&&(e=!1),void 0===o&&(o=!1);const u=t.getBoundingClientRect();let a=p;e&&(i?s(i)&&(a=y(i)):a=y(t));const d=s(t)?n$1(t):window,h=!g()&&o,m=(u.left+(h&&null!=(r=null==(l=d.visualViewport)?void 0:l.offsetLeft)?r:0))/a.x,w=(u.top+(h&&null!=(c=null==(f=d.visualViewport)?void 0:f.offsetTop)?c:0))/a.y,x=u.width/a.x,v=u.height/a.y;return {width:x,height:v,top:w,right:m+x,bottom:w+v,left:m,x:m,y:w}}function x(t){return ((f(t)?t.ownerDocument:t.document)||window.document).documentElement}function v(t){return s(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function b(t){return w(x(t)).left+v(t).scrollLeft}function L(t,e,n){const o=c(e),r=x(e),l=w(t,!0,"fixed"===n,e);let s={scrollLeft:0,scrollTop:0};const f={x:0,y:0};if(o||!o&&"fixed"!==n)if(("body"!==i(e)||a(r))&&(s=v(e)),c(e)){const t=w(e,!0);f.x=t.x+e.clientLeft,f.y=t.y+e.clientTop;}else r&&(f.x=b(r));return {x:l.left+s.scrollLeft-f.x,y:l.top+s.scrollTop-f.y,width:l.width,height:l.height}}function E(t){if("html"===i(t))return t;const e=t.assignedSlot||t.parentNode||(u(t)?t.host:null)||x(t);return u(e)?e.host:e}function R(t){return c(t)&&"fixed"!==o(t).position?t.offsetParent:null}function T(t){const e=n$1(t);let r=R(t);for(;r&&d(r)&&"static"===o(r).position;)r=R(r);return r&&("html"===i(r)||"body"===i(r)&&"static"===o(r).position&&!h(r))?e:r||function(t){let e=E(t);for(;c(e)&&!m(e);){if(h(e))return e;e=E(e);}return null}(t)||e}const W=Math.min,C=Math.max;function D(t){const e=E(t);return m(e)?t.ownerDocument.body:c(e)&&a(e)?e:D(e)}function F(t,e){var o;void 0===e&&(e=[]);const i=D(t),r=i===(null==(o=t.ownerDocument)?void 0:o.body),l=n$1(i);return r?e.concat(l,l.visualViewport||[],a(i)?i:[]):e.concat(i,F(i))}function A(e,i,r){return "viewport"===i?l$1(function(t,e){const o=n$1(t),i=x(t),r=o.visualViewport;let l=i.clientWidth,c=i.clientHeight,s=0,f=0;if(r){l=r.width,c=r.height;const t=g();(t||!t&&"fixed"===e)&&(s=r.offsetLeft,f=r.offsetTop);}return {width:l,height:c,x:s,y:f}}(e,r)):s(i)?function(t,e){const n=w(t,!0,"fixed"===e),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=c(t)?y(t):{x:1,y:1},l=t.clientWidth*r.x,s=t.clientHeight*r.y,f=i*r.x,u=o*r.y;return {top:u,left:f,right:f+l,bottom:u+s,x:f,y:u,width:l,height:s}}(i,r):l$1(function(t){var e;const n=x(t),i=v(t),r=null==(e=t.ownerDocument)?void 0:e.body,l=C(n.scrollWidth,n.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),c=C(n.scrollHeight,n.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0);let s=-i.scrollLeft+b(t);const f=-i.scrollTop;return "rtl"===o(r||n).direction&&(s+=C(n.clientWidth,r?r.clientWidth:0)-l),{width:l,height:c,x:s,y:f}}(x(e)))}const H={getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:r,strategy:l}=t;const c="clippingAncestors"===n?function(t,e){const n=e.get(t);if(n)return n;let r=F(t).filter((t=>s(t)&&"body"!==i(t))),l=null;const c="fixed"===o(t).position;let f=c?E(t):t;for(;s(f)&&!m(f);){const t=o(f),e=h(f);(c?e||l:e||"static"!==t.position||!l||!["absolute","fixed"].includes(l.position))?l=t:r=r.filter((t=>t!==f)),f=E(f);}return e.set(t,r),r}(e,this._c):[].concat(n),f=[...c,r],u=f[0],a=f.reduce(((t,n)=>{const o=A(e,n,l);return t.top=C(o.top,t.top),t.right=W(o.right,t.right),t.bottom=W(o.bottom,t.bottom),t.left=C(o.left,t.left),t}),A(e,u,l));return {width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:n,strategy:o}=t;const r=c(n),l=x(n);if(n===l)return e;let s={scrollLeft:0,scrollTop:0},f={x:1,y:1};const u={x:0,y:0};if((r||!r&&"fixed"!==o)&&(("body"!==i(n)||a(l))&&(s=v(n)),c(n))){const t=w(n);f=y(n),u.x=t.x+n.clientLeft,u.y=t.y+n.clientTop;}return {width:e.width*f.x,height:e.height*f.y,x:e.x*f.x-s.scrollLeft*f.x+u.x,y:e.y*f.y-s.scrollTop*f.y+u.y}},isElement:s,getDimensions:function(t){if(c(t))return {width:t.offsetWidth,height:t.offsetHeight};const e=w(t);return {width:e.width,height:e.height}},getOffsetParent:T,getDocumentElement:x,getScale:y,async getElementRects(t){let{reference:e,floating:n,strategy:o}=t;const i=this.getOffsetParent||T,r=this.getDimensions;return {reference:L(e,await i(n),o),floating:{x:0,y:0,...await r(n)}}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>"rtl"===o(t).direction};const O=(t,n,o)=>{const i=new Map,r={platform:H,...o},l={...r.platform,_c:i};return o$1(t,n,{...r,platform:l})};

var keepinview = function keepinview(_ref) {
  var _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? 0 : _ref$padding;
  return {
    name: "keepinview",
    fn: function fn(_ref2) {
      var x = _ref2.x,
        y = _ref2.y,
        rects = _ref2.rects,
        middlewareData = _ref2.middlewareData,
        platform = _ref2.platform;
      var documentDimentions = platform.getDimensions(window);
      var _x = clamp(x, padding, documentDimentions.width - rects.floating.width - padding);
      var _y = clamp(y, padding, documentDimentions.height - rects.floating.height - padding);
      var dx = x - _x;
      var dy = y - _y;
      var arrow = middlewareData.arrow;
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
var positionInView = function positionInView(_ref3) {
  var placement = _ref3.placement;
  return {
    name: "positionInView",
    fn: function fn(_ref4) {
      var x = _ref4.x,
        y = _ref4.y,
        rects = _ref4.rects,
        platform = _ref4.platform;
      var _x = x,
        _y = y;
      var documentDimentions = platform.getDimensions(window);
      var _placement$split = placement.split("-"),
        _placement$split2 = _slicedToArray(_placement$split, 2),
        align_y = _placement$split2[0],
        align_x = _placement$split2[1];
      switch (align_x) {
        case "start":
          _x = 0;
          break;
        case "center":
          _x = documentDimentions.width / 2 - rects.floating.width / 2;
          break;
        case "end":
          _x = documentDimentions.width - rects.floating.width;
          break;
      }
      switch (align_y) {
        case "top":
          _y = 0;
          break;
        case "middle":
          _y = documentDimentions.height / 2 - rects.floating.height / 2;
          break;
        case "bottom":
          _y = documentDimentions.height - rects.floating.height;
          break;
      }
      return {
        x: _x,
        y: _y
      };
    }
  };
};
var highlight = function highlight(options) {
  return {
    name: "highlight",
    options: options,
    fn: function fn(state) {
      var _ref5 = options || {},
        isValidTarget = _ref5.isValidTarget,
        element = _ref5.element,
        _ref5$padding = _ref5.padding,
        padding = _ref5$padding === void 0 ? 0 : _ref5$padding;
      var rects = state.rects;
      if (!isTargetValid(element)) {
        return {};
      }
      var data = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      };
      if (isValidTarget) {
        data.top = "".concat(rects.reference.y - padding, "px");
        data.left = "".concat(rects.reference.x - padding, "px");
        data.width = "".concat(rects.reference.width + padding * 2, "px");
        data.height = "".concat(rects.reference.height + padding * 2, "px");
      }
      setStyle(element, data);
      return {
        data: data
      };
    }
  };
};
function offsetAssist(props) {
  var side = props.placement.split("-")[0];
  switch (side) {
    case "top":
      return 32;
    case "left":
    case "right":
      return 24;
    default:
      return 6;
  }
}
function positionTooltip(target, tooltipEl, arrowEl, highlightEl, step) {
  var isValidTarget = isTargetValid(target);
  O(isValidTarget ? target : window, tooltipEl, {
    // placement: 'bottom-start',
    middleware: [
    // flip(),
    isValidTarget ? v$1({
      alignment: step.alignment || "bottom-start"
    }) : positionInView({
      placement: step.placement || "center-middle"
    }), T$1(offsetAssist), highlight({
      element: highlightEl,
      padding: step.context.options.padding,
      isValidTarget: isValidTarget
    }), m$1({
      element: arrowEl,
      padding: 8
    }), keepinview({
      padding: 24
    })]
  }).then(function (_ref6) {
    var x = _ref6.x,
      y = _ref6.y,
      middlewareData = _ref6.middlewareData,
      placement = _ref6.placement;
    setStyle(tooltipEl, {
      left: "".concat(x, "px"),
      top: "".concat(y, "px")
    });
    if (middlewareData.arrow && isValidTarget) {
      var side = placement.split("-")[0];
      var staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[side];
      setStyle(arrowEl, _defineProperty({
        left: middlewareData.arrow.x != null ? "".concat(middlewareData.arrow.x, "px") : "",
        top: middlewareData.arrow.y != null ? "".concat(middlewareData.arrow.y, "px") : "",
        right: "",
        bottom: ""
      }, staticSide, "".concat(-arrowEl.offsetWidth / 2, "px")));
    } else {
      setStyle(arrowEl, {
        display: "none"
      });
    }
  });
}

var ActionHandler = /*#__PURE__*/_createClass(function ActionHandler(name, handlerFn) {
  _classCallCheck(this, ActionHandler);
  this.name = name;
  this.onAction = handlerFn;
});

function parseProperties(props) {
  return (props || "").split(",").map(function (p) {
    return p.trim();
  }).filter(Boolean);
}
function getMatches(str, regex) {
  var matches = [],
    m;
  regex.lastIndex = 0;
  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    // m.forEach((match, groupIndex) => {
    matches.push({
      match: m[0],
      start: m.index,
      length: m[0].length,
      properties: parseProperties(m[1])
    });
    // });
  }

  return matches;
}
var ContentDecorator = /*#__PURE__*/function () {
  function ContentDecorator(match, decoratorFn) {
    _classCallCheck(this, ContentDecorator);
    if (typeof match === 'string') this.match = new RegExp("{s*".concat(match.trim(), "s*(,.+?)?s*?}"), 'gmi');else this.match = match;
    this.decoratorFn = decoratorFn;
  }
  _createClass(ContentDecorator, [{
    key: "test",
    value: function test(text) {
      return this.match.test(text);
    }
  }, {
    key: "render",
    value: function render(text, step, context) {
      try {
        var matches = getMatches(text, this.match).reverse();
        return this.decoratorFn(text, matches, step, context);
      } catch (e) {
        console.warn(e);
        return text;
      }
    }
  }]);
  return ContentDecorator;
}();

var BaseStep = /*#__PURE__*/function () {
  function BaseStep(data, context) {
    _classCallCheck(this, BaseStep);
    Object.assign(this, data);
    this.context = context;
    this.active = false;
    this.first = false;
    this.last = false;
  }
  _createClass(BaseStep, [{
    key: "attach",
    value: function attach() {
      // STUB
      console.info("Step attach", this.index);
    }
  }, {
    key: "show",
    value: function show() {
      // STUB
      console.info("Step show", this.index);
    }
  }, {
    key: "hide",
    value: function hide() {
      // STUB
      console.info("Step hide", this.index);
    }
  }, {
    key: "remove",
    value: function remove() {
      // STUB
      console.info("Step remove", this.index);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var index = this.index,
        active = this.active;
      return {
        index: index,
        active: active
      };
    }
  }]);
  return BaseStep;
}();
BaseStep.type = "default";

var COMPLETE = 'complete',
    CANCELED = 'canceled';

function raf(task){
    if('requestAnimationFrame' in window){
        return window.requestAnimationFrame(task);
    }

    setTimeout(task, 16);
}

function setElementScroll(element, x, y){

    if(element.self === element){
        element.scrollTo(x, y);
    }else {
        element.scrollLeft = x;
        element.scrollTop = y;
    }
}

function getTargetScrollLocation(scrollSettings, parent){
    var align = scrollSettings.align,
        target = scrollSettings.target,
        targetPosition = target.getBoundingClientRect(),
        parentPosition,
        x,
        y,
        differenceX,
        differenceY,
        targetWidth,
        targetHeight,
        leftAlign = align && align.left != null ? align.left : 0.5,
        topAlign = align && align.top != null ? align.top : 0.5,
        leftOffset = align && align.leftOffset != null ? align.leftOffset : 0,
        topOffset = align && align.topOffset != null ? align.topOffset : 0,
        leftScalar = leftAlign,
        topScalar = topAlign;

    if(scrollSettings.isWindow(parent)){
        targetWidth = Math.min(targetPosition.width, parent.innerWidth);
        targetHeight = Math.min(targetPosition.height, parent.innerHeight);
        x = targetPosition.left + parent.pageXOffset - parent.innerWidth * leftScalar + targetWidth * leftScalar;
        y = targetPosition.top + parent.pageYOffset - parent.innerHeight * topScalar + targetHeight * topScalar;
        x -= leftOffset;
        y -= topOffset;
        x = scrollSettings.align.lockX ? parent.pageXOffset : x;
        y = scrollSettings.align.lockY ? parent.pageYOffset : y;
        differenceX = x - parent.pageXOffset;
        differenceY = y - parent.pageYOffset;
    }else {
        targetWidth = targetPosition.width;
        targetHeight = targetPosition.height;
        parentPosition = parent.getBoundingClientRect();
        var offsetLeft = targetPosition.left - (parentPosition.left - parent.scrollLeft);
        var offsetTop = targetPosition.top - (parentPosition.top - parent.scrollTop);
        x = offsetLeft + (targetWidth * leftScalar) - parent.clientWidth * leftScalar;
        y = offsetTop + (targetHeight * topScalar) - parent.clientHeight * topScalar;
        x -= leftOffset;
        y -= topOffset;
        x = Math.max(Math.min(x, parent.scrollWidth - parent.clientWidth), 0);
        y = Math.max(Math.min(y, parent.scrollHeight - parent.clientHeight), 0);
        x = scrollSettings.align.lockX ? parent.scrollLeft : x;
        y = scrollSettings.align.lockY ? parent.scrollTop : y;
        differenceX = x - parent.scrollLeft;
        differenceY = y - parent.scrollTop;
    }

    return {
        x: x,
        y: y,
        differenceX: differenceX,
        differenceY: differenceY
    };
}

function animate(parent){
    var scrollSettings = parent._scrollSettings;

    if(!scrollSettings){
        return;
    }

    var maxSynchronousAlignments = scrollSettings.maxSynchronousAlignments;

    var location = getTargetScrollLocation(scrollSettings, parent),
        time = Date.now() - scrollSettings.startTime,
        timeValue = Math.min(1 / scrollSettings.time * time, 1);

    if(scrollSettings.endIterations >= maxSynchronousAlignments){
        setElementScroll(parent, location.x, location.y);
        parent._scrollSettings = null;
        return scrollSettings.end(COMPLETE);
    }

    var easeValue = 1 - scrollSettings.ease(timeValue);

    setElementScroll(parent,
        location.x - location.differenceX * easeValue,
        location.y - location.differenceY * easeValue
    );

    if(time >= scrollSettings.time){
        scrollSettings.endIterations++;
        // Align ancestor synchronously
        scrollSettings.scrollAncestor && animate(scrollSettings.scrollAncestor);
        animate(parent);
        return;
    }

    raf(animate.bind(null, parent));
}

function defaultIsWindow(target){
    return target.self === target
}

function transitionScrollTo(target, parent, settings, scrollAncestor, callback){
    var idle = !parent._scrollSettings,
        lastSettings = parent._scrollSettings,
        now = Date.now(),
        cancelHandler,
        passiveOptions = { passive: true };

    if(lastSettings){
        lastSettings.end(CANCELED);
    }

    function end(endType){
        parent._scrollSettings = null;

        if(parent.parentElement && parent.parentElement._scrollSettings){
            parent.parentElement._scrollSettings.end(endType);
        }

        if(settings.debug){
            console.log('Scrolling ended with type', endType, 'for', parent);
        }

        callback(endType);
        if(cancelHandler){
            parent.removeEventListener('touchstart', cancelHandler, passiveOptions);
            parent.removeEventListener('wheel', cancelHandler, passiveOptions);
        }
    }

    var maxSynchronousAlignments = settings.maxSynchronousAlignments;

    if(maxSynchronousAlignments == null){
        maxSynchronousAlignments = 3;
    }

    parent._scrollSettings = {
        startTime: now,
        endIterations: 0,
        target: target,
        time: settings.time,
        ease: settings.ease,
        align: settings.align,
        isWindow: settings.isWindow || defaultIsWindow,
        maxSynchronousAlignments: maxSynchronousAlignments,
        end: end,
        scrollAncestor
    };

    if(!('cancellable' in settings) || settings.cancellable){
        cancelHandler = end.bind(null, CANCELED);
        parent.addEventListener('touchstart', cancelHandler, passiveOptions);
        parent.addEventListener('wheel', cancelHandler, passiveOptions);
    }

    if(idle){
        animate(parent);
    }

    return cancelHandler
}

function defaultIsScrollable(element){
    return (
        'pageXOffset' in element ||
        (
            element.scrollHeight !== element.clientHeight ||
            element.scrollWidth !== element.clientWidth
        ) &&
        getComputedStyle(element).overflow !== 'hidden'
    );
}

function defaultValidTarget(){
    return true;
}

function findParentElement(el){
    if (el.assignedSlot) {
        return findParentElement(el.assignedSlot);
    }

    if (el.parentElement) {
        if(el.parentElement.tagName === 'BODY'){
            return el.parentElement.ownerDocument.defaultView || el.parentElement.ownerDocument.ownerWindow;
        }
        return el.parentElement;
    }

    if (el.getRootNode){
        var parent = el.getRootNode();
        if(parent.nodeType === 11) {
            return parent.host;
        }
    }
}

var scrollIntoView = function(target, settings, callback){
    if(!target){
        return;
    }

    if(typeof settings === 'function'){
        callback = settings;
        settings = null;
    }

    if(!settings){
        settings = {};
    }

    settings.time = isNaN(settings.time) ? 1000 : settings.time;
    settings.ease = settings.ease || function(v){return 1 - Math.pow(1 - v, v / 2);};
    settings.align = settings.align || {};

    var parent = findParentElement(target),
        parents = 1;

    function done(endType){
        parents--;
        if(!parents){
            callback && callback(endType);
        }
    }

    var validTarget = settings.validTarget || defaultValidTarget;
    var isScrollable = settings.isScrollable;

    if(settings.debug){
        console.log('About to scroll to', target);

        if(!parent){
            console.error('Target did not have a parent, is it mounted in the DOM?');
        }
    }

    var scrollingElements = [];

    while(parent){
        if(settings.debug){
            console.log('Scrolling parent node', parent);
        }

        if(validTarget(parent, parents) && (isScrollable ? isScrollable(parent, defaultIsScrollable) : defaultIsScrollable(parent))){
            parents++;
            scrollingElements.push(parent);
        }

        parent = findParentElement(parent);

        if(!parent){
            done(COMPLETE);
            break;
        }
    }

    return scrollingElements.reduce((cancel, parent, index) => transitionScrollTo(target, parent, settings, scrollingElements[index + 1], done), null);
};

var PopoverBaseStep = /*#__PURE__*/function (_BaseStep) {
  _inherits(PopoverBaseStep, _BaseStep);
  var _super = _createSuper(PopoverBaseStep);
  function PopoverBaseStep(data, context) {
    var _this;
    _classCallCheck(this, PopoverBaseStep);
    _this = _super.call(this, data, context);
    _this._target = null;
    _this._timerHandler = null;
    _this._scrollCancel = null;
    _this._selector = data.selector;
    assert(data.hasOwnProperty("title"), "missing required step parameter: title\n" + JSON.stringify(data, null, 2) + "\n" + "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach");
    assert(data.hasOwnProperty("content"), "missing required step parameter: content\n" + JSON.stringify(data, null, 2) + "\n" + "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach");
    _this.layout = data.layout || PopoverBaseStep.defaults.layout;
    _this.alignment = data.alignment || context.options.alignment || PopoverBaseStep.defaults.alignment;
    _this.placement = data.placement || context.options.placement || PopoverBaseStep.defaults.placement;
    _this.overlay = data.overlay !== false;
    _this.navigation = data.navigation !== false;
    if (data.image && context.options.preloadimages && !/^data:/i.test(data.image)) {
      var preload = new Image();
      preload.onerror = function () {
        console.error(new Error("Invalid image URL: ".concat(data.image)));
        _this.image = null;
      };
      preload.src = _this.image;
    }
    _this.actions = [];
    if (data.actions) {
      if (!Array.isArray(data.actions)) {
        console.error(new Error("actions must be array but got ".concat(_typeof(data.actions))));
      } else {
        _this.actions = data.actions;
      }
    }
    return _this;
  }
  _createClass(PopoverBaseStep, [{
    key: "el",
    get: function get() {
      var _this2 = this;
      if (!this.container) {
        var image = this.context._u("<figure class=\"guided-tour-step-image\">".concat(this.image ? "<img src=\"".concat(this.image, "\" />") : "", "</figure>"));
        var content = this.context._u("<div class=\"guided-tour-step-content-wrapper\">\n          <div id=\"tooltip-title-".concat(this.index, "\" role=\"heading\" class=\"guided-tour-step-title\">").concat(this.context._decorateText(this.title, this), "</div>\n          <div class=\"guided-tour-step-content\">").concat(this.context._decorateText(this.content, this), "</div>\n        </div>"));
        content.find("a").on("click", function (e) {
          _this2.context.action(e, {
            action: "link"
          });
        });
        if (Array.isArray(this.actions) && this.actions.length > 0) {
          var actions = this.context._u("<div class=\"guided-tour-step-actions\">\n            ".concat(this.actions.map(function (action, index) {
            return "<".concat(action.href ? "a" : "button", " id=\"").concat(action.id, "\" ").concat(action.href ? "href=\"".concat(action.href, "\"") : "", " ").concat(action.target ? "target=\"".concat(action.target, "\"") : "", " class=\"button").concat(action.primary ? " primary" : "", "\" data-index=\"").concat(index, "\">").concat(action.label, "</").concat(action.href ? "a" : "button", ">");
          }).join(""), "\n          </div>"));
          actions.find("a, button").on("click", function (e) {
            var action = _this2.actions[parseInt(e.target.dataset.index)];
            if (action.action) e.preventDefault();
            _this2.context.action(e, action);
          });
          content.append(actions);
        }
        var tooltip = this.tooltip = this.context._u("<div role=\"document\" class=\"guided-tour-step-tooltip\"></div>");
        if (this.width) setStyle(tooltip, {
          width: this.width,
          maxWidth: this.width
        });
        if (this.height) setStyle(tooltip, {
          height: this.height,
          maxHeight: this.height
        });
        var tooltipinner = this.context._u("<div class=\"guided-tour-step-tooltip-inner".concat(this.layout === "horizontal" ? " step-layout-horizontal" : "", "\"></div>"));
        var container = this.context._u("<div class=\"guided-tour-step-content-container\"></div>");
        container.append(image).append(content);
        var arrow = this.arrow = this.context._u("<div class=\"guided-tour-arrow\"></div>");
        if (this.navigation) {
          var footer = this.context._u("<div class=\"guided-tour-step-footer\">\n                    <button class=\"guided-tour-step-button guided-tour-step-button-close\" title=\"End tour\">\n                        <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"16\" height=\"16\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-close\"></use></svg>\n                    </button>\n                    ".concat(!this.first ? "<button class=\"guided-tour-step-button guided-tour-step-button-prev\" title=\"Prev step\">\n                      <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                        <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-prev\"></use>\n                      </svg>\n                    </button>" : "", "\n                    ").concat(this.last ? "<button class=\"guided-tour-step-button guided-tour-step-button-complete\" title=\"Complete tour\">\n                      <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                        <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-complete\"></use>\n                      </svg>\n                    </button>" : "<button class=\"guided-tour-step-button guided-tour-step-button-next\" title=\"Next step\">\n                      <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                        <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-next\"></use>\n                      </svg>\n                    </button>", "\n                    ").concat(this.context.steps.length > 1 ? "<div class=\"guided-tour-step-bullets\">\n                        <ul>".concat(this.context.steps.map(function (step, i) {
            return "<li><button title=\"Go to step ".concat(i + 1, "\" data-index=\"").concat(step.index, "\" class=\"").concat(step.index < _this2.index ? "complete" : step.index == _this2.index ? "current" : "", "\"></button></li>");
          }).join(""), "</ul>\n                    </div>") : "", "\n                </div>"));
          footer.find(".guided-tour-step-button-prev").on("click", this.context.previous);
          footer.find(".guided-tour-step-button-next").on("click", this.context.next);
          footer.find(".guided-tour-step-button-close").on("click", this.context.stop);
          footer.find(".guided-tour-step-button-complete").on("click", this.context.complete);
          footer.find(".guided-tour-step-bullets button").on("click", function (e) {
            return _this2.context.go(parseInt(_this2.context._u(e.target).data("index")));
          });
          tooltipinner.append(arrow).append(container).append(footer);
        } else tooltipinner.append(arrow).append(container);
        tooltip.append(tooltipinner);
        this.container = this.context._u("<div role=\"dialog\" aria-labelleby=\"tooltip-title-".concat(this.index, "\" class=\"guided-tour-step").concat(this.first ? " guided-tour-step-first" : "").concat(this.last ? " guided-tour-step-last" : "", "\"></div>"));
        if (this.overlay) {
          var highlight = this.highlight = this.context._u("<div class=\"guided-tour-step-highlight\"></div>");
          this.container.append(highlight).append(tooltip);
        } else this.container.append(tooltip);
      }
      return this.container;
    }
  }, {
    key: "target",
    get: function get() {
      return this._target || this._selector && this.context._u(this._selector).first();
    },
    set: function set(target) {
      this._target = target;
    }
  }, {
    key: "_cancel",
    value: function _cancel() {
      if (this._timerHandler) clearTimeout(this._timerHandler);
      if (this._scrollCancel) this._scrollCancel();
    }
  }, {
    key: "_position",
    value: function _position() {
      this.context._positionTooltip(this.target, this.tooltip.first(), this.arrow.first(), this.highlight && this.highlight.first(), this);
    }
  }, {
    key: "attach",
    value: function attach(parent) {
      this.context._u(parent).append(this.el);
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;
      this._cancel();
      if (!this.active) {
        var show = function show() {
          _this3.el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
          _this3._position();
          _this3.active = true;
          _this3.container.find(".guided-tour-step-tooltip, button.primary, .guided-tour-step-button-complete, .guided-tour-step-button-next").last().focus({
            preventScroll: true
          });
        };
        var animationspeed = clamp(this.context.options.animationspeed, 120, 1000);
        if (isTargetValid(this.target)) {
          this._scrollCancel = scrollIntoView(this.target, {
            time: animationspeed,
            cancellable: false,
            align: {
              top: 0.5,
              left: 0.5
            }
          });
        }
        this._timerHandler = setTimeout(show, animationspeed * 3);
        return true;
      }
      return false;
    }
  }, {
    key: "hide",
    value: function hide() {
      this._cancel();
      if (this.active) {
        this.el.removeClass("active");
        this.active = false;
        return true;
      }
      return false;
    }
  }, {
    key: "remove",
    value: function remove() {
      this.hide();
      this.el.remove();
    }
  }]);
  return PopoverBaseStep;
}(BaseStep);
PopoverBaseStep.defaults = {
  layout: "vertical",
  alignment: "bottom-start",
  placement: "middle-center"
};
PopoverBaseStep.type = "default";

var VideoPlayer = /*#__PURE__*/function (_BaseStep) {
  _inherits(VideoPlayer, _BaseStep);
  var _super = _createSuper(VideoPlayer);
  function VideoPlayer(data, context) {
    var _this;
    _classCallCheck(this, VideoPlayer);
    _this = _super.call(this, data, context);
    _this._target = null;
    _this._timerHandler = null;
    _this._scrollCancel = null;
    _this._selector = data.selector;
    assert(data.hasOwnProperty("title"), "missing required step parameter: title\n" + JSON.stringify(data, null, 2) + "\n" + "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach");
    assert(data.hasOwnProperty("content"), "missing required step parameter: content\n" + JSON.stringify(data, null, 2) + "\n" + "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach");
    _this.alignment = data.alignment || context.options.alignment || VideoPlayer.defaults.alignment;
    _this.placement = data.placement || context.options.placement || VideoPlayer.defaults.placement;
    _this.autoplay = typeof data.autoplay === "boolean" ? data.autoplay : VideoPlayer.defaults.autoplay;
    _this.overlay = data.overlay !== false;
    _this.navigation = data.navigation !== false;
    if (data.image && context.options.preloadimages && !/^data:/i.test(data.image)) {
      var preload = new Image();
      preload.onerror = function () {
        console.error(new Error("Invalid image URL: ".concat(data.image)));
        _this.image = null;
      };
      preload.src = _this.image;
    }
    _this.actions = [];
    if (data.actions) {
      if (!Array.isArray(data.actions)) {
        console.error(new Error("actions must be array but got ".concat(_typeof(data.actions))));
      } else {
        _this.actions = data.actions;
      }
    }
    return _this;
  }
  _createClass(VideoPlayer, [{
    key: "el",
    get: function get() {
      var _this2 = this;
      if (!this.container) {
        var image = this.context._u("<figure class=\"guided-tour-step-image\">".concat(this.video ? "<video width=\"100%\" height=\"auto\" controls><source src=\"".concat(this.video, "\"></video>") : "", "</figure>"));
        var content = this.context._u("<div class=\"guided-tour-step-content-wrapper\">\n              <div id=\"tooltip-title-".concat(this.index, "\" role=\"heading\" class=\"guided-tour-step-title\">").concat(this.context._decorateText(this.title, this), "</div>\n              <div class=\"guided-tour-step-content\">").concat(this.context._decorateText(this.content, this), "</div>\n            </div>"));
        content.find("a").on("click", function (e) {
          _this2.context.action(e, {
            action: "link"
          });
        });
        if (Array.isArray(this.actions) && this.actions.length > 0) {
          var actions = this.context._u("<div class=\"guided-tour-step-actions\">\n                ".concat(this.actions.map(function (action, index) {
            return "<".concat(action.href ? "a" : "button", " id=\"").concat(action.id, "\" ").concat(action.href ? "href=\"".concat(action.href, "\"") : "", " ").concat(action.target ? "target=\"".concat(action.target, "\"") : "", " class=\"button").concat(action.primary ? " primary" : "", "\" data-index=\"").concat(index, "\">").concat(action.label, "</").concat(action.href ? "a" : "button", ">");
          }).join(""), "\n              </div>"));
          actions.find("a, button").on("click", function (e) {
            var action = _this2.actions[parseInt(e.target.dataset.index)];
            if (action.action) e.preventDefault();
            _this2.context.action(e, action);
          });
          content.append(actions);
        }
        var tooltip = this.tooltip = this.context._u("<div role=\"document\" class=\"guided-tour-step-tooltip\"></div>");
        if (this.width) setStyle(tooltip, {
          width: this.width,
          maxWidth: this.width
        });
        if (this.height) setStyle(tooltip, {
          height: this.height,
          maxHeight: this.height
        });
        var tooltipinner = this.context._u("<div class=\"guided-tour-step-tooltip-inner\"></div>");
        var container = this.context._u("<div class=\"guided-tour-step-content-container\"></div>");
        container.append(image).append(content);
        var arrow = this.arrow = this.context._u("<div class=\"guided-tour-arrow\"></div>");
        if (this.navigation) {
          var footer = this.context._u("<div class=\"guided-tour-step-footer\">\n                        <button class=\"guided-tour-step-button guided-tour-step-button-close\" title=\"End tour\">\n                            <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"16\" height=\"16\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-close\"></use></svg>\n                        </button>\n                        ".concat(!this.first ? "<button class=\"guided-tour-step-button guided-tour-step-button-prev\" title=\"Prev step\">\n                          <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                            <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-prev\"></use>\n                          </svg>\n                        </button>" : "", "\n                        ").concat(this.last ? "<button class=\"guided-tour-step-button guided-tour-step-button-complete\" title=\"Complete tour\">\n                          <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                            <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-complete\"></use>\n                          </svg>\n                        </button>" : "<button class=\"guided-tour-step-button guided-tour-step-button-next\" title=\"Next step\">\n                          <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                            <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-next\"></use>\n                          </svg>\n                        </button>", "\n                        ").concat(this.context.steps.length > 1 ? "<div class=\"guided-tour-step-bullets\">\n                            <ul>".concat(this.context.steps.map(function (step, i) {
            return "<li><button title=\"Go to step ".concat(i + 1, "\" data-index=\"").concat(step.index, "\" class=\"").concat(step.index < _this2.index ? "complete" : step.index == _this2.index ? "current" : "", "\"></button></li>");
          }).join(""), "</ul>\n                        </div>") : "", "\n                    </div>"));
          footer.find(".guided-tour-step-button-prev").on("click", this.context.previous);
          footer.find(".guided-tour-step-button-next").on("click", this.context.next);
          footer.find(".guided-tour-step-button-close").on("click", this.context.stop);
          footer.find(".guided-tour-step-button-complete").on("click", this.context.complete);
          footer.find(".guided-tour-step-bullets button").on("click", function (e) {
            return _this2.context.go(parseInt(_this2.context._u(e.target).data("index")));
          });
          tooltipinner.append(arrow).append(container).append(footer);
        } else tooltipinner.append(arrow).append(container);
        tooltip.append(tooltipinner);
        this.container = this.context._u("<div role=\"dialog\" aria-labelleby=\"tooltip-title-".concat(this.index, "\" class=\"guided-tour-step").concat(this.first ? " guided-tour-step-first" : "").concat(this.last ? " guided-tour-step-last" : "", "\"></div>"));
        if (this.overlay) {
          var highlight = this.highlight = this.context._u("<div class=\"guided-tour-step-highlight\"></div>");
          this.container.append(highlight).append(tooltip);
        } else this.container.append(tooltip);
      }
      return this.container;
    }
  }, {
    key: "target",
    get: function get() {
      return this._target || this._selector && this.context._u(this._selector).first();
    },
    set: function set(target) {
      this._target = target;
    }
  }, {
    key: "_cancel",
    value: function _cancel() {
      if (this._timerHandler) clearTimeout(this._timerHandler);
      if (this._scrollCancel) this._scrollCancel();
    }
  }, {
    key: "_position",
    value: function _position() {
      this.context._positionTooltip(this.target, this.tooltip.first(), this.arrow.first(), this.highlight && this.highlight.first(), this);
    }
  }, {
    key: "attach",
    value: function attach(parent) {
      this.context._u(parent).append(this.el);
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;
      this._cancel();
      if (!this.active) {
        var show = function show() {
          _this3.el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
          _this3._position();
          _this3.active = true;
          if (_this3.autoplay) _this3.container.find(".guided-tour-step-image video").first().play();
          _this3.container.find(".guided-tour-step-tooltip, button.primary, .guided-tour-step-button-complete, .guided-tour-step-button-next").last().focus({
            preventScroll: true
          });
        };
        var animationspeed = clamp(this.context.options.animationspeed, 120, 1000);
        if (isTargetValid(this.target)) {
          this._scrollCancel = scrollIntoView(this.target, {
            time: animationspeed,
            cancellable: false,
            align: {
              top: 0.5,
              left: 0.5
            }
          });
        }
        this._timerHandler = setTimeout(show, animationspeed * 3);
        return true;
      }
      return false;
    }
  }, {
    key: "hide",
    value: function hide() {
      this._cancel();
      if (this.active) {
        this.container.find(".guided-tour-step-image video").first().pause();
        this.el.removeClass("active");
        this.active = false;
        return true;
      }
      return false;
    }
  }, {
    key: "remove",
    value: function remove() {
      this.hide();
      this.el.remove();
    }
  }]);
  return VideoPlayer;
}(BaseStep);
VideoPlayer.defaults = {
  layout: "vertical",
  alignment: "bottom-start",
  placement: "middle-center",
  autoplay: true
};
VideoPlayer.type = "videoplayer";

var NavigationStep = /*#__PURE__*/function (_BaseStep) {
  _inherits(NavigationStep, _BaseStep);
  var _super = _createSuper(NavigationStep);
  function NavigationStep(data, context) {
    _classCallCheck(this, NavigationStep);
    return _super.call(this, data, context);
  }
  _createClass(NavigationStep, [{
    key: "show",
    value: function show() {
      var _this = this;
      this.context.next();
      requestAnimationFrame(function () {
        return window.location = _this.target;
      });
    }
  }]);
  return NavigationStep;
}(BaseStep);
NavigationStep.type = "navigate";

var ActionStep = /*#__PURE__*/function (_BaseStep) {
  _inherits(ActionStep, _BaseStep);
  var _super = _createSuper(ActionStep);
  function ActionStep(data, context) {
    var _this;
    _classCallCheck(this, ActionStep);
    _this = _super.call(this, data, context);
    _this._target = null;
    _this._timerHandler = null;
    _this._scrollCancel = null;
    _this._selector = data.selector;
    assert(data.hasOwnProperty("selector"), "missing required step parameter: selector\n" + JSON.stringify(data, null, 2) + "\n" + "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach");
    assert(data.hasOwnProperty("title"), "missing required step parameter: title\n" + JSON.stringify(data, null, 2) + "\n" + "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach");
    _this.alignment = data.alignment || context.options.alignment || ActionStep.defaults.alignment;
    _this._onAction = _this._onAction.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ActionStep, [{
    key: "el",
    get: function get() {
      if (!this.container) {
        var content = this.context._u("<div class=\"guided-tour-action-content-wrapper\">\n          <div id=\"tooltip-title-".concat(this.index, "\" role=\"heading\" class=\"guided-tour-action-title\">").concat(this.title, "</div>\n        </div>"));
        var tooltip = this.tooltip = this.context._u("<div role=\"document\" class=\"guided-tour-step-tooltip action-tooltip\"></div>");
        var tooltipinner = this.context._u("<div class=\"guided-tour-step-tooltip-inner action-tooltip-inner\"></div>");
        var container = this.context._u("<div class=\"guided-tour-step-content-container action-content-container\"></div>");
        container.append(content);
        var arrow = this.arrow = this.context._u("<div class=\"guided-tour-arrow\"></div>");
        tooltipinner.append(arrow).append(container);
        tooltip.append(tooltipinner);
        this.container = this.context._u("<div role=\"dialog\" aria-labelleby=\"tooltip-title-".concat(this.index, "\" class=\"guided-tour-step").concat(this.first ? " guided-tour-step-first" : "").concat(this.last ? " guided-tour-step-last" : "", "\"></div>"));
        var highlight = this.highlight = this.context._u("<div class=\"guided-tour-step-highlight action-target\"><div class=\"radar\"><div class=\"radar-dot\"></div><div class=\"radar-circle\"></div></div></div>");
        this.container.append(highlight).append(tooltip);
      }
      return this.container;
    }
  }, {
    key: "target",
    get: function get() {
      return this._target || this._selector && this.context._u(this._selector).first();
    },
    set: function set(target) {
      this._target = target;
    }
  }, {
    key: "_cancel",
    value: function _cancel() {
      if (this._timerHandler) clearTimeout(this._timerHandler);
      if (this._scrollCancel) this._scrollCancel();
    }
  }, {
    key: "_position",
    value: function _position() {
      this.context._positionTooltip(this.target, this.tooltip.first(), this.arrow.first(), this.highlight.first(), this);
    }
  }, {
    key: "_onAction",
    value: function _onAction(e) {
      this.context.next();
    }
  }, {
    key: "attach",
    value: function attach(parent) {
      this.context._u(parent).append(this.el);
    }
  }, {
    key: "show",
    value: function show() {
      var _this2 = this;
      this._cancel();
      if (!this.active) {
        var show = function show() {
          _this2.el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
          _this2._position();
          _this2.active = true;
          _this2.container.find(".guided-tour-step-tooltip, button.primary, .guided-tour-step-button-complete, .guided-tour-step-button-next").last().focus({
            preventScroll: true
          });
          document.addEventListener("click", _this2._onAction);
        };
        var animationspeed = clamp(this.context.options.animationspeed, 120, 1000);
        if (isTargetValid(this.target)) {
          this._scrollCancel = scrollIntoView(this.target, {
            time: animationspeed,
            cancellable: false,
            align: {
              top: 0.5,
              left: 0.5
            }
          });
        }
        this._timerHandler = setTimeout(show, animationspeed * 3);
        return true;
      }
      return false;
    }
  }, {
    key: "hide",
    value: function hide() {
      this._cancel();
      document.removeEventListener("click", this._onAction);
      if (this.active) {
        this.el.removeClass("active");
        this.active = false;
        return true;
      }
      return false;
    }
  }, {
    key: "remove",
    value: function remove() {
      this.hide();
      this.el.remove();
    }
  }]);
  return ActionStep;
}(BaseStep);
ActionStep.defaults = {
  alignment: "bottom-start"
};
ActionStep.type = "action";

var SessionCacheManager = /*#__PURE__*/function () {
  function SessionCacheManager() {
    var identifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";
    _classCallCheck(this, SessionCacheManager);
    this.identifier = identifier;
    try {
      (this._memory = JSON.parse(window.sessionStorage.getItem(this.key)))._isObject;
    } catch (e) {
      this._memory = {};
      this._write();
    }
  }
  _createClass(SessionCacheManager, [{
    key: "key",
    get: function get() {
      return SessionCacheManager.Key + this.identifier;
    }
  }, {
    key: "_write",
    value: function _write() {
      window.sessionStorage.setItem(this.key, JSON.stringify(this._memory));
    }
  }, {
    key: "get",
    value: function get(key) {
      return this._memory[key];
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this._memory[key] = value;
      this._write();
      return value;
    }
  }, {
    key: "clear",
    value: function clear(key) {
      if (key) {
        this._memory[key] = undefined;
        this._write();
      } else {
        this._memory = {};
        window.sessionStorage.removeItem(this.key);
      }
    }
  }]);
  return SessionCacheManager;
}();
SessionCacheManager.Key = "tourguide.js:Session:";

var e={"":["<em>","</em>"],_:["<strong>","</strong>"],"*":["<strong>","</strong>"],"~":["<s>","</s>"],"\n":["<br />"]," ":["<br />"],"-":["<hr />"]};function n(e){return e.replace(RegExp("^"+(e.match(/^(\t| )+/)||"")[0],"gm"),"")}function r(e){return (e+"").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function t(a,c){var o,l,g,s,p,u=/((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:!\[([^\]]*?)\]\(([^)]+?)\))|(\[)|(\](?:\(([^)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm,m=[],h="",i=c||{},d=0;function f(n){var r=e[n[1]||""],t=m[m.length-1]==n;return r?r[1]?(t?m.pop():m.push(n),r[0|t]):r[0]:n}function $(){for(var e="";m.length;)e+=f(m[m.length-1]);return e}for(a=a.replace(/^\[(.+?)\]:\s*(.+)$/gm,function(e,n,r){return i[n.toLowerCase()]=r,""}).replace(/^\n+|\n+$/g,"");g=u.exec(a);)l=a.substring(d,g.index),d=u.lastIndex,o=g[0],l.match(/[^\\](\\\\)*\\$/)||((p=g[3]||g[4])?o='<pre class="code '+(g[4]?"poetry":g[2].toLowerCase())+'"><code'+(g[2]?' class="language-'+g[2].toLowerCase()+'"':"")+">"+n(r(p).replace(/^\n+|\n+$/g,""))+"</code></pre>":(p=g[6])?(p.match(/\./)&&(g[5]=g[5].replace(/^\d+/gm,"")),s=t(n(g[5].replace(/^\s*[>*+.-]/gm,""))),">"==p?p="blockquote":(p=p.match(/\./)?"ol":"ul",s=s.replace(/^(.*)(\n|$)/gm,"<li>$1</li>")),o="<"+p+">"+s+"</"+p+">"):g[8]?o='<img src="'+r(g[8])+'" alt="'+r(g[7])+'">':g[10]?(h=h.replace("<a>",'<a href="'+r(g[11]||i[l.toLowerCase()])+'">'),o=$()+"</a>"):g[9]?o="<a>":g[12]||g[14]?o="<"+(p="h"+(g[14]?g[14].length:g[13]>"="?1:2))+">"+t(g[12]||g[15],i)+"</"+p+">":g[16]?o="<code>"+r(g[16])+"</code>":(g[17]||g[1])&&(o=f(g[17]||"--"))),h+=l,h+=o;return (h+a.substring(d)+$()).replace(/^\n+|\n+$/g,"")}

var Style = ":host {\n  position: absolute;\n  overflow: visible;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 0;\n  box-sizing: border-box;\n  line-height: 1.4;\n  text-align: left;\n  text-rendering: optimizespeed;\n  font-family: var(--tourguide-font-family);\n  font-size: var(--tourguide-font-size);\n  color: var(--tourguide-text-color);\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n  -moz-tab-size: 4;\n  /* 3 */\n  tab-size: 4;\n  /* 3 */\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  background: none;\n  border: none;\n  border-width: 0;\n  border-style: none;\n  border-color: currentColor;\n  box-shadow: none;\n  color: inherit;\n  appearance: none;\n  font-size: inherit;\n  font-weight: inherit;\n  text-decoration: none;\n}\n\na,\nbutton {\n  cursor: pointer;\n}\na:hover, a:focus,\nbutton:hover,\nbutton:focus {\n  outline: 5px auto var(--tourguide-focus-color);\n}\n\n.guided-tour-step {\n  display: none;\n}\n.guided-tour-step.active {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: all;\n}\n.guided-tour-step.active .guided-tour-step-highlight {\n  position: absolute;\n  box-sizing: border-box;\n  border-radius: 4px;\n  box-shadow: 0 0 0 999em var(--tourguide-overlay-color);\n  z-index: 1;\n}\n.guided-tour-step.active .guided-tour-step-tooltip {\n  position: absolute;\n  margin: 16px 0;\n  z-index: 2;\n  background-color: var(--tourguide-background-color);\n  width: var(--tourguide-tooltip-width);\n  max-width: max-content;\n  border-radius: 5px;\n  box-sizing: border-box;\n  box-shadow: 0 0 2.5em -0.8em #000, 0 0 10px -5px #000, 0 0 3px -1px #000;\n  transition: opacity 150ms;\n}\n@media screen and (max-width: 760px) {\n  .guided-tour-step.active .guided-tour-step-tooltip {\n    max-width: 85vw;\n    width: max-content !important;\n  }\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-arrow {\n  position: absolute;\n  width: 1em;\n  height: 1em;\n  background: var(--tourguide-background-color);\n  z-index: -1;\n  transform: rotate(45deg);\n  pointer-events: none;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content-container {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  height: calc(100% - 2.6em);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-image {\n  flex-grow: 1;\n  flex-shrink: 1;\n  overflow: hidden;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-image img {\n  width: 100%;\n  height: 100%;\n  border-radius: 4px 4px 0 0;\n  object-fit: cover;\n  object-position: center;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content-wrapper {\n  margin: 1.5em 2.5em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-title {\n  font-size: 1.4em;\n  margin-bottom: 0.8em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content {\n  flex-shrink: 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content b,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content strong {\n  font-weight: bold;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content i,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content em {\n  font-style: italic;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content a {\n  cursor: pointer;\n  text-decoration: underline;\n  color: var(--tourguide-accent-color);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content mark {\n  background: inherit;\n  text-shadow: 0px 2px 4px #ff0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content code,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content dfn {\n  padding: 1px 6px 1px 4px;\n  border-radius: 4px;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content code {\n  background-color: #f0f0f0;\n  color: #e83e8c;\n  font-family: monospace;\n  font-size: 87.5%;\n  word-break: break-word;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content dfn {\n  font-style: italic;\n  background-color: #ffc6e5;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content p,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content blockquote {\n  margin: 1em 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content p:last-child,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul:last-child,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol:last-child,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content blockquote:last-child {\n  margin-bottom: 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content blockquote {\n  padding-left: 1em;\n  border-left: 4px solid silver;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol {\n  padding-left: 1.5em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul li,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol li {\n  margin: 0.3em 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions {\n  display: flex;\n  column-gap: 0.5em;\n  margin-top: 1.5em;\n  justify-content: end;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button {\n  color: var(--tourguide-accent-color);\n  padding: 0.5em 1em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button.primary {\n  background: var(--tourguide-accent-color);\n  padding: 0.5em 1.5em;\n  color: #fff;\n  border-radius: 4px;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button.primary:hover, .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button.primary:focus {\n  filter: brightness(120%);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-icon {\n  display: inline-block;\n  overflow: hidden;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button {\n  flex-direction: column;\n  justify-content: center;\n  /* <-- actual veertical align */\n  display: inline-flex;\n  text-align: center;\n  cursor: pointer;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button .guided-tour-icon {\n  align-self: center;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-close {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 2em;\n  height: 2em;\n  color: var(--tourguide-step-button-close-color);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-prev,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-next,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-complete {\n  width: 3em;\n  height: 3em;\n  background: var(--tourguide-background-color);\n  border-radius: 50%;\n  margin-top: -1.5em;\n  position: absolute;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-prev {\n  color: var(--tourguide-step-button-prev-color);\n  left: 0;\n  transform: translateX(-50%);\n  top: 50%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-next {\n  color: var(--tourguide-step-button-next-color);\n  right: 0;\n  transform: translateX(50%);\n  top: 50%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-complete {\n  color: var(--tourguide-step-button-complete-color);\n  right: 0;\n  transform: translateX(50%);\n  top: 50%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-footer {\n  flex-shrink: 0;\n  flex-grow: 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets {\n  text-align: center;\n  line-height: 16px;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul {\n  list-style: none;\n  margin: 0 1em 1em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li {\n  display: inline-block;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li button {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  display: inline-block;\n  background-color: var(--tourguide-bullet-color);\n  border: 8px solid var(--tourguide-background-color);\n  box-sizing: content-box;\n  cursor: pointer;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li button.complete {\n  background-color: var(--tourguide-bullet-visited-color);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li button.current {\n  background-color: var(--tourguide-bullet-current-color);\n}\n@media screen and (min-width: 760px) {\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container {\n    flex-direction: row;\n    height: 100%;\n  }\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container .guided-tour-step-content-wrapper {\n    flex: 1 1 auto;\n  }\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container .guided-tour-step-image {\n    width: 50%;\n    margin-bottom: calc((1em + 24px) * -1);\n    flex: 0 0 auto;\n  }\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container .guided-tour-step-image img {\n    border-radius: 4px 0 0 4px;\n    height: 100%;\n    object-fit: cover;\n    object-position: center;\n  }\n}\n.guided-tour-step.active .guided-tour-step-tooltip.guided-tour-arrow-none .guided-tour-step-tooltip-inner .guided-tour-arrow {\n  display: none;\n}\n\n.guided-tour-step.active .guided-tour-step-tooltip.action-tooltip {\n  margin: 0;\n}\n\n.guided-tour-step.active .guided-tour-step-highlight.action-target {\n  box-shadow: none;\n}\n\n.guided-tour-step-highlight.action-target {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: none;\n}\n.guided-tour-step-highlight.action-target .radar {\n  position: relative;\n}\n.guided-tour-step-highlight.action-target .radar .radar-dot:before {\n  top: -4px;\n  left: -4px;\n  z-index: 193;\n  width: 8px;\n  height: 8px;\n  border: 2px solid var(--tourguide-background-color);\n  border-radius: 50%;\n}\n.guided-tour-step-highlight.action-target .radar .radar-dot:after, .guided-tour-step-highlight.action-target .radar .radar-dot:before {\n  position: absolute;\n  background-color: var(--tourguide-accent-color);\n  content: \" \";\n}\n.guided-tour-step-highlight.action-target .radar .radar-dot:after {\n  z-index: 192;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);\n  animation-name: ripple;\n  animation-duration: 1s;\n  animation-timing-function: ease;\n  animation-delay: 0s;\n  animation-iteration-count: infinite;\n}\n.guided-tour-step-highlight.action-target .radar .radar-circle:before {\n  border: 1px solid var(--tourguide-accent-color);\n  border-radius: 50%;\n}\n.guided-tour-step-highlight.action-target .radar .radar-circle:after, .guided-tour-step-highlight.action-target .radar .radar-circle:before {\n  position: absolute;\n  top: -20px;\n  left: -20px;\n  z-index: 192;\n  width: 40px;\n  height: 40px;\n  content: \" \";\n}\n.guided-tour-step-highlight.action-target .radar .radar-circle:after {\n  background-color: var(--tourguide-accent-color);\n  border-radius: 50%;\n  opacity: 0.3;\n}\n@keyframes ripple {\n  0% {\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    opacity: 0.75;\n  }\n  to {\n    top: -20px;\n    left: -20px;\n    width: 40px;\n    height: 40px;\n    opacity: 0;\n  }\n}\n\n.guided-tour-action-content-wrapper {\n  padding: 0.5em 1em;\n}\n.guided-tour-action-content-wrapper .guided-tour-action-title {\n  font-weight: 700;\n}";

var NOOP = function NOOP() {};
var StepsSource = {
  DOM: 0,
  JSON: 1,
  REMOTE: 2
};
var CacheKeys = {
  "LastInitilized": "timestamp",
  "IsStarted": "started",
  "CurrentProgress": "progress"
};
var defaultKeyNavOptions = {
  next: "ArrowRight",
  prev: "ArrowLeft",
  first: "Home",
  last: "End",
  complete: null,
  stop: "Escape"
};
var defaultStyle = {
  fontFamily: "sans-serif",
  fontSize: "14px",
  tooltipWidth: "40vw",
  overlayColor: "rgba(0, 0, 0, 0.5)",
  textColor: "#333",
  accentColor: "#0d6efd",
  focusColor: "auto",
  bulletColor: "auto",
  bulletVisitedColor: "auto",
  bulletCurrentColor: "auto",
  stepButtonCloseColor: "auto",
  stepButtonPrevColor: "auto",
  stepButtonNextColor: "auto",
  stepButtonCompleteColor: "auto",
  backgroundColor: "#fff"
};
var defaultOptions = {
  identifier: "default",
  root: "body",
  selector: "[data-tour]",
  animationspeed: 120,
  padding: 5,
  steps: null,
  src: null,
  restoreinitialposition: true,
  preloadimages: false,
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
  stepFactory: [PopoverBaseStep, NavigationStep, VideoPlayer, ActionStep],
  actionHandlers: [],
  contentDecorators: [],
  cacheManagerFactory: SessionCacheManager,
  resumeOnLoad: true,
  onStart: NOOP,
  onStop: NOOP,
  onComplete: NOOP,
  onStep: NOOP,
  onAction: NOOP
};
function isEventAttrbutesMatched(event, keyOption) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "keyup";
  if (_typeof(event) === "object") {
    var eventAttrsMap = {
      type: type
    };
    if (typeof keyOption === "number") {
      eventAttrsMap.keyCode = keyOption;
    } else if (typeof keyOption === "string") {
      eventAttrsMap.key = keyOption;
    } else if (_typeof(keyOption) === "object") {
      eventAttrsMap = _objectSpread2(_objectSpread2({}, keyOption), {}, {
        type: type
      });
    } else {
      throw new Error("keyboardNavigation option invalid. should be predefined object or false. Check documentation.");
    }
    var eventAttrs = Object.entries(eventAttrsMap).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      return {
        key: key,
        value: value
      };
    });
    return !eventAttrs.filter(function (attr) {
      return event[attr.key] !== attr.value;
    }).length;
  }
  return false;
}
var Tour = /*#__PURE__*/function () {
  function Tour() {
    var _this = this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Tour);
    this._options = Object.assign({}, defaultOptions, options, {
      style: setAutoColors(defaultStyle, options.colors || options.style)
    });
    this._u = u$2;
    this._steps = [];
    this._current = 0;
    this._active = false;
    this._stepsSrc = StepsSource.DOM;
    this._ready = false;
    this._initialposition = null;
    this._containerElement = document.createElement("aside");
    this._containerElement.classList.add("__guided-tour-container");
    u$2(this._options.root).append(this._containerElement);
    this._shadowRoot = this._containerElement.attachShadow({
      mode: "closed"
    });
    this._injectIcons();
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
    if (_typeof(this._options.steps) === "object" && Array.isArray(this._options.steps)) {
      this._stepsSrc = StepsSource.JSON;
      this._initSteps(this._options.steps);
      this._ready = true;
      this._onTourReady();
    } else if (typeof this._options.src === "string") {
      this._stepsSrc = StepsSource.REMOTE;
      fetch(new Request(this._options.src, this._options.request)).then(function (response) {
        return response.json().then(function (data) {
          _this._initSteps(data);
          _this._ready = true;
          _this._onTourReady();
        });
      });
    } else if (u$2(this._options.selector).length > 0) {
      this._stepsSrc = StepsSource.DOM;
      this._ready = true;
      this._onTourReady();
    } else {
      throw new Error("Tour is not configured properly. Check documentation.");
    }
  }
  _createClass(Tour, [{
    key: "cacheManager",
    get: function get() {
      return this._cacheManager || (this._cacheManager = new this.options.cacheManagerFactory(this.options.identifier));
    }
  }, {
    key: "currentstep",
    get: function get() {
      return this._steps[this._current];
    }
  }, {
    key: "length",
    get: function get() {
      return this._steps.length;
    }
  }, {
    key: "steps",
    get: function get() {
      return this._steps.filter(function (step) {
        return !step.hidden;
      });
    }
  }, {
    key: "hasnext",
    get: function get() {
      return this.nextstep !== this._current;
    }
  }, {
    key: "nextstep",
    get: function get() {
      return clamp(this._current + 1, 0, this.length - 1);
    }
  }, {
    key: "previousstep",
    get: function get() {
      return clamp(this._current - 1, 0);
    }
  }, {
    key: "options",
    get: function get() {
      return this._options;
    }
  }, {
    key: "_initSteps",
    value: function _initSteps(steps) {
      var _this2 = this;
      this._steps = steps.map(function (data, index) {
        if (data.title) data.title = _this2._decorateText(data.title, data);
        if (data.content) {
          data.content = _this2._decorateText(t(data.content), data);
        }
        var stepType = data.type || "default";
        var StepFactory = _this2._options.stepFactory.find(function (f) {
          return f.type === stepType;
        });
        assert(StepFactory, "No factory for step of type ".concat(stepType, ". Check your setup."));
        return new StepFactory(_objectSpread2(_objectSpread2({}, data), {}, {
          index: data.index || index
        }), _this2);
      });
    }
  }, {
    key: "_onTourReady",
    value: function _onTourReady() {
      if (this._ready && this.cacheManager.get(CacheKeys.IsStarted) && this.options.resumeOnLoad) {
        this._current = parseInt(this.cacheManager.get(CacheKeys.CurrentProgress));
        if (isNaN(this._current)) this._current = 0;
        this.start(this._current);
      }
    }
  }, {
    key: "_injectIcons",
    value: function _injectIcons() {
      if (u$2("#GuidedTourIconSet", this._shadowRoot).length === 0) {
        u$2(this._shadowRoot).append(u$2(Icons));
      }
    }
  }, {
    key: "_injectStyles",
    value: function _injectStyles() {
      var style = u$2("<style>".concat(Style, "</style>"));
      u$2(this._shadowRoot).append(style);
      var colors = u$2("<style>".concat(colorObjToStyleVarString(this._options.style, "--tourguide"), "</style>"));
      u$2(this._shadowRoot).append(colors);
    }
  }, {
    key: "_keyboardHandler",
    value: function _keyboardHandler(event) {
      if (this._options.keyboardNavigation.next && isEventAttrbutesMatched(event, this._options.keyboardNavigation.next)) {
        this.next();
      } else if (this._options.keyboardNavigation.prev && isEventAttrbutesMatched(event, this._options.keyboardNavigation.prev)) {
        this.previous();
      } else if (this._options.keyboardNavigation.first && isEventAttrbutesMatched(event, this._options.keyboardNavigation.first)) {
        this.go(0);
      } else if (this._options.keyboardNavigation.last && isEventAttrbutesMatched(event, this._options.keyboardNavigation.last)) {
        this.go(this._steps.length - 1);
      } else if (this._options.keyboardNavigation.stop && isEventAttrbutesMatched(event, this._options.keyboardNavigation.stop)) {
        this.stop();
      } else if (this._options.keyboardNavigation.complete && isEventAttrbutesMatched(event, this._options.keyboardNavigation.complete)) {
        this.complete();
      }
    }
  }, {
    key: "_decorateText",
    value: function _decorateText(text, step) {
      var _this3 = this;
      var _text = text;
      this._options.contentDecorators.forEach(function (decorator) {
        if (decorator.test(_text)) _text = decorator.render(_text, step, _this3);
      });
      return _text;
    }
  }, {
    key: "_positionTooltip",
    value: function _positionTooltip() {
      return positionTooltip.apply(this, arguments);
    }
  }, {
    key: "init",
    value: function init() {
      this.reset();
      this._steps = this._steps.sort(function (a, b) {
        return a.index - b.index;
      });
      this._steps[0].first = true;
      this._steps[this.length - 1].last = true;
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this._active) this.stop();
      if (this._stepsSrc === StepsSource.DOM) {
        this._steps = [];
      }
      this._current = 0;
      this.cacheManager.set(CacheKeys.IsStarted, true);
    }
  }, {
    key: "start",
    value: function start() {
      var _this4 = this;
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (this._ready) {
        this._containerElement.style.zIndex = getMaxZIndex() + 1;
        if (this._options.restoreinitialposition) {
          this._initialposition = getScrollCoordinates(this._options.root);
        }
        if (!this._active) {
          this.cacheManager.set(CacheKeys.IsStarted, true);
          u$2(this._options.root).addClass("__guided-tour-active");
          this.init();
          this._steps.forEach(function (step) {
            return step.attach(_this4._shadowRoot);
          });
          this._current = step;
          this.currentstep.show();
          this._active = true;
          this._options.onStart(this._options);
          if (this._options.keyboardNavigation) {
            assert(Object.prototype.toString.call(this._options.keyboardNavigation) === "[object Object]", "keyboardNavigation option invalid. should be predefined object or false. Check documentation.");
            u$2(":root").on("keyup", this._keyboardHandler);
          }
        } else {
          this.go(step, "start");
        }
      } else {
        setTimeout(function () {
          _this4.start(step);
        }, 50);
      }
    }
  }, {
    key: "action",
    value: function action(event, _action) {
      if (this._active) {
        switch (_action.action) {
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
              var handler = this._options.actionHandlers.find(function (handler) {
                return handler.name === _action.action;
              });
              if (handler) handler.onAction(event, _action, this);
            }
        }
        if (typeof this._options.onAction === "function") {
          this._options.onAction(event, _action, this);
        }
      }
    }
  }, {
    key: "next",
    value: function next(e) {
      e && e.preventDefault && e.preventDefault();
      e && e.stopPropagation && e.stopPropagation();
      if (this._active) {
        this.go(this.nextstep, "next");
      }
    }
  }, {
    key: "previous",
    value: function previous(e) {
      e && e.preventDefault && e.preventDefault();
      e && e.stopPropagation && e.stopPropagation();
      if (this._active) {
        this.go(this.previousstep, "previous");
      }
    }
  }, {
    key: "go",
    value: function go(step, type) {
      if (this._active && this._current !== step) {
        this.currentstep.hide();
        this._current = clamp(step, 0, this.length - 1);
        this.currentstep.show();
        this._options.onStep(this.currentstep, type);
        this.cacheManager.set(CacheKeys.CurrentProgress, this._current);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this._active) {
        this.currentstep.hide();
        this._active = false;
        this._steps.forEach(function (step) {
          return step.remove();
        });
        u$2(this._options.root).removeClass("__guided-tour-active");
        if (this._options.keyboardNavigation) {
          u$2(":root").off("keyup", this._keyboardHandler);
        }
        if (this._options.restoreinitialposition && this._initialposition) {
          animateScroll(this._initialposition, this._options.animationspeed);
        }
        this._options.onStop(this._options);
        this.cacheManager.set(CacheKeys.IsStarted, false);
        this.cacheManager.clear(CacheKeys.CurrentProgress);
      }
    }
  }, {
    key: "complete",
    value: function complete() {
      if (this._active) {
        this.stop();
        this._options.onComplete();
      }
    }
  }, {
    key: "deinit",
    value: function deinit() {
      if (this._ready) {
        this._containerElement.remove();
        this._containerElement = null;
        this._active = false;
        this._ready = false;
      }
    }
  }]);
  return Tour;
}();
Tour.ActionHandler = ActionHandler;
Tour.ContentDecorator = ContentDecorator;
Tour.DefaultStep = PopoverBaseStep;

export { Tour as default };
