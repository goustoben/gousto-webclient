(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./CTA"), require("./StepButton.module.css"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./CTA", "./StepButton.module.css", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./CTA"), require("./StepButton.module.css"), require("prop-types"), require("react")) : factory(root["./CTA"], root["./StepButton.module.css"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__CTA__, __WEBPACK_EXTERNAL_MODULE__StepButton_module_css__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/StepButtons/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../CTA":
/*!************************!*\
  !*** external "./CTA" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__CTA__;\n\n//# sourceURL=webpack:///external_%22./CTA%22?");

/***/ }),

/***/ "./StepButton.module.css":
/*!******************************************!*\
  !*** external "./StepButton.module.css" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__StepButton_module_css__;\n\n//# sourceURL=webpack:///external_%22./StepButton.module.css%22?");

/***/ }),

/***/ "./src/components/StepButtons/StepButtons.js":
/*!***************************************************!*\
  !*** ./src/components/StepButtons/StepButtons.js ***!
  \***************************************************/
/*! exports provided: StepButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StepButtons\", function() { return StepButtons; });\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _CTA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CTA */ \"../CTA\");\n/* harmony import */ var _CTA__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_CTA__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _StepButton_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StepButton.module.css */ \"./StepButton.module.css\");\n/* harmony import */ var _StepButton_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_StepButton_module_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nvar propTypes = {\n  isContinueDisabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,\n  isSkipButtonVisible: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,\n  labelNext: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,\n  labelSkip: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,\n  onContinueClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,\n  onSkipClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired\n};\nvar defaultProps = {\n  isContinueDisabled: false,\n  isSkipButtonVisible: true\n};\n\nvar StepButtons = function StepButtons(_ref) {\n  var isContinueDisabled = _ref.isContinueDisabled,\n      isSkipButtonVisible = _ref.isSkipButtonVisible,\n      labelNext = _ref.labelNext,\n      labelSkip = _ref.labelSkip,\n      onContinueClick = _ref.onContinueClick,\n      onSkipClick = _ref.onSkipClick;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: _StepButton_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.container\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: _StepButton_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.buttonContinue\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_CTA__WEBPACK_IMPORTED_MODULE_2__[\"CTA\"], {\n    isFullWidth: true,\n    onClick: onContinueClick,\n    size: \"medium\",\n    variant: \"primary\",\n    isDisabled: isContinueDisabled\n  }, labelNext)), isSkipButtonVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_CTA__WEBPACK_IMPORTED_MODULE_2__[\"CTA\"], {\n    isFullWidth: true,\n    onClick: onSkipClick,\n    size: \"medium\",\n    variant: \"secondary\"\n  }, labelSkip)));\n};\n\nStepButtons.defaultProps = defaultProps;\nStepButtons.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/StepButtons/StepButtons.js?");

/***/ }),

/***/ "./src/components/StepButtons/index.js":
/*!*********************************************!*\
  !*** ./src/components/StepButtons/index.js ***!
  \*********************************************/
/*! exports provided: StepButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _StepButtons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StepButtons */ \"./src/components/StepButtons/StepButtons.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"StepButtons\", function() { return _StepButtons__WEBPACK_IMPORTED_MODULE_0__[\"StepButtons\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/StepButtons/index.js?");

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