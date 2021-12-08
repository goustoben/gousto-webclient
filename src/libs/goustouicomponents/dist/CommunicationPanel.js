(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./CommunicationPanel.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./CommunicationPanel.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./CommunicationPanel.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./CommunicationPanel.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__CommunicationPanel_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/CommunicationPanel/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./CommunicationPanel.module.css":
/*!**************************************************!*\
  !*** external "./CommunicationPanel.module.css" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__CommunicationPanel_module_css__;\n\n//# sourceURL=webpack:///external_%22./CommunicationPanel.module.css%22?");

/***/ }),

/***/ "./src/components/CommunicationPanel/CommunicationPanel.logic.js":
/*!***********************************************************************!*\
  !*** ./src/components/CommunicationPanel/CommunicationPanel.logic.js ***!
  \***********************************************************************/
/*! exports provided: CommunicationPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CommunicationPanel\", function() { return CommunicationPanel; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _CommunicationPanel_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CommunicationPanel.module.css */ \"./CommunicationPanel.module.css\");\n/* harmony import */ var _CommunicationPanel_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_CommunicationPanel_module_css__WEBPACK_IMPORTED_MODULE_3__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nvar propTypes = {\n  showIcon: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  level: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['info']).isRequired,\n  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  body: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired\n};\nvar defaultProps = {\n  showIcon: false,\n  title: ''\n};\n\nvar CommunicationPanel = function CommunicationPanel(_ref) {\n  var showIcon = _ref.showIcon,\n      level = _ref.level,\n      title = _ref.title,\n      body = _ref.body;\n  var panelWrapperCss = classnames__WEBPACK_IMPORTED_MODULE_2___default()(_CommunicationPanel_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[level], _defineProperty({}, _CommunicationPanel_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.showIcon, showIcon));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: panelWrapperCss\n  }, showIcon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _CommunicationPanel_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[\"icon-\".concat(level)]\n  }), title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n    className: _CommunicationPanel_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.panelTitle\n  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _CommunicationPanel_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.panelBody\n  }, body));\n};\n\nCommunicationPanel.propTypes = propTypes;\nCommunicationPanel.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/CommunicationPanel/CommunicationPanel.logic.js?");

/***/ }),

/***/ "./src/components/CommunicationPanel/index.js":
/*!****************************************************!*\
  !*** ./src/components/CommunicationPanel/index.js ***!
  \****************************************************/
/*! exports provided: CommunicationPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CommunicationPanel_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommunicationPanel.logic */ \"./src/components/CommunicationPanel/CommunicationPanel.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CommunicationPanel\", function() { return _CommunicationPanel_logic__WEBPACK_IMPORTED_MODULE_0__[\"CommunicationPanel\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/CommunicationPanel/index.js?");

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