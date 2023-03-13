(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scrollLock"] = factory();
	else
		root["scrollLock"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/tools.js
const argumentAsArray = (argument) => (Array.isArray(argument) ? argument : [argument]);
const isElement = (target) => target instanceof Node;
const isElementList = (nodeList) => nodeList instanceof NodeList;
const eachNode = (nodeList, callback) => {
    if (nodeList && callback) {
        nodeList = isElementList(nodeList) ? nodeList : [nodeList];
        for (let i = 0; i < nodeList.length; i++) {
            if (callback(nodeList[i], i, nodeList.length) === true) {
                break;
            }
        }
    }
};
const throwError = (message) => console.error(`[scroll-lock] ${message}`);
const arrayAsSelector = (array) => {
    if (Array.isArray(array)) {
        const selector = array.join(', ');
        return selector;
    }
};
const nodeListAsArray = (nodeList) => {
    const nodes = [];
    eachNode(nodeList, (node) => nodes.push(node));

    return nodes;
};
const findParentBySelector = ($el, selector, self = true, $root = document) => {
    if (self && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1) {
        return $el;
    }

    while (($el = $el.parentElement) && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) === -1);
    return $el;
};
const elementHasSelector = ($el, selector, $root = document) => {
    const has = nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1;
    return has;
};
const elementHasOverflowHidden = ($el) => {
    if ($el) {
        const computedStyle = getComputedStyle($el);
        const overflowIsHidden = computedStyle.overflow === 'hidden';
        return overflowIsHidden;
    }
};
const elementScrollTopOnStart = ($el) => {
    if ($el) {
        if (elementHasOverflowHidden($el)) {
            return true;
        }

        const scrollTop = $el.scrollTop;
        return scrollTop <= 0;
    }
};
const elementScrollTopOnEnd = ($el) => {
    if ($el) {
        if (elementHasOverflowHidden($el)) {
            return true;
        }

        const scrollTop = $el.scrollTop;
        const scrollHeight = $el.scrollHeight;
        const scrollTopWithHeight = scrollTop + $el.offsetHeight;
        return scrollTopWithHeight >= scrollHeight;
    }
};
const elementScrollLeftOnStart = ($el) => {
    if ($el) {
        if (elementHasOverflowHidden($el)) {
            return true;
        }

        const scrollLeft = $el.scrollLeft;
        return scrollLeft <= 0;
    }
};
const elementScrollLeftOnEnd = ($el) => {
    if ($el) {
        if (elementHasOverflowHidden($el)) {
            return true;
        }

        const scrollLeft = $el.scrollLeft;
        const scrollWidth = $el.scrollWidth;
        const scrollLeftWithWidth = scrollLeft + $el.offsetWidth;
        return scrollLeftWithWidth >= scrollWidth;
    }
};
const elementIsScrollableField = ($el) => {
    const selector = 'textarea, [contenteditable="true"]';
    return elementHasSelector($el, selector);
};
const elementIsInputRange = ($el) => {
    const selector = 'input[type="range"]';
    return elementHasSelector($el, selector);
};
const elementHasTouchableParent = ($el) => {
    const selector = '[data-scroll-lock-touchable]';
    return !!findParentBySelector($el, selector);
};

// CONCATENATED MODULE: ./src/scroll-lock.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disablePageScroll", function() { return disablePageScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enablePageScroll", function() { return enablePageScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollState", function() { return getScrollState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearQueueScrollLocks", function() { return clearQueueScrollLocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTargetScrollBarWidth", function() { return getTargetScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentTargetScrollBarWidth", function() { return getCurrentTargetScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageScrollBarWidth", function() { return getPageScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentPageScrollBarWidth", function() { return getCurrentPageScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addScrollableTarget", function() { return addScrollableTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeScrollableTarget", function() { return removeScrollableTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addScrollableSelector", function() { return addScrollableSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeScrollableSelector", function() { return removeScrollableSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLockableTarget", function() { return addLockableTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLockableSelector", function() { return addLockableSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFillGapMethod", function() { return setFillGapMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFillGapTarget", function() { return addFillGapTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFillGapTarget", function() { return removeFillGapTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFillGapSelector", function() { return addFillGapSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFillGapSelector", function() { return removeFillGapSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refillGaps", function() { return refillGaps; });


const FILL_GAP_AVAILABLE_METHODS = ['padding', 'margin', 'width', 'max-width', 'none'];
const TOUCH_DIRECTION_DETECT_OFFSET = 3;

const state = {
    scroll: true,
    preventTouchMove: false,
    queue: 0,
    scrollableSelectors: ['[data-scroll-lock-scrollable]'],
    lockableSelectors: ['body', '[data-scroll-lock-lockable]'],
    fillGapSelectors: ['body', '[data-scroll-lock-fill-gap]', '[data-scroll-lock-lockable]'],
    fillGapMethod: FILL_GAP_AVAILABLE_METHODS[0],
    //
    startTouchY: 0,
    startTouchX: 0,
};

const disablePageScroll = (target) => {
    if (state.queue <= 0) {
        state.scroll = false;
        hideLockableOverflow();
        fillGaps();
    }

    addScrollableTarget(target);
    state.queue++;
};
const enablePageScroll = (target) => {
    state.queue > 0 && state.queue--;
    if (state.queue <= 0) {
        state.scroll = true;
        showLockableOverflow();
        unfillGaps();
    }

    removeScrollableTarget(target);
};
const getScrollState = () => {
    return state.scroll;
};
const clearQueueScrollLocks = () => {
    state.queue = 0;
};
const getTargetScrollBarWidth = ($target, onlyExists = false) => {
    if (isElement($target)) {
        const currentOverflowYProperty = $target.style.overflowY;
        if (onlyExists) {
            if (!getScrollState()) {
                $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-overflow-y-property');
            }
        } else {
            $target.style.overflowY = 'scroll';
        }
        const width = getCurrentTargetScrollBarWidth($target);
        $target.style.overflowY = currentOverflowYProperty;

        return width;
    } else {
        return 0;
    }
};
const getCurrentTargetScrollBarWidth = ($target) => {
    if (isElement($target)) {
        if ($target === document.body) {
            const documentWidth = document.documentElement.clientWidth;
            const windowWidth = window.innerWidth;
            const currentWidth = windowWidth - documentWidth;

            return currentWidth;
        } else {
            const borderLeftWidthCurrentProperty = $target.style.borderLeftWidth;
            const borderRightWidthCurrentProperty = $target.style.borderRightWidth;
            $target.style.borderLeftWidth = '0px';
            $target.style.borderRightWidth = '0px';
            const currentWidth = $target.offsetWidth - $target.clientWidth;
            $target.style.borderLeftWidth = borderLeftWidthCurrentProperty;
            $target.style.borderRightWidth = borderRightWidthCurrentProperty;

            return currentWidth;
        }
    } else {
        return 0;
    }
};
const getPageScrollBarWidth = (onlyExists = false) => {
    return getTargetScrollBarWidth(document.body, onlyExists);
};
const getCurrentPageScrollBarWidth = () => {
    return getCurrentTargetScrollBarWidth(document.body);
};
const addScrollableTarget = (target) => {
    if (target) {
        const targets = argumentAsArray(target);
        targets.map(($targets) => {
            eachNode($targets, ($target) => {
                if (isElement($target)) {
                    $target.setAttribute('data-scroll-lock-scrollable', '');
                } else {
                    throwError(`"${$target}" is not a Element.`);
                }
            });
        });
    }
};
const removeScrollableTarget = (target) => {
    if (target) {
        const targets = argumentAsArray(target);
        targets.map(($targets) => {
            eachNode($targets, ($target) => {
                if (isElement($target)) {
                    $target.removeAttribute('data-scroll-lock-scrollable');
                } else {
                    throwError(`"${$target}" is not a Element.`);
                }
            });
        });
    }
};
const addScrollableSelector = (selector) => {
    if (selector) {
        const selectors = argumentAsArray(selector);
        selectors.map((selector) => {
            state.scrollableSelectors.push(selector);
        });
    }
};
const removeScrollableSelector = (selector) => {
    if (selector) {
        const selectors = argumentAsArray(selector);
        selectors.map((selector) => {
            state.scrollableSelectors = state.scrollableSelectors.filter((sSelector) => sSelector !== selector);
        });
    }
};
const addLockableTarget = (target) => {
    if (target) {
        const targets = argumentAsArray(target);
        targets.map(($targets) => {
            eachNode($targets, ($target) => {
                if (isElement($target)) {
                    $target.setAttribute('data-scroll-lock-lockable', '');
                } else {
                    throwError(`"${$target}" is not a Element.`);
                }
            });
        });
        if (!getScrollState()) {
            hideLockableOverflow();
        }
    }
};
const addLockableSelector = (selector) => {
    if (selector) {
        const selectors = argumentAsArray(selector);
        selectors.map((selector) => {
            state.lockableSelectors.push(selector);
        });
        if (!getScrollState()) {
            hideLockableOverflow();
        }
        addFillGapSelector(selector);
    }
};
const setFillGapMethod = (method) => {
    if (method) {
        if (FILL_GAP_AVAILABLE_METHODS.indexOf(method) !== -1) {
            state.fillGapMethod = method;
            refillGaps();
        } else {
            const methods = FILL_GAP_AVAILABLE_METHODS.join(', ');
            throwError(`"${method}" method is not available!\nAvailable fill gap methods: ${methods}.`);
        }
    }
};
const addFillGapTarget = (target) => {
    if (target) {
        const targets = argumentAsArray(target);
        targets.map(($targets) => {
            eachNode($targets, ($target) => {
                if (isElement($target)) {
                    $target.setAttribute('data-scroll-lock-fill-gap', '');
                    if (!state.scroll) {
                        fillGapTarget($target);
                    }
                } else {
                    throwError(`"${$target}" is not a Element.`);
                }
            });
        });
    }
};
const removeFillGapTarget = (target) => {
    if (target) {
        const targets = argumentAsArray(target);
        targets.map(($targets) => {
            eachNode($targets, ($target) => {
                if (isElement($target)) {
                    $target.removeAttribute('data-scroll-lock-fill-gap');
                    if (!state.scroll) {
                        unfillGapTarget($target);
                    }
                } else {
                    throwError(`"${$target}" is not a Element.`);
                }
            });
        });
    }
};
const addFillGapSelector = (selector) => {
    if (selector) {
        const selectors = argumentAsArray(selector);
        selectors.map((selector) => {
            if (state.fillGapSelectors.indexOf(selector) === -1) {
                state.fillGapSelectors.push(selector);
                if (!state.scroll) {
                    fillGapSelector(selector);
                }
            }
        });
    }
};
const removeFillGapSelector = (selector) => {
    if (selector) {
        const selectors = argumentAsArray(selector);
        selectors.map((selector) => {
            state.fillGapSelectors = state.fillGapSelectors.filter((fSelector) => fSelector !== selector);
            if (!state.scroll) {
                unfillGapSelector(selector);
            }
        });
    }
};

const refillGaps = () => {
    if (!state.scroll) {
        fillGaps();
    }
};

const hideLockableOverflow = () => {
    const selector = arrayAsSelector(state.lockableSelectors);
    hideLockableOverflowSelector(selector);
};
const showLockableOverflow = () => {
    const selector = arrayAsSelector(state.lockableSelectors);
    showLockableOverflowSelector(selector);
};
const hideLockableOverflowSelector = (selector) => {
    const $targets = document.querySelectorAll(selector);
    eachNode($targets, ($target) => {
        hideLockableOverflowTarget($target);
    });
};
const showLockableOverflowSelector = (selector) => {
    const $targets = document.querySelectorAll(selector);
    eachNode($targets, ($target) => {
        showLockableOverflowTarget($target);
    });
};
const hideLockableOverflowTarget = ($target) => {
    if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') !== 'true') {
        const computedStyle = window.getComputedStyle($target);
        $target.setAttribute('data-scroll-lock-saved-overflow-y-property', computedStyle.overflowY);
        $target.setAttribute('data-scroll-lock-saved-inline-overflow-property', $target.style.overflow);
        $target.setAttribute('data-scroll-lock-saved-inline-overflow-y-property', $target.style.overflowY);

        $target.style.overflow = 'hidden';
        $target.setAttribute('data-scroll-lock-locked', 'true');
    }
};
const showLockableOverflowTarget = ($target) => {
    if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') === 'true') {
        $target.style.overflow = $target.getAttribute('data-scroll-lock-saved-inline-overflow-property');
        $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-inline-overflow-y-property');

        $target.removeAttribute('data-scroll-lock-saved-overflow-property');
        $target.removeAttribute('data-scroll-lock-saved-inline-overflow-property');
        $target.removeAttribute('data-scroll-lock-saved-inline-overflow-y-property');
        $target.removeAttribute('data-scroll-lock-locked');
    }
};

const fillGaps = () => {
    state.fillGapSelectors.map((selector) => {
        fillGapSelector(selector);
    });
};
const unfillGaps = () => {
    state.fillGapSelectors.map((selector) => {
        unfillGapSelector(selector);
    });
};
const fillGapSelector = (selector) => {
    const $targets = document.querySelectorAll(selector);
    const isLockable = state.lockableSelectors.indexOf(selector) !== -1;
    eachNode($targets, ($target) => {
        fillGapTarget($target, isLockable);
    });
};
const fillGapTarget = ($target, isLockable = false) => {
    if (isElement($target)) {
        let scrollBarWidth;
        if ($target.getAttribute('data-scroll-lock-lockable') === '' || isLockable) {
            scrollBarWidth = getTargetScrollBarWidth($target, true);
        } else {
            const $lockableParent = findParentBySelector($target, arrayAsSelector(state.lockableSelectors));
            scrollBarWidth = getTargetScrollBarWidth($lockableParent, true);
        }

        if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
            unfillGapTarget($target);
        }

        const computedStyle = window.getComputedStyle($target);
        $target.setAttribute('data-scroll-lock-filled-gap', 'true');
        $target.setAttribute('data-scroll-lock-current-fill-gap-method', state.fillGapMethod);

        if (state.fillGapMethod === 'margin') {
            const currentMargin = parseFloat(computedStyle.marginRight);
            $target.style.marginRight = `${currentMargin + scrollBarWidth}px`;
        } else if (state.fillGapMethod === 'width') {
            $target.style.width = `calc(100% - ${scrollBarWidth}px)`;
        } else if (state.fillGapMethod === 'max-width') {
            $target.style.maxWidth = `calc(100% - ${scrollBarWidth}px)`;
        } else if (state.fillGapMethod === 'padding') {
            const currentPadding = parseFloat(computedStyle.paddingRight);
            $target.style.paddingRight = `${currentPadding + scrollBarWidth}px`;
        }
    }
};
const unfillGapSelector = (selector) => {
    const $targets = document.querySelectorAll(selector);
    eachNode($targets, ($target) => {
        unfillGapTarget($target);
    });
};
const unfillGapTarget = ($target) => {
    if (isElement($target)) {
        if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
            const currentFillGapMethod = $target.getAttribute('data-scroll-lock-current-fill-gap-method');
            $target.removeAttribute('data-scroll-lock-filled-gap');
            $target.removeAttribute('data-scroll-lock-current-fill-gap-method');

            if (currentFillGapMethod === 'margin') {
                $target.style.marginRight = ``;
            } else if (currentFillGapMethod === 'width') {
                $target.style.width = ``;
            } else if (currentFillGapMethod === 'max-width') {
                $target.style.maxWidth = ``;
            } else if (currentFillGapMethod === 'padding') {
                $target.style.paddingRight = ``;
            }
        }
    }
};

const onResize = (e) => {
    refillGaps();
};

const onTouchStart = (e) => {
    if (!state.scroll) {
        state.startTouchY = e.touches[0].clientY;
        state.startTouchX = e.touches[0].clientX;

        state.preventTouchMove = elementHasTouchableParent(e.target)
    }
};
const onTouchMove = (e) => {
    if (!state.scroll && !state.preventTouchMove) {
        const { startTouchY, startTouchX } = state;
        const currentClientY = e.touches[0].clientY;
        const currentClientX = e.touches[0].clientX;

        if (e.touches.length < 2) {
            const selector = arrayAsSelector(state.scrollableSelectors);
            const direction = {
                up: startTouchY < currentClientY,
                down: startTouchY > currentClientY,
                left: startTouchX < currentClientX,
                right: startTouchX > currentClientX,
            };
            const directionWithOffset = {
                up: startTouchY + TOUCH_DIRECTION_DETECT_OFFSET < currentClientY,
                down: startTouchY - TOUCH_DIRECTION_DETECT_OFFSET > currentClientY,
                left: startTouchX + TOUCH_DIRECTION_DETECT_OFFSET < currentClientX,
                right: startTouchX - TOUCH_DIRECTION_DETECT_OFFSET > currentClientX,
            };
            const handle = ($el, skip = false) => {
                if ($el) {
                    const parentScrollableEl = findParentBySelector($el, selector, false);
                    if (elementIsInputRange($el)) {
                        return false;
                    }

                    if (
                        skip ||
                        (elementIsScrollableField($el) && findParentBySelector($el, selector)) ||
                        elementHasSelector($el, selector)
                    ) {
                        let prevent = false;
                        if (elementScrollLeftOnStart($el) && elementScrollLeftOnEnd($el)) {
                            if (
                                (direction.up && elementScrollTopOnStart($el)) ||
                                (direction.down && elementScrollTopOnEnd($el))
                            ) {
                                prevent = true;
                            }
                        } else if (elementScrollTopOnStart($el) && elementScrollTopOnEnd($el)) {
                            if (
                                (direction.left && elementScrollLeftOnStart($el)) ||
                                (direction.right && elementScrollLeftOnEnd($el))
                            ) {
                                prevent = true;
                            }
                        } else if (
                            (directionWithOffset.up && elementScrollTopOnStart($el)) ||
                            (directionWithOffset.down && elementScrollTopOnEnd($el)) ||
                            (directionWithOffset.left && elementScrollLeftOnStart($el)) ||
                            (directionWithOffset.right && elementScrollLeftOnEnd($el))
                        ) {
                            prevent = true;
                        }
                        if (prevent) {
                            if (parentScrollableEl) {
                                handle(parentScrollableEl, true);
                            } else {
                                if (e.cancelable) {
                                    e.preventDefault();
                                }
                            }
                        }
                    } else {
                        handle(parentScrollableEl);
                    }
                } else {
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                }
            };

            handle(e.target);
        }
    }
};
const onTouchEnd = (e) => {
    if (!state.scroll) {
        state.startTouchY = 0;
        state.startTouchX = 0;
    }

    state.preventTouchMove = false;
};

if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResize);
}
if (typeof document !== 'undefined') {
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove, {
        passive: false
    });
    document.addEventListener('touchend', onTouchEnd);
}

const deprecatedMethods = {
    hide(target) {
        throwError(
            '"hide" is deprecated! Use "disablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#disablepagescrollscrollabletarget'
        );

        disablePageScroll(target);
    },
    show(target) {
        throwError(
            '"show" is deprecated! Use "enablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#enablepagescrollscrollabletarget'
        );

        enablePageScroll(target);
    },
    toggle(target) {
        throwError('"toggle" is deprecated! Do not use it.');

        if (getScrollState()) {
            disablePageScroll();
        } else {
            enablePageScroll(target);
        }
    },
    getState() {
        throwError(
            '"getState" is deprecated! Use "getScrollState" instead. \n https://github.com/FL3NKEY/scroll-lock#getscrollstate'
        );

        return getScrollState();
    },
    getWidth() {
        throwError(
            '"getWidth" is deprecated! Use "getPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getpagescrollbarwidth'
        );

        return getPageScrollBarWidth();
    },
    getCurrentWidth() {
        throwError(
            '"getCurrentWidth" is deprecated! Use "getCurrentPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getcurrentpagescrollbarwidth'
        );

        return getCurrentPageScrollBarWidth();
    },
    setScrollableTargets(target) {
        throwError(
            '"setScrollableTargets" is deprecated! Use "addScrollableTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addscrollabletargetscrollabletarget'
        );

        addScrollableTarget(target);
    },
    setFillGapSelectors(selector) {
        throwError(
            '"setFillGapSelectors" is deprecated! Use "addFillGapSelector" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgapselectorfillgapselector'
        );

        addFillGapSelector(selector);
    },
    setFillGapTargets(target) {
        throwError(
            '"setFillGapTargets" is deprecated! Use "addFillGapTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgaptargetfillgaptarget'
        );

        addFillGapTarget(target);
    },
    clearQueue() {
        throwError(
            '"clearQueue" is deprecated! Use "clearQueueScrollLocks" instead. \n https://github.com/FL3NKEY/scroll-lock#clearqueuescrolllocks'
        );

        clearQueueScrollLocks();
    },
};

const scrollLock = {
    disablePageScroll,
    enablePageScroll,

    getScrollState,
    clearQueueScrollLocks,
    getTargetScrollBarWidth,
    getCurrentTargetScrollBarWidth,
    getPageScrollBarWidth,
    getCurrentPageScrollBarWidth,

    addScrollableSelector,
    removeScrollableSelector,

    addScrollableTarget,
    removeScrollableTarget,

    addLockableSelector,

    addLockableTarget,

    addFillGapSelector,
    removeFillGapSelector,

    addFillGapTarget,
    removeFillGapTarget,

    setFillGapMethod,
    refillGaps,

    _state: state,

    ...deprecatedMethods,
};

/* harmony default export */ var scroll_lock = __webpack_exports__["default"] = (scrollLock);


/***/ })
/******/ ])["default"];
});