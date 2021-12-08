(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Heading"), require("./Heading.module.css"), require("./VerticalStagesItem.module.css"), require("classnames"), require("./design-language/typography.module.css"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Heading", "./Heading.module.css", "./VerticalStagesItem.module.css", "classnames", "./design-language/typography.module.css", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Heading"), require("./Heading.module.css"), require("./VerticalStagesItem.module.css"), require("classnames"), require("./design-language/typography.module.css"), require("prop-types"), require("react")) : factory(root["./Heading"], root["./Heading.module.css"], root["./VerticalStagesItem.module.css"], root["classnames"], root["./design-language/typography.module.css"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Heading__, __WEBPACK_EXTERNAL_MODULE__Heading_module_css__, __WEBPACK_EXTERNAL_MODULE__VerticalStagesItem_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_design_language_typography_module_css__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/VerticalStagesItem/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../Heading":
/*!****************************!*\
  !*** external "./Heading" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Heading__;\n\n//# sourceURL=webpack:///external_%22./Heading%22?");

/***/ }),

/***/ "./Heading.module.css":
/*!***************************************!*\
  !*** external "./Heading.module.css" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Heading_module_css__;\n\n//# sourceURL=webpack:///external_%22./Heading.module.css%22?");

/***/ }),

/***/ "./VerticalStagesItem.module.css":
/*!**************************************************!*\
  !*** external "./VerticalStagesItem.module.css" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__VerticalStagesItem_module_css__;\n\n//# sourceURL=webpack:///external_%22./VerticalStagesItem.module.css%22?");

/***/ }),

/***/ "./src/components/Heading/Heading.logic.js":
/*!*************************************************!*\
  !*** ./src/components/Heading/Heading.logic.js ***!
  \*************************************************/
/*! exports provided: Heading, headingAvailableSizes, headingAvailableTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Heading\", function() { return Heading; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"headingAvailableSizes\", function() { return headingAvailableSizes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"headingAvailableTypes\", function() { return headingAvailableTypes; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var design_language_typography_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! design-language/typography.module.css */ \"design-language/typography.module.css\");\n/* harmony import */ var design_language_typography_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(design_language_typography_module_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Heading_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Heading.module.css */ \"./Heading.module.css\");\n/* harmony import */ var _Heading_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Heading_module_css__WEBPACK_IMPORTED_MODULE_4__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nvar headingAvailableSizes = ['_legacy_medium', '_legacy_large', '_legacy_xLarge', 'fontStyleM', 'fontStyleL', 'fontStyleXL', 'fontStyle2XL', 'fontStyle3XL', 'fontStyle4XL'];\nvar headingAvailableTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,\n  isCenter: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  hasMargin: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(headingAvailableSizes),\n  type: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(headingAvailableTypes)\n};\nvar defaultProps = {\n  isCenter: false,\n  hasMargin: true,\n  size: 'fontStyleXL',\n  type: 'h1'\n};\n\nvar Heading = function Heading(_ref) {\n  var _classnames;\n\n  var children = _ref.children,\n      isCenter = _ref.isCenter,\n      size = _ref.size,\n      type = _ref.type,\n      hasMargin = _ref.hasMargin;\n  var Element = type;\n  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Heading_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.heading, _Heading_module_css__WEBPACK_IMPORTED_MODULE_4___default.a[\"heading--\".concat(size)], design_language_typography_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[size], (_classnames = {}, _defineProperty(_classnames, _Heading_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.isCenter, isCenter), _defineProperty(_classnames, _Heading_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.hasMargin, hasMargin), _classnames));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Element, {\n    className: classes\n  }, children);\n};\n\nHeading.propTypes = propTypes;\nHeading.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/Heading/Heading.logic.js?");

/***/ }),

/***/ "./src/components/VerticalStagesItem/VerticalStagesItem.logic.js":
/*!***********************************************************************!*\
  !*** ./src/components/VerticalStagesItem/VerticalStagesItem.logic.js ***!
  \***********************************************************************/
/*! exports provided: backgroundColorsAvailable, VerticalStagesItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"backgroundColorsAvailable\", function() { return backgroundColorsAvailable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VerticalStagesItem\", function() { return VerticalStagesItem; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VerticalStagesItem.module.css */ \"./VerticalStagesItem.module.css\");\n/* harmony import */ var _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Heading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Heading */ \"../Heading\");\n/* harmony import */ var _Heading__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Heading__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Heading_Heading_logic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Heading/Heading.logic */ \"./src/components/Heading/Heading.logic.js\");\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\nvar backgroundColorsAvailable = ['transparent', 'lightGrey', 'white'];\nvar propTypes = {\n  backgroundColor: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(backgroundColorsAvailable),\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,\n  extraClass: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  isCompleted: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,\n\n  /** Should be provided by the VerticalStages component */\n  hasFullWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  headingType: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(_Heading_Heading_logic__WEBPACK_IMPORTED_MODULE_5__[\"headingAvailableTypes\"]),\n  isLastStep: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  stepNumber: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number\n};\nvar defaultProps = {\n  backgroundColor: 'transparent',\n  children: null,\n  extraClass: null,\n  hasFullWidth: false,\n  headingType: _Heading_Heading_logic__WEBPACK_IMPORTED_MODULE_5__[\"headingAvailableTypes\"][1],\n  isCompleted: false,\n  isLastStep: false,\n  stepNumber: 1\n};\n\nvar VerticalStagesItem = function VerticalStagesItem(_ref) {\n  var _classnames, _classnames2;\n\n  var backgroundColor = _ref.backgroundColor,\n      children = _ref.children,\n      extraClass = _ref.extraClass,\n      hasFullWidth = _ref.hasFullWidth,\n      headingType = _ref.headingType,\n      isCompleted = _ref.isCompleted,\n      isLastStep = _ref.isLastStep,\n      stepNumber = _ref.stepNumber,\n      title = _ref.title;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.wrapper, _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[\"wrapper--\".concat(backgroundColor)], (_classnames = {}, _defineProperty(_classnames, _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.isCompleted, isCompleted), _defineProperty(_classnames, _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a['wrapper--fullWidth'], hasFullWidth), _classnames))\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.topContentWrapper\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.stepNumberWrapper, (_classnames2 = {}, _defineProperty(_classnames2, _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.firstStep, stepNumber === 1), _defineProperty(_classnames2, _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.lastStep, isLastStep), _classnames2))\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.stepNumber\n  }, isCompleted ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.tickIcon\n  }) : stepNumber), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.lineBelowNumber\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.contentWrapper\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.verticalStagesItem, extraClass)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Heading__WEBPACK_IMPORTED_MODULE_4__[\"Heading\"], {\n    size: \"_legacy_large\",\n    type: headingType\n  }, title), !hasFullWidth && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.contentDefaultWidth\n  }, children)))), hasFullWidth && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.verticalStagesItem, _VerticalStagesItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.contentFullWidth)\n  }, children));\n};\n\nVerticalStagesItem.propTypes = propTypes;\nVerticalStagesItem.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/VerticalStagesItem/VerticalStagesItem.logic.js?");

/***/ }),

/***/ "./src/components/VerticalStagesItem/index.js":
/*!****************************************************!*\
  !*** ./src/components/VerticalStagesItem/index.js ***!
  \****************************************************/
/*! exports provided: backgroundColorsAvailable, VerticalStagesItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _VerticalStagesItem_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VerticalStagesItem.logic */ \"./src/components/VerticalStagesItem/VerticalStagesItem.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"backgroundColorsAvailable\", function() { return _VerticalStagesItem_logic__WEBPACK_IMPORTED_MODULE_0__[\"backgroundColorsAvailable\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"VerticalStagesItem\", function() { return _VerticalStagesItem_logic__WEBPACK_IMPORTED_MODULE_0__[\"VerticalStagesItem\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/VerticalStagesItem/index.js?");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_classnames__;\n\n//# sourceURL=webpack:///external_%22classnames%22?");

/***/ }),

/***/ "design-language/typography.module.css":
/*!**********************************************************!*\
  !*** external "./design-language/typography.module.css" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_design_language_typography_module_css__;\n\n//# sourceURL=webpack:///external_%22./design-language/typography.module.css%22?");

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