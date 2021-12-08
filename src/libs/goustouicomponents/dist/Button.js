(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Segment"), require("./Spinner"), require("./Tooltip"), require("./Button.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Segment", "./Spinner", "./Tooltip", "./Button.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Segment"), require("./Spinner"), require("./Tooltip"), require("./Button.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./Segment"], root["./Spinner"], root["./Tooltip"], root["./Button.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Segment__, __WEBPACK_EXTERNAL_MODULE__Spinner__, __WEBPACK_EXTERNAL_MODULE__Tooltip__, __WEBPACK_EXTERNAL_MODULE__Button_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Button/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../Segment":
/*!****************************!*\
  !*** external "./Segment" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Segment__;\n\n//# sourceURL=webpack:///external_%22./Segment%22?");

/***/ }),

/***/ "../Spinner":
/*!****************************!*\
  !*** external "./Spinner" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Spinner__;\n\n//# sourceURL=webpack:///external_%22./Spinner%22?");

/***/ }),

/***/ "../Tooltip":
/*!****************************!*\
  !*** external "./Tooltip" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Tooltip__;\n\n//# sourceURL=webpack:///external_%22./Tooltip%22?");

/***/ }),

/***/ "./Button.module.css":
/*!**************************************!*\
  !*** external "./Button.module.css" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Button_module_css__;\n\n//# sourceURL=webpack:///external_%22./Button.module.css%22?");

/***/ }),

/***/ "./src/components/Button/Button.logic.js":
/*!***********************************************!*\
  !*** ./src/components/Button/Button.logic.js ***!
  \***********************************************/
/*! exports provided: Button */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Button\", function() { return Button; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Button_presentation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Button.presentation */ \"./src/components/Button/Button.presentation.js\");\n/* harmony import */ var _Segment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Segment */ \"../Segment\");\n/* harmony import */ var _Segment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Segment__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Tooltip */ \"../Tooltip\");\n/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Tooltip__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _Button_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Button.module.css */ \"./Button.module.css\");\n/* harmony import */ var _Button_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Button_module_css__WEBPACK_IMPORTED_MODULE_6__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\n\nvar propTypes = {\n  color: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['primary', 'secondary', 'tertiary', 'quaternary', 'negative']),\n  disabled: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,\n  noDecoration: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,\n  className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,\n  width: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['auto', 'full']),\n  fill: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,\n  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.instanceOf(_Segment__WEBPACK_IMPORTED_MODULE_4__[\"Segment\"]), prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.instanceOf(_Tooltip__WEBPACK_IMPORTED_MODULE_5__[\"Tooltip\"])]), prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.instanceOf(_Segment__WEBPACK_IMPORTED_MODULE_4__[\"Segment\"]), prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.instanceOf(_Tooltip__WEBPACK_IMPORTED_MODULE_5__[\"Tooltip\"])]), prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node]).isRequired,\n  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,\n  pending: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,\n  spinnerClassName: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,\n  spinnerContainerClassName: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,\n  'data-testing': prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,\n\n  /* indicates if the children should be always wrapped in <Segment> (which has the\n     * (filling styles), no matter the type of the children */\n  areChildrenInSegment: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool\n};\nvar defaultProps = {\n  color: 'primary',\n  className: '',\n  fill: true,\n  width: 'auto',\n  disabled: false,\n  noDecoration: false,\n  onClick: function onClick() {},\n  pending: false,\n  spinnerClassName: '',\n  spinnerContainerClassName: '',\n  'data-testing': '',\n  areChildrenInSegment: false\n};\n\nvar cloneChildren = function cloneChildren(children, props, fill, onClick) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.map(children, function (child) {\n    if (child.type === _Tooltip__WEBPACK_IMPORTED_MODULE_5__[\"Tooltip\"] && child.props.children.type === _Segment__WEBPACK_IMPORTED_MODULE_4__[\"Segment\"]) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Tooltip__WEBPACK_IMPORTED_MODULE_5__[\"Tooltip\"], child.props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(child.props.children, props));\n    } else if (typeof child === 'string' || props.areChildrenInSegment) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Segment__WEBPACK_IMPORTED_MODULE_4__[\"Segment\"], _extends({}, props, {\n        // eslint-disable-line react/jsx-props-no-spreading\n        fill: fill,\n        onClick: onClick\n      }), child);\n    }\n\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(child, props);\n  });\n};\n\nvar Button = function Button(_ref) {\n  var _classNames, _spinnerClassNames;\n\n  var children = _ref.children,\n      color = _ref.color,\n      disabled = _ref.disabled,\n      noDecoration = _ref.noDecoration,\n      className = _ref.className,\n      width = _ref.width,\n      fill = _ref.fill,\n      onClick = _ref.onClick,\n      pending = _ref.pending,\n      spinnerClassName = _ref.spinnerClassName,\n      spinnerContainerClassName = _ref.spinnerContainerClassName,\n      dataTesting = _ref['data-testing'],\n      areChildrenInSegment = _ref.areChildrenInSegment;\n  var classNames = (_classNames = {}, _defineProperty(_classNames, className, className), _defineProperty(_classNames, _Button_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.disabled, disabled || pending), _defineProperty(_classNames, _Button_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.widthAuto, width === 'auto'), _classNames);\n  var spinnerClassNames = (_spinnerClassNames = {}, _defineProperty(_spinnerClassNames, _Button_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.spinnerContainer, true), _defineProperty(_spinnerClassNames, spinnerContainerClassName, true), _defineProperty(_spinnerClassNames, _Button_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.spinnerShow, pending), _spinnerClassNames);\n  var clonedChildren = cloneChildren(children, {\n    color: color,\n    width: width,\n    btnDisabled: disabled,\n    'data-testing': dataTesting,\n    noDecoration: noDecoration,\n    areChildrenInSegment: areChildrenInSegment\n  }, fill, onClick);\n  var spinnerColor = 'white';\n  if (color === 'secondary') spinnerColor = 'bluecheese';else if (color === 'negative') spinnerColor = 'radish';\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Button_presentation__WEBPACK_IMPORTED_MODULE_3__[\"ButtonPresentation\"], {\n    computedKey: react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.count(children),\n    color: color,\n    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(_Button_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.container, _Button_module_css__WEBPACK_IMPORTED_MODULE_6___default.a[color], _Button_module_css__WEBPACK_IMPORTED_MODULE_6___default.a[fill ? 'fill' : 'noFill'], classNames),\n    spanClassName: classnames__WEBPACK_IMPORTED_MODULE_1___default()(_Button_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.spinner, spinnerClassName),\n    spinnerClassNames: classnames__WEBPACK_IMPORTED_MODULE_1___default()(spinnerClassNames),\n    spinnerColor: spinnerColor,\n    dataTesting: dataTesting\n  }, clonedChildren);\n};\n\nButton.propTypes = propTypes;\nButton.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/Button/Button.logic.js?");

/***/ }),

/***/ "./src/components/Button/Button.presentation.js":
/*!******************************************************!*\
  !*** ./src/components/Button/Button.presentation.js ***!
  \******************************************************/
/*! exports provided: ButtonPresentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ButtonPresentation\", function() { return ButtonPresentation; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Segment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Segment */ \"../Segment\");\n/* harmony import */ var _Segment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Segment__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Tooltip */ \"../Tooltip\");\n/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Tooltip__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Spinner */ \"../Spinner\");\n/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Spinner__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nvar propTypes = {\n  spinnerColor: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  color: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.instanceOf(_Segment__WEBPACK_IMPORTED_MODULE_2__[\"Segment\"]), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.instanceOf(_Tooltip__WEBPACK_IMPORTED_MODULE_3__[\"Tooltip\"])]), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.instanceOf(_Segment__WEBPACK_IMPORTED_MODULE_2__[\"Segment\"]), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.instanceOf(_Tooltip__WEBPACK_IMPORTED_MODULE_3__[\"Tooltip\"])]), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node]).isRequired,\n  computedKey: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired,\n  spanClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  spinnerClassNames: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  dataTesting: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired\n};\n\nvar ButtonPresentation = function ButtonPresentation(_ref) {\n  var children = _ref.children,\n      className = _ref.className,\n      spanClassName = _ref.spanClassName,\n      spinnerClassNames = _ref.spinnerClassNames,\n      spinnerColor = _ref.spinnerColor,\n      color = _ref.color,\n      computedKey = _ref.computedKey,\n      dataTesting = _ref.dataTesting;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    key: computedKey,\n    className: className\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Segment__WEBPACK_IMPORTED_MODULE_2__[\"Segment\"], {\n    \"data-testing\": dataTesting.length ? \"\".concat(dataTesting, \"Spinner\") : null,\n    spinner: true,\n    className: spinnerClassNames,\n    color: color\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: spanClassName\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Spinner__WEBPACK_IMPORTED_MODULE_4__[\"Spinner\"], {\n    color: spinnerColor\n  }))), children);\n};\n\nButtonPresentation.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/Button/Button.presentation.js?");

/***/ }),

/***/ "./src/components/Button/index.js":
/*!****************************************!*\
  !*** ./src/components/Button/index.js ***!
  \****************************************/
/*! exports provided: Button */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Button_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button.logic */ \"./src/components/Button/Button.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Button\", function() { return _Button_logic__WEBPACK_IMPORTED_MODULE_0__[\"Button\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Button/index.js?");

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