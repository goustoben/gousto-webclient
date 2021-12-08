(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./LayoutContentWrapper"), require("./Card.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./LayoutContentWrapper", "./Card.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./LayoutContentWrapper"), require("./Card.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./LayoutContentWrapper"], root["./Card.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__LayoutContentWrapper__, __WEBPACK_EXTERNAL_MODULE__Card_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Card/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../LayoutContentWrapper":
/*!*****************************************!*\
  !*** external "./LayoutContentWrapper" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__LayoutContentWrapper__;\n\n//# sourceURL=webpack:///external_%22./LayoutContentWrapper%22?");

/***/ }),

/***/ "./Card.module.css":
/*!************************************!*\
  !*** external "./Card.module.css" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Card_module_css__;\n\n//# sourceURL=webpack:///external_%22./Card.module.css%22?");

/***/ }),

/***/ "./src/components/Card/Card.logic.js":
/*!*******************************************!*\
  !*** ./src/components/Card/Card.logic.js ***!
  \*******************************************/
/*! exports provided: Card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Card\", function() { return Card; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _LayoutContentWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../LayoutContentWrapper */ \"../LayoutContentWrapper\");\n/* harmony import */ var _LayoutContentWrapper__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_LayoutContentWrapper__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Card_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Card.module.css */ \"./Card.module.css\");\n/* harmony import */ var _Card_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Card_module_css__WEBPACK_IMPORTED_MODULE_4__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\nvar Card = function Card(_ref) {\n  var _classnames;\n\n  var children = _ref.children,\n      className = _ref.className,\n      hasLateralBordersOnSmallScreens = _ref.hasLateralBordersOnSmallScreens,\n      hasPaddingVertical = _ref.hasPaddingVertical,\n      isVisibleOnSmallScreens = _ref.isVisibleOnSmallScreens,\n      paddingSize = _ref.paddingSize;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Card_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.card, className, (_classnames = {}, _defineProperty(_classnames, _Card_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.visibleOnSmallScreens, isVisibleOnSmallScreens), _defineProperty(_classnames, _Card_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.lateralBordersOnSmallScreens, hasLateralBordersOnSmallScreens), _classnames))\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LayoutContentWrapper__WEBPACK_IMPORTED_MODULE_3__[\"LayoutContentWrapper\"], {\n    paddingHorizontalSize: paddingSize,\n    paddingVerticalSize: paddingSize,\n    paddingVertical: hasPaddingVertical\n  }, children));\n};\n\nCard.propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,\n  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  hasLateralBordersOnSmallScreens: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  hasPaddingVertical: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  isVisibleOnSmallScreens: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  paddingSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['large', 'large/xlarge'])\n};\nCard.defaultProps = {\n  className: null,\n  hasLateralBordersOnSmallScreens: true,\n  hasPaddingVertical: true,\n  isVisibleOnSmallScreens: true,\n  paddingSize: 'large'\n};\n\n\n//# sourceURL=webpack:///./src/components/Card/Card.logic.js?");

/***/ }),

/***/ "./src/components/Card/index.js":
/*!**************************************!*\
  !*** ./src/components/Card/index.js ***!
  \**************************************/
/*! exports provided: Card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Card_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Card.logic */ \"./src/components/Card/Card.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Card\", function() { return _Card_logic__WEBPACK_IMPORTED_MODULE_0__[\"Card\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Card/index.js?");

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