(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tourguide = {}));
})(this, (function (exports) { 'use strict';

    var umbrella_min = {exports: {}};

    /* Umbrella JS 3.3.2 umbrellajs.com */

    (function (module) {
    var u=function(t,e){return this instanceof u?t instanceof u?t:((t="string"==typeof t?this.select(t,e):t)&&t.nodeName&&(t=[t]),void(this.nodes=this.slice(t))):new u(t,e)};u.prototype={get length(){return this.nodes.length}},u.prototype.nodes=[],u.prototype.addClass=function(){return this.eacharg(arguments,function(t,e){t.classList.add(e);})},u.prototype.adjacent=function(o,t,i){return "number"==typeof t&&(t=0===t?[]:new Array(t).join().split(",").map(Number.call,Number)),this.each(function(n,r){var e=document.createDocumentFragment();u(t||{}).map(function(t,e){e="function"==typeof o?o.call(this,t,e,n,r):o;return "string"==typeof e?this.generate(e):u(e)}).each(function(t){this.isInPage(t)?e.appendChild(u(t).clone().first()):e.appendChild(t);}),i.call(this,n,e);})},u.prototype.after=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t.nextSibling);})},u.prototype.append=function(t,e){return this.adjacent(t,e,function(t,e){t.appendChild(e);})},u.prototype.args=function(t,e,n){return (t="string"!=typeof(t="function"==typeof t?t(e,n):t)?this.slice(t).map(this.str(e,n)):t).toString().split(/[\s,]+/).filter(function(t){return t.length})},u.prototype.array=function(o){var i=this;return this.nodes.reduce(function(t,e,n){var r;return o?(r="string"==typeof(r=(r=o.call(i,e,n))||!1)?u(r):r)instanceof u&&(r=r.nodes):r=e.innerHTML,t.concat(!1!==r?r:[])},[])},u.prototype.attr=function(t,e,r){return r=r?"data-":"",this.pairs(t,e,function(t,e){return t.getAttribute(r+e)},function(t,e,n){n?t.setAttribute(r+e,n):t.removeAttribute(r+e);})},u.prototype.before=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t);})},u.prototype.children=function(t){return this.map(function(t){return this.slice(t.children)}).filter(t)},u.prototype.clone=function(){return this.map(function(t,e){var n=t.cloneNode(!0),r=this.getAll(n);return this.getAll(t).each(function(t,e){for(var n in this.mirror)this.mirror[n]&&this.mirror[n](t,r.nodes[e]);}),n})},u.prototype.getAll=function(t){return u([t].concat(u("*",t).nodes))},u.prototype.mirror={},u.prototype.mirror.events=function(t,e){if(t._e)for(var n in t._e)t._e[n].forEach(function(t){u(e).on(n,t.callback);});},u.prototype.mirror.select=function(t,e){u(t).is("select")&&(e.value=t.value);},u.prototype.mirror.textarea=function(t,e){u(t).is("textarea")&&(e.value=t.value);},u.prototype.closest=function(e){return this.map(function(t){do{if(u(t).is(e))return t}while((t=t.parentNode)&&t!==document)})},u.prototype.data=function(t,e){return this.attr(t,e,!0)},u.prototype.each=function(t){return this.nodes.forEach(t.bind(this)),this},u.prototype.eacharg=function(n,r){return this.each(function(e,t){this.args(n,e,t).forEach(function(t){r.call(this,e,t);},this);})},u.prototype.empty=function(){return this.each(function(t){for(;t.firstChild;)t.removeChild(t.firstChild);})},u.prototype.filter=function(e){var t=e instanceof u?function(t){return -1!==e.nodes.indexOf(t)}:"function"==typeof e?e:function(t){return t.matches=t.matches||t.msMatchesSelector||t.webkitMatchesSelector,t.matches(e||"*")};return u(this.nodes.filter(t))},u.prototype.find=function(e){return this.map(function(t){return u(e||"*",t)})},u.prototype.first=function(){return this.nodes[0]||!1},u.prototype.generate=function(t){return /^\s*<tr[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().nodes:/^\s*<t(h|d)[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().children().nodes:/^\s*</.test(t)?u(document.createElement("div")).html(t).children().nodes:document.createTextNode(t)},u.prototype.handle=function(){var t=this.slice(arguments).map(function(e){return "function"==typeof e?function(t){t.preventDefault(),e.apply(this,arguments);}:e},this);return this.on.apply(this,t)},u.prototype.hasClass=function(){return this.is("."+this.args(arguments).join("."))},u.prototype.html=function(e){return void 0===e?this.first().innerHTML||"":this.each(function(t){t.innerHTML=e;})},u.prototype.is=function(t){return 0<this.filter(t).length},u.prototype.isInPage=function(t){return t!==document.body&&document.body.contains(t)},u.prototype.last=function(){return this.nodes[this.length-1]||!1},u.prototype.map=function(t){return t?u(this.array(t)).unique():this},u.prototype.not=function(e){return this.filter(function(t){return !u(t).is(e||!0)})},u.prototype.off=function(t,e,n){var r=null==e&&null==n,o=null,i=e;return "string"==typeof e&&(o=e,i=n),this.eacharg(t,function(e,n){u(e._e?e._e[n]:[]).each(function(t){(r||t.orig_callback===i&&t.selector===o)&&e.removeEventListener(n,t.callback);});})},u.prototype.on=function(t,e,o){function i(t,e){try{Object.defineProperty(t,"currentTarget",{value:e,configurable:!0});}catch(t){}}var c=null,n=e;"string"==typeof e&&(c=e,n=o,e=function(n){var r=arguments;u(n.currentTarget).find(c).each(function(t){var e;t.contains(n.target)&&(e=n.currentTarget,i(n,t),o.apply(t,r),i(n,e));});});function r(t){return e.apply(this,[t].concat(t.detail||[]))}return this.eacharg(t,function(t,e){t.addEventListener(e,r),t._e=t._e||{},t._e[e]=t._e[e]||[],t._e[e].push({callback:r,orig_callback:n,selector:c});})},u.prototype.pairs=function(r,t,e,o){var n;return void 0!==t&&(n=r,(r={})[n]=t),"object"==typeof r?this.each(function(t,e){for(var n in r)"function"==typeof r[n]?o(t,n,r[n](t,e)):o(t,n,r[n]);}):this.length?e(this.first(),r):""},u.prototype.param=function(e){return Object.keys(e).map(function(t){return this.uri(t)+"="+this.uri(e[t])}.bind(this)).join("&")},u.prototype.parent=function(t){return this.map(function(t){return t.parentNode}).filter(t)},u.prototype.prepend=function(t,e){return this.adjacent(t,e,function(t,e){t.insertBefore(e,t.firstChild);})},u.prototype.remove=function(){return this.each(function(t){t.parentNode&&t.parentNode.removeChild(t);})},u.prototype.removeClass=function(){return this.eacharg(arguments,function(t,e){t.classList.remove(e);})},u.prototype.replace=function(t,e){var n=[];return this.adjacent(t,e,function(t,e){n=n.concat(this.slice(e.children)),t.parentNode.replaceChild(e,t);}),u(n)},u.prototype.scroll=function(){var t=this.first();return t&&t.scrollIntoView({behavior:"smooth"}),this},u.prototype.select=function(t,e){return t=t.replace(/^\s*/,"").replace(/\s*$/,""),/^</.test(t)?u().generate(t):(e||document).querySelectorAll(t)},u.prototype.serialize=function(){var r=this;return this.slice(this.first().elements).reduce(function(e,n){return !n.name||n.disabled||"file"===n.type||/(checkbox|radio)/.test(n.type)&&!n.checked?e:"select-multiple"===n.type?(u(n.options).each(function(t){t.selected&&(e+="&"+r.uri(n.name)+"="+r.uri(t.value));}),e):e+"&"+r.uri(n.name)+"="+r.uri(n.value)},"").slice(1)},u.prototype.siblings=function(t){return this.parent().children(t).not(this)},u.prototype.size=function(){var t=this.first();return t?t.getBoundingClientRect():null},u.prototype.slice=function(t){return t&&0!==t.length&&"string"!=typeof t&&"[object Function]"!==t.toString()?t.length?[].slice.call(t.nodes||t):[t]:[]},u.prototype.str=function(e,n){return function(t){return "function"==typeof t?t.call(this,e,n):t.toString()}},u.prototype.text=function(e){return void 0===e?this.first().textContent||"":this.each(function(t){t.textContent=e;})},u.prototype.toggleClass=function(t,e){return !!e===e?this[e?"addClass":"removeClass"](t):this.eacharg(t,function(t,e){t.classList.toggle(e);})},u.prototype.trigger=function(t){var o=this.slice(arguments).slice(1);return this.eacharg(t,function(t,e){var n,r={bubbles:!0,cancelable:!0,detail:o};try{n=new window.CustomEvent(e,r);}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,o);}t.dispatchEvent(n);})},u.prototype.unique=function(){return u(this.nodes.reduce(function(t,e){return null!=e&&!1!==e&&-1===t.indexOf(e)?t.concat(e):t},[]))},u.prototype.uri=function(t){return encodeURIComponent(t).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},u.prototype.wrap=function(t){return this.map(function(e){return u(t).each(function(t){!function(t){for(;t.firstElementChild;)t=t.firstElementChild;return u(t)}(t).append(e.cloneNode(!0)),e.parentNode.replaceChild(t,e);})})},module.exports&&(module.exports=u,module.exports.u=u);
    }(umbrella_min));

    var u = umbrella_min.exports;

    /**
     * Abstract base class for CacheManager
     *
     * The `CacheManager` class serves as a template for managing caching mechanisms, particularly useful when tracking user interactions during a guided tour. This could include storing data such as:
     * - User progress through the tour steps
     * - Completion status of the tour
     * - Preferences or settings related to the tour (e.g., whether users want to skip certain steps)
     * - Any other relevant interaction details that might enhance用户体验 or improve future iterations of the guided tour.
     *
     * By implementing this abstract class, specific caching strategies can be developed for different environments (e.g., browser local storage, server-side storage, in-memory cache). This flexibility allows for efficient and scalable handling of user interactions across various platforms and devices.
     */
    class AbstractCacheManager {
      /**
       * Creates an instance of AbstractCacheManager.
       * @param identifier - A string to identify the cache manager.
       */
      constructor() {
        let identifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        this.identifier = identifier;
      }
      /**
       * The unique identifier for this cache manager.
       */

      /**
       * Retrieves a value from the cache by its key.
       * @template T - The type of the value to retrieve.
       * @param key - The key under which the value is stored.
       * @returns The value associated with the given key, or undefined if the key does not exist in the cache.
       */

      /**
       * Stores a value in the cache against a specific key.
       * @param key - The key under which to store the value.
       * @param value - The value to be stored.
       */

      /**
       * Removes a value from the cache by its key.
       * @param key - The key of the value to remove.
       */
    }

    /**
     * The MemoryCacheManager class provides an in-memory caching mechanism using a JavaScript Map object.
     * This implementation extends the AbstractCacheManager abstract class and implements its methods.
     */
    class MemoryCacheManager extends AbstractCacheManager {
      _memory = {};

      /**
       * Retrieves the value associated with the given key.
       * @param key - The unique identifier for the cached item.
       * @returns The value associated with the key, or undefined if the key does not exist.
       */
      get(key) {
        return this._memory[key];
      }

      /**
       * Stores a value in the cache under the specified key.
       * @param key - The unique identifier for the cached item.
       * @param value - The value to be stored in the cache.
       */
      set(key, value) {
        return this._memory[key] = value;
      }

      /**
       * Clears the value associated with the given key from the cache, if it exists.
       * @param key - The unique identifier for the cached item to be cleared.
       */
      clear(key) {
        this._memory[key] = undefined;
      }
    }

    let StepsSource = /*#__PURE__*/function (StepsSource) {
      StepsSource[StepsSource["DOM"] = 0] = "DOM";
      StepsSource[StepsSource["JSON"] = 1] = "JSON";
      StepsSource[StepsSource["REMOTE"] = 2] = "REMOTE";
      return StepsSource;
    }({});
    let TourNavigationDirection = /*#__PURE__*/function (TourNavigationDirection) {
      TourNavigationDirection[TourNavigationDirection["FORWARD"] = 0] = "FORWARD";
      TourNavigationDirection[TourNavigationDirection["BACKWARD"] = 1] = "BACKWARD";
      return TourNavigationDirection;
    }({});
    let TourStopState = /*#__PURE__*/function (TourStopState) {
      TourStopState[TourStopState["COMPLETE"] = 0] = "COMPLETE";
      TourStopState[TourStopState["INCOMPLETE"] = 1] = "INCOMPLETE";
      TourStopState[TourStopState["SKIPPED"] = 2] = "SKIPPED";
      return TourStopState;
    }({});
    let CacheKeys = /*#__PURE__*/function (CacheKeys) {
      CacheKeys["LastInitilized"] = "timestamp";
      CacheKeys["IsStarted"] = "started";
      CacheKeys["CurrentProgress"] = "progress";
      return CacheKeys;
    }({});

    /**
     * Asserts that a given condition is true. If the condition is false, it throws an error with the provided message.
     *
     * @param {boolean | string | number | any} condition - The condition to be evaluated. Can be of type boolean, string, number, or any other type.
     * @param {string} message - The error message to be displayed if the condition is false.
     * @returns {boolean} - Always returns true if the condition is true. Throws an error and does not return anything if the condition is false.
     *
     * @throws {Error} - If the condition is false, throws an error with the specified message prefixed by "TourguideJS: ".
     */
    function assert(condition, message) {
      if (!condition) throw `TourguideJS: ${message}`;
      return true;
    }

    /**
     * Clamps a number between a minimum and maximum value.
     *
     * @param value - The number to clamp.
     * @param min - Optional minimum limit. If not provided, it defaults to the value itself.
     * @param max - Optional maximum limit. If not provided, it defaults to the value itself.
     * @returns The clamped value between `min` and `max`.
     */
    function clamp$1(value) {
      let min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
      let max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NaN;
      min = isNaN(min) ? value : min;
      max = isNaN(max) ? value : max;
      return Math.max(min, Math.min(value, max));
    }

    // eslint-disable-next-line @typescript-eslint/no-namespace
    let Color;
    (function (_Color) {
      /**
       * Converts a hexadecimal color code to an RGB color.
       *
       * The function takes a string representing a hexadecimal color and converts it to its corresponding RGB values.
       * Hexadecimal colors are represented as `#RRGGBB`, where RR, GG, and BB are two-digit hexadecimal numbers representing the red, green, and blue components of the color respectively.
       *
       * @param hex - A string representing a hexadecimal color code. It should be in the format `#RRGGBB`.
       * @returns An array containing three elements: [R, G, B]. Each element is a number between 0 and 255 representing the intensity of the red, green, and blue components of the color respectively.
       *
       * Example usage:
       * ```typescript
       * const rgb = Color.hexToRGB("#FFA501"); // [255, 165, 1]
       * console.log(rgb); // Output: [255, 165, 1]
       * ```
       */
      function hexToRGB(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return [parseInt(result?.[1] || "", 16), parseInt(result?.[2] || "", 16), parseInt(result?.[3] || "", 16)];
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
        hsl[0] = clamp$1(hsl[0] * h, 0, 255);
        hsl[1] = clamp$1(hsl[1] * s, 0, 255);
        hsl[2] = clamp$1(hsl[2] * l, 0, 255);
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
    let Style;
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
          styleArray.push(`${splitNameArray.join("-")}: ${value}`);
        });
        return `${selector} {\n${styleArray.join(";\n")};\n}`;
      }
      _Style.colorObjToStyleVarString = colorObjToStyleVarString;
    })(Style || (Style = {}));

    /**
     * Returns the maximum z-index value of all elements in the document.
     *
     * @returns {number} The maximum z-index value found in the document. If no elements have a z-index set, it returns 0.
     */
    function getMaxZIndex() {
      return Math.max(...Array.from(document.querySelectorAll('body *'), el => parseFloat(window.getComputedStyle(el).zIndex)).filter(zIndex => !Number.isNaN(zIndex)), 0);
    }

    /**
     * Parses a data string into an object with default values.
     * @param data - The input data string, where key-value pairs are separated by ";".
     * @param defaults - An optional object containing default key-value pairs.
     * @returns A new object constructed from the parsed data and defaults.
     */
    function getDataContents() {
      let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      let defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const parts = data.split(";");
      const result = {
        ...defaults
      };
      parts.forEach(part => {
        const entries = (part || "").split(":");
        if (entries[0]) {
          result[(entries[0] || "").trim()] = (entries[1] || "").trim();
        } else {
          console.warn("Invalid key-value pair found in data string:", part);
        }
      });
      return result;
    }
    function isElementVisibleOnPage(element) {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.width !== 0 || rect.height !== 0 || rect.top !== 0 || rect.left !== 0 || rect.bottom !== 0 || rect.right !== 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-namespace
    let Scroll;
    (function (_Scroll) {
      /**
       * Retrieves the scroll coordinates of all elements that have a non-zero scrollable area.
       *
       * @param target - The initial HTML element from which to start checking for scrollable areas.
       * @returns An array of objects containing the element, its horizontal (x) and vertical (y) scroll positions.
       */
      function getScrollCoordinates(target) {
        const scrollItems = [];
        let targetUEl;
        targetUEl = u(target);
        do {
          if (!targetUEl) targetUEl = false;
          if (!targetUEl.first()) targetUEl = false;
          try {
            const element = targetUEl.first();
            const rect = targetUEl.size();
            if (element.scrollHeight !== rect?.height || element.scrollWidth !== rect?.width) {
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
            console.warn(`target element ${el} not found, skip`);
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
      function smoothScroll(element, options) {
        return new Promise(resolve => {
          if (!element || !isElementVisibleOnPage(element)) return resolve(false);
          const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                observer.disconnect();
                setTimeout(() => resolve(true), 100);
              }
            });
          }, {
            root: null,
            threshold: 0.5
          });
          observer.observe(element);
          element.scrollIntoView(Object.assign({
            behavior: "auto"
          }, options));
        });
      }
      _Scroll.smoothScroll = smoothScroll;
    })(Scroll || (Scroll = {}));

    /**
     * Custom positioning reference element.
     * @see https://floating-ui.com/docs/virtual-elements
     */

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
    function clamp(start, value, end) {
      return max(start, min(value, end));
    }
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
    function getExpandedPlacements(placement) {
      const oppositePlacement = getOppositePlacement(placement);
      return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
    }
    function getOppositeAlignmentPlacement(placement) {
      return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
    }
    function getSideList(side, isStart, rtl) {
      const lr = ['left', 'right'];
      const rl = ['right', 'left'];
      const tb = ['top', 'bottom'];
      const bt = ['bottom', 'top'];
      switch (side) {
        case 'top':
        case 'bottom':
          if (rtl) return isStart ? rl : lr;
          return isStart ? lr : rl;
        case 'left':
        case 'right':
          return isStart ? tb : bt;
        default:
          return [];
      }
    }
    function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
      const alignment = getAlignment(placement);
      let list = getSideList(getSide(placement), direction === 'start', rtl);
      if (alignment) {
        list = list.map(side => side + "-" + alignment);
        if (flipAlignment) {
          list = list.concat(list.map(getOppositeAlignmentPlacement));
        }
      }
      return list;
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
      const {
        x,
        y,
        width,
        height
      } = rect;
      return {
        width,
        height,
        top: y,
        left: x,
        right: x + width,
        bottom: y + height,
        x,
        y
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
     * next to a given reference element.
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
        x,
        y,
        width: rects.floating.width,
        height: rects.floating.height
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
        elements,
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

    /**
     * Provides data to position an inner element of the floating element so that it
     * appears centered to the reference element.
     * @see https://floating-ui.com/docs/arrow
     */
    const arrow = options => ({
      name: 'arrow',
      options,
      async fn(state) {
        const {
          x,
          y,
          placement,
          rects,
          platform,
          elements,
          middlewareData
        } = state;
        // Since `element` is required, we don't Partial<> the type.
        const {
          element,
          padding = 0
        } = evaluate(options, state) || {};
        if (element == null) {
          return {};
        }
        const paddingObject = getPaddingObject(padding);
        const coords = {
          x,
          y
        };
        const axis = getAlignmentAxis(placement);
        const length = getAxisLength(axis);
        const arrowDimensions = await platform.getDimensions(element);
        const isYAxis = axis === 'y';
        const minProp = isYAxis ? 'top' : 'left';
        const maxProp = isYAxis ? 'bottom' : 'right';
        const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
        const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
        const startDiff = coords[axis] - rects.reference[axis];
        const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
        let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

        // DOM platform can return `window` as the `offsetParent`.
        if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
          clientSize = elements.floating[clientProp] || rects.floating[length];
        }
        const centerToReference = endDiff / 2 - startDiff / 2;

        // If the padding is large enough that it causes the arrow to no longer be
        // centered, modify the padding so that it is centered.
        const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
        const minPadding = min(paddingObject[minProp], largestPossiblePadding);
        const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

        // Make sure the arrow doesn't overflow the floating element if the center
        // point is outside the floating element's bounds.
        const min$1 = minPadding;
        const max = clientSize - arrowDimensions[length] - maxPadding;
        const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
        const offset = clamp(min$1, center, max);

        // If the reference is small enough that the arrow's padding causes it to
        // to point to nothing for an aligned placement, adjust the offset of the
        // floating element itself. To ensure `shift()` continues to take action,
        // a single reset is performed when this is true.
        const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
        const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
        return {
          [axis]: coords[axis] + alignmentOffset,
          data: {
            [axis]: offset,
            centerOffset: center - offset - alignmentOffset,
            ...(shouldAddOffset && {
              alignmentOffset
            })
          },
          reset: shouldAddOffset
        };
      }
    });

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
    const autoPlacement$1 = function (options) {
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

    /**
     * Optimizes the visibility of the floating element by flipping the `placement`
     * in order to keep it in view when the preferred placement(s) will overflow the
     * clipping boundary. Alternative to `autoPlacement`.
     * @see https://floating-ui.com/docs/flip
     */
    const flip = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: 'flip',
        options,
        async fn(state) {
          var _middlewareData$arrow, _middlewareData$flip;
          const {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform,
            elements
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
            fallbackPlacements: specifiedFallbackPlacements,
            fallbackStrategy = 'bestFit',
            fallbackAxisSideDirection = 'none',
            flipAlignment = true,
            ...detectOverflowOptions
          } = evaluate(options, state);

          // If a reset by the arrow was caused due to an alignment offset being
          // added, we should skip any logic now since `flip()` has already done its
          // work.
          // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
          if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          const side = getSide(placement);
          const initialSideAxis = getSideAxis(initialPlacement);
          const isBasePlacement = getSide(initialPlacement) === initialPlacement;
          const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
          const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
          const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
          if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
            fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
          }
          const placements = [initialPlacement, ...fallbackPlacements];
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const overflows = [];
          let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            const sides = getAlignmentSides(placement, rects, rtl);
            overflows.push(overflow[sides[0]], overflow[sides[1]]);
          }
          overflowsData = [...overflowsData, {
            placement,
            overflows
          }];

          // One or more sides is overflowing.
          if (!overflows.every(side => side <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
            const nextPlacement = placements[nextIndex];
            if (nextPlacement) {
              // Try next placement and re-run the lifecycle.
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }

            // First, find the candidates that fit on the mainAxis side of overflow,
            // then find the placement that fits the best on the main crossAxis side.
            let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

            // Otherwise fallback.
            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case 'bestFit':
                  {
                    var _overflowsData$filter2;
                    const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                      if (hasFallbackAxisSideDirection) {
                        const currentSideAxis = getSideAxis(d.placement);
                        return currentSideAxis === initialSideAxis ||
                        // Create a bias to the `y` side axis due to horizontal
                        // reading directions favoring greater width.
                        currentSideAxis === 'y';
                      }
                      return true;
                    }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                    if (placement) {
                      resetPlacement = placement;
                    }
                    break;
                  }
                case 'initialPlacement':
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement
                }
              };
            }
          }
          return {};
        }
      };
    };

    function getSideOffsets(overflow, rect) {
      return {
        top: overflow.top - rect.height,
        right: overflow.right - rect.width,
        bottom: overflow.bottom - rect.height,
        left: overflow.left - rect.width
      };
    }
    function isAnySideFullyClipped(overflow) {
      return sides.some(side => overflow[side] >= 0);
    }
    /**
     * Provides data to hide the floating element in applicable situations, such as
     * when it is not in the same clipping context as the reference element.
     * @see https://floating-ui.com/docs/hide
     */
    const hide = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: 'hide',
        options,
        async fn(state) {
          const {
            rects
          } = state;
          const {
            strategy = 'referenceHidden',
            ...detectOverflowOptions
          } = evaluate(options, state);
          switch (strategy) {
            case 'referenceHidden':
              {
                const overflow = await detectOverflow(state, {
                  ...detectOverflowOptions,
                  elementContext: 'reference'
                });
                const offsets = getSideOffsets(overflow, rects.reference);
                return {
                  data: {
                    referenceHiddenOffsets: offsets,
                    referenceHidden: isAnySideFullyClipped(offsets)
                  }
                };
              }
            case 'escaped':
              {
                const overflow = await detectOverflow(state, {
                  ...detectOverflowOptions,
                  altBoundary: true
                });
                const offsets = getSideOffsets(overflow, rects.floating);
                return {
                  data: {
                    escapedOffsets: offsets,
                    escaped: isAnySideFullyClipped(offsets)
                  }
                };
              }
            default:
              {
                return {};
              }
          }
        }
      };
    };

    function getBoundingRect(rects) {
      const minX = min(...rects.map(rect => rect.left));
      const minY = min(...rects.map(rect => rect.top));
      const maxX = max(...rects.map(rect => rect.right));
      const maxY = max(...rects.map(rect => rect.bottom));
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
    }
    function getRectsByLine(rects) {
      const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
      const groups = [];
      let prevRect = null;
      for (let i = 0; i < sortedRects.length; i++) {
        const rect = sortedRects[i];
        if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
          groups.push([rect]);
        } else {
          groups[groups.length - 1].push(rect);
        }
        prevRect = rect;
      }
      return groups.map(rect => rectToClientRect(getBoundingRect(rect)));
    }
    /**
     * Provides improved positioning for inline reference elements that can span
     * over multiple lines, such as hyperlinks or range selections.
     * @see https://floating-ui.com/docs/inline
     */
    const inline = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: 'inline',
        options,
        async fn(state) {
          const {
            placement,
            elements,
            rects,
            platform,
            strategy
          } = state;
          // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
          // ClientRect's bounds, despite the event listener being triggered. A
          // padding of 2 seems to handle this issue.
          const {
            padding = 2,
            x,
            y
          } = evaluate(options, state);
          const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);
          const clientRects = getRectsByLine(nativeClientRects);
          const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
          const paddingObject = getPaddingObject(padding);
          function getBoundingClientRect() {
            // There are two rects and they are disjoined.
            if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
              // Find the first rect in which the point is fully inside.
              return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
            }

            // There are 2 or more connected rects.
            if (clientRects.length >= 2) {
              if (getSideAxis(placement) === 'y') {
                const firstRect = clientRects[0];
                const lastRect = clientRects[clientRects.length - 1];
                const isTop = getSide(placement) === 'top';
                const top = firstRect.top;
                const bottom = lastRect.bottom;
                const left = isTop ? firstRect.left : lastRect.left;
                const right = isTop ? firstRect.right : lastRect.right;
                const width = right - left;
                const height = bottom - top;
                return {
                  top,
                  bottom,
                  left,
                  right,
                  width,
                  height,
                  x: left,
                  y: top
                };
              }
              const isLeftSide = getSide(placement) === 'left';
              const maxRight = max(...clientRects.map(rect => rect.right));
              const minLeft = min(...clientRects.map(rect => rect.left));
              const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
              const top = measureRects[0].top;
              const bottom = measureRects[measureRects.length - 1].bottom;
              const left = minLeft;
              const right = maxRight;
              const width = right - left;
              const height = bottom - top;
              return {
                top,
                bottom,
                left,
                right,
                width,
                height,
                x: left,
                y: top
              };
            }
            return fallback;
          }
          const resetRects = await platform.getElementRects({
            reference: {
              getBoundingClientRect
            },
            floating: elements.floating,
            strategy
          });
          if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
            return {
              reset: {
                rects: resetRects
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
        mainAxis: rawValue.mainAxis || 0,
        crossAxis: rawValue.crossAxis || 0,
        alignmentAxis: rawValue.alignmentAxis
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
    const offset$1 = function (options) {
      if (options === void 0) {
        options = 0;
      }
      return {
        name: 'offset',
        options,
        async fn(state) {
          var _middlewareData$offse, _middlewareData$arrow;
          const {
            x,
            y,
            placement,
            middlewareData
          } = state;
          const diffCoords = await convertValueToCoords(state, options);

          // If the placement is the same and the arrow caused an alignment offset
          // then we don't need to change the positioning coordinates.
          if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          return {
            x: x + diffCoords.x,
            y: y + diffCoords.y,
            data: {
              ...diffCoords,
              placement
            }
          };
        }
      };
    };

    /**
     * Optimizes the visibility of the floating element by shifting it in order to
     * keep it in view when it will overflow the clipping boundary.
     * @see https://floating-ui.com/docs/shift
     */
    const shift = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: 'shift',
        options,
        async fn(state) {
          const {
            x,
            y,
            placement
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = false,
            limiter = {
              fn: _ref => {
                let {
                  x,
                  y
                } = _ref;
                return {
                  x,
                  y
                };
              }
            },
            ...detectOverflowOptions
          } = evaluate(options, state);
          const coords = {
            x,
            y
          };
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const crossAxis = getSideAxis(getSide(placement));
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            const minSide = mainAxis === 'y' ? 'top' : 'left';
            const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
            const min = mainAxisCoord + overflow[minSide];
            const max = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = clamp(min, mainAxisCoord, max);
          }
          if (checkCrossAxis) {
            const minSide = crossAxis === 'y' ? 'top' : 'left';
            const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
            const min = crossAxisCoord + overflow[minSide];
            const max = crossAxisCoord - overflow[maxSide];
            crossAxisCoord = clamp(min, crossAxisCoord, max);
          }
          const limitedCoords = limiter.fn({
            ...state,
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          });
          return {
            ...limitedCoords,
            data: {
              x: limitedCoords.x - x,
              y: limitedCoords.y - y,
              enabled: {
                [mainAxis]: checkMainAxis,
                [crossAxis]: checkCrossAxis
              }
            }
          };
        }
      };
    };
    /**
     * Built-in `limiter` that will stop `shift()` at a certain point.
     */
    const limitShift = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        options,
        fn(state) {
          const {
            x,
            y,
            placement,
            rects,
            middlewareData
          } = state;
          const {
            offset = 0,
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true
          } = evaluate(options, state);
          const coords = {
            x,
            y
          };
          const crossAxis = getSideAxis(placement);
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          const rawOffset = evaluate(offset, state);
          const computedOffset = typeof rawOffset === 'number' ? {
            mainAxis: rawOffset,
            crossAxis: 0
          } : {
            mainAxis: 0,
            crossAxis: 0,
            ...rawOffset
          };
          if (checkMainAxis) {
            const len = mainAxis === 'y' ? 'height' : 'width';
            const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
            const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
            if (mainAxisCoord < limitMin) {
              mainAxisCoord = limitMin;
            } else if (mainAxisCoord > limitMax) {
              mainAxisCoord = limitMax;
            }
          }
          if (checkCrossAxis) {
            var _middlewareData$offse, _middlewareData$offse2;
            const len = mainAxis === 'y' ? 'width' : 'height';
            const isOriginSide = ['top', 'left'].includes(getSide(placement));
            const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
            const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
            if (crossAxisCoord < limitMin) {
              crossAxisCoord = limitMin;
            } else if (crossAxisCoord > limitMax) {
              crossAxisCoord = limitMax;
            }
          }
          return {
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          };
        }
      };
    };

    /**
     * Provides data that allows you to change the size of the floating element —
     * for instance, prevent it from overflowing the clipping boundary or match the
     * width of the reference element.
     * @see https://floating-ui.com/docs/size
     */
    const size = function (options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: 'size',
        options,
        async fn(state) {
          var _state$middlewareData, _state$middlewareData2;
          const {
            placement,
            rects,
            platform,
            elements
          } = state;
          const {
            apply = () => {},
            ...detectOverflowOptions
          } = evaluate(options, state);
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const side = getSide(placement);
          const alignment = getAlignment(placement);
          const isYAxis = getSideAxis(placement) === 'y';
          const {
            width,
            height
          } = rects.floating;
          let heightSide;
          let widthSide;
          if (side === 'top' || side === 'bottom') {
            heightSide = side;
            widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
          } else {
            widthSide = side;
            heightSide = alignment === 'end' ? 'top' : 'bottom';
          }
          const maximumClippingHeight = height - overflow.top - overflow.bottom;
          const maximumClippingWidth = width - overflow.left - overflow.right;
          const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
          const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
          const noShift = !state.middlewareData.shift;
          let availableHeight = overflowAvailableHeight;
          let availableWidth = overflowAvailableWidth;
          if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
            availableWidth = maximumClippingWidth;
          }
          if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
            availableHeight = maximumClippingHeight;
          }
          if (noShift && !alignment) {
            const xMin = max(overflow.left, 0);
            const xMax = max(overflow.right, 0);
            const yMin = max(overflow.top, 0);
            const yMax = max(overflow.bottom, 0);
            if (isYAxis) {
              availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
            } else {
              availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
            }
          }
          await apply({
            ...state,
            availableWidth,
            availableHeight
          });
          const nextDimensions = await platform.getDimensions(elements.floating);
          if (width !== nextDimensions.width || height !== nextDimensions.height) {
            return {
              reset: {
                rects: true
              }
            };
          }
          return {};
        }
      };
    };

    function hasWindow() {
      return typeof window !== 'undefined';
    }
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
      return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
    }
    function getDocumentElement(node) {
      var _ref;
      return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
    }
    function isNode(value) {
      if (!hasWindow()) {
        return false;
      }
      return value instanceof Node || value instanceof getWindow(value).Node;
    }
    function isElement(value) {
      if (!hasWindow()) {
        return false;
      }
      return value instanceof Element || value instanceof getWindow(value).Element;
    }
    function isHTMLElement(value) {
      if (!hasWindow()) {
        return false;
      }
      return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
    }
    function isShadowRoot(value) {
      if (!hasWindow() || typeof ShadowRoot === 'undefined') {
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
    function isTopLayer(element) {
      return [':popover-open', ':modal'].some(selector => {
        try {
          return element.matches(selector);
        } catch (e) {
          return false;
        }
      });
    }
    function isContainingBlock(elementOrCss) {
      const webkit = isWebKit();
      const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;

      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
      // https://drafts.csswg.org/css-transforms-2/#individual-transforms
      return ['transform', 'translate', 'scale', 'rotate', 'perspective'].some(value => css[value] ? css[value] !== 'none' : false) || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
    }
    function getContainingBlock(element) {
      let currentNode = getParentNode(element);
      while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
        if (isContainingBlock(currentNode)) {
          return currentNode;
        } else if (isTopLayer(currentNode)) {
          return null;
        }
        currentNode = getParentNode(currentNode);
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
        scrollLeft: element.scrollX,
        scrollTop: element.scrollY
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
    function getOverflowAncestors(node, list, traverseIframes) {
      var _node$ownerDocument2;
      if (list === void 0) {
        list = [];
      }
      if (traverseIframes === void 0) {
        traverseIframes = true;
      }
      const scrollableAncestor = getNearestOverflowAncestor(node);
      const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
      const win = getWindow(scrollableAncestor);
      if (isBody) {
        const frameElement = getFrameElement(win);
        return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
      }
      return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
    }
    function getFrameElement(win) {
      return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
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
        let currentWin = win;
        let currentIFrame = getFrameElement(currentWin);
        while (currentIFrame && offsetParent && offsetWin !== currentWin) {
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
          currentWin = getWindow(currentIFrame);
          currentIFrame = getFrameElement(currentWin);
        }
      }
      return rectToClientRect({
        width,
        height,
        x,
        y
      });
    }

    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    function getWindowScrollBarX(element, rect) {
      const leftScroll = getNodeScroll(element).scrollLeft;
      if (!rect) {
        return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
      }
      return rect.left + leftScroll;
    }

    function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
      if (ignoreScrollbarX === void 0) {
        ignoreScrollbarX = false;
      }
      const htmlRect = documentElement.getBoundingClientRect();
      const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 :
      // RTL <body> scrollbar.
      getWindowScrollBarX(documentElement, htmlRect));
      const y = htmlRect.top + scroll.scrollTop;
      return {
        x,
        y
      };
    }

    function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
      let {
        elements,
        rect,
        offsetParent,
        strategy
      } = _ref;
      const isFixed = strategy === 'fixed';
      const documentElement = getDocumentElement(offsetParent);
      const topLayer = elements ? isTopLayer(elements.floating) : false;
      if (offsetParent === documentElement || topLayer && isFixed) {
        return rect;
      }
      let scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      let scale = createCoords(1);
      const offsets = createCoords(0);
      const isOffsetParentAnElement = isHTMLElement(offsetParent);
      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
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
      const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
      return {
        width: rect.width * scale.x,
        height: rect.height * scale.y,
        x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
        y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
      };
    }

    function getClientRects(element) {
      return Array.from(element.getClientRects());
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
          x: clippingAncestor.x - visualOffsets.x,
          y: clippingAncestor.y - visualOffsets.y,
          width: clippingAncestor.width,
          height: clippingAncestor.height
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
      let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
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
      const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
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
      const {
        width,
        height
      } = getCssDimensions(element);
      return {
        width,
        height
      };
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
          // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
          // Firefox with layout.scrollbar.side = 3 in about:config to test this.
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }
      const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
      const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
      const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
      return {
        x,
        y,
        width: rect.width,
        height: rect.height
      };
    }

    function isStaticPositioned(element) {
      return getComputedStyle$1(element).position === 'static';
    }

    function getTrueOffsetParent(element, polyfill) {
      if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
        return null;
      }
      if (polyfill) {
        return polyfill(element);
      }
      let rawOffsetParent = element.offsetParent;

      // Firefox returns the <html> element as the offsetParent if it's non-static,
      // while Chrome and Safari return the <body> element. The <body> element must
      // be used to perform the correct calculations even if the <html> element is
      // non-static.
      if (getDocumentElement(element) === rawOffsetParent) {
        rawOffsetParent = rawOffsetParent.ownerDocument.body;
      }
      return rawOffsetParent;
    }

    // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.
    function getOffsetParent(element, polyfill) {
      const win = getWindow(element);
      if (isTopLayer(element)) {
        return win;
      }
      if (!isHTMLElement(element)) {
        let svgOffsetParent = getParentNode(element);
        while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
          if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
            return svgOffsetParent;
          }
          svgOffsetParent = getParentNode(svgOffsetParent);
        }
        return win;
      }
      let offsetParent = getTrueOffsetParent(element, polyfill);
      while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
        offsetParent = getTrueOffsetParent(offsetParent, polyfill);
      }
      if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
        return win;
      }
      return offsetParent || getContainingBlock(element) || win;
    }

    const getElementRects = async function (data) {
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      const floatingDimensions = await getDimensionsFn(data.floating);
      return {
        reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
        floating: {
          x: 0,
          y: 0,
          width: floatingDimensions.width,
          height: floatingDimensions.height
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
     * Modifies the placement by translating the floating element along the
     * specified axes.
     * A number (shorthand for `mainAxis` or distance), or an axes configuration
     * object may be passed.
     * @see https://floating-ui.com/docs/offset
     */
    const offset = offset$1;

    /**
     * Optimizes the visibility of the floating element by choosing the placement
     * that has the most space available automatically, without needing to specify a
     * preferred placement. Alternative to `flip`.
     * @see https://floating-ui.com/docs/autoPlacement
     */
    const autoPlacement = autoPlacement$1;

    /**
     * Optimizes the visibility of the floating element by shifting it in order to
     * keep it in view when it will overflow the clipping boundary.
     * @see https://floating-ui.com/docs/shift
     */
    shift;

    /**
     * Optimizes the visibility of the floating element by flipping the `placement`
     * in order to keep it in view when the preferred placement(s) will overflow the
     * clipping boundary. Alternative to `autoPlacement`.
     * @see https://floating-ui.com/docs/flip
     */
    flip;

    /**
     * Provides data that allows you to change the size of the floating element —
     * for instance, prevent it from overflowing the clipping boundary or match the
     * width of the reference element.
     * @see https://floating-ui.com/docs/size
     */
    size;

    /**
     * Provides data to hide the floating element in applicable situations, such as
     * when it is not in the same clipping context as the reference element.
     * @see https://floating-ui.com/docs/hide
     */
    hide;

    /**
     * Provides data to position an inner element of the floating element so that it
     * appears centered to the reference element.
     * @see https://floating-ui.com/docs/arrow
     */
    arrow;

    /**
     * Provides improved positioning for inline reference elements that can span
     * over multiple lines, such as hyperlinks or range selections.
     * @see https://floating-ui.com/docs/inline
     */
    inline;

    /**
     * Built-in `limiter` that will stop `shift()` at a certain point.
     */
    limitShift;

    /**
     * Computes the `x` and `y` coordinates that will place the floating element
     * next to a given reference element.
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
      /**
       * Generates a middleware that keeps the floating element within the viewport, ensuring it does not go out of bounds.
       * @param options - An object containing the padding to maintain around the floating element.
       * @param options.padding - The number of pixels to keep as padding from the edges of the viewport.
       * @returns A middleware function that adjusts the position of the floating element if it is about to go out of bounds.
       */
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
            const _x = clamp$1(x, viewDimentions.left + padding, viewDimentions.right - rects.floating.width - padding);
            const _y = clamp$1(y, viewDimentions.top + padding, viewDimentions.bottom - rects.floating.height - padding);
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
      /**
       * Generates a middleware that positions the floating element fixed relative to the viewport.
       * @param options - An object containing optional properties for the placement and padding.
       * @param options.placement - The alignment of the floating element within the viewport, defaulting to "middle-center".
       * @param options.padding - The number of pixels to keep as padding from the edges of the viewport, defaulting to 0.
       * @returns A middleware function that sets the position of the floating element to fixed and adjusts it based on the provided placement and padding.
       */
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
      _Position.positionabsolute = () => ({
        name: "positionabsolute",
        fn(_ref4) {
          let {
            elements
          } = _ref4;
          elements.floating.style.position = "absolute";
          return {
            data: {}
          };
        }
      });
      /**
       * Generates a middleware that highlights the reference element by setting its position to absolute and adjusting its size.
       * @param options - An object containing the reference element, optional padding, and whether the highlight should be centered.
       * @param options.element - The HTML element to be highlighted.
       * @param options.padding - Optional padding around the reference element. Default is 0.
       * @param options.centered - Whether the highlight should be centered on the reference element. Default is false.
       * @returns A middleware function that sets the position of the reference element to absolute and adjusts its size based on the provided options.
       */
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
            data.top = `${rects.reference.y - padding}px`;
            data.left = `${rects.reference.x - padding}px`;
            data.width = `${rects.reference.width + padding * 2}px`;
            data.height = `${rects.reference.height + padding * 2}px`;
          }
          Style.setStyle(element, data);
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
          Style.setStyle(tooltip, {
            left: `${data.x}px`,
            top: `${data.y}px`
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
          Style.setStyle(element, data);
          return {
            data
          };
        }
      });
    })(Position || (Position = {}));

    /**
     * This file contains a collection of tools used to aid in the management and display of guided tours and tour steps.
     *
     * The primary functionalities include:
     * - Managing various aspects of guided tours, such as start times, durations, and content.
     * - Providing utilities for displaying specific tour steps within the context of a tour.
     * - Supporting customizations and configurations to tailor the user experience during guided tours.
     *
     * This module can be integrated into applications that require interactive tutorials or step-by-step guidance, enhancing user engagement and satisfaction through clear and engaging onboarding experiences.
     */

    var Utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        assert: assert,
        clamp: clamp$1,
        get Color () { return Color; },
        get Style () { return Style; },
        getMaxZIndex: getMaxZIndex,
        get Scroll () { return Scroll; },
        get Position () { return Position; },
        getDataContents: getDataContents,
        isElementVisibleOnPage: isElementVisibleOnPage
    });

    /**
     * Generates a GUID (Globally Unique Identifier) in string format.
     * @returns A string representing a GUID.
     */
    function GUID() {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }

    /**
     * Represents an abstract step in a tour. 
     * This is an interface that defines the basic structure and properties
     * for all steps within a tour. It includes properties such as id (a unique identifier), title, description, element
     * to highlight (which should be an instance of Element from umbrellajs), and a callback function that will execute
     * when the step is completed. This abstract class can be extended to create additional step types, each with their
     * own specific properties and behaviors, allowing for customization based on different user experiences or application needs.
     */
    class Step {
      /**
       * The type of the step, defaults to "default".
       */
      static Type = "default";
      /**
       * The style or appearance of the step, represented as a string.
       */
      static Style = "";
      /**
       * A unique identifier for the step, generated using GUID().
       */
      uid = (() => GUID())();
      /**
       * The context in which the step is placed, typically a Tour object.
       */

      /**
       * The index of the step in the tour.
       */
      index = 0;
      /**
       * Indicates whether the step is currently active.
       */
      active = false;
      /**
       * Indicates whether the step is the first in its sequence.
       */
      first = false;
      /**
       * Indicates whether the step is the last in its sequence.
       */
      last = false;
      /**
       * The data associated with the step, which must be provided when creating a new instance.
       */

      constructor(data, context) {
        this.data = data;
        this.context = context;
      }
      /**
       * Attaches the step to a parent element in the DOM. This method must be implemented by concrete subclasses.
       */

      /**
       * Shows the step, setting its active state to true if it is not already active.
       */
      show() {
        !this.active && (this.active = true);
      }
      /**
       * Hides the step, setting its active state to false if it is currently active.
       */
      hide() {
        this.active && (this.active = false);
      }
      /**
       * Removes the step from its parent element in the DOM. This method must be implemented by concrete subclasses.
       */
    }

    var Abstracts = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AbstractCacheManager: AbstractCacheManager,
        Step: Step
    });

    const PopoverStep$1 = ".guided-tour-step {\n  display: none;\n  opacity: 0;\n}\n.guided-tour-step .guided-tour-step-clickblock {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  pointer-events: all;\n}\n.guided-tour-step.active {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: all;\n  transition: opacity 150ms;\n}\n.guided-tour-step.active .guided-tour-step-highlight {\n  position: absolute;\n  box-sizing: border-box;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1em var(--tourguide-overlay-color);\n  z-index: 1;\n}\n.guided-tour-step.active .guided-tour-step-tooltip {\n  position: absolute;\n  z-index: 2;\n  background-color: var(--tourguide-background-color);\n  width: var(--tourguide-tooltip-width);\n  max-width: max-content;\n  border-radius: 5px;\n  box-sizing: border-box;\n  box-shadow: 0 0 2.5em -0.8em #000, 0 0 10px -5px #000, 0 0 3px -1px #000;\n  transition: opacity 150ms;\n}\n@media screen and (max-width: 760px) {\n  .guided-tour-step.active .guided-tour-step-tooltip {\n    max-width: 85vw;\n    width: max-content !important;\n  }\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-arrow {\n  position: absolute;\n  width: 14px;\n  height: 14px;\n  background: var(--tourguide-background-color);\n  z-index: -1;\n  transform: rotate(45deg);\n  pointer-events: none;\n  margin-left: -7px;\n  margin-top: -7px;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-arrow.no-arrow {\n  display: none;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content-container {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  height: calc(100% - 2.6em);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-image {\n  flex-grow: 1;\n  flex-shrink: 1;\n  overflow: hidden;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-image img {\n  width: 100%;\n  height: 100%;\n  border-radius: 4px 4px 0 0;\n  object-fit: cover;\n  object-position: center;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content-wrapper {\n  margin: 1.2em 1.5em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-title {\n  font-size: 130%;\n  margin-bottom: 0.5em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content {\n  flex-shrink: 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content b,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content strong {\n  font-weight: bold;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content i,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content em {\n  font-style: italic;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content a {\n  cursor: pointer;\n  text-decoration: underline;\n  color: var(--tourguide-accent-color);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content mark {\n  background: inherit;\n  text-shadow: 0px 2px 4px #ff0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content code,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content dfn {\n  padding: 1px 6px 1px 4px;\n  border-radius: 4px;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content code {\n  background-color: #f0f0f0;\n  color: #e83e8c;\n  font-family: monospace;\n  font-size: 87.5%;\n  word-break: break-word;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content dfn {\n  font-style: italic;\n  background-color: #ffc6e5;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content p,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content blockquote {\n  margin: 1em 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content p:last-child,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul:last-child,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol:last-child,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content blockquote:last-child {\n  margin-bottom: 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content blockquote {\n  padding-left: 1em;\n  border-left: 4px solid silver;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol {\n  padding-left: 1.5em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ul li,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-content ol li {\n  margin: 0.3em 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions {\n  display: flex;\n  column-gap: 0.5em;\n  margin-top: 1.5em;\n  justify-content: end;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button {\n  color: var(--tourguide-accent-color);\n  padding: 0.5em 1em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button.primary {\n  background: var(--tourguide-accent-color);\n  padding: 0.5em 1.5em;\n  color: #fff;\n  border-radius: 4px;\n  font-size: 110%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button.primary:hover, .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-actions .button.primary:focus {\n  filter: brightness(120%);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-icon {\n  display: inline-block;\n  overflow: hidden;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button {\n  flex-direction: column;\n  justify-content: center;\n  /* <-- actual veertical align */\n  display: inline-flex;\n  text-align: center;\n  cursor: pointer;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button .guided-tour-icon {\n  align-self: center;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-close {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  width: 2em;\n  height: 2em;\n  color: var(--tourguide-step-button-close-color);\n  border-radius: 50%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-prev,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-next,\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-complete {\n  width: 36px;\n  height: 36px;\n  background: var(--tourguide-background-color);\n  border-radius: 50%;\n  margin-top: -18px;\n  position: absolute;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-prev {\n  color: var(--tourguide-step-button-prev-color);\n  left: 0;\n  transform: translateX(-50%);\n  top: 50%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-next {\n  color: var(--tourguide-step-button-next-color);\n  right: 0;\n  transform: translateX(50%);\n  top: 50%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-button-complete {\n  color: var(--tourguide-step-button-complete-color);\n  right: 0;\n  transform: translateX(50%);\n  top: 50%;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-footer {\n  flex-shrink: 0;\n  flex-grow: 0;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets {\n  text-align: center;\n  line-height: 16px;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul {\n  list-style: none;\n  margin: -0.5em 1em 0.5em;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li {\n  display: inline-block;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li button {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  display: inline-block;\n  background-color: var(--tourguide-bullet-color);\n  border: 8px solid var(--tourguide-background-color);\n  box-sizing: content-box;\n  cursor: pointer;\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li button.complete {\n  background-color: var(--tourguide-bullet-visited-color);\n}\n.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner .guided-tour-step-bullets ul li button.current {\n  background-color: var(--tourguide-bullet-current-color);\n}\n@media screen and (min-width: 760px) {\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container {\n    flex-direction: row;\n    height: 100%;\n  }\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container .guided-tour-step-content-wrapper {\n    flex: 1 1 auto;\n  }\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container .guided-tour-step-image {\n    width: 50%;\n    margin-bottom: -24px;\n    flex: 0 0 auto;\n  }\n  .guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-tooltip-inner.step-layout-horizontal .guided-tour-step-content-container .guided-tour-step-image img {\n    border-radius: 4px 0 0 4px;\n    height: 100%;\n    object-fit: cover;\n    object-position: center;\n  }\n}";

    // import scrollIntoView from "scroll-into-view";
    const popoverStepDataDefaults = {
      layout: "vertical",
      image: "",
      title: "",
      content: "",
      actions: [],
      index: 0,
      selector: undefined,
      navigation: true,
      alignment: "start"
    };

    /**
     * Represents a step in a tour, attached to a specific element, that includes a popover with an image, title, content, and layout options.
     */
    class PopoverStep extends Step {
      static Style = (() => PopoverStep$1)();
      get _image() {
        return this.context.helpers.u(`<figure class="guided-tour-step-image">${this.data.image ? `<img src="${this.data.image}" />` : ""}</figure>`);
      }
      get _content() {
        const content = this.context.helpers.u(`<div class="guided-tour-step-content-wrapper">
                <div id="tooltip-title-${this.data.index}" role="heading" class="guided-tour-step-title">${this.data.title}</div>
                <div class="guided-tour-step-content">${this.data.content}</div>
            </div>`);
        if (Array.isArray(this.data.actions) && this.data.actions.length > 0) {
          const actions = this.context.helpers.u(`<div class="guided-tour-step-actions">
                    ${this.data.actions.map((action, index) => `<${action.href ? "a" : "button"} ${function () {
        let attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return Object.keys(attrs).map(key => `${key}="${attrs[key]}"`).join(" ");
      }(action.attributes)} class="button${action.primary ? " primary" : ""}" data-index="${index}">${action.label}</${action.href ? "a" : "button"}>`).join("")}
                </div>`);
          actions.find("a, button").on("click", e => {
            const action = this.data.actions[parseInt((e?.target).dataset.index)];
            if (action.action) e.preventDefault();
            this.context.action(e, action);
          });
          content.append(actions);
        }
        return content;
      }
      get _footer() {
        return this.context.helpers.u(`<div class="guided-tour-step-bullets">
                <ul>${this.context.steps.map((step, i) => `<li>
                    <button title="Go to step ${i + 1}" data-index="${i}" class="${step.index < this.index ? "complete" : step.index == this.index ? "current" : ""}"></button>
                    </li>`).join("")}</ul>
            </div>`);
      }
      get _navigation() {
        const footer = this.context.helpers.u("<div class=\"guided-tour-step-footer\"></div>");
        if (this.data.navigation) footer.append(this.context.helpers.u(`<button class="guided-tour-step-button guided-tour-step-button-close" title="End tour">
                        <svg class="guided-tour-icon" viewBox="0 0 20 20" width="16" height="16"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M16,16 L4,4"></path><path d="M16,4 L4,16"></path></g></svg>
                    </button>
                    ${!this.first ? `<button class="guided-tour-step-button guided-tour-step-button-prev" title="Prev step">
                      <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32">
                      <polyline points="12 4 6 10 12 16" fill="none" stroke="currentColor" stroke-width="1"></polyline>
                      </svg>
                    </button>` : ""}
                    ${this.last ? `<button class="guided-tour-step-button guided-tour-step-button-complete" title="Complete tour">
                      <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32">
                      <polyline points="4,10 8,15 17,4" fill="none" stroke="currentColor" stroke-width="1"></polyline>
                      </svg>
                    </button>` : `<button class="guided-tour-step-button guided-tour-step-button-next" title="Next step">
                      <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32">
                      <polyline points="7 4 13 10 7 16" fill="none" stroke="currentColor" stroke-width="1"></polyline>
                      </svg>
                    </button>`}`));
        if (this.context.steps.length > 1) footer.append(this._footer);
        footer.find(".guided-tour-step-button-prev").on("click", this.context.previous);
        footer.find(".guided-tour-step-button-next").on("click", this.context.next);
        footer.find(".guided-tour-step-button-close").on("click", this.context.stop);
        footer.find(".guided-tour-step-button-complete").on("click", this.context.complete);
        footer.find(".guided-tour-step-bullets button").on("click", e => this.context.go(parseInt(this.context.helpers.u(e.target).data("index"))));
        return footer;
      }
      get _container() {
        return this.context.helpers.u(`<div role="dialog" aria-labelleby="tooltip-title-${this.data.index}" class="guided-tour-step${this.first ? " guided-tour-step-first" : ""}${this.last ? " guided-tour-step-last" : ""}"><div class="guided-tour-step-clickblock"></div></div>`);
      }
      get _highlight() {
        return this.$highlight = this.context.helpers.u("<div class=\"guided-tour-step-highlight\"></div>");
      }
      get _el() {
        if (!this.$container) {
          const tooltip = this.$tooltip = this.context.helpers.u("<div role=\"document\" class=\"guided-tour-step-tooltip\"></div>");
          if (this.data.width) this.context.helpers.Style.setStyle(tooltip, {
            width: this.data.width,
            maxWidth: this.data.width
          });
          if (this.data.height) this.context.helpers.Style.setStyle(tooltip, {
            height: this.data.height,
            maxHeight: this.data.height
          });
          const tooltipinner = this.context.helpers.u(`<div class="guided-tour-step-tooltip-inner${this.data.layout === "horizontal" ? " step-layout-horizontal" : ""}"></div>`);
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
      /**
       * Constructs a new PopoverStep instance.
       *
       * @param data The step data, including additional properties for the popover (e.g., image, title, content).
       * @param context The tour context in which this step is being used.
       */
      constructor(data, context) {
        super(Object.assign({}, popoverStepDataDefaults, data), context);
        this._validate(this.data);
        this._decorate(this.data);
        // this._scrollCancel = null;
        this.data.layout = data.layout;
        if (data.image && context.options.preloadimages && !/^data:/i.test(data.image)) {
          const preload = new Image();
          preload.onerror = () => {
            console.error(new Error(`Invalid image URL: ${data.image}`));
            this.data.image = "";
          };
          preload.src = this.data.image;
        }
        this.data.actions = [];
        if (data.actions) {
          if (!Array.isArray(data.actions)) {
            console.error(new Error(`actions must be array but got ${typeof data.actions}`));
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
        const _target = $target?.first();
        const isElementVisible = this.context.helpers.isElementVisibleOnPage(_target);
        if (!isElementVisible) this.$arrow.addClass("no-arrow ");else this.$arrow.removeClass("no-arrow ");
        this.context.helpers.Position.position(_target || document.body, this.$tooltip?.first(), isElementVisible ? [this.context.helpers.Position.positionabsolute(), this.context.helpers.Position.autoPlacement({
          alignment: this.data.alignment,
          padding: 24
        }), this.context.helpers.Position.highlight({
          element: this.$highlight?.first(),
          padding: 5
        }), this.context.helpers.Position.offset, this.context.helpers.Position.arrow({
          element: this.$arrow?.first(),
          padding: 18
        }), this.context.helpers.Position.keepinview({
          padding: 24
        })] : [this.context.helpers.Position.positionfixed(), this.context.helpers.Position.highlight({
          element: this.$highlight?.first(),
          centered: true
        })]);
      }
      /**
       * Attach the popover step to a parent container.
       *
       * @param parent The parent container.
       */
      attach(parent) {
        this.context.helpers.u(parent).append(this._el);
      }

      /**
       * Show the popover step.
       *
       * @return {boolean} Whether the popover step was shown successfully.
       */
      show() {
        this._cancel();
        if (!this.active) {
          super.show();
          const $target = this.context.helpers.u(this.data.selector || "null");
          this._position($target);
          this.context.helpers.Style.setStyle(this.$container, {
            opacity: 1
          });
          (this.$container?.find(".guided-tour-step-tooltip, button.button, button.primary, .guided-tour-step-button-complete, .guided-tour-step-button-next").last()).focus({
            preventScroll: true
          });
          this._el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
          return true;
        }
        return false;
      }

      /**
       * Hide the popover step.
       *
       * @return {boolean} Whether the popover step was hidden successfully.
       */
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

      /**
       * Remove the popover step from the DOM.
       */
      remove() {
        this.hide();
        this._el.remove();
      }
    }

    /**
     * Generates a function that creates an ActionHandler object for use in a tour.
     *
     * @param name - The unique identifier for the action handler.
     * @param handlerFn - The function that will handle the actions defined by the tour.
     * @returns An ActionHandlerType object containing the name and the onAction method.
     */
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

    /**
     * The `ContentDecorator` class is designed to apply a custom decoration function to specific patterns within text. It supports both regular expressions and literal strings as match patterns, allowing for flexible content manipulation.
     */
    class ContentDecorator {
      /**
       * Constructs a new `ContentDecorator` instance.
       * @param match - A string or regular expression pattern to be matched in the text. If provided as a string, it is wrapped in a regular expression with global and case-insensitive flags.
       * @param decoratorFn - The function that will be applied to the matched content. It receives the entire text, an array of matches, additional step data, and context information.
       */
      constructor(match, decoratorFn) {
        if (typeof match === 'string' && match)
          // eslint-disable-next-line no-useless-escape
          this.match = new RegExp(`{\s*${match.trim()}\s*(,.+?)?\s*?}`, 'gmi');else if (!match) this.match = false;else this.match = match;
        this.decoratorFn = decoratorFn;
      }

      /**
       * Tests whether the given text matches the configured pattern.
       * @param text - The string to be tested against the match pattern.
       * @returns `true` if the text matches the pattern, otherwise `false`. If no pattern is set (`match` is false), it always returns true.
       */
      test(text) {
        return this.match ? this.match.test(text) : true;
      }

      /**
       * Applies the decorator function to the text based on the configured match pattern and properties.
       * @param text - The input text in which matches are to be found and decorated.
       * @param step - Additional data or context that might be used by the decorator function during rendering.
       * @param context - A broader context object that can include additional information necessary for decoration.
       * @returns The text with matched patterns decorated according to the configured decorator function.
       */
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

    /**
    The MIT License (MIT)

    Copyright (c) 2017 Jason Miller

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    https://github.com/developit/snarkdown
    */

    const TAGS = {
      '': ['<em>', '</em>'],
      '_': ['<strong>', '</strong>'],
      '*': ['<strong>', '</strong>'],
      '~': ['<s>', '</s>'],
      '\n': ['<br />'],
      ' ': ['<br />'],
      '-': ['<hr />']
    };

    /**
     * Outdent a string based on the first indented line's leading whitespace
     * @private
     */
    function outdent(str) {
      return str.replace(RegExp('^' + (str.match(/^(\t| )+/) || '')[0], 'gm'), '');
    }

    /**
     * Encode special attribute characters to HTML entities in a String.
     * @private
     */
    function encodeAttr(str) {
      return (str + '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /**
     * Parse Markdown into an HTML String.
     */
    function parse(md, prevLinks) {
      // eslint-disable-next-line no-regex-spaces
      const tokenizer = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:!\[([^\]]*?)\]\(([^)]+?)\))|(\[)|(\](?:\(([^)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm;
      const context = [];
      let out = '';
      const links = prevLinks || {};
      let last = 0;
      let chunk = null;
      let prev = '';
      let token = null;
      let inner = '';
      let t = '';
      function tag(token) {
        const desc = TAGS[token[1] || ''];
        const end = context[context.length - 1] === token;
        if (!desc) return token;
        if (!desc[1]) return desc[0];
        if (end) context.pop();else context.push(token);
        return desc[end | 0];
      }
      function flush() {
        let str = '';
        while (context.length > 0) str += tag(context[context.length - 1]);
        return str;
      }
      md = md.replace(/^\[(.+?)\]:\s*(.+)$/gm, (_s, name, url) => {
        links[name.toLowerCase()] = url;
        return '';
      }).replace(/^\n+|\n+$/g, '');
      while (token = tokenizer.exec(md)) {
        prev = md.substring(last, token.index);
        last = tokenizer.lastIndex;
        chunk = token[0];
        if (prev.match(/[^\\](\\\\)*\\$/)) ;
        // Code/Indent blocks:
        // eslint-disable-next-line no-cond-assign
        else if (t = token[3] || token[4]) {
          chunk = '<pre class="code ' + (token[4] ? 'poetry' : token[2].toLowerCase()) + '"><code' + (token[2] ? ` class="language-${token[2].toLowerCase()}"` : '') + '>' + outdent(encodeAttr(t).replace(/^\n+|\n+$/g, '')) + '</code></pre>';
        }
        // > Quotes, -* lists:
        // eslint-disable-next-line no-cond-assign
        else if (t = token[6]) {
          if (t.match(/\./)) {
            token[5] = token[5].replace(/^\d+/gm, '');
          }
          inner = parse(outdent(token[5].replace(/^\s*[>*+.-]/gm, '')));
          if (t == '>') t = 'blockquote';else {
            t = t.match(/\./) ? 'ol' : 'ul';
            inner = inner.replace(/^(.*)(\n|$)/gm, '<li>$1</li>');
          }
          chunk = '<' + t + '>' + inner + '</' + t + '>';
        }
        // Images:
        else if (token[8]) {
          chunk = `<img src="${encodeAttr(token[8])}" alt="${encodeAttr(token[7])}">`;
        }
        // Links:
        else if (token[10]) {
          out = out.replace('<a>', `<a href="${encodeAttr(token[11] || links[prev.toLowerCase()])}" target="_blank">`);
          chunk = flush() + '</a>';
        } else if (token[9]) {
          chunk = '<a>';
        }
        // Headings:
        else if (token[12] || token[14]) {
          t = 'h' + (token[14] ? token[14].length : token[13] > '=' ? 1 : 2);
          chunk = '<' + t + '>' + parse(token[12] || token[15], links) + '</' + t + '>';
        }
        // `code`:
        else if (token[16]) {
          chunk = '<code>' + encodeAttr(token[16]) + '</code>';
        }
        // Inline formatting: *em*, **strong** & friends
        else if (token[17] || token[1]) {
          chunk = tag(token[17] || '--');
        }
        out += prev;
        out += chunk;
      }
      return (out + md.substring(last) + flush()).replace(/^\n+|\n+$/g, '');
    }

    const MarkdownDecorator = new ContentDecorator("", text => {
      return parse(text);
    });

    /**
     * Represents a step in a tour, not attached to any specific element, that includes a card with an image, title, and content , extending the functionality of {@link PopoverStep}.
     */
    class CardStep extends PopoverStep {
      static Type = "card";
      static Style = "";
      get _container() {
        return this.context.helpers.u(`<div role="dialog" aria-labelleby="tooltip-title-${this.data.index}" class="guided-tour-step${this.first ? " guided-tour-step-first" : ""}${this.last ? " guided-tour-step-last" : ""}"></div>`);
      }
      get _highlight() {
        return this.context.helpers.u("<span></span>");
      }
      get _footer() {
        return this.context.helpers.u("<span></span>");
      }
      _position() {
        this.context.helpers.Position.position(document.body, this.$tooltip?.first(), [this.context.helpers.Position.positionfixed({
          placement: this.data.placement,
          padding: 25
        })]);
      }
      /**
       * Attach the popover step to a parent container.
       *
       * @param parent The parent container.
       */
      attach(parent) {
        super.attach(parent);
        if (this.$arrow) {
          this.$arrow.addClass("no-arrow ");
        }
      }
    }

    const Tour$1 = ":host {\n  position: absolute;\n  overflow: visible;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 0;\n  box-sizing: border-box;\n  line-height: 1.4;\n  text-align: left;\n  text-rendering: optimizespeed;\n  font-family: var(--tourguide-font-family);\n  font-size: var(--tourguide-font-size);\n  color: var(--tourguide-text-color);\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n  -moz-tab-size: 4;\n  /* 3 */\n  tab-size: 4;\n  /* 3 */\n}\n:host * {\n  margin: 0;\n  padding: 0;\n  background: none;\n  border: none;\n  border-width: 0;\n  border-style: none;\n  border-color: currentColor;\n  box-shadow: none;\n  color: inherit;\n  appearance: none;\n  font-size: inherit;\n  font-weight: inherit;\n  text-decoration: none;\n}\n:host a,\n:host button {\n  cursor: pointer;\n}\n:host a:hover, :host a:focus,\n:host button:hover,\n:host button:focus {\n  outline: 5px auto var(--tourguide-focus-color);\n}";

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
      overlayColor: "rgb(0 100 255 / 25%)",
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

    /**
     * Default options for a guided tour in the application.
     */
    const defaultOptions = {
      /**
       * A unique identifier for the tour instance, used to manage multiple tours.
       */
      identifier: "default",
      /**
       * The root element of the page on which the tour will be displayed.
       */
      root: "body",
      /**
       * A CSS selector for elements with the `data-tour` attribute, used to select the steps of the tour.
       */
      selector: "[data-tour]",
      /**
       * Whether to restore the position and visibility state of the tour on page load.
       * Defaults to `true`.
       */
      restoreinitialposition: true,
      /**
       * Whether to preload images for the tour steps before displaying them.
       * Defaults to `true`.
       */
      preloadimages: true,
      /**
       * Whether to resume the tour if it was in progress when the page was last loaded.
       * Defaults to `true`.
       */
      resumeOnLoad: true,
      /**
       * Configuration for making requests to fetch tour data from a server.
       */
      request: {
        options: {
          mode: "cors",
          cache: "no-cache"
        },
        headers: {
          "Content-Type": "application/json"
        }
      },
      /**
       * Keyboard navigation configuration for the tour.
       */
      keyboardNavigation: defaultKeyNavOptions,
      /**
       * A list of factories for creating new tour steps.
       */
      stepFactory: [PopoverStep, CardStep],
      /**
       * List of action handlers to be applied to the tour steps.
       */
      actionHandlers: [],
      /**
       * List of content decorators to be applied to the tour steps' content.
       */
      contentDecorators: [MarkdownDecorator],
      /**
       * The cache manager used for managing the state and data of the tour.
       */
      cacheManagerFactory: MemoryCacheManager,
      /**
       * A list of steps that make up the tour.
       */
      steps: [],
      /**
       * The source of the tour data (e.g., a URL or a local file path).
       */
      src: "",
      /**
       * Customizable styling options for the tour.
       */
      style: defaultStyle
    };
    function isEventAttrbutesMatched(event, code) {
      return event.code === code;
    }

    /**
     * A class that manages guided tours in a web application. It provides an interface for creating, managing, and displaying interactive guided tours on a webpage. The tour can be customized with various options such as keyboard navigation settings, step types, action handlers, content decorators, and styling. It also supports data fetching from external sources to dynamically load tour steps.
     *
     * ### Possible Uses:
     * - **Guided Tours**: Enhance user experience by guiding users through the main features of an application or website with a series of informative and interactive steps.
     * - **Educational Tools**: Use guided tours as educational aids for new users, explaining complex functionalities in a step-by-step manner.
     * - **Help and Support**: Provide quick access to essential information and tutorials right within the product through guided tours that highlight key features or provide help messages.
     *
     * ### Key Features:
     * - **Step Management**: Easily add, remove, or modify steps in the tour using a variety of step types (e.g., popover, card).
     * - **Keyboard Navigation**: Support for navigating through steps using keyboard shortcuts, customizable by the user.
     * - **Dynamic Data Loading**: Fetch tour data from external sources to dynamically update tour content without hardcoding it.
     * - **Custom Styling**: Highly configurable styling options allow you to match the tour's appearance with your application's design language.
     * - **State Management**: Persistent state management ensures that users can resume tours where they left off even after navigating away and returning to the page.
     *
     * ### Usage Example:
     * ```typescript
     * const tour = new GuidedTour({
     *   identifier: "exampleTour",
     *   root: "#app",
     *   selector: "[data-tour-step]",
     *   steps: [
     *     { content: "Welcome to the app!", target: ".welcome" },
     *     { content: "Here's how you can use this feature.", target: ".feature-section" }
     *   ]
     * });
     *
     * tour.start();
     * ```
     */
    class Tour {
      static DefaultKeyNavOptions = (() => defaultKeyNavOptions)();
      static DefaultTourStyles = (() => defaultStyle)();
      static DefaultTourOptions = (() => defaultOptions)();
      static ActionHandler = (() => ActionHandler)();
      static ContentDecorator = (() => ContentDecorator)();
      static Abstracts = (() => Abstracts)();
      static Helpers = (() => ({
        u,
        ...Utils
      }))();
      _steps = [];
      _current = 0;
      _active = false;
      _ready = false;
      _complete = false;
      _stepsSrc = (() => StepsSource.DOM)();
      _initialposition = null;
      /**
       * Get the cache manager instance. If it doesn't exist, create a new one using the factory provided in options.
       */
      get cacheManager() {
        return this._cacheManager || (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this._cacheManager = new this.options.cacheManagerFactory(this.options.identifier));
      }

      /**
       * Get the current step in the tour.
       */
      get currentstep() {
        return this._steps[this._current];
      }

      /**
       * Get the total number of visible steps in the tour.
       */
      get length() {
        return this._steps.length;
      }

      /**
       * Get all visible steps in the tour, excluding hidden ones.
       */
      get steps() {
        return this._steps;
      }

      /**
       * Check if there is a next step available.
       */
      get hasnext() {
        return this.nextstep !== this._current;
      }

      /**
       * Get the index of the next step. If no next step exists, returns the current step index.
       */
      get nextstep() {
        return clamp$1(this._current + 1, 0, this.length - 1);
      }

      /**
       * Get the index of the previous step. If no previous step exists, returns the current step index.
       */
      get previousstep() {
        return clamp$1(this._current - 1, 0);
      }

      /**
       * Get the tour options object.
       */
      get options() {
        return this._options;
      }

      /**
       * Get the helpers object which includes utility functions for the tour.
       */
      get helpers() {
        return this._helpers || (this._helpers = {
          ...Tour.Helpers,
          decorate: this._decorateText.bind(this)
        });
      }
      /**
       * Creates an instance of GuidedTour.
       * @param options - The configuration options for the guided tour.
       */
      constructor() {
        let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
      /**
       * Initializes the steps for the tour.
       * @param steps - The array of step data.
       */
      _initSteps(steps) {
        this._steps = steps.map(data => {
          const stepType = data.type || "default";
          const StepFactory = this._options.stepFactory?.find(f => f.Type === stepType);
          assert(StepFactory, `No factory for step of type "${stepType}". Check your setup.`);
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
      /**
       * Triggers the tour ready event.
       */
      _onTourReady() {
        if (this._ready && this.cacheManager.get(CacheKeys.IsStarted) && this.options.resumeOnLoad) {
          this._current = parseInt(this.cacheManager.get(CacheKeys.CurrentProgress));
          if (isNaN(this._current)) this._current = 0;
          this._triggerCustomEvent("resume");
          this.start(this._current);
        }
      }
      /**
       * Injects the base and custom styles for the tour.
       */
      _injectStyles() {
        const style = u(`<style>${Tour$1}</style>${this.options.stepFactory.map(step => step.Style).filter(Boolean).map(style => `<style>${style}</style>`).join("")}`);
        u(this._shadowRoot).append(style);
        const colors = u(`<style>${Style.colorObjToStyleVarString(this._options.style || {}, "--tourguide")}</style>`);
        u(this._shadowRoot).append(colors);
      }
      /**
       * Handles keyboard events for navigation and actions within the tour.
       * @param event - The KeyboardEvent to handle.
       */
      _keyboardHandler(event) {
        if (this._options.keyboardNavigation?.next && isEventAttrbutesMatched(event, this._options.keyboardNavigation.next)) {
          this.next();
        } else if (this._options.keyboardNavigation?.prev && isEventAttrbutesMatched(event, this._options.keyboardNavigation.prev)) {
          this.previous();
        } else if (this._options.keyboardNavigation?.first && isEventAttrbutesMatched(event, this._options.keyboardNavigation.first)) {
          this.go(0);
        } else if (this._options.keyboardNavigation?.last && isEventAttrbutesMatched(event, this._options.keyboardNavigation.last)) {
          this.go(this.length - 1);
        } else if (this._options.keyboardNavigation?.stop && isEventAttrbutesMatched(event, this._options.keyboardNavigation.stop)) {
          this.stop();
        } else if (this._options.keyboardNavigation?.complete && isEventAttrbutesMatched(event, this._options.keyboardNavigation.complete)) {
          this.complete();
        }
        return true;
      }
      /**
       * Decorates the text content of a step with custom decorators if defined.
       * @param text - The raw text to be decorated.
       * @param step - The current step being processed.
       */
      _decorateText(text, step) {
        let _text = text;
        this._options.contentDecorators?.forEach(decorator => {
          if (decorator.test(_text)) _text = decorator.render(_text, step, this);
        });
        return _text;
      }
      /**
       * Triggers a custom event on the tour container element.
       * @param type - The type of the custom event.
       * @param detail - Additional data to be included in the event.
       */
      _triggerCustomEvent(type) {
        let detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
        const customEvent = new CustomEvent(type, {
          bubbles: false,
          cancelable: false,
          composed: false,
          detail
        });
        this._containerElement.first().dispatchEvent(customEvent);
      }
      /**
       * Resets the tour state to its initial position.
       */
      reset() {
        if (this._active) this.stop();
        // if (this._stepsSrc === StepsSource.DOM) {
        //   this._steps = [];
        // }
        this._complete = false;
        this._current = 0;
        this.cacheManager.set(CacheKeys.IsStarted, true);
      }
      /**
       * Starts the tour from a specific step.
       * @param step - The index of the step to start from.
       */
      start() {
        let step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        if (this._ready) {
          this._complete = false;
          if (this._stepsSrc === StepsSource.DOM) {
            this._initSteps(u(this._options.selector).nodes.map(step => {
              const data = getDataContents(u(step).data("tour"));
              data.selector = step;
              return data;
            }));
            assert(this.length > 0, "Found no tour steps on page. Please verify your setup.");
          }
          Style.setStyle(this._containerElement, {
            "z-index": getMaxZIndex() + 1
          });
          if (this._options.restoreinitialposition) {
            this._initialposition = Scroll.getScrollCoordinates(this._options.root);
          }
          if (!this._active) {
            this._triggerCustomEvent("start");
            this.cacheManager.set(CacheKeys.IsStarted, true);
            u(this._options.root).addClass("__guided-tour-active");
            this.reset();
            this._steps.forEach(step => step.attach(this._shadowRoot));
            this._current = NaN;
            this._active = true;
            this.go(step);
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
      /**
       * Triggers a custom action based on the provided tour action.
       * @param event - The triggering event.
       * @param action - The action to be performed.
       */
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
                const handler = this._options.actionHandlers?.find(handler => handler.name === action.action);
                if (handler) handler.onAction(event, action, this);
              }
          }
          this._triggerCustomEvent("action", {
            action,
            context: this,
            trigger: event
          });
        }
      }
      /**
       * Moves to the next step in the tour.
       * @param e - The optional event that triggered the method call.
       */
      next(e) {
        e && e.preventDefault && e.preventDefault();
        e && e.stopPropagation && e.stopPropagation();
        if (this._active) {
          this.go(this.nextstep);
        }
      }
      /**
       * Moves to the previous step in the tour.
       * @param e - The optional event that triggered the method call.
       */
      previous(e) {
        e && e.preventDefault && e.preventDefault();
        e && e.stopPropagation && e.stopPropagation();
        if (this._active) {
          this.go(this.previousstep);
        }
      }
      /**
       * Moves to a specific step in the tour.
       * @param step - The index of the step to navigate to.
       */
      go(step) {
        if (this._active && this._current !== step) {
          const direction = this._current < step ? TourNavigationDirection.FORWARD : TourNavigationDirection.BACKWARD;
          this.currentstep?.hide();
          this._current = clamp$1(step, 0, this.length - 1);
          if (this.currentstep.data?.selector) {
            Scroll.smoothScroll(u(this.currentstep.data.selector).first(), {
              block: "center"
            }).then(() => {
              this.currentstep.show(direction);
            });
          } else this.currentstep.show(direction);
          this.cacheManager.set(CacheKeys.CurrentProgress, this._current);
          this._triggerCustomEvent("step");
        }
      }
      /**
       * Stops and resets the tour.
       */
      stop() {
        if (this._active) {
          this.currentstep.hide();
          Style.setStyle(this._containerElement, {
            "z-index": 0
          });
          this._active = false;
          this._steps.forEach(step => step.remove(this._complete ? TourStopState.COMPLETE : TourStopState.INCOMPLETE));
          u(this._options.root).removeClass("__guided-tour-active");
          if (this._options.keyboardNavigation) {
            u(":root").off("keyup", this._keyboardHandler);
          }
          if (this._options.restoreinitialposition && this._initialposition) {
            Scroll.animateScroll(this._initialposition, 120);
          }
          this.cacheManager.set(CacheKeys.IsStarted, false);
          this.cacheManager.clear(CacheKeys.CurrentProgress);
          this._triggerCustomEvent("stop");
        }
      }
      /**
       * Completes the tour and marks it as finished.
       */
      complete() {
        if (this._active) {
          this._complete = true;
          this.stop();
          this._triggerCustomEvent("complete");
        }
      }
      /**
       * Removes the tour from the DOM and resets its state.
       */
      remove() {
        if (this._ready) {
          this._containerElement?.remove();
          // delete this._containerElement;
          this._active = false;
          this._ready = false;
        }
      }
      /**
       * Adds an event listener to the tour container element.
       * @param type - The type of the event to listen for.
       * @param listener - The function that handles the event.
       */
      addEventListener(type, listener) {
        this._containerElement.on(type, listener);
      }
      /**
       * Removes an event listener from the tour container element.
       * @param type - The type of the event to remove the listener for.
       * @param listener - The function that handles the event.
       */
      removeEventListener(type, listener) {
        this._containerElement.off(type, listener);
      }
    }

    exports.TourNavigationDirection = TourNavigationDirection;
    exports.TourStopState = TourStopState;
    exports["default"] = Tour;
    exports.defaultKeyNavOptions = defaultKeyNavOptions;
    exports.defaultOptions = defaultOptions;
    exports.defaultStyle = defaultStyle;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
