(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./CTABack.module.css"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./CTABack.module.css", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./CTABack.module.css"), require("prop-types"), require("react")) : factory(root["./CTABack.module.css"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__CTABack_module_css__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/CTABack/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./CTABack.module.css":
/*!***************************************!*\
  !*** external "./CTABack.module.css" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__CTABack_module_css__;\n\n//# sourceURL=webpack:///external_%22./CTABack.module.css%22?");

/***/ }),

/***/ "./src/components/CTABack/CTABack.logic.js":
/*!*************************************************!*\
  !*** ./src/components/CTABack/CTABack.logic.js ***!
  \*************************************************/
/*! exports provided: CTABack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CTABack\", function() { return CTABack; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _design_language_icons_Back_Arrow_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../design-language/icons/Back-Arrow.svg */ \"./src/design-language/icons/Back-Arrow.svg\");\n/* harmony import */ var _CTABack_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CTABack.module.css */ \"./CTABack.module.css\");\n/* harmony import */ var _CTABack_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_CTABack_module_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nvar onClickHandler = function onClickHandler(url) {\n  if (!url) {\n    window.history.back();\n  }\n\n  return false;\n};\n\nvar CTABack = function CTABack(_ref) {\n  var label = _ref.label,\n      testingSelector = _ref.testingSelector,\n      url = _ref.url;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    \"data-testing\": testingSelector,\n    href: url,\n    className: _CTABack_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.link,\n    onClick: function onClick() {\n      return onClickHandler(url);\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design_language_icons_Back_Arrow_svg__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    alt: \"back arrow\",\n    className: _CTABack_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.icon\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _CTABack_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.label\n  }, label));\n};\n\nCTABack.propTypes = {\n  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  testingSelector: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  url: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string\n};\nCTABack.defaultProps = {\n  label: 'Back',\n  testingSelector: null,\n  url: null\n};\n\n\n//# sourceURL=webpack:///./src/components/CTABack/CTABack.logic.js?");

/***/ }),

/***/ "./src/components/CTABack/index.js":
/*!*****************************************!*\
  !*** ./src/components/CTABack/index.js ***!
  \*****************************************/
/*! exports provided: CTABack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CTABack_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CTABack.logic */ \"./src/components/CTABack/CTABack.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CTABack\", function() { return _CTABack_logic__WEBPACK_IMPORTED_MODULE_0__[\"CTABack\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/CTABack/index.js?");

/***/ }),

/***/ "./src/design-language/icons/Back-Arrow.svg":
/*!**************************************************!*\
  !*** ./src/design-language/icons/Back-Arrow.svg ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _path;\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\nfunction SvgBackArrow(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"svg\", _extends({\n    width: 24,\n    height: 24,\n    fill: \"none\",\n    xmlns: \"http://www.w3.org/2000/svg\"\n  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"path\", {\n    d: \"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\",\n    fill: \"#333D47\"\n  })));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SvgBackArrow);\n\n//# sourceURL=webpack:///./src/design-language/icons/Back-Arrow.svg?");

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