function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var umbrella_min = createCommonjsModule(function (module) {
/* Umbrella JS 3.2.2 umbrellajs.com */

var u=function(t,e){return this instanceof u?t instanceof u?t:("string"==typeof t&&(t=this.select(t,e)),t&&t.nodeName&&(t=[t]),void(this.nodes=this.slice(t))):new u(t,e)};u.prototype={get length(){return this.nodes.length}},u.prototype.nodes=[],u.prototype.addClass=function(){return this.eacharg(arguments,function(t,e){t.classList.add(e);})},u.prototype.adjacent=function(i,t,n){return "number"==typeof t&&(t=0===t?[]:new Array(t).join().split(",").map(Number.call,Number)),this.each(function(r,o){var e=document.createDocumentFragment();u(t||{}).map(function(t,e){var n="function"==typeof i?i.call(this,t,e,r,o):i;return "string"==typeof n?this.generate(n):u(n)}).each(function(t){this.isInPage(t)?e.appendChild(u(t).clone().first()):e.appendChild(t);}),n.call(this,r,e);})},u.prototype.after=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t.nextSibling);})},u.prototype.append=function(t,e){return this.adjacent(t,e,function(t,e){t.appendChild(e);})},u.prototype.args=function(t,e,n){return "function"==typeof t&&(t=t(e,n)),"string"!=typeof t&&(t=this.slice(t).map(this.str(e,n))),t.toString().split(/[\s,]+/).filter(function(t){return t.length})},u.prototype.array=function(o){o=o;var i=this;return this.nodes.reduce(function(t,e,n){var r;return o?((r=o.call(i,e,n))||(r=!1),"string"==typeof r&&(r=u(r)),r instanceof u&&(r=r.nodes)):r=e.innerHTML,t.concat(!1!==r?r:[])},[])},u.prototype.attr=function(t,e,r){return r=r?"data-":"",this.pairs(t,e,function(t,e){return t.getAttribute(r+e)},function(t,e,n){t.setAttribute(r+e,n);})},u.prototype.before=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t);})},u.prototype.children=function(t){return this.map(function(t){return this.slice(t.children)}).filter(t)},u.prototype.clone=function(){return this.map(function(t,e){var n=t.cloneNode(!0),r=this.getAll(n);return this.getAll(t).each(function(t,e){for(var n in this.mirror)this.mirror[n]&&this.mirror[n](t,r.nodes[e]);}),n})},u.prototype.getAll=function(t){return u([t].concat(u("*",t).nodes))},u.prototype.mirror={},u.prototype.mirror.events=function(t,e){if(t._e)for(var n in t._e)t._e[n].forEach(function(t){u(e).on(n,t.callback);});},u.prototype.mirror.select=function(t,e){u(t).is("select")&&(e.value=t.value);},u.prototype.mirror.textarea=function(t,e){u(t).is("textarea")&&(e.value=t.value);},u.prototype.closest=function(e){return this.map(function(t){do{if(u(t).is(e))return t}while((t=t.parentNode)&&t!==document)})},u.prototype.data=function(t,e){return this.attr(t,e,!0)},u.prototype.each=function(t){return this.nodes.forEach(t.bind(this)),this},u.prototype.eacharg=function(n,r){return this.each(function(e,t){this.args(n,e,t).forEach(function(t){r.call(this,e,t);},this);})},u.prototype.empty=function(){return this.each(function(t){for(;t.firstChild;)t.removeChild(t.firstChild);})},u.prototype.filter=function(e){var t=function(t){return t.matches=t.matches||t.msMatchesSelector||t.webkitMatchesSelector,t.matches(e||"*")};return "function"==typeof e&&(t=e),e instanceof u&&(t=function(t){return -1!==e.nodes.indexOf(t)}),u(this.nodes.filter(t))},u.prototype.find=function(e){return this.map(function(t){return u(e||"*",t)})},u.prototype.first=function(){return this.nodes[0]||!1},u.prototype.generate=function(t){return /^\s*<tr[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().nodes:/^\s*<t(h|d)[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().children().nodes:/^\s*</.test(t)?u(document.createElement("div")).html(t).children().nodes:document.createTextNode(t)},u.prototype.handle=function(){var t=this.slice(arguments).map(function(e){return "function"==typeof e?function(t){t.preventDefault(),e.apply(this,arguments);}:e},this);return this.on.apply(this,t)},u.prototype.hasClass=function(){return this.is("."+this.args(arguments).join("."))},u.prototype.html=function(e){return void 0===e?this.first().innerHTML||"":this.each(function(t){t.innerHTML=e;})},u.prototype.is=function(t){return 0<this.filter(t).length},u.prototype.isInPage=function(t){return t!==document.body&&document.body.contains(t)},u.prototype.last=function(){return this.nodes[this.length-1]||!1},u.prototype.map=function(t){return t?u(this.array(t)).unique():this},u.prototype.not=function(e){return this.filter(function(t){return !u(t).is(e||!0)})},u.prototype.off=function(t,e,n){var r=null==e&&null==n,o=null,i=e;return "string"==typeof e&&(o=e,i=n),this.eacharg(t,function(e,n){u(e._e?e._e[n]:[]).each(function(t){(r||t.orig_callback===i&&t.selector===o)&&e.removeEventListener(n,t.callback);});})},u.prototype.on=function(t,e,o){var i=null,n=e;"string"==typeof e&&(i=e,n=o,e=function(e){var n=arguments,r=!1;u(e.currentTarget).find(i).each(function(t){if(t===e.target||t.contains(e.target)){r=!0;try{Object.defineProperty(e,"currentTarget",{get:function(){return t}});}catch(t){}o.apply(t,n);}}),r||e.currentTarget!==e.target||o.apply(e.target,n);});var r=function(t){return e.apply(this,[t].concat(t.detail||[]))};return this.eacharg(t,function(t,e){t.addEventListener(e,r),t._e=t._e||{},t._e[e]=t._e[e]||[],t._e[e].push({callback:r,orig_callback:n,selector:i});})},u.prototype.pairs=function(n,t,e,r){if(void 0!==t){var o=n;(n={})[o]=t;}return "object"==typeof n?this.each(function(t){for(var e in n)r(t,e,n[e]);}):this.length?e(this.first(),n):""},u.prototype.param=function(e){return Object.keys(e).map(function(t){return this.uri(t)+"="+this.uri(e[t])}.bind(this)).join("&")},u.prototype.parent=function(t){return this.map(function(t){return t.parentNode}).filter(t)},u.prototype.prepend=function(t,e){return this.adjacent(t,e,function(t,e){t.insertBefore(e,t.firstChild);})},u.prototype.remove=function(){return this.each(function(t){t.parentNode&&t.parentNode.removeChild(t);})},u.prototype.removeClass=function(){return this.eacharg(arguments,function(t,e){t.classList.remove(e);})},u.prototype.replace=function(t,e){var n=[];return this.adjacent(t,e,function(t,e){n=n.concat(this.slice(e.children)),t.parentNode.replaceChild(e,t);}),u(n)},u.prototype.scroll=function(){return this.first().scrollIntoView({behavior:"smooth"}),this},u.prototype.select=function(t,e){return t=t.replace(/^\s*/,"").replace(/\s*$/,""),/^</.test(t)?u().generate(t):(e||document).querySelectorAll(t)},u.prototype.serialize=function(){var r=this;return this.slice(this.first().elements).reduce(function(e,n){return !n.name||n.disabled||"file"===n.type?e:/(checkbox|radio)/.test(n.type)&&!n.checked?e:"select-multiple"===n.type?(u(n.options).each(function(t){t.selected&&(e+="&"+r.uri(n.name)+"="+r.uri(t.value));}),e):e+"&"+r.uri(n.name)+"="+r.uri(n.value)},"").slice(1)},u.prototype.siblings=function(t){return this.parent().children(t).not(this)},u.prototype.size=function(){return this.first().getBoundingClientRect()},u.prototype.slice=function(t){return t&&0!==t.length&&"string"!=typeof t&&"[object Function]"!==t.toString()?t.length?[].slice.call(t.nodes||t):[t]:[]},u.prototype.str=function(e,n){return function(t){return "function"==typeof t?t.call(this,e,n):t.toString()}},u.prototype.text=function(e){return void 0===e?this.first().textContent||"":this.each(function(t){t.textContent=e;})},u.prototype.toggleClass=function(t,e){return !!e===e?this[e?"addClass":"removeClass"](t):this.eacharg(t,function(t,e){t.classList.toggle(e);})},u.prototype.trigger=function(t){var o=this.slice(arguments).slice(1);return this.eacharg(t,function(t,e){var n,r={bubbles:!0,cancelable:!0,detail:o};try{n=new window.CustomEvent(e,r);}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,o);}t.dispatchEvent(n);})},u.prototype.unique=function(){return u(this.nodes.reduce(function(t,e){return null!=e&&!1!==e&&-1===t.indexOf(e)?t.concat(e):t},[]))},u.prototype.uri=function(t){return encodeURIComponent(t).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},u.prototype.wrap=function(t){return this.map(function(e){return u(t).each(function(t){(function(t){for(;t.firstElementChild;)t=t.firstElementChild;return u(t)})(t).append(e.cloneNode(!0)),e.parentNode.replaceChild(t,e);})})},module.exports&&(module.exports=u,module.exports.u=u);
});
var umbrella_min_1 = umbrella_min.u;

var Icons = "<svg id=\"GuidedTourIconSet\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"display: none;\">\n<symbol id=\"tour-icon-close\" viewBox=\"0 0 20 20\"><path d=\"M16,16 L4,4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\"></path><path d=\"M16,4 L4,16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\"></path></symbol>\n<symbol id=\"tour-icon-next\" viewBox=\"0 0 20 20\"><polyline points=\"7 4 13 10 7 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\"></polyline></symbol>\n<symbol id=\"tour-icon-prev\" viewBox=\"0 0 20 20\"><polyline points=\"12 4 6 10 12 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\"></polyline></symbol>\n<symbol id=\"tour-icon-complete\" viewBox=\"0 0 20 20\"><polyline points=\"4,10 8,15 17,4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\"></polyline></symbol>\n</svg>";

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
    }else{
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
        differenceX = x - parent.pageXOffset;
        differenceY = y - parent.pageYOffset;
    }else{
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
        return animate(parent);
    }

    raf(animate.bind(null, parent));
}

function defaultIsWindow(target){
    return target.self === target
}

function transitionScrollTo(target, parent, settings, callback){
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
        end: end
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

    var cancel;

    while(parent){
        if(settings.debug){
            console.log('Scrolling parent node', parent);
        }

        if(validTarget(parent, parents) && (isScrollable ? isScrollable(parent, defaultIsScrollable) : defaultIsScrollable(parent))){
            parents++;
            cancel = transitionScrollTo(target, parent, settings, done);
        }

        parent = findParentElement(parent);

        if(!parent){
            done(COMPLETE);
            break;
        }
    }

    return cancel;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

function clamp(number, min, max) {
  min = isNaN(min) ? number : min;
  max = isNaN(max) ? number : max;
  return Math.max(min, Math.min(number, max));
}

function parseNumber(number) {
  var parseTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "float";

  if (typeof number === "number") return number;
  var ret = 0;
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

function getDataContents() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var defaults$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var parts = data.split(";");
  var result = _extends({}, defaults$$1);
  parts.forEach(function (part) {
    var entries = (part || "").split(":");
    result[(entries[0] || "").trim()] = (entries[1] || "").trim();
  });
  return result;
}

function isTargetValid(target) {
  return target && target.offsetParent !== null;
}

/**
 * getting bounding client rect and additional properties
 * @param {Element | string} element target element or selector
 * @param {Element} root root element
 * @returns {{ width: number, height: number, top: number, bottom: number, left: number, right: number, viewTop: number, viewBottom: number, viewLeft: number, viewRight: number }} object
 */
function getBoundingClientRect(element, root) {
  var rect = umbrella_min(element).size();
  var view = getViewportRect(root);

  return {
    width: rect.width,
    height: rect.height,
    top: rect.top + view.scrollY - view.rootTop,
    bottom: rect.bottom + view.scrollY - view.rootTop,
    left: rect.left + view.scrollX - view.rootLeft,
    right: rect.right + view.scrollX - view.rootLeft,
    viewTop: rect.top,
    viewBottom: rect.bottom,
    viewLeft: rect.left,
    viewRight: rect.right
  };
}

/**
 * getting viewport rect and additional properties
 * @param {Element | string} element target element or selector
 * @returns {{ width: number, height: number, scrollX: number, scrollY: number, rootWidth: number, rootHeight: number, rootTop: number, rootLeft: number }} object
 */
function getViewportRect(element) {
  try {
    var rootEl = umbrella_min(element).first();
    var rect = umbrella_min(element).size();
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: rootEl.scrollLeft,
      scrollY: rootEl.scrollTop,
      rootWidth: rect.width,
      rootHeight: rect.height,
      rootTop: rect.top,
      rootLeft: rect.left
    };
  } catch (error) {
    console.error(error);
    throw Error("element is invalid: " + element);
  }
}

/**
 * alternative for jQuery .css() get method
 * @param {Element | string} element target element or selector
 * @param {string} css3Prop css3 property
 * @returns {string} value
 */
function getStyle(element, css3Prop) {
  var originalEl = umbrella_min(element).first();

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

var allowedProperties = ["top", "left", "right", "bottom", "width", "height", "maxWidth", "minWidth", "transform"];
/**
 * convert the color object to the sets of css variables.
 * @important all style properties will merge with current styles!
 * @param {Element | string} element target element or selector
 * @param {Object<string, string | number>} styleObj style object. allowed keys are:\
 *  "top" | "left" | "right" | "bottom" | "width" | "height" | "maxWidth" | "minWidth" | "transform"
 */
function setStyle(element, styleObj) {
  if (!Object.prototype.toString.call(styleObj) === "[object Object]") return;

  var style = umbrella_min(element).first().style;

  Object.entries(styleObj).filter(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return allowedProperties.includes(key) && (typeof val === "number" || typeof val === "string");
  }).forEach(function (_ref3) {
    var _ref4 = slicedToArray(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];

    var value = typeof val === "number" ? val + "px" : val;
    switch (key) {
      case "top":
        style.top = value;
        break;
      case "left":
        style.left = value;
        break;
      case "right":
        style.right = value;
        break;
      case "bottom":
        style.bottom = value;
        break;
      case "width":
        style.width = value;
        break;
      case "height":
        style.height = value;
        break;
      case "maxWidth":
        style.maxWidth = value;
        break;
      case "minWidth":
        style.minWidth = value;
        break;
      case "transform":
        style.transform = value;
        break;
      default:
        break;
    }
  });
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
  var selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ":root";

  var styleArray = [];
  Object.entries(colors).forEach(function (_ref5) {
    var _ref6 = slicedToArray(_ref5, 2),
        key = _ref6[0],
        value = _ref6[1];

    var splitedNameArray = [prefix];
    var prevIndex = 0;
    for (var i = 0; i < key.length; i += 1) {
      if ("A" <= key[i] && key[i] <= "Z") {
        splitedNameArray.push(key.substring(prevIndex, i).toLowerCase());
        prevIndex = i;
      }
    }
    splitedNameArray.push(key.substring(prevIndex, key.length).toLowerCase());
    styleArray.push(splitedNameArray.join("-") + ": " + value);
  });
  return selector + " {\n" + styleArray.join(";\n") + ";\n}";
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
      console.warn("target element " + el + " not found, skip");
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
  var targetUEl = umbrella_min(target);

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

var e={"":["<em>","</em>"],_:["<strong>","</strong>"],"*":["<strong>","</strong>"],"~":["<s>","</s>"],"\n":["<br />"]," ":["<br />"],"-":["<hr />"]};function n(e){return e.replace(RegExp("^"+(e.match(/^(\t| )+/)||"")[0],"gm"),"")}function r(e){return (e+"").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function t(a,c){var o,l,g,s,p,u=/((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:!\[([^\]]*?)\]\(([^)]+?)\))|(\[)|(\](?:\(([^)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm,m=[],h="",i=c||{},d=0;function f(n){var r=e[n[1]||""],t=m[m.length-1]==n;return r?r[1]?(t?m.pop():m.push(n),r[0|t]):r[0]:n}function $(){for(var e="";m.length;)e+=f(m[m.length-1]);return e}for(a=a.replace(/^\[(.+?)\]:\s*(.+)$/gm,function(e,n,r){return i[n.toLowerCase()]=r,""}).replace(/^\n+|\n+$/g,"");g=u.exec(a);)l=a.substring(d,g.index),d=u.lastIndex,o=g[0],l.match(/[^\\](\\\\)*\\$/)||((p=g[3]||g[4])?o='<pre class="code '+(g[4]?"poetry":g[2].toLowerCase())+'"><code'+(g[2]?' class="language-'+g[2].toLowerCase()+'"':"")+">"+n(r(p).replace(/^\n+|\n+$/g,""))+"</code></pre>":(p=g[6])?(p.match(/\./)&&(g[5]=g[5].replace(/^\d+/gm,"")),s=t(n(g[5].replace(/^\s*[>*+.-]/gm,""))),">"==p?p="blockquote":(p=p.match(/\./)?"ol":"ul",s=s.replace(/^(.*)(\n|$)/gm,"<li>$1</li>")),o="<"+p+">"+s+"</"+p+">"):g[8]?o='<img src="'+r(g[8])+'" alt="'+r(g[7])+'">':g[10]?(h=h.replace("<a>",'<a href="'+r(g[11]||i[l.toLowerCase()])+'">'),o=$()+"</a>"):g[9]?o="<a>":g[12]||g[14]?o="<"+(p="h"+(g[14]?g[14].length:g[13]>"="?1:2))+">"+t(g[12]||g[15],i)+"</"+p+">":g[16]?o="<code>"+r(g[16])+"</code>":(g[17]||g[1])&&(o=f(g[17]||"--"))),h+=l,h+=o;return (h+a.substring(d)+$()).replace(/^\n+|\n+$/g,"")}

// data-step="title: Step1; content: .../<>"

function getEventType(event) {
  var eventType = "";
  if (typeof event === "string") {
    eventType = event;
  } else if ((typeof event === "undefined" ? "undefined" : _typeof(event)) === "object") {
    eventType = event.type;
  }

  return eventType;
}

function getEventAttrs(event) {
  if ((typeof event === "undefined" ? "undefined" : _typeof(event)) === "object") {
    return Object.entries(event).map(function (_ref) {
      var _ref2 = slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return { key: key, value: value };
    });
  }

  return [];
}

function getPosition(align) {
  if (align === "top") return 0.1;
  if (align === "bottom") return 0.9;
  if (align === "center") return 0.5;

  return 0;
}

var Step = function () {
  createClass(Step, [{
    key: "el",
    get: function get$$1() {
      var _this = this;

      if (!this.container) {
        var image = umbrella_min("<div role=\"figure\" class=\"guided-tour-step-image\">" + (this.image ? "<img src=\"" + this.image + "\" />" : "") + "</div>");
        var title = umbrella_min("<div role=\"heading\" class=\"guided-tour-step-title\">" + this.title + "</div>");
        var content = umbrella_min("<div class=\"guided-tour-step-content\">" + this.content + "</div>");
        var footer = umbrella_min("<div class=\"guided-tour-step-footer\">\n                <span role=\"button\" class=\"guided-tour-step-button guided-tour-step-button-close\" title=\"End tour\">\n                    <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"16\" height=\"16\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-close\"></use></svg>\n                </span>\n                " + (!this.first ? "<span role=\"button\" class=\"guided-tour-step-button guided-tour-step-button-prev\" title=\"Prev step\">\n                  <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                    <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-prev\"></use>\n                  </svg>\n                </span>" : "") + "\n                " + (this.last ? "<span role=\"button\" class=\"guided-tour-step-button guided-tour-step-button-complete\" title=\"Complete tour\">\n                  <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                    <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-complete\"></use>\n                  </svg>\n                </span>" : "<span role=\"button\" class=\"guided-tour-step-button guided-tour-step-button-next\" title=\"Next step\">\n                  <svg class=\"guided-tour-icon\" viewBox=\"0 0 20 20\" width=\"32\" height=\"32\">\n                    <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#tour-icon-next\"></use>\n                  </svg>\n                </span>") + "\n                " + (this.context._steps.length > 1 ? "<div class=\"guided-tour-step-bullets\">\n                    <ul>" + this.context._steps.map(function (step, i) {
          return "<li  title=\"Go to step " + (i + 1) + "\" data-index=\"" + i + "\" class=\"" + (step.index < _this.index ? "complete" : step.index == _this.index ? "current" : "") + "\"></li>";
        }).join("") + "</ul>\n                </div>" : "") + "\n            </div>");
        footer.find(".guided-tour-step-button-prev").on("click", this.context.previous);
        footer.find(".guided-tour-step-button-next").on("click", this.context.next);
        footer.find(".guided-tour-step-button-close").on("click", this.context.stop);
        footer.find(".guided-tour-step-button-complete").on("click", this.context.complete);
        footer.find(".guided-tour-step-bullets li").on("click", function (e) {
          return _this.context.go(parseInt(umbrella_min(e.target).data("index")));
        });
        var highlight = this.highlight = umbrella_min("<div class=\"guided-tour-step-highlight\"></div>");
        var tooltip = this.tooltip = umbrella_min("<div role=\"tooltip\" class=\"guided-tour-step-tooltip\"></div>");
        var tooltipinner = umbrella_min("<div class=\"guided-tour-step-tooltip-inner\"></div>");
        var arrow = this.arrow = umbrella_min("<div aria-hidden=\"true\" class=\"guided-tour-arrow\"><div aria-hidden=\"true\" class=\"guided-tour-arrow-inner\"></div></div>");
        tooltipinner.append(arrow).append(image).append(title).append(content).append(footer);
        tooltip.append(tooltipinner);
        this.container = umbrella_min("<div role=\"dialog\" class=\"guided-tour-step" + (this.first ? " guided-tour-step-first" : "") + (this.last ? " guided-tour-step-last" : "") + "\"></div>");
        this.container.append(highlight).append(tooltip);
      }
      return this.container;
    }
  }, {
    key: "target",
    get: function get$$1() {
      return this._target || umbrella_min(this._selector).first();
    },
    set: function set$$1(target) {
      this._target = target;
    }
  }]);

  function Step(step, context) {
    var _this2 = this;

    classCallCheck(this, Step);

    this.index = 0;
    this.image = null;
    this.title = "";
    this.content = "";
    this.active = false;
    this.first = false;
    this.last = false;

    this.container = null;
    this.highlight = null;
    this.tooltip = null;
    this.arrow = null;

    this.context = context;
    this._target = null;
    this._timerHandler = null;
    this._scrollCancel = null;

    var data = void 0;
    if (!(step instanceof HTMLElement)) {
      if (!(step.hasOwnProperty("title") && step.hasOwnProperty("content") && step.hasOwnProperty("step"))) {
        throw new Error("invalid step parameter:\n" + JSON.stringify(step, null, 2) + "\n" + "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach");
      }
      data = step;
      this._selector = step.selector;
    } else {
      this.target = step;
      data = getDataContents(umbrella_min(step).data("tour"));
    }
    this.index = parseInt(data.step);
    this.title = data.title;
    this.content = data.content;
    if (data.marked) {
      this.content = t(this.content);
    }
    this.image = data.image;
    if (data.image && context.options.preloadimages && !/^data:/i.test(data.image)) {
      var preload = new Image();
      // preload.onload = (e) => {
      // };
      preload.onerror = function () {
        console.error(new Error("image is not valid: " + data.image));
        _this2.image = null;
      };
      preload.src = this.image;
    }

    this.actions = [];
    if (data.actions) {
      if (!Array.isArray(data.actions)) {
        console.error(new Error("actions must be array but got " + _typeof(data.actions)));
      } else {
        this.actions = data.actions;
      }
    }
  }

  createClass(Step, [{
    key: "attach",
    value: function attach(root) {
      umbrella_min(root).append(this.el);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.hide();
      this.el.remove();
    }
  }, {
    key: "position",
    value: function position() {
      var view = getViewportRect(this.context._options.root);

      if (isTargetValid(this.target)) {
        var highlight = this.highlight;
        var tooltip = this.tooltip;
        var arrow = this.arrow;

        var highlightStyle = {};
        var tootipStyle = {};
        var arrowStyle = {};

        var targetRect = getBoundingClientRect(this.target, this.context._options.root);
        var tooltipRect = getBoundingClientRect(tooltip, this.context._options.root);

        highlightStyle.top = targetRect.top - this.context.options.padding;
        highlightStyle.left = targetRect.left - this.context.options.padding;
        highlightStyle.width = targetRect.width + this.context.options.padding * 2;
        highlightStyle.height = targetRect.height + this.context.options.padding * 2;

        var marginVerticalSize = parseNumber(getStyle(tooltip, "margin-top")) + parseNumber(getStyle(tooltip, "margin-bottom"));
        var marginHorizontalSize = parseNumber(getStyle(tooltip, "margin-left")) + parseNumber(getStyle(tooltip, "margin-right"));

        var tooltipBRL = 0;
        var tooltipBRR = 0;

        // Compute vertical position
        if (view.height - targetRect.viewBottom > tooltipRect.height + marginVerticalSize || targetRect.viewTop < tooltipRect.height + marginVerticalSize) {
          tootipStyle.top = targetRect.top + targetRect.height;
          tootipStyle.bottom = "unset";
          tooltip.addClass("guided-tour-arrow-top");
          tooltipBRL = parseNumber(getStyle(tooltip, "border-top-left-radius"));
          tooltipBRR = parseNumber(getStyle(tooltip, "border-top-right-radius"));
        } else {
          tootipStyle.bottom = view.rootHeight - targetRect.top;
          tootipStyle.top = "unset";
          tooltip.addClass("guided-tour-arrow-bottom");
          tooltipBRL = parseNumber(getStyle(tooltip, "border-bottom-left-radius"));
          tooltipBRR = parseNumber(getStyle(tooltip, "border-bottom-right-radius"));
        }

        var arrowRect = getBoundingClientRect(arrow, this.context._options.root);

        // Compute horizontal position
        if (view.width - targetRect.left > tooltipRect.width + marginHorizontalSize || targetRect.right < tooltipRect.width + marginHorizontalSize) {
          tootipStyle.left = targetRect.left;
          tootipStyle.right = "unset";
          if (targetRect.width / 2 > tooltipRect.width) arrowStyle.right = 8;else arrowStyle.left = clamp(targetRect.width / 2, tooltipBRL + 2, tooltipRect.width - arrowRect.width - tooltipBRR - 2);
        } else {
          tootipStyle.right = view.rootWidth - targetRect.right;
          tootipStyle.left = "unset";
          if (targetRect.width / 2 > tooltipRect.width) arrowStyle.left = 18;else arrowStyle.right = clamp(targetRect.width / 2, tooltipBRR + 2, tooltipRect.width - arrowRect.width - tooltipBRL - 2);
        }

        setStyle(highlight, highlightStyle);
        setStyle(tooltip, tootipStyle);
        setStyle(arrow, arrowStyle);
        tooltip.first().style.opacity = 0.1;
      } else {
        var _highlight = this.highlight;
        var _tooltip = this.tooltip;

        var _tooltipRect = getBoundingClientRect(_tooltip, this.context._options.root);

        var _highlightStyle = {};
        var _tootipStyle = {};

        _highlightStyle.top = 0;
        _highlightStyle.left = 0;
        _highlightStyle.width = 0;
        _highlightStyle.height = 0;

        _tootipStyle.top = view.height / 2 + view.scrollY - view.rootTop - _tooltipRect.height / 2;
        _tootipStyle.left = view.width / 2 + view.scrollX - view.rootLeft - _tooltipRect.width / 2;
        _tootipStyle.bottom = "unset";
        _tootipStyle.right = "unset";

        _tooltip.addClass("guided-tour-arrow-none");

        setStyle(_highlight, _highlightStyle);
        setStyle(_tooltip, _tootipStyle);
        _highlight.first().style.boxShadow = "none";
        _tooltip.first().style.opacity = 0.1;
        this.context._overlay.show();
      }
    }
  }, {
    key: "adjust",
    value: function adjust() {
      var view = getViewportRect(this.context._options.root);

      var tooltip = this.tooltip;

      var tooltipRect = getBoundingClientRect(tooltip, this.context._options.root);

      var tootipStyle = {};

      if (tooltipRect.viewTop < 8) {
        tootipStyle.top = 8 - tooltipRect.viewTop + tooltipRect.top;
        tootipStyle.bottom = "unset";
      } else if (tooltipRect.viewBottom + 8 > view.height) {
        tootipStyle.top = "unset";
        tootipStyle.bottom = view.rootHeight - (tooltipRect.bottom - (tooltipRect.viewBottom + 8 - view.height));
      }
      if (tooltipRect.viewLeft < 32) {
        tootipStyle.left = 32 - tooltipRect.viewLeft + tooltipRect.left;
        tootipStyle.right = "unset";
      } else if (tooltipRect.viewRight + 32 > view.width) {
        tootipStyle.left = "unset";
        tootipStyle.right = view.rootWidth - (tooltipRect.right - (tooltipRect.viewRight + 32 - view.width));
      }

      setStyle(tooltip, tootipStyle);
      tooltip.first().style.opacity = 1;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this._timerHandler) clearTimeout(this._timerHandler);
      if (this._scrollCancel) this._scrollCancel();
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;

      this.cancel();
      if (!this.active) {
        var show = function show() {
          _this3.el.addClass("active"); // Add 'active' first to calculate the tooltip real size on the DOM.
          _this3.context._overlay.hide();
          _this3.position();
          _this3.adjust();
          if (isTargetValid(_this3.target)) {
            if (getStyle(_this3.target, "position") === "static") {
              _this3.target.style.position = "relative";
            }
            umbrella_min(_this3.target).addClass("guided-tour-target");
          }

          _this3.actions.forEach(function (a) {
            try {
              var eventType = getEventType(a.event);
              if (eventType) {
                var eventHandler = function eventHandler(e) {
                  if (a) {
                    var eventAttrs = getEventAttrs(a.event);
                    var isMatched = !eventAttrs.filter(function (attr) {
                      return e[attr.key] !== attr.value;
                    }).length;

                    if (isMatched) _this3.context.action(e, a);
                  }
                };
                a.handler = eventHandler;
                a.target = a.target || _this3.target;
                umbrella_min(a.target).on(eventType, a.handler);
              } else {
                console.warn("Wrong event on action.event: " + a.event + " on step #" + _this3.index);
              }
            } catch (error) {
              console.warn("Could not find action.target: " + a.target + " on step #" + _this3.index);
              console.warn(error);
            }
          });

          _this3.active = true;
        };
        if (isTargetValid(this.target)) {
          this._scrollCancel = scrollIntoView(this.target, {
            time: this.context.options.animationspeed,
            cancellable: false,
            align: {
              top: getPosition(this.context.options.align),
              left: 0.5
            }
          }, show);
        } else this._timerHandler = setTimeout(show, this.context.options.animationspeed);
        return true;
      }
      return false;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.cancel();
      if (this.active) {
        if (isTargetValid(this.target)) {
          umbrella_min(this.target).removeClass("guided-tour-target");
        }
        this.el.removeClass("active");
        this.tooltip.removeClass("guided-tour-arrow-top");
        this.tooltip.removeClass("guided-tour-arrow-bottom");
        this.context._overlay.show();

        this.actions.forEach(function (a) {
          try {
            var eventType = getEventType(a.event);
            if (eventType) {
              umbrella_min(a.target).off(eventType, a.handler);
            }
          } catch (error) {
            console.warn(error);
          }
        });

        this.active = false;
        return true;
      }
      return false;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var index = this.index,
          title = this.title,
          content = this.content,
          image = this.image,
          active = this.active;

      return { index: index, title: title, content: content, image: image, active: active };
    }
  }]);
  return Step;
}();

var Overlay = function () {
  createClass(Overlay, [{
    key: "el",
    get: function get$$1() {
      if (!this.container) {
        this.container = umbrella_min("<div role=\"dialog\" class=\"guided-tour-overlay\"></div>");
      }
      return this.container;
    }
  }]);

  function Overlay(context) {
    classCallCheck(this, Overlay);

    this.context = context;
    this.container = null;
    this.active = false;
  }

  createClass(Overlay, [{
    key: "attach",
    value: function attach(root) {
      umbrella_min(root).append(this.el);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.hide();
      this.el.remove();
    }
  }, {
    key: "show",
    value: function show() {
      if (!this.active) {
        this.el.addClass("active");
        this.active = true;
        return true;
      }
      return false;
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.active) {
        this.el.removeClass("active");
        this.active = false;
        return true;
      }
      return false;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var active = this.active;

      return { active: active };
    }
  }]);
  return Overlay;
}();

var StepsSource = {
  DOM: 0,
  JSON: 1,
  REMOTE: 2
};

function isEventAttrbutesMatched(event, keyOption) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "keyup";

  if ((typeof event === "undefined" ? "undefined" : _typeof(event)) === "object") {
    var eventAttrsMap = { type: type };
    if (typeof keyOption === "number") {
      eventAttrsMap.keyCode = keyOption;
    } else if (typeof keyOption === "string") {
      eventAttrsMap.key = keyOption;
    } else if ((typeof keyOption === "undefined" ? "undefined" : _typeof(keyOption)) === "object") {
      eventAttrsMap = _extends({}, keyOption, { type: type });
    } else {
      throw new Error("keyboardNavigation option invalid. should be predefined object or false. Check documentation.");
    }

    var eventAttrs = Object.entries(eventAttrsMap).map(function (_ref) {
      var _ref2 = slicedToArray(_ref, 2),
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

var Tour = function () {
  createClass(Tour, [{
    key: "currentstep",
    get: function get$$1() {
      return this._steps[this._current];
    }
  }, {
    key: "length",
    get: function get$$1() {
      return this._steps.length;
    }
  }, {
    key: "steps",
    get: function get$$1() {
      return this._steps.map(function (step) {
        return step.toJSON();
      });
    }
  }, {
    key: "hasnext",
    get: function get$$1() {
      return this.nextstep !== this._current;
    }
  }, {
    key: "nextstep",
    get: function get$$1() {
      return clamp(this._current + 1, 0, this.length - 1);
    }
  }, {
    key: "previousstep",
    get: function get$$1() {
      return clamp(this._current - 1, 0);
    }
  }, {
    key: "options",
    get: function get$$1() {
      return this._options;
    }
  }]);

  function Tour() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Tour);

    var defaultKeyNavOptions = {
      next: "ArrowRight",
      prev: "ArrowLeft",
      first: "Home",
      last: "End",
      complete: null,
      stop: "Escape"
    };

    var defaultColors = {
      overlay: "rgba(0, 0, 0, 0.5)",
      background: "#fff",
      bullet: "#ff4141",
      bulletVisited: "#aaa",
      bulletCurrent: "#b50000",
      stepButtonPrev: "#ff4141",
      stepButtonNext: "#ff4141",
      stepButtonComplete: "#b50000"
    };

    this._options = Object.assign({
      root: "body",
      selector: "[data-tour]",
      animationspeed: 300,
      padding: 5,
      steps: null,
      src: null,
      restoreinitialposition: true,
      preloadimages: false,
      request: {
        "options": {
          "mode": "cors",
          "cache": "no-cache"
        },
        "headers": {
          "Content-Type": "application/json"
        }
      },
      align: "top", // top, bottom, center
      keyboardNavigation: defaultKeyNavOptions,
      onStart: function onStart() {},
      onStop: function onStop() {},
      onComplete: function onComplete() {},
      onStep: function onStep() {},
      onAction: function onAction() {}
    }, options, {
      colors: Object.assign(defaultColors, options.colors || {})
    });
    this._overlay = null;
    this._steps = [];
    this._current = 0;
    this._active = false;
    this._stepsSrc = StepsSource.DOM;
    this._ready = false;
    this._initialposition = null;
    this._injectIcons();
    if (_typeof(this._options.steps) === "object" && Array.isArray(this._options.steps)) {
      this._stepsSrc = StepsSource.JSON;
      this._steps = this._options.steps.map(function (o) {
        return new Step(o, _this);
      });
      this._ready = true;
    } else if (typeof this._options.src === "string") {
      this._stepsSrc = StepsSource.REMOTE;
      fetch(new Request(this._options.src, this._options.request)).then(function (response) {
        return response.json().then(function (data) {
          _this._steps = data.map(function (o) {
            return new Step(o, _this);
          });
          _this._ready = true;
        });
      });
    } else if (umbrella_min(this._options.selector).length > 0) {
      this._stepsSrc = StepsSource.DOM;
      this._ready = true;
    } else {
      throw new Error("Tour is not configured properly. Check documentation.");
    }

    this.start = this.start.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.go = this.go.bind(this);
    this.stop = this.stop.bind(this);
    this.complete = this.complete.bind(this);
    this.action = this.action.bind(this);
    this._keyboardHandler = this._keyboardHandler.bind(this);
  }

  createClass(Tour, [{
    key: "_injectIcons",
    value: function _injectIcons() {
      if (umbrella_min("#GuidedTourIconSet").length === 0) {
        umbrella_min("body").append(umbrella_min(Icons));
      }
    }
  }, {
    key: "_injectStyles",
    value: function _injectStyles() {
      // inject colors
      this._removeStyles();
      // eslint-disable-next-line no-console
      console.log(this._options.colors);
      var colors = umbrella_min("<style id=\"tourguide-color-schema\">" + colorObjToStyleVarString(this._options.colors, "--tourguide") + "</style>");
      umbrella_min(":root > head").append(colors);
    }
  }, {
    key: "_removeStyles",
    value: function _removeStyles() {
      var colorStyleTags = umbrella_min("style#tourguide-color-schema");
      if (colorStyleTags.length > 0) {
        colorStyleTags.remove();
      }
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
    key: "init",
    value: function init() {
      var _this2 = this;

      this.reset();
      umbrella_min(this._options.root).addClass("guided-tour");
      this._overlay = new Overlay(this);
      if (this._stepsSrc === StepsSource.DOM) {
        var steps = umbrella_min(this._options.selector).nodes;
        this._steps = steps.map(function (el) {
          return new Step(el, _this2);
        });
      }
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
    }
  }, {
    key: "start",
    value: function start() {
      var _this3 = this;

      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this._ready) {
        this._injectStyles();
        if (this._options.restoreinitialposition) {
          this._initialposition = getScrollCoordinates(this._options.root);
        }
        if (!this._active) {
          umbrella_min(this._options.root).addClass("guided-tour");
          this.init();
          this._overlay.attach(this._options.root);
          this._steps.forEach(function (step) {
            return step.attach(_this3._options.root);
          });
          this._current = step;
          this.currentstep.show();
          this._active = true;
          this._options.onStart(this._options);

          if (this._options.keyboardNavigation) {
            if (Object.prototype.toString.call(this._options.keyboardNavigation) !== "[object Object]") throw new Error("keyboardNavigation option invalid. should be predefined object or false. Check documentation.");

            umbrella_min(":root").on("keyup", this._keyboardHandler);
          }
        } else {
          this.go(step, "start");
        }
      } else {
        setTimeout(function () {
          _this3.start(step);
        }, 50);
      }
    }
  }, {
    key: "action",
    value: function action(event, _action) {
      if (this._active) {
        var currentstep = this.currentstep;

        if (typeof _action.act === "function") {
          _action.act(event, currentstep.toJSON(), this, _action);
        } else if (typeof _action.act === "number") {
          this.go(_action.act, "action");
        } else if (_action.act === "next") {
          this.next();
        } else if (_action.act === "previous") {
          this.previous();
        } else if (_action.act === "stop") {
          this.stop();
        } else if (_action.act === "complete") {
          this.complete();
        }

        if (this._options.onAction && typeof this._options.onAction === "function") {
          this._options.onAction(event, currentstep.toJSON(), _action);
        }
      }
    }
  }, {
    key: "next",
    value: function next() {
      if (this._active) {
        this.go(this.nextstep, "next");
      }
    }
  }, {
    key: "previous",
    value: function previous() {
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
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this._removeStyles();
      if (this._active) {
        this.currentstep.hide();
        this._active = false;
        this._overlay.remove();
        this._steps.forEach(function (step) {
          return step.remove();
        });
        umbrella_min(this._options.root).removeClass("guided-tour");
        if (this._options.keyboardNavigation) {
          umbrella_min(":root").off("keyup", this._keyboardHandler);
        }
        if (this._options.restoreinitialposition && this._initialposition) {
          animateScroll(this._initialposition, this._options.animationspeed);
        }
        this._options.onStop(this._options);
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
  }]);
  return Tour;
}();

export default Tour;
