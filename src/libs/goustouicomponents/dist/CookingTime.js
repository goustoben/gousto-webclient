(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./MetaInfo"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./MetaInfo", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./MetaInfo"), require("prop-types"), require("react")) : factory(root["./MetaInfo"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__MetaInfo__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/CookingTime/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../MetaInfo":
/*!*****************************!*\
  !*** external "./MetaInfo" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__MetaInfo__;\n\n//# sourceURL=webpack:///external_%22./MetaInfo%22?");

/***/ }),

/***/ "./src/components/CookingTime/CookingTime.logic.js":
/*!*********************************************************!*\
  !*** ./src/components/CookingTime/CookingTime.logic.js ***!
  \*********************************************************/
/*! exports provided: CookingTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CookingTime\", function() { return CookingTime; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _MetaInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MetaInfo */ \"../MetaInfo\");\n/* harmony import */ var _MetaInfo__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_MetaInfo__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _design_language_icons_icon_clock_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../design-language/icons/icon-clock.svg */ \"./src/design-language/icons/icon-clock.svg\");\n\n\n\n\n\nvar CookingTime = function CookingTime(_ref) {\n  var cookingTime = _ref.cookingTime;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MetaInfo__WEBPACK_IMPORTED_MODULE_2__[\"MetaInfo\"], {\n    label: \"\".concat(cookingTime, \" mins\")\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design_language_icons_icon_clock_svg__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    alt: \"clock\"\n  }));\n};\n\nCookingTime.propTypes = {\n  cookingTime: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired\n};\n\n\n//# sourceURL=webpack:///./src/components/CookingTime/CookingTime.logic.js?");

/***/ }),

/***/ "./src/components/CookingTime/index.js":
/*!*********************************************!*\
  !*** ./src/components/CookingTime/index.js ***!
  \*********************************************/
/*! exports provided: CookingTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CookingTime_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CookingTime.logic */ \"./src/components/CookingTime/CookingTime.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CookingTime\", function() { return _CookingTime_logic__WEBPACK_IMPORTED_MODULE_0__[\"CookingTime\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/CookingTime/index.js?");

/***/ }),

/***/ "./src/design-language/icons/icon-clock.svg":
/*!**************************************************!*\
  !*** ./src/design-language/icons/icon-clock.svg ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _path;\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\nfunction SvgIconClock(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"svg\", _extends({\n    width: 16,\n    height: 16,\n    fill: \"none\",\n    xmlns: \"http://www.w3.org/2000/svg\"\n  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"path\", {\n    fillRule: \"evenodd\",\n    clipRule: \"evenodd\",\n    d: \"M7.98 15.96C3.591 15.96 0 12.369 0 7.98S3.591 0 7.98 0s7.98 3.591 7.98 7.98-3.591 7.98-7.98 7.98zm.053-14.464c-3.615 0-6.527 2.893-6.527 6.484s2.912 6.484 6.527 6.484S14.56 11.57 14.56 7.98s-2.912-6.484-6.527-6.484zm3.012 7.481H7.782a.77.77 0 01-.754-.748V3.741a.77.77 0 01.754-.749.77.77 0 01.753.749v3.74h2.51c.402 0 .753.35.753.748s-.351.748-.753.748z\",\n    fill: \"#596067\"\n  })));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SvgIconClock);\n\n//# sourceURL=webpack:///./src/design-language/icons/icon-clock.svg?");

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