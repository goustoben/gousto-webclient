(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./NarrowCard.module.css"), require("./NarrowCardContent.module.css"), require("./NarrowCardTitle.module.css"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./NarrowCard.module.css", "./NarrowCardContent.module.css", "./NarrowCardTitle.module.css", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./NarrowCard.module.css"), require("./NarrowCardContent.module.css"), require("./NarrowCardTitle.module.css"), require("prop-types"), require("react")) : factory(root["./NarrowCard.module.css"], root["./NarrowCardContent.module.css"], root["./NarrowCardTitle.module.css"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__NarrowCard_module_css__, __WEBPACK_EXTERNAL_MODULE__NarrowCardContent_module_css__, __WEBPACK_EXTERNAL_MODULE__NarrowCardTitle_module_css__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/NarrowCard/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./NarrowCard.module.css":
/*!******************************************!*\
  !*** external "./NarrowCard.module.css" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__NarrowCard_module_css__;\n\n//# sourceURL=webpack:///external_%22./NarrowCard.module.css%22?");

/***/ }),

/***/ "./NarrowCardContent.module.css":
/*!*************************************************!*\
  !*** external "./NarrowCardContent.module.css" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__NarrowCardContent_module_css__;\n\n//# sourceURL=webpack:///external_%22./NarrowCardContent.module.css%22?");

/***/ }),

/***/ "./NarrowCardTitle.module.css":
/*!***********************************************!*\
  !*** external "./NarrowCardTitle.module.css" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__NarrowCardTitle_module_css__;\n\n//# sourceURL=webpack:///external_%22./NarrowCardTitle.module.css%22?");

/***/ }),

/***/ "./src/components/NarrowCard/NarrowCard.logic.js":
/*!*******************************************************!*\
  !*** ./src/components/NarrowCard/NarrowCard.logic.js ***!
  \*******************************************************/
/*! exports provided: NarrowCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NarrowCard\", function() { return NarrowCard; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _NarrowCard_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NarrowCard.module.css */ \"./NarrowCard.module.css\");\n/* harmony import */ var _NarrowCard_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_NarrowCard_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired\n};\n\nvar NarrowCard = function NarrowCard(_ref) {\n  var children = _ref.children;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _NarrowCard_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.card\n  }, children);\n};\n\nNarrowCard.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/NarrowCard/NarrowCard.logic.js?");

/***/ }),

/***/ "./src/components/NarrowCard/NarrowCardContent/NarrowCardContent.logic.js":
/*!********************************************************************************!*\
  !*** ./src/components/NarrowCard/NarrowCardContent/NarrowCardContent.logic.js ***!
  \********************************************************************************/
/*! exports provided: NarrowCardContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NarrowCardContent\", function() { return NarrowCardContent; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _NarrowCardContent_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NarrowCardContent.module.css */ \"./NarrowCardContent.module.css\");\n/* harmony import */ var _NarrowCardContent_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_NarrowCardContent_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired\n};\n\nvar NarrowCardContent = function NarrowCardContent(_ref) {\n  var children = _ref.children;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _NarrowCardContent_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.content\n  }, children);\n};\n\nNarrowCardContent.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/NarrowCard/NarrowCardContent/NarrowCardContent.logic.js?");

/***/ }),

/***/ "./src/components/NarrowCard/NarrowCardContent/index.js":
/*!**************************************************************!*\
  !*** ./src/components/NarrowCard/NarrowCardContent/index.js ***!
  \**************************************************************/
/*! exports provided: NarrowCardContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NarrowCardContent_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NarrowCardContent.logic */ \"./src/components/NarrowCard/NarrowCardContent/NarrowCardContent.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"NarrowCardContent\", function() { return _NarrowCardContent_logic__WEBPACK_IMPORTED_MODULE_0__[\"NarrowCardContent\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/NarrowCard/NarrowCardContent/index.js?");

/***/ }),

/***/ "./src/components/NarrowCard/NarrowCardTitle/NarrowCardTitle.logic.js":
/*!****************************************************************************!*\
  !*** ./src/components/NarrowCard/NarrowCardTitle/NarrowCardTitle.logic.js ***!
  \****************************************************************************/
/*! exports provided: NarrowCardTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NarrowCardTitle\", function() { return NarrowCardTitle; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _NarrowCardTitle_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NarrowCardTitle.module.css */ \"./NarrowCardTitle.module.css\");\n/* harmony import */ var _NarrowCardTitle_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_NarrowCardTitle_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar propTypes = {\n  imageSrc: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired\n};\nvar defaultProps = {\n  imageSrc: null\n};\n\nvar NarrowCardTitle = function NarrowCardTitle(_ref) {\n  var imageSrc = _ref.imageSrc,\n      children = _ref.children;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _NarrowCardTitle_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.title\n  }, imageSrc && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    className: _NarrowCardTitle_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.image,\n    alt: \"\",\n    src: imageSrc\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _NarrowCardTitle_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.titleText\n  }, children));\n};\n\nNarrowCardTitle.propTypes = propTypes;\nNarrowCardTitle.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/NarrowCard/NarrowCardTitle/NarrowCardTitle.logic.js?");

/***/ }),

/***/ "./src/components/NarrowCard/NarrowCardTitle/index.js":
/*!************************************************************!*\
  !*** ./src/components/NarrowCard/NarrowCardTitle/index.js ***!
  \************************************************************/
/*! exports provided: NarrowCardTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NarrowCardTitle_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NarrowCardTitle.logic */ \"./src/components/NarrowCard/NarrowCardTitle/NarrowCardTitle.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"NarrowCardTitle\", function() { return _NarrowCardTitle_logic__WEBPACK_IMPORTED_MODULE_0__[\"NarrowCardTitle\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/NarrowCard/NarrowCardTitle/index.js?");

/***/ }),

/***/ "./src/components/NarrowCard/index.js":
/*!********************************************!*\
  !*** ./src/components/NarrowCard/index.js ***!
  \********************************************/
/*! exports provided: NarrowCard, NarrowCardTitle, NarrowCardContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NarrowCard_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NarrowCard.logic */ \"./src/components/NarrowCard/NarrowCard.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"NarrowCard\", function() { return _NarrowCard_logic__WEBPACK_IMPORTED_MODULE_0__[\"NarrowCard\"]; });\n\n/* harmony import */ var _NarrowCardTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NarrowCardTitle */ \"./src/components/NarrowCard/NarrowCardTitle/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"NarrowCardTitle\", function() { return _NarrowCardTitle__WEBPACK_IMPORTED_MODULE_1__[\"NarrowCardTitle\"]; });\n\n/* harmony import */ var _NarrowCardContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NarrowCardContent */ \"./src/components/NarrowCard/NarrowCardContent/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"NarrowCardContent\", function() { return _NarrowCardContent__WEBPACK_IMPORTED_MODULE_2__[\"NarrowCardContent\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/components/NarrowCard/index.js?");

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