(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define("uikit", factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, 
    global.UIkit = factory());
})(this, function() {
    "use strict";
    const {
        hasOwnProperty,
        toString
    } = Object.prototype;
    function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
    }
    const hyphenateRe = /\B([A-Z])/g;
    const hyphenate = memoize(str => str.replace(hyphenateRe, "-$1").toLowerCase());
    const camelizeRe = /-(\w)/g;
    const camelize = memoize(str => str.replace(camelizeRe, toUpper));
    const ucfirst = memoize(str => str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : "");
    function toUpper(_, c) {
        return c ? c.toUpperCase() : "";
    }
    function startsWith(str, search) {
        return str == null ? void 0 : str.startsWith == null ? void 0 : str.startsWith(search);
    }
    function endsWith(str, search) {
        return str == null ? void 0 : str.endsWith == null ? void 0 : str.endsWith(search);
    }
    function includes(obj, search) {
        return obj == null ? void 0 : obj.includes == null ? void 0 : obj.includes(search);
    }
    function findIndex(array, predicate) {
        return array == null ? void 0 : array.findIndex == null ? void 0 : array.findIndex(predicate);
    }
    const {
        isArray,
        from: toArray
    } = Array;
    const {
        assign
    } = Object;
    function isFunction(obj) {
        return typeof obj === "function";
    }
    function isObject(obj) {
        return obj !== null && typeof obj === "object";
    }
    function isPlainObject(obj) {
        return toString.call(obj) === "[object Object]";
    }
    function isWindow(obj) {
        return isObject(obj) && obj === obj.window;
    }
    function isDocument(obj) {
        return nodeType(obj) === 9;
    }
    function isNode(obj) {
        return nodeType(obj) >= 1;
    }
    function isElement(obj) {
        return nodeType(obj) === 1;
    }
    function nodeType(obj) {
        return !isWindow(obj) && isObject(obj) && obj.nodeType;
    }
    function isBoolean(value) {
        return typeof value === "boolean";
    }
    function isString(value) {
        return typeof value === "string";
    }
    function isNumber(value) {
        return typeof value === "number";
    }
    function isNumeric(value) {
        return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
    }
    function isEmpty(obj) {
        return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
    }
    function isUndefined(value) {
        return value === void 0;
    }
    function toBoolean(value) {
        return isBoolean(value) ? value : value === "true" || value === "1" || value === "" ? true : value === "false" || value === "0" ? false : value;
    }
    function toNumber(value) {
        const number = Number(value);
        return isNaN(number) ? false : number;
    }
    function toFloat(value) {
        return parseFloat(value) || 0;
    }
    function toNode(element) {
        return toNodes(element)[0];
    }
    function toNodes(element) {
        return element && (isNode(element) ? [ element ] : Array.from(element).filter(isNode)) || [];
    }
    function toWindow(element) {
        var _element;
        if (isWindow(element)) {
            return element;
        }
        element = toNode(element);
        const document = isDocument(element) ? element : (_element = element) == null ? void 0 : _element.ownerDocument;
        return (document == null ? void 0 : document.defaultView) || window;
    }
    function isEqual(value, other) {
        return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, (val, key) => val === other[key]);
    }
    function swap(value, a, b) {
        return value.replace(new RegExp(a + "|" + b, "g"), match => match === a ? b : a);
    }
    function last(array) {
        return array[array.length - 1];
    }
    function each(obj, cb) {
        for (const key in obj) {
            if (false === cb(obj[key], key)) {
                return false;
            }
        }
        return true;
    }
    function sortBy$1(array, prop) {
        return array.slice().sort((_ref, _ref2) => {
            let {
                [prop]: propA = 0
            } = _ref;
            let {
                [prop]: propB = 0
            } = _ref2;
            return propA > propB ? 1 : propB > propA ? -1 : 0;
        });
    }
    function uniqueBy(array, prop) {
        const seen = new Set();
        return array.filter(_ref3 => {
            let {
                [prop]: check
            } = _ref3;
            return seen.has(check) ? false : seen.add(check);
        });
    }
    function clamp(number, min, max) {
        if (min === void 0) {
            min = 0;
        }
        if (max === void 0) {
            max = 1;
        }
        return Math.min(Math.max(toNumber(number) || 0, min), max);
    }
    function noop() {}
    function intersectRect() {
        for (var _len = arguments.length, rects = new Array(_len), _key = 0; _key < _len; _key++) {
            rects[_key] = arguments[_key];
        }
        return [ [ "bottom", "top" ], [ "right", "left" ] ].every(_ref4 => {
            let [ minProp, maxProp ] = _ref4;
            return Math.min(...rects.map(_ref5 => {
                let {
                    [minProp]: min
                } = _ref5;
                return min;
            })) - Math.max(...rects.map(_ref6 => {
                let {
                    [maxProp]: max
                } = _ref6;
                return max;
            })) > 0;
        });
    }
    function pointInRect(point, rect) {
        return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
    }
    function ratio(dimensions, prop, value) {
        const aProp = prop === "width" ? "height" : "width";
        return {
            [aProp]: dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp],
            [prop]: value
        };
    }
    function contain(dimensions, maxDimensions) {
        dimensions = {
            ...dimensions
        };
        for (const prop in dimensions) {
            dimensions = dimensions[prop] > maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
        }
        return dimensions;
    }
    function cover$1(dimensions, maxDimensions) {
        dimensions = contain(dimensions, maxDimensions);
        for (const prop in dimensions) {
            dimensions = dimensions[prop] < maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
        }
        return dimensions;
    }
    const Dimensions = {
        ratio: ratio,
        contain: contain,
        cover: cover$1
    };
    function getIndex(i, elements, current, finite) {
        if (current === void 0) {
            current = 0;
        }
        if (finite === void 0) {
            finite = false;
        }
        elements = toNodes(elements);
        const {
            length
        } = elements;
        if (!length) {
            return -1;
        }
        i = isNumeric(i) ? toNumber(i) : i === "next" ? current + 1 : i === "previous" ? current - 1 : elements.indexOf(toNode(i));
        if (finite) {
            return clamp(i, 0, length - 1);
        }
        i %= length;
        return i < 0 ? i + length : i;
    }
    function memoize(fn) {
        const cache = Object.create(null);
        return key => cache[key] || (cache[key] = fn(key));
    }
    class Deferred {
        constructor() {
            this.promise = new Promise((resolve, reject) => {
                this.reject = reject;
                this.resolve = resolve;
            });
        }
    }
    function attr(element, name, value) {
        if (isObject(name)) {
            for (const key in name) {
                attr(element, key, name[key]);
            }
            return;
        }
        if (isUndefined(value)) {
            var _toNode;
            return (_toNode = toNode(element)) == null ? void 0 : _toNode.getAttribute(name);
        } else {
            for (const el of toNodes(element)) {
                if (isFunction(value)) {
                    value = value.call(el, attr(el, name));
                }
                if (value === null) {
                    removeAttr(el, name);
                } else {
                    el.setAttribute(name, value);
                }
            }
        }
    }
    function hasAttr(element, name) {
        return toNodes(element).some(element => element.hasAttribute(name));
    }
    function removeAttr(element, name) {
        const elements = toNodes(element);
        for (const attribute of name.split(" ")) {
            for (const element of elements) {
                element.removeAttribute(attribute);
            }
        }
    }
    function data(element, attribute) {
        for (const name of [ attribute, "data-" + attribute ]) {
            if (hasAttr(element, name)) {
                return attr(element, name);
            }
        }
    }
    const voidElements = {
        area: true,
        base: true,
        br: true,
        col: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        keygen: true,
        link: true,
        menuitem: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true
    };
    function isVoidElement(element) {
        return toNodes(element).some(element => voidElements[element.tagName.toLowerCase()]);
    }
    function isVisible(element) {
        return toNodes(element).some(element => element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    }
    const selInput = "input,select,textarea,button";
    function isInput(element) {
        return toNodes(element).some(element => matches(element, selInput));
    }
    const selFocusable = selInput + ",a[href],[tabindex]";
    function isFocusable(element) {
        return matches(element, selFocusable);
    }
    function parent(element) {
        var _toNode;
        return (_toNode = toNode(element)) == null ? void 0 : _toNode.parentElement;
    }
    function filter$1(element, selector) {
        return toNodes(element).filter(element => matches(element, selector));
    }
    function matches(element, selector) {
        return toNodes(element).some(element => element.matches(selector));
    }
    function closest(element, selector) {
        return isElement(element) ? element.closest(startsWith(selector, ">") ? selector.slice(1) : selector) : toNodes(element).map(element => closest(element, selector)).filter(Boolean);
    }
    function within(element, selector) {
        return isString(selector) ? !!closest(element, selector) : toNode(selector).contains(toNode(element));
    }
    function parents(element, selector) {
        const elements = [];
        while (element = parent(element)) {
            if (!selector || matches(element, selector)) {
                elements.push(element);
            }
        }
        return elements;
    }
    function children(element, selector) {
        element = toNode(element);
        const children = element ? toNodes(element.children) : [];
        return selector ? filter$1(children, selector) : children;
    }
    function index(element, ref) {
        return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent(element)).indexOf(element);
    }
    function query(selector, context) {
        return find(selector, getContext(selector, context));
    }
    function queryAll(selector, context) {
        return findAll(selector, getContext(selector, context));
    }
    function find(selector, context) {
        return toNode(_query(selector, context, "querySelector"));
    }
    function findAll(selector, context) {
        return toNodes(_query(selector, context, "querySelectorAll"));
    }
    const contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
    const isContextSelector = memoize(selector => selector.match(contextSelectorRe));
    function getContext(selector, context) {
        if (context === void 0) {
            context = document;
        }
        return isString(selector) && isContextSelector(selector) || isDocument(context) ? context : context.ownerDocument;
    }
    const contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
    const sanatize = memoize(selector => selector.replace(contextSanitizeRe, "$1 *"));
    function _query(selector, context, queryFn) {
        if (context === void 0) {
            context = document;
        }
        if (!selector || !isString(selector)) {
            return selector;
        }
        selector = sanatize(selector);
        if (isContextSelector(selector)) {
            const split = splitSelector(selector);
            selector = "";
            for (let sel of split) {
                let ctx = context;
                if (sel[0] === "!") {
                    const selectors = sel.substr(1).trim().split(" ");
                    ctx = closest(parent(context), selectors[0]);
                    sel = selectors.slice(1).join(" ").trim();
                    if (!sel.length && split.length === 1) {
                        return ctx;
                    }
                }
                if (sel[0] === "-") {
                    const selectors = sel.substr(1).trim().split(" ");
                    const prev = (ctx || context).previousElementSibling;
                    ctx = matches(prev, sel.substr(1)) ? prev : null;
                    sel = selectors.slice(1).join(" ");
                }
                if (ctx) {
                    selector += "" + (selector ? "," : "") + domPath(ctx) + " " + sel;
                }
            }
            context = document;
        }
        try {
            return context[queryFn](selector);
        } catch (e) {
            return null;
        }
    }
    const selectorRe = /.*?[^\\](?:,|$)/g;
    const splitSelector = memoize(selector => selector.match(selectorRe).map(selector => selector.replace(/,$/, "").trim()));
    function domPath(element) {
        const names = [];
        while (element.parentNode) {
            const id = attr(element, "id");
            if (id) {
                names.unshift("#" + escape(id));
                break;
            } else {
                let {
                    tagName
                } = element;
                if (tagName !== "HTML") {
                    tagName += ":nth-child(" + (index(element) + 1) + ")";
                }
                names.unshift(tagName);
                element = element.parentNode;
            }
        }
        return names.join(" > ");
    }
    function escape(css) {
        return isString(css) ? CSS.escape(css) : "";
    }
    function on() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        let [ targets, types, selector, listener, useCapture = false ] = getArgs(args);
        if (listener.length > 1) {
            listener = detail(listener);
        }
        if (useCapture != null && useCapture.self) {
            listener = selfFilter(listener);
        }
        if (selector) {
            listener = delegate(selector, listener);
        }
        for (const type of types) {
            for (const target of targets) {
                target.addEventListener(type, listener, useCapture);
            }
        }
        return () => off(targets, types, listener, useCapture);
    }
    function off() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }
        let [ targets, types, , listener, useCapture = false ] = getArgs(args);
        for (const type of types) {
            for (const target of targets) {
                target.removeEventListener(type, listener, useCapture);
            }
        }
    }
    function once() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }
        const [ element, types, selector, listener, useCapture = false, condition ] = getArgs(args);
        const off = on(element, types, selector, e => {
            const result = !condition || condition(e);
            if (result) {
                off();
                listener(e, result);
            }
        }, useCapture);
        return off;
    }
    function trigger(targets, event, detail) {
        return toEventTargets(targets).every(target => target.dispatchEvent(createEvent(event, true, true, detail)));
    }
    function createEvent(e, bubbles, cancelable, detail) {
        if (bubbles === void 0) {
            bubbles = true;
        }
        if (cancelable === void 0) {
            cancelable = false;
        }
        if (isString(e)) {
            e = new CustomEvent(e, {
                bubbles: bubbles,
                cancelable: cancelable,
                detail: detail
            });
        }
        return e;
    }
    function getArgs(args) {
        args[0] = toEventTargets(args[0]);
        if (isString(args[1])) {
            args[1] = args[1].split(" ");
        }
        if (isFunction(args[2])) {
            args.splice(2, 0, false);
        }
        return args;
    }
    function delegate(selector, listener) {
        return e => {
            const current = selector[0] === ">" ? findAll(selector, e.currentTarget).reverse().filter(element => within(e.target, element))[0] : closest(e.target, selector);
            if (current) {
                e.current = current;
                listener.call(this, e);
            }
        };
    }
    function detail(listener) {
        return e => isArray(e.detail) ? listener(e, ...e.detail) : listener(e);
    }
    function selfFilter(listener) {
        return function(e) {
            if (e.target === e.currentTarget || e.target === e.current) {
                return listener.call(null, e);
            }
        };
    }
    function isEventTarget(target) {
        return target && "addEventListener" in target;
    }
    function toEventTarget(target) {
        return isEventTarget(target) ? target : toNode(target);
    }
    function toEventTargets(target) {
        return isArray(target) ? target.map(toEventTarget).filter(Boolean) : isString(target) ? findAll(target) : isEventTarget(target) ? [ target ] : toNodes(target);
    }
    function isTouch(e) {
        return e.pointerType === "touch" || !!e.touches;
    }
    function getEventPos(e) {
        var _e$touches, _e$changedTouches;
        const {
            clientX: x,
            clientY: y
        } = ((_e$touches = e.touches) == null ? void 0 : _e$touches[0]) || ((_e$changedTouches = e.changedTouches) == null ? void 0 : _e$changedTouches[0]) || e;
        return {
            x: x,
            y: y
        };
    }
    function ajax(url, options) {
        const env = {
            data: null,
            method: "GET",
            headers: {},
            xhr: new XMLHttpRequest(),
            beforeSend: noop,
            responseType: "",
            ...options
        };
        return Promise.resolve().then(() => env.beforeSend(env)).then(() => send(url, env));
    }
    function send(url, env) {
        return new Promise((resolve, reject) => {
            const {
                xhr
            } = env;
            for (const prop in env) {
                if (prop in xhr) {
                    try {
                        xhr[prop] = env[prop];
                    } catch (e) {}
                }
            }
            xhr.open(env.method.toUpperCase(), url);
            for (const header in env.headers) {
                xhr.setRequestHeader(header, env.headers[header]);
            }
            on(xhr, "load", () => {
                if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    resolve(xhr);
                } else {
                    reject(assign(Error(xhr.statusText), {
                        xhr: xhr,
                        status: xhr.status
                    }));
                }
            });
            on(xhr, "error", () => reject(assign(Error("Network Error"), {
                xhr: xhr
            })));
            on(xhr, "timeout", () => reject(assign(Error("Network Timeout"), {
                xhr: xhr
            })));
            xhr.send(env.data);
        });
    }
    function getImage(src, srcset, sizes) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onerror = e => {
                reject(e);
            };
            img.onload = () => {
                resolve(img);
            };
            sizes && (img.sizes = sizes);
            srcset && (img.srcset = srcset);
            img.src = src;
        });
    }
    const cssNumber = {
        "animation-iteration-count": true,
        "column-count": true,
        "fill-opacity": true,
        "flex-grow": true,
        "flex-shrink": true,
        "font-weight": true,
        "line-height": true,
        opacity: true,
        order: true,
        orphans: true,
        "stroke-dasharray": true,
        "stroke-dashoffset": true,
        widows: true,
        "z-index": true,
        zoom: true
    };
    function css(element, property, value, priority) {
        if (priority === void 0) {
            priority = "";
        }
        const elements = toNodes(element);
        for (const element of elements) {
            if (isString(property)) {
                property = propName(property);
                if (isUndefined(value)) {
                    return getComputedStyle(element).getPropertyValue(property);
                } else {
                    element.style.setProperty(property, isNumeric(value) && !cssNumber[property] ? value + "px" : value || isNumber(value) ? value : "", priority);
                }
            } else if (isArray(property)) {
                const props = {};
                for (const prop of property) {
                    props[prop] = css(element, prop);
                }
                return props;
            } else if (isObject(property)) {
                priority = value;
                each(property, (value, property) => css(element, property, value, priority));
            }
        }
        return elements[0];
    }
    const propName = memoize(name => vendorPropName(name));
    function vendorPropName(name) {
        if (startsWith(name, "--")) {
            return name;
        }
        name = hyphenate(name);
        const {
            style
        } = document.documentElement;
        if (name in style) {
            return name;
        }
        for (const prefix of [ "webkit", "moz" ]) {
            const prefixedName = "-" + prefix + "-" + name;
            if (prefixedName in style) {
                return prefixedName;
            }
        }
    }
    function addClass(element) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }
        apply$1(element, args, "add");
    }
    function removeClass(element) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }
        apply$1(element, args, "remove");
    }
    function removeClasses(element, cls) {
        attr(element, "class", value => (value || "").replace(new RegExp("\\b" + cls + "\\b\\s?", "g"), ""));
    }
    function replaceClass(element) {
        (arguments.length <= 1 ? undefined : arguments[1]) && removeClass(element, arguments.length <= 1 ? undefined : arguments[1]);
        (arguments.length <= 2 ? undefined : arguments[2]) && addClass(element, arguments.length <= 2 ? undefined : arguments[2]);
    }
    function hasClass(element, cls) {
        [ cls ] = getClasses(cls);
        return !!cls && toNodes(element).some(node => node.classList.contains(cls));
    }
    function toggleClass(element, cls, force) {
        const classes = getClasses(cls);
        if (!isUndefined(force)) {
            force = !!force;
        }
        for (const node of toNodes(element)) {
            for (const cls of classes) {
                node.classList.toggle(cls, force);
            }
        }
    }
    function apply$1(element, args, fn) {
        args = args.reduce((args, arg) => args.concat(getClasses(arg)), []);
        for (const node of toNodes(element)) {
            node.classList[fn](...args);
        }
    }
    function getClasses(str) {
        return String(str).split(/\s|,/).filter(Boolean);
    }
    function transition$1(element, props, duration, timing) {
        if (duration === void 0) {
            duration = 400;
        }
        if (timing === void 0) {
            timing = "linear";
        }
        duration = Math.round(duration);
        return Promise.all(toNodes(element).map(element => new Promise((resolve, reject) => {
            for (const name in props) {
                const value = css(element, name);
                if (value === "") {
                    css(element, name, value);
                }
            }
            const timer = setTimeout(() => trigger(element, "transitionend"), duration);
            once(element, "transitionend transitioncanceled", _ref => {
                let {
                    type
                } = _ref;
                clearTimeout(timer);
                removeClass(element, "uk-transition");
                css(element, {
                    transitionProperty: "",
                    transitionDuration: "",
                    transitionTimingFunction: ""
                });
                type === "transitioncanceled" ? reject() : resolve(element);
            }, {
                self: true
            });
            addClass(element, "uk-transition");
            css(element, {
                transitionProperty: Object.keys(props).map(propName).join(","),
                transitionDuration: duration + "ms",
                transitionTimingFunction: timing,
                ...props
            });
        })));
    }
    const Transition = {
        start: transition$1,
        async stop(element) {
            trigger(element, "transitionend");
            await Promise.resolve();
        },
        async cancel(element) {
            trigger(element, "transitioncanceled");
            await Promise.resolve();
        },
        inProgress(element) {
            return hasClass(element, "uk-transition");
        }
    };
    const animationPrefix = "uk-animation-";
    function animate$2(element, animation, duration, origin, out) {
        if (duration === void 0) {
            duration = 200;
        }
        return Promise.all(toNodes(element).map(element => new Promise((resolve, reject) => {
            trigger(element, "animationcanceled");
            const timer = setTimeout(() => trigger(element, "animationend"), duration);
            once(element, "animationend animationcanceled", _ref2 => {
                let {
                    type
                } = _ref2;
                clearTimeout(timer);
                type === "animationcanceled" ? reject() : resolve(element);
                css(element, "animationDuration", "");
                removeClasses(element, animationPrefix + "\\S*");
            }, {
                self: true
            });
            css(element, "animationDuration", duration + "ms");
            addClass(element, animation, animationPrefix + (out ? "leave" : "enter"));
            if (startsWith(animation, animationPrefix)) {
                origin && addClass(element, "uk-transform-origin-" + origin);
                out && addClass(element, animationPrefix + "reverse");
            }
        })));
    }
    const inProgressRe = new RegExp(animationPrefix + "(enter|leave)");
    const Animation = {
        in: animate$2,
        out(element, animation, duration, origin) {
            return animate$2(element, animation, duration, origin, true);
        },
        inProgress(element) {
            return inProgressRe.test(attr(element, "class"));
        },
        cancel(element) {
            trigger(element, "animationcanceled");
        }
    };
    const dirs$1 = {
        width: [ "left", "right" ],
        height: [ "top", "bottom" ]
    };
    function dimensions$1(element) {
        const rect = isElement(element) ? toNode(element).getBoundingClientRect() : {
            height: height(element),
            width: width(element),
            top: 0,
            left: 0
        };
        return {
            height: rect.height,
            width: rect.width,
            top: rect.top,
            left: rect.left,
            bottom: rect.top + rect.height,
            right: rect.left + rect.width
        };
    }
    function offset(element, coordinates) {
        const currentOffset = dimensions$1(element);
        if (element) {
            const {
                scrollY,
                scrollX
            } = toWindow(element);
            const offsetBy = {
                height: scrollY,
                width: scrollX
            };
            for (const dir in dirs$1) {
                for (const prop of dirs$1[dir]) {
                    currentOffset[prop] += offsetBy[dir];
                }
            }
        }
        if (!coordinates) {
            return currentOffset;
        }
        const pos = css(element, "position");
        each(css(element, [ "left", "top" ]), (value, prop) => css(element, prop, coordinates[prop] - currentOffset[prop] + toFloat(pos === "absolute" && value === "auto" ? position(element)[prop] : value)));
    }
    function position(element) {
        let {
            top,
            left
        } = offset(element);
        const {
            ownerDocument: {
                body,
                documentElement
            },
            offsetParent
        } = toNode(element);
        let parent = offsetParent || documentElement;
        while (parent && (parent === body || parent === documentElement) && css(parent, "position") === "static") {
            parent = parent.parentNode;
        }
        if (isElement(parent)) {
            const parentOffset = offset(parent);
            top -= parentOffset.top + toFloat(css(parent, "borderTopWidth"));
            left -= parentOffset.left + toFloat(css(parent, "borderLeftWidth"));
        }
        return {
            top: top - toFloat(css(element, "marginTop")),
            left: left - toFloat(css(element, "marginLeft"))
        };
    }
    function offsetPosition(element) {
        element = toNode(element);
        const offset = [ element.offsetTop, element.offsetLeft ];
        while (element = element.offsetParent) {
            offset[0] += element.offsetTop + toFloat(css(element, "borderTopWidth"));
            offset[1] += element.offsetLeft + toFloat(css(element, "borderLeftWidth"));
            if (css(element, "position") === "fixed") {
                const win = toWindow(element);
                offset[0] += win.scrollY;
                offset[1] += win.scrollX;
                return offset;
            }
        }
        return offset;
    }
    const height = dimension("height");
    const width = dimension("width");
    function dimension(prop) {
        const propName = ucfirst(prop);
        return (element, value) => {
            if (isUndefined(value)) {
                if (isWindow(element)) {
                    return element["inner" + propName];
                }
                if (isDocument(element)) {
                    const doc = element.documentElement;
                    return Math.max(doc["offset" + propName], doc["scroll" + propName]);
                }
                element = toNode(element);
                value = css(element, prop);
                value = value === "auto" ? element["offset" + propName] : toFloat(value) || 0;
                return value - boxModelAdjust(element, prop);
            } else {
                return css(element, prop, !value && value !== 0 ? "" : +value + boxModelAdjust(element, prop) + "px");
            }
        };
    }
    function boxModelAdjust(element, prop, sizing) {
        if (sizing === void 0) {
            sizing = "border-box";
        }
        return css(element, "boxSizing") === sizing ? dirs$1[prop].map(ucfirst).reduce((value, prop) => value + toFloat(css(element, "padding" + prop)) + toFloat(css(element, "border" + prop + "Width")), 0) : 0;
    }
    function flipPosition(pos) {
        for (const dir in dirs$1) {
            for (const i in dirs$1[dir]) {
                if (dirs$1[dir][i] === pos) {
                    return dirs$1[dir][1 - i];
                }
            }
        }
        return pos;
    }
    function toPx(value, property, element, offsetDim) {
        if (property === void 0) {
            property = "width";
        }
        if (element === void 0) {
            element = window;
        }
        if (offsetDim === void 0) {
            offsetDim = false;
        }
        if (!isString(value)) {
            return toFloat(value);
        }
        return parseCalc(value).reduce((result, value) => {
            const unit = parseUnit(value);
            if (unit) {
                value = percent(unit === "vh" ? height(toWindow(element)) : unit === "vw" ? width(toWindow(element)) : offsetDim ? element["offset" + ucfirst(property)] : dimensions$1(element)[property], value);
            }
            return result + toFloat(value);
        }, 0);
    }
    const calcRe = /-?\d+(?:\.\d+)?(?:v[wh]|%|px)?/g;
    const parseCalc = memoize(calc => calc.toString().replace(/\s/g, "").match(calcRe) || []);
    const unitRe$1 = /(?:v[hw]|%)$/;
    const parseUnit = memoize(str => (str.match(unitRe$1) || [])[0]);
    function percent(base, value) {
        return base * toFloat(value) / 100;
    }
    function ready(fn) {
        if (document.readyState !== "loading") {
            fn();
            return;
        }
        once(document, "DOMContentLoaded", fn);
    }
    function isTag(element, tagName) {
        var _element$tagName;
        return (element == null ? void 0 : (_element$tagName = element.tagName) == null ? void 0 : _element$tagName.toLowerCase()) === tagName.toLowerCase();
    }
    function empty(element) {
        element = $(element);
        element.innerHTML = "";
        return element;
    }
    function html(parent, html) {
        return isUndefined(html) ? $(parent).innerHTML : append(empty(parent), html);
    }
    const prepend = applyFn("prepend");
    const append = applyFn("append");
    const before = applyFn("before");
    const after = applyFn("after");
    function applyFn(fn) {
        return function(ref, element) {
            var _$;
            const nodes = toNodes(isString(element) ? fragment(element) : element);
            (_$ = $(ref)) == null ? void 0 : _$[fn](...nodes);
            return unwrapSingle(nodes);
        };
    }
    function remove$1(element) {
        toNodes(element).forEach(element => element.remove());
    }
    function wrapAll(element, structure) {
        structure = toNode(before(element, structure));
        while (structure.firstChild) {
            structure = structure.firstChild;
        }
        append(structure, element);
        return structure;
    }
    function wrapInner(element, structure) {
        return toNodes(toNodes(element).map(element => element.hasChildNodes() ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure)));
    }
    function unwrap(element) {
        toNodes(element).map(parent).filter((value, index, self) => self.indexOf(value) === index).forEach(parent => parent.replaceWith(...parent.childNodes));
    }
    const fragmentRe = /^\s*<(\w+|!)[^>]*>/;
    const singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
    function fragment(html) {
        const matches = singleTagRe.exec(html);
        if (matches) {
            return document.createElement(matches[1]);
        }
        const container = document.createElement("div");
        if (fragmentRe.test(html)) {
            container.insertAdjacentHTML("beforeend", html.trim());
        } else {
            container.textContent = html;
        }
        return unwrapSingle(container.childNodes);
    }
    function unwrapSingle(nodes) {
        return nodes.length > 1 ? nodes : nodes[0];
    }
    function apply(node, fn) {
        if (!isElement(node)) {
            return;
        }
        fn(node);
        node = node.firstElementChild;
        while (node) {
            const next = node.nextElementSibling;
            apply(node, fn);
            node = next;
        }
    }
    function $(selector, context) {
        return isHtml(selector) ? toNode(fragment(selector)) : find(selector, context);
    }
    function $$(selector, context) {
        return isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
    }
    function isHtml(str) {
        return isString(str) && startsWith(str.trim(), "<");
    }
    const inBrowser = typeof window !== "undefined";
    const isRtl = inBrowser && document.dir === "rtl";
    const hasTouch = inBrowser && "ontouchstart" in window;
    const hasPointerEvents = inBrowser && window.PointerEvent;
    const pointerDown$1 = hasPointerEvents ? "pointerdown" : hasTouch ? "touchstart" : "mousedown";
    const pointerMove$1 = hasPointerEvents ? "pointermove" : hasTouch ? "touchmove" : "mousemove";
    const pointerUp$1 = hasPointerEvents ? "pointerup" : hasTouch ? "touchend" : "mouseup";
    const pointerEnter = hasPointerEvents ? "pointerenter" : hasTouch ? "" : "mouseenter";
    const pointerLeave = hasPointerEvents ? "pointerleave" : hasTouch ? "" : "mouseleave";
    const pointerCancel = hasPointerEvents ? "pointercancel" : "touchcancel";
    const fastdom = {
        reads: [],
        writes: [],
        read(task) {
            this.reads.push(task);
            scheduleFlush();
            return task;
        },
        write(task) {
            this.writes.push(task);
            scheduleFlush();
            return task;
        },
        clear(task) {
            remove(this.reads, task);
            remove(this.writes, task);
        },
        flush: flush
    };
    function flush(recursion) {
        runTasks(fastdom.reads);
        runTasks(fastdom.writes.splice(0));
        fastdom.scheduled = false;
        if (fastdom.reads.length || fastdom.writes.length) {
            scheduleFlush(recursion + 1);
        }
    }
    const RECURSION_LIMIT = 4;
    function scheduleFlush(recursion) {
        if (fastdom.scheduled) {
            return;
        }
        fastdom.scheduled = true;
        if (recursion && recursion < RECURSION_LIMIT) {
            Promise.resolve().then(() => flush(recursion));
        } else {
            requestAnimationFrame(() => flush(1));
        }
    }
    function runTasks(tasks) {
        let task;
        while (task = tasks.shift()) {
            try {
                task();
            } catch (e) {
                console.error(e);
            }
        }
    }
    function remove(array, item) {
        const index = array.indexOf(item);
        return ~index && array.splice(index, 1);
    }
    function MouseTracker() {}
    MouseTracker.prototype = {
        positions: [],
        init() {
            this.positions = [];
            let position;
            this.unbind = on(document, "mousemove", e => position = getEventPos(e));
            this.interval = setInterval(() => {
                if (!position) {
                    return;
                }
                this.positions.push(position);
                if (this.positions.length > 5) {
                    this.positions.shift();
                }
            }, 50);
        },
        cancel() {
            var _this$unbind;
            (_this$unbind = this.unbind) == null ? void 0 : _this$unbind.call(this);
            this.interval && clearInterval(this.interval);
        },
        movesTo(target) {
            if (this.positions.length < 2) {
                return false;
            }
            const p = target.getBoundingClientRect();
            const {
                left,
                right,
                top,
                bottom
            } = p;
            const [ prevPosition ] = this.positions;
            const position = last(this.positions);
            const path = [ prevPosition, position ];
            if (pointInRect(position, p)) {
                return false;
            }
            const diagonals = [ [ {
                x: left,
                y: top
            }, {
                x: right,
                y: bottom
            } ], [ {
                x: left,
                y: bottom
            }, {
                x: right,
                y: top
            } ] ];
            return diagonals.some(diagonal => {
                const intersection = intersect(path, diagonal);
                return intersection && pointInRect(intersection, p);
            });
        }
    };
    function intersect(_ref, _ref2) {
        let [ {
            x: x1,
            y: y1
        }, {
            x: x2,
            y: y2
        } ] = _ref;
        let [ {
            x: x3,
            y: y3
        }, {
            x: x4,
            y: y4
        } ] = _ref2;
        const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        if (denominator === 0) {
            return false;
        }
        const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
        if (ua < 0) {
            return false;
        }
        return {
            x: x1 + ua * (x2 - x1),
            y: y1 + ua * (y2 - y1)
        };
    }
    function observeIntersection(targets, cb, options, intersecting) {
        if (intersecting === void 0) {
            intersecting = true;
        }
        const observer = new IntersectionObserver(intersecting ? (entries, observer) => {
            if (entries.some(entry => entry.isIntersecting)) {
                cb(entries, observer);
            }
        } : cb, options);
        for (const el of toNodes(targets)) {
            observer.observe(el);
        }
        return observer;
    }
    const hasResizeObserver = inBrowser && window.ResizeObserver;
    function observeResize(targets, cb, options) {
        if (options === void 0) {
            options = {
                box: "border-box"
            };
        }
        if (hasResizeObserver) {
            return observe(ResizeObserver, targets, cb, options);
        }
        initResizeListener();
        listeners.add(cb);
        return {
            disconnect() {
                listeners.delete(cb);
            }
        };
    }
    let listeners;
    function initResizeListener() {
        if (listeners) {
            return;
        }
        listeners = new Set();
        let pendingResize;
        const handleResize = () => {
            if (pendingResize) {
                return;
            }
            pendingResize = true;
            requestAnimationFrame(() => pendingResize = false);
            for (const listener of listeners) {
                listener();
            }
        };
        on(window, "load resize", handleResize);
        on(document, "loadedmetadata load", handleResize, true);
    }
    function observeMutation(targets, cb, options) {
        return observe(MutationObserver, targets, cb, options);
    }
    function observe(Observer, targets, cb, options) {
        const observer = new Observer(cb);
        for (const el of toNodes(targets)) {
            observer.observe(el, options);
        }
        return observer;
    }
    const strats = {};
    strats.events = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;
    strats.args = function(parentVal, childVal) {
        return childVal !== false && concatStrat(childVal || parentVal);
    };
    strats.update = function(parentVal, childVal) {
        return sortBy$1(concatStrat(parentVal, isFunction(childVal) ? {
            read: childVal
        } : childVal), "order");
    };
    strats.props = function(parentVal, childVal) {
        if (isArray(childVal)) {
            const value = {};
            for (const key of childVal) {
                value[key] = String;
            }
            childVal = value;
        }
        return strats.methods(parentVal, childVal);
    };
    strats.computed = strats.methods = function(parentVal, childVal) {
        return childVal ? parentVal ? {
            ...parentVal,
            ...childVal
        } : childVal : parentVal;
    };
    strats.data = function(parentVal, childVal, vm) {
        if (!vm) {
            if (!childVal) {
                return parentVal;
            }
            if (!parentVal) {
                return childVal;
            }
            return function(vm) {
                return mergeFnData(parentVal, childVal, vm);
            };
        }
        return mergeFnData(parentVal, childVal, vm);
    };
    function mergeFnData(parentVal, childVal, vm) {
        return strats.computed(isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal, isFunction(childVal) ? childVal.call(vm, vm) : childVal);
    }
    function concatStrat(parentVal, childVal) {
        parentVal = parentVal && !isArray(parentVal) ? [ parentVal ] : parentVal;
        return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [ childVal ] : parentVal;
    }
    function defaultStrat(parentVal, childVal) {
        return isUndefined(childVal) ? parentVal : childVal;
    }
    function mergeOptions(parent, child, vm) {
        const options = {};
        if (isFunction(child)) {
            child = child.options;
        }
        if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm);
        }
        if (child.mixins) {
            for (const mixin of child.mixins) {
                parent = mergeOptions(parent, mixin, vm);
            }
        }
        for (const key in parent) {
            mergeKey(key);
        }
        for (const key in child) {
            if (!hasOwn(parent, key)) {
                mergeKey(key);
            }
        }
        function mergeKey(key) {
            options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
        }
        return options;
    }
    function parseOptions(options, args) {
        if (args === void 0) {
            args = [];
        }
        try {
            return options ? startsWith(options, "{") ? JSON.parse(options) : args.length && !includes(options, ":") ? {
                [args[0]]: options
            } : options.split(";").reduce((options, option) => {
                const [ key, value ] = option.split(/:(.*)/);
                if (key && !isUndefined(value)) {
                    options[key.trim()] = value.trim();
                }
                return options;
            }, {}) : {};
        } catch (e) {
            return {};
        }
    }
    function play(el) {
        if (isIFrame(el)) {
            call(el, {
                func: "playVideo",
                method: "play"
            });
        }
        if (isHTML5(el)) {
            try {
                el.play().catch(noop);
            } catch (e) {}
        }
    }
    function pause(el) {
        if (isIFrame(el)) {
            call(el, {
                func: "pauseVideo",
                method: "pause"
            });
        }
        if (isHTML5(el)) {
            el.pause();
        }
    }
    function mute(el) {
        if (isIFrame(el)) {
            call(el, {
                func: "mute",
                method: "setVolume",
                value: 0
            });
        }
        if (isHTML5(el)) {
            el.muted = true;
        }
    }
    function isVideo(el) {
        return isHTML5(el) || isIFrame(el);
    }
    function isHTML5(el) {
        return isTag(el, "video");
    }
    function isIFrame(el) {
        return isTag(el, "iframe") && (isYoutube(el) || isVimeo(el));
    }
    function isYoutube(el) {
        return !!el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
    }
    function isVimeo(el) {
        return !!el.src.match(/vimeo\.com\/video\/.*/);
    }
    async function call(el, cmd) {
        await enableApi(el);
        post(el, cmd);
    }
    function post(el, cmd) {
        try {
            el.contentWindow.postMessage(JSON.stringify({
                event: "command",
                ...cmd
            }), "*");
        } catch (e) {}
    }
    const stateKey = "_ukPlayer";
    let counter = 0;
    function enableApi(el) {
        if (el[stateKey]) {
            return el[stateKey];
        }
        const youtube = isYoutube(el);
        const vimeo = isVimeo(el);
        const id = ++counter;
        let poller;
        return el[stateKey] = new Promise(resolve => {
            youtube && once(el, "load", () => {
                const listener = () => post(el, {
                    event: "listening",
                    id: id
                });
                poller = setInterval(listener, 100);
                listener();
            });
            once(window, "message", resolve, false, _ref => {
                let {
                    data
                } = _ref;
                try {
                    data = JSON.parse(data);
                    return data && (youtube && data.id === id && data.event === "onReady" || vimeo && Number(data.player_id) === id);
                } catch (e) {}
            });
            el.src = "" + el.src + (includes(el.src, "?") ? "&" : "?") + (youtube ? "enablejsapi=1" : "api=1&player_id=" + id);
        }).then(() => clearInterval(poller));
    }
    function isInView(element, offsetTop, offsetLeft) {
        if (offsetTop === void 0) {
            offsetTop = 0;
        }
        if (offsetLeft === void 0) {
            offsetLeft = 0;
        }
        if (!isVisible(element)) {
            return false;
        }
        return intersectRect(...scrollParents(element).map(parent => {
            const {
                top,
                left,
                bottom,
                right
            } = offsetViewport(parent);
            return {
                top: top - offsetTop,
                left: left - offsetLeft,
                bottom: bottom + offsetTop,
                right: right + offsetLeft
            };
        }).concat(offset(element)));
    }
    function scrollIntoView(element, _temp) {
        let {
            offset: offsetBy = 0
        } = _temp === void 0 ? {} : _temp;
        const parents = isVisible(element) ? scrollParents(element) : [];
        return parents.reduce((fn, scrollElement, i) => {
            const {
                scrollTop,
                scrollHeight,
                offsetHeight
            } = scrollElement;
            const viewport = offsetViewport(scrollElement);
            const maxScroll = scrollHeight - viewport.height;
            const {
                height: elHeight,
                top: elTop
            } = parents[i - 1] ? offsetViewport(parents[i - 1]) : offset(element);
            let top = Math.ceil(elTop - viewport.top - offsetBy + scrollTop);
            if (offsetBy > 0 && offsetHeight < elHeight + offsetBy) {
                top += offsetBy;
            } else {
                offsetBy = 0;
            }
            if (top > maxScroll) {
                offsetBy -= top - maxScroll;
                top = maxScroll;
            } else if (top < 0) {
                offsetBy -= top;
                top = 0;
            }
            return () => scrollTo(scrollElement, top - scrollTop).then(fn);
        }, () => Promise.resolve())();
        function scrollTo(element, top) {
            return new Promise(resolve => {
                const scroll = element.scrollTop;
                const duration = getDuration(Math.abs(top));
                const start = Date.now();
                (function step() {
                    const percent = ease(clamp((Date.now() - start) / duration));
                    element.scrollTop = scroll + top * percent;
                    if (percent === 1) {
                        resolve();
                    } else {
                        requestAnimationFrame(step);
                    }
                })();
            });
        }
        function getDuration(dist) {
            return 40 * Math.pow(dist, .375);
        }
        function ease(k) {
            return .5 * (1 - Math.cos(Math.PI * k));
        }
    }
    function scrolledOver(element, startOffset, endOffset) {
        if (startOffset === void 0) {
            startOffset = 0;
        }
        if (endOffset === void 0) {
            endOffset = 0;
        }
        if (!isVisible(element)) {
            return 0;
        }
        const [ scrollElement ] = scrollParents(element, /auto|scroll/, true);
        const {
            scrollHeight,
            scrollTop
        } = scrollElement;
        const {
            height: viewportHeight
        } = offsetViewport(scrollElement);
        const maxScroll = scrollHeight - viewportHeight;
        const elementOffsetTop = offsetPosition(element)[0] - offsetPosition(scrollElement)[0];
        const start = Math.max(0, elementOffsetTop - viewportHeight + startOffset);
        const end = Math.min(maxScroll, elementOffsetTop + element.offsetHeight - endOffset);
        return clamp((scrollTop - start) / (end - start));
    }
    function scrollParents(element, overflowRe, scrollable) {
        if (overflowRe === void 0) {
            overflowRe = /auto|scroll|hidden|clip/;
        }
        if (scrollable === void 0) {
            scrollable = false;
        }
        const scrollEl = scrollingElement(element);
        let ancestors = parents(element).reverse();
        ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);
        const fixedIndex = findIndex(ancestors, el => css(el, "position") === "fixed");
        if (~fixedIndex) {
            ancestors = ancestors.slice(fixedIndex);
        }
        return [ scrollEl ].concat(ancestors.filter(parent => overflowRe.test(css(parent, "overflow")) && (!scrollable || parent.scrollHeight > offsetViewport(parent).height))).reverse();
    }
    function offsetViewport(scrollElement) {
        const window = toWindow(scrollElement);
        const {
            document: {
                documentElement
            }
        } = window;
        let viewportElement = scrollElement === scrollingElement(scrollElement) ? window : scrollElement;
        const {
            visualViewport
        } = window;
        if (isWindow(viewportElement) && visualViewport) {
            let {
                height,
                width,
                scale,
                pageTop: top,
                pageLeft: left
            } = visualViewport;
            height = Math.round(height * scale);
            width = Math.round(width * scale);
            return {
                height: height,
                width: width,
                top: top,
                left: left,
                bottom: top + height,
                right: left + width
            };
        }
        let rect = offset(viewportElement);
        for (let [ prop, dir, start, end ] of [ [ "width", "x", "left", "right" ], [ "height", "y", "top", "bottom" ] ]) {
            if (isWindow(viewportElement)) {
                viewportElement = documentElement;
            } else {
                rect[start] += toFloat(css(viewportElement, "border-" + start + "-width"));
            }
            rect[prop] = rect[dir] = viewportElement["client" + ucfirst(prop)];
            rect[end] = rect[prop] + rect[start];
        }
        return rect;
    }
    function scrollingElement(element) {
        return toWindow(element).document.scrollingElement;
    }
    const dirs = [ [ "width", "x", "left", "right" ], [ "height", "y", "top", "bottom" ] ];
    function positionAt(element, target, options) {
        options = {
            attach: {
                element: [ "left", "top" ],
                target: [ "left", "top" ],
                ...options.attach
            },
            offset: [ 0, 0 ],
            placement: [],
            ...options
        };
        if (!isArray(target)) {
            target = [ target, target ];
        }
        offset(element, getPosition(element, target, options));
    }
    function getPosition(element, target, options) {
        const position = attachTo(element, target, options);
        const {
            boundary,
            viewportOffset = 0,
            placement
        } = options;
        let offsetPosition = position;
        for (const [ i, [ prop, , start, end ] ] of Object.entries(dirs)) {
            const viewport = getViewport$2(element, target[i], viewportOffset, boundary, i);
            if (isWithin(position, viewport, i)) {
                continue;
            }
            let offsetBy = 0;
            if (placement[i] === "flip") {
                const attach = options.attach.target[i];
                if (attach === end && position[end] <= viewport[end] || attach === start && position[start] >= viewport[start]) {
                    continue;
                }
                offsetBy = flip(element, target, options, i)[start] - position[start];
                const scrollArea = getScrollArea(element, target[i], viewportOffset, i);
                if (!isWithin(applyOffset(position, offsetBy, i), scrollArea, i)) {
                    if (isWithin(position, scrollArea, i)) {
                        continue;
                    }
                    if (options.recursion) {
                        return false;
                    }
                    const newPos = flipAxis(element, target, options);
                    if (newPos && isWithin(newPos, scrollArea, 1 - i)) {
                        return newPos;
                    }
                    continue;
                }
            } else if (placement[i] === "shift") {
                const targetDim = offset(target[i]);
                const {
                    offset: elOffset
                } = options;
                offsetBy = clamp(clamp(position[start], viewport[start], viewport[end] - position[prop]), targetDim[start] - position[prop] + elOffset[i], targetDim[end] - elOffset[i]) - position[start];
            }
            offsetPosition = applyOffset(offsetPosition, offsetBy, i);
        }
        return offsetPosition;
    }
    function attachTo(element, target, options) {
        let {
            attach,
            offset: offsetBy
        } = {
            attach: {
                element: [ "left", "top" ],
                target: [ "left", "top" ],
                ...options.attach
            },
            offset: [ 0, 0 ],
            ...options
        };
        let elOffset = offset(element);
        for (const [ i, [ prop, , start, end ] ] of Object.entries(dirs)) {
            const targetOffset = attach.target[i] === attach.element[i] ? offsetViewport(target[i]) : offset(target[i]);
            elOffset = applyOffset(elOffset, targetOffset[start] - elOffset[start] + moveBy(attach.target[i], end, targetOffset[prop]) - moveBy(attach.element[i], end, elOffset[prop]) + +offsetBy[i], i);
        }
        return elOffset;
    }
    function applyOffset(position, offset, i) {
        const [ , dir, start, end ] = dirs[i];
        const newPos = {
            ...position
        };
        newPos[start] = position[dir] = position[start] + offset;
        newPos[end] += offset;
        return newPos;
    }
    function moveBy(attach, end, dim) {
        return attach === "center" ? dim / 2 : attach === end ? dim : 0;
    }
    function getViewport$2(element, target, viewportOffset, boundary, i) {
        let viewport = getIntersectionArea(...commonScrollParents(element, target).map(offsetViewport));
        if (viewportOffset) {
            viewport[dirs[i][2]] += viewportOffset;
            viewport[dirs[i][3]] -= viewportOffset;
        }
        if (boundary) {
            viewport = getIntersectionArea(viewport, offset(isArray(boundary) ? boundary[i] : boundary));
        }
        return viewport;
    }
    function getScrollArea(element, target, viewportOffset, i) {
        const [ prop, , start, end ] = dirs[i];
        const [ scrollElement ] = commonScrollParents(element, target);
        const viewport = offsetViewport(scrollElement);
        viewport[start] -= scrollElement["scroll" + ucfirst(start)] - viewportOffset;
        viewport[end] = viewport[start] + scrollElement["scroll" + ucfirst(prop)] - viewportOffset;
        return viewport;
    }
    function commonScrollParents(element, target) {
        return scrollParents(target).filter(parent => within(element, parent));
    }
    function getIntersectionArea() {
        let area = {};
        for (var _len = arguments.length, rects = new Array(_len), _key = 0; _key < _len; _key++) {
            rects[_key] = arguments[_key];
        }
        for (const rect of rects) {
            for (const [ , , start, end ] of dirs) {
                area[start] = Math.max(area[start] || 0, rect[start]);
                area[end] = Math.min(...[ area[end], rect[end] ].filter(Boolean));
            }
        }
        return area;
    }
    function isWithin(positionA, positionB, i) {
        const [ , , start, end ] = dirs[i];
        return positionA[start] >= positionB[start] && positionA[end] <= positionB[end];
    }
    function flip(element, target, _ref, i) {
        let {
            offset,
            attach
        } = _ref;
        return attachTo(element, target, {
            attach: {
                element: flipAttach(attach.element, i),
                target: flipAttach(attach.target, i)
            },
            offset: flipOffset(offset, i)
        });
    }
    function flipAxis(element, target, options) {
        return getPosition(element, target, {
            ...options,
            attach: {
                element: options.attach.element.map(flipAttachAxis).reverse(),
                target: options.attach.target.map(flipAttachAxis).reverse()
            },
            offset: options.offset.reverse(),
            placement: options.placement.reverse(),
            recursion: true
        });
    }
    function flipAttach(attach, i) {
        const newAttach = [ ...attach ];
        const index = dirs[i].indexOf(attach[i]);
        if (~index) {
            newAttach[i] = dirs[i][1 - index % 2 + 2];
        }
        return newAttach;
    }
    function flipAttachAxis(prop) {
        for (let i = 0; i < dirs.length; i++) {
            const index = dirs[i].indexOf(prop);
            if (~index) {
                return dirs[1 - i][index % 2 + 2];
            }
        }
    }
    function flipOffset(offset, i) {
        offset = [ ...offset ];
        offset[i] *= -1;
        return offset;
    }
    var util = Object.freeze({
        __proto__: null,
        ajax: ajax,
        getImage: getImage,
        Transition: Transition,
        Animation: Animation,
        attr: attr,
        hasAttr: hasAttr,
        removeAttr: removeAttr,
        data: data,
        addClass: addClass,
        removeClass: removeClass,
        removeClasses: removeClasses,
        replaceClass: replaceClass,
        hasClass: hasClass,
        toggleClass: toggleClass,
        dimensions: dimensions$1,
        offset: offset,
        position: position,
        offsetPosition: offsetPosition,
        height: height,
        width: width,
        boxModelAdjust: boxModelAdjust,
        flipPosition: flipPosition,
        toPx: toPx,
        ready: ready,
        isTag: isTag,
        empty: empty,
        html: html,
        prepend: prepend,
        append: append,
        before: before,
        after: after,
        remove: remove$1,
        wrapAll: wrapAll,
        wrapInner: wrapInner,
        unwrap: unwrap,
        fragment: fragment,
        apply: apply,
        $: $,
        $$: $$,
        inBrowser: inBrowser,
        isRtl: isRtl,
        hasTouch: hasTouch,
        pointerDown: pointerDown$1,
        pointerMove: pointerMove$1,
        pointerUp: pointerUp$1,
        pointerEnter: pointerEnter,
        pointerLeave: pointerLeave,
        pointerCancel: pointerCancel,
        on: on,
        off: off,
        once: once,
        trigger: trigger,
        createEvent: createEvent,
        toEventTargets: toEventTargets,
        isTouch: isTouch,
        getEventPos: getEventPos,
        fastdom: fastdom,
        isVoidElement: isVoidElement,
        isVisible: isVisible,
        selInput: selInput,
        isInput: isInput,
        selFocusable: selFocusable,
        isFocusable: isFocusable,
        parent: parent,
        filter: filter$1,
        matches: matches,
        closest: closest,
        within: within,
        parents: parents,
        children: children,
        index: index,
        hasOwn: hasOwn,
        hyphenate: hyphenate,
        camelize: camelize,
        ucfirst: ucfirst,
        startsWith: startsWith,
        endsWith: endsWith,
        includes: includes,
        findIndex: findIndex,
        isArray: isArray,
        toArray: toArray,
        assign: assign,
        isFunction: isFunction,
        isObject: isObject,
        isPlainObject: isPlainObject,
        isWindow: isWindow,
        isDocument: isDocument,
        isNode: isNode,
        isElement: isElement,
        isBoolean: isBoolean,
        isString: isString,
        isNumber: isNumber,
        isNumeric: isNumeric,
        isEmpty: isEmpty,
        isUndefined: isUndefined,
        toBoolean: toBoolean,
        toNumber: toNumber,
        toFloat: toFloat,
        toNode: toNode,
        toNodes: toNodes,
        toWindow: toWindow,
        isEqual: isEqual,
        swap: swap,
        last: last,
        each: each,
        sortBy: sortBy$1,
        uniqueBy: uniqueBy,
        clamp: clamp,
        noop: noop,
        intersectRect: intersectRect,
        pointInRect: pointInRect,
        Dimensions: Dimensions,
        getIndex: getIndex,
        memoize: memoize,
        Deferred: Deferred,
        MouseTracker: MouseTracker,
        observeIntersection: observeIntersection,
        observeResize: observeResize,
        observeMutation: observeMutation,
        mergeOptions: mergeOptions,
        parseOptions: parseOptions,
        play: play,
        pause: pause,
        mute: mute,
        isVideo: isVideo,
        positionAt: positionAt,
        query: query,
        queryAll: queryAll,
        find: find,
        findAll: findAll,
        escape: escape,
        css: css,
        propName: propName,
        isInView: isInView,
        scrollIntoView: scrollIntoView,
        scrolledOver: scrolledOver,
        scrollParents: scrollParents,
        offsetViewport: offsetViewport
    });
    function globalAPI(UIkit) {
        const DATA = UIkit.data;
        UIkit.use = function(plugin) {
            if (plugin.installed) {
                return;
            }
            plugin.call(null, this);
            plugin.installed = true;
            return this;
        };
        UIkit.mixin = function(mixin, component) {
            component = (isString(component) ? UIkit.component(component) : component) || this;
            component.options = mergeOptions(component.options, mixin);
        };
        UIkit.extend = function(options) {
            options = options || {};
            const Super = this;
            const Sub = function UIkitComponent(options) {
                this._init(options);
            };
            Sub.prototype = Object.create(Super.prototype);
            Sub.prototype.constructor = Sub;
            Sub.options = mergeOptions(Super.options, options);
            Sub.super = Super;
            Sub.extend = Super.extend;
            return Sub;
        };
        UIkit.update = function(element, e) {
            element = element ? toNode(element) : document.body;
            for (const parentEl of parents(element).reverse()) {
                update(parentEl[DATA], e);
            }
            apply(element, element => update(element[DATA], e));
        };
        let container;
        Object.defineProperty(UIkit, "container", {
            get() {
                return container || document.body;
            },
            set(element) {
                container = $(element);
            }
        });
        function update(data, e) {
            if (!data) {
                return;
            }
            for (const name in data) {
                if (data[name]._connected) {
                    data[name]._callUpdate(e);
                }
            }
        }
    }
    function hooksAPI(UIkit) {
        UIkit.prototype._callHook = function(hook) {
            var _this$$options$hook;
            (_this$$options$hook = this.$options[hook]) == null ? void 0 : _this$$options$hook.forEach(handler => handler.call(this));
        };
        UIkit.prototype._callConnected = function() {
            if (this._connected) {
                return;
            }
            this._data = {};
            this._computed = {};
            this._initProps();
            this._callHook("beforeConnect");
            this._connected = true;
            this._initEvents();
            this._initObservers();
            this._callHook("connected");
            this._callUpdate();
        };
        UIkit.prototype._callDisconnected = function() {
            if (!this._connected) {
                return;
            }
            this._callHook("beforeDisconnect");
            this._disconnectObservers();
            this._unbindEvents();
            this._callHook("disconnected");
            this._connected = false;
            delete this._watch;
        };
        UIkit.prototype._callUpdate = function(e) {
            if (e === void 0) {
                e = "update";
            }
            if (!this._connected) {
                return;
            }
            if (e === "update" || e === "resize") {
                this._callWatches();
            }
            if (!this.$options.update) {
                return;
            }
            if (!this._updates) {
                this._updates = new Set();
                fastdom.read(() => {
                    if (this._connected) {
                        runUpdates.call(this, this._updates);
                    }
                    delete this._updates;
                });
            }
            this._updates.add(e.type || e);
        };
        UIkit.prototype._callWatches = function() {
            if (this._watch) {
                return;
            }
            const initial = !hasOwn(this, "_watch");
            this._watch = fastdom.read(() => {
                if (this._connected) {
                    runWatches.call(this, initial);
                }
                this._watch = null;
            });
        };
        function runUpdates(types) {
            for (const {
                read,
                write,
                events = []
            } of this.$options.update) {
                if (!types.has("update") && !events.some(type => types.has(type))) {
                    continue;
                }
                let result;
                if (read) {
                    result = read.call(this, this._data, types);
                    if (result && isPlainObject(result)) {
                        assign(this._data, result);
                    }
                }
                if (write && result !== false) {
                    fastdom.write(() => {
                        if (this._connected) {
                            write.call(this, this._data, types);
                        }
                    });
                }
            }
        }
        function runWatches(initial) {
            const {
                $options: {
                    computed
                }
            } = this;
            const values = {
                ...this._computed
            };
            this._computed = {};
            for (const key in computed) {
                const {
                    watch,
                    immediate
                } = computed[key];
                if (watch && (initial && immediate || hasOwn(values, key) && !isEqual(values[key], this[key]))) {
                    watch.call(this, this[key], values[key]);
                }
            }
        }
    }
    function stateAPI(UIkit) {
        let uid = 0;
        UIkit.prototype._init = function(options) {
            options = options || {};
            options.data = normalizeData(options, this.constructor.options);
            this.$options = mergeOptions(this.constructor.options, options, this);
            this.$el = null;
            this.$props = {};
            this._uid = uid++;
            this._initData();
            this._initMethods();
            this._initComputeds();
            this._callHook("created");
            if (options.el) {
                this.$mount(options.el);
            }
        };
        UIkit.prototype._initData = function() {
            const {
                data = {}
            } = this.$options;
            for (const key in data) {
                this.$props[key] = this[key] = data[key];
            }
        };
        UIkit.prototype._initMethods = function() {
            const {
                methods
            } = this.$options;
            if (methods) {
                for (const key in methods) {
                    this[key] = methods[key].bind(this);
                }
            }
        };
        UIkit.prototype._initComputeds = function() {
            const {
                computed
            } = this.$options;
            this._computed = {};
            if (computed) {
                for (const key in computed) {
                    registerComputed(this, key, computed[key]);
                }
            }
        };
        UIkit.prototype._initProps = function(props) {
            let key;
            props = props || getProps$1(this.$options);
            for (key in props) {
                if (!isUndefined(props[key])) {
                    this.$props[key] = props[key];
                }
            }
            const exclude = [ this.$options.computed, this.$options.methods ];
            for (key in this.$props) {
                if (key in props && notIn(exclude, key)) {
                    this[key] = this.$props[key];
                }
            }
        };
        UIkit.prototype._initEvents = function() {
            this._events = [];
            for (const event of this.$options.events || []) {
                if (hasOwn(event, "handler")) {
                    registerEvent(this, event);
                } else {
                    for (const key in event) {
                        registerEvent(this, event[key], key);
                    }
                }
            }
        };
        UIkit.prototype._unbindEvents = function() {
            this._events.forEach(unbind => unbind());
            delete this._events;
        };
        UIkit.prototype._initObservers = function() {
            this._observers = [ initPropsObserver(this), initChildListObserver(this) ];
        };
        UIkit.prototype.registerObserver = function() {
            this._observers.push(...arguments);
        };
        UIkit.prototype._disconnectObservers = function() {
            this._observers.forEach(observer => observer == null ? void 0 : observer.disconnect());
        };
    }
    function getProps$1(opts) {
        const data$1 = {};
        const {
            args = [],
            props = {},
            el,
            id
        } = opts;
        if (!props) {
            return data$1;
        }
        for (const key in props) {
            const prop = hyphenate(key);
            let value = data(el, prop);
            if (isUndefined(value)) {
                continue;
            }
            value = props[key] === Boolean && value === "" ? true : coerce$1(props[key], value);
            if (prop === "target" && startsWith(value, "_")) {
                continue;
            }
            data$1[key] = value;
        }
        const options = parseOptions(data(el, id), args);
        for (const key in options) {
            const prop = camelize(key);
            if (!isUndefined(props[prop])) {
                data$1[prop] = coerce$1(props[prop], options[key]);
            }
        }
        return data$1;
    }
    function registerComputed(component, key, cb) {
        Object.defineProperty(component, key, {
            enumerable: true,
            get() {
                const {
                    _computed,
                    $props,
                    $el
                } = component;
                if (!hasOwn(_computed, key)) {
                    _computed[key] = (cb.get || cb).call(component, $props, $el);
                }
                return _computed[key];
            },
            set(value) {
                const {
                    _computed
                } = component;
                _computed[key] = cb.set ? cb.set.call(component, value) : value;
                if (isUndefined(_computed[key])) {
                    delete _computed[key];
                }
            }
        });
    }
    function registerEvent(component, event, key) {
        if (!isPlainObject(event)) {
            event = {
                name: key,
                handler: event
            };
        }
        let {
            name,
            el,
            handler,
            capture,
            passive,
            delegate,
            filter,
            self
        } = event;
        el = isFunction(el) ? el.call(component) : el || component.$el;
        if (isArray(el)) {
            el.forEach(el => registerEvent(component, {
                ...event,
                el: el
            }, key));
            return;
        }
        if (!el || filter && !filter.call(component)) {
            return;
        }
        component._events.push(on(el, name, delegate ? isString(delegate) ? delegate : delegate.call(component) : null, isString(handler) ? component[handler] : handler.bind(component), {
            passive: passive,
            capture: capture,
            self: self
        }));
    }
    function notIn(options, key) {
        return options.every(arr => !arr || !hasOwn(arr, key));
    }
    function coerce$1(type, value) {
        if (type === Boolean) {
            return toBoolean(value);
        } else if (type === Number) {
            return toNumber(value);
        } else if (type === "list") {
            return toList(value);
        }
        return type ? type(value) : value;
    }
    function toList(value) {
        return isArray(value) ? value : isString(value) ? value.split(/,(?![^(]*\))/).map(value => isNumeric(value) ? toNumber(value) : toBoolean(value.trim())) : [ value ];
    }
    function normalizeData(_ref, _ref2) {
        let {
            data = {}
        } = _ref;
        let {
            args = [],
            props = {}
        } = _ref2;
        if (isArray(data)) {
            data = data.slice(0, args.length).reduce((data, value, index) => {
                if (isPlainObject(value)) {
                    assign(data, value);
                } else {
                    data[args[index]] = value;
                }
                return data;
            }, {});
        }
        for (const key in data) {
            if (isUndefined(data[key])) {
                delete data[key];
            } else if (props[key]) {
                data[key] = coerce$1(props[key], data[key]);
            }
        }
        return data;
    }
    function initChildListObserver(component) {
        let {
            el,
            computed
        } = component.$options;
        if (!computed) {
            return;
        }
        for (const key in computed) {
            if (computed[key].document) {
                el = el.ownerDocument;
                break;
            }
        }
        const observer = new MutationObserver(() => component._callWatches());
        observer.observe(el, {
            childList: true,
            subtree: true
        });
        return observer;
    }
    function initPropsObserver(component) {
        const {
            $options,
            $props
        } = component;
        const {
            id,
            attrs,
            props,
            el
        } = $options;
        if (!props || attrs === false) {
            return;
        }
        const attributes = isArray(attrs) ? attrs : Object.keys(props);
        const filter = attributes.map(key => hyphenate(key)).concat(id);
        const observer = new MutationObserver(records => {
            const data = getProps$1($options);
            if (records.some(_ref3 => {
                let {
                    attributeName
                } = _ref3;
                const prop = attributeName.replace("data-", "");
                return (prop === id ? attributes : [ camelize(prop), camelize(attributeName) ]).some(prop => !isUndefined(data[prop]) && data[prop] !== $props[prop]);
            })) {
                component.$reset();
            }
        });
        observer.observe(el, {
            attributes: true,
            attributeFilter: filter.concat(filter.map(key => "data-" + key))
        });
        return observer;
    }
    function instanceAPI(UIkit) {
        const DATA = UIkit.data;
        UIkit.prototype.$create = function(component, element, data) {
            return UIkit[component](element, data);
        };
        UIkit.prototype.$mount = function(el) {
            const {
                name
            } = this.$options;
            if (!el[DATA]) {
                el[DATA] = {};
            }
            if (el[DATA][name]) {
                return;
            }
            el[DATA][name] = this;
            this.$el = this.$options.el = this.$options.el || el;
            if (within(el, document)) {
                this._callConnected();
            }
        };
        UIkit.prototype.$reset = function() {
            this._callDisconnected();
            this._callConnected();
        };
        UIkit.prototype.$destroy = function(removeEl) {
            if (removeEl === void 0) {
                removeEl = false;
            }
            const {
                el,
                name
            } = this.$options;
            if (el) {
                this._callDisconnected();
            }
            this._callHook("destroy");
            if (!(el != null && el[DATA])) {
                return;
            }
            delete el[DATA][name];
            if (!isEmpty(el[DATA])) {
                delete el[DATA];
            }
            if (removeEl) {
                remove$1(this.$el);
            }
        };
        UIkit.prototype.$emit = function(e) {
            this._callUpdate(e);
        };
        UIkit.prototype.$update = function(element, e) {
            if (element === void 0) {
                element = this.$el;
            }
            UIkit.update(element, e);
        };
        UIkit.prototype.$getComponent = UIkit.getComponent;
        Object.defineProperty(UIkit.prototype, "$container", Object.getOwnPropertyDescriptor(UIkit, "container"));
    }
    const components$3 = {};
    function componentAPI(UIkit) {
        const {
            data: DATA,
            prefix: PREFIX
        } = UIkit;
        UIkit.component = function(name, options) {
            name = hyphenate(name);
            const id = PREFIX + name;
            if (!options) {
                if (isPlainObject(components$3[id])) {
                    components$3[id] = components$3["data-" + id] = UIkit.extend(components$3[id]);
                }
                return components$3[id];
            }
            name = camelize(name);
            UIkit[name] = function(element, data) {
                const component = UIkit.component(name);
                return component.options.functional ? new component({
                    data: isPlainObject(element) ? element : [ ...arguments ]
                }) : element ? $$(element).map(init)[0] : init();
                function init(element) {
                    const instance = UIkit.getComponent(element, name);
                    if (instance) {
                        if (data) {
                            instance.$destroy();
                        } else {
                            return instance;
                        }
                    }
                    return new component({
                        el: element,
                        data: data
                    });
                }
            };
            const opt = isPlainObject(options) ? {
                ...options
            } : options.options;
            opt.id = id;
            opt.name = name;
            opt.install == null ? void 0 : opt.install(UIkit, opt, name);
            if (UIkit._initialized && !opt.functional) {
                requestAnimationFrame(() => UIkit[name]("[" + id + "],[data-" + id + "]"));
            }
            return components$3[id] = components$3["data-" + id] = isPlainObject(options) ? opt : options;
        };
        UIkit.getComponents = element => (element == null ? void 0 : element[DATA]) || {};
        UIkit.getComponent = (element, name) => UIkit.getComponents(element)[name];
        UIkit.connect = node => {
            if (node[DATA]) {
                for (const name in node[DATA]) {
                    node[DATA][name]._callConnected();
                }
            }
            for (const attribute of node.getAttributeNames()) {
                const name = getComponentName(attribute);
                name && UIkit[name](node);
            }
        };
        UIkit.disconnect = node => {
            for (const name in node[DATA]) {
                node[DATA][name]._callDisconnected();
            }
        };
    }
    function getComponentName(attribute) {
        const cmp = components$3[attribute];
        return cmp && (isPlainObject(cmp) ? cmp : cmp.options).name;
    }
    const UIkit = function(options) {
        this._init(options);
    };
    UIkit.util = util;
    UIkit.data = "__uikit__";
    UIkit.prefix = "uk-";
    UIkit.options = {};
    UIkit.version = "3.15.12";
    globalAPI(UIkit);
    hooksAPI(UIkit);
    stateAPI(UIkit);
    componentAPI(UIkit);
    instanceAPI(UIkit);
    function boot(UIkit) {
        const {
            connect,
            disconnect
        } = UIkit;
        if (!inBrowser || !window.MutationObserver) {
            return;
        }
        requestAnimationFrame(function() {
            trigger(document, "uikit:init", UIkit);
            if (document.body) {
                apply(document.body, connect);
            }
            new MutationObserver(records => records.forEach(applyChildListMutation)).observe(document, {
                childList: true,
                subtree: true
            });
            new MutationObserver(records => records.forEach(applyAttributeMutation)).observe(document, {
                attributes: true,
                subtree: true
            });
            UIkit._initialized = true;
        });
        function applyChildListMutation(_ref) {
            let {
                addedNodes,
                removedNodes
            } = _ref;
            for (const node of addedNodes) {
                apply(node, connect);
            }
            for (const node of removedNodes) {
                apply(node, disconnect);
            }
        }
        function applyAttributeMutation(_ref2) {
            let {
                target,
                attributeName
            } = _ref2;
            const name = getComponentName(attributeName);
            if (name) {
                var _UIkit$getComponent;
                if (hasAttr(target, attributeName)) {
                    UIkit[name](target);
                    return;
                }
                (_UIkit$getComponent = UIkit.getComponent(target, name)) == null ? void 0 : _UIkit$getComponent.$destroy();
            }
        }
    }
    var Class = {
        connected() {
            addClass(this.$el, this.$options.id);
        }
    };
    var Lazyload = {
        data: {
            preload: 5
        },
        methods: {
            lazyload(observeTargets, targets) {
                if (observeTargets === void 0) {
                    observeTargets = this.$el;
                }
                if (targets === void 0) {
                    targets = this.$el;
                }
                this.registerObserver(observeIntersection(observeTargets, (entries, observer) => {
                    for (const el of toNodes(isFunction(targets) ? targets() : targets)) {
                        $$('[loading="lazy"]', el).slice(0, this.preload - 1).forEach(el => removeAttr(el, "loading"));
                    }
                    for (const el of entries.filter(_ref => {
                        let {
                            isIntersecting
                        } = _ref;
                        return isIntersecting;
                    }).map(_ref2 => {
                        let {
                            target
                        } = _ref2;
                        return target;
                    })) {
                        observer.unobserve(el);
                    }
                }));
            }
        }
    };
    var Togglable = {
        props: {
            cls: Boolean,
            animation: "list",
            duration: Number,
            velocity: Number,
            origin: String,
            transition: String
        },
        data: {
            cls: false,
            animation: [ false ],
            duration: 200,
            velocity: .2,
            origin: false,
            transition: "ease",
            clsEnter: "uk-togglabe-enter",
            clsLeave: "uk-togglabe-leave"
        },
        computed: {
            hasAnimation(_ref) {
                let {
                    animation
                } = _ref;
                return !!animation[0];
            },
            hasTransition(_ref2) {
                let {
                    animation
                } = _ref2;
                return [ "slide", "reveal" ].some(transition => startsWith(animation[0], transition));
            }
        },
        methods: {
            toggleElement(targets, toggle, animate) {
                return new Promise(resolve => Promise.all(toNodes(targets).map(el => {
                    const show = isBoolean(toggle) ? toggle : !this.isToggled(el);
                    if (!trigger(el, "before" + (show ? "show" : "hide"), [ this ])) {
                        return Promise.reject();
                    }
                    const promise = (isFunction(animate) ? animate : animate === false || !this.hasAnimation ? toggleInstant : this.hasTransition ? toggleTransition : toggleAnimation)(el, show, this);
                    const cls = show ? this.clsEnter : this.clsLeave;
                    addClass(el, cls);
                    trigger(el, show ? "show" : "hide", [ this ]);
                    const done = () => {
                        removeClass(el, cls);
                        trigger(el, show ? "shown" : "hidden", [ this ]);
                    };
                    return promise ? promise.then(done, () => {
                        removeClass(el, cls);
                        return Promise.reject();
                    }) : done();
                })).then(resolve, noop));
            },
            isToggled(el) {
                if (el === void 0) {
                    el = this.$el;
                }
                [ el ] = toNodes(el);
                return hasClass(el, this.clsEnter) ? true : hasClass(el, this.clsLeave) ? false : this.cls ? hasClass(el, this.cls.split(" ")[0]) : isVisible(el);
            },
            _toggle(el, toggled) {
                if (!el) {
                    return;
                }
                toggled = Boolean(toggled);
                let changed;
                if (this.cls) {
                    changed = includes(this.cls, " ") || toggled !== hasClass(el, this.cls);
                    changed && toggleClass(el, this.cls, includes(this.cls, " ") ? undefined : toggled);
                } else {
                    changed = toggled === el.hidden;
                    changed && (el.hidden = !toggled);
                }
                $$("[autofocus]", el).some(el => isVisible(el) ? el.focus() || true : el.blur());
                if (changed) {
                    trigger(el, "toggled", [ toggled, this ]);
                }
            }
        }
    };
    function toggleInstant(el, show, _ref3) {
        let {
            _toggle
        } = _ref3;
        Animation.cancel(el);
        Transition.cancel(el);
        return _toggle(el, show);
    }
    async function toggleTransition(el, show, _ref4) {
        var _animation$;
        let {
            animation,
            duration,
            velocity,
            transition,
            _toggle
        } = _ref4;
        const [ mode = "reveal", startProp = "top" ] = ((_animation$ = animation[0]) == null ? void 0 : _animation$.split("-")) || [];
        const dirs = [ [ "left", "right" ], [ "top", "bottom" ] ];
        const dir = dirs[includes(dirs[0], startProp) ? 0 : 1];
        const end = dir[1] === startProp;
        const props = [ "width", "height" ];
        const dimProp = props[dirs.indexOf(dir)];
        const marginProp = "margin-" + dir[0];
        const marginStartProp = "margin-" + startProp;
        let currentDim = dimensions$1(el)[dimProp];
        const inProgress = Transition.inProgress(el);
        await Transition.cancel(el);
        if (show) {
            _toggle(el, true);
        }
        const prevProps = Object.fromEntries([ "padding", "border", "width", "height", "minWidth", "minHeight", "overflowY", "overflowX", marginProp, marginStartProp ].map(key => [ key, el.style[key] ]));
        const dim = dimensions$1(el);
        const currentMargin = toFloat(css(el, marginProp));
        const marginStart = toFloat(css(el, marginStartProp));
        const endDim = dim[dimProp] + marginStart;
        if (!inProgress && !show) {
            currentDim += marginStart;
        }
        const [ wrapper ] = wrapInner(el, "<div>");
        css(wrapper, {
            boxSizing: "border-box",
            height: dim.height,
            width: dim.width,
            ...css(el, [ "overflow", "padding", "borderTop", "borderRight", "borderBottom", "borderLeft", "borderImage", marginStartProp ])
        });
        css(el, {
            padding: 0,
            border: 0,
            minWidth: 0,
            minHeight: 0,
            [marginStartProp]: 0,
            width: dim.width,
            height: dim.height,
            overflow: "hidden",
            [dimProp]: currentDim
        });
        const percent = currentDim / endDim;
        duration = (velocity * endDim + duration) * (show ? 1 - percent : percent);
        const endProps = {
            [dimProp]: show ? endDim : 0
        };
        if (end) {
            css(el, marginProp, endDim - currentDim + currentMargin);
            endProps[marginProp] = show ? currentMargin : endDim + currentMargin;
        }
        if (!end ^ mode === "reveal") {
            css(wrapper, marginProp, -endDim + currentDim);
            Transition.start(wrapper, {
                [marginProp]: show ? 0 : -endDim
            }, duration, transition);
        }
        try {
            await Transition.start(el, endProps, duration, transition);
        } finally {
            css(el, prevProps);
            unwrap(wrapper.firstChild);
            if (!show) {
                _toggle(el, false);
            }
        }
    }
    function toggleAnimation(el, show, cmp) {
        Animation.cancel(el);
        const {
            animation,
            duration,
            _toggle
        } = cmp;
        if (show) {
            _toggle(el, true);
            return Animation.in(el, animation[0], duration, cmp.origin);
        }
        return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(() => _toggle(el, false));
    }
    var Accordion = {
        mixins: [ Class, Lazyload, Togglable ],
        props: {
            animation: Boolean,
            targets: String,
            active: null,
            collapsible: Boolean,
            multiple: Boolean,
            toggle: String,
            content: String,
            offset: Number
        },
        data: {
            targets: "> *",
            active: false,
            animation: true,
            collapsible: true,
            multiple: false,
            clsOpen: "uk-open",
            toggle: "> .uk-accordion-title",
            content: "> .uk-accordion-content",
            offset: 0
        },
        computed: {
            items: {
                get(_ref, $el) {
                    let {
                        targets
                    } = _ref;
                    return $$(targets, $el);
                },
                watch(items, prev) {
                    if (prev || hasClass(items, this.clsOpen)) {
                        return;
                    }
                    const active = this.active !== false && items[Number(this.active)] || !this.collapsible && items[0];
                    if (active) {
                        this.toggle(active, false);
                    }
                },
                immediate: true
            },
            toggles(_ref2) {
                let {
                    toggle
                } = _ref2;
                return this.items.map(item => $(toggle, item));
            },
            contents: {
                get(_ref3) {
                    let {
                        content
                    } = _ref3;
                    return this.items.map(item => $(content, item));
                },
                watch(items) {
                    for (const el of items) {
                        hide(el, !hasClass(this.items.find(item => within(el, item)), this.clsOpen));
                    }
                },
                immediate: true
            }
        },
        connected() {
            this.lazyload();
        },
        events: [ {
            name: "click",
            delegate() {
                return this.targets + " " + this.$props.toggle;
            },
            async handler(e) {
                var _this$_off;
                e.preventDefault();
                (_this$_off = this._off) == null ? void 0 : _this$_off.call(this);
                this._off = keepScrollPosition(e.target);
                await this.toggle(index(this.toggles, e.current));
                this._off();
            }
        } ],
        methods: {
            async toggle(item, animate) {
                item = this.items[getIndex(item, this.items)];
                let items = [ item ];
                const activeItems = filter$1(this.items, "." + this.clsOpen);
                if (!this.multiple && !includes(activeItems, items[0])) {
                    items = items.concat(activeItems);
                }
                if (!this.collapsible && activeItems.length < 2 && includes(activeItems, item)) {
                    return;
                }
                await Promise.all(items.map(el => this.toggleElement(el, !includes(activeItems, el), (el, show) => {
                    toggleClass(el, this.clsOpen, show);
                    attr($(this.$props.toggle, el), "aria-expanded", show);
                    if (animate === false || !this.animation) {
                        hide($(this.content, el), !show);
                        return;
                    }
                    return transition(el, show, this);
                })));
            }
        }
    };
    function hide(el, hide) {
        el && (el.hidden = hide);
    }
    async function transition(el, show, _ref4) {
        var _el$_wrapper;
        let {
            content,
            duration,
            velocity,
            transition
        } = _ref4;
        content = ((_el$_wrapper = el._wrapper) == null ? void 0 : _el$_wrapper.firstElementChild) || $(content, el);
        if (!el._wrapper) {
            el._wrapper = wrapAll(content, "<div>");
        }
        const wrapper = el._wrapper;
        css(wrapper, "overflow", "hidden");
        const currentHeight = toFloat(css(wrapper, "height"));
        await Transition.cancel(wrapper);
        hide(content, false);
        const endHeight = toFloat(css(content, "height")) + toFloat(css(content, "marginTop")) + toFloat(css(content, "marginBottom"));
        const percent = currentHeight / endHeight;
        duration = (velocity * endHeight + duration) * (show ? 1 - percent : percent);
        css(wrapper, "height", currentHeight);
        await Transition.start(wrapper, {
            height: show ? endHeight : 0
        }, duration, transition);
        unwrap(content);
        delete el._wrapper;
        if (!show) {
            hide(content, true);
        }
    }
    function keepScrollPosition(el) {
        const scrollParent = scrollParents(el)[0];
        let frame;
        (function scroll() {
            frame = requestAnimationFrame(() => {
                const {
                    top
                } = el.getBoundingClientRect();
                if (top < 0) {
                    scrollParent.scrollTop += top;
                }
                scroll();
            });
        })();
        return () => requestAnimationFrame(() => cancelAnimationFrame(frame));
    }
    var alert = {
        mixins: [ Class, Togglable ],
        args: "animation",
        props: {
            animation: Boolean,
            close: String
        },
        data: {
            animation: true,
            selClose: ".uk-alert-close",
            duration: 150
        },
        events: {
            name: "click",
            delegate() {
                return this.selClose;
            },
            handler(e) {
                e.preventDefault();
                this.close();
            }
        },
        methods: {
            async close() {
                await this.toggleElement(this.$el, false, animate$1);
                this.$destroy(true);
            }
        }
    };
    function animate$1(el, show, _ref) {
        let {
            duration,
            transition,
            velocity
        } = _ref;
        const height = toFloat(css(el, "height"));
        css(el, "height", height);
        return Transition.start(el, {
            height: 0,
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
            borderTop: 0,
            borderBottom: 0,
            opacity: 0
        }, velocity * height + duration, transition);
    }
    var Video = {
        args: "autoplay",
        props: {
            automute: Boolean,
            autoplay: Boolean
        },
        data: {
            automute: false,
            autoplay: true
        },
        connected() {
            this.inView = this.autoplay === "inview";
            if (this.inView && !hasAttr(this.$el, "preload")) {
                this.$el.preload = "none";
            }
            if (isTag(this.$el, "iframe") && !hasAttr(this.$el, "allow")) {
                this.$el.allow = "autoplay";
            }
            if (this.automute) {
                mute(this.$el);
            }
            this.registerObserver(observeIntersection(this.$el, () => this.$emit(), {}, false));
        },
        update: {
            read(_ref) {
                let {
                    visible
                } = _ref;
                if (!isVideo(this.$el)) {
                    return false;
                }
                return {
                    prev: visible,
                    visible: isVisible(this.$el) && css(this.$el, "visibility") !== "hidden",
                    inView: this.inView && isInView(this.$el)
                };
            },
            write(_ref2) {
                let {
                    prev,
                    visible,
                    inView
                } = _ref2;
                if (!visible || this.inView && !inView) {
                    pause(this.$el);
                } else if (this.autoplay === true && !prev || this.inView && inView) {
                    play(this.$el);
                }
            }
        }
    };
    var Resize = {
        connected() {
            var _this$$options$resize;
            this.registerObserver(observeResize(((_this$$options$resize = this.$options.resizeTargets) == null ? void 0 : _this$$options$resize.call(this)) || this.$el, () => this.$emit("resize")));
        }
    };
    var cover = {
        mixins: [ Resize, Video ],
        props: {
            width: Number,
            height: Number
        },
        data: {
            automute: true
        },
        events: {
            "load loadedmetadata"() {
                this.$emit("resize");
            }
        },
        resizeTargets() {
            return [ this.$el, getPositionedParent(this.$el) || parent(this.$el) ];
        },
        update: {
            read() {
                const {
                    ratio,
                    cover
                } = Dimensions;
                const {
                    $el,
                    width,
                    height
                } = this;
                let dim = {
                    width: width,
                    height: height
                };
                if (!dim.width || !dim.height) {
                    const intrinsic = {
                        width: $el.naturalWidth || $el.videoWidth || $el.clientWidth,
                        height: $el.naturalHeight || $el.videoHeight || $el.clientHeight
                    };
                    if (dim.width) {
                        dim = ratio(intrinsic, "width", dim.width);
                    } else if (height) {
                        dim = ratio(intrinsic, "height", dim.height);
                    } else {
                        dim = intrinsic;
                    }
                }
                const {
                    offsetHeight: coverHeight,
                    offsetWidth: coverWidth
                } = getPositionedParent($el) || parent($el);
                const coverDim = cover(dim, {
                    width: coverWidth + (coverWidth % 2 ? 1 : 0),
                    height: coverHeight + (coverHeight % 2 ? 1 : 0)
                });
                if (!coverDim.width || !coverDim.height) {
                    return false;
                }
                return coverDim;
            },
            write(_ref) {
                let {
                    height,
                    width
                } = _ref;
                css(this.$el, {
                    height: height,
                    width: width
                });
            },
            events: [ "resize" ]
        }
    };
    function getPositionedParent(el) {
        while (el = parent(el)) {
            if (css(el, "position") !== "static") {
                return el;
            }
        }
    }
    var Container = {
        props: {
            container: Boolean
        },
        data: {
            container: true
        },
        computed: {
            container(_ref) {
                let {
                    container
                } = _ref;
                return container === true && this.$container || container && $(container);
            }
        }
    };
    var Position = {
        props: {
            pos: String,
            offset: null,
            flip: Boolean,
            shift: Boolean,
            inset: Boolean
        },
        data: {
            pos: "bottom-" + (isRtl ? "right" : "left"),
            offset: false,
            flip: true,
            shift: true,
            inset: false
        },
        connected() {
            this.pos = this.$props.pos.split("-").concat("center").slice(0, 2);
            [ this.dir, this.align ] = this.pos;
            this.axis = includes([ "top", "bottom" ], this.dir) ? "y" : "x";
        },
        methods: {
            positionAt(element, target, boundary) {
                let offset = [ this.getPositionOffset(element), this.getShiftOffset(element) ];
                const placement = [ this.flip && "flip", this.shift && "shift" ];
                const attach = {
                    element: [ this.inset ? this.dir : flipPosition(this.dir), this.align ],
                    target: [ this.dir, this.align ]
                };
                if (this.axis === "y") {
                    for (const prop in attach) {
                        attach[prop].reverse();
                    }
                    offset.reverse();
                    placement.reverse();
                }
                const [ scrollElement ] = scrollParents(element, /auto|scroll/);
                const {
                    scrollTop,
                    scrollLeft
                } = scrollElement;
                const elDim = dimensions$1(element);
                css(element, {
                    top: -elDim.height,
                    left: -elDim.width
                });
                positionAt(element, target, {
                    attach: attach,
                    offset: offset,
                    boundary: boundary,
                    placement: placement,
                    viewportOffset: this.getViewportOffset(element)
                });
                scrollElement.scrollTop = scrollTop;
                scrollElement.scrollLeft = scrollLeft;
            },
            getPositionOffset(element) {
                return toPx(this.offset === false ? css(element, "--uk-position-offset") : this.offset, this.axis === "x" ? "width" : "height", element) * (includes([ "left", "top" ], this.dir) ? -1 : 1) * (this.inset ? -1 : 1);
            },
            getShiftOffset(element) {
                return this.align === "center" ? 0 : toPx(css(element, "--uk-position-shift-offset"), this.axis === "y" ? "width" : "height", element) * (includes([ "left", "top" ], this.align) ? 1 : -1);
            },
            getViewportOffset(element) {
                return toPx(css(element, "--uk-position-viewport-offset"));
            }
        }
    };
    var Style = {
        beforeConnect() {
            this._style = attr(this.$el, "style");
        },
        disconnected() {
            attr(this.$el, "style", this._style);
        }
    };
    const active$1 = [];
    var Modal = {
        mixins: [ Class, Container, Togglable ],
        props: {
            selPanel: String,
            selClose: String,
            escClose: Boolean,
            bgClose: Boolean,
            stack: Boolean
        },
        data: {
            cls: "uk-open",
            escClose: true,
            bgClose: true,
            overlay: true,
            stack: false
        },
        computed: {
            panel(_ref, $el) {
                let {
                    selPanel
                } = _ref;
                return $(selPanel, $el);
            },
            transitionElement() {
                return this.panel;
            },
            bgClose(_ref2) {
                let {
                    bgClose
                } = _ref2;
                return bgClose && this.panel;
            }
        },
        beforeDisconnect() {
            if (includes(active$1, this)) {
                this.toggleElement(this.$el, false, false);
            }
        },
        events: [ {
            name: "click",
            delegate() {
                return this.selClose;
            },
            handler(e) {
                e.preventDefault();
                this.hide();
            }
        }, {
            name: "click",
            delegate() {
                return 'a[href*="#"]';
            },
            handler(_ref3) {
                let {
                    current,
                    defaultPrevented
                } = _ref3;
                const {
                    hash
                } = current;
                if (!defaultPrevented && hash && isSameSiteAnchor(current) && !within(hash, this.$el) && $(hash, document.body)) {
                    this.hide();
                }
            }
        }, {
            name: "toggle",
            self: true,
            handler(e) {
                if (e.defaultPrevented) {
                    return;
                }
                e.preventDefault();
                if (this.isToggled() === includes(active$1, this)) {
                    this.toggle();
                }
            }
        }, {
            name: "beforeshow",
            self: true,
            handler(e) {
                if (includes(active$1, this)) {
                    return false;
                }
                if (!this.stack && active$1.length) {
                    Promise.all(active$1.map(modal => modal.hide())).then(this.show);
                    e.preventDefault();
                } else {
                    active$1.push(this);
                }
            }
        }, {
            name: "show",
            self: true,
            handler() {
                once(this.$el, "hide", on(document, "focusin", e => {
                    if (last(active$1) === this && !within(e.target, this.$el)) {
                        this.$el.focus();
                    }
                }));
                if (this.overlay) {
                    once(this.$el, "hidden", preventOverscroll(this.$el), {
                        self: true
                    });
                    once(this.$el, "hidden", preventBackgroundScroll(), {
                        self: true
                    });
                }
                if (this.stack) {
                    css(this.$el, "zIndex", toFloat(css(this.$el, "zIndex")) + active$1.length);
                }
                addClass(document.documentElement, this.clsPage);
                if (this.bgClose) {
                    once(this.$el, "hide", on(document, pointerDown$1, _ref4 => {
                        let {
                            target
                        } = _ref4;
                        if (last(active$1) !== this || this.overlay && !within(target, this.$el) || within(target, this.panel)) {
                            return;
                        }
                        once(document, pointerUp$1 + " " + pointerCancel + " scroll", _ref5 => {
                            let {
                                defaultPrevented,
                                type,
                                target: newTarget
                            } = _ref5;
                            if (!defaultPrevented && type === pointerUp$1 && target === newTarget) {
                                this.hide();
                            }
                        }, true);
                    }), {
                        self: true
                    });
                }
                if (this.escClose) {
                    once(this.$el, "hide", on(document, "keydown", e => {
                        if (e.keyCode === 27 && last(active$1) === this) {
                            this.hide();
                        }
                    }), {
                        self: true
                    });
                }
            }
        }, {
            name: "shown",
            self: true,
            handler() {
                if (!isFocusable(this.$el)) {
                    attr(this.$el, "tabindex", "-1");
                }
                if (!$(":focus", this.$el)) {
                    this.$el.focus();
                }
            }
        }, {
            name: "hidden",
            self: true,
            handler() {
                if (includes(active$1, this)) {
                    active$1.splice(active$1.indexOf(this), 1);
                }
                css(this.$el, "zIndex", "");
                if (!active$1.some(modal => modal.clsPage === this.clsPage)) {
                    removeClass(document.documentElement, this.clsPage);
                }
            }
        } ],
        methods: {
            toggle() {
                return this.isToggled() ? this.hide() : this.show();
            },
            show() {
                if (this.container && parent(this.$el) !== this.container) {
                    append(this.container, this.$el);
                    return new Promise(resolve => requestAnimationFrame(() => this.show().then(resolve)));
                }
                return this.toggleElement(this.$el, true, animate);
            },
            hide() {
                return this.toggleElement(this.$el, false, animate);
            }
        }
    };
    function animate(el, show, _ref6) {
        let {
            transitionElement,
            _toggle
        } = _ref6;
        return new Promise((resolve, reject) => once(el, "show hide", () => {
            el._reject == null ? void 0 : el._reject();
            el._reject = reject;
            _toggle(el, show);
            const off = once(transitionElement, "transitionstart", () => {
                once(transitionElement, "transitionend transitioncancel", resolve, {
                    self: true
                });
                clearTimeout(timer);
            }, {
                self: true
            });
            const timer = setTimeout(() => {
                off();
                resolve();
            }, toMs(css(transitionElement, "transitionDuration")));
        })).then(() => delete el._reject);
    }
    function toMs(time) {
        return time ? endsWith(time, "ms") ? toFloat(time) : toFloat(time) * 1e3 : 0;
    }
    function preventOverscroll(el) {
        if (CSS.supports("overscroll-behavior", "contain")) {
            const elements = filterChildren(el, child => /auto|scroll/.test(css(child, "overflow")));
            css(elements, "overscrollBehavior", "contain");
            return () => css(elements, "overscrollBehavior", "");
        }
        let startClientY;
        const events = [ on(el, "touchstart", _ref7 => {
            let {
                targetTouches
            } = _ref7;
            if (targetTouches.length === 1) {
                startClientY = targetTouches[0].clientY;
            }
        }, {
            passive: true
        }), on(el, "touchmove", e => {
            if (e.targetTouches.length !== 1) {
                return;
            }
            let [ scrollParent ] = scrollParents(e.target, /auto|scroll/);
            if (!within(scrollParent, el)) {
                scrollParent = el;
            }
            const clientY = e.targetTouches[0].clientY - startClientY;
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = scrollParent;
            if (clientHeight >= scrollHeight || scrollTop === 0 && clientY > 0 || scrollHeight - scrollTop <= clientHeight && clientY < 0) {
                e.cancelable && e.preventDefault();
            }
        }, {
            passive: false
        }) ];
        return () => events.forEach(fn => fn());
    }
    let prevented;
    function preventBackgroundScroll() {
        if (prevented) {
            return noop;
        }
        prevented = true;
        const {
            scrollingElement
        } = document;
        css(scrollingElement, {
            overflowY: "hidden",
            touchAction: "none",
            paddingRight: width(window) - scrollingElement.clientWidth
        });
        return () => {
            prevented = false;
            css(scrollingElement, {
                overflowY: "",
                touchAction: "",
                paddingRight: ""
            });
        };
    }
    function filterChildren(el, fn) {
        const children = [];
        apply(el, node => {
            if (fn(node)) {
                children.push(node);
            }
        });
        return children;
    }
    function isSameSiteAnchor(a) {
        return [ "origin", "pathname", "search" ].every(part => a[part] === location[part]);
    }
    let active;
    var drop = {
        mixins: [ Container, Lazyload, Position, Style, Togglable ],
        args: "pos",
        props: {
            mode: "list",
            toggle: Boolean,
            boundary: Boolean,
            boundaryX: Boolean,
            boundaryY: Boolean,
            target: Boolean,
            targetX: Boolean,
            targetY: Boolean,
            stretch: Boolean,
            delayShow: Number,
            delayHide: Number,
            autoUpdate: Boolean,
            clsDrop: String,
            animateOut: Boolean,
            bgScroll: Boolean
        },
        data: {
            mode: [ "click", "hover" ],
            toggle: "- *",
            boundary: false,
            boundaryX: false,
            boundaryY: false,
            target: false,
            targetX: false,
            targetY: false,
            stretch: false,
            delayShow: 0,
            delayHide: 800,
            autoUpdate: true,
            clsDrop: false,
            animateOut: false,
            bgScroll: true,
            animation: [ "uk-animation-fade" ],
            cls: "uk-open",
            container: false
        },
        computed: {
            boundary(_ref, $el) {
                let {
                    boundary,
                    boundaryX,
                    boundaryY
                } = _ref;
                return [ query(boundaryX || boundary, $el) || window, query(boundaryY || boundary, $el) || window ];
            },
            target(_ref2, $el) {
                let {
                    target,
                    targetX,
                    targetY
                } = _ref2;
                targetX = targetX || target || this.targetEl;
                targetY = targetY || target || this.targetEl;
                return [ targetX === true ? window : query(targetX, $el), targetY === true ? window : query(targetY, $el) ];
            }
        },
        created() {
            this.tracker = new MouseTracker();
        },
        beforeConnect() {
            this.clsDrop = this.$props.clsDrop || "uk-" + this.$options.name;
        },
        connected() {
            addClass(this.$el, this.clsDrop);
            if (this.toggle && !this.targetEl) {
                this.targetEl = this.$create("toggle", query(this.toggle, this.$el), {
                    target: this.$el,
                    mode: this.mode
                }).$el;
                attr(this.targetEl, "aria-haspopup", true);
                this.lazyload(this.targetEl);
            }
        },
        disconnected() {
            if (this.isActive()) {
                this.hide(false);
                active = null;
            }
        },
        events: [ {
            name: "click",
            delegate() {
                return "." + this.clsDrop + "-close";
            },
            handler(e) {
                e.preventDefault();
                this.hide(false);
            }
        }, {
            name: "click",
            delegate() {
                return 'a[href*="#"]';
            },
            handler(_ref3) {
                let {
                    defaultPrevented,
                    current
                } = _ref3;
                const {
                    hash
                } = current;
                if (!defaultPrevented && hash && isSameSiteAnchor(current) && !within(hash, this.$el)) {
                    this.hide(false);
                }
            }
        }, {
            name: "beforescroll",
            handler() {
                this.hide(false);
            }
        }, {
            name: "toggle",
            self: true,
            handler(e, toggle) {
                e.preventDefault();
                if (this.isToggled()) {
                    this.hide(false);
                } else {
                    this.show(toggle == null ? void 0 : toggle.$el, false);
                }
            }
        }, {
            name: "toggleshow",
            self: true,
            handler(e, toggle) {
                e.preventDefault();
                this.show(toggle == null ? void 0 : toggle.$el);
            }
        }, {
            name: "togglehide",
            self: true,
            handler(e) {
                e.preventDefault();
                if (!matches(this.$el, ":focus,:hover")) {
                    this.hide();
                }
            }
        }, {
            name: pointerEnter + " focusin",
            filter() {
                return includes(this.mode, "hover");
            },
            handler(e) {
                if (!isTouch(e)) {
                    this.clearTimers();
                }
            }
        }, {
            name: pointerLeave + " focusout",
            filter() {
                return includes(this.mode, "hover");
            },
            handler(e) {
                if (!isTouch(e) && e.relatedTarget) {
                    this.hide();
                }
            }
        }, {
            name: "toggled",
            self: true,
            handler(e, toggled) {
                if (!toggled) {
                    return;
                }
                this.clearTimers();
                this.position();
            }
        }, {
            name: "show",
            self: true,
            handler() {
                active = this;
                this.tracker.init();
                const update = () => this.$emit();
                const handlers = [ on(document, pointerDown$1, _ref4 => {
                    let {
                        target
                    } = _ref4;
                    return !within(target, this.$el) && once(document, pointerUp$1 + " " + pointerCancel + " scroll", _ref5 => {
                        let {
                            defaultPrevented,
                            type,
                            target: newTarget
                        } = _ref5;
                        if (!defaultPrevented && type === pointerUp$1 && target === newTarget && !(this.targetEl && within(target, this.targetEl))) {
                            this.hide(false);
                        }
                    }, true);
                }), on(document, "keydown", e => {
                    if (e.keyCode === 27) {
                        this.hide(false);
                    }
                }), on(window, "resize", update), (() => {
                    const observer = observeResize(scrollParents(this.$el).concat(this.target), update);
                    return () => observer.disconnect();
                })(), ...this.autoUpdate ? [ on([ document, scrollParents(this.$el) ], "scroll", update, {
                    passive: true
                }) ] : [], ...this.bgScroll ? [] : [ preventOverscroll(this.$el), preventBackgroundScroll() ] ];
                once(this.$el, "hide", () => handlers.forEach(handler => handler()), {
                    self: true
                });
            }
        }, {
            name: "beforehide",
            self: true,
            handler() {
                this.clearTimers();
            }
        }, {
            name: "hide",
            handler(_ref6) {
                let {
                    target
                } = _ref6;
                if (this.$el !== target) {
                    active = active === null && within(target, this.$el) && this.isToggled() ? this : active;
                    return;
                }
                active = this.isActive() ? null : active;
                this.tracker.cancel();
            }
        } ],
        update: {
            write() {
                if (this.isToggled() && !hasClass(this.$el, this.clsEnter)) {
                    this.position();
                }
            }
        },
        methods: {
            show(target, delay) {
                if (target === void 0) {
                    target = this.targetEl;
                }
                if (delay === void 0) {
                    delay = true;
                }
                if (this.isToggled() && target && this.targetEl && target !== this.targetEl) {
                    this.hide(false, false);
                }
                this.targetEl = target;
                this.clearTimers();
                if (this.isActive()) {
                    return;
                }
                if (active) {
                    if (delay && active.isDelaying) {
                        this.showTimer = setTimeout(() => matches(target, ":hover") && this.show(), 10);
                        return;
                    }
                    let prev;
                    while (active && prev !== active && !within(this.$el, active.$el)) {
                        prev = active;
                        active.hide(false, false);
                    }
                }
                if (this.container && parent(this.$el) !== this.container) {
                    append(this.container, this.$el);
                }
                this.showTimer = setTimeout(() => this.toggleElement(this.$el, true), delay && this.delayShow || 0);
            },
            hide(delay, animate) {
                if (delay === void 0) {
                    delay = true;
                }
                if (animate === void 0) {
                    animate = true;
                }
                const hide = () => this.toggleElement(this.$el, false, this.animateOut && animate);
                this.clearTimers();
                this.isDelaying = getPositionedElements(this.$el).some(el => this.tracker.movesTo(el));
                if (delay && this.isDelaying) {
                    this.hideTimer = setTimeout(this.hide, 50);
                } else if (delay && this.delayHide) {
                    this.hideTimer = setTimeout(hide, this.delayHide);
                } else {
                    hide();
                }
            },
            clearTimers() {
                clearTimeout(this.showTimer);
                clearTimeout(this.hideTimer);
                this.showTimer = null;
                this.hideTimer = null;
                this.isDelaying = false;
            },
            isActive() {
                return active === this;
            },
            position() {
                removeClass(this.$el, this.clsDrop + "-stack");
                attr(this.$el, "style", this._style);
                this.$el.hidden = true;
                const viewports = this.target.map(target => getViewport$1(this.$el, target));
                const viewportOffset = this.getViewportOffset(this.$el);
                const dirs = [ [ 0, [ "x", "width", "left", "right" ] ], [ 1, [ "y", "height", "top", "bottom" ] ] ];
                for (const [ i, [ axis, prop ] ] of dirs) {
                    if (this.axis !== axis && includes([ axis, true ], this.stretch)) {
                        css(this.$el, {
                            [prop]: Math.min(offset(this.boundary[i])[prop], viewports[i][prop] - 2 * viewportOffset),
                            ["overflow-" + axis]: "auto"
                        });
                    }
                }
                const maxWidth = viewports[0].width - 2 * viewportOffset;
                if (this.$el.offsetWidth > maxWidth) {
                    addClass(this.$el, this.clsDrop + "-stack");
                }
                css(this.$el, "maxWidth", maxWidth);
                this.$el.hidden = false;
                this.positionAt(this.$el, this.target, this.boundary);
                for (const [ i, [ axis, prop, start, end ] ] of dirs) {
                    if (this.axis === axis && includes([ axis, true ], this.stretch)) {
                        const positionOffset = Math.abs(this.getPositionOffset(this.$el));
                        const targetOffset = offset(this.target[i]);
                        const elOffset = offset(this.$el);
                        css(this.$el, {
                            [prop]: (targetOffset[start] > elOffset[start] ? targetOffset[start] - Math.max(offset(this.boundary[i])[start], viewports[i][start] + viewportOffset) : Math.min(offset(this.boundary[i])[end], viewports[i][end] - viewportOffset) - targetOffset[end]) - positionOffset,
                            ["overflow-" + axis]: "auto"
                        });
                        this.positionAt(this.$el, this.target, this.boundary);
                    }
                }
            }
        }
    };
    function getPositionedElements(el) {
        const result = [];
        apply(el, el => css(el, "position") !== "static" && result.push(el));
        return result;
    }
    function getViewport$1(el, target) {
        return offsetViewport(scrollParents(target).find(parent => within(el, parent)));
    }
    var formCustom = {
        mixins: [ Class ],
        args: "target",
        props: {
            target: Boolean
        },
        data: {
            target: false
        },
        computed: {
            input(_, $el) {
                return $(selInput, $el);
            },
            state() {
                return this.input.nextElementSibling;
            },
            target(_ref, $el) {
                let {
                    target
                } = _ref;
                return target && (target === true && parent(this.input) === $el && this.input.nextElementSibling || $(target, $el));
            }
        },
        update() {
            var _input$files;
            const {
                target,
                input
            } = this;
            if (!target) {
                return;
            }
            let option;
            const prop = isInput(target) ? "value" : "textContent";
            const prev = target[prop];
            const value = (_input$files = input.files) != null && _input$files[0] ? input.files[0].name : matches(input, "select") && (option = $$("option", input).filter(el => el.selected)[0]) ? option.textContent : input.value;
            if (prev !== value) {
                target[prop] = value;
            }
        },
        events: [ {
            name: "change",
            handler() {
                this.$emit();
            }
        }, {
            name: "reset",
            el() {
                return closest(this.$el, "form");
            },
            handler() {
                this.$emit();
            }
        } ]
    };
    var Margin = {
        mixins: [ Resize ],
        props: {
            margin: String,
            firstColumn: Boolean
        },
        data: {
            margin: "uk-margin-small-top",
            firstColumn: "uk-first-column"
        },
        resizeTargets() {
            return [ this.$el, ...toArray(this.$el.children) ];
        },
        connected() {
            this.registerObserver(observeMutation(this.$el, () => this.$reset(), {
                childList: true,
                attributes: true,
                attributeFilter: [ "style" ]
            }));
        },
        update: {
            read() {
                const rows = getRows(this.$el.children);
                return {
                    rows: rows,
                    columns: getColumns(rows)
                };
            },
            write(_ref) {
                let {
                    columns,
                    rows
                } = _ref;
                for (const row of rows) {
                    for (const column of row) {
                        toggleClass(column, this.margin, rows[0] !== row);
                        toggleClass(column, this.firstColumn, columns[0].includes(column));
                    }
                }
            },
            events: [ "resize" ]
        }
    };
    function getRows(items) {
        return sortBy(items, "top", "bottom");
    }
    function getColumns(rows) {
        const columns = [];
        for (const row of rows) {
            const sorted = sortBy(row, "left", "right");
            for (let j = 0; j < sorted.length; j++) {
                columns[j] = columns[j] ? columns[j].concat(sorted[j]) : sorted[j];
            }
        }
        return isRtl ? columns.reverse() : columns;
    }
    function sortBy(items, startProp, endProp) {
        const sorted = [ [] ];
        for (const el of items) {
            if (!isVisible(el)) {
                continue;
            }
            let dim = getOffset(el);
            for (let i = sorted.length - 1; i >= 0; i--) {
                const current = sorted[i];
                if (!current[0]) {
                    current.push(el);
                    break;
                }
                let startDim;
                if (current[0].offsetParent === el.offsetParent) {
                    startDim = getOffset(current[0]);
                } else {
                    dim = getOffset(el, true);
                    startDim = getOffset(current[0], true);
                }
                if (dim[startProp] >= startDim[endProp] - 1 && dim[startProp] !== startDim[startProp]) {
                    sorted.push([ el ]);
                    break;
                }
                if (dim[endProp] - 1 > startDim[startProp] || dim[startProp] === startDim[startProp]) {
                    current.push(el);
                    break;
                }
                if (i === 0) {
                    sorted.unshift([ el ]);
                    break;
                }
            }
        }
        return sorted;
    }
    function getOffset(element, offset) {
        if (offset === void 0) {
            offset = false;
        }
        let {
            offsetTop,
            offsetLeft,
            offsetHeight,
            offsetWidth
        } = element;
        if (offset) {
            [ offsetTop, offsetLeft ] = offsetPosition(element);
        }
        return {
            top: offsetTop,
            left: offsetLeft,
            bottom: offsetTop + offsetHeight,
            right: offsetLeft + offsetWidth
        };
    }
    var Scroll = {
        connected() {
            registerScrollListener(this._uid, () => this.$emit("scroll"));
        },
        disconnected() {
            unregisterScrollListener(this._uid);
        }
    };
    const scrollListeners = new Map();
    let unbindScrollListener;
    function registerScrollListener(id, listener) {
        unbindScrollListener = unbindScrollListener || on(window, "scroll", () => scrollListeners.forEach(listener => listener()), {
            passive: true,
            capture: true
        });
        scrollListeners.set(id, listener);
    }
    function unregisterScrollListener(id) {
        scrollListeners.delete(id);
        if (unbindScrollListener && !scrollListeners.size) {
            unbindScrollListener();
            unbindScrollListener = null;
        }
    }
    var grid = {
        extends: Margin,
        mixins: [ Class ],
        name: "grid",
        props: {
            masonry: Boolean,
            parallax: Number
        },
        data: {
            margin: "uk-grid-margin",
            clsStack: "uk-grid-stack",
            masonry: false,
            parallax: 0
        },
        connected() {
            this.masonry && addClass(this.$el, "uk-flex-top uk-flex-wrap-top");
            this.parallax && registerScrollListener(this._uid, () => this.$emit("scroll"));
        },
        disconnected() {
            unregisterScrollListener(this._uid);
        },
        update: [ {
            write(_ref) {
                let {
                    columns
                } = _ref;
                toggleClass(this.$el, this.clsStack, columns.length < 2);
            },
            events: [ "resize" ]
        }, {
            read(data) {
                let {
                    columns,
                    rows
                } = data;
                if (!columns.length || !this.masonry && !this.parallax || positionedAbsolute(this.$el)) {
                    data.translates = false;
                    return false;
                }
                let translates = false;
                const nodes = children(this.$el);
                const columnHeights = getColumnHeights(columns);
                const margin = getMarginTop(nodes, this.margin) * (rows.length - 1);
                const elHeight = Math.max(...columnHeights) + margin;
                if (this.masonry) {
                    columns = columns.map(column => sortBy$1(column, "offsetTop"));
                    translates = getTranslates(rows, columns);
                }
                let padding = Math.abs(this.parallax);
                if (padding) {
                    padding = columnHeights.reduce((newPadding, hgt, i) => Math.max(newPadding, hgt + margin + (i % 2 ? padding : padding / 8) - elHeight), 0);
                }
                return {
                    padding: padding,
                    columns: columns,
                    translates: translates,
                    height: translates ? elHeight : ""
                };
            },
            write(_ref2) {
                let {
                    height,
                    padding
                } = _ref2;
                css(this.$el, "paddingBottom", padding || "");
                height !== false && css(this.$el, "height", height);
            },
            events: [ "resize" ]
        }, {
            read() {
                if (this.parallax && positionedAbsolute(this.$el)) {
                    return false;
                }
                return {
                    scrolled: this.parallax ? scrolledOver(this.$el) * Math.abs(this.parallax) : false
                };
            },
            write(_ref3) {
                let {
                    columns,
                    scrolled,
                    translates
                } = _ref3;
                if (scrolled === false && !translates) {
                    return;
                }
                columns.forEach((column, i) => column.forEach((el, j) => css(el, "transform", !scrolled && !translates ? "" : "translateY(" + ((translates && -translates[i][j]) + (scrolled ? i % 2 ? scrolled : scrolled / 8 : 0)) + "px)")));
            },
            events: [ "scroll", "resize" ]
        } ]
    };
    function positionedAbsolute(el) {
        return children(el).some(el => css(el, "position") === "absolute");
    }
    function getTranslates(rows, columns) {
        const rowHeights = rows.map(row => Math.max(...row.map(el => el.offsetHeight)));
        return columns.map(elements => {
            let prev = 0;
            return elements.map((element, row) => prev += row ? rowHeights[row - 1] - elements[row - 1].offsetHeight : 0);
        });
    }
    function getMarginTop(nodes, cls) {
        const [ node ] = nodes.filter(el => hasClass(el, cls));
        return toFloat(node ? css(node, "marginTop") : css(nodes[0], "paddingLeft"));
    }
    function getColumnHeights(columns) {
        return columns.map(column => column.reduce((sum, el) => sum + el.offsetHeight, 0));
    }
    var heightMatch = {
        mixins: [ Resize ],
        args: "target",
        props: {
            target: String,
            row: Boolean
        },
        data: {
            target: "> *",
            row: true
        },
        computed: {
            elements: {
                get(_ref, $el) {
                    let {
                        target
                    } = _ref;
                    return $$(target, $el);
                },
                watch() {
                    this.$reset();
                }
            }
        },
        resizeTargets() {
            return [ this.$el, ...this.elements ];
        },
        update: {
            read() {
                return {
                    rows: (this.row ? getRows(this.elements) : [ this.elements ]).map(match$1)
                };
            },
            write(_ref2) {
                let {
                    rows
                } = _ref2;
                for (const {
                    heights,
                    elements
                } of rows) {
                    elements.forEach((el, i) => css(el, "minHeight", heights[i]));
                }
            },
            events: [ "resize" ]
        }
    };
    function match$1(elements) {
        if (elements.length < 2) {
            return {
                heights: [ "" ],
                elements: elements
            };
        }
        css(elements, "minHeight", "");
        let heights = elements.map(getHeight);
        const max = Math.max(...heights);
        return {
            heights: elements.map((el, i) => heights[i].toFixed(2) === max.toFixed(2) ? "" : max),
            elements: elements
        };
    }
    function getHeight(element) {
        let style = false;
        if (!isVisible(element)) {
            style = element.style.display;
            css(element, "display", "block", "important");
        }
        const height = dimensions$1(element).height - boxModelAdjust(element, "height", "content-box");
        if (style !== false) {
            css(element, "display", style);
        }
        return height;
    }
    var heightViewport = {
        mixins: [ Resize ],
        props: {
            expand: Boolean,
            offsetTop: Boolean,
            offsetBottom: Boolean,
            minHeight: Number
        },
        data: {
            expand: false,
            offsetTop: false,
            offsetBottom: false,
            minHeight: 0
        },
        resizeTargets() {
            return [ this.$el, ...scrollParents(this.$el, /auto|scroll/) ];
        },
        update: {
            read(_ref) {
                let {
                    minHeight: prev
                } = _ref;
                if (!isVisible(this.$el)) {
                    return false;
                }
                let minHeight = "";
                const box = boxModelAdjust(this.$el, "height", "content-box");
                const {
                    body,
                    scrollingElement
                } = document;
                const [ scrollElement ] = scrollParents(this.$el, /auto|scroll/);
                const {
                    height: viewportHeight
                } = offsetViewport(scrollElement === body ? scrollingElement : scrollElement);
                if (this.expand) {
                    minHeight = Math.max(viewportHeight - (dimensions$1(scrollElement).height - dimensions$1(this.$el).height) - box, 0);
                } else {
                    const isScrollingElement = scrollingElement === scrollElement || body === scrollElement;
                    minHeight = "calc(" + (isScrollingElement ? "100vh" : viewportHeight + "px");
                    if (this.offsetTop) {
                        if (isScrollingElement) {
                            const top = offsetPosition(this.$el)[0] - offsetPosition(scrollElement)[0];
                            minHeight += top > 0 && top < viewportHeight / 2 ? " - " + top + "px" : "";
                        } else {
                            minHeight += " - " + css(scrollElement, "paddingTop");
                        }
                    }
                    if (this.offsetBottom === true) {
                        minHeight += " - " + dimensions$1(this.$el.nextElementSibling).height + "px";
                    } else if (isNumeric(this.offsetBottom)) {
                        minHeight += " - " + this.offsetBottom + "vh";
                    } else if (this.offsetBottom && endsWith(this.offsetBottom, "px")) {
                        minHeight += " - " + toFloat(this.offsetBottom) + "px";
                    } else if (isString(this.offsetBottom)) {
                        minHeight += " - " + dimensions$1(query(this.offsetBottom, this.$el)).height + "px";
                    }
                    minHeight += (box ? " - " + box + "px" : "") + ")";
                }
                return {
                    minHeight: minHeight,
                    prev: prev
                };
            },
            write(_ref2) {
                let {
                    minHeight
                } = _ref2;
                css(this.$el, {
                    minHeight: minHeight
                });
                if (this.minHeight && toFloat(css(this.$el, "minHeight")) < this.minHeight) {
                    css(this.$el, "minHeight", this.minHeight);
                }
            },
            events: [ "resize" ]
        }
    };
    var SVG = {
        args: "src",
        props: {
            id: Boolean,
            icon: String,
            src: String,
            style: String,
            width: Number,
            height: Number,
            ratio: Number,
            class: String,
            strokeAnimation: Boolean,
            attributes: "list"
        },
        data: {
            ratio: 1,
            include: [ "style", "class" ],
            class: "",
            strokeAnimation: false
        },
        beforeConnect() {
            this.class += " uk-svg";
        },
        connected() {
            if (!this.icon && includes(this.src, "#")) {
                [ this.src, this.icon ] = this.src.split("#");
            }
            this.svg = this.getSvg().then(el => {
                if (this._connected) {
                    const svg = insertSVG(el, this.$el);
                    if (this.svgEl && svg !== this.svgEl) {
                        remove$1(this.svgEl);
                    }
                    this.applyAttributes(svg, el);
                    return this.svgEl = svg;
                }
            }, noop);
            if (this.strokeAnimation) {
                this.svg.then(el => {
                    if (this._connected) {
                        applyAnimation(el);
                        this.registerObserver(observeIntersection(el, (records, observer) => {
                            applyAnimation(el);
                            observer.disconnect();
                        }));
                    }
                });
            }
        },
        disconnected() {
            this.svg.then(svg => {
                if (this._connected) {
                    return;
                }
                if (isVoidElement(this.$el)) {
                    this.$el.hidden = false;
                }
                remove$1(svg);
                this.svgEl = null;
            });
            this.svg = null;
        },
        methods: {
            async getSvg() {
                if (isTag(this.$el, "img") && !this.$el.complete && this.$el.loading === "lazy") {
                    return new Promise(resolve => once(this.$el, "load", () => resolve(this.getSvg())));
                }
                return parseSVG(await loadSVG(this.src), this.icon) || Promise.reject("SVG not found.");
            },
            applyAttributes(el, ref) {
                for (const prop in this.$options.props) {
                    if (includes(this.include, prop) && prop in this) {
                        attr(el, prop, this[prop]);
                    }
                }
                for (const attribute in this.attributes) {
                    const [ prop, value ] = this.attributes[attribute].split(":", 2);
                    attr(el, prop, value);
                }
                if (!this.id) {
                    removeAttr(el, "id");
                }
                const props = [ "width", "height" ];
                let dimensions = props.map(prop => this[prop]);
                if (!dimensions.some(val => val)) {
                    dimensions = props.map(prop => attr(ref, prop));
                }
                const viewBox = attr(ref, "viewBox");
                if (viewBox && !dimensions.some(val => val)) {
                    dimensions = viewBox.split(" ").slice(2);
                }
                dimensions.forEach((val, i) => attr(el, props[i], toFloat(val) * this.ratio || null));
            }
        }
    };
    const loadSVG = memoize(async src => {
        if (src) {
            if (startsWith(src, "data:")) {
                return decodeURIComponent(src.split(",")[1]);
            } else {
                return (await fetch(src)).text();
            }
        } else {
            return Promise.reject();
        }
    });
    function parseSVG(svg, icon) {
        var _svg;
        if (icon && includes(svg, "<symbol")) {
            svg = parseSymbols(svg, icon) || svg;
        }
        svg = $(svg.substr(svg.indexOf("<svg")));
        return ((_svg = svg) == null ? void 0 : _svg.hasChildNodes()) && svg;
    }
    const symbolRe = /<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g;
    const symbols = {};
    function parseSymbols(svg, icon) {
        if (!symbols[svg]) {
            symbols[svg] = {};
            symbolRe.lastIndex = 0;
            let match;
            while (match = symbolRe.exec(svg)) {
                symbols[svg][match[3]] = '<svg xmlns="http://www.w3.org/2000/svg"' + match[1] + "svg>";
            }
        }
        return symbols[svg][icon];
    }
    function applyAnimation(el) {
        const length = getMaxPathLength(el);
        if (length) {
            el.style.setProperty("--uk-animation-stroke", length);
        }
    }
    function getMaxPathLength(el) {
        return Math.ceil(Math.max(0, ...$$("[stroke]", el).map(stroke => {
            try {
                return stroke.getTotalLength();
            } catch (e) {
                return 0;
            }
        })));
    }
    function insertSVG(el, root) {
        if (isVoidElement(root) || isTag(root, "canvas")) {
            root.hidden = true;
            const next = root.nextElementSibling;
            return equals(el, next) ? next : after(root, el);
        }
        const last = root.lastElementChild;
        return equals(el, last) ? last : append(root, el);
    }
    function equals(el, other) {
        return isTag(el, "svg") && isTag(other, "svg") && el.innerHTML === other.innerHTML;
    }
    var closeIcon = '<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"/></svg>';
    var closeLarge = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"/><line fill="none" stroke="#000" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"/></svg>';
    var marker = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="4" width="1" height="11"/><rect x="4" y="9" width="11" height="1"/></svg>';
    var navParentIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><polyline fill="none" stroke="#000" stroke-width="1.1" points="1 3.5 6 8.5 11 3.5"/></svg>';
    var navParentIconLarge = '<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.1" points="1 4 7 10 13 4"/></svg>';
    var navbarParentIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><polyline fill="none" stroke="#000" stroke-width="1.1" points="1 3.5 6 8.5 11 3.5"/></svg>';
    var navbarToggleIcon = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><style>.uk-navbar-toggle-animate svg>[class*=line-]{transition:.2s ease-in-out;transition-property:transform,opacity,;transform-origin:center;opacity:1}.uk-navbar-toggle svg>.line-3{opacity:0}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-3{opacity:1}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-2{transform:rotate(45deg)}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-3{transform:rotate(-45deg)}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-1,.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-4{opacity:0}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-1{transform:translateY(6px) scaleX(0)}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-4{transform:translateY(-6px) scaleX(0)}</style><rect class="line-1" y="3" width="20" height="2"/><rect class="line-2" y="9" width="20" height="2"/><rect class="line-3" y="9" width="20" height="2"/><rect class="line-4" y="15" width="20" height="2"/></svg>';
    var overlayIcon = '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="0" width="1" height="40"/><rect x="0" y="19" width="40" height="1"/></svg>';
    var paginationNext = '<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 1 6 6 1 11"/></svg>';
    var paginationPrevious = '<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="6 1 1 6 6 11"/></svg>';
    var searchIcon = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>';
    var searchLarge = '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.8" cx="17.5" cy="17.5" r="16.5"/><line fill="none" stroke="#000" stroke-width="1.8" x1="38" y1="39" x2="29" y2="30"/></svg>';
    var searchNavbar = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10.5" cy="10.5" r="9.5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="23" y1="23" x2="17" y2="17"/></svg>';
    var slidenavNext = '<svg width="14" height="24" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1 "/></svg>';
    var slidenavNextLarge = '<svg width="25" height="40" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5 "/></svg>';
    var slidenavPrevious = '<svg width="14" height="24" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 "/></svg>';
    var slidenavPreviousLarge = '<svg width="25" height="40" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547 "/></svg>';
    var spinner = '<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"/></svg>';
    var totop = '<svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 9 9 1 17 9 "/></svg>';
    const icons = {
        spinner: spinner,
        totop: totop,
        marker: marker,
        "close-icon": closeIcon,
        "close-large": closeLarge,
        "nav-parent-icon": navParentIcon,
        "nav-parent-icon-large": navParentIconLarge,
        "navbar-parent-icon": navbarParentIcon,
        "navbar-toggle-icon": navbarToggleIcon,
        "overlay-icon": overlayIcon,
        "pagination-next": paginationNext,
        "pagination-previous": paginationPrevious,
        "search-icon": searchIcon,
        "search-large": searchLarge,
        "search-navbar": searchNavbar,
        "slidenav-next": slidenavNext,
        "slidenav-next-large": slidenavNextLarge,
        "slidenav-previous": slidenavPrevious,
        "slidenav-previous-large": slidenavPreviousLarge
    };
    const Icon = {
        install: install$3,
        extends: SVG,
        args: "icon",
        props: [ "icon" ],
        data: {
            include: []
        },
        isIcon: true,
        beforeConnect() {
            addClass(this.$el, "uk-icon");
        },
        methods: {
            async getSvg() {
                const icon = getIcon(this.icon);
                if (!icon) {
                    throw "Icon not found.";
                }
                return icon;
            }
        }
    };
    const IconComponent = {
        args: false,
        extends: Icon,
        data: vm => ({
            icon: hyphenate(vm.constructor.options.name)
        }),
        beforeConnect() {
            addClass(this.$el, this.$options.id);
        }
    };
    const NavParentIcon = {
        extends: IconComponent,
        beforeConnect() {
            const icon = this.$props.icon;
            this.icon = closest(this.$el, ".uk-nav-primary") ? icon + "-large" : icon;
        }
    };
    const Slidenav = {
        extends: IconComponent,
        beforeConnect() {
            addClass(this.$el, "uk-slidenav");
            const icon = this.$props.icon;
            this.icon = hasClass(this.$el, "uk-slidenav-large") ? icon + "-large" : icon;
        }
    };
    const Search = {
        extends: IconComponent,
        beforeConnect() {
            this.icon = hasClass(this.$el, "uk-search-icon") && parents(this.$el, ".uk-search-large").length ? "search-large" : parents(this.$el, ".uk-search-navbar").length ? "search-navbar" : this.$props.icon;
        }
    };
    const Close = {
        extends: IconComponent,
        beforeConnect() {
            this.icon = "close-" + (hasClass(this.$el, "uk-close-large") ? "large" : "icon");
        }
    };
    const Spinner = {
        extends: IconComponent,
        methods: {
            async getSvg() {
                const icon = await Icon.methods.getSvg.call(this);
                if (this.ratio !== 1) {
                    css($("circle", icon), "strokeWidth", 1 / this.ratio);
                }
                return icon;
            }
        }
    };
    const parsed = {};
    function install$3(UIkit) {
        UIkit.icon.add = (name, svg) => {
            const added = isString(name) ? {
                [name]: svg
            } : name;
            each(added, (svg, name) => {
                icons[name] = svg;
                delete parsed[name];
            });
            if (UIkit._initialized) {
                apply(document.body, el => each(UIkit.getComponents(el), cmp => {
                    cmp.$options.isIcon && cmp.icon in added && cmp.$reset();
                }));
            }
        };
    }
    function getIcon(icon) {
        if (!icons[icon]) {
            return null;
        }
        if (!parsed[icon]) {
            parsed[icon] = $((icons[applyRtl(icon)] || icons[icon]).trim());
        }
        return parsed[icon].cloneNode(true);
    }
    function applyRtl(icon) {
        return isRtl ? swap(swap(icon, "left", "right"), "previous", "next") : icon;
    }
    const nativeLazyLoad = inBrowser && "loading" in HTMLImageElement.prototype;
    var img = {
        args: "dataSrc",
        props: {
            dataSrc: String,
            sources: String,
            offsetTop: String,
            offsetLeft: String,
            target: String,
            loading: String
        },
        data: {
            dataSrc: "",
            sources: false,
            offsetTop: "50vh",
            offsetLeft: "50vw",
            target: false,
            loading: "lazy"
        },
        connected() {
            if (this.loading !== "lazy") {
                this.load();
                return;
            }
            const target = [ this.$el, ...queryAll(this.$props.target, this.$el) ];
            if (nativeLazyLoad && isImg(this.$el)) {
                this.$el.loading = "lazy";
                setSrcAttrs(this.$el);
                if (target.length === 1) {
                    return;
                }
            }
            ensureSrcAttribute(this.$el);
            this.registerObserver(observeIntersection(target, (entries, observer) => {
                this.load();
                observer.disconnect();
            }, {
                rootMargin: toPx(this.offsetTop, "height") + "px " + toPx(this.offsetLeft, "width") + "px"
            }));
        },
        disconnected() {
            if (this._data.image) {
                this._data.image.onload = "";
            }
        },
        methods: {
            load() {
                if (this._data.image) {
                    return this._data.image;
                }
                const image = isImg(this.$el) ? this.$el : getImageFromElement(this.$el, this.dataSrc, this.sources);
                removeAttr(image, "loading");
                setSrcAttrs(this.$el, image.currentSrc);
                return this._data.image = image;
            }
        }
    };
    function setSrcAttrs(el, src) {
        if (isImg(el)) {
            const parentNode = parent(el);
            const elements = isPicture(parentNode) ? children(parentNode) : [ el ];
            elements.forEach(el => setSourceProps(el, el));
        } else if (src) {
            const change = !includes(el.style.backgroundImage, src);
            if (change) {
                css(el, "backgroundImage", "url(" + escape(src) + ")");
                trigger(el, createEvent("load", false));
            }
        }
    }
    const srcProps = [ "data-src", "data-srcset", "sizes" ];
    function setSourceProps(sourceEl, targetEl) {
        srcProps.forEach(prop => {
            const value = data(sourceEl, prop);
            if (value) {
                attr(targetEl, prop.replace(/^(data-)+/, ""), value);
            }
        });
    }
    function getImageFromElement(el, src, sources) {
        const img = new Image();
        wrapInPicture(img, sources);
        setSourceProps(el, img);
        img.onload = () => {
            setSrcAttrs(el, img.currentSrc);
        };
        attr(img, "src", src);
        return img;
    }
    function wrapInPicture(img, sources) {
        sources = parseSources(sources);
        if (sources.length) {
            const picture = fragment("<picture>");
            for (const attrs of sources) {
                const source = fragment("<source>");
                attr(source, attrs);
                append(picture, source);
            }
            append(picture, img);
        }
    }
    function parseSources(sources) {
        if (!sources) {
            return [];
        }
        if (startsWith(sources, "[")) {
            try {
                sources = JSON.parse(sources);
            } catch (e) {
                sources = [];
            }
        } else {
            sources = parseOptions(sources);
        }
        if (!isArray(sources)) {
            sources = [ sources ];
        }
        return sources.filter(source => !isEmpty(source));
    }
    function ensureSrcAttribute(el) {
        if (isImg(el) && !hasAttr(el, "src")) {
            attr(el, "src", 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>');
        }
    }
    function isPicture(el) {
        return isTag(el, "picture");
    }
    function isImg(el) {
        return isTag(el, "img");
    }
    var Media = {
        props: {
            media: Boolean
        },
        data: {
            media: false
        },
        connected() {
            const media = toMedia(this.media, this.$el);
            this.matchMedia = true;
            if (media) {
                this.mediaObj = window.matchMedia(media);
                const handler = () => {
                    this.matchMedia = this.mediaObj.matches;
                    trigger(this.$el, createEvent("mediachange", false, true, [ this.mediaObj ]));
                };
                this.offMediaObj = on(this.mediaObj, "change", () => {
                    handler();
                    this.$emit("resize");
                });
                handler();
            }
        },
        disconnected() {
            var _this$offMediaObj;
            (_this$offMediaObj = this.offMediaObj) == null ? void 0 : _this$offMediaObj.call(this);
        }
    };
    function toMedia(value, element) {
        if (isString(value)) {
            if (startsWith(value, "@")) {
                value = toFloat(css(element, "--uk-breakpoint-" + value.substr(1)));
            } else if (isNaN(value)) {
                return value;
            }
        }
        return value && isNumeric(value) ? "(min-width: " + value + "px)" : "";
    }
    var leader = {
        mixins: [ Class, Media, Resize ],
        props: {
            fill: String
        },
        data: {
            fill: "",
            clsWrapper: "uk-leader-fill",
            clsHide: "uk-leader-hide",
            attrFill: "data-fill"
        },
        computed: {
            fill(_ref) {
                let {
                    fill
                } = _ref;
                return fill || css(this.$el, "--uk-leader-fill-content");
            }
        },
        connected() {
            [ this.wrapper ] = wrapInner(this.$el, '<span class="' + this.clsWrapper + '">');
        },
        disconnected() {
            unwrap(this.wrapper.childNodes);
        },
        update: {
            read() {
                const width = Math.trunc(this.$el.offsetWidth / 2);
                return {
                    width: width,
                    fill: this.fill,
                    hide: !this.matchMedia
                };
            },
            write(_ref2) {
                let {
                    width,
                    fill,
                    hide
                } = _ref2;
                toggleClass(this.wrapper, this.clsHide, hide);
                attr(this.wrapper, this.attrFill, new Array(width).join(fill));
            },
            events: [ "resize" ]
        }
    };
    var modal = {
        install: install$2,
        mixins: [ Modal ],
        data: {
            clsPage: "uk-modal-page",
            selPanel: ".uk-modal-dialog",
            selClose: ".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"
        },
        events: [ {
            name: "show",
            self: true,
            handler() {
                if (hasClass(this.panel, "uk-margin-auto-vertical")) {
                    addClass(this.$el, "uk-flex");
                } else {
                    css(this.$el, "display", "block");
                }
                height(this.$el);
            }
        }, {
            name: "hidden",
            self: true,
            handler() {
                css(this.$el, "display", "");
                removeClass(this.$el, "uk-flex");
            }
        } ]
    };
    function install$2(_ref) {
        let {
            modal
        } = _ref;
        modal.dialog = function(content, options) {
            const dialog = modal('<div class="uk-modal"> <div class="uk-modal-dialog">' + content + "</div> </div>", options);
            dialog.show();
            on(dialog.$el, "hidden", async () => {
                await Promise.resolve();
                dialog.$destroy(true);
            }, {
                self: true
            });
            return dialog;
        };
        modal.alert = function(message, options) {
            return openDialog(_ref2 => {
                let {
                    labels
                } = _ref2;
                return '<div class="uk-modal-body">' + (isString(message) ? message : html(message)) + '</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>' + labels.ok + "</button> </div>";
            }, options, deferred => deferred.resolve());
        };
        modal.confirm = function(message, options) {
            return openDialog(_ref3 => {
                let {
                    labels
                } = _ref3;
                return '<form> <div class="uk-modal-body">' + (isString(message) ? message : html(message)) + '</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">' + labels.cancel + '</button> <button class="uk-button uk-button-primary" autofocus>' + labels.ok + "</button> </div> </form>";
            }, options, deferred => deferred.reject());
        };
        modal.prompt = function(message, value, options) {
            return openDialog(_ref4 => {
                let {
                    labels
                } = _ref4;
                return '<form class="uk-form-stacked"> <div class="uk-modal-body"> <label>' + (isString(message) ? message : html(message)) + '</label> <input class="uk-input" value="' + (value || "") + '" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">' + labels.cancel + '</button> <button class="uk-button uk-button-primary">' + labels.ok + "</button> </div> </form>";
            }, options, deferred => deferred.resolve(null), dialog => $("input", dialog.$el).value);
        };
        modal.labels = {
            ok: "Ok",
            cancel: "Cancel"
        };
        function openDialog(tmpl, options, hideFn, submitFn) {
            options = {
                bgClose: false,
                escClose: true,
                labels: modal.labels,
                ...options
            };
            const dialog = modal.dialog(tmpl(options), options);
            const deferred = new Deferred();
            let resolved = false;
            on(dialog.$el, "submit", "form", e => {
                e.preventDefault();
                deferred.resolve(submitFn == null ? void 0 : submitFn(dialog));
                resolved = true;
                dialog.hide();
            });
            on(dialog.$el, "hide", () => !resolved && hideFn(deferred));
            deferred.promise.dialog = dialog;
            return deferred.promise;
        }
    }
    var nav = {
        extends: Accordion,
        data: {
            targets: "> .uk-parent",
            toggle: "> a",
            content: "> ul"
        }
    };
    var navbar = {
        mixins: [ Class, Container ],
        props: {
            dropdown: String,
            align: String,
            clsDrop: String,
            boundary: Boolean,
            dropbar: Boolean,
            dropbarAnchor: Boolean,
            duration: Number,
            mode: Boolean,
            offset: Boolean,
            stretch: Boolean,
            delayShow: Boolean,
            delayHide: Boolean,
            target: Boolean,
            targetX: Boolean,
            targetY: Boolean,
            animation: Boolean,
            animateOut: Boolean
        },
        data: {
            dropdown: ".uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle",
            align: isRtl ? "right" : "left",
            clsDrop: "uk-navbar-dropdown",
            boundary: true,
            dropbar: false,
            dropbarAnchor: false,
            duration: 200,
            container: false
        },
        computed: {
            dropbarAnchor(_ref, $el) {
                let {
                    dropbarAnchor
                } = _ref;
                return query(dropbarAnchor, $el) || $el;
            },
            dropbar: {
                get(_ref2) {
                    let {
                        dropbar
                    } = _ref2;
                    if (!dropbar) {
                        return null;
                    }
                    dropbar = this._dropbar || query(dropbar, this.$el) || $("+ .uk-navbar-dropbar", this.$el);
                    return dropbar ? dropbar : this._dropbar = $("<div></div>");
                },
                watch(dropbar) {
                    addClass(dropbar, "uk-dropbar", "uk-dropbar-top", "uk-navbar-dropbar");
                },
                immediate: true
            },
            dropContainer(_, $el) {
                return this.container || $el;
            },
            dropdowns: {
                get(_ref3, $el) {
                    let {
                        clsDrop
                    } = _ref3;
                    const dropdowns = $$("." + clsDrop, $el);
                    if (this.dropContainer !== $el) {
                        for (const el of $$("." + clsDrop, this.dropContainer)) {
                            var _this$getDropdown;
                            const target = (_this$getDropdown = this.getDropdown(el)) == null ? void 0 : _this$getDropdown.targetEl;
                            if (!includes(dropdowns, el) && target && within(target, this.$el)) {
                                dropdowns.push(el);
                            }
                        }
                    }
                    return dropdowns;
                },
                watch(dropdowns) {
                    this.$create("drop", dropdowns.filter(el => !this.getDropdown(el)), {
                        ...this.$props,
                        flip: false,
                        shift: true,
                        pos: "bottom-" + this.align,
                        boundary: this.boundary === true ? this.$el : this.boundary
                    });
                },
                immediate: true
            },
            toggles: {
                get(_ref4, $el) {
                    let {
                        dropdown
                    } = _ref4;
                    return $$(dropdown, $el);
                },
                watch() {
                    const justify = hasClass(this.$el, "uk-navbar-justify");
                    for (const container of $$(".uk-navbar-nav, .uk-navbar-left, .uk-navbar-right", this.$el)) {
                        css(container, "flexGrow", justify ? $$(this.dropdown, container).length : "");
                    }
                },
                immediate: true
            }
        },
        disconnected() {
            this.dropbar && remove$1(this.dropbar);
            delete this._dropbar;
        },
        events: [ {
            name: "mouseover focusin",
            delegate() {
                return this.dropdown;
            },
            handler(_ref5) {
                let {
                    current
                } = _ref5;
                const active = this.getActive();
                if (active && includes(active.mode, "hover") && active.targetEl && !within(active.targetEl, current) && !active.isDelaying) {
                    active.hide(false);
                }
            }
        }, {
            name: "keydown",
            delegate() {
                return this.dropdown;
            },
            handler(e) {
                const {
                    current,
                    keyCode
                } = e;
                const active = this.getActive();
                if (keyCode === keyMap.DOWN && hasAttr(current, "aria-expanded")) {
                    e.preventDefault();
                    if (!active || active.targetEl !== current) {
                        current.click();
                        once(this.dropContainer, "show", _ref6 => {
                            let {
                                target
                            } = _ref6;
                            return focusFirstFocusableElement(target);
                        });
                    } else {
                        focusFirstFocusableElement(active.$el);
                    }
                }
                handleNavItemNavigation(e, this.toggles, active);
            }
        }, {
            name: "keydown",
            el() {
                return this.dropContainer;
            },
            delegate() {
                return "." + this.clsDrop;
            },
            handler(e) {
                const {
                    current,
                    keyCode
                } = e;
                if (!includes(this.dropdowns, current)) {
                    return;
                }
                const active = this.getActive();
                const elements = $$(selFocusable, current);
                const i = findIndex(elements, el => matches(el, ":focus"));
                if (keyCode === keyMap.UP) {
                    e.preventDefault();
                    if (i > 0) {
                        elements[i - 1].focus();
                    }
                }
                if (keyCode === keyMap.DOWN) {
                    e.preventDefault();
                    if (i < elements.length - 1) {
                        elements[i + 1].focus();
                    }
                }
                if (keyCode === keyMap.ESC) {
                    var _active$targetEl;
                    active == null ? void 0 : (_active$targetEl = active.targetEl) == null ? void 0 : _active$targetEl.focus();
                }
                handleNavItemNavigation(e, this.toggles, active);
            }
        }, {
            name: "mouseleave",
            el() {
                return this.dropbar;
            },
            filter() {
                return this.dropbar;
            },
            handler() {
                const active = this.getActive();
                if (active && includes(active.mode, "hover") && !this.dropdowns.some(el => matches(el, ":hover"))) {
                    active.hide();
                }
            }
        }, {
            name: "beforeshow",
            el() {
                return this.dropContainer;
            },
            filter() {
                return this.dropbar;
            },
            handler(_ref7) {
                let {
                    target
                } = _ref7;
                if (!this.isDropbarDrop(target)) {
                    return;
                }
                if (this.dropbar.previousElementSibling !== this.dropbarAnchor) {
                    after(this.dropbarAnchor, this.dropbar);
                }
                addClass(target, this.clsDrop + "-dropbar");
            }
        }, {
            name: "show",
            el() {
                return this.dropContainer;
            },
            filter() {
                return this.dropbar;
            },
            handler(_ref8) {
                let {
                    target
                } = _ref8;
                if (!this.isDropbarDrop(target)) {
                    return;
                }
                const drop = this.getDropdown(target);
                this._observer = observeResize([ drop.$el, ...drop.target ], () => {
                    const targetOffsets = parents(target, "." + this.clsDrop).concat(target).map(el => offset(el));
                    const minTop = Math.min(...targetOffsets.map(_ref9 => {
                        let {
                            top
                        } = _ref9;
                        return top;
                    }));
                    const maxBottom = Math.max(...targetOffsets.map(_ref10 => {
                        let {
                            bottom
                        } = _ref10;
                        return bottom;
                    }));
                    const dropbarOffset = offset(this.dropbar);
                    css(this.dropbar, "top", this.dropbar.offsetTop - (dropbarOffset.top - minTop));
                    this.transitionTo(maxBottom - minTop + toFloat(css(target, "marginBottom")), target);
                });
            }
        }, {
            name: "beforehide",
            el() {
                return this.dropContainer;
            },
            filter() {
                return this.dropbar;
            },
            handler(e) {
                const active = this.getActive();
                if (matches(this.dropbar, ":hover") && (active == null ? void 0 : active.$el) === e.target && !this.toggles.some(el => active.targetEl !== el && matches(el, ":focus"))) {
                    e.preventDefault();
                }
            }
        }, {
            name: "hide",
            el() {
                return this.dropContainer;
            },
            filter() {
                return this.dropbar;
            },
            handler(_ref11) {
                var _this$_observer;
                let {
                    target
                } = _ref11;
                if (!this.isDropbarDrop(target)) {
                    return;
                }
                (_this$_observer = this._observer) == null ? void 0 : _this$_observer.disconnect();
                const active = this.getActive();
                if (!active || (active == null ? void 0 : active.$el) === target) {
                    this.transitionTo(0);
                }
            }
        } ],
        methods: {
            getActive() {
                return includes(this.dropdowns, active == null ? void 0 : active.$el) && active;
            },
            transitionTo(newHeight, el) {
                const {
                    dropbar
                } = this;
                const oldHeight = height(dropbar);
                el = oldHeight < newHeight && el;
                css(el, "clipPath", "polygon(0 0,100% 0,100% " + oldHeight + "px,0 " + oldHeight + "px)");
                height(dropbar, oldHeight);
                Transition.cancel([ el, dropbar ]);
                Promise.all([ Transition.start(dropbar, {
                    height: newHeight
                }, this.duration), Transition.start(el, {
                    clipPath: "polygon(0 0,100% 0,100% " + newHeight + "px,0 " + newHeight + "px)"
                }, this.duration) ]).catch(noop).then(() => css(el, {
                    clipPath: ""
                }));
            },
            getDropdown(el) {
                return this.$getComponent(el, "drop") || this.$getComponent(el, "dropdown");
            },
            isDropbarDrop(el) {
                return this.getDropdown(el) && hasClass(el, this.clsDrop);
            }
        }
    };
    function handleNavItemNavigation(e, toggles, active) {
        const {
            current,
            keyCode
        } = e;
        const target = (active == null ? void 0 : active.targetEl) || current;
        const i = toggles.indexOf(target);
        if (keyCode === keyMap.LEFT && i > 0) {
            active == null ? void 0 : active.hide(false);
            toggles[i - 1].focus();
        }
        if (keyCode === keyMap.RIGHT && i < toggles.length - 1) {
            active == null ? void 0 : active.hide(false);
            toggles[i + 1].focus();
        }
        if (keyCode === keyMap.TAB) {
            target.focus();
            active == null ? void 0 : active.hide(false);
        }
    }
    function focusFirstFocusableElement(el) {
        if (!$(":focus", el)) {
            var _$;
            (_$ = $(selFocusable, el)) == null ? void 0 : _$.focus();
        }
    }
    const keyMap = {
        TAB: 9,
        ESC: 27,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };
    var Swipe = {
        props: {
            swiping: Boolean
        },
        data: {
            swiping: true
        },
        computed: {
            swipeTarget(props, $el) {
                return $el;
            }
        },
        connected() {
            if (!this.swiping) {
                return;
            }
            registerEvent(this, {
                el: this.swipeTarget,
                name: pointerDown$1,
                passive: true,
                handler(e) {
                    if (!isTouch(e)) {
                        return;
                    }
                    const pos = getEventPos(e);
                    const target = "tagName" in e.target ? e.target : parent(e.target);
                    once(document, pointerUp$1 + " " + pointerCancel + " scroll", e => {
                        const {
                            x,
                            y
                        } = getEventPos(e);
                        if (e.type !== "scroll" && target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {
                            setTimeout(() => {
                                trigger(target, "swipe");
                                trigger(target, "swipe" + swipeDirection(pos.x, pos.y, x, y));
                            });
                        }
                    });
                }
            });
        }
    };
    function swipeDirection(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? "Left" : "Right" : y1 - y2 > 0 ? "Up" : "Down";
    }
    var offcanvas = {
        mixins: [ Modal, Swipe ],
        args: "mode",
        props: {
            mode: String,
            flip: Boolean,
            overlay: Boolean
        },
        data: {
            mode: "slide",
            flip: false,
            overlay: false,
            clsPage: "uk-offcanvas-page",
            clsContainer: "uk-offcanvas-container",
            selPanel: ".uk-offcanvas-bar",
            clsFlip: "uk-offcanvas-flip",
            clsContainerAnimation: "uk-offcanvas-container-animation",
            clsSidebarAnimation: "uk-offcanvas-bar-animation",
            clsMode: "uk-offcanvas",
            clsOverlay: "uk-offcanvas-overlay",
            selClose: ".uk-offcanvas-close",
            container: false
        },
        computed: {
            clsFlip(_ref) {
                let {
                    flip,
                    clsFlip
                } = _ref;
                return flip ? clsFlip : "";
            },
            clsOverlay(_ref2) {
                let {
                    overlay,
                    clsOverlay
                } = _ref2;
                return overlay ? clsOverlay : "";
            },
            clsMode(_ref3) {
                let {
                    mode,
                    clsMode
                } = _ref3;
                return clsMode + "-" + mode;
            },
            clsSidebarAnimation(_ref4) {
                let {
                    mode,
                    clsSidebarAnimation
                } = _ref4;
                return mode === "none" || mode === "reveal" ? "" : clsSidebarAnimation;
            },
            clsContainerAnimation(_ref5) {
                let {
                    mode,
                    clsContainerAnimation
                } = _ref5;
                return mode !== "push" && mode !== "reveal" ? "" : clsContainerAnimation;
            },
            transitionElement(_ref6) {
                let {
                    mode
                } = _ref6;
                return mode === "reveal" ? parent(this.panel) : this.panel;
            }
        },
        update: {
            read() {
                if (this.isToggled() && !isVisible(this.$el)) {
                    this.hide();
                }
            },
            events: [ "resize" ]
        },
        events: [ {
            name: "touchmove",
            self: true,
            passive: false,
            filter() {
                return this.overlay;
            },
            handler(e) {
                e.cancelable && e.preventDefault();
            }
        }, {
            name: "show",
            self: true,
            handler() {
                if (this.mode === "reveal" && !hasClass(parent(this.panel), this.clsMode)) {
                    wrapAll(this.panel, "<div>");
                    addClass(parent(this.panel), this.clsMode);
                }
                const {
                    body,
                    scrollingElement
                } = document;
                addClass(body, this.clsContainer, this.clsFlip);
                css(body, "touch-action", "pan-y pinch-zoom");
                css(this.$el, "display", "block");
                css(this.panel, "maxWidth", scrollingElement.clientWidth);
                addClass(this.$el, this.clsOverlay);
                addClass(this.panel, this.clsSidebarAnimation, this.mode === "reveal" ? "" : this.clsMode);
                height(body);
                addClass(body, this.clsContainerAnimation);
                this.clsContainerAnimation && suppressUserScale();
            }
        }, {
            name: "hide",
            self: true,
            handler() {
                removeClass(document.body, this.clsContainerAnimation);
                css(document.body, "touch-action", "");
            }
        }, {
            name: "hidden",
            self: true,
            handler() {
                this.clsContainerAnimation && resumeUserScale();
                if (this.mode === "reveal") {
                    unwrap(this.panel);
                }
                removeClass(this.panel, this.clsSidebarAnimation, this.clsMode);
                removeClass(this.$el, this.clsOverlay);
                css(this.$el, "display", "");
                css(this.panel, "maxWidth", "");
                removeClass(document.body, this.clsContainer, this.clsFlip);
            }
        }, {
            name: "swipeLeft swipeRight",
            handler(e) {
                if (this.isToggled() && endsWith(e.type, "Left") ^ this.flip) {
                    this.hide();
                }
            }
        } ]
    };
    function suppressUserScale() {
        getViewport().content += ",user-scalable=0";
    }
    function resumeUserScale() {
        const viewport = getViewport();
        viewport.content = viewport.content.replace(/,user-scalable=0$/, "");
    }
    function getViewport() {
        return $('meta[name="viewport"]', document.head) || append(document.head, '<meta name="viewport">');
    }
    var overflowAuto = {
        mixins: [ Class, Resize ],
        props: {
            selContainer: String,
            selContent: String,
            minHeight: Number
        },
        data: {
            selContainer: ".uk-modal",
            selContent: ".uk-modal-dialog",
            minHeight: 150
        },
        computed: {
            container(_ref, $el) {
                let {
                    selContainer
                } = _ref;
                return closest($el, selContainer);
            },
            content(_ref2, $el) {
                let {
                    selContent
                } = _ref2;
                return closest($el, selContent);
            }
        },
        resizeTargets() {
            return [ this.container, this.content ];
        },
        update: {
            read() {
                if (!this.content || !this.container || !isVisible(this.$el)) {
                    return false;
                }
                return {
                    max: Math.max(this.minHeight, height(this.container) - (dimensions$1(this.content).height - height(this.$el)))
                };
            },
            write(_ref3) {
                let {
                    max
                } = _ref3;
                css(this.$el, {
                    minHeight: this.minHeight,
                    maxHeight: max
                });
            },
            events: [ "resize" ]
        }
    };
    var responsive = {
        mixins: [ Resize ],
        props: [ "width", "height" ],
        resizeTargets() {
            return [ this.$el, parent(this.$el) ];
        },
        connected() {
            addClass(this.$el, "uk-responsive-width");
        },
        update: {
            read() {
                return isVisible(this.$el) && this.width && this.height ? {
                    width: width(parent(this.$el)),
                    height: this.height
                } : false;
            },
            write(dim) {
                height(this.$el, Dimensions.contain({
                    height: this.height,
                    width: this.width
                }, dim).height);
            },
            events: [ "resize" ]
        }
    };
    var scroll = {
        props: {
            offset: Number
        },
        data: {
            offset: 0
        },
        connected() {
            registerClick(this);
        },
        disconnected() {
            unregisterClick(this);
        },
        methods: {
            async scrollTo(el) {
                el = el && $(el) || document.body;
                if (trigger(this.$el, "beforescroll", [ this, el ])) {
                    await scrollIntoView(el, {
                        offset: this.offset
                    });
                    trigger(this.$el, "scrolled", [ this, el ]);
                }
            }
        }
    };
    const components$2 = new Set();
    function registerClick(cmp) {
        if (!components$2.size) {
            on(document, "click", clickHandler);
        }
        components$2.add(cmp);
    }
    function unregisterClick(cmp) {
        components$2.delete(cmp);
        if (!components$2.size) {
            off(document, "click", clickHandler);
        }
    }
    function clickHandler(e) {
        if (e.defaultPrevented) {
            return;
        }
        for (const component of components$2) {
            if (within(e.target, component.$el)) {
                e.preventDefault();
                component.scrollTo(getTargetElement(component.$el));
            }
        }
    }
    function getTargetElement(el) {
        return document.getElementById(decodeURIComponent(el.hash).substring(1));
    }
    var scrollspy = {
        mixins: [ Scroll ],
        args: "cls",
        props: {
            cls: String,
            target: String,
            hidden: Boolean,
            offsetTop: Number,
            offsetLeft: Number,
            repeat: Boolean,
            delay: Number
        },
        data: () => ({
            cls: "",
            target: false,
            hidden: true,
            offsetTop: 0,
            offsetLeft: 0,
            repeat: false,
            delay: 0,
            inViewClass: "uk-scrollspy-inview"
        }),
        computed: {
            elements: {
                get(_ref, $el) {
                    let {
                        target
                    } = _ref;
                    return target ? $$(target, $el) : [ $el ];
                },
                watch(elements, prev) {
                    if (this.hidden) {
                        css(filter$1(elements, ":not(." + this.inViewClass + ")"), "opacity", 0);
                    }
                    if (!isEqual(elements, prev)) {
                        this.$reset();
                    }
                },
                immediate: true
            }
        },
        connected() {
            this._data.elements = new Map();
            this.registerObserver(observeIntersection(this.elements, records => {
                const elements = this._data.elements;
                for (const {
                    target: el,
                    isIntersecting
                } of records) {
                    if (!elements.has(el)) {
                        elements.set(el, {
                            cls: data(el, "uk-scrollspy-class") || this.cls
                        });
                    }
                    const state = elements.get(el);
                    if (!this.repeat && state.show) {
                        continue;
                    }
                    state.show = isIntersecting;
                }
                this.$emit();
            }, {
                rootMargin: toPx(this.offsetTop, "height") - 1 + "px " + (toPx(this.offsetLeft, "width") - 1) + "px"
            }, false));
        },
        disconnected() {
            for (const [ el, state ] of this._data.elements.entries()) {
                removeClass(el, this.inViewClass, (state == null ? void 0 : state.cls) || "");
            }
        },
        update: [ {
            write(data) {
                for (const [ el, state ] of data.elements.entries()) {
                    if (state.show && !state.inview && !state.queued) {
                        state.queued = true;
                        data.promise = (data.promise || Promise.resolve()).then(() => new Promise(resolve => setTimeout(resolve, this.delay))).then(() => {
                            this.toggle(el, true);
                            setTimeout(() => {
                                state.queued = false;
                                this.$emit();
                            }, 300);
                        });
                    } else if (!state.show && state.inview && !state.queued && this.repeat) {
                        this.toggle(el, false);
                    }
                }
            }
        } ],
        methods: {
            toggle(el, inview) {
                const state = this._data.elements.get(el);
                if (!state) {
                    return;
                }
                state.off == null ? void 0 : state.off();
                css(el, "opacity", !inview && this.hidden ? 0 : "");
                toggleClass(el, this.inViewClass, inview);
                toggleClass(el, state.cls);
                if (/\buk-animation-/.test(state.cls)) {
                    const removeAnimationClasses = () => removeClasses(el, "uk-animation-[\\w-]+");
                    if (inview) {
                        state.off = once(el, "animationcancel animationend", removeAnimationClasses);
                    } else {
                        removeAnimationClasses();
                    }
                }
                trigger(el, inview ? "inview" : "outview");
                state.inview = inview;
                this.$update(el);
            }
        }
    };
    var scrollspyNav = {
        mixins: [ Scroll ],
        props: {
            cls: String,
            closest: String,
            scroll: Boolean,
            overflow: Boolean,
            offset: Number
        },
        data: {
            cls: "uk-active",
            closest: false,
            scroll: false,
            overflow: true,
            offset: 0
        },
        computed: {
            links: {
                get(_, $el) {
                    return $$('a[href*="#"]', $el).filter(el => el.hash && isSameSiteAnchor(el));
                },
                watch(links) {
                    if (this.scroll) {
                        this.$create("scroll", links, {
                            offset: this.offset || 0
                        });
                    }
                },
                immediate: true
            },
            elements(_ref) {
                let {
                    closest: selector
                } = _ref;
                return closest(this.links, selector || "*");
            }
        },
        update: [ {
            read() {
                const targets = this.links.map(getTargetElement).filter(Boolean);
                const {
                    length
                } = targets;
                if (!length || !isVisible(this.$el)) {
                    return false;
                }
                const [ scrollElement ] = scrollParents(targets, /auto|scroll/, true);
                const {
                    scrollTop,
                    scrollHeight
                } = scrollElement;
                const viewport = offsetViewport(scrollElement);
                const max = scrollHeight - viewport.height;
                let active = false;
                if (scrollTop === max) {
                    active = length - 1;
                } else {
                    for (let i = 0; i < targets.length; i++) {
                        if (offset(targets[i]).top - viewport.top - this.offset > 0) {
                            break;
                        }
                        active = +i;
                    }
                    if (active === false && this.overflow) {
                        active = 0;
                    }
                }
                return {
                    active: active
                };
            },
            write(_ref2) {
                let {
                    active
                } = _ref2;
                const changed = active !== false && !hasClass(this.elements[active], this.cls);
                this.links.forEach(el => el.blur());
                for (let i = 0; i < this.elements.length; i++) {
                    toggleClass(this.elements[i], this.cls, +i === active);
                }
                if (changed) {
                    trigger(this.$el, "active", [ active, this.elements[active] ]);
                }
            },
            events: [ "scroll", "resize" ]
        } ]
    };
    var sticky = {
        mixins: [ Class, Media, Resize, Scroll ],
        props: {
            position: String,
            top: null,
            bottom: null,
            start: null,
            end: null,
            offset: String,
            overflowFlip: Boolean,
            animation: String,
            clsActive: String,
            clsInactive: String,
            clsFixed: String,
            clsBelow: String,
            selTarget: String,
            showOnUp: Boolean,
            targetOffset: Number
        },
        data: {
            position: "top",
            top: false,
            bottom: false,
            start: false,
            end: false,
            offset: 0,
            overflowFlip: false,
            animation: "",
            clsActive: "uk-active",
            clsInactive: "",
            clsFixed: "uk-sticky-fixed",
            clsBelow: "uk-sticky-below",
            selTarget: "",
            showOnUp: false,
            targetOffset: false
        },
        computed: {
            selTarget(_ref, $el) {
                let {
                    selTarget
                } = _ref;
                return selTarget && $(selTarget, $el) || $el;
            }
        },
        resizeTargets() {
            return document.documentElement;
        },
        connected() {
            this.start = coerce(this.start || this.top);
            this.end = coerce(this.end || this.bottom);
            this.placeholder = $("+ .uk-sticky-placeholder", this.$el) || $('<div class="uk-sticky-placeholder"></div>');
            this.isFixed = false;
            this.setActive(false);
        },
        disconnected() {
            if (this.isFixed) {
                this.hide();
                removeClass(this.selTarget, this.clsInactive);
            }
            remove$1(this.placeholder);
            this.placeholder = null;
        },
        events: [ {
            name: "resize",
            el() {
                return window;
            },
            handler() {
                this.$emit("resize");
            }
        }, {
            name: "load hashchange popstate",
            el() {
                return window;
            },
            filter() {
                return this.targetOffset !== false;
            },
            handler() {
                const {
                    scrollingElement
                } = document;
                if (!location.hash || scrollingElement.scrollTop === 0) {
                    return;
                }
                setTimeout(() => {
                    const targetOffset = offset($(location.hash));
                    const elOffset = offset(this.$el);
                    if (this.isFixed && intersectRect(targetOffset, elOffset)) {
                        scrollingElement.scrollTop = targetOffset.top - elOffset.height - toPx(this.targetOffset, "height", this.placeholder) - toPx(this.offset, "height", this.placeholder);
                    }
                });
            }
        } ],
        update: [ {
            read(_ref2, types) {
                let {
                    height: height$1,
                    width,
                    margin
                } = _ref2;
                this.inactive = !this.matchMedia || !isVisible(this.$el);
                if (this.inactive) {
                    return false;
                }
                const hide = this.active && types.has("resize");
                if (hide) {
                    css(this.selTarget, "transition", "0s");
                    this.hide();
                }
                if (!this.active) {
                    ({
                        height: height$1,
                        width
                    } = offset(this.$el));
                    margin = css(this.$el, "margin");
                }
                if (hide) {
                    this.show();
                    requestAnimationFrame(() => css(this.selTarget, "transition", ""));
                }
                const windowHeight = height(window);
                let position = this.position;
                if (this.overflowFlip && height$1 > windowHeight) {
                    position = position === "top" ? "bottom" : "top";
                }
                const referenceElement = this.isFixed ? this.placeholder : this.$el;
                let offset$1 = toPx(this.offset, "height", referenceElement);
                if (position === "bottom" && (height$1 < windowHeight || this.overflowFlip)) {
                    offset$1 += windowHeight - height$1;
                }
                const overflow = this.overflowFlip ? 0 : Math.max(0, height$1 + offset$1 - windowHeight);
                const topOffset = offset(referenceElement).top;
                const start = (this.start === false ? topOffset : parseProp(this.start, this.$el, topOffset)) - offset$1;
                const end = this.end === false ? document.scrollingElement.scrollHeight - windowHeight : parseProp(this.end, this.$el, topOffset + height$1, true) - offset(this.$el).height + overflow - offset$1;
                return {
                    start: start,
                    end: end,
                    offset: offset$1,
                    overflow: overflow,
                    topOffset: topOffset,
                    height: height$1,
                    width: width,
                    margin: margin,
                    top: offsetPosition(referenceElement)[0]
                };
            },
            write(_ref3) {
                let {
                    height,
                    width,
                    margin
                } = _ref3;
                const {
                    placeholder
                } = this;
                css(placeholder, {
                    height: height,
                    width: width,
                    margin: margin
                });
                if (!within(placeholder, document)) {
                    after(this.$el, placeholder);
                    placeholder.hidden = true;
                }
            },
            events: [ "resize" ]
        }, {
            read(_ref4) {
                let {
                    scroll: prevScroll = 0,
                    dir: prevDir = "down",
                    overflow,
                    overflowScroll = 0,
                    start,
                    end
                } = _ref4;
                const scroll = document.scrollingElement.scrollTop;
                const dir = prevScroll <= scroll ? "down" : "up";
                return {
                    dir: dir,
                    prevDir: prevDir,
                    scroll: scroll,
                    prevScroll: prevScroll,
                    offsetParentTop: offset((this.isFixed ? this.placeholder : this.$el).offsetParent).top,
                    overflowScroll: clamp(overflowScroll + clamp(scroll, start, end) - clamp(prevScroll, start, end), 0, overflow)
                };
            },
            write(data, types) {
                const isScrollUpdate = types.has("scroll");
                const {
                    initTimestamp = 0,
                    dir,
                    prevDir,
                    scroll,
                    prevScroll = 0,
                    top,
                    start,
                    topOffset,
                    height
                } = data;
                if (scroll < 0 || scroll === prevScroll && isScrollUpdate || this.showOnUp && !isScrollUpdate && !this.isFixed) {
                    return;
                }
                const now = Date.now();
                if (now - initTimestamp > 300 || dir !== prevDir) {
                    data.initScroll = scroll;
                    data.initTimestamp = now;
                }
                if (this.showOnUp && !this.isFixed && Math.abs(data.initScroll - scroll) <= 30 && Math.abs(prevScroll - scroll) <= 10) {
                    return;
                }
                if (this.inactive || scroll < start || this.showOnUp && (scroll <= start || dir === "down" && isScrollUpdate || dir === "up" && !this.isFixed && scroll <= topOffset + height)) {
                    if (!this.isFixed) {
                        if (Animation.inProgress(this.$el) && top > scroll) {
                            Animation.cancel(this.$el);
                            this.hide();
                        }
                        return;
                    }
                    this.isFixed = false;
                    if (this.animation && scroll > topOffset) {
                        Animation.cancel(this.$el);
                        Animation.out(this.$el, this.animation).then(() => this.hide(), noop);
                    } else {
                        this.hide();
                    }
                } else if (this.isFixed) {
                    this.update();
                } else if (this.animation && scroll > topOffset) {
                    Animation.cancel(this.$el);
                    this.show();
                    Animation.in(this.$el, this.animation).catch(noop);
                } else {
                    this.show();
                }
            },
            events: [ "resize", "scroll" ]
        } ],
        methods: {
            show() {
                this.isFixed = true;
                this.update();
                this.placeholder.hidden = false;
            },
            hide() {
                this.setActive(false);
                removeClass(this.$el, this.clsFixed, this.clsBelow);
                css(this.$el, {
                    position: "",
                    top: "",
                    width: ""
                });
                this.placeholder.hidden = true;
            },
            update() {
                let {
                    width,
                    scroll = 0,
                    overflow,
                    overflowScroll = 0,
                    start,
                    end,
                    offset,
                    topOffset,
                    height,
                    offsetParentTop
                } = this._data;
                const active = start !== 0 || scroll > start;
                let position = "fixed";
                if (scroll > end) {
                    offset += end - offsetParentTop;
                    position = "absolute";
                }
                if (overflow) {
                    offset -= overflowScroll;
                }
                css(this.$el, {
                    position: position,
                    top: offset + "px",
                    width: width
                });
                this.setActive(active);
                toggleClass(this.$el, this.clsBelow, scroll > topOffset + height);
                addClass(this.$el, this.clsFixed);
            },
            setActive(active) {
                const prev = this.active;
                this.active = active;
                if (active) {
                    replaceClass(this.selTarget, this.clsInactive, this.clsActive);
                    prev !== active && trigger(this.$el, "active");
                } else {
                    replaceClass(this.selTarget, this.clsActive, this.clsInactive);
                    prev !== active && trigger(this.$el, "inactive");
                }
            }
        }
    };
    function parseProp(value, el, propOffset, padding) {
        if (!value) {
            return 0;
        }
        if (isNumeric(value) || isString(value) && value.match(/^-?\d/)) {
            return propOffset + toPx(value, "height", el, true);
        } else {
            const refElement = value === true ? parent(el) : query(value, el);
            return offset(refElement).bottom - (padding && refElement && within(el, refElement) ? toFloat(css(refElement, "paddingBottom")) : 0);
        }
    }
    function coerce(value) {
        if (value === "true") {
            return true;
        } else if (value === "false") {
            return false;
        }
        return value;
    }
    var Switcher = {
        mixins: [ Lazyload, Swipe, Togglable ],
        args: "connect",
        props: {
            connect: String,
            toggle: String,
            itemNav: String,
            active: Number
        },
        data: {
            connect: "~.uk-switcher",
            toggle: "> * > :first-child",
            itemNav: false,
            active: 0,
            cls: "uk-active",
            attrItem: "uk-switcher-item"
        },
        computed: {
            connects: {
                get(_ref, $el) {
                    let {
                        connect
                    } = _ref;
                    return queryAll(connect, $el);
                },
                watch(connects) {
                    if (this.swiping) {
                        css(connects, "touchAction", "pan-y pinch-zoom");
                    }
                },
                document: true,
                immediate: true
            },
            connectChildren: {
                get() {
                    return this.connects.map(el => children(el)).flat();
                },
                watch() {
                    const index = this.index();
                    for (const el of this.connects) {
                        children(el).forEach((child, i) => toggleClass(child, this.cls, i === index));
                        this.lazyload(this.$el, children(el));
                    }
                },
                immediate: true
            },
            toggles: {
                get(_ref2, $el) {
                    let {
                        toggle
                    } = _ref2;
                    return $$(toggle, $el).filter(el => !matches(el, ".uk-disabled *, .uk-disabled, [disabled]"));
                },
                watch(toggles) {
                    const active = this.index();
                    this.show(~active ? active : toggles[this.active] || toggles[0]);
                },
                immediate: true
            },
            children() {
                return children(this.$el).filter(child => this.toggles.some(toggle => within(toggle, child)));
            },
            swipeTarget() {
                return this.connects;
            }
        },
        events: [ {
            name: "click",
            delegate() {
                return this.toggle;
            },
            handler(e) {
                e.preventDefault();
                this.show(e.current);
            }
        }, {
            name: "click",
            el() {
                return this.connects.concat(this.itemNav ? queryAll(this.itemNav, this.$el) : []);
            },
            delegate() {
                return "[" + this.attrItem + "],[data-" + this.attrItem + "]";
            },
            handler(e) {
                e.preventDefault();
                this.show(data(e.current, this.attrItem));
            }
        }, {
            name: "swipeRight swipeLeft",
            filter() {
                return this.swiping;
            },
            el() {
                return this.connects;
            },
            handler(_ref3) {
                let {
                    type
                } = _ref3;
                this.show(endsWith(type, "Left") ? "next" : "previous");
            }
        } ],
        methods: {
            index() {
                return findIndex(this.children, el => hasClass(el, this.cls));
            },
            show(item) {
                const prev = this.index();
                const next = getIndex(item, this.toggles, prev);
                const active = getIndex(this.children[next], children(this.$el));
                children(this.$el).forEach((child, i) => {
                    toggleClass(child, this.cls, active === i);
                    attr(this.toggles[i], "aria-expanded", active === i);
                });
                const animate = prev >= 0 && prev !== next;
                this.connects.forEach(async _ref4 => {
                    let {
                        children
                    } = _ref4;
                    await this.toggleElement(toNodes(children).filter(child => hasClass(child, this.cls)), false, animate);
                    await this.toggleElement(children[active], true, animate);
                });
            }
        }
    };
    var tab = {
        mixins: [ Class ],
        extends: Switcher,
        props: {
            media: Boolean
        },
        data: {
            media: 960,
            attrItem: "uk-tab-item"
        },
        connected() {
            const cls = hasClass(this.$el, "uk-tab-left") ? "uk-tab-left" : hasClass(this.$el, "uk-tab-right") ? "uk-tab-right" : false;
            if (cls) {
                this.$create("toggle", this.$el, {
                    cls: cls,
                    mode: "media",
                    media: this.media
                });
            }
        }
    };
    const KEY_SPACE = 32;
    var toggle = {
        mixins: [ Lazyload, Media, Togglable ],
        args: "target",
        props: {
            href: String,
            target: null,
            mode: "list",
            queued: Boolean
        },
        data: {
            href: false,
            target: false,
            mode: "click",
            queued: true
        },
        computed: {
            target: {
                get(_ref, $el) {
                    let {
                        href,
                        target
                    } = _ref;
                    target = queryAll(target || href, $el);
                    return target.length && target || [ $el ];
                },
                watch() {
                    this.updateAria();
                    this.lazyload(this.$el, this.target);
                },
                document: true,
                immediate: true
            }
        },
        connected() {
            if (!includes(this.mode, "media") && !isFocusable(this.$el)) {
                attr(this.$el, "tabindex", "0");
            }
        },
        events: [ {
            name: pointerDown$1,
            filter() {
                return includes(this.mode, "hover");
            },
            handler(e) {
                this._preventClick = null;
                if (!isTouch(e) || this._showState) {
                    return;
                }
                trigger(this.$el, "focus");
                once(document, pointerDown$1, () => trigger(this.$el, "blur"), true, e => !within(e.target, this.$el));
                if (includes(this.mode, "click")) {
                    this._preventClick = true;
                }
            }
        }, {
            name: pointerEnter + " " + pointerLeave + " focus blur",
            filter() {
                return includes(this.mode, "hover");
            },
            handler(e) {
                if (isTouch(e)) {
                    return;
                }
                const show = includes([ pointerEnter, "focus" ], e.type);
                const expanded = attr(this.$el, "aria-expanded");
                if (!show && (e.type === pointerLeave && matches(this.$el, ":focus") || e.type === "blur" && matches(this.$el, ":hover"))) {
                    return;
                }
                if (this._showState && show && expanded !== this._showState) {
                    if (!show) {
                        this._showState = null;
                    }
                    return;
                }
                this._showState = show ? expanded : null;
                this.toggle("toggle" + (show ? "show" : "hide"));
            }
        }, {
            name: "keydown",
            filter() {
                return includes(this.mode, "click") && !isTag(this.$el, "input");
            },
            handler(e) {
                if (e.keyCode === KEY_SPACE) {
                    e.preventDefault();
                    this.$el.click();
                }
            }
        }, {
            name: "click",
            filter() {
                return [ "click", "hover" ].some(mode => includes(this.mode, mode));
            },
            handler(e) {
                let link;
                if (this._preventClick || closest(e.target, 'a[href="#"], a[href=""]') || (link = closest(e.target, "a[href]")) && (attr(this.$el, "aria-expanded") !== "true" || link.hash && matches(this.target, link.hash))) {
                    e.preventDefault();
                }
                if (!this._preventClick && includes(this.mode, "click")) {
                    this.toggle();
                }
            }
        }, {
            name: "hide show",
            self: true,
            el() {
                return this.target;
            },
            handler(_ref2) {
                let {
                    target,
                    type
                } = _ref2;
                this.updateAria(target === this.target[0] && type === "show");
            }
        }, {
            name: "mediachange",
            filter() {
                return includes(this.mode, "media");
            },
            el() {
                return this.target;
            },
            handler(e, mediaObj) {
                if (mediaObj.matches ^ this.isToggled(this.target)) {
                    this.toggle();
                }
            }
        } ],
        methods: {
            async toggle(type) {
                if (!trigger(this.target, type || "toggle", [ this ])) {
                    return;
                }
                if (!this.queued) {
                    return this.toggleElement(this.target);
                }
                const leaving = this.target.filter(el => hasClass(el, this.clsLeave));
                if (leaving.length) {
                    for (const el of this.target) {
                        const isLeaving = includes(leaving, el);
                        this.toggleElement(el, isLeaving, isLeaving);
                    }
                    return;
                }
                const toggled = this.target.filter(this.isToggled);
                await this.toggleElement(toggled, false);
                await this.toggleElement(this.target.filter(el => !includes(toggled, el)), true);
            },
            updateAria(toggled) {
                if (includes(this.mode, "media")) {
                    return;
                }
                attr(this.$el, "aria-expanded", isBoolean(toggled) ? toggled : this.isToggled(this.target));
            }
        }
    };
    var components$1 = Object.freeze({
        __proto__: null,
        Accordion: Accordion,
        Alert: alert,
        Cover: cover,
        Drop: drop,
        Dropdown: drop,
        FormCustom: formCustom,
        Grid: grid,
        HeightMatch: heightMatch,
        HeightViewport: heightViewport,
        Icon: Icon,
        Img: img,
        Leader: leader,
        Margin: Margin,
        Modal: modal,
        Nav: nav,
        Navbar: navbar,
        Offcanvas: offcanvas,
        OverflowAuto: overflowAuto,
        Responsive: responsive,
        Scroll: scroll,
        Scrollspy: scrollspy,
        ScrollspyNav: scrollspyNav,
        Sticky: sticky,
        Svg: SVG,
        Switcher: Switcher,
        Tab: tab,
        Toggle: toggle,
        Video: Video,
        Close: Close,
        Spinner: Spinner,
        NavParentIcon: NavParentIcon,
        SlidenavNext: Slidenav,
        SlidenavPrevious: Slidenav,
        SearchIcon: Search,
        Marker: IconComponent,
        NavbarParentIcon: IconComponent,
        NavbarToggleIcon: IconComponent,
        OverlayIcon: IconComponent,
        PaginationNext: IconComponent,
        PaginationPrevious: IconComponent,
        Totop: IconComponent
    });
    each(components$1, (component, name) => UIkit.component(name, component));
    boot(UIkit);
    const units = [ "days", "hours", "minutes", "seconds" ];
    var countdown = {
        mixins: [ Class ],
        props: {
            date: String,
            clsWrapper: String
        },
        data: {
            date: "",
            clsWrapper: ".uk-countdown-%unit%"
        },
        connected() {
            this.date = Date.parse(this.$props.date);
            this.start();
        },
        disconnected() {
            this.stop();
        },
        events: [ {
            name: "visibilitychange",
            el() {
                return document;
            },
            handler() {
                if (document.hidden) {
                    this.stop();
                } else {
                    this.start();
                }
            }
        } ],
        methods: {
            start() {
                this.stop();
                this.update();
                this.timer = setInterval(this.update, 1e3);
            },
            stop() {
                clearInterval(this.timer);
            },
            update() {
                const timespan = getTimeSpan(this.date);
                if (!this.date || timespan.total <= 0) {
                    this.stop();
                    timespan.days = timespan.hours = timespan.minutes = timespan.seconds = 0;
                }
                for (const unit of units) {
                    const el = $(this.clsWrapper.replace("%unit%", unit), this.$el);
                    if (!el) {
                        continue;
                    }
                    let digits = String(Math.trunc(timespan[unit]));
                    digits = digits.length < 2 ? "0" + digits : digits;
                    if (el.textContent !== digits) {
                        digits = digits.split("");
                        if (digits.length !== el.children.length) {
                            html(el, digits.map(() => "<span></span>").join(""));
                        }
                        digits.forEach((digit, i) => el.children[i].textContent = digit);
                    }
                }
            }
        }
    };
    function getTimeSpan(date) {
        const total = date - Date.now();
        return {
            total: total,
            seconds: total / 1e3 % 60,
            minutes: total / 1e3 / 60 % 60,
            hours: total / 1e3 / 60 / 60 % 24,
            days: total / 1e3 / 60 / 60 / 24
        };
    }
    const clsLeave = "uk-transition-leave";
    const clsEnter = "uk-transition-enter";
    function fade(action, target, duration, stagger) {
        if (stagger === void 0) {
            stagger = 0;
        }
        const index = transitionIndex(target, true);
        const propsIn = {
            opacity: 1
        };
        const propsOut = {
            opacity: 0
        };
        const wrapIndexFn = fn => () => index === transitionIndex(target) ? fn() : Promise.reject();
        const leaveFn = wrapIndexFn(async () => {
            addClass(target, clsLeave);
            await Promise.all(getTransitionNodes(target).map((child, i) => new Promise(resolve => setTimeout(() => Transition.start(child, propsOut, duration / 2, "ease").then(resolve), i * stagger))));
            removeClass(target, clsLeave);
        });
        const enterFn = wrapIndexFn(async () => {
            const oldHeight = height(target);
            addClass(target, clsEnter);
            action();
            css(children(target), {
                opacity: 0
            });
            await awaitFrame$1();
            const nodes = children(target);
            const newHeight = height(target);
            css(target, "alignContent", "flex-start");
            height(target, oldHeight);
            const transitionNodes = getTransitionNodes(target);
            css(nodes, propsOut);
            const transitions = transitionNodes.map(async (child, i) => {
                await awaitTimeout(i * stagger);
                await Transition.start(child, propsIn, duration / 2, "ease");
            });
            if (oldHeight !== newHeight) {
                transitions.push(Transition.start(target, {
                    height: newHeight
                }, duration / 2 + transitionNodes.length * stagger, "ease"));
            }
            await Promise.all(transitions).then(() => {
                removeClass(target, clsEnter);
                if (index === transitionIndex(target)) {
                    css(target, {
                        height: "",
                        alignContent: ""
                    });
                    css(nodes, {
                        opacity: ""
                    });
                    delete target.dataset.transition;
                }
            });
        });
        return hasClass(target, clsLeave) ? waitTransitionend(target).then(enterFn) : hasClass(target, clsEnter) ? waitTransitionend(target).then(leaveFn).then(enterFn) : leaveFn().then(enterFn);
    }
    function transitionIndex(target, next) {
        if (next) {
            target.dataset.transition = 1 + transitionIndex(target);
        }
        return toNumber(target.dataset.transition) || 0;
    }
    function waitTransitionend(target) {
        return Promise.all(children(target).filter(Transition.inProgress).map(el => new Promise(resolve => once(el, "transitionend transitioncanceled", resolve))));
    }
    function getTransitionNodes(target) {
        return getRows(children(target)).reduce((nodes, row) => nodes.concat(sortBy$1(row.filter(el => isInView(el)), "offsetLeft")), []);
    }
    function awaitFrame$1() {
        return new Promise(resolve => requestAnimationFrame(resolve));
    }
    function awaitTimeout(timeout) {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    async function slide(action, target, duration) {
        await awaitFrame();
        let nodes = children(target);
        const currentProps = nodes.map(el => getProps(el, true));
        const targetProps = {
            ...css(target, [ "height", "padding" ]),
            display: "block"
        };
        await Promise.all(nodes.concat(target).map(Transition.cancel));
        action();
        nodes = nodes.concat(children(target).filter(el => !includes(nodes, el)));
        await Promise.resolve();
        fastdom.flush();
        const targetStyle = attr(target, "style");
        const targetPropsTo = css(target, [ "height", "padding" ]);
        const [ propsTo, propsFrom ] = getTransitionProps(target, nodes, currentProps);
        const attrsTo = nodes.map(el => ({
            style: attr(el, "style")
        }));
        nodes.forEach((el, i) => propsFrom[i] && css(el, propsFrom[i]));
        css(target, targetProps);
        await awaitFrame();
        const transitions = nodes.map((el, i) => parent(el) === target && Transition.start(el, propsTo[i], duration, "ease")).concat(Transition.start(target, targetPropsTo, duration, "ease"));
        try {
            await Promise.all(transitions);
            nodes.forEach((el, i) => {
                attr(el, attrsTo[i]);
                if (parent(el) === target) {
                    css(el, "display", propsTo[i].opacity === 0 ? "none" : "");
                }
            });
            attr(target, "style", targetStyle);
        } catch (e) {
            attr(nodes, "style", "");
            resetProps(target, targetProps);
        }
    }
    function getProps(el, opacity) {
        const zIndex = css(el, "zIndex");
        return isVisible(el) ? {
            display: "",
            opacity: opacity ? css(el, "opacity") : "0",
            pointerEvents: "none",
            position: "absolute",
            zIndex: zIndex === "auto" ? index(el) : zIndex,
            ...getPositionWithMargin(el)
        } : false;
    }
    function getTransitionProps(target, nodes, currentProps) {
        const propsTo = nodes.map((el, i) => parent(el) && i in currentProps ? currentProps[i] ? isVisible(el) ? getPositionWithMargin(el) : {
            opacity: 0
        } : {
            opacity: isVisible(el) ? 1 : 0
        } : false);
        const propsFrom = propsTo.map((props, i) => {
            const from = parent(nodes[i]) === target && (currentProps[i] || getProps(nodes[i]));
            if (!from) {
                return false;
            }
            if (!props) {
                delete from.opacity;
            } else if (!("opacity" in props)) {
                const {
                    opacity
                } = from;
                if (opacity % 1) {
                    props.opacity = 1;
                } else {
                    delete from.opacity;
                }
            }
            return from;
        });
        return [ propsTo, propsFrom ];
    }
    function resetProps(el, props) {
        for (const prop in props) {
            css(el, prop, "");
        }
    }
    function getPositionWithMargin(el) {
        const {
            height,
            width
        } = offset(el);
        return {
            height: height,
            width: width,
            transform: "",
            ...position(el),
            ...css(el, [ "marginTop", "marginLeft" ])
        };
    }
    function awaitFrame() {
        return new Promise(resolve => requestAnimationFrame(resolve));
    }
    var Animate = {
        props: {
            duration: Number,
            animation: Boolean
        },
        data: {
            duration: 150,
            animation: "slide"
        },
        methods: {
            animate(action, target) {
                if (target === void 0) {
                    target = this.$el;
                }
                const name = this.animation;
                const animationFn = name === "fade" ? fade : name === "delayed-fade" ? function() {
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }
                    return fade(...args, 40);
                } : name ? slide : () => {
                    action();
                    return Promise.resolve();
                };
                return animationFn(action, target, this.duration).catch(noop);
            }
        }
    };
    var filter = {
        mixins: [ Animate ],
        args: "target",
        props: {
            target: Boolean,
            selActive: Boolean
        },
        data: {
            target: null,
            selActive: false,
            attrItem: "uk-filter-control",
            cls: "uk-active",
            duration: 250
        },
        computed: {
            toggles: {
                get(_ref, $el) {
                    let {
                        attrItem
                    } = _ref;
                    return $$("[" + attrItem + "],[data-" + attrItem + "]", $el);
                },
                watch() {
                    this.updateState();
                    if (this.selActive !== false) {
                        const actives = $$(this.selActive, this.$el);
                        this.toggles.forEach(el => toggleClass(el, this.cls, includes(actives, el)));
                    }
                },
                immediate: true
            },
            children: {
                get(_ref2, $el) {
                    let {
                        target
                    } = _ref2;
                    return $$(target + " > *", $el);
                },
                watch(list, old) {
                    if (old && !isEqualList(list, old)) {
                        this.updateState();
                    }
                },
                immediate: true
            }
        },
        events: [ {
            name: "click",
            delegate() {
                return "[" + this.attrItem + "],[data-" + this.attrItem + "]";
            },
            handler(e) {
                e.preventDefault();
                this.apply(e.current);
            }
        } ],
        methods: {
            apply(el) {
                const prevState = this.getState();
                const newState = mergeState(el, this.attrItem, this.getState());
                if (!isEqualState(prevState, newState)) {
                    this.setState(newState);
                }
            },
            getState() {
                return this.toggles.filter(item => hasClass(item, this.cls)).reduce((state, el) => mergeState(el, this.attrItem, state), {
                    filter: {
                        "": ""
                    },
                    sort: []
                });
            },
            async setState(state, animate) {
                if (animate === void 0) {
                    animate = true;
                }
                state = {
                    filter: {
                        "": ""
                    },
                    sort: [],
                    ...state
                };
                trigger(this.$el, "beforeFilter", [ this, state ]);
                this.toggles.forEach(el => toggleClass(el, this.cls, !!matchFilter(el, this.attrItem, state)));
                await Promise.all($$(this.target, this.$el).map(target => {
                    const filterFn = () => {
                        applyState(state, target, children(target));
                        this.$update(this.$el);
                    };
                    return animate ? this.animate(filterFn, target) : filterFn();
                }));
                trigger(this.$el, "afterFilter", [ this ]);
            },
            updateState() {
                fastdom.write(() => this.setState(this.getState(), false));
            }
        }
    };
    function getFilter(el, attr) {
        return parseOptions(data(el, attr), [ "filter" ]);
    }
    function isEqualState(stateA, stateB) {
        return [ "filter", "sort" ].every(prop => isEqual(stateA[prop], stateB[prop]));
    }
    function applyState(state, target, children) {
        const selector = getSelector(state);
        children.forEach(el => css(el, "display", selector && !matches(el, selector) ? "none" : ""));
        const [ sort, order ] = state.sort;
        if (sort) {
            const sorted = sortItems(children, sort, order);
            if (!isEqual(sorted, children)) {
                append(target, sorted);
            }
        }
    }
    function mergeState(el, attr, state) {
        const {
            filter,
            group,
            sort,
            order = "asc"
        } = getFilter(el, attr);
        if (filter || isUndefined(sort)) {
            if (group) {
                if (filter) {
                    delete state.filter[""];
                    state.filter[group] = filter;
                } else {
                    delete state.filter[group];
                    if (isEmpty(state.filter) || "" in state.filter) {
                        state.filter = {
                            "": filter || ""
                        };
                    }
                }
            } else {
                state.filter = {
                    "": filter || ""
                };
            }
        }
        if (!isUndefined(sort)) {
            state.sort = [ sort, order ];
        }
        return state;
    }
    function matchFilter(el, attr, _ref3) {
        let {
            filter: stateFilter = {
                "": ""
            },
            sort: [ stateSort, stateOrder ]
        } = _ref3;
        const {
            filter = "",
            group = "",
            sort,
            order = "asc"
        } = getFilter(el, attr);
        return isUndefined(sort) ? group in stateFilter && filter === stateFilter[group] || !filter && group && !(group in stateFilter) && !stateFilter[""] : stateSort === sort && stateOrder === order;
    }
    function isEqualList(listA, listB) {
        return listA.length === listB.length && listA.every(el => listB.includes(el));
    }
    function getSelector(_ref4) {
        let {
            filter
        } = _ref4;
        let selector = "";
        each(filter, value => selector += value || "");
        return selector;
    }
    function sortItems(nodes, sort, order) {
        return [ ...nodes ].sort((a, b) => data(a, sort).localeCompare(data(b, sort), undefined, {
            numeric: true
        }) * (order === "asc" || -1));
    }
    var Animations$2 = {
        slide: {
            show(dir) {
                return [ {
                    transform: translate(dir * -100)
                }, {
                    transform: translate()
                } ];
            },
            percent(current) {
                return translated(current);
            },
            translate(percent, dir) {
                return [ {
                    transform: translate(dir * -100 * percent)
                }, {
                    transform: translate(dir * 100 * (1 - percent))
                } ];
            }
        }
    };
    function translated(el) {
        return Math.abs(css(el, "transform").split(",")[4] / el.offsetWidth) || 0;
    }
    function translate(value, unit) {
        if (value === void 0) {
            value = 0;
        }
        if (unit === void 0) {
            unit = "%";
        }
        value += value ? unit : "";
        return "translate3d(" + value + ", 0, 0)";
    }
    function scale3d(value) {
        return "scale3d(" + value + ", " + value + ", 1)";
    }
    var Animations$1 = {
        ...Animations$2,
        fade: {
            show() {
                return [ {
                    opacity: 0
                }, {
                    opacity: 1
                } ];
            },
            percent(current) {
                return 1 - css(current, "opacity");
            },
            translate(percent) {
                return [ {
                    opacity: 1 - percent
                }, {
                    opacity: percent
                } ];
            }
        },
        scale: {
            show() {
                return [ {
                    opacity: 0,
                    transform: scale3d(1 - .2)
                }, {
                    opacity: 1,
                    transform: scale3d(1)
                } ];
            },
            percent(current) {
                return 1 - css(current, "opacity");
            },
            translate(percent) {
                return [ {
                    opacity: 1 - percent,
                    transform: scale3d(1 - .2 * percent)
                }, {
                    opacity: percent,
                    transform: scale3d(1 - .2 + .2 * percent)
                } ];
            }
        }
    };
    function Transitioner$1(prev, next, dir, _ref) {
        let {
            animation,
            easing
        } = _ref;
        const {
            percent,
            translate,
            show = noop
        } = animation;
        const props = show(dir);
        const deferred = new Deferred();
        return {
            dir: dir,
            show(duration, percent, linear) {
                if (percent === void 0) {
                    percent = 0;
                }
                const timing = linear ? "linear" : easing;
                duration -= Math.round(duration * clamp(percent, -1, 1));
                this.translate(percent);
                triggerUpdate$1(next, "itemin", {
                    percent: percent,
                    duration: duration,
                    timing: timing,
                    dir: dir
                });
                triggerUpdate$1(prev, "itemout", {
                    percent: 1 - percent,
                    duration: duration,
                    timing: timing,
                    dir: dir
                });
                Promise.all([ Transition.start(next, props[1], duration, timing), Transition.start(prev, props[0], duration, timing) ]).then(() => {
                    this.reset();
                    deferred.resolve();
                }, noop);
                return deferred.promise;
            },
            cancel() {
                Transition.cancel([ next, prev ]);
            },
            reset() {
                for (const prop in props[0]) {
                    css([ next, prev ], prop, "");
                }
            },
            forward(duration, percent) {
                if (percent === void 0) {
                    percent = this.percent();
                }
                Transition.cancel([ next, prev ]);
                return this.show(duration, percent, true);
            },
            translate(percent) {
                this.reset();
                const props = translate(percent, dir);
                css(next, props[1]);
                css(prev, props[0]);
                triggerUpdate$1(next, "itemtranslatein", {
                    percent: percent,
                    dir: dir
                });
                triggerUpdate$1(prev, "itemtranslateout", {
                    percent: 1 - percent,
                    dir: dir
                });
            },
            percent() {
                return percent(prev || next, next, dir);
            },
            getDistance() {
                return prev == null ? void 0 : prev.offsetWidth;
            }
        };
    }
    function triggerUpdate$1(el, type, data) {
        trigger(el, createEvent(type, false, false, data));
    }
    var SliderAutoplay = {
        props: {
            autoplay: Boolean,
            autoplayInterval: Number,
            pauseOnHover: Boolean
        },
        data: {
            autoplay: false,
            autoplayInterval: 7e3,
            pauseOnHover: true
        },
        connected() {
            this.autoplay && this.startAutoplay();
        },
        disconnected() {
            this.stopAutoplay();
        },
        update() {
            attr(this.slides, "tabindex", "-1");
        },
        events: [ {
            name: "visibilitychange",
            el() {
                return document;
            },
            filter() {
                return this.autoplay;
            },
            handler() {
                if (document.hidden) {
                    this.stopAutoplay();
                } else {
                    this.startAutoplay();
                }
            }
        } ],
        methods: {
            startAutoplay() {
                this.stopAutoplay();
                this.interval = setInterval(() => (!this.draggable || !$(":focus", this.$el)) && (!this.pauseOnHover || !matches(this.$el, ":hover")) && !this.stack.length && this.show("next"), this.autoplayInterval);
            },
            stopAutoplay() {
                this.interval && clearInterval(this.interval);
            }
        }
    };
    const pointerOptions = {
        passive: false,
        capture: true
    };
    const pointerUpOptions = {
        passive: true,
        capture: true
    };
    const pointerDown = "touchstart mousedown";
    const pointerMove = "touchmove mousemove";
    const pointerUp = "touchend touchcancel mouseup click input scroll";
    var SliderDrag = {
        props: {
            draggable: Boolean
        },
        data: {
            draggable: true,
            threshold: 10
        },
        created() {
            for (const key of [ "start", "move", "end" ]) {
                const fn = this[key];
                this[key] = e => {
                    const pos = getEventPos(e).x * (isRtl ? -1 : 1);
                    this.prevPos = pos === this.pos ? this.prevPos : this.pos;
                    this.pos = pos;
                    fn(e);
                };
            }
        },
        events: [ {
            name: pointerDown,
            passive: true,
            delegate() {
                return this.selSlides;
            },
            handler(e) {
                if (!this.draggable || !isTouch(e) && hasSelectableText(e.target) || closest(e.target, selInput) || e.button > 0 || this.length < 2) {
                    return;
                }
                this.start(e);
            }
        }, {
            name: "dragstart",
            handler(e) {
                e.preventDefault();
            }
        }, {
            name: pointerMove,
            el() {
                return this.list;
            },
            handler: noop,
            ...pointerOptions
        } ],
        methods: {
            start() {
                this.drag = this.pos;
                if (this._transitioner) {
                    this.percent = this._transitioner.percent();
                    this.drag += this._transitioner.getDistance() * this.percent * this.dir;
                    this._transitioner.cancel();
                    this._transitioner.translate(this.percent);
                    this.dragging = true;
                    this.stack = [];
                } else {
                    this.prevIndex = this.index;
                }
                on(document, pointerMove, this.move, pointerOptions);
                on(document, pointerUp, this.end, pointerUpOptions);
                css(this.list, "userSelect", "none");
            },
            move(e) {
                const distance = this.pos - this.drag;
                if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
                    return;
                }
                css(this.list, "pointerEvents", "none");
                e.cancelable && e.preventDefault();
                this.dragging = true;
                this.dir = distance < 0 ? 1 : -1;
                const {
                    slides
                } = this;
                let {
                    prevIndex
                } = this;
                let dis = Math.abs(distance);
                let nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
                let width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
                while (nextIndex !== prevIndex && dis > width) {
                    this.drag -= width * this.dir;
                    prevIndex = nextIndex;
                    dis -= width;
                    nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
                    width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
                }
                this.percent = dis / width;
                const prev = slides[prevIndex];
                const next = slides[nextIndex];
                const changed = this.index !== nextIndex;
                const edge = prevIndex === nextIndex;
                let itemShown;
                [ this.index, this.prevIndex ].filter(i => !includes([ nextIndex, prevIndex ], i)).forEach(i => {
                    trigger(slides[i], "itemhidden", [ this ]);
                    if (edge) {
                        itemShown = true;
                        this.prevIndex = prevIndex;
                    }
                });
                if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
                    trigger(slides[this.index], "itemshown", [ this ]);
                }
                if (changed) {
                    this.prevIndex = prevIndex;
                    this.index = nextIndex;
                    !edge && trigger(prev, "beforeitemhide", [ this ]);
                    trigger(next, "beforeitemshow", [ this ]);
                }
                this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);
                if (changed) {
                    !edge && trigger(prev, "itemhide", [ this ]);
                    trigger(next, "itemshow", [ this ]);
                }
            },
            end() {
                off(document, pointerMove, this.move, pointerOptions);
                off(document, pointerUp, this.end, pointerUpOptions);
                if (this.dragging) {
                    this.dragging = null;
                    if (this.index === this.prevIndex) {
                        this.percent = 1 - this.percent;
                        this.dir *= -1;
                        this._show(false, this.index, true);
                        this._transitioner = null;
                    } else {
                        const dirChange = (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
                        this.index = dirChange ? this.index : this.prevIndex;
                        if (dirChange) {
                            this.percent = 1 - this.percent;
                        }
                        this.show(this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? "next" : "previous", true);
                    }
                }
                css(this.list, {
                    userSelect: "",
                    pointerEvents: ""
                });
                this.drag = this.percent = null;
            }
        }
    };
    function hasSelectableText(el) {
        return css(el, "userSelect") !== "none" && toNodes(el.childNodes).some(el => el.nodeType === 3 && el.textContent.trim());
    }
    var SliderNav = {
        data: {
            selNav: false
        },
        computed: {
            nav(_ref, $el) {
                let {
                    selNav
                } = _ref;
                return $(selNav, $el);
            },
            selNavItem(_ref2) {
                let {
                    attrItem
                } = _ref2;
                return "[" + attrItem + "],[data-" + attrItem + "]";
            },
            navItems(_, $el) {
                return $$(this.selNavItem, $el);
            }
        },
        update: {
            write() {
                if (this.nav && this.length !== this.nav.children.length) {
                    html(this.nav, this.slides.map((_, i) => "<li " + this.attrItem + '="' + i + '"><a href></a></li>').join(""));
                }
                this.navItems.concat(this.nav).forEach(el => el && (el.hidden = !this.maxIndex));
                this.updateNav();
            },
            events: [ "resize" ]
        },
        events: [ {
            name: "click",
            delegate() {
                return this.selNavItem;
            },
            handler(e) {
                e.preventDefault();
                this.show(data(e.current, this.attrItem));
            }
        }, {
            name: "itemshow",
            handler: "updateNav"
        } ],
        methods: {
            updateNav() {
                const i = this.getValidIndex();
                for (const el of this.navItems) {
                    const cmd = data(el, this.attrItem);
                    toggleClass(el, this.clsActive, toNumber(cmd) === i);
                    toggleClass(el, "uk-invisible", this.finite && (cmd === "previous" && i === 0 || cmd === "next" && i >= this.maxIndex));
                }
            }
        }
    };
    var Slider = {
        mixins: [ SliderAutoplay, SliderDrag, SliderNav, Resize ],
        props: {
            clsActivated: Boolean,
            easing: String,
            index: Number,
            finite: Boolean,
            velocity: Number,
            selSlides: String
        },
        data: () => ({
            easing: "ease",
            finite: false,
            velocity: 1,
            index: 0,
            prevIndex: -1,
            stack: [],
            percent: 0,
            clsActive: "uk-active",
            clsActivated: false,
            Transitioner: false,
            transitionOptions: {}
        }),
        connected() {
            this.prevIndex = -1;
            this.index = this.getValidIndex(this.$props.index);
            this.stack = [];
        },
        disconnected() {
            removeClass(this.slides, this.clsActive);
        },
        computed: {
            duration(_ref, $el) {
                let {
                    velocity
                } = _ref;
                return speedUp($el.offsetWidth / velocity);
            },
            list(_ref2, $el) {
                let {
                    selList
                } = _ref2;
                return $(selList, $el);
            },
            maxIndex() {
                return this.length - 1;
            },
            selSlides(_ref3) {
                let {
                    selList,
                    selSlides
                } = _ref3;
                return selList + " " + (selSlides || "> *");
            },
            slides: {
                get() {
                    return $$(this.selSlides, this.$el);
                },
                watch() {
                    this.$emit("resize");
                }
            },
            length() {
                return this.slides.length;
            }
        },
        methods: {
            show(index, force) {
                if (force === void 0) {
                    force = false;
                }
                if (this.dragging || !this.length) {
                    return;
                }
                const {
                    stack
                } = this;
                const queueIndex = force ? 0 : stack.length;
                const reset = () => {
                    stack.splice(queueIndex, 1);
                    if (stack.length) {
                        this.show(stack.shift(), true);
                    }
                };
                stack[force ? "unshift" : "push"](index);
                if (!force && stack.length > 1) {
                    if (stack.length === 2) {
                        this._transitioner.forward(Math.min(this.duration, 200));
                    }
                    return;
                }
                const prevIndex = this.getIndex(this.index);
                const prev = hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
                const nextIndex = this.getIndex(index, this.index);
                const next = this.slides[nextIndex];
                if (prev === next) {
                    reset();
                    return;
                }
                this.dir = getDirection(index, prevIndex);
                this.prevIndex = prevIndex;
                this.index = nextIndex;
                if (prev && !trigger(prev, "beforeitemhide", [ this ]) || !trigger(next, "beforeitemshow", [ this, prev ])) {
                    this.index = this.prevIndex;
                    reset();
                    return;
                }
                const promise = this._show(prev, next, force).then(() => {
                    prev && trigger(prev, "itemhidden", [ this ]);
                    trigger(next, "itemshown", [ this ]);
                    return new Promise(resolve => {
                        requestAnimationFrame(() => {
                            stack.shift();
                            if (stack.length) {
                                this.show(stack.shift(), true);
                            } else {
                                this._transitioner = null;
                            }
                            resolve();
                        });
                    });
                });
                prev && trigger(prev, "itemhide", [ this ]);
                trigger(next, "itemshow", [ this ]);
                return promise;
            },
            getIndex(index, prev) {
                if (index === void 0) {
                    index = this.index;
                }
                if (prev === void 0) {
                    prev = this.index;
                }
                return clamp(getIndex(index, this.slides, prev, this.finite), 0, this.maxIndex);
            },
            getValidIndex(index, prevIndex) {
                if (index === void 0) {
                    index = this.index;
                }
                if (prevIndex === void 0) {
                    prevIndex = this.prevIndex;
                }
                return this.getIndex(index, prevIndex);
            },
            _show(prev, next, force) {
                this._transitioner = this._getTransitioner(prev, next, this.dir, {
                    easing: force ? next.offsetWidth < 600 ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "cubic-bezier(0.165, 0.84, 0.44, 1)" : this.easing,
                    ...this.transitionOptions
                });
                if (!force && !prev) {
                    this._translate(1);
                    return Promise.resolve();
                }
                const {
                    length
                } = this.stack;
                return this._transitioner[length > 1 ? "forward" : "show"](length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration, this.percent);
            },
            _getDistance(prev, next) {
                return this._getTransitioner(prev, prev !== next && next).getDistance();
            },
            _translate(percent, prev, next) {
                if (prev === void 0) {
                    prev = this.prevIndex;
                }
                if (next === void 0) {
                    next = this.index;
                }
                const transitioner = this._getTransitioner(prev !== next ? prev : false, next);
                transitioner.translate(percent);
                return transitioner;
            },
            _getTransitioner(prev, next, dir, options) {
                if (prev === void 0) {
                    prev = this.prevIndex;
                }
                if (next === void 0) {
                    next = this.index;
                }
                if (dir === void 0) {
                    dir = this.dir || 1;
                }
                if (options === void 0) {
                    options = this.transitionOptions;
                }
                return new this.Transitioner(isNumber(prev) ? this.slides[prev] : prev, isNumber(next) ? this.slides[next] : next, dir * (isRtl ? -1 : 1), options);
            }
        }
    };
    function getDirection(index, prevIndex) {
        return index === "next" ? 1 : index === "previous" ? -1 : index < prevIndex ? -1 : 1;
    }
    function speedUp(x) {
        return .5 * x + 300;
    }
    var Slideshow = {
        mixins: [ Slider ],
        props: {
            animation: String
        },
        data: {
            animation: "slide",
            clsActivated: "uk-transition-active",
            Animations: Animations$2,
            Transitioner: Transitioner$1
        },
        computed: {
            animation(_ref) {
                let {
                    animation,
                    Animations
                } = _ref;
                return {
                    ...Animations[animation] || Animations.slide,
                    name: animation
                };
            },
            transitionOptions() {
                return {
                    animation: this.animation
                };
            }
        },
        events: {
            beforeitemshow(_ref2) {
                let {
                    target
                } = _ref2;
                addClass(target, this.clsActive);
            },
            itemshown(_ref3) {
                let {
                    target
                } = _ref3;
                addClass(target, this.clsActivated);
            },
            itemhidden(_ref4) {
                let {
                    target
                } = _ref4;
                removeClass(target, this.clsActive, this.clsActivated);
            }
        }
    };
    var LightboxPanel = {
        mixins: [ Container, Modal, Togglable, Slideshow ],
        functional: true,
        props: {
            delayControls: Number,
            preload: Number,
            videoAutoplay: Boolean,
            template: String
        },
        data: () => ({
            preload: 1,
            videoAutoplay: false,
            delayControls: 3e3,
            items: [],
            cls: "uk-open",
            clsPage: "uk-lightbox-page",
            selList: ".uk-lightbox-items",
            attrItem: "uk-lightbox-item",
            selClose: ".uk-close-large",
            selCaption: ".uk-lightbox-caption",
            pauseOnHover: false,
            velocity: 2,
            Animations: Animations$1,
            template: '<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>'
        }),
        created() {
            const $el = $(this.template);
            const list = $(this.selList, $el);
            this.items.forEach(() => append(list, "<li>"));
            this.$mount(append(this.container, $el));
        },
        computed: {
            caption(_ref, $el) {
                let {
                    selCaption
                } = _ref;
                return $(selCaption, $el);
            }
        },
        events: [ {
            name: pointerMove$1 + " " + pointerDown$1 + " keydown",
            handler: "showControls"
        }, {
            name: "click",
            self: true,
            delegate() {
                return this.selSlides;
            },
            handler(e) {
                if (e.defaultPrevented) {
                    return;
                }
                this.hide();
            }
        }, {
            name: "shown",
            self: true,
            handler() {
                this.showControls();
            }
        }, {
            name: "hide",
            self: true,
            handler() {
                this.hideControls();
                removeClass(this.slides, this.clsActive);
                Transition.stop(this.slides);
            }
        }, {
            name: "hidden",
            self: true,
            handler() {
                this.$destroy(true);
            }
        }, {
            name: "keyup",
            el() {
                return document;
            },
            handler(e) {
                if (!this.isToggled(this.$el) || !this.draggable) {
                    return;
                }
                switch (e.keyCode) {
                  case 37:
                    this.show("previous");
                    break;

                  case 39:
                    this.show("next");
                    break;
                }
            }
        }, {
            name: "beforeitemshow",
            handler(e) {
                if (this.isToggled()) {
                    return;
                }
                this.draggable = false;
                e.preventDefault();
                this.toggleElement(this.$el, true, false);
                this.animation = Animations$1["scale"];
                removeClass(e.target, this.clsActive);
                this.stack.splice(1, 0, this.index);
            }
        }, {
            name: "itemshow",
            handler() {
                html(this.caption, this.getItem().caption || "");
                for (let j = -this.preload; j <= this.preload; j++) {
                    this.loadItem(this.index + j);
                }
            }
        }, {
            name: "itemshown",
            handler() {
                this.draggable = this.$props.draggable;
            }
        }, {
            name: "itemload",
            async handler(_, item) {
                const {
                    source: src,
                    type,
                    alt = "",
                    poster,
                    attrs = {}
                } = item;
                this.setItem(item, "<span uk-spinner></span>");
                if (!src) {
                    return;
                }
                let matches;
                const iframeAttrs = {
                    allowfullscreen: "",
                    style: "max-width: 100%; box-sizing: border-box;",
                    "uk-responsive": "",
                    "uk-video": "" + this.videoAutoplay
                };
                if (type === "image" || src.match(/\.(avif|jpe?g|jfif|a?png|gif|svg|webp)($|\?)/i)) {
                    try {
                        const {
                            width,
                            height
                        } = await getImage(src, attrs.srcset, attrs.size);
                        this.setItem(item, createEl("img", {
                            src: src,
                            width: width,
                            height: height,
                            alt: alt,
                            ...attrs
                        }));
                    } catch (e) {
                        this.setError(item);
                    }
                } else if (type === "video" || src.match(/\.(mp4|webm|ogv)($|\?)/i)) {
                    const video = createEl("video", {
                        src: src,
                        poster: poster,
                        controls: "",
                        playsinline: "",
                        "uk-video": "" + this.videoAutoplay
                    });
                    on(video, "loadedmetadata", () => {
                        attr(video, {
                            width: video.videoWidth,
                            height: video.videoHeight,
                            ...attrs
                        });
                        this.setItem(item, video);
                    });
                    on(video, "error", () => this.setError(item));
                } else if (type === "iframe" || src.match(/\.(html|php)($|\?)/i)) {
                    this.setItem(item, createEl("iframe", {
                        src: src,
                        allowfullscreen: "",
                        class: "uk-lightbox-iframe",
                        ...attrs
                    }));
                } else if (matches = src.match(/\/\/(?:.*?youtube(-nocookie)?\..*?[?&]v=|youtu\.be\/)([\w-]{11})[&?]?(.*)?/)) {
                    this.setItem(item, createEl("iframe", {
                        src: "https://www.youtube" + (matches[1] || "") + ".com/embed/" + matches[2] + (matches[3] ? "?" + matches[3] : ""),
                        width: 1920,
                        height: 1080,
                        ...iframeAttrs,
                        ...attrs
                    }));
                } else if (matches = src.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/)) {
                    try {
                        const {
                            height,
                            width
                        } = await (await fetch("https://vimeo.com/api/oembed.json?maxwidth=1920&url=" + encodeURI(src), {
                            credentials: "omit"
                        })).json();
                        this.setItem(item, createEl("iframe", {
                            src: "https://player.vimeo.com/video/" + matches[1] + (matches[2] ? "?" + matches[2] : ""),
                            width: width,
                            height: height,
                            ...iframeAttrs,
                            ...attrs
                        }));
                    } catch (e) {
                        this.setError(item);
                    }
                }
            }
        } ],
        methods: {
            loadItem(index) {
                if (index === void 0) {
                    index = this.index;
                }
                const item = this.getItem(index);
                if (!this.getSlide(item).childElementCount) {
                    trigger(this.$el, "itemload", [ item ]);
                }
            },
            getItem(index) {
                if (index === void 0) {
                    index = this.index;
                }
                return this.items[getIndex(index, this.slides)];
            },
            setItem(item, content) {
                trigger(this.$el, "itemloaded", [ this, html(this.getSlide(item), content) ]);
            },
            getSlide(item) {
                return this.slides[this.items.indexOf(item)];
            },
            setError(item) {
                this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
            },
            showControls() {
                clearTimeout(this.controlsTimer);
                this.controlsTimer = setTimeout(this.hideControls, this.delayControls);
                addClass(this.$el, "uk-active", "uk-transition-active");
            },
            hideControls() {
                removeClass(this.$el, "uk-active", "uk-transition-active");
            }
        }
    };
    function createEl(tag, attrs) {
        const el = fragment("<" + tag + ">");
        attr(el, attrs);
        return el;
    }
    var lightbox = {
        install: install$1,
        props: {
            toggle: String
        },
        data: {
            toggle: "a"
        },
        computed: {
            toggles: {
                get(_ref, $el) {
                    let {
                        toggle
                    } = _ref;
                    return $$(toggle, $el);
                },
                watch() {
                    this.hide();
                }
            }
        },
        disconnected() {
            this.hide();
        },
        events: [ {
            name: "click",
            delegate() {
                return this.toggle + ":not(.uk-disabled)";
            },
            handler(e) {
                e.preventDefault();
                this.show(e.current);
            }
        } ],
        methods: {
            show(index) {
                const items = uniqueBy(this.toggles.map(toItem), "source");
                if (isElement(index)) {
                    const {
                        source
                    } = toItem(index);
                    index = findIndex(items, _ref2 => {
                        let {
                            source: src
                        } = _ref2;
                        return source === src;
                    });
                }
                this.panel = this.panel || this.$create("lightboxPanel", {
                    ...this.$props,
                    items: items
                });
                on(this.panel.$el, "hidden", () => this.panel = null);
                return this.panel.show(index);
            },
            hide() {
                var _this$panel;
                return (_this$panel = this.panel) == null ? void 0 : _this$panel.hide();
            }
        }
    };
    function install$1(UIkit, Lightbox) {
        if (!UIkit.lightboxPanel) {
            UIkit.component("lightboxPanel", LightboxPanel);
        }
        assign(Lightbox.props, UIkit.component("lightboxPanel").options.props);
    }
    function toItem(el) {
        const item = {};
        for (const attr of [ "href", "caption", "type", "poster", "alt", "attrs" ]) {
            item[attr === "href" ? "source" : attr] = data(el, attr);
        }
        item.attrs = parseOptions(item.attrs);
        return item;
    }
    var notification = {
        mixins: [ Container ],
        functional: true,
        args: [ "message", "status" ],
        data: {
            message: "",
            status: "",
            timeout: 5e3,
            group: null,
            pos: "top-center",
            clsContainer: "uk-notification",
            clsClose: "uk-notification-close",
            clsMsg: "uk-notification-message"
        },
        install: install,
        computed: {
            marginProp(_ref) {
                let {
                    pos
                } = _ref;
                return "margin" + (startsWith(pos, "top") ? "Top" : "Bottom");
            },
            startProps() {
                return {
                    opacity: 0,
                    [this.marginProp]: -this.$el.offsetHeight
                };
            }
        },
        created() {
            const container = $("." + this.clsContainer + "-" + this.pos, this.container) || append(this.container, '<div class="' + this.clsContainer + " " + this.clsContainer + "-" + this.pos + '" style="display: block"></div>');
            this.$mount(append(container, '<div class="' + this.clsMsg + (this.status ? " " + this.clsMsg + "-" + this.status : "") + '" role="alert"> <a href class="' + this.clsClose + '" data-uk-close></a> <div>' + this.message + "</div> </div>"));
        },
        async connected() {
            const margin = toFloat(css(this.$el, this.marginProp));
            await Transition.start(css(this.$el, this.startProps), {
                opacity: 1,
                [this.marginProp]: margin
            });
            if (this.timeout) {
                this.timer = setTimeout(this.close, this.timeout);
            }
        },
        events: {
            click(e) {
                if (closest(e.target, 'a[href="#"],a[href=""]')) {
                    e.preventDefault();
                }
                this.close();
            },
            [pointerEnter]() {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            [pointerLeave]() {
                if (this.timeout) {
                    this.timer = setTimeout(this.close, this.timeout);
                }
            }
        },
        methods: {
            async close(immediate) {
                const removeFn = el => {
                    const container = parent(el);
                    trigger(el, "close", [ this ]);
                    remove$1(el);
                    if (!(container != null && container.hasChildNodes())) {
                        remove$1(container);
                    }
                };
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                if (!immediate) {
                    await Transition.start(this.$el, this.startProps);
                }
                removeFn(this.$el);
            }
        }
    };
    function install(UIkit) {
        UIkit.notification.closeAll = function(group, immediate) {
            apply(document.body, el => {
                const notification = UIkit.getComponent(el, "notification");
                if (notification && (!group || group === notification.group)) {
                    notification.close(immediate);
                }
            });
        };
    }
    const props = {
        x: transformFn,
        y: transformFn,
        rotate: transformFn,
        scale: transformFn,
        color: colorFn,
        backgroundColor: colorFn,
        borderColor: colorFn,
        blur: filterFn,
        hue: filterFn,
        fopacity: filterFn,
        grayscale: filterFn,
        invert: filterFn,
        saturate: filterFn,
        sepia: filterFn,
        opacity: cssPropFn,
        stroke: strokeFn,
        bgx: backgroundFn,
        bgy: backgroundFn
    };
    const {
        keys
    } = Object;
    var Parallax = {
        mixins: [ Media ],
        props: fillObject(keys(props), "list"),
        data: fillObject(keys(props), undefined),
        computed: {
            props(properties, $el) {
                const stops = {};
                for (const prop in properties) {
                    if (prop in props && !isUndefined(properties[prop])) {
                        stops[prop] = properties[prop].slice();
                    }
                }
                const result = {};
                for (const prop in stops) {
                    result[prop] = props[prop](prop, $el, stops[prop], stops);
                }
                return result;
            }
        },
        events: {
            load() {
                this.$emit();
            }
        },
        methods: {
            reset() {
                for (const prop in this.getCss(0)) {
                    css(this.$el, prop, "");
                }
            },
            getCss(percent) {
                const css = {
                    transform: "",
                    filter: ""
                };
                for (const prop in this.props) {
                    this.props[prop](css, percent);
                }
                return css;
            }
        }
    };
    function transformFn(prop, el, stops) {
        let unit = getUnit(stops) || {
            x: "px",
            y: "px",
            rotate: "deg"
        }[prop] || "";
        let transformFn;
        if (prop === "x" || prop === "y") {
            prop = "translate" + ucfirst(prop);
            transformFn = stop => toFloat(toFloat(stop).toFixed(unit === "px" ? 0 : 6));
        } else if (prop === "scale") {
            unit = "";
            transformFn = stop => getUnit([ stop ]) ? toPx(stop, "width", el, true) / el.offsetWidth : stop;
        }
        if (stops.length === 1) {
            stops.unshift(prop === "scale" ? 1 : 0);
        }
        stops = parseStops(stops, transformFn);
        return (css, percent) => {
            css.transform += " " + prop + "(" + getValue(stops, percent) + unit + ")";
        };
    }
    function colorFn(prop, el, stops) {
        if (stops.length === 1) {
            stops.unshift(getCssValue(el, prop, ""));
        }
        stops = parseStops(stops, stop => parseColor(el, stop));
        return (css, percent) => {
            const [ start, end, p ] = getStop(stops, percent);
            const value = start.map((value, i) => {
                value += p * (end[i] - value);
                return i === 3 ? toFloat(value) : parseInt(value, 10);
            }).join(",");
            css[prop] = "rgba(" + value + ")";
        };
    }
    function parseColor(el, color) {
        return getCssValue(el, "color", color).split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(toFloat);
    }
    function filterFn(prop, el, stops) {
        if (stops.length === 1) {
            stops.unshift(0);
        }
        const unit = getUnit(stops) || {
            blur: "px",
            hue: "deg"
        }[prop] || "%";
        prop = {
            fopacity: "opacity",
            hue: "hue-rotate"
        }[prop] || prop;
        stops = parseStops(stops);
        return (css, percent) => {
            const value = getValue(stops, percent);
            css.filter += " " + prop + "(" + (value + unit) + ")";
        };
    }
    function cssPropFn(prop, el, stops) {
        if (stops.length === 1) {
            stops.unshift(getCssValue(el, prop, ""));
        }
        stops = parseStops(stops);
        return (css, percent) => {
            css[prop] = getValue(stops, percent);
        };
    }
    function strokeFn(prop, el, stops) {
        if (stops.length === 1) {
            stops.unshift(0);
        }
        const unit = getUnit(stops);
        const length = getMaxPathLength(el);
        stops = parseStops(stops.reverse(), stop => {
            stop = toFloat(stop);
            return unit === "%" ? stop * length / 100 : stop;
        });
        if (!stops.some(_ref => {
            let [ value ] = _ref;
            return value;
        })) {
            return noop;
        }
        css(el, "strokeDasharray", length);
        return (css, percent) => {
            css.strokeDashoffset = getValue(stops, percent);
        };
    }
    function backgroundFn(prop, el, stops, props) {
        if (stops.length === 1) {
            stops.unshift(0);
        }
        const attr = prop === "bgy" ? "height" : "width";
        props[prop] = parseStops(stops, stop => toPx(stop, attr, el));
        const bgProps = [ "bgx", "bgy" ].filter(prop => prop in props);
        if (bgProps.length === 2 && prop === "bgx") {
            return noop;
        }
        if (getCssValue(el, "backgroundSize", "") === "cover") {
            return backgroundCoverFn(prop, el, stops, props);
        }
        const positions = {};
        for (const prop of bgProps) {
            positions[prop] = getBackgroundPos(el, prop);
        }
        return setBackgroundPosFn(bgProps, positions, props);
    }
    function backgroundCoverFn(prop, el, stops, props) {
        const dimImage = getBackgroundImageDimensions(el);
        if (!dimImage.width) {
            return noop;
        }
        const dimEl = {
            width: el.offsetWidth,
            height: el.offsetHeight
        };
        const bgProps = [ "bgx", "bgy" ].filter(prop => prop in props);
        const positions = {};
        for (const prop of bgProps) {
            const values = props[prop].map(_ref2 => {
                let [ value ] = _ref2;
                return value;
            });
            const min = Math.min(...values);
            const max = Math.max(...values);
            const down = values.indexOf(min) < values.indexOf(max);
            const diff = max - min;
            positions[prop] = (down ? -diff : 0) - (down ? min : max) + "px";
            dimEl[prop === "bgy" ? "height" : "width"] += diff;
        }
        const dim = Dimensions.cover(dimImage, dimEl);
        for (const prop of bgProps) {
            const attr = prop === "bgy" ? "height" : "width";
            const overflow = dim[attr] - dimEl[attr];
            positions[prop] = "max(" + getBackgroundPos(el, prop) + ",-" + overflow + "px) + " + positions[prop];
        }
        const fn = setBackgroundPosFn(bgProps, positions, props);
        return (css, percent) => {
            fn(css, percent);
            css.backgroundSize = dim.width + "px " + dim.height + "px";
            css.backgroundRepeat = "no-repeat";
        };
    }
    function getBackgroundPos(el, prop) {
        return getCssValue(el, "background-position-" + prop.substr(-1), "");
    }
    function setBackgroundPosFn(bgProps, positions, props) {
        return function(css, percent) {
            for (const prop of bgProps) {
                const value = getValue(props[prop], percent);
                css["background-position-" + prop.substr(-1)] = "calc(" + positions[prop] + " + " + value + "px)";
            }
        };
    }
    const dimensions = {};
    function getBackgroundImageDimensions(el) {
        const src = css(el, "backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/, "$1");
        if (dimensions[src]) {
            return dimensions[src];
        }
        const image = new Image();
        if (src) {
            image.src = src;
            if (!image.naturalWidth) {
                image.onload = () => {
                    dimensions[src] = toDimensions(image);
                    trigger(el, createEvent("load", false));
                };
                return toDimensions(image);
            }
        }
        return dimensions[src] = toDimensions(image);
    }
    function toDimensions(image) {
        return {
            width: image.naturalWidth,
            height: image.naturalHeight
        };
    }
    function parseStops(stops, fn) {
        if (fn === void 0) {
            fn = toFloat;
        }
        const result = [];
        const {
            length
        } = stops;
        let nullIndex = 0;
        for (let i = 0; i < length; i++) {
            let [ value, percent ] = isString(stops[i]) ? stops[i].trim().split(" ") : [ stops[i] ];
            value = fn(value);
            percent = percent ? toFloat(percent) / 100 : null;
            if (i === 0) {
                if (percent === null) {
                    percent = 0;
                } else if (percent) {
                    result.push([ value, 0 ]);
                }
            } else if (i === length - 1) {
                if (percent === null) {
                    percent = 1;
                } else if (percent !== 1) {
                    result.push([ value, percent ]);
                    percent = 1;
                }
            }
            result.push([ value, percent ]);
            if (percent === null) {
                nullIndex++;
            } else if (nullIndex) {
                const leftPercent = result[i - nullIndex - 1][1];
                const p = (percent - leftPercent) / (nullIndex + 1);
                for (let j = nullIndex; j > 0; j--) {
                    result[i - j][1] = leftPercent + p * (nullIndex - j + 1);
                }
                nullIndex = 0;
            }
        }
        return result;
    }
    function getStop(stops, percent) {
        const index = findIndex(stops.slice(1), _ref3 => {
            let [ , targetPercent ] = _ref3;
            return percent <= targetPercent;
        }) + 1;
        return [ stops[index - 1][0], stops[index][0], (percent - stops[index - 1][1]) / (stops[index][1] - stops[index - 1][1]) ];
    }
    function getValue(stops, percent) {
        const [ start, end, p ] = getStop(stops, percent);
        return isNumber(start) ? start + Math.abs(start - end) * p * (start < end ? 1 : -1) : +end;
    }
    const unitRe = /^-?\d+(\S+)/;
    function getUnit(stops, defaultUnit) {
        for (const stop of stops) {
            const match = stop.match == null ? void 0 : stop.match(unitRe);
            if (match) {
                return match[1];
            }
        }
        return defaultUnit;
    }
    function getCssValue(el, prop, value) {
        const prev = el.style[prop];
        const val = css(css(el, prop, value), prop);
        el.style[prop] = prev;
        return val;
    }
    function fillObject(keys, value) {
        return keys.reduce((data, prop) => {
            data[prop] = value;
            return data;
        }, {});
    }
    var parallax = {
        mixins: [ Parallax, Resize, Scroll ],
        props: {
            target: String,
            viewport: Number,
            easing: Number,
            start: String,
            end: String
        },
        data: {
            target: false,
            viewport: 1,
            easing: 1,
            start: 0,
            end: 0
        },
        computed: {
            target(_ref, $el) {
                let {
                    target
                } = _ref;
                return getOffsetElement(target && query(target, $el) || $el);
            },
            start(_ref2) {
                let {
                    start
                } = _ref2;
                return toPx(start, "height", this.target, true);
            },
            end(_ref3) {
                let {
                    end,
                    viewport
                } = _ref3;
                return toPx(end || (viewport = (1 - viewport) * 100) && viewport + "vh+" + viewport + "%", "height", this.target, true);
            }
        },
        update: {
            read(_ref4, types) {
                let {
                    percent
                } = _ref4;
                if (!types.has("scroll")) {
                    percent = false;
                }
                if (!this.matchMedia) {
                    return;
                }
                const prev = percent;
                percent = ease(scrolledOver(this.target, this.start, this.end), this.easing);
                return {
                    percent: percent,
                    style: prev === percent ? false : this.getCss(percent)
                };
            },
            write(_ref5) {
                let {
                    style
                } = _ref5;
                if (!this.matchMedia) {
                    this.reset();
                    return;
                }
                style && css(this.$el, style);
            },
            events: [ "scroll", "resize" ]
        }
    };
    function ease(percent, easing) {
        return easing >= 0 ? Math.pow(percent, easing + 1) : 1 - Math.pow(1 - percent, 1 - easing);
    }
    function getOffsetElement(el) {
        return el ? "offsetTop" in el ? el : getOffsetElement(parent(el)) : document.documentElement;
    }
    var SliderReactive = {
        update: {
            write() {
                if (this.stack.length || this.dragging) {
                    return;
                }
                const index = this.getValidIndex(this.index);
                if (!~this.prevIndex || this.index !== index) {
                    this.show(index);
                } else {
                    this._translate(1, this.prevIndex, this.index);
                }
            },
            events: [ "resize" ]
        }
    };
    var SliderPreload = {
        mixins: [ Lazyload ],
        connected() {
            this.lazyload(this.slides, this.getAdjacentSlides);
        }
    };
    function Transitioner(prev, next, dir, _ref) {
        let {
            center,
            easing,
            list
        } = _ref;
        const deferred = new Deferred();
        const from = prev ? getLeft(prev, list, center) : getLeft(next, list, center) + dimensions$1(next).width * dir;
        const to = next ? getLeft(next, list, center) : from + dimensions$1(prev).width * dir * (isRtl ? -1 : 1);
        return {
            dir: dir,
            show(duration, percent, linear) {
                if (percent === void 0) {
                    percent = 0;
                }
                const timing = linear ? "linear" : easing;
                duration -= Math.round(duration * clamp(percent, -1, 1));
                this.translate(percent);
                percent = prev ? percent : clamp(percent, 0, 1);
                triggerUpdate(this.getItemIn(), "itemin", {
                    percent: percent,
                    duration: duration,
                    timing: timing,
                    dir: dir
                });
                prev && triggerUpdate(this.getItemIn(true), "itemout", {
                    percent: 1 - percent,
                    duration: duration,
                    timing: timing,
                    dir: dir
                });
                Transition.start(list, {
                    transform: translate(-to * (isRtl ? -1 : 1), "px")
                }, duration, timing).then(deferred.resolve, noop);
                return deferred.promise;
            },
            cancel() {
                Transition.cancel(list);
            },
            reset() {
                css(list, "transform", "");
            },
            forward(duration, percent) {
                if (percent === void 0) {
                    percent = this.percent();
                }
                Transition.cancel(list);
                return this.show(duration, percent, true);
            },
            translate(percent) {
                const distance = this.getDistance() * dir * (isRtl ? -1 : 1);
                css(list, "transform", translate(clamp(-to + (distance - distance * percent), -getWidth(list), dimensions$1(list).width) * (isRtl ? -1 : 1), "px"));
                const actives = this.getActives();
                const itemIn = this.getItemIn();
                const itemOut = this.getItemIn(true);
                percent = prev ? clamp(percent, -1, 1) : 0;
                for (const slide of children(list)) {
                    const isActive = includes(actives, slide);
                    const isIn = slide === itemIn;
                    const isOut = slide === itemOut;
                    const translateIn = isIn || !isOut && (isActive || dir * (isRtl ? -1 : 1) === -1 ^ getElLeft(slide, list) > getElLeft(prev || next));
                    triggerUpdate(slide, "itemtranslate" + (translateIn ? "in" : "out"), {
                        dir: dir,
                        percent: isOut ? 1 - percent : isIn ? percent : isActive ? 1 : 0
                    });
                }
            },
            percent() {
                return Math.abs((css(list, "transform").split(",")[4] * (isRtl ? -1 : 1) + from) / (to - from));
            },
            getDistance() {
                return Math.abs(to - from);
            },
            getItemIn(out) {
                if (out === void 0) {
                    out = false;
                }
                let actives = this.getActives();
                let nextActives = inView(list, getLeft(next || prev, list, center));
                if (out) {
                    const temp = actives;
                    actives = nextActives;
                    nextActives = temp;
                }
                return nextActives[findIndex(nextActives, el => !includes(actives, el))];
            },
            getActives() {
                return inView(list, getLeft(prev || next, list, center));
            }
        };
    }
    function getLeft(el, list, center) {
        const left = getElLeft(el, list);
        return center ? left - centerEl(el, list) : Math.min(left, getMax(list));
    }
    function getMax(list) {
        return Math.max(0, getWidth(list) - dimensions$1(list).width);
    }
    function getWidth(list) {
        return children(list).reduce((right, el) => dimensions$1(el).width + right, 0);
    }
    function centerEl(el, list) {
        return dimensions$1(list).width / 2 - dimensions$1(el).width / 2;
    }
    function getElLeft(el, list) {
        return el && (position(el).left + (isRtl ? dimensions$1(el).width - dimensions$1(list).width : 0)) * (isRtl ? -1 : 1) || 0;
    }
    function inView(list, listLeft) {
        listLeft -= 1;
        const listWidth = dimensions$1(list).width;
        const listRight = listLeft + listWidth + 2;
        return children(list).filter(slide => {
            const slideLeft = getElLeft(slide, list);
            const slideRight = slideLeft + Math.min(dimensions$1(slide).width, listWidth);
            return slideLeft >= listLeft && slideRight <= listRight;
        });
    }
    function triggerUpdate(el, type, data) {
        trigger(el, createEvent(type, false, false, data));
    }
    var slider = {
        mixins: [ Class, Slider, SliderReactive, SliderPreload ],
        props: {
            center: Boolean,
            sets: Boolean
        },
        data: {
            center: false,
            sets: false,
            attrItem: "uk-slider-item",
            selList: ".uk-slider-items",
            selNav: ".uk-slider-nav",
            clsContainer: "uk-slider-container",
            Transitioner: Transitioner
        },
        computed: {
            avgWidth() {
                return getWidth(this.list) / this.length;
            },
            finite(_ref) {
                let {
                    finite
                } = _ref;
                return finite || Math.ceil(getWidth(this.list)) < Math.trunc(dimensions$1(this.list).width + getMaxElWidth(this.list) + this.center);
            },
            maxIndex() {
                if (!this.finite || this.center && !this.sets) {
                    return this.length - 1;
                }
                if (this.center) {
                    return last(this.sets);
                }
                let lft = 0;
                const max = getMax(this.list);
                const index = findIndex(this.slides, el => {
                    if (lft >= max) {
                        return true;
                    }
                    lft += dimensions$1(el).width;
                });
                return ~index ? index : this.length - 1;
            },
            sets(_ref2) {
                let {
                    sets: enabled
                } = _ref2;
                if (!enabled) {
                    return;
                }
                let left = 0;
                const sets = [];
                const width = dimensions$1(this.list).width;
                for (let i = 0; i < this.slides.length; i++) {
                    const slideWidth = dimensions$1(this.slides[i]).width;
                    if (left + slideWidth > width) {
                        left = 0;
                    }
                    if (this.center) {
                        if (left < width / 2 && left + slideWidth + dimensions$1(this.slides[+i + 1]).width / 2 > width / 2) {
                            sets.push(+i);
                            left = width / 2 - slideWidth / 2;
                        }
                    } else if (left === 0) {
                        sets.push(Math.min(+i, this.maxIndex));
                    }
                    left += slideWidth;
                }
                if (sets.length) {
                    return sets;
                }
            },
            transitionOptions() {
                return {
                    center: this.center,
                    list: this.list
                };
            }
        },
        connected() {
            toggleClass(this.$el, this.clsContainer, !$("." + this.clsContainer, this.$el));
        },
        update: {
            write() {
                for (const el of this.navItems) {
                    const index = toNumber(data(el, this.attrItem));
                    if (index !== false) {
                        el.hidden = !this.maxIndex || index > this.maxIndex || this.sets && !includes(this.sets, index);
                    }
                }
                if (this.length && !this.dragging && !this.stack.length) {
                    this.reorder();
                    this._translate(1);
                }
                this.updateActiveClasses();
            },
            events: [ "resize" ]
        },
        events: {
            beforeitemshow(e) {
                if (!this.dragging && this.sets && this.stack.length < 2 && !includes(this.sets, this.index)) {
                    this.index = this.getValidIndex();
                }
                const diff = Math.abs(this.index - this.prevIndex + (this.dir > 0 && this.index < this.prevIndex || this.dir < 0 && this.index > this.prevIndex ? (this.maxIndex + 1) * this.dir : 0));
                if (!this.dragging && diff > 1) {
                    for (let i = 0; i < diff; i++) {
                        this.stack.splice(1, 0, this.dir > 0 ? "next" : "previous");
                    }
                    e.preventDefault();
                    return;
                }
                const index = this.dir < 0 || !this.slides[this.prevIndex] ? this.index : this.prevIndex;
                this.duration = speedUp(this.avgWidth / this.velocity) * (dimensions$1(this.slides[index]).width / this.avgWidth);
                this.reorder();
            },
            itemshow() {
                if (~this.prevIndex) {
                    addClass(this._getTransitioner().getItemIn(), this.clsActive);
                }
            },
            itemshown() {
                this.updateActiveClasses();
            }
        },
        methods: {
            reorder() {
                if (this.finite) {
                    css(this.slides, "order", "");
                    return;
                }
                const index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;
                this.slides.forEach((slide, i) => css(slide, "order", this.dir > 0 && i < index ? 1 : this.dir < 0 && i >= this.index ? -1 : ""));
                if (!this.center) {
                    return;
                }
                const next = this.slides[index];
                let width = dimensions$1(this.list).width / 2 - dimensions$1(next).width / 2;
                let j = 0;
                while (width > 0) {
                    const slideIndex = this.getIndex(--j + index, index);
                    const slide = this.slides[slideIndex];
                    css(slide, "order", slideIndex > index ? -2 : -1);
                    width -= dimensions$1(slide).width;
                }
            },
            updateActiveClasses() {
                const actives = this._getTransitioner(this.index).getActives();
                const activeClasses = [ this.clsActive, (!this.sets || includes(this.sets, toFloat(this.index))) && this.clsActivated || "" ];
                for (const slide of this.slides) {
                    toggleClass(slide, activeClasses, includes(actives, slide));
                }
            },
            getValidIndex(index, prevIndex) {
                if (index === void 0) {
                    index = this.index;
                }
                if (prevIndex === void 0) {
                    prevIndex = this.prevIndex;
                }
                index = this.getIndex(index, prevIndex);
                if (!this.sets) {
                    return index;
                }
                let prev;
                do {
                    if (includes(this.sets, index)) {
                        return index;
                    }
                    prev = index;
                    index = this.getIndex(index + this.dir, prevIndex);
                } while (index !== prev);
                return index;
            },
            getAdjacentSlides() {
                const {
                    width
                } = dimensions$1(this.list);
                const left = -width;
                const right = width * 2;
                const slideWidth = dimensions$1(this.slides[this.index]).width;
                const slideLeft = this.center ? width / 2 - slideWidth / 2 : 0;
                const slides = new Set();
                for (const i of [ -1, 1 ]) {
                    let currentLeft = slideLeft + (i > 0 ? slideWidth : 0);
                    let j = 0;
                    do {
                        const slide = this.slides[this.getIndex(this.index + i + j++ * i)];
                        currentLeft += dimensions$1(slide).width * i;
                        slides.add(slide);
                    } while (this.slides.length > j && currentLeft > left && currentLeft < right);
                }
                return Array.from(slides);
            }
        }
    };
    function getMaxElWidth(list) {
        return Math.max(0, ...children(list).map(el => dimensions$1(el).width));
    }
    var sliderParallax = {
        mixins: [ Parallax ],
        data: {
            selItem: "!li"
        },
        beforeConnect() {
            this.item = query(this.selItem, this.$el);
        },
        disconnected() {
            this.item = null;
        },
        events: [ {
            name: "itemin itemout",
            self: true,
            el() {
                return this.item;
            },
            handler(_ref) {
                let {
                    type,
                    detail: {
                        percent,
                        duration,
                        timing,
                        dir
                    }
                } = _ref;
                fastdom.read(() => {
                    if (!this.matchMedia) {
                        return;
                    }
                    const propsFrom = this.getCss(getCurrentPercent(type, dir, percent));
                    const propsTo = this.getCss(isIn(type) ? .5 : dir > 0 ? 1 : 0);
                    fastdom.write(() => {
                        css(this.$el, propsFrom);
                        Transition.start(this.$el, propsTo, duration, timing).catch(noop);
                    });
                });
            }
        }, {
            name: "transitioncanceled transitionend",
            self: true,
            el() {
                return this.item;
            },
            handler() {
                Transition.cancel(this.$el);
            }
        }, {
            name: "itemtranslatein itemtranslateout",
            self: true,
            el() {
                return this.item;
            },
            handler(_ref2) {
                let {
                    type,
                    detail: {
                        percent,
                        dir
                    }
                } = _ref2;
                fastdom.read(() => {
                    if (!this.matchMedia) {
                        this.reset();
                        return;
                    }
                    const props = this.getCss(getCurrentPercent(type, dir, percent));
                    fastdom.write(() => css(this.$el, props));
                });
            }
        } ]
    };
    function isIn(type) {
        return endsWith(type, "in");
    }
    function getCurrentPercent(type, dir, percent) {
        percent /= 2;
        return isIn(type) ^ dir < 0 ? percent : 1 - percent;
    }
    var Animations = {
        ...Animations$2,
        fade: {
            show() {
                return [ {
                    opacity: 0,
                    zIndex: 0
                }, {
                    zIndex: -1
                } ];
            },
            percent(current) {
                return 1 - css(current, "opacity");
            },
            translate(percent) {
                return [ {
                    opacity: 1 - percent,
                    zIndex: 0
                }, {
                    zIndex: -1
                } ];
            }
        },
        scale: {
            show() {
                return [ {
                    opacity: 0,
                    transform: scale3d(1 + .5),
                    zIndex: 0
                }, {
                    zIndex: -1
                } ];
            },
            percent(current) {
                return 1 - css(current, "opacity");
            },
            translate(percent) {
                return [ {
                    opacity: 1 - percent,
                    transform: scale3d(1 + .5 * percent),
                    zIndex: 0
                }, {
                    zIndex: -1
                } ];
            }
        },
        pull: {
            show(dir) {
                return dir < 0 ? [ {
                    transform: translate(30),
                    zIndex: -1
                }, {
                    transform: translate(),
                    zIndex: 0
                } ] : [ {
                    transform: translate(-100),
                    zIndex: 0
                }, {
                    transform: translate(),
                    zIndex: -1
                } ];
            },
            percent(current, next, dir) {
                return dir < 0 ? 1 - translated(next) : translated(current);
            },
            translate(percent, dir) {
                return dir < 0 ? [ {
                    transform: translate(30 * percent),
                    zIndex: -1
                }, {
                    transform: translate(-100 * (1 - percent)),
                    zIndex: 0
                } ] : [ {
                    transform: translate(-percent * 100),
                    zIndex: 0
                }, {
                    transform: translate(30 * (1 - percent)),
                    zIndex: -1
                } ];
            }
        },
        push: {
            show(dir) {
                return dir < 0 ? [ {
                    transform: translate(100),
                    zIndex: 0
                }, {
                    transform: translate(),
                    zIndex: -1
                } ] : [ {
                    transform: translate(-30),
                    zIndex: -1
                }, {
                    transform: translate(),
                    zIndex: 0
                } ];
            },
            percent(current, next, dir) {
                return dir > 0 ? 1 - translated(next) : translated(current);
            },
            translate(percent, dir) {
                return dir < 0 ? [ {
                    transform: translate(percent * 100),
                    zIndex: 0
                }, {
                    transform: translate(-30 * (1 - percent)),
                    zIndex: -1
                } ] : [ {
                    transform: translate(-30 * percent),
                    zIndex: -1
                }, {
                    transform: translate(100 * (1 - percent)),
                    zIndex: 0
                } ];
            }
        }
    };
    var slideshow = {
        mixins: [ Class, Slideshow, SliderReactive, SliderPreload ],
        props: {
            ratio: String,
            minHeight: Number,
            maxHeight: Number
        },
        data: {
            ratio: "16:9",
            minHeight: false,
            maxHeight: false,
            selList: ".uk-slideshow-items",
            attrItem: "uk-slideshow-item",
            selNav: ".uk-slideshow-nav",
            Animations: Animations
        },
        update: {
            read() {
                if (!this.list) {
                    return false;
                }
                let [ width, height ] = this.ratio.split(":").map(Number);
                height = height * this.list.offsetWidth / width || 0;
                if (this.minHeight) {
                    height = Math.max(this.minHeight, height);
                }
                if (this.maxHeight) {
                    height = Math.min(this.maxHeight, height);
                }
                return {
                    height: height - boxModelAdjust(this.list, "height", "content-box")
                };
            },
            write(_ref) {
                let {
                    height
                } = _ref;
                height > 0 && css(this.list, "minHeight", height);
            },
            events: [ "resize" ]
        },
        methods: {
            getAdjacentSlides() {
                return [ 1, -1 ].map(i => this.slides[this.getIndex(this.index + i)]);
            }
        }
    };
    var sortable = {
        mixins: [ Class, Animate ],
        props: {
            group: String,
            threshold: Number,
            clsItem: String,
            clsPlaceholder: String,
            clsDrag: String,
            clsDragState: String,
            clsBase: String,
            clsNoDrag: String,
            clsEmpty: String,
            clsCustom: String,
            handle: String
        },
        data: {
            group: false,
            threshold: 5,
            clsItem: "uk-sortable-item",
            clsPlaceholder: "uk-sortable-placeholder",
            clsDrag: "uk-sortable-drag",
            clsDragState: "uk-drag",
            clsBase: "uk-sortable",
            clsNoDrag: "uk-sortable-nodrag",
            clsEmpty: "uk-sortable-empty",
            clsCustom: "",
            handle: false,
            pos: {}
        },
        created() {
            for (const key of [ "init", "start", "move", "end" ]) {
                const fn = this[key];
                this[key] = e => {
                    assign(this.pos, getEventPos(e));
                    fn(e);
                };
            }
        },
        events: {
            name: pointerDown$1,
            passive: false,
            handler: "init"
        },
        computed: {
            target() {
                return (this.$el.tBodies || [ this.$el ])[0];
            },
            items() {
                return children(this.target);
            },
            isEmpty: {
                get() {
                    return isEmpty(this.items);
                },
                watch(empty) {
                    toggleClass(this.target, this.clsEmpty, empty);
                },
                immediate: true
            },
            handles: {
                get(_ref, el) {
                    let {
                        handle
                    } = _ref;
                    return handle ? $$(handle, el) : this.items;
                },
                watch(handles, prev) {
                    css(prev, {
                        touchAction: "",
                        userSelect: ""
                    });
                    css(handles, {
                        touchAction: hasTouch ? "none" : "",
                        userSelect: "none"
                    });
                },
                immediate: true
            }
        },
        update: {
            write(data) {
                if (!this.drag || !parent(this.placeholder)) {
                    return;
                }
                const {
                    pos: {
                        x,
                        y
                    },
                    origin: {
                        offsetTop,
                        offsetLeft
                    },
                    placeholder
                } = this;
                css(this.drag, {
                    top: y - offsetTop,
                    left: x - offsetLeft
                });
                const sortable = this.getSortable(document.elementFromPoint(x, y));
                if (!sortable) {
                    return;
                }
                const {
                    items
                } = sortable;
                if (items.some(Transition.inProgress)) {
                    return;
                }
                const target = findTarget(items, {
                    x: x,
                    y: y
                });
                if (items.length && (!target || target === placeholder)) {
                    return;
                }
                const previous = this.getSortable(placeholder);
                const insertTarget = findInsertTarget(sortable.target, target, placeholder, x, y, sortable === previous && data.moved !== target);
                if (insertTarget === false) {
                    return;
                }
                if (insertTarget && placeholder === insertTarget) {
                    return;
                }
                if (sortable !== previous) {
                    previous.remove(placeholder);
                    data.moved = target;
                } else {
                    delete data.moved;
                }
                sortable.insert(placeholder, insertTarget);
                this.touched.add(sortable);
            },
            events: [ "move" ]
        },
        methods: {
            init(e) {
                const {
                    target,
                    button,
                    defaultPrevented
                } = e;
                const [ placeholder ] = this.items.filter(el => within(target, el));
                if (!placeholder || defaultPrevented || button > 0 || isInput(target) || within(target, "." + this.clsNoDrag) || this.handle && !within(target, this.handle)) {
                    return;
                }
                e.preventDefault();
                this.touched = new Set([ this ]);
                this.placeholder = placeholder;
                this.origin = {
                    target: target,
                    index: index(placeholder),
                    ...this.pos
                };
                on(document, pointerMove$1, this.move);
                on(document, pointerUp$1, this.end);
                if (!this.threshold) {
                    this.start(e);
                }
            },
            start(e) {
                this.drag = appendDrag(this.$container, this.placeholder);
                const {
                    left,
                    top
                } = this.placeholder.getBoundingClientRect();
                assign(this.origin, {
                    offsetLeft: this.pos.x - left,
                    offsetTop: this.pos.y - top
                });
                addClass(this.drag, this.clsDrag, this.clsCustom);
                addClass(this.placeholder, this.clsPlaceholder);
                addClass(this.items, this.clsItem);
                addClass(document.documentElement, this.clsDragState);
                trigger(this.$el, "start", [ this, this.placeholder ]);
                trackScroll(this.pos);
                this.move(e);
            },
            move(e) {
                if (this.drag) {
                    this.$emit("move");
                } else if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
                    this.start(e);
                }
            },
            end() {
                off(document, pointerMove$1, this.move);
                off(document, pointerUp$1, this.end);
                if (!this.drag) {
                    return;
                }
                untrackScroll();
                const sortable = this.getSortable(this.placeholder);
                if (this === sortable) {
                    if (this.origin.index !== index(this.placeholder)) {
                        trigger(this.$el, "moved", [ this, this.placeholder ]);
                    }
                } else {
                    trigger(sortable.$el, "added", [ sortable, this.placeholder ]);
                    trigger(this.$el, "removed", [ this, this.placeholder ]);
                }
                trigger(this.$el, "stop", [ this, this.placeholder ]);
                remove$1(this.drag);
                this.drag = null;
                for (const {
                    clsPlaceholder,
                    clsItem
                } of this.touched) {
                    for (const sortable of this.touched) {
                        removeClass(sortable.items, clsPlaceholder, clsItem);
                    }
                }
                this.touched = null;
                removeClass(document.documentElement, this.clsDragState);
            },
            insert(element, target) {
                addClass(this.items, this.clsItem);
                const insert = () => target ? before(target, element) : append(this.target, element);
                this.animate(insert);
            },
            remove(element) {
                if (!within(element, this.target)) {
                    return;
                }
                this.animate(() => remove$1(element));
            },
            getSortable(element) {
                do {
                    const sortable = this.$getComponent(element, "sortable");
                    if (sortable && (sortable === this || this.group !== false && sortable.group === this.group)) {
                        return sortable;
                    }
                } while (element = parent(element));
            }
        }
    };
    let trackTimer;
    function trackScroll(pos) {
        let last = Date.now();
        trackTimer = setInterval(() => {
            let {
                x,
                y
            } = pos;
            y += document.scrollingElement.scrollTop;
            const dist = (Date.now() - last) * .3;
            last = Date.now();
            scrollParents(document.elementFromPoint(x, pos.y), /auto|scroll/).reverse().some(scrollEl => {
                let {
                    scrollTop: scroll,
                    scrollHeight
                } = scrollEl;
                const {
                    top,
                    bottom,
                    height
                } = offsetViewport(scrollEl);
                if (top < y && top + 35 > y) {
                    scroll -= dist;
                } else if (bottom > y && bottom - 35 < y) {
                    scroll += dist;
                } else {
                    return;
                }
                if (scroll > 0 && scroll < scrollHeight - height) {
                    scrollEl.scrollTop = scroll;
                    return true;
                }
            });
        }, 15);
    }
    function untrackScroll() {
        clearInterval(trackTimer);
    }
    function appendDrag(container, element) {
        let clone;
        if ([ "li", "tr" ].some(tag => isTag(element, tag))) {
            clone = $("<div>");
            append(clone, element.cloneNode(true).children);
            for (const attribute of element.getAttributeNames()) {
                attr(clone, attribute, element.getAttribute(attribute));
            }
        } else {
            clone = element.cloneNode(true);
        }
        append(container, clone);
        css(clone, "margin", "0", "important");
        css(clone, {
            boxSizing: "border-box",
            width: element.offsetWidth,
            height: element.offsetHeight,
            padding: css(element, "padding")
        });
        height(clone.firstElementChild, height(element.firstElementChild));
        return clone;
    }
    function findTarget(items, point) {
        return items[findIndex(items, item => pointInRect(point, item.getBoundingClientRect()))];
    }
    function findInsertTarget(list, target, placeholder, x, y, sameList) {
        if (!children(list).length) {
            return;
        }
        const rect = target.getBoundingClientRect();
        if (!sameList) {
            if (!isHorizontal(list, placeholder)) {
                return y < rect.top + rect.height / 2 ? target : target.nextElementSibling;
            }
            return target;
        }
        const placeholderRect = placeholder.getBoundingClientRect();
        const sameRow = linesIntersect([ rect.top, rect.bottom ], [ placeholderRect.top, placeholderRect.bottom ]);
        const pointerPos = sameRow ? x : y;
        const lengthProp = sameRow ? "width" : "height";
        const startProp = sameRow ? "left" : "top";
        const endProp = sameRow ? "right" : "bottom";
        const diff = placeholderRect[lengthProp] < rect[lengthProp] ? rect[lengthProp] - placeholderRect[lengthProp] : 0;
        if (placeholderRect[startProp] < rect[startProp]) {
            if (diff && pointerPos < rect[startProp] + diff) {
                return false;
            }
            return target.nextElementSibling;
        }
        if (diff && pointerPos > rect[endProp] - diff) {
            return false;
        }
        return target;
    }
    function isHorizontal(list, placeholder) {
        const single = children(list).length === 1;
        if (single) {
            append(list, placeholder);
        }
        const items = children(list);
        const isHorizontal = items.some((el, i) => {
            const rectA = el.getBoundingClientRect();
            return items.slice(i + 1).some(el => {
                const rectB = el.getBoundingClientRect();
                return !linesIntersect([ rectA.left, rectA.right ], [ rectB.left, rectB.right ]);
            });
        });
        if (single) {
            remove$1(placeholder);
        }
        return isHorizontal;
    }
    function linesIntersect(lineA, lineB) {
        return lineA[1] > lineB[0] && lineB[1] > lineA[0];
    }
    var tooltip = {
        mixins: [ Container, Togglable, Position ],
        args: "title",
        props: {
            delay: Number,
            title: String
        },
        data: {
            pos: "top",
            title: "",
            delay: 0,
            animation: [ "uk-animation-scale-up" ],
            duration: 100,
            cls: "uk-active"
        },
        beforeConnect() {
            this.id = "uk-tooltip-" + this._uid;
            this._hasTitle = hasAttr(this.$el, "title");
            attr(this.$el, {
                title: "",
                "aria-describedby": this.id
            });
            makeFocusable(this.$el);
        },
        disconnected() {
            this.hide();
            if (!attr(this.$el, "title")) {
                attr(this.$el, "title", this._hasTitle ? this.title : null);
            }
        },
        methods: {
            show() {
                if (this.isToggled(this.tooltip || null) || !this.title) {
                    return;
                }
                this._unbind = once(document, "keydown " + pointerDown$1, this.hide, false, e => e.type === pointerDown$1 && !within(e.target, this.$el) || e.type === "keydown" && e.keyCode === 27);
                clearTimeout(this.showTimer);
                this.showTimer = setTimeout(this._show, this.delay);
            },
            async hide() {
                if (matches(this.$el, "input:focus")) {
                    return;
                }
                clearTimeout(this.showTimer);
                if (!this.isToggled(this.tooltip || null)) {
                    return;
                }
                await this.toggleElement(this.tooltip, false, false);
                remove$1(this.tooltip);
                this.tooltip = null;
                this._unbind();
            },
            _show() {
                this.tooltip = append(this.container, '<div id="' + this.id + '" class="uk-' + this.$options.name + '" role="tooltip"> <div class="uk-' + this.$options.name + '-inner">' + this.title + "</div> </div>");
                on(this.tooltip, "toggled", (e, toggled) => {
                    if (!toggled) {
                        return;
                    }
                    this.positionAt(this.tooltip, this.$el);
                    const [ dir, align ] = getAlignment(this.tooltip, this.$el, this.pos);
                    this.origin = this.axis === "y" ? flipPosition(dir) + "-" + align : align + "-" + flipPosition(dir);
                });
                this.toggleElement(this.tooltip, true);
            }
        },
        events: {
            focus: "show",
            blur: "hide",
            [pointerEnter + " " + pointerLeave](e) {
                if (!isTouch(e)) {
                    this[e.type === pointerEnter ? "show" : "hide"]();
                }
            },
            [pointerDown$1](e) {
                if (isTouch(e)) {
                    this.show();
                }
            }
        }
    };
    function makeFocusable(el) {
        if (!isFocusable(el)) {
            attr(el, "tabindex", "0");
        }
    }
    function getAlignment(el, target, _ref) {
        let [ dir, align ] = _ref;
        const elOffset = offset(el);
        const targetOffset = offset(target);
        const properties = [ [ "left", "right" ], [ "top", "bottom" ] ];
        for (const props of properties) {
            if (elOffset[props[0]] >= targetOffset[props[1]]) {
                dir = props[1];
                break;
            }
            if (elOffset[props[1]] <= targetOffset[props[0]]) {
                dir = props[0];
                break;
            }
        }
        const props = includes(properties[0], dir) ? properties[1] : properties[0];
        if (elOffset[props[0]] === targetOffset[props[0]]) {
            align = props[0];
        } else if (elOffset[props[1]] === targetOffset[props[1]]) {
            align = props[1];
        } else {
            align = "center";
        }
        return [ dir, align ];
    }
    var upload = {
        props: {
            allow: String,
            clsDragover: String,
            concurrent: Number,
            maxSize: Number,
            method: String,
            mime: String,
            msgInvalidMime: String,
            msgInvalidName: String,
            msgInvalidSize: String,
            multiple: Boolean,
            name: String,
            params: Object,
            type: String,
            url: String
        },
        data: {
            allow: false,
            clsDragover: "uk-dragover",
            concurrent: 1,
            maxSize: 0,
            method: "POST",
            mime: false,
            msgInvalidMime: "Invalid File Type: %s",
            msgInvalidName: "Invalid File Name: %s",
            msgInvalidSize: "Invalid File Size: %s Kilobytes Max",
            multiple: false,
            name: "files[]",
            params: {},
            type: "",
            url: "",
            abort: noop,
            beforeAll: noop,
            beforeSend: noop,
            complete: noop,
            completeAll: noop,
            error: noop,
            fail: noop,
            load: noop,
            loadEnd: noop,
            loadStart: noop,
            progress: noop
        },
        events: {
            change(e) {
                if (!matches(e.target, 'input[type="file"]')) {
                    return;
                }
                e.preventDefault();
                if (e.target.files) {
                    this.upload(e.target.files);
                }
                e.target.value = "";
            },
            drop(e) {
                stop(e);
                const transfer = e.dataTransfer;
                if (!(transfer != null && transfer.files)) {
                    return;
                }
                removeClass(this.$el, this.clsDragover);
                this.upload(transfer.files);
            },
            dragenter(e) {
                stop(e);
            },
            dragover(e) {
                stop(e);
                addClass(this.$el, this.clsDragover);
            },
            dragleave(e) {
                stop(e);
                removeClass(this.$el, this.clsDragover);
            }
        },
        methods: {
            async upload(files) {
                files = toArray(files);
                if (!files.length) {
                    return;
                }
                trigger(this.$el, "upload", [ files ]);
                for (const file of files) {
                    if (this.maxSize && this.maxSize * 1e3 < file.size) {
                        this.fail(this.msgInvalidSize.replace("%s", this.maxSize));
                        return;
                    }
                    if (this.allow && !match(this.allow, file.name)) {
                        this.fail(this.msgInvalidName.replace("%s", this.allow));
                        return;
                    }
                    if (this.mime && !match(this.mime, file.type)) {
                        this.fail(this.msgInvalidMime.replace("%s", this.mime));
                        return;
                    }
                }
                if (!this.multiple) {
                    files = files.slice(0, 1);
                }
                this.beforeAll(this, files);
                const chunks = chunk(files, this.concurrent);
                const upload = async files => {
                    const data = new FormData();
                    files.forEach(file => data.append(this.name, file));
                    for (const key in this.params) {
                        data.append(key, this.params[key]);
                    }
                    try {
                        const xhr = await ajax(this.url, {
                            data: data,
                            method: this.method,
                            responseType: this.type,
                            beforeSend: env => {
                                const {
                                    xhr
                                } = env;
                                xhr.upload && on(xhr.upload, "progress", this.progress);
                                for (const type of [ "loadStart", "load", "loadEnd", "abort" ]) {
                                    on(xhr, type.toLowerCase(), this[type]);
                                }
                                return this.beforeSend(env);
                            }
                        });
                        this.complete(xhr);
                        if (chunks.length) {
                            await upload(chunks.shift());
                        } else {
                            this.completeAll(xhr);
                        }
                    } catch (e) {
                        this.error(e);
                    }
                };
                await upload(chunks.shift());
            }
        }
    };
    function match(pattern, path) {
        return path.match(new RegExp("^" + pattern.replace(/\//g, "\\/").replace(/\*\*/g, "(\\/[^\\/]+)*").replace(/\*/g, "[^\\/]+").replace(/((?!\\))\?/g, "$1.") + "$", "i"));
    }
    function chunk(files, size) {
        const chunks = [];
        for (let i = 0; i < files.length; i += size) {
            chunks.push(files.slice(i, i + size));
        }
        return chunks;
    }
    function stop(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    var components = Object.freeze({
        __proto__: null,
        Countdown: countdown,
        Filter: filter,
        Lightbox: lightbox,
        LightboxPanel: LightboxPanel,
        Notification: notification,
        Parallax: parallax,
        Slider: slider,
        SliderParallax: sliderParallax,
        Slideshow: slideshow,
        SlideshowParallax: sliderParallax,
        Sortable: sortable,
        Tooltip: tooltip,
        Upload: upload
    });
    each(components, (component, name) => UIkit.component(name, component));
    return UIkit;
});

(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define("uikiticons", factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, 
    global.UIkitIcons = factory());
})(this, function() {
    "use strict";
    function plugin(UIkit) {
        if (plugin.installed) {
            return;
        }
        UIkit.icon.add({
            "500px": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.624,11.866c-0.141,0.132,0.479,0.658,0.662,0.418c0.051-0.046,0.607-0.61,0.662-0.664c0,0,0.738,0.719,0.814,0.719 c0.1,0,0.207-0.055,0.322-0.17c0.27-0.269,0.135-0.416,0.066-0.495l-0.631-0.616l0.658-0.668c0.146-0.156,0.021-0.314-0.1-0.449 c-0.182-0.18-0.359-0.226-0.471-0.125l-0.656,0.654l-0.654-0.654c-0.033-0.034-0.08-0.045-0.124-0.045 c-0.079,0-0.191,0.068-0.307,0.181c-0.202,0.202-0.247,0.351-0.133,0.462l0.665,0.665L9.624,11.866z"/><path d="M11.066,2.884c-1.061,0-2.185,0.248-3.011,0.604c-0.087,0.034-0.141,0.106-0.15,0.205C7.893,3.784,7.919,3.909,7.982,4.066 c0.05,0.136,0.187,0.474,0.452,0.372c0.844-0.326,1.779-0.507,2.633-0.507c0.963,0,1.9,0.191,2.781,0.564 c0.695,0.292,1.357,0.719,2.078,1.34c0.051,0.044,0.105,0.068,0.164,0.068c0.143,0,0.273-0.137,0.389-0.271 c0.191-0.214,0.324-0.395,0.135-0.575c-0.686-0.654-1.436-1.138-2.363-1.533C13.24,3.097,12.168,2.884,11.066,2.884z"/><path d="M16.43,15.747c-0.092-0.028-0.242,0.05-0.309,0.119l0,0c-0.652,0.652-1.42,1.169-2.268,1.521 c-0.877,0.371-1.814,0.551-2.779,0.551c-0.961,0-1.896-0.189-2.775-0.564c-0.848-0.36-1.612-0.879-2.268-1.53 c-0.682-0.688-1.196-1.455-1.529-2.268c-0.325-0.799-0.471-1.643-0.471-1.643c-0.045-0.24-0.258-0.249-0.567-0.203 c-0.128,0.021-0.519,0.079-0.483,0.36v0.01c0.105,0.644,0.289,1.284,0.545,1.895c0.417,0.969,1.002,1.849,1.756,2.604 c0.757,0.754,1.636,1.34,2.604,1.757C8.901,18.785,9.97,19,11.088,19c1.104,0,2.186-0.215,3.188-0.645 c1.838-0.896,2.604-1.757,2.604-1.757c0.182-0.204,0.227-0.317-0.1-0.643C16.779,15.956,16.525,15.774,16.43,15.747z"/><path d="M5.633,13.287c0.293,0.71,0.723,1.341,1.262,1.882c0.54,0.54,1.172,0.971,1.882,1.264c0.731,0.303,1.509,0.461,2.298,0.461 c0.801,0,1.578-0.158,2.297-0.461c0.711-0.293,1.344-0.724,1.883-1.264c0.543-0.541,0.971-1.172,1.264-1.882 c0.314-0.721,0.463-1.5,0.463-2.298c0-0.79-0.148-1.569-0.463-2.289c-0.293-0.699-0.721-1.329-1.264-1.881 c-0.539-0.541-1.172-0.959-1.867-1.263c-0.721-0.303-1.5-0.461-2.299-0.461c-0.802,0-1.613,0.159-2.322,0.461 c-0.577,0.25-1.544,0.867-2.119,1.454v0.012V2.108h8.16C15.1,2.104,15.1,1.69,15.1,1.552C15.1,1.417,15.1,1,14.809,1H5.915 C5.676,1,5.527,1.192,5.527,1.384v6.84c0,0.214,0.273,0.372,0.529,0.428c0.5,0.105,0.614-0.056,0.737-0.224l0,0 c0.18-0.273,0.776-0.884,0.787-0.894c0.901-0.905,2.117-1.408,3.416-1.408c1.285,0,2.5,0.501,3.412,1.408 c0.914,0.914,1.408,2.122,1.408,3.405c0,1.288-0.508,2.496-1.408,3.405c-0.9,0.896-2.152,1.406-3.438,1.406 c-0.877,0-1.711-0.229-2.433-0.671v-4.158c0-0.553,0.237-1.151,0.643-1.614c0.462-0.519,1.094-0.799,1.782-0.799 c0.664,0,1.293,0.253,1.758,0.715c0.459,0.459,0.709,1.071,0.709,1.723c0,1.385-1.094,2.468-2.488,2.468 c-0.273,0-0.769-0.121-0.781-0.125c-0.281-0.087-0.405,0.306-0.438,0.436c-0.159,0.496,0.079,0.585,0.123,0.607 c0.452,0.137,0.743,0.157,1.129,0.157c1.973,0,3.572-1.6,3.572-3.57c0-1.964-1.6-3.552-3.572-3.552c-0.97,0-1.872,0.36-2.546,1.038 c-0.656,0.631-1.027,1.487-1.027,2.322v3.438v-0.011c-0.372-0.42-0.732-1.041-0.981-1.682c-0.102-0.248-0.315-0.202-0.607-0.113 c-0.135,0.035-0.519,0.157-0.44,0.439C5.372,12.799,5.577,13.164,5.633,13.287z"/></svg>',
            album: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="10" height="1"/><rect x="3" y="4" width="14" height="1"/><rect fill="none" stroke="#000" x="1.5" y="6.5" width="17" height="11"/></svg>',
            "arrow-down": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10.5,16.08 5.63,10.66 6.37,10 10.5,14.58 14.63,10 15.37,10.66"/><line fill="none" stroke="#000" x1="10.5" y1="4" x2="10.5" y2="15"/></svg>',
            "arrow-left": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5"/><line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52"/></svg>',
            "arrow-right": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="10 5 15 9.5 10 14"/><line fill="none" stroke="#000" x1="4" y1="9.5" x2="15" y2="9.5"/></svg>',
            "arrow-up": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10.5,4 15.37,9.4 14.63,10.08 10.5,5.49 6.37,10.08 5.63,9.4"/><line fill="none" stroke="#000" x1="10.5" y1="16" x2="10.5" y2="5"/></svg>',
            bag: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M7.5,7.5V4A2.48,2.48,0,0,1,10,1.5,2.54,2.54,0,0,1,12.5,4V7.5"/><polygon fill="none" stroke="#000" points="16.5 7.5 3.5 7.5 2.5 18.5 17.5 18.5 16.5 7.5"/></svg>',
            ban: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><line fill="none" stroke="#000" stroke-width="1.1" x1="4" y1="3.5" x2="16" y2="16.5"/></svg>',
            behance: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.5,10.6c-0.4-0.5-0.9-0.9-1.6-1.1c1.7-1,2.2-3.2,0.7-4.7C7.8,4,6.3,4,5.2,4C3.5,4,1.7,4,0,4v12c1.7,0,3.4,0,5.2,0 c1,0,2.1,0,3.1-0.5C10.2,14.6,10.5,12.3,9.5,10.6L9.5,10.6z M5.6,6.1c1.8,0,1.8,2.7-0.1,2.7c-1,0-2,0-2.9,0V6.1H5.6z M2.6,13.8v-3.1 c1.1,0,2.1,0,3.2,0c2.1,0,2.1,3.2,0.1,3.2L2.6,13.8z"/><path d="M19.9,10.9C19.7,9.2,18.7,7.6,17,7c-4.2-1.3-7.3,3.4-5.3,7.1c0.9,1.7,2.8,2.3,4.7,2.1c1.7-0.2,2.9-1.3,3.4-2.9h-2.2 c-0.4,1.3-2.4,1.5-3.5,0.6c-0.4-0.4-0.6-1.1-0.6-1.7H20C20,11.7,19.9,10.9,19.9,10.9z M13.5,10.6c0-1.6,2.3-2.7,3.5-1.4 c0.4,0.4,0.5,0.9,0.6,1.4H13.5L13.5,10.6z"/><rect x="13" y="4" width="5" height="1.4"/></svg>',
            bell: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17,15.5 L3,15.5 C2.99,14.61 3.79,13.34 4.1,12.51 C4.58,11.3 4.72,10.35 5.19,7.01 C5.54,4.53 5.89,3.2 7.28,2.16 C8.13,1.56 9.37,1.5 9.81,1.5 L9.96,1.5 C9.96,1.5 11.62,1.41 12.67,2.17 C14.08,3.2 14.42,4.54 14.77,7.02 C15.26,10.35 15.4,11.31 15.87,12.52 C16.2,13.34 17.01,14.61 17,15.5 L17,15.5 Z"/><path fill="none" stroke="#000" d="M12.39,16 C12.39,17.37 11.35,18.43 9.91,18.43 C8.48,18.43 7.42,17.37 7.42,16"/></svg>',
            bold: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5,15.3 C5.66,15.3 5.9,15 5.9,14.53 L5.9,5.5 C5.9,4.92 5.56,4.7 5,4.7 L5,4 L8.95,4 C12.6,4 13.7,5.37 13.7,6.9 C13.7,7.87 13.14,9.17 10.86,9.59 L10.86,9.7 C13.25,9.86 14.29,11.28 14.3,12.54 C14.3,14.47 12.94,16 9,16 L5,16 L5,15.3 Z M9,9.3 C11.19,9.3 11.8,8.5 11.85,7 C11.85,5.65 11.3,4.8 9,4.8 L7.67,4.8 L7.67,9.3 L9,9.3 Z M9.185,15.22 C11.97,15 12.39,14 12.4,12.58 C12.4,11.15 11.39,10 9,10 L7.67,10 L7.67,15 L9.18,15 Z"/></svg>',
            bolt: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.74,20 L7.73,12 L3,12 L15.43,1 L12.32,9 L17.02,9 L4.74,20 L4.74,20 L4.74,20 Z M9.18,11 L7.1,16.39 L14.47,10 L10.86,10 L12.99,4.67 L5.61,11 L9.18,11 L9.18,11 L9.18,11 Z"/></svg>',
            bookmark: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="5.5 1.5 15.5 1.5 15.5 17.5 10.5 12.5 5.5 17.5"/></svg>',
            calendar: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z"/><rect width="1" height="3" x="6" y="2"/><rect width="1" height="3" x="13" y="2"/></svg>',
            camera: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10.8" r="3.8"/><path fill="none" stroke="#000" d="M1,4.5 C0.7,4.5 0.5,4.7 0.5,5 L0.5,17 C0.5,17.3 0.7,17.5 1,17.5 L19,17.5 C19.3,17.5 19.5,17.3 19.5,17 L19.5,5 C19.5,4.7 19.3,4.5 19,4.5 L13.5,4.5 L13.5,2.9 C13.5,2.6 13.3,2.5 13,2.5 L7,2.5 C6.7,2.5 6.5,2.6 6.5,2.9 L6.5,4.5 L1,4.5 L1,4.5 Z"/></svg>',
            cart: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="7.3" cy="17.3" r="1.4"/><circle cx="13.3" cy="17.3" r="1.4"/><polyline fill="none" stroke="#000" points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5"/></svg>',
            check: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"/></svg>',
            "chevron-double-left": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 14 6 10 10 6"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="14 14 10 10 14 6"/></svg>',
            "chevron-double-right": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 6 14 10 10 14"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="6 6 10 10 6 14"/></svg>',
            "chevron-down": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"/></svg>',
            "chevron-left": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="13 16 7 10 13 4"/></svg>',
            "chevron-right": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="7 4 13 10 7 16"/></svg>',
            "chevron-up": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="4 13 10 7 16 13"/></svg>',
            clock: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',
            close: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"/><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"/></svg>',
            "cloud-download": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.3,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="11.75 16 9.5 18.25 7.25 16"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',
            "cloud-upload": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.31,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="7.25 11.75 9.5 9.5 11.75 11.75"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',
            code: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.01" points="13,4 19,10 13,16"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="7,4 1,10 7,16"/></svg>',
            cog: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="9.997" cy="10" r="3.31"/><path fill="none" stroke="#000" d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z"/></svg>',
            comment: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6,18.71 L6,14 L1,14 L1,1 L19,1 L19,14 L10.71,14 L6,18.71 L6,18.71 Z M2,13 L7,13 L7,16.29 L10.29,13 L18,13 L18,2 L2,2 L2,13 L2,13 Z"/></svg>',
            commenting: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="1.5,1.5 18.5,1.5 18.5,13.5 10.5,13.5 6.5,17.5 6.5,13.5 1.5,13.5"/><circle cx="10" cy="8" r="1"/><circle cx="6" cy="8" r="1"/><circle cx="14" cy="8" r="1"/></svg>',
            comments: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="2 0.5 19.5 0.5 19.5 13"/><path d="M5,19.71 L5,15 L0,15 L0,2 L18,2 L18,15 L9.71,15 L5,19.71 L5,19.71 L5,19.71 Z M1,14 L6,14 L6,17.29 L9.29,14 L17,14 L17,3 L1,3 L1,14 L1,14 L1,14 Z"/></svg>',
            copy: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="2.5" width="12" height="16"/><polyline fill="none" stroke="#000" points="5 0.5 17.5 0.5 17.5 17"/></svg>',
            "credit-card": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="1.5" y="4.5" width="17" height="12"/><rect x="1" y="7" width="18" height="3"/></svg>',
            crosshairs: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="10" cy="10" r="7.5"/><line fill="none" stroke="#000" x1="10" x2="10" y2="8"/><line fill="none" stroke="#000" x1="10" y1="12" x2="10" y2="20"/><line fill="none" stroke="#000" y1="10" x2="8" y2="10"/><line fill="none" stroke="#000" x1="12" y1="10" x2="20" y2="10"/></svg>',
            database: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><ellipse fill="none" stroke="#000" cx="10" cy="4.64" rx="7.5" ry="3.14"/><path fill="none" stroke="#000" d="M17.5,8.11 C17.5,9.85 14.14,11.25 10,11.25 C5.86,11.25 2.5,9.84 2.5,8.11"/><path fill="none" stroke="#000" d="M17.5,11.25 C17.5,12.99 14.14,14.39 10,14.39 C5.86,14.39 2.5,12.98 2.5,11.25"/><path fill="none" stroke="#000" d="M17.49,4.64 L17.5,14.36 C17.5,16.1 14.14,17.5 10,17.5 C5.86,17.5 2.5,16.09 2.5,14.36 L2.5,4.64"/></svg>',
            desktop: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="15" width="1" height="2"/><rect x="11" y="15" width="1" height="2"/><rect x="5" y="16" width="10" height="1"/><rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11"/></svg>',
            discord: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M16.074,4.361a14.243,14.243,0,0,0-3.61-1.134,10.61,10.61,0,0,0-.463.96,13.219,13.219,0,0,0-4,0,10.138,10.138,0,0,0-.468-.96A14.206,14.206,0,0,0,3.919,4.364,15.146,15.146,0,0,0,1.324,14.5a14.435,14.435,0,0,0,4.428,2.269A10.982,10.982,0,0,0,6.7,15.21a9.294,9.294,0,0,1-1.494-.727c.125-.093.248-.19.366-.289a10.212,10.212,0,0,0,8.854,0c.119.1.242.2.366.289a9.274,9.274,0,0,1-1.5.728,10.8,10.8,0,0,0,.948,1.562,14.419,14.419,0,0,0,4.431-2.27A15.128,15.128,0,0,0,16.074,4.361Zm-8.981,8.1a1.7,1.7,0,0,1-1.573-1.79A1.689,1.689,0,0,1,7.093,8.881a1.679,1.679,0,0,1,1.573,1.791A1.687,1.687,0,0,1,7.093,12.462Zm5.814,0a1.7,1.7,0,0,1-1.573-1.79,1.689,1.689,0,0,1,1.573-1.791,1.679,1.679,0,0,1,1.573,1.791A1.688,1.688,0,0,1,12.907,12.462Z"/></svg>',
            download: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3"/></svg>',
            dribbble: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.4" d="M1.3,8.9c0,0,5,0.1,8.6-1c1.4-0.4,2.6-0.9,4-1.9 c1.4-1.1,2.5-2.5,2.5-2.5"/><path fill="none" stroke="#000" stroke-width="1.4" d="M3.9,16.6c0,0,1.7-2.8,3.5-4.2 c1.8-1.3,4-2,5.7-2.2C16,10,19,10.6,19,10.6"/><path fill="none" stroke="#000" stroke-width="1.4" d="M6.9,1.6c0,0,3.3,4.6,4.2,6.8 c0.4,0.9,1.3,3.1,1.9,5.2c0.6,2,0.9,4.4,0.9,4.4"/><circle fill="none" stroke="#000" stroke-width="1.4" cx="10" cy="10" r="9"/></svg>',
            etsy: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M8,4.26C8,4.07,8,4,8.31,4h4.46c.79,0,1.22.67,1.53,1.91l.25,1h.76c.14-2.82.26-4,.26-4S13.65,3,12.52,3H6.81L3.75,2.92v.84l1,.2c.73.11.9.27,1,1,0,0,.06,2,.06,5.17s-.06,5.14-.06,5.14c0,.59-.23.81-1,.94l-1,.2v.84l3.06-.1h5.11c1.15,0,3.82.1,3.82.1,0-.7.45-3.88.51-4.22h-.73l-.76,1.69a2.25,2.25,0,0,1-2.45,1.47H9.4c-1,0-1.44-.4-1.44-1.24V10.44s2.16,0,2.86.06c.55,0,.85.19,1.06,1l.23,1H13L12.9,9.94,13,7.41h-.85l-.28,1.13c-.16.74-.28.84-1,1-1,.1-2.89.09-2.89.09Z"/></svg>',
            expand: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 18 2 18 7 17 7 17 3 13 3"/><polygon points="2 13 3 13 3 17 7 17 7 18 2 18"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11"/></svg>',
            facebook: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11,10h2.6l0.4-3H11V5.3c0-0.9,0.2-1.5,1.5-1.5H14V1.1c-0.3,0-1-0.1-2.1-0.1C9.6,1,8,2.4,8,5v2H5.5v3H8v8h3V10z"/></svg>',
            "file-edit": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z"/><polyline fill="none" stroke="#000" points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5"/></svg>',
            "file-pdf": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><path d="M14.65 11.67c-.48.3-1.37-.19-1.79-.37a4.65 4.65 0 0 1 1.49.06c.35.1.36.28.3.31zm-6.3.06l.43-.79a14.7 14.7 0 0 0 .75-1.64 5.48 5.48 0 0 0 1.25 1.55l.2.15a16.36 16.36 0 0 0-2.63.73zM9.5 5.32c.2 0 .32.5.32.97a1.99 1.99 0 0 1-.23 1.04 5.05 5.05 0 0 1-.17-1.3s0-.71.08-.71zm-3.9 9a4.35 4.35 0 0 1 1.21-1.46l.24-.22a4.35 4.35 0 0 1-1.46 1.68zm9.23-3.3a2.05 2.05 0 0 0-1.32-.3 11.07 11.07 0 0 0-1.58.11 4.09 4.09 0 0 1-.74-.5 5.39 5.39 0 0 1-1.32-2.06 10.37 10.37 0 0 0 .28-2.62 1.83 1.83 0 0 0-.07-.25.57.57 0 0 0-.52-.4H9.4a.59.59 0 0 0-.6.38 6.95 6.95 0 0 0 .37 3.14c-.26.63-1 2.12-1 2.12-.3.58-.57 1.08-.82 1.5l-.8.44A3.11 3.11 0 0 0 5 14.16a.39.39 0 0 0 .15.42l.24.13c1.15.56 2.28-1.74 2.66-2.42a23.1 23.1 0 0 1 3.59-.85 4.56 4.56 0 0 0 2.91.8.5.5 0 0 0 .3-.21 1.1 1.1 0 0 0 .12-.75.84.84 0 0 0-.14-.25z"/></svg>',
            "file-text": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><line fill="none" stroke="#000" x1="6" x2="12" y1="12.5" y2="12.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="8.5" y2="8.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="6.5" y2="6.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="10.5" y2="10.5"/></svg>',
            file: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="1.5" width="13" height="17"/></svg>',
            flickr: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="5.5" cy="9.5" r="3.5"/><circle cx="14.5" cy="9.5" r="3.5"/></svg>',
            folder: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="9.5 5.5 8.5 3.5 1.5 3.5 1.5 16.5 18.5 16.5 18.5 5.5"/></svg>',
            forward: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.47,13.11 C4.02,10.02 6.27,7.85 9.04,6.61 C9.48,6.41 10.27,6.13 11,5.91 L11,2 L18.89,9 L11,16 L11,12.13 C9.25,12.47 7.58,13.19 6.02,14.25 C3.03,16.28 1.63,18.54 1.63,18.54 C1.63,18.54 1.38,15.28 2.47,13.11 L2.47,13.11 Z M5.3,13.53 C6.92,12.4 9.04,11.4 12,10.92 L12,13.63 L17.36,9 L12,4.25 L12,6.8 C11.71,6.86 10.86,7.02 9.67,7.49 C6.79,8.65 4.58,10.96 3.49,13.08 C3.18,13.7 2.68,14.87 2.49,16 C3.28,15.05 4.4,14.15 5.3,13.53 L5.3,13.53 Z"/></svg>',
            foursquare: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.23,2 C15.96,2 16.4,2.41 16.5,2.86 C16.57,3.15 16.56,3.44 16.51,3.73 C16.46,4.04 14.86,11.72 14.75,12.03 C14.56,12.56 14.16,12.82 13.61,12.83 C13.03,12.84 11.09,12.51 10.69,13 C10.38,13.38 7.79,16.39 6.81,17.53 C6.61,17.76 6.4,17.96 6.08,17.99 C5.68,18.04 5.29,17.87 5.17,17.45 C5.12,17.28 5.1,17.09 5.1,16.91 C5.1,12.4 4.86,7.81 5.11,3.31 C5.17,2.5 5.81,2.12 6.53,2 L15.23,2 L15.23,2 Z M9.76,11.42 C9.94,11.19 10.17,11.1 10.45,11.1 L12.86,11.1 C13.12,11.1 13.31,10.94 13.36,10.69 C13.37,10.64 13.62,9.41 13.74,8.83 C13.81,8.52 13.53,8.28 13.27,8.28 C12.35,8.29 11.42,8.28 10.5,8.28 C9.84,8.28 9.83,7.69 9.82,7.21 C9.8,6.85 10.13,6.55 10.5,6.55 C11.59,6.56 12.67,6.55 13.76,6.55 C14.03,6.55 14.23,6.4 14.28,6.14 C14.34,5.87 14.67,4.29 14.67,4.29 C14.67,4.29 14.82,3.74 14.19,3.74 L7.34,3.74 C7,3.75 6.84,4.02 6.84,4.33 C6.84,7.58 6.85,14.95 6.85,14.99 C6.87,15 8.89,12.51 9.76,11.42 L9.76,11.42 Z"/></svg>',
            future: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10"/><rect x="9" y="4" width="1" height="7"/><path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="#000" stroke-width="1.1"/></svg>',
            "git-branch": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="3" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14" cy="6" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="17" r="2"/><path fill="none" stroke="#000" stroke-width="2" d="M14,8 C14,10.41 12.43,10.87 10.56,11.25 C9.09,11.54 7,12.06 7,15 L7,5"/></svg>',
            "git-fork": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.2" cx="5.79" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14.19" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="10.03" cy="16.79" r="1.79"/><path fill="none" stroke="#000" stroke-width="2" d="M5.79,4.57 L5.79,6.56 C5.79,9.19 10.03,10.22 10.03,13.31 C10.03,14.86 10.04,14.55 10.04,14.55 C10.04,14.37 10.04,14.86 10.04,13.31 C10.04,10.22 14.2,9.19 14.2,6.56 L14.2,4.57"/></svg>',
            "github-alt": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5 C4.75,0.5 0.5,4.76 0.5,10.01 C0.5,15.26 4.75,19.51 10,19.51 C15.24,19.51 19.5,15.26 19.5,10.01 C19.5,4.76 15.25,0.5 10,0.5 L10,0.5 Z M12.81,17.69 C12.81,17.69 12.81,17.7 12.79,17.69 C12.47,17.75 12.35,17.59 12.35,17.36 L12.35,16.17 C12.35,15.45 12.09,14.92 11.58,14.56 C12.2,14.51 12.77,14.39 13.26,14.21 C13.87,13.98 14.36,13.69 14.74,13.29 C15.42,12.59 15.76,11.55 15.76,10.17 C15.76,9.25 15.45,8.46 14.83,7.8 C15.1,7.08 15.07,6.29 14.75,5.44 L14.51,5.42 C14.34,5.4 14.06,5.46 13.67,5.61 C13.25,5.78 12.79,6.03 12.31,6.35 C11.55,6.16 10.81,6.05 10.09,6.05 C9.36,6.05 8.61,6.15 7.88,6.35 C7.28,5.96 6.75,5.68 6.26,5.54 C6.07,5.47 5.9,5.44 5.78,5.44 L5.42,5.44 C5.06,6.29 5.04,7.08 5.32,7.8 C4.7,8.46 4.4,9.25 4.4,10.17 C4.4,11.94 4.96,13.16 6.08,13.84 C6.53,14.13 7.05,14.32 7.69,14.43 C8.03,14.5 8.32,14.54 8.55,14.55 C8.07,14.89 7.82,15.42 7.82,16.16 L7.82,17.51 C7.8,17.69 7.7,17.8 7.51,17.8 C4.21,16.74 1.82,13.65 1.82,10.01 C1.82,5.5 5.49,1.83 10,1.83 C14.5,1.83 18.17,5.5 18.17,10.01 C18.18,13.53 15.94,16.54 12.81,17.69 L12.81,17.69 Z"/></svg>',
            github: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,1 C5.03,1 1,5.03 1,10 C1,13.98 3.58,17.35 7.16,18.54 C7.61,18.62 7.77,18.34 7.77,18.11 C7.77,17.9 7.76,17.33 7.76,16.58 C5.26,17.12 4.73,15.37 4.73,15.37 C4.32,14.33 3.73,14.05 3.73,14.05 C2.91,13.5 3.79,13.5 3.79,13.5 C4.69,13.56 5.17,14.43 5.17,14.43 C5.97,15.8 7.28,15.41 7.79,15.18 C7.87,14.6 8.1,14.2 8.36,13.98 C6.36,13.75 4.26,12.98 4.26,9.53 C4.26,8.55 4.61,7.74 5.19,7.11 C5.1,6.88 4.79,5.97 5.28,4.73 C5.28,4.73 6.04,4.49 7.75,5.65 C8.47,5.45 9.24,5.35 10,5.35 C10.76,5.35 11.53,5.45 12.25,5.65 C13.97,4.48 14.72,4.73 14.72,4.73 C15.21,5.97 14.9,6.88 14.81,7.11 C15.39,7.74 15.73,8.54 15.73,9.53 C15.73,12.99 13.63,13.75 11.62,13.97 C11.94,14.25 12.23,14.8 12.23,15.64 C12.23,16.84 12.22,17.81 12.22,18.11 C12.22,18.35 12.38,18.63 12.84,18.54 C16.42,17.35 19,13.98 19,10 C19,5.03 14.97,1 10,1 L10,1 Z"/></svg>',
            gitter: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="1" width="1.531" height="11.471"/><rect x="7.324" y="4.059" width="1.529" height="15.294"/><rect x="11.148" y="4.059" width="1.527" height="15.294"/><rect x="14.971" y="4.059" width="1.529" height="8.412"/></svg>',
            google: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.86,9.09 C18.46,12.12 17.14,16.05 13.81,17.56 C9.45,19.53 4.13,17.68 2.47,12.87 C0.68,7.68 4.22,2.42 9.5,2.03 C11.57,1.88 13.42,2.37 15.05,3.65 C15.22,3.78 15.37,3.93 15.61,4.14 C14.9,4.81 14.23,5.45 13.5,6.14 C12.27,5.08 10.84,4.72 9.28,4.98 C8.12,5.17 7.16,5.76 6.37,6.63 C4.88,8.27 4.62,10.86 5.76,12.82 C6.95,14.87 9.17,15.8 11.57,15.25 C13.27,14.87 14.76,13.33 14.89,11.75 L10.51,11.75 L10.51,9.09 L17.86,9.09 L17.86,9.09 Z"/></svg>',
            grid: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="3" height="3"/><rect x="8" y="2" width="3" height="3"/><rect x="14" y="2" width="3" height="3"/><rect x="2" y="8" width="3" height="3"/><rect x="8" y="8" width="3" height="3"/><rect x="14" y="8" width="3" height="3"/><rect x="2" y="14" width="3" height="3"/><rect x="8" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>',
            happy: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="7" r="1"/><circle cx="7" cy="7" r="1"/><circle fill="none" stroke="#000" cx="10" cy="10" r="8.5"/><path fill="none" stroke="#000" d="M14.6,11.4 C13.9,13.3 12.1,14.5 10,14.5 C7.9,14.5 6.1,13.3 5.4,11.4"/></svg>',
            hashtag: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.431,8 L15.661,7 L12.911,7 L13.831,3 L12.901,3 L11.98,7 L9.29,7 L10.21,3 L9.281,3 L8.361,7 L5.23,7 L5,8 L8.13,8 L7.21,12 L4.23,12 L4,13 L6.98,13 L6.061,17 L6.991,17 L7.911,13 L10.601,13 L9.681,17 L10.611,17 L11.531,13 L14.431,13 L14.661,12 L11.76,12 L12.681,8 L15.431,8 Z M10.831,12 L8.141,12 L9.061,8 L11.75,8 L10.831,12 Z"/></svg>',
            heart: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.03" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z"/></svg>',
            history: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="#000" points="1 2 2 2 2 6 6 6 6 7 1 7 1 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2.1,6.548 C3.391,3.29 6.746,1 10.5,1 C15.5,1 19.5,5 19.5,10 C19.5,15 15.5,19 10.5,19 C5.5,19 1.5,15 1.5,10"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',
            home: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65"/><polygon points="15 4 18 4 18 7 17 7 17 5 15 5"/><polygon points="3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19"/></svg>',
            image: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="16.1" cy="6.1" r="1.1"/><rect fill="none" stroke="#000" x=".5" y="2.5" width="19" height="15"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="4,13 8,9 13,14"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="11,12 12.5,10.5 16,14"/></svg>',
            info: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.13,11.59 C11.97,12.84 10.35,14.12 9.1,14.16 C6.17,14.2 9.89,9.46 8.74,8.37 C9.3,8.16 10.62,7.83 10.62,8.81 C10.62,9.63 10.12,10.55 9.88,11.32 C8.66,15.16 12.13,11.15 12.14,11.18 C12.16,11.21 12.16,11.35 12.13,11.59 C12.08,11.95 12.16,11.35 12.13,11.59 L12.13,11.59 Z M11.56,5.67 C11.56,6.67 9.36,7.15 9.36,6.03 C9.36,5 11.56,4.54 11.56,5.67 L11.56,5.67 Z"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',
            instagram: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.55,1H6.46C3.45,1,1,3.44,1,6.44v7.12c0,3,2.45,5.44,5.46,5.44h7.08c3.02,0,5.46-2.44,5.46-5.44V6.44 C19.01,3.44,16.56,1,13.55,1z M17.5,14c0,1.93-1.57,3.5-3.5,3.5H6c-1.93,0-3.5-1.57-3.5-3.5V6c0-1.93,1.57-3.5,3.5-3.5h8 c1.93,0,3.5,1.57,3.5,3.5V14z"/><circle cx="14.87" cy="5.26" r="1.09"/><path d="M10.03,5.45c-2.55,0-4.63,2.06-4.63,4.6c0,2.55,2.07,4.61,4.63,4.61c2.56,0,4.63-2.061,4.63-4.61 C14.65,7.51,12.58,5.45,10.03,5.45L10.03,5.45L10.03,5.45z M10.08,13c-1.66,0-3-1.34-3-2.99c0-1.65,1.34-2.99,3-2.99s3,1.34,3,2.99 C13.08,11.66,11.74,13,10.08,13L10.08,13L10.08,13z"/></svg>',
            italic: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.63,5.48 L10.15,14.52 C10,15.08 10.37,15.25 11.92,15.3 L11.72,16 L6,16 L6.2,15.31 C7.78,15.26 8.19,15.09 8.34,14.53 L10.82,5.49 C10.97,4.92 10.63,4.76 9.09,4.71 L9.28,4 L15,4 L14.81,4.69 C13.23,4.75 12.78,4.91 12.63,5.48 L12.63,5.48 Z"/></svg>',
            joomla: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.8,13.4l1.7-1.7L5.9,8c-0.6-0.5-0.6-1.5,0-2c0.6-0.6,1.4-0.6,2,0l1.7-1.7c-1-1-2.3-1.3-3.6-1C5.8,2.2,4.8,1.4,3.7,1.4 c-1.3,0-2.3,1-2.3,2.3c0,1.1,0.8,2,1.8,2.3c-0.4,1.3-0.1,2.8,1,3.8L7.8,13.4L7.8,13.4z"/><path d="M10.2,4.3c1-1,2.5-1.4,3.8-1c0.2-1.1,1.1-2,2.3-2c1.3,0,2.3,1,2.3,2.3c0,1.2-0.9,2.2-2,2.3c0.4,1.3,0,2.8-1,3.8L13.9,8 c0.6-0.5,0.6-1.5,0-2c-0.5-0.6-1.5-0.6-2,0L8.2,9.7L6.5,8"/><path d="M14.1,16.8c-1.3,0.4-2.8,0.1-3.8-1l1.7-1.7c0.6,0.6,1.5,0.6,2,0c0.5-0.6,0.6-1.5,0-2l-3.7-3.7L12,6.7l3.7,3.7 c1,1,1.3,2.4,1,3.6c1.1,0.2,2,1.1,2,2.3c0,1.3-1,2.3-2.3,2.3C15.2,18.6,14.3,17.8,14.1,16.8"/><path d="M13.2,12.2l-3.7,3.7c-1,1-2.4,1.3-3.6,1c-0.2,1-1.2,1.8-2.2,1.8c-1.3,0-2.3-1-2.3-2.3c0-1.1,0.8-2,1.8-2.3 c-0.3-1.3,0-2.7,1-3.7l1.7,1.7c-0.6,0.6-0.6,1.5,0,2c0.6,0.6,1.4,0.6,2,0l3.7-3.7"/></svg>',
            laptop: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="16" width="20" height="1"/><rect fill="none" stroke="#000" x="2.5" y="4.5" width="15" height="10"/></svg>',
            lifesaver: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5 C4.76,0.5 0.5,4.76 0.5,10 C0.5,15.24 4.76,19.5 10,19.5 C15.24,19.5 19.5,15.24 19.5,10 C19.5,4.76 15.24,0.5 10,0.5 L10,0.5 Z M10,1.5 C11.49,1.5 12.89,1.88 14.11,2.56 L11.85,4.82 C11.27,4.61 10.65,4.5 10,4.5 C9.21,4.5 8.47,4.67 7.79,4.96 L5.58,2.75 C6.87,1.95 8.38,1.5 10,1.5 L10,1.5 Z M4.96,7.8 C4.67,8.48 4.5,9.21 4.5,10 C4.5,10.65 4.61,11.27 4.83,11.85 L2.56,14.11 C1.88,12.89 1.5,11.49 1.5,10 C1.5,8.38 1.95,6.87 2.75,5.58 L4.96,7.79 L4.96,7.8 L4.96,7.8 Z M10,18.5 C8.25,18.5 6.62,17.97 5.27,17.06 L7.46,14.87 C8.22,15.27 9.08,15.5 10,15.5 C10.79,15.5 11.53,15.33 12.21,15.04 L14.42,17.25 C13.13,18.05 11.62,18.5 10,18.5 L10,18.5 Z M10,14.5 C7.52,14.5 5.5,12.48 5.5,10 C5.5,7.52 7.52,5.5 10,5.5 C12.48,5.5 14.5,7.52 14.5,10 C14.5,12.48 12.48,14.5 10,14.5 L10,14.5 Z M15.04,12.21 C15.33,11.53 15.5,10.79 15.5,10 C15.5,9.08 15.27,8.22 14.87,7.46 L17.06,5.27 C17.97,6.62 18.5,8.25 18.5,10 C18.5,11.62 18.05,13.13 17.25,14.42 L15.04,12.21 L15.04,12.21 Z"/></svg>',
            link: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M7.925,11.875 L11.925,7.975"/></svg>',
            linkedin: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.77,17.89 L5.77,7.17 L2.21,7.17 L2.21,17.89 L5.77,17.89 L5.77,17.89 Z M3.99,5.71 C5.23,5.71 6.01,4.89 6.01,3.86 C5.99,2.8 5.24,2 4.02,2 C2.8,2 2,2.8 2,3.85 C2,4.88 2.77,5.7 3.97,5.7 L3.99,5.7 L3.99,5.71 L3.99,5.71 Z"/><path d="M7.75,17.89 L11.31,17.89 L11.31,11.9 C11.31,11.58 11.33,11.26 11.43,11.03 C11.69,10.39 12.27,9.73 13.26,9.73 C14.55,9.73 15.06,10.71 15.06,12.15 L15.06,17.89 L18.62,17.89 L18.62,11.74 C18.62,8.45 16.86,6.92 14.52,6.92 C12.6,6.92 11.75,7.99 11.28,8.73 L11.3,8.73 L11.3,7.17 L7.75,7.17 C7.79,8.17 7.75,17.89 7.75,17.89 L7.75,17.89 L7.75,17.89 Z"/></svg>',
            list: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="12" height="1"/><rect x="6" y="9" width="12" height="1"/><rect x="6" y="14" width="12" height="1"/><rect x="2" y="4" width="2" height="1"/><rect x="2" y="9" width="2" height="1"/><rect x="2" y="14" width="2" height="1"/></svg>',
            location: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z"/><circle fill="none" stroke="#000" cx="10" cy="6.8" r="2.3"/></svg>',
            lock: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" height="10" width="13" y="8.5" x="3.5"/><path fill="none" stroke="#000" d="M6.5,8 L6.5,4.88 C6.5,3.01 8.07,1.5 10,1.5 C11.93,1.5 13.5,3.01 13.5,4.88 L13.5,8"/></svg>',
            mail: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="1.4,6.5 10,11 18.6,6.5"/><path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z"/></svg>',
            menu: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="1"/><rect x="2" y="9" width="16" height="1"/><rect x="2" y="14" width="16" height="1"/></svg>',
            microphone: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" x1="10" x2="10" y1="16.44" y2="18.5"/><line fill="none" stroke="#000" x1="7" x2="13" y1="18.5" y2="18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.5 4.89v5.87a3.5 3.5 0 0 1-7 0V4.89a3.5 3.5 0 0 1 7 0z"/><path fill="none" stroke="#000" stroke-width="1.1" d="M15.5 10.36V11a5.5 5.5 0 0 1-11 0v-.6"/></svg>',
            "minus-circle": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',
            minus: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect height="1" width="18" y="9" x="1"/></svg>',
            "more-vertical": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="3" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
            more: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="10" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="17" cy="10" r="2"/></svg>',
            move: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="4,5 1,5 1,9 2,9 2,6 4,6"/><polygon points="1,16 2,16 2,18 4,18 4,19 1,19"/><polygon points="14,16 14,19 11,19 11,18 13,18 13,16"/><rect fill="none" stroke="#000" x="5.5" y="1.5" width="13" height="13"/><rect x="1" y="11" width="1" height="3"/><rect x="6" y="18" width="3" height="1"/></svg>',
            nut: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="2.5,5.7 10,1.3 17.5,5.7 17.5,14.3 10,18.7 2.5,14.3"/><circle fill="none" stroke="#000" cx="10" cy="10" r="3.5"/></svg>',
            pagekit: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="3,1 17,1 17,16 10,16 10,13 14,13 14,4 6,4 6,16 10,16 10,19 3,19"/></svg>',
            "paint-bucket": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.21,1 L0,11.21 L8.1,19.31 L18.31,9.1 L10.21,1 L10.21,1 Z M16.89,9.1 L15,11 L1.7,11 L10.21,2.42 L16.89,9.1 Z"/><path fill="none" stroke="#000" stroke-width="1.1" d="M6.42,2.33 L11.7,7.61"/><path d="M18.49,12 C18.49,12 20,14.06 20,15.36 C20,16.28 19.24,17 18.49,17 L18.49,17 C17.74,17 17,16.28 17,15.36 C17,14.06 18.49,12 18.49,12 L18.49,12 Z"/></svg>',
            pencil: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z"/><path fill="none" stroke="#000" d="M15.98,7.268 L13.851,5.148"/></svg>',
            "phone-landscape": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M17,5.5 C17.8,5.5 18.5,6.2 18.5,7 L18.5,14 C18.5,14.8 17.8,15.5 17,15.5 L3,15.5 C2.2,15.5 1.5,14.8 1.5,14 L1.5,7 C1.5,6.2 2.2,5.5 3,5.5 L17,5.5 L17,5.5 L17,5.5 Z"/><circle cx="3.8" cy="10.5" r=".8"/></svg>',
            phone: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M15.5,17 C15.5,17.8 14.8,18.5 14,18.5 L7,18.5 C6.2,18.5 5.5,17.8 5.5,17 L5.5,3 C5.5,2.2 6.2,1.5 7,1.5 L14,1.5 C14.8,1.5 15.5,2.2 15.5,3 L15.5,17 L15.5,17 L15.5,17 Z"/><circle cx="10.5" cy="16.5" r=".8"/></svg>',
            pinterest: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.21,1 C5.5,1 3,4.16 3,7.61 C3,9.21 3.85,11.2 5.22,11.84 C5.43,11.94 5.54,11.89 5.58,11.69 C5.62,11.54 5.8,10.8 5.88,10.45 C5.91,10.34 5.89,10.24 5.8,10.14 C5.36,9.59 5,8.58 5,7.65 C5,5.24 6.82,2.91 9.93,2.91 C12.61,2.91 14.49,4.74 14.49,7.35 C14.49,10.3 13,12.35 11.06,12.35 C9.99,12.35 9.19,11.47 9.44,10.38 C9.75,9.08 10.35,7.68 10.35,6.75 C10.35,5.91 9.9,5.21 8.97,5.21 C7.87,5.21 6.99,6.34 6.99,7.86 C6.99,8.83 7.32,9.48 7.32,9.48 C7.32,9.48 6.24,14.06 6.04,14.91 C5.7,16.35 6.08,18.7 6.12,18.9 C6.14,19.01 6.26,19.05 6.33,18.95 C6.44,18.81 7.74,16.85 8.11,15.44 C8.24,14.93 8.79,12.84 8.79,12.84 C9.15,13.52 10.19,14.09 11.29,14.09 C14.58,14.09 16.96,11.06 16.96,7.3 C16.94,3.7 14,1 10.21,1"/></svg>',
            "play-circle": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" stroke-width="1.1" points="8.5 7 13.5 10 8.5 13"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',
            play: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="6.5,5 14.5,10 6.5,15"/></svg>',
            "plus-circle": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="9.5" y1="5" x2="9.5" y2="14"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',
            plus: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="1" width="1" height="17"/><rect x="1" y="9" width="17" height="1"/></svg>',
            print: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="4.5 13.5 1.5 13.5 1.5 6.5 18.5 6.5 18.5 13.5 15.5 13.5"/><polyline fill="none" stroke="#000" points="15.5 6.5 15.5 2.5 4.5 2.5 4.5 6.5"/><rect fill="none" stroke="#000" width="11" height="6" x="4.5" y="11.5"/><rect width="8" height="1" x="6" y="13"/><rect width="8" height="1" x="6" y="15"/></svg>',
            pull: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="6.85,8 9.5,10.6 12.15,8 12.85,8.7 9.5,12 6.15,8.7"/><line fill="none" stroke="#000" x1="9.5" y1="11" x2="9.5" y2="2"/><polyline fill="none" stroke="#000" points="6,5.5 3.5,5.5 3.5,18.5 15.5,18.5 15.5,5.5 13,5.5"/></svg>',
            push: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="12.15,4 9.5,1.4 6.85,4 6.15,3.3 9.5,0 12.85,3.3"/><line fill="none" stroke="#000" x1="9.5" y1="10" x2="9.5" y2="1"/><polyline fill="none" stroke="#000" points="6 5.5 3.5 5.5 3.5 18.5 15.5 18.5 15.5 5.5 13 5.5"/></svg>',
            question: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><circle cx="10.44" cy="14.42" r="1.05"/><path fill="none" stroke="#000" stroke-width="1.2" d="M8.17,7.79 C8.17,4.75 12.72,4.73 12.72,7.72 C12.72,8.67 11.81,9.15 11.23,9.75 C10.75,10.24 10.51,10.73 10.45,11.4 C10.44,11.53 10.43,11.64 10.43,11.75"/></svg>',
            "quote-right": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.27,7.79 C17.27,9.45 16.97,10.43 15.99,12.02 C14.98,13.64 13,15.23 11.56,15.97 L11.1,15.08 C12.34,14.2 13.14,13.51 14.02,11.82 C14.27,11.34 14.41,10.92 14.49,10.54 C14.3,10.58 14.09,10.6 13.88,10.6 C12.06,10.6 10.59,9.12 10.59,7.3 C10.59,5.48 12.06,4 13.88,4 C15.39,4 16.67,5.02 17.05,6.42 C17.19,6.82 17.27,7.27 17.27,7.79 L17.27,7.79 Z"/><path d="M8.68,7.79 C8.68,9.45 8.38,10.43 7.4,12.02 C6.39,13.64 4.41,15.23 2.97,15.97 L2.51,15.08 C3.75,14.2 4.55,13.51 5.43,11.82 C5.68,11.34 5.82,10.92 5.9,10.54 C5.71,10.58 5.5,10.6 5.29,10.6 C3.47,10.6 2,9.12 2,7.3 C2,5.48 3.47,4 5.29,4 C6.8,4 8.08,5.02 8.46,6.42 C8.6,6.82 8.68,7.27 8.68,7.79 L8.68,7.79 Z"/></svg>',
            receiver: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611"/></svg>',
            reddit: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19 9.05a2.56 2.56 0 0 0-2.56-2.56 2.59 2.59 0 0 0-1.88.82 10.63 10.63 0 0 0-4.14-1v-.08c.58-1.62 1.58-3.89 2.7-4.1.38-.08.77.12 1.19.57a1.15 1.15 0 0 0-.06.37 1.48 1.48 0 1 0 1.51-1.45 1.43 1.43 0 0 0-.76.19A2.29 2.29 0 0 0 12.91 1c-2.11.43-3.39 4.38-3.63 5.19 0 0 0 .11-.06.11a10.65 10.65 0 0 0-3.75 1A2.56 2.56 0 0 0 1 9.05a2.42 2.42 0 0 0 .72 1.76A5.18 5.18 0 0 0 1.24 13c0 3.66 3.92 6.64 8.73 6.64s8.74-3 8.74-6.64a5.23 5.23 0 0 0-.46-2.13A2.58 2.58 0 0 0 19 9.05zm-16.88 0a1.44 1.44 0 0 1 2.27-1.19 7.68 7.68 0 0 0-2.07 1.91 1.33 1.33 0 0 1-.2-.72zM10 18.4c-4.17 0-7.55-2.4-7.55-5.4S5.83 7.53 10 7.53 17.5 10 17.5 13s-3.38 5.4-7.5 5.4zm7.69-8.61a7.62 7.62 0 0 0-2.09-1.91 1.41 1.41 0 0 1 .84-.28 1.47 1.47 0 0 1 1.44 1.45 1.34 1.34 0 0 1-.21.72z"/><path d="M6.69 12.58a1.39 1.39 0 1 1 1.39-1.39 1.38 1.38 0 0 1-1.38 1.39z"/><path d="M14.26 11.2a1.39 1.39 0 1 1-1.39-1.39 1.39 1.39 0 0 1 1.39 1.39z"/><path d="M13.09 14.88a.54.54 0 0 1-.09.77 5.3 5.3 0 0 1-3.26 1.19 5.61 5.61 0 0 1-3.4-1.22.55.55 0 1 1 .73-.83 4.09 4.09 0 0 0 5.25 0 .56.56 0 0 1 .77.09z"/></svg>',
            refresh: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.08,11.15 C17.09,11.31 17.1,11.47 17.1,11.64 C17.1,15.53 13.94,18.69 10.05,18.69 C6.16,18.68 3,15.53 3,11.63 C3,7.74 6.16,4.58 10.05,4.58 C10.9,4.58 11.71,4.73 12.46,5"/><polyline fill="none" stroke="#000" points="9.9 2 12.79 4.89 9.79 7.9"/></svg>',
            reply: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"/></svg>',
            rss: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="3.12" cy="16.8" r="1.85"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,8.2 C1.78,8.18 2.06,8.16 2.35,8.16 C7.57,8.16 11.81,12.37 11.81,17.57 C11.81,17.89 11.79,18.19 11.76,18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,2.52 C1.78,2.51 2.06,2.5 2.35,2.5 C10.72,2.5 17.5,9.24 17.5,17.57 C17.5,17.89 17.49,18.19 17.47,18.5"/></svg>',
            search: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',
            server: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="1" height="2"/><rect x="5" y="3" width="1" height="2"/><rect x="7" y="3" width="1" height="2"/><rect x="16" y="3" width="1" height="1"/><rect x="16" y="10" width="1" height="1"/><circle fill="none" stroke="#000" cx="9.9" cy="17.4" r="1.4"/><rect x="3" y="10" width="1" height="2"/><rect x="5" y="10" width="1" height="2"/><rect x="9.5" y="14" width="1" height="2"/><rect x="3" y="17" width="6" height="1"/><rect x="11" y="17" width="6" height="1"/><rect fill="none" stroke="#000" x="1.5" y="1.5" width="17" height="5"/><rect fill="none" stroke="#000" x="1.5" y="8.5" width="17" height="5"/></svg>',
            settings: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15"/><ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15"/><circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15"/><rect x="1" y="3" width="3" height="1"/><rect x="10" y="3" width="8" height="1"/><rect x="1" y="9" width="8" height="1"/><rect x="15" y="9" width="3" height="1"/><rect x="1" y="15" width="3" height="1"/><rect x="10" y="15" width="8" height="1"/></svg>',
            shrink: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="11 4 12 4 12 8 16 8 16 9 11 9"/><polygon points="4 11 9 11 9 16 8 16 8 12 4 12"/><path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12"/></svg>',
            "sign-in": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="7 2 17 2 17 17 7 17 7 16 16 16 16 3 7 3"/><polygon points="9.1 13.4 8.5 12.8 11.28 10 4 10 4 9 11.28 9 8.5 6.2 9.1 5.62 13 9.5"/></svg>',
            "sign-out": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="13.1 13.4 12.5 12.8 15.28 10 8 10 8 9 15.28 9 12.5 6.2 13.1 5.62 17 9.5"/><polygon points="13 2 3 2 3 17 13 17 13 16 4 16 4 3 13 3"/></svg>',
            social: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="13.4" y1="14" x2="6.3" y2="10.7"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13.5" y1="5.5" x2="6.5" y2="8.8"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="4.6" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="14.8" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="4.5" cy="9.8" r="2.3"/></svg>',
            soundcloud: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.2,9.4c-0.4,0-0.8,0.1-1.101,0.2c-0.199-2.5-2.399-4.5-5-4.5c-0.6,0-1.2,0.1-1.7,0.3C9.2,5.5,9.1,5.6,9.1,5.6V15h8 c1.601,0,2.801-1.2,2.801-2.8C20,10.7,18.7,9.4,17.2,9.4L17.2,9.4z"/><rect x="6" y="6.5" width="1.5" height="8.5"/><rect x="3" y="8" width="1.5" height="7"/><rect y="10" width="1.5" height="5"/></svg>',
            star: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"/></svg>',
            strikethrough: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6,13.02 L6.65,13.02 C7.64,15.16 8.86,16.12 10.41,16.12 C12.22,16.12 12.92,14.93 12.92,13.89 C12.92,12.55 11.99,12.03 9.74,11.23 C8.05,10.64 6.23,10.11 6.23,7.83 C6.23,5.5 8.09,4.09 10.4,4.09 C11.44,4.09 12.13,4.31 12.72,4.54 L13.33,4 L13.81,4 L13.81,7.59 L13.16,7.59 C12.55,5.88 11.52,4.89 10.07,4.89 C8.84,4.89 7.89,5.69 7.89,7.03 C7.89,8.29 8.89,8.78 10.88,9.45 C12.57,10.03 14.38,10.6 14.38,12.91 C14.38,14.75 13.27,16.93 10.18,16.93 C9.18,16.93 8.17,16.69 7.46,16.39 L6.52,17 L6,17 L6,13.02 L6,13.02 Z"/><rect x="3" y="10" width="15" height="1"/></svg>',
            table: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="18" height="1"/><rect x="1" y="7" width="18" height="1"/><rect x="1" y="11" width="18" height="1"/><rect x="1" y="15" width="18" height="1"/></svg>',
            "tablet-landscape": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M1.5,5 C1.5,4.2 2.2,3.5 3,3.5 L17,3.5 C17.8,3.5 18.5,4.2 18.5,5 L18.5,16 C18.5,16.8 17.8,17.5 17,17.5 L3,17.5 C2.2,17.5 1.5,16.8 1.5,16 L1.5,5 L1.5,5 L1.5,5 Z"/><circle cx="3.7" cy="10.5" r=".8"/></svg>',
            tablet: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M5,18.5 C4.2,18.5 3.5,17.8 3.5,17 L3.5,3 C3.5,2.2 4.2,1.5 5,1.5 L16,1.5 C16.8,1.5 17.5,2.2 17.5,3 L17.5,17 C17.5,17.8 16.8,18.5 16,18.5 L5,18.5 L5,18.5 L5,18.5 Z"/><circle cx="10.5" cy="16.3" r=".8"/></svg>',
            tag: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.5,3.71 L17.5,7.72 C17.5,7.96 17.4,8.2 17.21,8.39 L8.39,17.2 C7.99,17.6 7.33,17.6 6.93,17.2 L2.8,13.07 C2.4,12.67 2.4,12.01 2.8,11.61 L11.61,2.8 C11.81,2.6 12.08,2.5 12.34,2.5 L16.19,2.5 C16.52,2.5 16.86,2.63 17.11,2.88 C17.35,3.11 17.48,3.4 17.5,3.71 L17.5,3.71 Z"/><circle cx="14" cy="6" r="1"/></svg>',
            thumbnails: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="11.5" width="5" height="5"/><rect fill="none" stroke="#000" x="3.5" y="11.5" width="5" height="5"/></svg>',
            tiktok: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.24,6V8.82a6.79,6.79,0,0,1-4-1.28v5.81A5.26,5.26,0,1,1,8,8.1a4.36,4.36,0,0,1,.72.05v2.9A2.57,2.57,0,0,0,7.64,11a2.4,2.4,0,1,0,2.77,2.38V2h2.86a4,4,0,0,0,1.84,3.38A4,4,0,0,0,17.24,6Z"/></svg>',
            trash: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"/><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"/><rect x="8" y="7" width="1" height="9"/><rect x="11" y="7" width="1" height="9"/><rect x="2" y="3" width="16" height="1"/></svg>',
            "triangle-down": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="5 7 15 7 10 12"/></svg>',
            "triangle-left": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="12 5 7 10 12 15"/></svg>',
            "triangle-right": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="8 5 13 10 8 15"/></svg>',
            "triangle-up": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="5 13 10 8 15 13"/></svg>',
            tripadvisor: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19.021,7.866C19.256,6.862,20,5.854,20,5.854h-3.346C14.781,4.641,12.504,4,9.98,4C7.363,4,4.999,4.651,3.135,5.876H0\tc0,0,0.738,0.987,0.976,1.988c-0.611,0.837-0.973,1.852-0.973,2.964c0,2.763,2.249,5.009,5.011,5.009\tc1.576,0,2.976-0.737,3.901-1.879l1.063,1.599l1.075-1.615c0.475,0.611,1.1,1.111,1.838,1.451c1.213,0.547,2.574,0.612,3.825,0.15\tc2.589-0.963,3.913-3.852,2.964-6.439c-0.175-0.463-0.4-0.876-0.675-1.238H19.021z M16.38,14.594\tc-1.002,0.371-2.088,0.328-3.06-0.119c-0.688-0.317-1.252-0.817-1.657-1.438c-0.164-0.25-0.313-0.52-0.417-0.811\tc-0.124-0.328-0.186-0.668-0.217-1.014c-0.063-0.689,0.037-1.396,0.339-2.043c0.448-0.971,1.251-1.71,2.25-2.079\tc2.075-0.765,4.375,0.3,5.14,2.366c0.762,2.066-0.301,4.37-2.363,5.134L16.38,14.594L16.38,14.594z M8.322,13.066\tc-0.72,1.059-1.935,1.76-3.309,1.76c-2.207,0-4.001-1.797-4.001-3.996c0-2.203,1.795-4.002,4.001-4.002\tc2.204,0,3.999,1.8,3.999,4.002c0,0.137-0.024,0.261-0.04,0.396c-0.067,0.678-0.284,1.313-0.648,1.853v-0.013H8.322z M2.472,10.775\tc0,1.367,1.112,2.479,2.476,2.479c1.363,0,2.472-1.11,2.472-2.479c0-1.359-1.11-2.468-2.472-2.468\tC3.584,8.306,2.473,9.416,2.472,10.775L2.472,10.775z M12.514,10.775c0,1.367,1.104,2.479,2.471,2.479\tc1.363,0,2.474-1.108,2.474-2.479c0-1.359-1.11-2.468-2.474-2.468c-1.364,0-2.477,1.109-2.477,2.468H12.514z M3.324,10.775\tc0-0.893,0.726-1.618,1.614-1.618c0.889,0,1.625,0.727,1.625,1.618c0,0.898-0.725,1.627-1.625,1.627\tc-0.901,0-1.625-0.729-1.625-1.627H3.324z M13.354,10.775c0-0.893,0.726-1.618,1.627-1.618c0.886,0,1.61,0.727,1.61,1.618\tc0,0.898-0.726,1.627-1.626,1.627s-1.625-0.729-1.625-1.627H13.354z M9.977,4.875c1.798,0,3.425,0.324,4.849,0.968\tc-0.535,0.015-1.061,0.108-1.586,0.3c-1.264,0.463-2.264,1.388-2.815,2.604c-0.262,0.551-0.398,1.133-0.448,1.72\tC9.79,7.905,7.677,5.873,5.076,5.82C6.501,5.208,8.153,4.875,9.94,4.875H9.977z"/></svg>',
            tumblr: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.885,8.598c0,0,0,3.393,0,4.996c0,0.282,0,0.66,0.094,0.942c0.377,1.509,1.131,2.545,2.545,3.11 c1.319,0.472,2.356,0.472,3.676,0c0.565-0.188,1.132-0.659,1.132-0.659l-0.849-2.263c0,0-1.036,0.378-1.603,0.283 c-0.565-0.094-1.226-0.66-1.226-1.508c0-1.603,0-4.902,0-4.902h2.828V5.771h-2.828V2H8.205c0,0-0.094,0.66-0.188,0.942 C7.828,3.791,7.262,4.733,6.603,5.394C5.848,6.147,5,6.43,5,6.43v2.168H6.885z"/></svg>',
            tv: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="16" width="6" height="1"/><rect fill="none" stroke="#000" x=".5" y="3.5" width="19" height="11"/></svg>',
            twitch: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.23,1,2,4.23V15.85H5.88v3.23L9.1,15.85h2.59L17.5,10V1Zm11,8.4L13.62,12H11L8.78,14.24V12H5.88V2.29H16.21Z"/><rect x="12.98" y="4.55" width="1.29" height="3.88"/><rect x="9.43" y="4.55" width="1.29" height="3.88"/></svg>',
            twitter: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19,4.74 C18.339,5.029 17.626,5.229 16.881,5.32 C17.644,4.86 18.227,4.139 18.503,3.28 C17.79,3.7 17.001,4.009 16.159,4.17 C15.485,3.45 14.526,3 13.464,3 C11.423,3 9.771,4.66 9.771,6.7 C9.771,6.99 9.804,7.269 9.868,7.539 C6.795,7.38 4.076,5.919 2.254,3.679 C1.936,4.219 1.754,4.86 1.754,5.539 C1.754,6.82 2.405,7.95 3.397,8.61 C2.79,8.589 2.22,8.429 1.723,8.149 L1.723,8.189 C1.723,9.978 2.997,11.478 4.686,11.82 C4.376,11.899 4.049,11.939 3.713,11.939 C3.475,11.939 3.245,11.919 3.018,11.88 C3.49,13.349 4.852,14.419 6.469,14.449 C5.205,15.429 3.612,16.019 1.882,16.019 C1.583,16.019 1.29,16.009 1,15.969 C2.635,17.019 4.576,17.629 6.662,17.629 C13.454,17.629 17.17,12 17.17,7.129 C17.17,6.969 17.166,6.809 17.157,6.649 C17.879,6.129 18.504,5.478 19,4.74"/></svg>',
            uikit: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="14.4,3.1 11.3,5.1 15,7.3 15,12.9 10,15.7 5,12.9 5,8.5 2,6.8 2,14.8 9.9,19.5 18,14.8 18,5.3"/><polygon points="9.8,4.2 6.7,2.4 9.8,0.4 12.9,2.3"/></svg>',
            unlock: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="8.5" width="13" height="10"/><path fill="none" stroke="#000" d="M6.5,8.5 L6.5,4.9 C6.5,3 8.1,1.5 10,1.5 C11.9,1.5 13.5,3 13.5,4.9"/></svg>',
            upload: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="5 8 9.5 3.5 14 8"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="15" x2="9.5" y2="4"/></svg>',
            user: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.9" cy="6.4" r="4.4"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,19 C2.3,14.5 5.8,11.2 10,11.2 C14.2,11.2 17.7,14.6 18.5,19.2"/></svg>',
            users: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"/></svg>',
            "video-camera": '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="17.5 6.9 17.5 13.1 13.5 10.4 13.5 14.5 2.5 14.5 2.5 5.5 13.5 5.5 13.5 9.6 17.5 6.9"/></svg>',
            vimeo: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.065,7.59C1.84,7.367,1.654,7.082,1.468,6.838c-0.332-0.42-0.137-0.411,0.274-0.772c1.026-0.91,2.004-1.896,3.127-2.688 c1.017-0.713,2.365-1.173,3.286-0.039c0.849,1.045,0.869,2.629,1.084,3.891c0.215,1.309,0.421,2.648,0.88,3.901 c0.127,0.352,0.37,1.018,0.81,1.074c0.567,0.078,1.145-0.917,1.408-1.289c0.684-0.987,1.611-2.317,1.494-3.587 c-0.115-1.349-1.572-1.095-2.482-0.773c0.146-1.514,1.555-3.216,2.912-3.792c1.439-0.597,3.579-0.587,4.302,1.036 c0.772,1.759,0.078,3.802-0.763,5.396c-0.918,1.731-2.1,3.333-3.363,4.829c-1.114,1.329-2.432,2.787-4.093,3.422 c-1.897,0.723-3.021-0.686-3.667-2.318c-0.705-1.777-1.056-3.771-1.565-5.621C4.898,8.726,4.644,7.836,4.136,7.191 C3.473,6.358,2.72,7.141,2.065,7.59C1.977,7.502,2.115,7.551,2.065,7.59L2.065,7.59z"/></svg>',
            warning: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="14" r="1"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><path d="M10.97,7.72 C10.85,9.54 10.56,11.29 10.56,11.29 C10.51,11.87 10.27,12 9.99,12 C9.69,12 9.49,11.87 9.43,11.29 C9.43,11.29 9.16,9.54 9.03,7.72 C8.96,6.54 9.03,6 9.03,6 C9.03,5.45 9.46,5.02 9.99,5 C10.53,5.01 10.97,5.44 10.97,6 C10.97,6 11.04,6.54 10.97,7.72 L10.97,7.72 Z"/></svg>',
            whatsapp: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.7,3.3c-1.8-1.8-4.1-2.8-6.7-2.8c-5.2,0-9.4,4.2-9.4,9.4c0,1.7,0.4,3.3,1.3,4.7l-1.3,4.9l5-1.3c1.4,0.8,2.9,1.2,4.5,1.2 l0,0l0,0c5.2,0,9.4-4.2,9.4-9.4C19.5,7.4,18.5,5,16.7,3.3 M10.1,17.7L10.1,17.7c-1.4,0-2.8-0.4-4-1.1l-0.3-0.2l-3,0.8l0.8-2.9 l-0.2-0.3c-0.8-1.2-1.2-2.7-1.2-4.2c0-4.3,3.5-7.8,7.8-7.8c2.1,0,4.1,0.8,5.5,2.3c1.5,1.5,2.3,3.4,2.3,5.5 C17.9,14.2,14.4,17.7,10.1,17.7 M14.4,11.9c-0.2-0.1-1.4-0.7-1.6-0.8c-0.2-0.1-0.4-0.1-0.5,0.1c-0.2,0.2-0.6,0.8-0.8,0.9 c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5C8,8.8,8.1,8.7,8.2,8.5 c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.2,0-0.3,0-0.4C8.4,7.6,7.9,6.5,7.7,6C7.5,5.5,7.3,5.6,7.2,5.6c-0.1,0-0.3,0-0.4,0 c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-0.8,0.8-0.8,2c0,1.2,0.8,2.3,1,2.4c0.1,0.2,1.7,2.5,4,3.5c0.6,0.2,1,0.4,1.3,0.5 c0.6,0.2,1.1,0.2,1.5,0.1c0.5-0.1,1.4-0.6,1.6-1.1c0.2-0.5,0.2-1,0.1-1.1C14.8,12.1,14.6,12,14.4,11.9"/></svg>',
            wordpress: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5c5.2,0,9.5-4.3,9.5-9.5S15.2,0.5,10,0.5L10,0.5L10,0.5z M15.6,3.9h-0.1 c-0.8,0-1.4,0.7-1.4,1.5c0,0.7,0.4,1.3,0.8,1.9c0.3,0.6,0.7,1.3,0.7,2.3c0,0.7-0.3,1.5-0.6,2.7L14.1,15l-3-8.9 c0.5,0,0.9-0.1,0.9-0.1C12.5,6,12.5,5.3,12,5.4c0,0-1.3,0.1-2.2,0.1C9,5.5,7.7,5.4,7.7,5.4C7.2,5.3,7.2,6,7.6,6c0,0,0.4,0.1,0.9,0.1 l1.3,3.5L8,15L5,6.1C5.5,6.1,5.9,6,5.9,6C6.4,6,6.3,5.3,5.9,5.4c0,0-1.3,0.1-2.2,0.1c-0.2,0-0.3,0-0.5,0c1.5-2.2,4-3.7,6.9-3.7 C12.2,1.7,14.1,2.6,15.6,3.9L15.6,3.9L15.6,3.9z M2.5,6.6l3.9,10.8c-2.7-1.3-4.6-4.2-4.6-7.4C1.8,8.8,2,7.6,2.5,6.6L2.5,6.6L2.5,6.6 z M10.2,10.7l2.5,6.9c0,0,0,0.1,0.1,0.1C11.9,18,11,18.2,10,18.2c-0.8,0-1.6-0.1-2.3-0.3L10.2,10.7L10.2,10.7L10.2,10.7z M14.2,17.1 l2.5-7.3c0.5-1.2,0.6-2.1,0.6-2.9c0-0.3,0-0.6-0.1-0.8c0.6,1.2,1,2.5,1,4C18.3,13,16.6,15.7,14.2,17.1L14.2,17.1L14.2,17.1z"/></svg>',
            world: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M1,10.5 L19,10.5"/><path fill="none" stroke="#000" d="M2.35,15.5 L17.65,15.5"/><path fill="none" stroke="#000" d="M2.35,5.5 L17.523,5.5"/><path fill="none" stroke="#000" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z"/><circle fill="none" stroke="#000" cx="10" cy="10.5" r="9"/></svg>',
            xing: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.4,4.56 C4.24,4.56 4.11,4.61 4.05,4.72 C3.98,4.83 3.99,4.97 4.07,5.12 L5.82,8.16 L5.82,8.17 L3.06,13.04 C2.99,13.18 2.99,13.33 3.06,13.44 C3.12,13.55 3.24,13.62 3.4,13.62 L6,13.62 C6.39,13.62 6.57,13.36 6.71,13.12 C6.71,13.12 9.41,8.35 9.51,8.16 C9.49,8.14 7.72,5.04 7.72,5.04 C7.58,4.81 7.39,4.56 6.99,4.56 L4.4,4.56 L4.4,4.56 Z"/><path d="M15.3,1 C14.91,1 14.74,1.25 14.6,1.5 C14.6,1.5 9.01,11.42 8.82,11.74 C8.83,11.76 12.51,18.51 12.51,18.51 C12.64,18.74 12.84,19 13.23,19 L15.82,19 C15.98,19 16.1,18.94 16.16,18.83 C16.23,18.72 16.23,18.57 16.16,18.43 L12.5,11.74 L12.5,11.72 L18.25,1.56 C18.32,1.42 18.32,1.27 18.25,1.16 C18.21,1.06 18.08,1 17.93,1 L15.3,1 L15.3,1 Z"/></svg>',
            yelp: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.175,14.971c-0.112,0.77-1.686,2.767-2.406,3.054c-0.246,0.1-0.487,0.076-0.675-0.069\tc-0.122-0.096-2.446-3.859-2.446-3.859c-0.194-0.293-0.157-0.682,0.083-0.978c0.234-0.284,0.581-0.393,0.881-0.276\tc0.016,0.01,4.21,1.394,4.332,1.482c0.178,0.148,0.263,0.379,0.225,0.646L17.175,14.971L17.175,14.971z M11.464,10.789\tc-0.203-0.307-0.199-0.666,0.009-0.916c0,0,2.625-3.574,2.745-3.657c0.203-0.135,0.452-0.141,0.69-0.025\tc0.691,0.335,2.085,2.405,2.167,3.199v0.027c0.024,0.271-0.082,0.491-0.273,0.623c-0.132,0.083-4.43,1.155-4.43,1.155\tc-0.322,0.096-0.68-0.06-0.882-0.381L11.464,10.789z M9.475,9.563C9.32,9.609,8.848,9.757,8.269,8.817c0,0-3.916-6.16-4.007-6.351\tc-0.057-0.212,0.011-0.455,0.202-0.65C5.047,1.211,8.21,0.327,9.037,0.529c0.27,0.069,0.457,0.238,0.522,0.479\tc0.047,0.266,0.433,5.982,0.488,7.264C10.098,9.368,9.629,9.517,9.475,9.563z M9.927,19.066c-0.083,0.225-0.273,0.373-0.54,0.421\tc-0.762,0.13-3.15-0.751-3.647-1.342c-0.096-0.131-0.155-0.262-0.167-0.394c-0.011-0.095,0-0.189,0.036-0.272\tc0.061-0.155,2.917-3.538,2.917-3.538c0.214-0.272,0.595-0.355,0.952-0.213c0.345,0.13,0.56,0.428,0.536,0.749\tC10.014,14.479,9.977,18.923,9.927,19.066z M3.495,13.912c-0.235-0.009-0.444-0.148-0.568-0.382c-0.089-0.17-0.151-0.453-0.19-0.794\tC2.63,11.701,2.761,10.144,3.07,9.648c0.145-0.226,0.357-0.345,0.592-0.336c0.154,0,4.255,1.667,4.255,1.667\tc0.321,0.118,0.521,0.453,0.5,0.833c-0.023,0.37-0.236,0.655-0.551,0.738L3.495,13.912z"/></svg>',
            youtube: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15,4.1c1,0.1,2.3,0,3,0.8c0.8,0.8,0.9,2.1,0.9,3.1C19,9.2,19,10.9,19,12c-0.1,1.1,0,2.4-0.5,3.4c-0.5,1.1-1.4,1.5-2.5,1.6 c-1.2,0.1-8.6,0.1-11,0c-1.1-0.1-2.4-0.1-3.2-1c-0.7-0.8-0.7-2-0.8-3C1,11.8,1,10.1,1,8.9c0-1.1,0-2.4,0.5-3.4C2,4.5,3,4.3,4.1,4.2 C5.3,4.1,12.6,4,15,4.1z M8,7.5v6l5.5-3L8,7.5z"/></svg>',
            PowerApps: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" version="1.1"><defs><clipPath id="b"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="c"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="d"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="e"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="f"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="g"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="h"><rect x="0" y="0" width="20" height="20"/></clipPath><mask id="j"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="l"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="n"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="p"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="r"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="t"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="v"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><g id="i" clip-path="url(#b)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 11.25 7.1875 L 11.25 4.375 L 5.9375 4.375 C 5.40625 4.375 5 4.78125 5 5.3125 L 5 15.9375 C 5 16.46875 5.40625 16.875 5.9375 16.875 L 14.0625 16.875 C 14.59375 16.875 15 16.46875 15 15.9375 L 15 8.125 L 12.1875 8.125 C 11.65625 8.125 11.25 7.71875 11.25 7.1875 Z M 11.25 7.1875"/></g><g id="k" clip-path="url(#c)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 11.5625 7.28125 L 15 10.3125 L 15 7.5 Z M 11.5625 7.28125"/></g><g id="m" clip-path="url(#d)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 6.875 L 9.875 6.875 L 9.875 7.5 L 6.875 7.5 Z M 6.875 6.875"/></g><g id="o" clip-path="url(#e)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 10 L 13.125 10 L 13.125 10.625 L 6.875 10.625 Z M 6.875 10"/></g><g id="q" clip-path="url(#f)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 8.4375 L 13.125 8.4375 L 13.125 9.0625 L 6.875 9.0625 Z M 6.875 8.4375"/></g><g id="s" clip-path="url(#g)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 11.5625 L 13.125 11.5625 L 13.125 12.1875 L 6.875 12.1875 Z M 6.875 11.5625"/></g><g id="u" clip-path="url(#h)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 13.125 L 13.125 13.125 L 13.125 13.75 L 6.875 13.75 Z M 6.875 13.125"/></g><filter id="a" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%"><feColorMatrix type="matrix" in="SourceGraphic" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/></filter></defs><path style="stroke:none;fill-rule:nonzero;fill:rgb(55.686275%,17.647059%,52.156863%);fill-opacity:1;" d="M 20 10 C 20 15.523438 15.523438 20 10 20 C 4.476562 20 0 15.523438 0 10 C 0 4.476562 4.476562 0 10 0 C 15.523438 0 20 4.476562 20 10 Z M 20 10"/><use xlink:href="#i" mask="url(#j)"/><path style="stroke:none;fill-rule:nonzero;fill:rgb(87.843137%,87.843137%,81.960784%);fill-opacity:1;" d="M 11.25 6.5625 L 11.25 3.75 L 5.9375 3.75 C 5.40625 3.75 5 4.15625 5 4.6875 L 5 15.3125 C 5 15.84375 5.40625 16.25 5.9375 16.25 L 14.0625 16.25 C 14.59375 16.25 15 15.84375 15 15.3125 L 15 7.5 L 12.1875 7.5 C 11.65625 7.5 11.25 7.09375 11.25 6.5625 Z M 11.25 6.5625"/><use xlink:href="#k" mask="url(#l)"/><path style="stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 11.25 3.75 L 11.25 6.5625 C 11.25 7.09375 11.65625 7.5 12.1875 7.5 L 15 7.5 Z M 11.25 3.75"/><use xlink:href="#m" mask="url(#n)"/><use xlink:href="#o" mask="url(#p)"/><use xlink:href="#q" mask="url(#r)"/><use xlink:href="#s" mask="url(#t)"/><use xlink:href="#u" mask="url(#v)"/></svg>',
            PowerAutomate: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" version="1.1"><defs><clipPath id="b"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="c"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="d"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="e"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="f"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="g"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="h"><rect x="0" y="0" width="20" height="20"/></clipPath><mask id="j"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="l"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="n"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="p"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="r"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="t"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="v"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><g id="i" clip-path="url(#b)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 11.25 7.1875 L 11.25 4.375 L 5.9375 4.375 C 5.40625 4.375 5 4.78125 5 5.3125 L 5 15.9375 C 5 16.46875 5.40625 16.875 5.9375 16.875 L 14.0625 16.875 C 14.59375 16.875 15 16.46875 15 15.9375 L 15 8.125 L 12.1875 8.125 C 11.65625 8.125 11.25 7.71875 11.25 7.1875 Z M 11.25 7.1875"/></g><g id="k" clip-path="url(#c)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 11.5625 7.28125 L 15 10.3125 L 15 7.5 Z M 11.5625 7.28125"/></g><g id="m" clip-path="url(#d)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 6.875 L 9.875 6.875 L 9.875 7.5 L 6.875 7.5 Z M 6.875 6.875"/></g><g id="o" clip-path="url(#e)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 10 L 13.125 10 L 13.125 10.625 L 6.875 10.625 Z M 6.875 10"/></g><g id="q" clip-path="url(#f)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 8.4375 L 13.125 8.4375 L 13.125 9.0625 L 6.875 9.0625 Z M 6.875 8.4375"/></g><g id="s" clip-path="url(#g)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 11.5625 L 13.125 11.5625 L 13.125 12.1875 L 6.875 12.1875 Z M 6.875 11.5625"/></g><g id="u" clip-path="url(#h)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 13.125 L 13.125 13.125 L 13.125 13.75 L 6.875 13.75 Z M 6.875 13.125"/></g><filter id="a" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%"><feColorMatrix type="matrix" in="SourceGraphic" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/></filter></defs><path style="stroke:none;fill-rule:nonzero;fill:rgb(21.176471%,52.54902%,94.901961%);fill-opacity:1;" d="M 20 10 C 20 15.523438 15.523438 20 10 20 C 4.476562 20 0 15.523438 0 10 C 0 4.476562 4.476562 0 10 0 C 15.523438 0 20 4.476562 20 10 Z M 20 10"/><use xlink:href="#i" mask="url(#j)"/><path style="stroke:none;fill-rule:nonzero;fill:rgb(87.843137%,87.843137%,81.960784%);fill-opacity:1;" d="M 11.25 6.5625 L 11.25 3.75 L 5.9375 3.75 C 5.40625 3.75 5 4.15625 5 4.6875 L 5 15.3125 C 5 15.84375 5.40625 16.25 5.9375 16.25 L 14.0625 16.25 C 14.59375 16.25 15 15.84375 15 15.3125 L 15 7.5 L 12.1875 7.5 C 11.65625 7.5 11.25 7.09375 11.25 6.5625 Z M 11.25 6.5625"/><use xlink:href="#k" mask="url(#l)"/><path style="stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 11.25 3.75 L 11.25 6.5625 C 11.25 7.09375 11.65625 7.5 12.1875 7.5 L 15 7.5 Z M 11.25 3.75"/><use xlink:href="#m" mask="url(#n)"/><use xlink:href="#o" mask="url(#p)"/><use xlink:href="#q" mask="url(#r)"/><use xlink:href="#s" mask="url(#t)"/><use xlink:href="#u" mask="url(#v)"/></svg>',
            PowerPlatform: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" version="1.1"><defs><clipPath id="b"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="c"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="d"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="e"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="f"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="g"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="h"><rect x="0" y="0" width="20" height="20"/></clipPath><mask id="j"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="l"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="n"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="p"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="r"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="t"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><mask id="v"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.2;stroke:none;"/></g></mask><g id="i" clip-path="url(#b)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 11.25 7.1875 L 11.25 4.375 L 5.9375 4.375 C 5.40625 4.375 5 4.78125 5 5.3125 L 5 15.9375 C 5 16.46875 5.40625 16.875 5.9375 16.875 L 14.0625 16.875 C 14.59375 16.875 15 16.46875 15 15.9375 L 15 8.125 L 12.1875 8.125 C 11.65625 8.125 11.25 7.71875 11.25 7.1875 Z M 11.25 7.1875"/></g><g id="k" clip-path="url(#c)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 11.5625 7.28125 L 15 10.3125 L 15 7.5 Z M 11.5625 7.28125"/></g><g id="m" clip-path="url(#d)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 6.875 L 9.875 6.875 L 9.875 7.5 L 6.875 7.5 Z M 6.875 6.875"/></g><g id="o" clip-path="url(#e)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 10 L 13.125 10 L 13.125 10.625 L 6.875 10.625 Z M 6.875 10"/></g><g id="q" clip-path="url(#f)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 8.4375 L 13.125 8.4375 L 13.125 9.0625 L 6.875 9.0625 Z M 6.875 8.4375"/></g><g id="s" clip-path="url(#g)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 11.5625 L 13.125 11.5625 L 13.125 12.1875 L 6.875 12.1875 Z M 6.875 11.5625"/></g><g id="u" clip-path="url(#h)"><path style="stroke:none;fill-rule:nonzero;fill:rgb(13.72549%,12.156863%,12.54902%);fill-opacity:1;" d="M 6.875 13.125 L 13.125 13.125 L 13.125 13.75 L 6.875 13.75 Z M 6.875 13.125"/></g><filter id="a" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%"><feColorMatrix type="matrix" in="SourceGraphic" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/></filter></defs><path style="stroke:none;fill-rule:nonzero;fill:rgb(3.921569%,36.470588%,50.588235%);fill-opacity:1;" d="M 20 10 C 20 15.523438 15.523438 20 10 20 C 4.476562 20 0 15.523438 0 10 C 0 4.476562 4.476562 0 10 0 C 15.523438 0 20 4.476562 20 10 Z M 20 10"/><use xlink:href="#i" mask="url(#j)"/><path style="stroke:none;fill-rule:nonzero;fill:rgb(87.843137%,87.843137%,81.960784%);fill-opacity:1;" d="M 11.25 6.5625 L 11.25 3.75 L 5.9375 3.75 C 5.40625 3.75 5 4.15625 5 4.6875 L 5 15.3125 C 5 15.84375 5.40625 16.25 5.9375 16.25 L 14.0625 16.25 C 14.59375 16.25 15 15.84375 15 15.3125 L 15 7.5 L 12.1875 7.5 C 11.65625 7.5 11.25 7.09375 11.25 6.5625 Z M 11.25 6.5625"/><use xlink:href="#k" mask="url(#l)"/><path style="stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 11.25 3.75 L 11.25 6.5625 C 11.25 7.09375 11.65625 7.5 12.1875 7.5 L 15 7.5 Z M 11.25 3.75"/><use xlink:href="#m" mask="url(#n)"/><use xlink:href="#o" mask="url(#p)"/><use xlink:href="#q" mask="url(#r)"/><use xlink:href="#s" mask="url(#t)"/><use xlink:href="#u" mask="url(#v)"/></svg>',
            PowerPlatform_old: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" version="1.1"><defs><linearGradient id="f" gradientUnits="userSpaceOnUse" x1="9" y1="58" x2="19" y2="96" gradientTransform="scale(.20833)"><stop offset="0" style="stop-color:rgb(8.235294%,58.039216%,33.333333%);stop-opacity:1;"/><stop offset="1" style="stop-color:rgb(24.705882%,74.117647%,66.27451%);stop-opacity:1;"/></linearGradient><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="24.899" y1="5.523" x2="82.915" y2="31.317" gradientTransform="scale(.20833)"><stop offset="0" style="stop-color:rgb(13.72549%,65.490196%,58.039216%);stop-opacity:1;"/><stop offset=".568" style="stop-color:rgb(0%,47.843137%,51.764706%);stop-opacity:1;"/><stop offset="1" style="stop-color:rgb(0%,31.764706%,34.509804%);stop-opacity:1;"/></linearGradient><linearGradient id="h" gradientUnits="userSpaceOnUse" x1="74" y1="40" x2="63.5" y2="12.5" gradientTransform="scale(.20833)"><stop offset="0" style="stop-color:rgb(0%,29.019608%,54.509804%);stop-opacity:1;"/><stop offset=".406" style="stop-color:rgb(6.27451%,36.470588%,65.882353%);stop-opacity:0.501961;"/><stop offset="1" style="stop-color:rgb(12.941176%,43.921569%,77.647059%);stop-opacity:0;"/></linearGradient><linearGradient id="k" gradientUnits="userSpaceOnUse" x1="17" y1="36" x2="69.5" y2="62" gradientTransform="scale(.20833)"><stop offset="0" style="stop-color:rgb(49.803922%,85.098039%,63.529412%);stop-opacity:1;"/><stop offset=".196" style="stop-color:rgb(27.843137%,74.901961%,47.45098%);stop-opacity:1;"/><stop offset=".714" style="stop-color:rgb(0%,57.254902%,50.196078%);stop-opacity:1;"/><stop offset="1" style="stop-color:rgb(0%,47.843137%,51.764706%);stop-opacity:1;"/></linearGradient><linearGradient id="d" gradientUnits="userSpaceOnUse" x1="16.5" y1="37" x2="28.5" y2="43" gradientTransform="scale(.20833)"><stop offset="0" style="stop-color:rgb(65.882353%,89.411765%,48.627451%);stop-opacity:0.858824;"/><stop offset=".367" style="stop-color:rgb(52.941176%,81.960784%,32.156863%);stop-opacity:0.2;"/><stop offset="1" style="stop-color:rgb(34.509804%,74.509804%,35.294118%);stop-opacity:0;"/></linearGradient><image id="b" width="20" height="20" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABWUlEQVQ4ja2RPUhCYRSG38/PDLuChCQtbS0FJTQUREFBUzSHDRE4RNgU5BpFP9DSUlOr0NIQNdQSNDQVUUNL0RJdEAvUoMG69+bbpKL3fqZXD5zpHJ7zHF4BRVGP+tE9vwGRDKp2gEABTL/C2EkKbTCl3gNAcyFBS7K+Hs/wp6tfDUsPabRm3usHStKMnQCAx5EYGogDF+GaL1SXCEUcgdSjfojMakMwAODlMwB4bQPt2Afmn4AbXW2z22P7QEztAw8OwMBeH4T/4H+jrTGI7WUgL8H7W9EWObfvGB9LDQVR6sS0HeYmWUuS5vUdIUWRUw7FTbIAIM7WBH7ZIjvvVTXf487OVwDnTvHdO2sbMbXZobaL6fw6DPNTdlb0y0q78hZNTihfMh7j9VsXgVkZpDWcc7SrZVITanK9JXaVlqPZMnDxzbWdo2UzdnbLFtiVoGZuksbRSDOMP0u/mOeVS3blAAAAAElFTkSuQmCC"/><image id="i" width="20" height="20" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAp0lEQVQ4je2QwQ7CIBAFB0SqJvb//9MYtC3goQ/TNEZavfKSPcAuk2Gh5d+YnfffOHn90KgOgN0BNUACIpDcomGBDjgBR523JAFPICyBFvBAD1wFrgGzYEF2ADgpO+AsWC9gLVlmD2ASNLuF3UXVMe+xBpuAUcBBttnpsWfendNw/Mx5J8ruripACtBoKKhZsyuzN1Y7NPqiV5WdbgEOshyLXUvLj3kB5bIwGEIEgy8AAAAASUVORK5CYII="/><image id="j" width="20" height="20" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAq0lEQVQ4je2RUQuDMBCDP7VOB/v//3TMqW33koM8rOLYq4FwpdcLyRUu/IvuS3WeRQ36cA8MxjOiFShAjpo0NACjeFM9Eg1HGdiBFdgAkonNwF2c1OsPnGUJLX6XNDhJ6CHOum9FLnL0MmHC4ShBdzhb5Ja7av0SDIeDRexsR7XhLva2Am/VPSIHsmIsarbi+runYodgSbaPTueV9meE4C5ni+pma7hw4Vd8AP01QgAcwqI/AAAAAElFTkSuQmCC"/><clipPath id="c"><rect x="0" y="0" width="20" height="20"/></clipPath><clipPath id="e"><rect x="0" y="0" width="20" height="20"/></clipPath><mask id="o"><g filter="url(#a)"><use xlink:href="#b"/></g></mask><mask id="m"><g filter="url(#a)"><rect x="0" y="0" width="20" height="20" style="fill:rgb(0%,0%,0%);fill-opacity:0.701961;stroke:none;"/></g></mask><g id="l" clip-path="url(#c)"><path style="stroke:none;fill-rule:nonzero;fill:url(#d);" d="M 13.0625 12.082031 L 2.179688 12.082031 C 1.613281 12.082031 1.097656 12.402344 0.847656 12.90625 L 3.554688 7.492188 C 3.808594 6.984375 4.324219 6.667969 4.886719 6.667969 L 15.832031 6.667969 C 16.976562 6.667969 18.027344 6.023438 18.542969 5 L 15.855469 10.359375 C 15.328125 11.414062 14.246094 12.082031 13.0625 12.082031 Z M 13.0625 12.082031"/></g><g id="n" clip-path="url(#e)"><path style="stroke:none;fill-rule:nonzero;fill:url(#f);" d="M 2.152344 12.082031 L 8.125 12.082031 L 4.625 19.082031 C 4.351562 19.632812 3.566406 19.632812 3.292969 19.082031 L 0.847656 14.195312 C 0.363281 13.222656 1.066406 12.082031 2.152344 12.082031 Z M 2.152344 12.082031"/><path style="stroke:none;fill-rule:nonzero;fill:url(#g);" d="M 7.542969 0.417969 L 15.777344 0.417969 C 18.101562 0.417969 19.609375 2.863281 18.570312 4.9375 L 15.886719 10.304688 C 15.878906 10.324219 15.871094 10.339844 15.863281 10.355469 L 15.417969 11.25 L 15.886719 10.304688 C 16.878906 8.238281 15.375 5.832031 13.070312 5.832031 L 5.582031 5.832031 C 5.027344 5.832031 4.667969 5.25 4.914062 4.753906 L 6.878906 0.828125 C 7.003906 0.574219 7.261719 0.417969 7.542969 0.417969 Z M 7.542969 0.417969"/><path style="stroke:none;fill-rule:nonzero;fill:url(#h);" d="M 7.542969 0.417969 L 15.777344 0.417969 C 18.101562 0.417969 19.609375 2.863281 18.570312 4.9375 L 15.882812 10.316406 C 15.875 10.332031 15.871094 10.34375 15.863281 10.355469 L 15.625 10.832031 L 15.882812 10.316406 C 16.882812 8.25 15.378906 5.832031 13.070312 5.832031 L 5.582031 5.832031 C 5.027344 5.832031 4.667969 5.25 4.914062 4.753906 L 6.878906 0.828125 C 7.003906 0.574219 7.261719 0.417969 7.542969 0.417969 Z M 7.542969 0.417969"/><use xlink:href="#i"/><use xlink:href="#j"/><path style="stroke:none;fill-rule:nonzero;fill:url(#k);" d="M 13.070312 12.082031 L 2.171875 12.082031 C 1.605469 12.082031 1.089844 12.402344 0.839844 12.90625 L 3.546875 7.492188 C 3.800781 6.984375 4.316406 6.667969 4.878906 6.667969 L 15.777344 6.667969 C 16.957031 6.667969 18.039062 6 18.570312 4.941406 L 18.75 4.582031 L 15.863281 10.355469 C 15.335938 11.414062 14.253906 12.082031 13.070312 12.082031 Z M 13.070312 12.082031"/><use xlink:href="#l" mask="url(#m)"/></g><filter id="a" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%"><feColorMatrix type="matrix" in="SourceGraphic" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/></filter></defs><use xlink:href="#n" mask="url(#o)"/></svg>',
            adoption: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#67bfff" stroke="none" d="M 16.145235 11.837305 C 16.145235 16.288712 12.523594 19.909922 8.072618 19.909922 C 3.62125 19.909922 0 16.288671 0 11.837305 C 0 7.386289 3.62125 3.764688 8.072618 3.764688 C 12.523633 3.764688 16.145235 7.386289 16.145235 11.837305 Z"/><g fill="#fff" stroke="none"><path d="M 8.072618 5.405937 C 4.52625 5.405937 1.641328 8.290899 1.641328 11.837226 C 1.641328 15.383554 4.526289 18.268517 8.072618 18.268517 C 11.618594 18.268517 14.503906 15.383554 14.503906 11.837226 C 14.503906 8.290899 11.618594 5.405937 8.072618 5.405937 Z M 8.072618 17.11211 C 5.163906 17.11211 2.797812 14.745586 2.797812 11.837305 C 2.797812 8.929024 5.163906 6.5625 8.072618 6.5625 C 10.980938 6.5625 13.347031 8.929024 13.347031 11.837305 C 13.347031 14.745586 10.980938 17.11211 8.072618 17.11211 Z"/><path d="M 8.072618 8.269922 C 6.105351 8.269922 4.505273 9.870039 4.505273 11.837265 C 4.505273 13.804491 6.105391 15.40461 8.072618 15.40461 C 10.039492 15.40461 11.64 13.804491 11.64 11.837265 C 11.64 9.870039 10.039492 8.269922 8.072618 8.269922 Z M 8.072618 14.248163 C 6.743438 14.248163 5.661757 13.166485 5.661757 11.837305 C 5.661757 10.508124 6.743438 9.426446 8.072618 9.426446 C 9.401797 9.426446 10.483478 10.508124 10.483478 11.837305 C 10.483478 13.166485 9.401797 14.248163 8.072618 14.248163 Z"/></g><path fill="#08f" stroke="none" d="M 16.145235 11.837305 C 16.145235 16.288712 12.523594 19.909922 8.072618 19.909922 L 8.072618 3.764688 C 12.523633 3.764688 16.145235 7.386289 16.145235 11.837305 Z"/><g fill="#d9d8db" stroke="none"><path d="M 11.64 11.837305 C 11.64 13.804531 10.039492 15.404649 8.072617 15.404649 L 8.072617 14.248125 C 9.401797 14.248125 10.483477 13.166446 10.483477 11.837266 C 10.483477 10.508085 9.401797 9.426406 8.072617 9.426406 L 8.072617 8.269882 C 10.039492 8.269923 11.64 9.87 11.64 11.837305 Z"/><path d="M 14.503905 11.837305 C 14.503905 15.383672 11.618554 18.268593 8.072617 18.268593 L 8.072617 17.11207 C 10.980937 17.11207 13.347031 14.745546 13.347031 11.837266 C 13.347031 8.928985 10.980937 6.562461 8.072617 6.562461 L 8.072617 5.405937 C 11.618594 5.405937 14.503905 8.290899 14.503905 11.837305 Z"/></g><path fill="#fd7052" stroke="none" d="M 20 2.985586 L 12.248945 10.73668 L 8.073086 12.016211 L 8.0725 12.016758 L 9.353437 7.840625 L 14.98125 2.213398 L 17.10457 0.090078 Z"/><path fill="#ff4f18" stroke="none" d="M 20 2.985586 L 12.248945 10.73668 L 8.073086 12.016211 L 18.551836 1.537422 Z"/><path fill="#ffdba8" stroke="none" d="M 12.249218 10.736641 L 12.249024 10.736836 L 9.315117 11.635781 L 8.073086 12.016406 L 8.072422 12.016602 L 8.453632 10.774375 L 9.353437 7.840859 Z"/><path fill="#ffc473" stroke="none" d="M 12.249218 10.736641 L 12.249024 10.736836 L 9.315117 11.635781 L 8.073086 12.016406 L 10.801016 9.288438 Z"/><path fill="#57555c" stroke="none" d="M 9.315117 11.635781 L 8.073086 12.016406 L 8.072422 12.016602 L 8.453632 10.774375 Z"/><path fill="#67bfff" stroke="none" d="M 19.99964 2.985741 L 18.009483 4.975895 L 15.114075 2.080486 L 17.104229 0.09033 Z"/><path fill="#fff" stroke="none" d="M 18.742674 4.242711 L 17.876392 5.108992 L 14.980984 2.213583 L 15.847264 1.347301 Z"/><path fill="#08f" stroke="none" d="M 19.999933 2.985443 L 18.009779 4.975596 L 16.561632 3.527451 L 18.551786 1.537296 Z"/><path fill="#3c3a41" stroke="none" d="M 8.884376 11.205078 L 9.315117 11.635781 L 8.073086 12.016406 Z"/><path fill="#d9d8db" stroke="none" d="M 18.742865 4.242747 L 17.876583 5.109027 L 16.428438 3.660881 L 17.294718 2.7946 Z"/></svg>',
            alm: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g stroke="none"><path fill="#0f81e0" d="M 14.482774 4.310351 L 0.689648 4.310351 C 0.308633 4.310351 0 4.001719 0 3.620703 L 0 0.86207 C 0 0.481016 0.308633 0.172422 0.689648 0.172422 L 14.482735 0.172422 C 14.86375 0.172422 15.172382 0.481054 15.172382 0.86207 L 15.172382 3.620703 C 15.172422 4.001719 14.86379 4.310351 14.482774 4.310351"/><path fill="#ecba16" d="M 14.482774 9.482774 L 0.689648 9.482774 C 0.308633 9.482774 0 9.174141 0 8.793086 L 0 6.034453 C 0 5.653438 0.308633 5.344805 0.689648 5.344805 L 14.482735 5.344805 C 14.86375 5.344805 15.172382 5.653438 15.172382 6.034453 L 15.172382 8.793086 C 15.172422 9.174141 14.86379 9.482774 14.482774 9.482774"/><path fill="#ed7161" d="M 19.310352 14.655156 L 5.517227 14.655156 C 5.136211 14.655156 4.827578 14.346523 4.827578 13.965508 L 4.827578 11.206875 C 4.827578 10.825859 5.136211 10.517226 5.517227 10.517226 L 19.310312 10.517226 C 19.691328 10.517226 19.99996 10.825859 19.99996 11.206875 L 19.99996 13.965508 C 20 14.346563 19.691368 14.655156 19.310352 14.655156"/><g fill="#42b05c"><path d="M 14.482774 19.827578 L 0.689648 19.827578 C 0.308633 19.827578 0 19.518984 0 19.13793 L 0 16.379297 C 0 15.998281 0.308633 15.689649 0.689648 15.689649 L 14.482735 15.689649 C 14.86375 15.689649 15.172382 15.998281 15.172382 16.379297 L 15.172382 19.13793 C 15.172422 19.518984 14.86379 19.827578 14.482774 19.827578"/><path d="M 7.586211 12.931015 L 2.413789 12.931015 C 2.223086 12.931015 2.068945 12.776524 2.068945 12.586172 C 2.068945 12.395821 2.223086 12.241327 2.413789 12.241327 L 7.586211 12.241327 C 7.776914 12.241327 7.931055 12.395821 7.931055 12.586172 C 7.931015 12.776562 7.776914 12.931015 7.586211 12.931015"/><path d="M 7.586211 12.931015 C 7.49793 12.931015 7.409648 12.897226 7.342422 12.83 L 6.30793 11.795507 C 6.173086 11.660664 6.173086 11.442734 6.30793 11.30793 C 6.442773 11.173125 6.660703 11.173086 6.795507 11.30793 L 7.83 12.342422 C 7.964843 12.477265 7.964843 12.695196 7.83 12.83 C 7.762774 12.897226 7.674492 12.931015 7.586211 12.931015"/><path d="M 6.551719 13.965508 C 6.463438 13.965508 6.375156 13.931719 6.30793 13.864492 C 6.173086 13.729649 6.173086 13.511719 6.30793 13.376915 L 7.342422 12.342422 C 7.477265 12.207579 7.695195 12.207579 7.83 12.342422 C 7.964843 12.477266 7.964843 12.695196 7.83 12.83 L 6.795507 13.864492 C 6.728281 13.931719 6.64 13.965508 6.551719 13.965508"/></g><g fill="#fff"><path d="M 17.931015 12.931015 L 9.655156 12.931015 C 9.464453 12.931015 9.310312 12.776524 9.310312 12.586172 C 9.310312 12.395821 9.464453 12.241327 9.655156 12.241327 L 17.931015 12.241327 C 18.121717 12.241327 18.27586 12.395821 18.27586 12.586172 C 18.27586 12.776562 18.121717 12.931015 17.931015 12.931015"/><path d="M 13.103437 7.758633 L 4.827578 7.758633 C 4.636875 7.758633 4.482735 7.604141 4.482735 7.413789 C 4.482735 7.223437 4.636875 7.068945 4.827578 7.068945 L 13.103437 7.068945 C 13.29414 7.068945 13.448281 7.223437 13.448281 7.413789 C 13.448281 7.604141 13.29414 7.758633 13.103437 7.758633"/><path d="M 3.103437 7.413789 C 3.103437 7.032774 2.794805 6.724141 2.413789 6.724141 C 2.032773 6.724141 1.724141 7.032774 1.724141 7.413789 C 1.724141 7.794805 2.032773 8.103437 2.413789 8.103437 C 2.794805 8.103437 3.103437 7.794844 3.103437 7.413789"/><path d="M 13.103437 2.58621 L 4.827578 2.58621 C 4.636875 2.58621 4.482735 2.431719 4.482735 2.241367 C 4.482735 2.051016 4.636875 1.896523 4.827578 1.896523 L 13.103437 1.896523 C 13.29414 1.896523 13.448281 2.051016 13.448281 2.241367 C 13.448281 2.431719 13.29414 2.58621 13.103437 2.58621"/><path d="M 3.103437 2.241367 C 3.103437 1.860352 2.794805 1.55172 2.413789 1.55172 C 2.032773 1.55172 1.724141 1.860352 1.724141 2.241367 C 1.724141 2.622383 2.032773 2.931015 2.413789 2.931015 C 2.794805 2.931015 3.103437 2.622421 3.103437 2.241367"/><path d="M 13.103437 18.103437 L 4.827578 18.103437 C 4.636875 18.103437 4.482735 17.948946 4.482735 17.758595 C 4.482735 17.568243 4.636875 17.41375 4.827578 17.41375 L 13.103437 17.41375 C 13.29414 17.41375 13.448281 17.568243 13.448281 17.758595 C 13.448281 17.948946 13.29414 18.103437 13.103437 18.103437"/><path d="M 3.103437 17.758633 C 3.103437 17.377617 2.794805 17.068985 2.413789 17.068985 C 2.032773 17.068985 1.724141 17.377617 1.724141 17.758633 C 1.724141 18.139648 2.032773 18.44828 2.413789 18.44828 C 2.794805 18.44828 3.103437 18.139648 3.103437 17.758633"/></g></g></svg>',
            automation: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#48ace1" stroke="none" d="M 1.179518 18.857832 C 0.409036 18.110844 -0.01747 17.078312 -0 16.006023 L 0.069277 3.965662 C 0.054217 2.894577 0.483133 1.864458 1.255422 1.121084 C 1.994578 0.371084 3.011446 -0.039156 4.063855 -0.013252 L 16.062048 0.008434 C 17.134939 -0.006025 18.166265 0.424698 18.910845 1.196987 C 19.659639 1.935543 20.069277 2.950603 20.04277 4.001807 L 20.021687 15.994578 C 20.04277 17.046385 19.627108 18.060242 18.873493 18.795179 C 18.128313 19.56506 17.097591 19.991566 16.026506 19.973494 L 3.981325 19.998795 C 2.929518 20.021687 1.915663 19.609035 1.179518 18.857832 Z"/><path fill="#fff" stroke="none" d="M 8.299397 3.157831 L 2.765663 7.847589 C 2.678313 7.921687 2.578313 7.999999 2.466867 8.080723 C 2.358434 8.16024 2.256024 8.24759 2.159638 8.341566 C 2.068675 8.43012 1.98735 8.528313 1.91747 8.634337 C 1.848795 8.742168 1.808434 8.86506 1.799398 8.992168 C 1.787349 9.121083 1.807229 9.251204 1.856627 9.370481 C 1.906626 9.489758 1.970482 9.601808 2.046988 9.706024 C 2.126506 9.814458 2.213253 9.917469 2.307229 10.013855 C 2.404217 10.112048 2.489759 10.205421 2.563855 10.293975 L 7.254819 15.825302 C 7.404819 16.005421 7.622891 16.115664 7.856627 16.130121 C 8.086144 16.151205 8.313855 16.075905 8.486144 15.922892 L 10.606627 14.131326 C 10.531325 14.06988 10.462049 14.001807 10.399398 13.927711 L 7.522892 10.512048 C 7.262048 10.213253 7.136747 9.81988 7.175904 9.425301 C 7.195783 9.042168 7.375904 8.684337 7.672289 8.440361 C 7.969277 8.196385 8.266265 7.948192 8.563855 7.695783 L 11.095181 5.550602 C 11.171686 5.484337 11.253614 5.425301 11.340963 5.374699 L 9.53494 3.251808 C 9.390362 3.072891 9.177711 2.961447 8.948193 2.944578 C 8.711446 2.921686 8.475904 2.998795 8.298795 3.156626 Z"/><path fill="#48ace1" stroke="none" d="M 10.306025 2.522289 C 10.854217 2.493374 11.390362 2.692772 11.786144 3.072891 L 16.396988 7.298192 C 16.81506 7.669879 17.060843 8.198193 17.075302 8.757229 C 17.103615 9.304819 16.904217 9.839157 16.524096 10.234337 L 12.296988 14.842772 C 11.934939 15.25482 11.418674 15.499397 10.86988 15.517469 C 10.312651 15.551807 9.765663 15.353615 9.359638 14.970482 L 4.713855 10.746386 C 4.301205 10.385542 4.056024 9.870481 4.036747 9.322289 C 4.003012 8.763855 4.201807 8.216867 4.586144 7.810241 L 8.848795 3.199999 C 9.21988 2.78253 9.74759 2.536747 10.306025 2.521687"/><path fill="#fff" stroke="none" d="M 11.749397 2.51265 C 12.29759 2.483736 12.833735 2.683132 13.229518 3.063253 L 17.840361 7.288554 C 18.258434 7.660241 18.504217 8.188554 18.518675 8.74759 C 18.546988 9.29518 18.347591 9.829518 17.96747 10.224698 L 13.740361 14.833133 C 13.378313 15.24518 12.862048 15.489759 12.313252 15.507832 C 11.756023 15.542168 11.209037 15.343976 10.803012 14.960843 L 6.157229 10.736747 C 5.744578 10.375903 5.499398 9.860843 5.480121 9.312651 C 5.446386 8.754216 5.645181 8.207229 6.029518 7.800602 L 10.292771 3.190964 C 10.663856 2.773495 11.191566 2.52771 11.75 2.51265"/><path fill="#48ace1" stroke="none" d="M 12.68494 13.960844 L 16.660843 9.934337 C 16.723494 9.870481 16.795782 9.803012 16.87711 9.73253 C 16.956024 9.663252 17.029518 9.587951 17.097591 9.508433 C 17.162651 9.433734 17.218674 9.351205 17.26506 9.263855 C 17.310843 9.175301 17.334337 9.077108 17.331926 8.977711 C 17.331926 8.876506 17.308434 8.777108 17.261446 8.687952 C 17.214458 8.598795 17.157228 8.515663 17.090363 8.440361 C 17.021084 8.361445 16.946386 8.287349 16.866867 8.219276 C 16.784338 8.149398 16.711447 8.083132 16.648191 8.019277 L 12.621084 4.04518 C 12.492168 3.915663 12.31506 3.845181 12.13253 3.85 C 11.953012 3.85 11.781325 3.923494 11.657831 4.054216 L 10.133735 5.592771 C 10.196385 5.634939 10.254819 5.683132 10.308434 5.736747 L 12.779518 8.192168 C 13.002409 8.406626 13.127109 8.703614 13.124097 9.01265 C 13.134939 9.312048 13.019879 9.601808 12.806626 9.812048 C 12.592771 10.022289 12.378916 10.235541 12.165663 10.451807 L 10.346988 12.293373 C 10.292169 12.35 10.232531 12.401205 10.168072 12.446988 L 11.718073 13.971687 C 11.842771 14.100603 12.015663 14.172289 12.195181 14.16988 C 12.380723 14.171687 12.558434 14.095181 12.68494 13.960241 Z"/></svg>',
            coe: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="#39b47b" stroke="none"><path d="M 20.015106 3.973494 C 20.085197 1.842169 18.175831 -0.087952 16.03142 -0.009638 C 16.03142 -0.009638 4.029003 -0.025904 4.029003 -0.025904 C 1.880967 -0.116264 -0.032024 1.813253 0.033837 3.945784 C 0.033837 3.945784 0.026586 9.201205 0.026586 9.201205 C 3.595166 9.212049 9.416314 9.229519 9.429607 9.229519 C 9.999396 9.269879 10.532326 9.524699 10.72145 10.120481 C 10.873716 11.207831 10.732931 18.671686 10.758308 19.931326 C 12.824774 19.750603 17.397583 20.671686 18.905136 18.78253 C 19.656797 18.048191 20.069487 17.036144 20.045921 15.987349 L 20.015106 3.973494 Z"/><path d="M 5.309366 18.590361 C 5.256193 17.481928 5.621148 16.166868 4.689426 15.33012 C 3.888217 14.274698 1.150453 14.763855 0.018731 14.643373 C -0.048943 16.067471 0.007251 17.691566 1.153474 18.713856 C 2.184894 19.888554 3.848943 19.963856 5.303323 19.902409 L 5.308762 18.590361 Z"/></g><path fill="#fff" stroke="none" d="M 15.030211 12.031929 C 15.020544 11.394579 15.096677 5.825301 15.016918 5.359638 C 14.976435 5.227109 14.934139 5.174699 14.861027 5.104217 C 14.702115 4.96024 14.542598 4.900602 14.331722 4.887952 C 14.090031 4.96747 7.351662 4.657228 7.41148 5.074096 C 7.029003 5.323494 7.269486 7.365663 7.198792 7.743976 C 12.888822 7.816265 12.145619 6.993373 12.135952 12.695783 L 14.331118 12.713856 C 14.712387 12.740963 15.045318 12.409037 15.030211 12.031929 Z"/><path fill="#fff" stroke="none" d="M 5.351057 16.850603 C 5.331722 17.780724 5.329305 18.989758 5.325075 19.93494 L 10.76133 19.93494 C 10.735951 18.633133 10.877341 11.259037 10.724472 10.140965 C 10.535952 9.546988 10.004834 9.293976 9.436857 9.253013 C 9.423565 9.253013 3.600604 9.235542 0.045921 9.224699 L 0.045921 14.648192 L 3.139577 14.672289 C 4.334139 14.653614 5.374622 15.671686 5.350453 16.85 Z"/></svg>',
            creator: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#f06696" stroke="none" d="M 1.157229 18.788521 C 0.394578 18.036858 -0.024096 17.002417 0.001205 15.929909 L 0.146988 3.894863 C 0.138554 2.823566 0.572892 1.796978 1.346988 1.059214 C 2.087952 0.314199 3.103615 -0.089426 4.15241 -0.056797 L 16.104216 0.041693 C 17.173492 0.034441 18.19759 0.471298 18.93494 1.248339 C 19.675903 1.990938 20.077711 3.008459 20.043976 4.059214 L 19.945784 16.047129 C 19.959639 17.099092 19.539158 18.109365 18.784338 18.839275 C 18.03735 19.603626 17.00783 20.023563 15.940964 19.998793 L 3.941566 19.946827 C 2.893976 19.96314 1.886145 19.543808 1.157831 18.787916 Z"/><path fill="#fff" stroke="none" d="M 17.724699 9.460423 L 17.724699 3.705137 C 17.724699 3.613897 17.727711 3.513596 17.736145 3.404835 C 17.743374 3.298489 17.743374 3.191542 17.736145 3.085196 C 17.729517 2.984894 17.711447 2.885197 17.683132 2.788519 C 17.653614 2.691843 17.6 2.604231 17.527109 2.533535 C 17.455421 2.459818 17.366867 2.405437 17.269278 2.374018 C 17.172289 2.343203 17.071688 2.323866 16.969881 2.317221 C 16.863855 2.309366 16.757229 2.309366 16.651205 2.317221 C 16.54217 2.32568 16.442169 2.329304 16.351204 2.328701 L 10.613855 2.328701 C 10.428313 2.326889 10.250603 2.402418 10.122289 2.536556 C 9.992168 2.664654 9.921084 2.841087 9.925301 3.023565 L 9.92229 5.226586 C 9.997591 5.212689 10.074096 5.205439 10.150602 5.206042 L 13.683132 5.218127 C 13.996988 5.213898 14.298193 5.339577 14.516265 5.566163 C 14.73735 5.774623 14.860844 6.06707 14.857229 6.371601 C 14.853012 6.676737 14.850603 6.983685 14.850603 7.293051 L 14.850603 9.92568 C 14.851205 10.006042 14.845181 10.0858 14.830723 10.164954 L 17.035543 10.161933 C 17.21747 10.166163 17.393373 10.094864 17.521084 9.964351 C 17.656023 9.833233 17.730122 9.650755 17.7253 9.462236 Z"/><path fill="#fff" stroke="none" d="M 3.022289 6.52568 L 2.986747 14.943806 C 2.986747 15.076737 3.000602 16.143806 3.041566 16.285196 C 3.100602 16.47855 3.162048 16.555891 3.268072 16.659214 C 3.372289 16.767372 3.531928 16.853775 3.643976 16.89426 C 3.756024 16.934742 3.891566 16.975832 4.037952 16.975832 C 4.053012 16.975832 13.38012 17.00423 13.38012 17.00423 C 13.651205 17.007856 13.912048 16.899094 14.100603 16.703323 C 14.291567 16.516617 14.396385 16.259214 14.391566 15.992146 L 14.410241 12.797583 C 14.410241 12.797583 14.187952 12.799999 14.075904 12.799397 L 8.909036 12.759517 C 8.422892 12.759517 8.009639 12.577644 7.692169 12.245317 C 7.369879 11.938369 7.190964 11.50997 7.198795 11.064652 C 7.207229 10.618731 7.212048 10.169185 7.214458 9.716617 L 7.231325 5.865861 C 7.230723 5.74864 7.231325 5.554684 7.231325 5.554684 L 4.039157 5.528097 C 3.772892 5.520845 3.512048 5.603021 3.324699 5.792145 C 3.126506 5.983685 3.01747 6.248942 3.022892 6.525076 Z"/></svg>',
            guidance: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#00a69a" stroke="none" d="M 20 10 C 20 15.522848 15.522848 20 10 20 C 4.477152 20 0 15.522848 0 10 C -0 4.477152 4.477152 0 10 0 C 15.522848 0 20 4.477152 20 10 Z"/><path fill="#c3996d" stroke="none" d="M 10.50064 17.21648 L 9.49936 17.21648 L 9.49936 2.718399 L 10 2 L 10.50064 2.718399 Z"/><path fill="#c3996d" stroke="none" d="M 6.93056 16.99872 L 13.06944 16.99872 L 13.06944 18 L 6.93056 18 Z"/><path fill="#fff" stroke="none" d="M 9.49936 6.46272 L 5.38944 6.46272 L 3.82208 4.89536 L 5.38944 3.328001 L 9.49936 3.328001 Z"/><path fill="#fa6a5d" stroke="none" d="M 10.50064 7.3768 L 14.61056 7.3768 L 16.177919 8.94416 L 14.61056 10.511519 L 10.50064 10.511519 Z"/></svg>',
            powercatlive: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#88c5cc" stroke="none" d="M 20 10 C 20 15.522847 15.522847 20 10 20 C 4.477152 20 0 15.522847 0 10 C 0 4.477153 4.477152 0 10 0 C 15.522847 0 20 4.477153 20 10 Z"/><path fill="#80b9bf" stroke="none" d="M 19.992031 10.315782 L 17.8125 5.024062 C 17.8125 4.805624 17.633595 4.6875 17.415312 4.6875 L 2.584687 4.6875 C 2.36625 4.6875 2.1875 4.831875 2.1875 5.050312 L 2.1875 5.130312 L 2.1875 5.210313 L 2.1875 12.8125 L 2.1875 12.8925 L 2.1875 12.972813 L 2.1875 14.716875 L 2.1875 14.84375 L 3.257031 17.383907 C 5.035156 19.008438 7.401562 20 10 20 C 15.416875 20 19.824844 15.692187 19.992031 10.315782 Z"/><path fill="#263740" stroke="none" d="M 2.1875 12.8125 L 2.1875 5.050312 C 2.1875 4.831875 2.36625 4.6875 2.584687 4.6875 L 17.415312 4.6875 C 17.633595 4.6875 17.8125 4.831875 17.8125 5.050312 L 17.8125 12.8125 L 2.1875 12.8125 Z"/><path fill="#e6e6e6" stroke="none" d="M 2.1875 12.8125 L 2.1875 14.716875 C 2.1875 14.935156 2.36625 15.15625 2.584687 15.15625 L 17.415312 15.15625 C 17.633595 15.15625 17.8125 14.935156 17.8125 14.716719 L 17.8125 12.8125 L 2.1875 12.8125 Z"/><path fill="#f2cf61" stroke="none" d="M 2.8125 5.46875 L 17.1875 5.46875 L 17.1875 12.1875 L 2.8125 12.1875 Z"/><path fill="#cc584c" stroke="none" d="M 10.15625 5.15625 C 10.15625 5.242544 10.086294 5.3125 10 5.3125 C 9.913706 5.3125 9.84375 5.242544 9.84375 5.15625 C 9.84375 5.069956 9.913706 5 10 5 C 10.086294 5 10.15625 5.069956 10.15625 5.15625 Z"/><path fill="#f5f5f5" stroke="none" d="M 12.515937 17.650938 C 11.721562 17.386095 11.324219 15.625 11.324219 15.15625 L 10 15.15625 L 8.675781 15.15625 C 8.675781 15.625 8.278594 17.386095 7.484062 17.650938 C 7.351563 17.650938 7.219219 17.755468 7.219219 17.88797 C 7.219219 18.020626 7.351718 18.125156 7.484062 18.125156 C 7.74875 18.125 10 18.125 10 18.125 C 10 18.125 12.251094 18.125 12.515937 18.125 C 12.648593 18.125 12.780781 18.020313 12.780781 17.887814 C 12.780781 17.755314 12.648281 17.650938 12.515937 17.650938 Z"/><path fill="#e6e6e6" stroke="none" d="M 7.484062 17.65625 C 7.351563 17.65625 7.219219 17.758125 7.219219 17.890625 C 7.219219 18.023125 7.351718 18.125 7.484062 18.125 C 7.74875 18.125 10 18.125 10 18.125 C 10 18.125 12.251094 18.125 12.515937 18.125 C 12.648593 18.125 12.780781 18.023125 12.780781 17.890625 C 12.780781 17.758125 12.648281 17.65625 12.515937 17.65625 L 7.484062 17.65625 Z"/><path fill="#f5f5f5" stroke="none" d="M 10.3125 13.90625 C 10.3125 14.078838 10.172588 14.21875 10 14.21875 C 9.827412 14.21875 9.6875 14.078838 9.6875 13.90625 C 9.6875 13.733662 9.827412 13.59375 10 13.59375 C 10.172588 13.59375 10.3125 13.733662 10.3125 13.90625 Z"/><path fill="#cc584c" stroke="none" d="M 8.59375 7.358906 C 8.59375 6.873905 8.95625 6.684999 9.369219 6.939375 L 11.700469 8.366094 C 12.11375 8.620156 12.119843 9.035937 11.706718 9.290156 L 9.36625 10.717031 C 8.953125 10.971093 8.59375 10.782187 8.59375 10.2975 L 8.59375 7.358906 Z"/><path fill="#263740" stroke="none" d="M 2.1875 12.8125 L 2.1875 5.050312 C 2.1875 4.831875 2.36625 4.6875 2.584687 4.6875 L 17.415312 4.6875 C 17.633595 4.6875 17.8125 4.831875 17.8125 5.050312 L 17.8125 12.8125 L 2.1875 12.8125 Z"/><path fill="#e6e6e6" stroke="none" d="M 2.1875 12.8125 L 2.1875 14.716875 C 2.1875 14.935156 2.36625 15.15625 2.584687 15.15625 L 17.415312 15.15625 C 17.633595 15.15625 17.8125 14.935156 17.8125 14.716719 L 17.8125 12.8125 L 2.1875 12.8125 Z"/><path fill="#e16b5a" stroke="none" d="M 2.8125 5.46875 L 17.1875 5.46875 L 17.1875 12.1875 L 2.8125 12.1875 Z"/><path fill="#cc584c" stroke="none" d="M 10.15625 5.15625 C 10.15625 5.242544 10.086294 5.3125 10 5.3125 C 9.913706 5.3125 9.84375 5.242544 9.84375 5.15625 C 9.84375 5.069956 9.913706 5 10 5 C 10.086294 5 10.15625 5.069956 10.15625 5.15625 Z"/><path fill="#f5f5f5" stroke="none" d="M 12.515937 17.650938 C 11.721562 17.386095 11.324219 15.625 11.324219 15.15625 L 10 15.15625 L 8.675781 15.15625 C 8.675781 15.625 8.278594 17.386095 7.484062 17.650938 C 7.351563 17.650938 7.219219 17.755468 7.219219 17.88797 C 7.219219 18.020626 7.351718 18.125156 7.484062 18.125156 C 7.74875 18.125 10 18.125 10 18.125 C 10 18.125 12.251094 18.125 12.515937 18.125 C 12.648593 18.125 12.780781 18.020313 12.780781 17.887814 C 12.780781 17.755314 12.648281 17.650938 12.515937 17.650938 Z"/><path fill="#e6e6e6" stroke="none" d="M 7.484062 17.65625 C 7.351563 17.65625 7.219219 17.758125 7.219219 17.890625 C 7.219219 18.023125 7.351718 18.125 7.484062 18.125 C 7.74875 18.125 10 18.125 10 18.125 C 10 18.125 12.251094 18.125 12.515937 18.125 C 12.648593 18.125 12.780781 18.023125 12.780781 17.890625 C 12.780781 17.758125 12.648281 17.65625 12.515937 17.65625 L 7.484062 17.65625 Z"/><path fill="#f5f5f5" stroke="none" d="M 10.3125 13.90625 C 10.3125 14.078838 10.172588 14.21875 10 14.21875 C 9.827412 14.21875 9.6875 14.078838 9.6875 13.90625 C 9.6875 13.733662 9.827412 13.59375 10 13.59375 C 10.172588 13.59375 10.3125 13.733662 10.3125 13.90625 Z"/><path fill="#f5f5f5" stroke="none" d="M 8.75 6.998906 C 8.75 6.916406 8.823281 6.885781 8.892187 6.931094 L 11.551094 8.667656 C 11.620157 8.712969 11.624218 8.786875 11.555157 8.832188 L 8.89 10.568906 C 8.821095 10.614062 8.75 10.583438 8.75 10.501094 L 8.75 6.998906 Z"/></svg>',
            stories: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="#8dc3e9" stroke="none"><path d="M 10.019413 6.200353 C 8.591898 6.200353 7.430567 5.038982 7.430567 3.611507 C 7.430567 2.184031 8.591937 1.022661 10.019413 1.022661 C 11.446888 1.022661 12.608258 2.184031 12.608258 3.611507 C 12.608258 5.038982 11.446927 6.200353 10.019413 6.200353 Z"/><path d="M 14.194403 12.435851 L 5.844462 12.435851 C 5.499334 12.435851 5.21953 12.156048 5.21953 11.810921 C 5.21953 9.164227 7.372759 7.011037 10.019413 7.011037 C 12.666067 7.011037 14.819295 9.164227 14.819295 11.810921 C 14.819335 12.156086 14.53953 12.435851 14.194403 12.435851 Z"/></g><g fill="#ffe49c" stroke="none"><path d="M 11.231859 18.865362 L 10.019491 18.228024 L 8.807123 18.865362 C 8.349589 19.105871 7.812955 18.71632 7.900391 18.206575 L 8.131937 16.856594 L 7.151155 15.900548 C 6.781018 15.539726 6.985675 14.909002 7.497495 14.834599 L 8.852955 14.637612 L 9.459139 13.409393 C 9.687906 12.945871 10.351037 12.945559 10.579921 13.409393 L 11.186106 14.637612 L 12.541566 14.834599 C 13.053073 14.908924 13.258278 15.539491 12.887906 15.900548 L 11.907123 16.856594 L 12.138669 18.206575 C 12.226693 18.720196 11.685676 19.103992 11.231859 18.865362 Z"/><path d="M 4.269511 18.865362 L 3.057143 18.227983 L 1.844775 18.865362 C 1.387241 19.105871 0.850607 18.71632 0.938043 18.206575 L 1.169589 16.856594 L 0.188885 15.900587 C -0.181252 15.539804 0.023405 14.90904 0.535225 14.834677 L 1.890685 14.637691 L 2.49683 13.409472 C 2.725597 12.94595 3.388728 12.945675 3.617613 13.409472 L 4.223796 14.637691 L 5.579257 14.834677 C 6.090764 14.909002 6.295929 15.53957 5.925597 15.900627 L 4.944736 16.856674 L 5.176282 18.206654 C 5.263797 18.716751 4.726732 19.105753 4.269511 18.865362 Z"/></g><path fill="#ffd155" stroke="none" d="M 18.194168 18.865362 L 16.9818 18.227983 L 15.769432 18.865362 C 15.311898 19.105871 14.775264 18.71632 14.8627 18.206575 L 15.094246 16.856594 L 14.113503 15.900548 C 13.743366 15.539765 13.948024 14.909002 14.459844 14.834638 L 15.815303 14.637651 L 16.421448 13.409432 C 16.650215 12.94591 17.313345 12.945637 17.542231 13.409432 L 18.148415 14.637651 L 19.503876 14.834638 C 20.015383 14.908963 20.220549 15.53953 19.850216 15.900587 L 18.869432 16.856634 L 19.100979 18.206615 C 19.188416 18.716751 18.65135 19.105753 18.194168 18.865362 Z"/><g fill="#48aee2" stroke="none"><path d="M 12.608297 3.611507 C 12.608297 2.184031 11.447006 1.022701 10.019569 1.022661 L 10.019569 6.20043 C 11.446967 6.200274 12.608297 5.038943 12.608297 3.611507 Z"/><path d="M 10.019569 7.011037 L 10.019569 12.435851 L 14.194403 12.435851 C 14.53953 12.435851 14.819335 12.156048 14.819335 11.810921 C 14.819335 9.164344 12.666105 7.011116 10.019569 7.011037 Z"/></g><path fill="#ffd155" stroke="none" d="M 12.541527 14.834677 L 11.186066 14.637691 L 10.579883 13.409472 C 10.474599 13.196165 10.257339 13.061096 10.019491 13.061096 L 10.019491 18.227983 L 11.231859 18.865322 C 11.68685 19.10454 12.226576 18.719452 12.138591 18.206535 L 11.907045 16.856556 L 12.887828 15.900509 C 13.258004 15.539765 13.053347 14.90904 12.541527 14.834677 Z"/></svg>'
        });
    }
    if (typeof window !== "undefined" && window.UIkit) {
        window.UIkit.use(plugin);
    }
    return plugin;
});

(function() {
    "use strict";
    var _$Templater_7 = {
        compile: compile,
        setOptions: setOptions
    };
    const options = {};
    options.pattern = /\{(.*?)\}/g;
    options.template = "";
    options.middleware = function() {};
    function setOptions(_options) {
        options.pattern = _options.pattern || options.pattern;
        options.template = _options.template || options.template;
        if (typeof _options.middleware === "function") {
            options.middleware = _options.middleware;
        }
    }
    function compile(data) {
        return options.template.replace(options.pattern, function(match, prop) {
            const value = options.middleware(prop, data[prop], options.template);
            if (typeof value !== "undefined") {
                return value;
            }
            return data[prop] || match;
        });
    }
    "use strict";
    function fuzzysearch(needle, haystack) {
        var tlen = haystack.length;
        var qlen = needle.length;
        if (qlen > tlen) {
            return false;
        }
        if (qlen === tlen) {
            return needle === haystack;
        }
        outer: for (var i = 0, j = 0; i < qlen; i++) {
            var nch = needle.charCodeAt(i);
            while (j < tlen) {
                if (haystack.charCodeAt(j++) === nch) {
                    continue outer;
                }
            }
            return false;
        }
        return true;
    }
    var _$fuzzysearch_1 = fuzzysearch;
    "use strict";
    var _$FuzzySearchStrategy_5 = new FuzzySearchStrategy();
    function FuzzySearchStrategy() {
        this.matches = function(string, crit) {
            return _$fuzzysearch_1(crit.toLowerCase(), string.toLowerCase());
        };
    }
    "use strict";
    var _$LiteralSearchStrategy_6 = new LiteralSearchStrategy();
    function LiteralSearchStrategy() {
        this.matches = function(str, crit) {
            if (!str) return false;
            str = str.trim().toLowerCase();
            crit = crit.trim().toLowerCase();
            return crit.split(" ").filter(function(word) {
                return str.indexOf(word) >= 0;
            }).length === crit.split(" ").length;
        };
    }
    "use strict";
    var _$Repository_4 = {
        put: put,
        clear: clear,
        search: search,
        setOptions: __setOptions_4
    };
    function NoSort() {
        return 0;
    }
    const data = [];
    let opt = {};
    opt.fuzzy = false;
    opt.limit = 10;
    opt.searchStrategy = opt.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6;
    opt.sort = NoSort;
    opt.exclude = [];
    function put(data) {
        if (isObject(data)) {
            return addObject(data);
        }
        if (isArray(data)) {
            return addArray(data);
        }
        return undefined;
    }
    function clear() {
        data.length = 0;
        return data;
    }
    function isObject(obj) {
        return Boolean(obj) && Object.prototype.toString.call(obj) === "[object Object]";
    }
    function isArray(obj) {
        return Boolean(obj) && Object.prototype.toString.call(obj) === "[object Array]";
    }
    function addObject(_data) {
        data.push(_data);
        return data;
    }
    function addArray(_data) {
        const added = [];
        clear();
        for (let i = 0, len = _data.length; i < len; i++) {
            if (isObject(_data[i])) {
                added.push(addObject(_data[i]));
            }
        }
        return added;
    }
    function search(crit) {
        if (!crit) {
            return [];
        }
        return findMatches(data, crit, opt.searchStrategy, opt).sort(opt.sort);
    }
    function __setOptions_4(_opt) {
        opt = _opt || {};
        opt.fuzzy = _opt.fuzzy || false;
        opt.limit = _opt.limit || 10;
        opt.searchStrategy = _opt.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6;
        opt.sort = _opt.sort || NoSort;
        opt.exclude = _opt.exclude || [];
    }
    function findMatches(data, crit, strategy, opt) {
        const matches = [];
        for (let i = 0; i < data.length && matches.length < opt.limit; i++) {
            const match = findMatchesInObject(data[i], crit, strategy, opt);
            if (match) {
                matches.push(match);
            }
        }
        return matches;
    }
    function findMatchesInObject(obj, crit, strategy, opt) {
        for (const key in obj) {
            if (!isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit)) {
                return obj;
            }
        }
    }
    function isExcluded(term, excludedTerms) {
        for (let i = 0, len = excludedTerms.length; i < len; i++) {
            const excludedTerm = excludedTerms[i];
            if (new RegExp(excludedTerm).test(term)) {
                return true;
            }
        }
        return false;
    }
    "use strict";
    var _$JSONLoader_2 = {
        load: load
    };
    function load(location, callback) {
        const xhr = getXHR();
        xhr.open("GET", location, true);
        xhr.onreadystatechange = createStateChangeListener(xhr, callback);
        xhr.send();
    }
    function createStateChangeListener(xhr, callback) {
        return function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    callback(null, JSON.parse(xhr.responseText));
                } catch (err) {
                    callback(err, null);
                }
            }
        };
    }
    function getXHR() {
        return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    }
    "use strict";
    var _$OptionsValidator_3 = function OptionsValidator(params) {
        if (!validateParams(params)) {
            throw new Error("-- OptionsValidator: required options missing");
        }
        if (!(this instanceof OptionsValidator)) {
            return new OptionsValidator(params);
        }
        const requiredOptions = params.required;
        this.getRequiredOptions = function() {
            return requiredOptions;
        };
        this.validate = function(parameters) {
            const errors = [];
            requiredOptions.forEach(function(requiredOptionName) {
                if (typeof parameters[requiredOptionName] === "undefined") {
                    errors.push(requiredOptionName);
                }
            });
            return errors;
        };
        function validateParams(params) {
            if (!params) {
                return false;
            }
            return typeof params.required !== "undefined" && params.required instanceof Array;
        }
    };
    "use strict";
    var _$utils_9 = {
        merge: merge,
        isJSON: isJSON
    };
    function merge(defaultParams, mergeParams) {
        const mergedOptions = {};
        for (const option in defaultParams) {
            mergedOptions[option] = defaultParams[option];
            if (typeof mergeParams[option] !== "undefined") {
                mergedOptions[option] = mergeParams[option];
            }
        }
        return mergedOptions;
    }
    function isJSON(json) {
        try {
            if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    }
    var _$src_8 = {};
    (function(window) {
        "use strict";
        let options = {
            searchInput: null,
            resultsContainer: null,
            json: [],
            success: Function.prototype,
            searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
            templateMiddleware: Function.prototype,
            sortMiddleware: function() {
                return 0;
            },
            noResultsText: "No results found",
            limit: 10,
            fuzzy: false,
            debounceTime: null,
            exclude: []
        };
        let debounceTimerHandle;
        const debounce = function(func, delayMillis) {
            if (delayMillis) {
                clearTimeout(debounceTimerHandle);
                debounceTimerHandle = setTimeout(func, delayMillis);
            } else {
                func.call();
            }
        };
        const requiredOptions = [ "searchInput", "resultsContainer", "json" ];
        const optionsValidator = _$OptionsValidator_3({
            required: requiredOptions
        });
        window.SimpleJekyllSearch = function(_options) {
            const errors = optionsValidator.validate(_options);
            if (errors.length > 0) {
                throwError("You must specify the following required options: " + requiredOptions);
            }
            options = _$utils_9.merge(options, _options);
            _$Templater_7.setOptions({
                template: options.searchResultTemplate,
                middleware: options.templateMiddleware
            });
            _$Repository_4.setOptions({
                fuzzy: options.fuzzy,
                limit: options.limit,
                sort: options.sortMiddleware,
                exclude: options.exclude
            });
            if (_$utils_9.isJSON(options.json)) {
                initWithJSON(options.json);
            } else {
                initWithURL(options.json);
            }
            const rv = {
                search: search
            };
            typeof options.success === "function" && options.success.call(rv);
            return rv;
        };
        function initWithJSON(json) {
            _$Repository_4.put(json);
            registerInput();
        }
        function initWithURL(url) {
            _$JSONLoader_2.load(url, function(err, json) {
                if (err) {
                    throwError("failed to get JSON (" + url + ")");
                }
                initWithJSON(json);
            });
        }
        function emptyResultsContainer() {
            options.resultsContainer.innerHTML = "";
        }
        function appendToResultsContainer(text) {
            options.resultsContainer.innerHTML += text;
        }
        function registerInput() {
            options.searchInput.addEventListener("input", function(e) {
                if (isWhitelistedKey(e.which)) {
                    emptyResultsContainer();
                    debounce(function() {
                        search(e.target.value);
                    }, options.debounceTime);
                }
            });
        }
        function search(query) {
            if (isValidQuery(query)) {
                emptyResultsContainer();
                render(_$Repository_4.search(query), query);
            }
        }
        function render(results, query) {
            const len = results.length;
            if (len === 0) {
                return appendToResultsContainer(options.noResultsText);
            }
            for (let i = 0; i < len; i++) {
                results[i].query = query;
                appendToResultsContainer(_$Templater_7.compile(results[i]));
            }
        }
        function isValidQuery(query) {
            return query && query.length > 0;
        }
        function isWhitelistedKey(key) {
            return [ 13, 16, 20, 37, 38, 39, 40, 91 ].indexOf(key) === -1;
        }
        function throwError(message) {
            throw new Error("SimpleJekyllSearch --- " + message);
        }
    })(window);
})();