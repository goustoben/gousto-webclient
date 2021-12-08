(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Alert.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Alert.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Alert.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./Alert.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Alert_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Alert/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Alert.module.css":
/*!*************************************!*\
  !*** external "./Alert.module.css" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Alert_module_css__;\n\n//# sourceURL=webpack:///external_%22./Alert.module.css%22?");

/***/ }),

/***/ "./src/components/Alert/Alert.logic.js":
/*!*********************************************!*\
  !*** ./src/components/Alert/Alert.logic.js ***!
  \*********************************************/
/*! exports provided: Alert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Alert\", function() { return Alert; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Alert_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Alert.module.css */ \"./Alert.module.css\");\n/* harmony import */ var _Alert_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Alert_module_css__WEBPACK_IMPORTED_MODULE_3__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,\n  hasIcon: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  type: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['danger', 'info', 'success', 'warning'])\n};\nvar defaultProps = {\n  type: 'info',\n  hasIcon: true\n};\n\nvar Alert = function Alert(_ref) {\n  var children = _ref.children,\n      hasIcon = _ref.hasIcon,\n      type = _ref.type;\n  var alertWrapperCss = classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Alert_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[type], _defineProperty({}, _Alert_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.hasIcon, hasIcon));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: alertWrapperCss\n  }, hasIcon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _Alert_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[\"icon-\".concat(type)]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Alert_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.content\n  }, children));\n};\n\nAlert.propTypes = propTypes;\nAlert.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/Alert/Alert.logic.js?");

/***/ }),

/***/ "./src/components/Alert/index.js":
/*!***************************************!*\
  !*** ./src/components/Alert/index.js ***!
  \***************************************/
/*! exports provided: Alert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Alert_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Alert.logic */ \"./src/components/Alert/Alert.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Alert\", function() { return _Alert_logic__WEBPACK_IMPORTED_MODULE_0__[\"Alert\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Alert/index.js?");

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