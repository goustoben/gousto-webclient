(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Heading"), require("./ExpandableSection.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Heading", "./ExpandableSection.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Heading"), require("./ExpandableSection.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./Heading"], root["./ExpandableSection.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Heading__, __WEBPACK_EXTERNAL_MODULE__ExpandableSection_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/ExpandableSection/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../Heading":
/*!****************************!*\
  !*** external "./Heading" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Heading__;\n\n//# sourceURL=webpack:///external_%22./Heading%22?");

/***/ }),

/***/ "./ExpandableSection.module.css":
/*!*************************************************!*\
  !*** external "./ExpandableSection.module.css" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__ExpandableSection_module_css__;\n\n//# sourceURL=webpack:///external_%22./ExpandableSection.module.css%22?");

/***/ }),

/***/ "./src/components/ExpandableSection/ExpandableSection.logic.js":
/*!*********************************************************************!*\
  !*** ./src/components/ExpandableSection/ExpandableSection.logic.js ***!
  \*********************************************************************/
/*! exports provided: ExpandableSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ExpandableSection\", function() { return ExpandableSection; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Heading */ \"../Heading\");\n/* harmony import */ var _Heading__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Heading__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ExpandableSection.module.css */ \"./ExpandableSection.module.css\");\n/* harmony import */ var _ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\nvar renderDefaultToggle = function renderDefaultToggle(isExpanded, label) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.defaultToggle\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.headingContainer\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Heading__WEBPACK_IMPORTED_MODULE_3__[\"Heading\"], {\n    size: \"fontStyleL\",\n    hasMargin: false\n  }, label)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: isExpanded ? _ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.arrowExpanded : _ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.arrowCollapsed\n  }));\n};\n\nvar ExpandableSection = function ExpandableSection(_ref) {\n  var _classNames;\n\n  var label = _ref.label,\n      renderToggle = _ref.renderToggle,\n      defaultExpanded = _ref.defaultExpanded,\n      className = _ref.className,\n      contentClassName = _ref.contentClassName,\n      children = _ref.children,\n      onExpand = _ref.onExpand,\n      disableAnimation = _ref.disableAnimation,\n      allowOverflow = _ref.allowOverflow;\n  var ACTIVE_TRANSITION = disableAnimation ? 'none' : \"height \".concat(_ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.duration, \" ease-in\");\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(defaultExpanded),\n      _useState2 = _slicedToArray(_useState, 2),\n      isExpanded = _useState2[0],\n      setIsExpanded = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(defaultExpanded ? null : 0),\n      _useState4 = _slicedToArray(_useState3, 2),\n      height = _useState4[0],\n      setHeight = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(ACTIVE_TRANSITION),\n      _useState6 = _slicedToArray(_useState5, 2),\n      transition = _useState6[0],\n      setTransition = _useState6[1];\n\n  var ref = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n\n  var handleClick = function handleClick(e) {\n    e.preventDefault();\n    var elementHeight = ref.current.scrollHeight;\n\n    if (isExpanded) {\n      setTransition('none');\n      window.requestAnimationFrame(function () {\n        setHeight(elementHeight);\n        setTransition(ACTIVE_TRANSITION);\n        window.requestAnimationFrame(function () {\n          setHeight(0);\n        });\n      });\n      setIsExpanded(false);\n    } else {\n      setHeight(elementHeight);\n      setIsExpanded(true);\n      onExpand();\n    }\n  };\n\n  var handleTransitionEnd = function handleTransitionEnd(e) {\n    if (e.target !== ref.current) {\n      return;\n    }\n\n    if (isExpanded) {\n      setHeight(null);\n    }\n  };\n\n  var isChildRenderFn = typeof children === 'function';\n  return (\n    /*#__PURE__*/\n    // eslint-disable-next-line jsx-a11y/role-supports-aria-props\n    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", {\n      className: className,\n      \"aria-expanded\": isExpanded\n    }, renderToggle ? renderToggle({\n      handleClick: handleClick,\n      isExpanded: isExpanded,\n      label: label\n    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.toggleContainer),\n      onClick: handleClick,\n      type: \"button\"\n    }, renderDefaultToggle(isExpanded, label)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.contentContainer, (_classNames = {}, _defineProperty(_classNames, _ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.isExpanded, isExpanded), _defineProperty(_classNames, _ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.allowOverflow, allowOverflow && isExpanded), _classNames)),\n      ref: ref,\n      onTransitionEnd: handleTransitionEnd,\n      style: {\n        transition: transition,\n        height: height,\n        visibility: isExpanded ? 'visible' : 'hidden'\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      \"data-testing\": \"children\",\n      className: contentClassName || _ExpandableSection_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.defaultContent\n    }, isChildRenderFn ? children({\n      collapseSection: handleClick,\n      isExpanded: isExpanded\n    }) : children)))\n  );\n};\nExpandableSection.propTypes = {\n  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  renderToggle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  defaultExpanded: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  contentClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func]),\n  onExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  disableAnimation: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  allowOverflow: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool\n};\nExpandableSection.defaultProps = {\n  label: '',\n  renderToggle: null,\n  defaultExpanded: false,\n  className: null,\n  contentClassName: null,\n  children: null,\n  onExpand: function onExpand() {},\n  disableAnimation: false,\n  allowOverflow: false\n};\n\n//# sourceURL=webpack:///./src/components/ExpandableSection/ExpandableSection.logic.js?");

/***/ }),

/***/ "./src/components/ExpandableSection/index.js":
/*!***************************************************!*\
  !*** ./src/components/ExpandableSection/index.js ***!
  \***************************************************/
/*! exports provided: ExpandableSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ExpandableSection_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExpandableSection.logic */ \"./src/components/ExpandableSection/ExpandableSection.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ExpandableSection\", function() { return _ExpandableSection_logic__WEBPACK_IMPORTED_MODULE_0__[\"ExpandableSection\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/ExpandableSection/index.js?");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_classnames__;\n\n//# sourceURL=webpack:///external_%22classnames%22?");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_prop_types__;\n\n//# sourceURL=webpack:///external_%22prop-types%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ })

/******/ });
});