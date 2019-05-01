function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var umbrella_min = createCommonjsModule(function (module) {
/* Umbrella JS 3.1.0 umbrellajs.com */

var u=function(t,e){return this instanceof u?t instanceof u?t:("string"==typeof t&&(t=this.select(t,e)),t&&t.nodeName&&(t=[t]),void(this.nodes=this.slice(t))):new u(t,e)};u.prototype={get length(){return this.nodes.length}},u.prototype.nodes=[],u.prototype.addClass=function(){return this.eacharg(arguments,function(t,e){t.classList.add(e);})},u.prototype.adjacent=function(i,t,n){return "number"==typeof t&&(t=0===t?[]:new Array(t).join().split(",").map(Number.call,Number)),this.each(function(r,o){var e=document.createDocumentFragment();u(t||{}).map(function(t,e){var n="function"==typeof i?i.call(this,t,e,r,o):i;return "string"==typeof n?this.generate(n):u(n)}).each(function(t){this.isInPage(t)?e.appendChild(u(t).clone().first()):e.appendChild(t);}),n.call(this,r,e);})},u.prototype.after=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t.nextSibling);})},u.prototype.append=function(t,e){return this.adjacent(t,e,function(t,e){t.appendChild(e);})},u.prototype.args=function(t,e,n){return "function"==typeof t&&(t=t(e,n)),"string"!=typeof t&&(t=this.slice(t).map(this.str(e,n))),t.toString().split(/[\s,]+/).filter(function(t){return t.length})},u.prototype.array=function(o){o=o;var i=this;return this.nodes.reduce(function(t,e,n){var r;return o?((r=o.call(i,e,n))||(r=!1),"string"==typeof r&&(r=u(r)),r instanceof u&&(r=r.nodes)):r=e.innerHTML,t.concat(!1!==r?r:[])},[])},u.prototype.attr=function(t,e,r){return r=r?"data-":"",this.pairs(t,e,function(t,e){return t.getAttribute(r+e)},function(t,e,n){t.setAttribute(r+e,n);})},u.prototype.before=function(t,e){return this.adjacent(t,e,function(t,e){t.parentNode.insertBefore(e,t);})},u.prototype.children=function(t){return this.map(function(t){return this.slice(t.children)}).filter(t)},u.prototype.clone=function(){return this.map(function(t,e){var n=t.cloneNode(!0),r=this.getAll(n);return this.getAll(t).each(function(t,e){for(var n in this.mirror)this.mirror[n]&&this.mirror[n](t,r.nodes[e]);}),n})},u.prototype.getAll=function(t){return u([t].concat(u("*",t).nodes))},u.prototype.mirror={},u.prototype.mirror.events=function(t,e){if(t._e)for(var n in t._e)t._e[n].forEach(function(t){u(e).on(n,t);});},u.prototype.mirror.select=function(t,e){u(t).is("select")&&(e.value=t.value);},u.prototype.mirror.textarea=function(t,e){u(t).is("textarea")&&(e.value=t.value);},u.prototype.closest=function(e){return this.map(function(t){do{if(u(t).is(e))return t}while((t=t.parentNode)&&t!==document)})},u.prototype.data=function(t,e){return this.attr(t,e,!0)},u.prototype.each=function(t){return this.nodes.forEach(t.bind(this)),this},u.prototype.eacharg=function(n,r){return this.each(function(e,t){this.args(n,e,t).forEach(function(t){r.call(this,e,t);},this);})},u.prototype.empty=function(){return this.each(function(t){for(;t.firstChild;)t.removeChild(t.firstChild);})},u.prototype.filter=function(e){var t=function(t){return t.matches=t.matches||t.msMatchesSelector||t.webkitMatchesSelector,t.matches(e||"*")};return "function"==typeof e&&(t=e),e instanceof u&&(t=function(t){return -1!==e.nodes.indexOf(t)}),u(this.nodes.filter(t))},u.prototype.find=function(e){return this.map(function(t){return u(e||"*",t)})},u.prototype.first=function(){return this.nodes[0]||!1},u.prototype.generate=function(t){return /^\s*<tr[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().nodes:/^\s*<t(h|d)[> ]/.test(t)?u(document.createElement("table")).html(t).children().children().children().nodes:/^\s*</.test(t)?u(document.createElement("div")).html(t).children().nodes:document.createTextNode(t)},u.prototype.handle=function(){var t=this.slice(arguments).map(function(e){return "function"==typeof e?function(t){t.preventDefault(),e.apply(this,arguments);}:e},this);return this.on.apply(this,t)},u.prototype.hasClass=function(){return this.is("."+this.args(arguments).join("."))},u.prototype.html=function(e){return void 0===e?this.first().innerHTML||"":this.each(function(t){t.innerHTML=e;})},u.prototype.is=function(t){return 0<this.filter(t).length},u.prototype.isInPage=function(t){return t!==document.body&&document.body.contains(t)},u.prototype.last=function(){return this.nodes[this.length-1]||!1},u.prototype.map=function(t){return t?u(this.array(t)).unique():this},u.prototype.not=function(e){return this.filter(function(t){return !u(t).is(e||!0)})},u.prototype.off=function(t){return this.eacharg(t,function(e,n){u(e._e?e._e[n]:[]).each(function(t){e.removeEventListener(n,t);});})},u.prototype.on=function(t,e,r){if("string"==typeof e){var o=e;e=function(e){var n=arguments;u(e.currentTarget).find(o).each(function(t){if(t===e.target||t.contains(e.target)){try{Object.defineProperty(e,"currentTarget",{get:function(){return t}});}catch(t){}r.apply(t,n);}});};}var n=function(t){return e.apply(this,[t].concat(t.detail||[]))};return this.eacharg(t,function(t,e){t.addEventListener(e,n),t._e=t._e||{},t._e[e]=t._e[e]||[],t._e[e].push(n);})},u.prototype.pairs=function(n,t,e,r){if(void 0!==t){var o=n;(n={})[o]=t;}return "object"==typeof n?this.each(function(t){for(var e in n)r(t,e,n[e]);}):this.length?e(this.first(),n):""},u.prototype.param=function(e){return Object.keys(e).map(function(t){return this.uri(t)+"="+this.uri(e[t])}.bind(this)).join("&")},u.prototype.parent=function(t){return this.map(function(t){return t.parentNode}).filter(t)},u.prototype.prepend=function(t,e){return this.adjacent(t,e,function(t,e){t.insertBefore(e,t.firstChild);})},u.prototype.remove=function(){return this.each(function(t){t.parentNode&&t.parentNode.removeChild(t);})},u.prototype.removeClass=function(){return this.eacharg(arguments,function(t,e){t.classList.remove(e);})},u.prototype.replace=function(t,e){var n=[];return this.adjacent(t,e,function(t,e){n=n.concat(this.slice(e.children)),t.parentNode.replaceChild(e,t);}),u(n)},u.prototype.scroll=function(){return this.first().scrollIntoView({behavior:"smooth"}),this},u.prototype.select=function(t,e){return t=t.replace(/^\s*/,"").replace(/\s*$/,""),/^</.test(t)?u().generate(t):(e||document).querySelectorAll(t)},u.prototype.serialize=function(){var r=this;return this.slice(this.first().elements).reduce(function(e,n){return !n.name||n.disabled||"file"===n.type?e:/(checkbox|radio)/.test(n.type)&&!n.checked?e:"select-multiple"===n.type?(u(n.options).each(function(t){t.selected&&(e+="&"+r.uri(n.name)+"="+r.uri(t.value));}),e):e+"&"+r.uri(n.name)+"="+r.uri(n.value)},"").slice(1)},u.prototype.siblings=function(t){return this.parent().children(t).not(this)},u.prototype.size=function(){return this.first().getBoundingClientRect()},u.prototype.slice=function(t){return t&&0!==t.length&&"string"!=typeof t&&"[object Function]"!==t.toString()?t.length?[].slice.call(t.nodes||t):[t]:[]},u.prototype.str=function(e,n){return function(t){return "function"==typeof t?t.call(this,e,n):t.toString()}},u.prototype.text=function(e){return void 0===e?this.first().textContent||"":this.each(function(t){t.textContent=e;})},u.prototype.toggleClass=function(t,e){return !!e===e?this[e?"addClass":"removeClass"](t):this.eacharg(t,function(t,e){t.classList.toggle(e);})},u.prototype.trigger=function(t){var o=this.slice(arguments).slice(1);return this.eacharg(t,function(t,e){var n,r={bubbles:!0,cancelable:!0,detail:o};try{n=new window.CustomEvent(e,r);}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,o);}t.dispatchEvent(n);})},u.prototype.unique=function(){return u(this.nodes.reduce(function(t,e){return null!=e&&!1!==e&&-1===t.indexOf(e)?t.concat(e):t},[]))},u.prototype.uri=function(t){return encodeURIComponent(t).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},u.prototype.wrap=function(t){return this.map(function(e){return u(t).each(function(t){(function(t){for(;t.firstElementChild;)t=t.firstElementChild;return u(t)})(t).append(e.cloneNode(!0)),e.parentNode.replaceChild(t,e);})})},module.exports&&(module.exports=u,module.exports.u=u);
});
var umbrella_min_1 = umbrella_min.u;

const Icons = `<svg id="GuidedTourIconSet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<symbol id="tour-icon-close" viewBox="0 0 20 20"><path d="M16,16 L4,4" fill="none" stroke="currentColor" stroke-width="1"></path><path d="M16,4 L4,16" fill="none" stroke="currentColor" stroke-width="1"></path></symbol>
<symbol id="tour-icon-next" viewBox="0 0 20 20"><polyline points="7 4 13 10 7 16" fill="none" stroke="currentColor" stroke-width="1"></polyline></symbol>
<symbol id="tour-icon-complete" viewBox="0 0 20 20"><polyline points="4,10 8,15 17,4" fill="none" stroke="currentColor" stroke-width="1"></polyline></symbol>
</svg>`;

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

function getTargetScrollLocation(target, parent, align){
    var targetPosition = target.getBoundingClientRect(),
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

    if(parent.self === parent){
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
        x = Math.max(Math.min(x, parent.scrollWidth - parent.clientWidth), 0);
        y = Math.max(Math.min(y, parent.scrollHeight - parent.clientHeight), 0);
        x -= leftOffset;
        y -= topOffset;
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

    var location = getTargetScrollLocation(scrollSettings.target, parent, scrollSettings.align),
        time = Date.now() - scrollSettings.startTime,
        timeValue = Math.min(1 / scrollSettings.time * time, 1);

    if(
        time > scrollSettings.time &&
        scrollSettings.endIterations > 3
    ){
        setElementScroll(parent, location.x, location.y);
        parent._scrollSettings = null;
        return scrollSettings.end(COMPLETE);
    }

    scrollSettings.endIterations++;

    var easeValue = 1 - scrollSettings.ease(timeValue);

    setElementScroll(parent,
        location.x - location.differenceX * easeValue,
        location.y - location.differenceY * easeValue
    );

    // At the end of animation, loop synchronously
    // to try and hit the taget location.
    if(time >= scrollSettings.time){
        return animate(parent);
    }

    raf(animate.bind(null, parent));
}
function transitionScrollTo(target, parent, settings, callback){
    var idle = !parent._scrollSettings,
        lastSettings = parent._scrollSettings,
        now = Date.now(),
        endHandler;

    if(lastSettings){
        lastSettings.end(CANCELED);
    }

    function end(endType){
        parent._scrollSettings = null;
        if(parent.parentElement && parent.parentElement._scrollSettings){
            parent.parentElement._scrollSettings.end(endType);
        }
        callback(endType);
        parent.removeEventListener('touchstart', endHandler, { passive: true });
        parent.removeEventListener('wheel', endHandler, { passive: true });
    }

    parent._scrollSettings = {
        startTime: lastSettings ? lastSettings.startTime : Date.now(),
        endIterations: 0,
        target: target,
        time: settings.time + (lastSettings ? now - lastSettings.startTime : 0),
        ease: settings.ease,
        align: settings.align,
        end: end
    };

    endHandler = end.bind(null, CANCELED);
    parent.addEventListener('touchstart', endHandler, { passive: true });
    parent.addEventListener('wheel', endHandler, { passive: true });

    if(idle){
        animate(parent);
    }
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

    var parent = target.parentElement,
        parents = 0;

    function done(endType){
        parents--;
        if(!parents){
            callback && callback(endType);
        }
    }

    var validTarget = settings.validTarget || defaultValidTarget;
    var isScrollable = settings.isScrollable;

    while(parent){
        if(validTarget(parent, parents) && (isScrollable ? isScrollable(parent, defaultIsScrollable) : defaultIsScrollable(parent))){
            parents++;
            transitionScrollTo(target, parent, settings, done);
        }

        parent = parent.parentElement;

        if(!parent){
            return;
        }

        if(parent.tagName === 'BODY'){
            parent = parent.ownerDocument;
            parent = parent.defaultView || parent.ownerWindow;
        }
    }
};

function clamp(number, min, max) {
  min = isNaN(min) ? number : min;
  max = isNaN(max) ? number : max;
  return Math.max(min, Math.min(number, max));
}

function getDataContents(data = "", defaults = {}) {
  const parts = data.split(";");
  let result = { ...defaults };
  parts.forEach(part => {
    const entries = (part || "").split(":");
    result[(entries[0] || "").trim()] = (entries[1] || "").trim();
  });
  return result;
}

function getBoundingClientRect(el) {
  const rect = umbrella_min(el).size();
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

function getViewportRect() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    bodyWidth: document.body.clientWidth,
    bodyHeight: document.body.clientHeight
  };
}

// data-step="title: Step1; content: .../<>"
class Step {
  get el() {
    if (!this.container) {
      const image = umbrella_min(`<div role="figure" class="guided-tour-step-image">${this.image ? `<img src="${this.image}" />` : ""}</div>`);
      const title = umbrella_min(`<div role="heading" class="guided-tour-step-title">${this.title}</div>`);
      const content = umbrella_min(`<div class="guided-tour-step-content">${this.content}</div>`);
      const footer = umbrella_min(`<div class="guided-tour-step-footer">
                <span role="button" class="guided-tour-step-button guided-tour-step-button-close" title="End tour">
                    <svg class="guided-tour-icon" viewBox="0 0 20 20" width="16" height="16"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tour-icon-close"></use></svg>
                </span>
                ${this.last ? `<span role="button" class="guided-tour-step-button guided-tour-step-button-complete" title="Complete tour">
                        <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tour-icon-complete"></use></svg>
                    </span>`:
    `<span role="button" class="guided-tour-step-button guided-tour-step-button-next" title="Next step">
                        <svg class="guided-tour-icon" viewBox="0 0 20 20" width="32" height="32"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tour-icon-next"></use></svg>
                    </span>`}
                ${this.context._steps.length > 1 ? `<div class="guided-tour-step-footer-bullets">
                    <ul>${this.context._steps.map((step, i) => `<li  title="Go to step ${i + 1}" data-index="${i}" class="${step.index < this.index ? "complete" : step.index == this.index ? "current" : ""}"></li>`).join("")}</ul>
                </div>` : ""}
            </div>`);
      footer.find(".guided-tour-step-button-next").on("click", this.context.next);
      footer.find(".guided-tour-step-button-close").on("click", this.context.stop);
      footer.find(".guided-tour-step-button-complete").on("click", this.context.complete);
      footer.find(".guided-tour-step-footer-bullets li").on("click", (e) => this.context.go(parseInt(umbrella_min(e.target).data("index"))));
      const highlight = this.highlight = umbrella_min("<div class=\"guided-tour-step-highlight\"></div>");
      highlight.on("click", this.context.action);
      const tooltip = this.tooltip = umbrella_min("<div role=\"tooltip\" class=\"guided-tour-step-tooltip\"></div>");
      const arrow = this.arrow = umbrella_min("<div aria-hidden=\"true\" class=\"guided-tour-arrow\"></div>");
      tooltip.append(arrow).append(image).append(title).append(content).append(footer);
      this.container = umbrella_min(`<div role="dialog" class="guided-tour-step${this.first ? " guided-tour-step-first" : ""}${this.last ? " guided-tour-step-last" : ""}"></div>`);
      this.container.append(highlight).append(tooltip);
    }
    return this.container;
  }
  get target() {
    return this._target || umbrella_min(this.selector).first();
  }
  set target(target) {
    this._target = target;
  }
  constructor(step, context) {
    this.index = 0;
    this.first = false;
    this.last = false;
    this.target = null;
    this.container = null;
    this.highlight = null;
    this.tooltip = null;
    this.arrow = null;
    this.rect = {};
    this.image = null;
    this.title = "";
    this.content = "";
    this.active = false;
    this.context = null;
    this._target = null;
    this.context = context;
    if (step.hasOwnProperty("title")) {
      this.selector = step.selector;
      this.index = step.step || 0;
      this.title = step.title;
      this.content = step.content || "";
      this.image = step.image;
    } else {
      this.target = step;
      const data = getDataContents(umbrella_min(step).data("tour"));
      this.index = parseInt(data.step);
      this.title = data.title;
      this.content = data.content;
      this.image = data.image;
    }
  }
  attach(root = "body") {
    umbrella_min(root).append(this.el);
  }
  remove() {
    this.hide();
    this.el.remove();
  }
  position() {
    // {"left":0,"right":400,"top":0,"height":300,"bottom":300,"width":400}
    if (this.target) {
      const rect = getBoundingClientRect(this.target);
      const view = getViewportRect();
      let style = this.highlight.first().style;
      style.top = `${rect.top - this.context.options.padding}px`;
      style.left = `${rect.left - this.context.options.padding}px`;
      style.width = `${rect.width + this.context.options.padding * 2}px`;
      style.height = `${rect.height + this.context.options.padding * 2}px`;
      const tooltip = this.tooltip;
      const arrow = this.arrow;
      style = tooltip.first().style;
      style.opacity = 0.1;
      // Compute vertical position
      if (view.height / 2 > rect.top) {
        tooltip.addClass("guided-tour-arrow-top");
        style.top = `${rect.top + rect.height}px`;
      } else {
        tooltip.addClass("guided-tour-arrow-bottom");
        style.bottom = `${view.height - rect.top}px`;
      }
      // Compute horizontal position
      if (view.width / 2 > rect.left) {
        style.left = `${rect.left}px`;
        arrow.first().style.left = (rect.width > 400) ? "18px" : `${clamp(rect.width / 2, 14, 386)}px`;
      } else {
        style.right = `${Math.max(view.width - rect.right, 40)}px`;
        arrow.first().style.right = (view.width - rect.right) < 40 ||
                    (rect.width > 400) ? "8px" : `${clamp(rect.width / 2 - 8, 14, 386)}px`;
      }
    } else {
      const view = getViewportRect();
      let style = this.highlight.first().style;
      style.top = `${0}px`;
      style.left = `${0}px`;
      style.width = `${0}px`;
      style.height = `${0}px`;
      const tooltip = this.tooltip;
      style = tooltip.first().style;
      style.opacity = 0.1;
      style.top = `${view.height / 2}px`;
      style.left = `${view.width / 2}px`;
      tooltip.addClass("guided-tour-arrow-none");
      tooltip.addClass("guided-tour-center");
    }
  }
  adjust() {
    const rect = getBoundingClientRect(this.tooltip);
    const view = getViewportRect();
    let style = this.tooltip.first().style;
    if (rect.top < 0) {
      style.top = "8px";
    }
    if (rect.top > view.height - rect.height) {
      style.top = `${view.height - rect.height - 40}px`;
    }
    if (rect.left < 0) {
      style.left = "8px";
    }
    if (rect.right < 40) {
      style.right = "40px";
    }
    style.opacity = 1;
  }
  show() {
    const show = () => {
      this.position();
      this.el.addClass("active");
      this.adjust();
    };
    if (this.target) {
      scrollIntoView(this.target, {
        time: this.context.options.animationspeed
      }, show);
    } else setTimeout(show, this.context.options.animationspeed);
  }
  hide() {
    this.el.removeClass("active");
    this.tooltip.removeClass("guided-tour-arrow-top");
  }
  toJSON() {
    // eslint-disable-next-line no-undef
    return { index, title, contnet, image, active } = this;
  }
}

___$insertStyle(".guided-tour{overflow:hidden}.guided-tour-step{display:none;text-rendering:optimizespeed;font-family:\"Open Sans\",Arimo,\"Droid Sans\",Helvetica,Arial,sans-serif;font-size:12pt;color:#333}.guided-tour-step.active{display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1024;pointer-events:all}.guided-tour-step.active .guided-tour-step-highlight{position:absolute;box-sizing:border-box;border-radius:4px;box-shadow:0 0 0 999em rgba(0,0,0,.5);z-index:1}.guided-tour-step.active .guided-tour-step-tooltip{position:absolute;padding:32px 32px 28px 32px;margin:16px 0;z-index:2;background-color:#fff;max-width:400px;border-radius:5px;box-sizing:border-box;box-shadow:0 0 8px -4px #000;transition:opacity 150ms}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-arrow{position:absolute;border-top:8px solid transparent;border-left:8px solid transparent;border-right:8px solid transparent;border-bottom:8px solid transparent;margin-left:-8px;margin-top:-8px}.guided-tour-step.active .guided-tour-step-tooltip.guided-tour-arrow-none .guided-tour-arrow{display:none}.guided-tour-step.active .guided-tour-step-tooltip.guided-tour-arrow-top .guided-tour-arrow{border-bottom-color:#fff;margin-top:-16px;top:0}.guided-tour-step.active .guided-tour-step-tooltip.guided-tour-arrow-bottom .guided-tour-arrow{border-top-color:#fff;margin-bottom:-16px;bottom:0}.guided-tour-step.active .guided-tour-step-tooltip.guided-tour-center{transform:translate(-50%, -50%)}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-image img{width:100%;height:auto;border-radius:4px;margin-bottom:28px}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-title{font-weight:bold;margin-bottom:1em}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-icon{display:inline-block;overflow:hidden}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-button{flex-direction:column;justify-content:center;display:inline-flex;text-align:center;cursor:pointer}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-button .guided-tour-icon{align-self:center}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-button-next,.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-button-complete{border:2px solid currentColor;box-shadow:5px 0 1em 0 rgba(0,0,0,.4);width:48px;height:48px;background:#fff;border-radius:50%;position:absolute;margin-top:-24px;right:-30px;top:50%}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-button-next{color:#ff4141}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-button-complete{color:#b50000}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-button-close{position:absolute;top:0;right:0;width:32px;height:32px}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-footer-bullets{text-align:center;line-height:16px}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-footer-bullets ul{margin:10px 0 -18px 0;list-style:none;padding:0}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-footer-bullets ul li{width:8px;height:8px;border-radius:50%;padding:0;display:inline-block;background-color:#ff4141;border:8px solid #fff;cursor:pointer}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-footer-bullets ul li.complete{background-color:#aaa}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-footer-bullets ul li.current{background-color:#b50000}.guided-tour-step.active .guided-tour-step-tooltip .guided-tour-step-footer-bullets ul li:last-of-type{margin-right:0}");

const StepsSource = {
  DOM: 0,
  JSON: 1,
  REMOTE: 2
};

class Tour {
  get currentstep() {
    return this._steps[this._current];
  }
  get length() {
    return this._steps.length;
  }
  get steps() {
    return this._steps.map(step => step.toJSON());
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
  constructor(options = {}) {
    this._options =
      Object.assign({
        root: "body",
        selector: "[data-tour]",
        animationspeed: 300,
        padding: 5,
        steps: null,
        src: null,
        request: {
          "options": {
            "mode": "cors",
            "cache": "no-cache"
          },
          "headers": {
            "Content-Type": "application/json"
          }
        },
        onStart: () => { },
        onStop: () => { },
        onComplete: () => { },
        onStep: () => { },
        onAction: () => { }
      }, options);
    this._steps = [];
    this._current = 0;
    this._active = false;
    this._stepsSrc = StepsSource.DOM;
    this._ready = false;
    this.start = this.start.bind(this);
    this.action = this.action.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.go = this.go.bind(this);
    this.stop = this.stop.bind(this);
    this.complete = this.complete.bind(this);
    this._injectIcons();
    if (typeof this._options.steps === "object" && Array.isArray(this._options.steps)) {
      this._stepsSrc = StepsSource.JSON;
      this._steps = this._options.steps.map(o => new Step(
        o,
        this
      ));
      this._ready = true;
    } else if (typeof this._options.stc === "string" && this._options.src.indexOf("http") === 0) {
      this._stepsSrc = StepsSource.REMOTE;
      fetch(new Request(this._options.src, this._options.request))
        .then(response => response.json().then(data => {
          data.map(o => new Step(
            o,
            this
          ));
          this._ready = true;
        }));
    } else if (umbrella_min(this._options.selector).length > 0) {
      this._ready = true;
    } else {
      throw new Error("Tour is not configured properly. Check documentation.");
    }
  }
  _injectIcons() {
    if (umbrella_min("#GuidedTourIconSet").length === 0) {
      umbrella_min("body").append(umbrella_min(Icons));
    }
  }
  init() {
    this.reset();
    if (this._stepsSrc === StepsSource.DOM) {
      const steps = umbrella_min(this._options.selector).nodes;
      this._steps = steps.map(el => new Step(
        el,
        this
      ));
    }
    this._steps = this._steps.sort((a, b) => a.index - b.index);
    this._steps[0].first = true;
    this._steps[this.length - 1].last = true;
  }
  reset() {
    if (this._active) this.stop();
    if (this._stepsSrc === StepsSource.DOM) {
      this._steps = [];
    }
    this._current = 0;
  }
  start(step = 0) {
    if (this._ready) {
      if (!this._active) {
        umbrella_min(this._options.root).addClass("guided-tour");
        this.init();
        this._steps.forEach(step => step.attach(this._options.root));
        this._current = step;
        this.currentstep.show();
        this._active = true;
        this._options.onStart(this._options);
      } else {
        this.go(step);
      }
    } else {
      throw new Error("Tour is not configured properly. Check documentation.");
    }
  }
  action(e) {
    if (this._active) {
      const { currentstep } = this;
      if (currentstep.actiontarget) {
        umbrella_min(e.target).find(currentstep.actiontarget).click();
      }
      this._options.onAction(currentstep, e);
    }
  }
  next() {
    if (this._active) {
      this.go(this.nextstep, "next");
    }
  }
  previous() {
    if (this._active) {
      this.go(this.previousstep, "previous");
    }
  }
  go(step, type) {
    if (this._active && this._current !== step) {
      this.currentstep.hide();
      this._current = clamp(step, 0, this.length - 1);
      this.currentstep.show();
      this._options.onStep(this.currentstep, type);
    }
  }
  stop() {
    if (this._active) {
      this.currentstep.hide();
      this._active = false;
      this._steps.forEach(step => step.remove());
      umbrella_min(this._options.root).removeClass("guided-tour");
      this._options.onStop(this._options);
    }
  }
  complete() {
    if (this._active) {
      this.stop();
      this._options.onComplete();
    }
  }
}

export default Tour;
