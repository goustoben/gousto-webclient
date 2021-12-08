(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Segment.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Segment.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Segment.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./Segment.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Segment_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Segment/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Segment.module.css":
/*!***************************************!*\
  !*** external "./Segment.module.css" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Segment_module_css__;\n\n//# sourceURL=webpack:///external_%22./Segment.module.css%22?");

/***/ }),

/***/ "./src/components/Segment/Segment.logic.js":
/*!*************************************************!*\
  !*** ./src/components/Segment/Segment.logic.js ***!
  \*************************************************/
/*! exports provided: Segment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Segment\", function() { return Segment; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Segment_presentation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Segment.presentation */ \"./src/components/Segment/Segment.presentation.js\");\n/* harmony import */ var _Segment_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Segment.module.css */ \"./Segment.module.css\");\n/* harmony import */ var _Segment_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Segment_module_css__WEBPACK_IMPORTED_MODULE_4__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element]).isRequired,\n  color: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['primary', 'secondary', 'tertiary', 'quaternary', 'negative']),\n  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  fill: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  noHover: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  hover: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  disabledClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  btnDisabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['auto', 'full']),\n  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  spinner: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  noDecoration: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  'data-testing': prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string\n};\nvar defaultProps = {\n  color: 'primary',\n  className: '',\n  'data-testing': null,\n  disabled: false,\n  btnDisabled: false,\n  fill: true,\n  width: 'auto',\n  hover: function hover() {},\n  onClick: undefined,\n  disabledClick: undefined,\n  size: '',\n  spinner: false,\n  noDecoration: false,\n  noHover: false\n};\n\nvar Segment = function Segment(_ref) {\n  var _classnames;\n\n  var children = _ref.children,\n      color = _ref.color,\n      className = _ref.className,\n      fill = _ref.fill,\n      noHover = _ref.noHover,\n      onClick = _ref.onClick,\n      hover = _ref.hover,\n      disabledClick = _ref.disabledClick,\n      disabled = _ref.disabled,\n      btnDisabled = _ref.btnDisabled,\n      width = _ref.width,\n      size = _ref.size,\n      spinner = _ref.spinner,\n      noDecoration = _ref.noDecoration,\n      dataTesting = _ref['data-testing'];\n\n  var handleClick = function handleClick(e) {\n    if (!btnDisabled && !disabled && onClick) {\n      onClick(e);\n    } else if (disabledClick) {\n      disabledClick(e);\n    }\n  };\n\n  var handleKeyUp = function handleKeyUp(e) {\n    if (e.keyCode && (e.keyCode === 13 || e.keyCode === 32)) {\n      handleClick(e);\n    }\n  };\n\n  var isDisabled = btnDisabled || disabled;\n  var accessibility = spinner ? {} : {\n    tabIndex: '0',\n    role: 'button'\n  };\n  var composedClass = classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, _Segment_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.base, _Segment_module_css__WEBPACK_IMPORTED_MODULE_4___default.a[color], _Segment_module_css__WEBPACK_IMPORTED_MODULE_4___default.a[fill ? 'fill' : 'noFill'], (_classnames = {\n    disabled: !onClick || isDisabled\n  }, _defineProperty(_classnames, _Segment_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.noHover, !onClick || isDisabled || noHover), _defineProperty(_classnames, _Segment_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.autoWidthPadding, width === 'auto'), _defineProperty(_classnames, _Segment_module_css__WEBPACK_IMPORTED_MODULE_4___default.a[size], size), _defineProperty(_classnames, _Segment_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.disabled, isDisabled), _defineProperty(_classnames, _Segment_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.noDecor, noDecoration), _classnames));\n  var onMouseEnter = isDisabled ? hover : function () {};\n  var onMouseLeave = isDisabled ? hover : function () {};\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Segment_presentation__WEBPACK_IMPORTED_MODULE_3__[\"SegmentPresentation\"], {\n    onClick: function onClick() {\n      return handleClick;\n    },\n    onKeyUp: function onKeyUp() {\n      return handleKeyUp;\n    },\n    onMouseEnter: onMouseEnter,\n    onMouseLeave: onMouseLeave,\n    className: composedClass,\n    \"data-testing\": dataTesting,\n    accessibility: accessibility\n  }, children);\n};\n\nSegment.propTypes = propTypes;\nSegment.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/Segment/Segment.logic.js?");

/***/ }),

/***/ "./src/components/Segment/Segment.presentation.js":
/*!********************************************************!*\
  !*** ./src/components/Segment/Segment.presentation.js ***!
  \********************************************************/
/*! exports provided: SegmentPresentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SegmentPresentation\", function() { return SegmentPresentation; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element]).isRequired,\n  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  onKeyUp: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  onMouseEnter: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  onMouseLeave: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  accessibility: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape().isRequired,\n  'data-testing': prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string\n};\nvar defaultProps = {\n  'data-testing': null\n};\n\nvar SegmentPresentation = function SegmentPresentation(_ref) {\n  var children = _ref.children,\n      onClick = _ref.onClick,\n      onKeyUp = _ref.onKeyUp,\n      onMouseEnter = _ref.onMouseEnter,\n      onMouseLeave = _ref.onMouseLeave,\n      className = _ref.className,\n      dataTesting = _ref['data-testing'],\n      accessibility = _ref.accessibility;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", _extends({\n    onClick: onClick(),\n    onKeyUp: onKeyUp(),\n    onMouseEnter: onMouseEnter,\n    onMouseLeave: onMouseLeave,\n    role: \"button\",\n    tabIndex: 0,\n    className: className,\n    \"data-testing\": dataTesting\n  }, accessibility), children);\n};\n\nSegmentPresentation.propTypes = propTypes;\nSegmentPresentation.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/Segment/Segment.presentation.js?");

/***/ }),

/***/ "./src/components/Segment/index.js":
/*!*****************************************!*\
  !*** ./src/components/Segment/index.js ***!
  \*****************************************/
/*! exports provided: Segment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Segment_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Segment.logic */ \"./src/components/Segment/Segment.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Segment\", function() { return _Segment_logic__WEBPACK_IMPORTED_MODULE_0__[\"Segment\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Segment/index.js?");

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