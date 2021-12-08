(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./StepContent.module.css"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./StepContent.module.css", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./StepContent.module.css"), require("prop-types"), require("react")) : factory(root["./StepContent.module.css"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__StepContent_module_css__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/StepContent/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./StepContent.module.css":
/*!*******************************************!*\
  !*** external "./StepContent.module.css" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__StepContent_module_css__;\n\n//# sourceURL=webpack:///external_%22./StepContent.module.css%22?");

/***/ }),

/***/ "./src/components/StepContent/StepContent.logic.js":
/*!*********************************************************!*\
  !*** ./src/components/StepContent/StepContent.logic.js ***!
  \*********************************************************/
/*! exports provided: StepContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StepContent\", function() { return StepContent; });\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _StepContent_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StepContent.module.css */ \"./StepContent.module.css\");\n/* harmony import */ var _StepContent_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_StepContent_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node.isRequired,\n  step: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,\n  size: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired\n};\n\nvar StepContent = function StepContent(_ref) {\n  var children = _ref.children,\n      size = _ref.size,\n      step = _ref.step;\n  var marginLeft = step === 1 ? '0' : \"-\".concat(step - 1, \"00%\");\n  var style = {\n    marginLeft: marginLeft,\n    width: \"\".concat(size, \"00%\")\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: _StepContent_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.stepsContainer\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: _StepContent_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.animationContainer\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: _StepContent_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.animation,\n    style: style\n  }, react__WEBPACK_IMPORTED_MODULE_1__[\"Children\"].map(children, function (child, idx) {\n    return (\n      /*#__PURE__*/\n      // eslint-disable-next-line react/no-array-index-key\n      react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n        className: _StepContent_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.step,\n        key: \"step-content-\".concat(idx)\n      }, child)\n    );\n  }))));\n};\n\nStepContent.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/StepContent/StepContent.logic.js?");

/***/ }),

/***/ "./src/components/StepContent/index.js":
/*!*********************************************!*\
  !*** ./src/components/StepContent/index.js ***!
  \*********************************************/
/*! exports provided: StepContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _StepContent_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StepContent.logic */ \"./src/components/StepContent/StepContent.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"StepContent\", function() { return _StepContent_logic__WEBPACK_IMPORTED_MODULE_0__[\"StepContent\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/StepContent/index.js?");

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