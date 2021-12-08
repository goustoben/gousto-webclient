(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Column.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Column.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Column.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./Column.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Column_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Column/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Column.module.css":
/*!**************************************!*\
  !*** external "./Column.module.css" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Column_module_css__;\n\n//# sourceURL=webpack:///external_%22./Column.module.css%22?");

/***/ }),

/***/ "./src/components/Column/Column.logic.js":
/*!***********************************************!*\
  !*** ./src/components/Column/Column.logic.js ***!
  \***********************************************/
/*! exports provided: columnSizes, Column */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"columnSizes\", function() { return columnSizes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Column\", function() { return Column; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Column_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Column.module.css */ \"./Column.module.css\");\n/* harmony import */ var _Column_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Column_module_css__WEBPACK_IMPORTED_MODULE_3__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nvar columnSizes = [1, 2, 3, 4, 6, 12];\n\nvar Column = function Column(_ref) {\n  var _classnames;\n\n  var children = _ref.children,\n      hasPaddingSmallScreen = _ref.hasPaddingSmallScreen,\n      hasPaddingMediumScreen = _ref.hasPaddingMediumScreen,\n      hasPaddingLargeScreen = _ref.hasPaddingLargeScreen,\n      smallScreen = _ref.smallScreen,\n      mediumScreen = _ref.mediumScreen,\n      largeScreen = _ref.largeScreen,\n      extraClass = _ref.extraClass;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Column_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.column, _Column_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[\"colSmall\".concat(smallScreen)], (_classnames = {}, _defineProperty(_classnames, _Column_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.paddingSmallScreen, hasPaddingSmallScreen), _defineProperty(_classnames, _Column_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.paddingMediumScreen, hasPaddingMediumScreen), _defineProperty(_classnames, _Column_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.paddingLargeScreen, hasPaddingLargeScreen), _defineProperty(_classnames, _Column_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[\"colMedium\".concat(mediumScreen)], Boolean(mediumScreen)), _defineProperty(_classnames, _Column_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[\"colLarge\".concat(largeScreen)], Boolean(largeScreen)), _classnames), extraClass)\n  }, children);\n};\n\nColumn.propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,\n  smallScreen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(columnSizes).isRequired,\n  mediumScreen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(columnSizes),\n  largeScreen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(columnSizes),\n  extraClass: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  hasPaddingSmallScreen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  hasPaddingMediumScreen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  hasPaddingLargeScreen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool\n};\nColumn.defaultProps = {\n  mediumScreen: null,\n  largeScreen: null,\n  extraClass: null,\n  hasPaddingSmallScreen: true,\n  hasPaddingMediumScreen: true,\n  hasPaddingLargeScreen: true\n};\n\n\n//# sourceURL=webpack:///./src/components/Column/Column.logic.js?");

/***/ }),

/***/ "./src/components/Column/index.js":
/*!****************************************!*\
  !*** ./src/components/Column/index.js ***!
  \****************************************/
/*! exports provided: Column, columnSizes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Column_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Column.logic */ \"./src/components/Column/Column.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Column\", function() { return _Column_logic__WEBPACK_IMPORTED_MODULE_0__[\"Column\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"columnSizes\", function() { return _Column_logic__WEBPACK_IMPORTED_MODULE_0__[\"columnSizes\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Column/index.js?");

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