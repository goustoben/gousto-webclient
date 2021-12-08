(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Loader"), require("./CTA.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Loader", "./CTA.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Loader"), require("./CTA.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./Loader"], root["./CTA.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Loader__, __WEBPACK_EXTERNAL_MODULE__CTA_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/CTA/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../Loader":
/*!***************************!*\
  !*** external "./Loader" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Loader__;\n\n//# sourceURL=webpack:///external_%22./Loader%22?");

/***/ }),

/***/ "./CTA.module.css":
/*!***********************************!*\
  !*** external "./CTA.module.css" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__CTA_module_css__;\n\n//# sourceURL=webpack:///external_%22./CTA.module.css%22?");

/***/ }),

/***/ "./src/components/CTA/CTA.logic.js":
/*!*****************************************!*\
  !*** ./src/components/CTA/CTA.logic.js ***!
  \*****************************************/
/*! exports provided: CTA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CTA\", function() { return CTA; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Loader */ \"../Loader\");\n/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Loader__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _CTA_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CTA.module.css */ \"./CTA.module.css\");\n/* harmony import */ var _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_CTA_module_css__WEBPACK_IMPORTED_MODULE_4__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\nvar renderContent = function renderContent(children) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.content\n  }, children);\n};\n\nvar CTA = function CTA(_ref) {\n  var _classnames;\n\n  var children = _ref.children,\n      extraInfo = _ref.extraInfo,\n      isDarkTheme = _ref.isDarkTheme,\n      isDisabled = _ref.isDisabled,\n      isFullWidth = _ref.isFullWidth,\n      isLoading = _ref.isLoading,\n      onClick = _ref.onClick,\n      size = _ref.size,\n      testingSelector = _ref.testingSelector,\n      variant = _ref.variant;\n  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()(_CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.cta, _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a[size], (_classnames = {}, _defineProperty(_classnames, _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a[variant], variant !== 'primary'), _defineProperty(_classnames, _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.isDarkTheme, isDarkTheme), _defineProperty(_classnames, _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.isDisabled, isDisabled), _defineProperty(_classnames, _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.isFullWidth, isFullWidth === true), _defineProperty(_classnames, _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.isFullWidthForSmallScreens, isFullWidth === 'small-screens-only'), _defineProperty(_classnames, _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.isLoading, isLoading), _classnames));\n  var loaderColour = variant === 'primary' ? 'White' : 'Bluecheese';\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    className: classes,\n    \"data-testing\": testingSelector,\n    disabled: isDisabled || isLoading,\n    onClick: onClick,\n    type: \"button\"\n  }, extraInfo ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.contentWrap\n  }, renderContent(children, isLoading), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.extraInfo\n  }, extraInfo)) : renderContent(children, isLoading), isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _CTA_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.loaderWrap\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Loader__WEBPACK_IMPORTED_MODULE_3__[\"Loader\"], {\n    color: loaderColour\n  })));\n};\n\nCTA.propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,\n  extraInfo: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  isDarkTheme: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  isDisabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  isFullWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['small-screens-only'])]),\n  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['small', 'medium']),\n  testingSelector: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  variant: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['primary', 'secondary'])\n};\nCTA.defaultProps = {\n  extraInfo: null,\n  isDarkTheme: false,\n  isDisabled: false,\n  isFullWidth: false,\n  isLoading: false,\n  size: 'medium',\n  testingSelector: null,\n  variant: 'primary'\n};\n\n\n//# sourceURL=webpack:///./src/components/CTA/CTA.logic.js?");

/***/ }),

/***/ "./src/components/CTA/index.js":
/*!*************************************!*\
  !*** ./src/components/CTA/index.js ***!
  \*************************************/
/*! exports provided: CTA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CTA_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CTA.logic */ \"./src/components/CTA/CTA.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CTA\", function() { return _CTA_logic__WEBPACK_IMPORTED_MODULE_0__[\"CTA\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/CTA/index.js?");

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