(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./ProgressBar.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./ProgressBar.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./ProgressBar.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./ProgressBar.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__ProgressBar_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/ProgressBar/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ProgressBar.module.css":
/*!*******************************************!*\
  !*** external "./ProgressBar.module.css" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__ProgressBar_module_css__;\n\n//# sourceURL=webpack:///external_%22./ProgressBar.module.css%22?");

/***/ }),

/***/ "./src/components/ProgressBar/ProgressBar.logic.js":
/*!*********************************************************!*\
  !*** ./src/components/ProgressBar/ProgressBar.logic.js ***!
  \*********************************************************/
/*! exports provided: PROGRESS_BAR_THEME, ProgressBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PROGRESS_BAR_THEME\", function() { return PROGRESS_BAR_THEME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProgressBar\", function() { return ProgressBar; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ProgressBar_presentation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProgressBar.presentation */ \"./src/components/ProgressBar/ProgressBar.presentation.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\nvar PROGRESS_BAR_THEME = {\n  'transition-1': [75, 100]\n};\nvar defaultProps = {\n  a11yDescription: 'Progress bar',\n  theme: 'solid'\n};\nvar propTypes = {\n  a11yDescription: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  percentage: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired,\n  theme: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf([defaultProps.theme].concat(_toConsumableArray(Object.keys(PROGRESS_BAR_THEME))))\n};\n\nvar sanitisePercentage = function sanitisePercentage(percentage) {\n  if (percentage < 0) {\n    return 0;\n  } else if (percentage > 100) {\n    return 100;\n  }\n\n  return percentage;\n};\n\nvar setThemeClasses = function setThemeClasses(theme, percentage) {\n  var classes = [theme];\n\n  if (PROGRESS_BAR_THEME[theme]) {\n    PROGRESS_BAR_THEME[theme].forEach(function (stop, index) {\n      if (stop <= percentage) {\n        classes.push(\"\".concat(theme, \"-stop-\").concat(index));\n      }\n    });\n  }\n\n  return classes;\n};\n\nvar ProgressBar = function ProgressBar(_ref) {\n  var a11yDescription = _ref.a11yDescription,\n      percentage = _ref.percentage,\n      theme = _ref.theme;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ProgressBar_presentation__WEBPACK_IMPORTED_MODULE_2__[\"ProgressBarPresentation\"], {\n    a11yDescription: a11yDescription,\n    percentage: sanitisePercentage(percentage),\n    themeClasses: setThemeClasses(theme, percentage)\n  });\n};\n\nProgressBar.propTypes = propTypes;\nProgressBar.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/ProgressBar/ProgressBar.logic.js?");

/***/ }),

/***/ "./src/components/ProgressBar/ProgressBar.presentation.js":
/*!****************************************************************!*\
  !*** ./src/components/ProgressBar/ProgressBar.presentation.js ***!
  \****************************************************************/
/*! exports provided: ProgressBarPresentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProgressBarPresentation\", function() { return ProgressBarPresentation; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _ProgressBar_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProgressBar.module.css */ \"./ProgressBar.module.css\");\n/* harmony import */ var _ProgressBar_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ProgressBar_module_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nvar propTypes = {\n  a11yDescription: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,\n  percentage: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,\n  themeClasses: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string).isRequired\n};\n\nvar ProgressBarPresentation = function ProgressBarPresentation(_ref) {\n  var a11yDescription = _ref.a11yDescription,\n      percentage = _ref.percentage,\n      themeClasses = _ref.themeClasses;\n  var CSSThemeClasses = themeClasses.map(function (color) {\n    return _ProgressBar_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[color];\n  });\n  var classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()(_ProgressBar_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.progressBar, CSSThemeClasses);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _ProgressBar_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.container,\n    role: \"progressbar\",\n    \"aria-valuenow\": percentage,\n    \"aria-valuemin\": \"0\",\n    \"aria-valuemax\": \"100\",\n    \"aria-valuetext\": a11yDescription\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classes,\n    style: {\n      width: \"\".concat(percentage, \"%\")\n    }\n  }));\n};\n\nProgressBarPresentation.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/ProgressBar/ProgressBar.presentation.js?");

/***/ }),

/***/ "./src/components/ProgressBar/index.js":
/*!*********************************************!*\
  !*** ./src/components/ProgressBar/index.js ***!
  \*********************************************/
/*! exports provided: ProgressBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ProgressBar_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProgressBar.logic */ \"./src/components/ProgressBar/ProgressBar.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ProgressBar\", function() { return _ProgressBar_logic__WEBPACK_IMPORTED_MODULE_0__[\"ProgressBar\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/ProgressBar/index.js?");

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