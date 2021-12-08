(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./CTATilesItem.module.css"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./CTATilesItem.module.css", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./CTATilesItem.module.css"), require("prop-types"), require("react")) : factory(root["./CTATilesItem.module.css"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__CTATilesItem_module_css__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/CTATilesItem/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./CTATilesItem.module.css":
/*!********************************************!*\
  !*** external "./CTATilesItem.module.css" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__CTATilesItem_module_css__;\n\n//# sourceURL=webpack:///external_%22./CTATilesItem.module.css%22?");

/***/ }),

/***/ "./src/components/CTATilesItem/CTATilesItem.logic.js":
/*!***********************************************************!*\
  !*** ./src/components/CTATilesItem/CTATilesItem.logic.js ***!
  \***********************************************************/
/*! exports provided: CTATilesItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CTATilesItem\", function() { return CTATilesItem; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _CTATilesItem_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CTATilesItem.module.css */ \"./CTATilesItem.module.css\");\n/* harmony import */ var _CTATilesItem_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_CTATilesItem_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,\n  image: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  target: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['_blank', '_self', '_parent', '_top']),\n  testingSelector: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  url: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired\n};\nvar defaultProps = {\n  image: null,\n  onClick: function onClick() {},\n  target: null,\n  testingSelector: null\n};\n\nvar onClickHandler = function onClickHandler(event, onClick, url) {\n  event.preventDefault();\n  onClick();\n  window.location.assign(url);\n};\n\nvar CTATilesItem = function CTATilesItem(_ref) {\n  var children = _ref.children,\n      image = _ref.image,\n      _onClick = _ref.onClick,\n      target = _ref.target,\n      testingSelector = _ref.testingSelector,\n      url = _ref.url;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    className: _CTATilesItem_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.wrapper,\n    \"data-testing\": testingSelector,\n    href: url,\n    onClick: function onClick(event) {\n      return onClickHandler(event, _onClick, url);\n    },\n    target: target\n  }, image && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    className: _CTATilesItem_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.image,\n    src: image,\n    alt: \"\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, children));\n};\n\nCTATilesItem.propTypes = propTypes;\nCTATilesItem.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/CTATilesItem/CTATilesItem.logic.js?");

/***/ }),

/***/ "./src/components/CTATilesItem/index.js":
/*!**********************************************!*\
  !*** ./src/components/CTATilesItem/index.js ***!
  \**********************************************/
/*! exports provided: CTATilesItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CTATilesItem_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CTATilesItem.logic */ \"./src/components/CTATilesItem/CTATilesItem.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CTATilesItem\", function() { return _CTATilesItem_logic__WEBPACK_IMPORTED_MODULE_0__[\"CTATilesItem\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/CTATilesItem/index.js?");

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