(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./LayoutContentWrapper.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./LayoutContentWrapper.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./LayoutContentWrapper.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./LayoutContentWrapper.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__LayoutContentWrapper_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/LayoutContentWrapper/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./LayoutContentWrapper.module.css":
/*!****************************************************!*\
  !*** external "./LayoutContentWrapper.module.css" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__LayoutContentWrapper_module_css__;\n\n//# sourceURL=webpack:///external_%22./LayoutContentWrapper.module.css%22?");

/***/ }),

/***/ "./src/components/LayoutContentWrapper/LayoutContentWrapper.logic.js":
/*!***************************************************************************!*\
  !*** ./src/components/LayoutContentWrapper/LayoutContentWrapper.logic.js ***!
  \***************************************************************************/
/*! exports provided: LayoutContentWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LayoutContentWrapper\", function() { return LayoutContentWrapper; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _LayoutContentWrapper_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LayoutContentWrapper.module.css */ \"./LayoutContentWrapper.module.css\");\n/* harmony import */ var _LayoutContentWrapper_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_LayoutContentWrapper_module_css__WEBPACK_IMPORTED_MODULE_3__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,\n  paddingHorizontal: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  paddingVertical: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  paddingHorizontalSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['medium', 'large', 'large/xlarge']),\n  paddingVerticalSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['medium', 'large', 'large/xlarge'])\n};\nvar defaultProps = {\n  paddingHorizontal: true,\n  paddingVertical: true,\n  paddingHorizontalSize: 'medium',\n  paddingVerticalSize: 'medium'\n};\nvar propToClassName = {\n  medium: {\n    horizontal: 'mediumPaddingHorizontal',\n    vertical: 'mediumPaddingVertical'\n  },\n  large: {\n    horizontal: 'largePaddingHorizontal',\n    vertical: 'largePaddingVertical'\n  },\n  'large/xlarge': {\n    horizontal: 'largeOrXLargePaddingHorizontal',\n    vertical: 'largeOrXLargePaddingVertical'\n  }\n};\n\nvar getClassName = function getClassName(sizeProp, direction) {\n  return _LayoutContentWrapper_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[propToClassName[sizeProp][direction]];\n};\n\nvar LayoutContentWrapper = function LayoutContentWrapper(_ref) {\n  var _classnames;\n\n  var children = _ref.children,\n      paddingHorizontal = _ref.paddingHorizontal,\n      paddingVertical = _ref.paddingVertical,\n      paddingHorizontalSize = _ref.paddingHorizontalSize,\n      paddingVerticalSize = _ref.paddingVerticalSize;\n  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()((_classnames = {}, _defineProperty(_classnames, getClassName(paddingHorizontalSize, 'horizontal'), paddingHorizontal), _defineProperty(_classnames, getClassName(paddingVerticalSize, 'vertical'), paddingVertical), _classnames));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classes\n  }, children);\n};\n\nLayoutContentWrapper.propTypes = propTypes;\nLayoutContentWrapper.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/LayoutContentWrapper/LayoutContentWrapper.logic.js?");

/***/ }),

/***/ "./src/components/LayoutContentWrapper/index.js":
/*!******************************************************!*\
  !*** ./src/components/LayoutContentWrapper/index.js ***!
  \******************************************************/
/*! exports provided: LayoutContentWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _LayoutContentWrapper_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LayoutContentWrapper.logic */ \"./src/components/LayoutContentWrapper/LayoutContentWrapper.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"LayoutContentWrapper\", function() { return _LayoutContentWrapper_logic__WEBPACK_IMPORTED_MODULE_0__[\"LayoutContentWrapper\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/LayoutContentWrapper/index.js?");

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