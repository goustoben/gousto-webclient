(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./InputCheck.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./InputCheck.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./InputCheck.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./InputCheck.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__InputCheck_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/InputCheck/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./InputCheck.module.css":
/*!******************************************!*\
  !*** external "./InputCheck.module.css" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__InputCheck_module_css__;\n\n//# sourceURL=webpack:///external_%22./InputCheck.module.css%22?");

/***/ }),

/***/ "./src/components/InputCheck/InputCheck.logic.js":
/*!*******************************************************!*\
  !*** ./src/components/InputCheck/InputCheck.logic.js ***!
  \*******************************************************/
/*! exports provided: InputCheck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InputCheck\", function() { return InputCheck; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _InputCheck_presentation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InputCheck.presentation */ \"./src/components/InputCheck/InputCheck.presentation.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\nvar propTypes = {\n  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  defaultValue: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  type: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['default', 'tile']),\n  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  testingSelector: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string\n};\nvar defaultProps = {\n  defaultValue: false,\n  onChange: function onChange() {},\n  type: 'default',\n  disabled: false,\n  testingSelector: 'input-check'\n};\n\nvar InputCheck = function InputCheck(_ref) {\n  var id = _ref.id,\n      label = _ref.label,\n      onChange = _ref.onChange,\n      defaultValue = _ref.defaultValue,\n      type = _ref.type,\n      disabled = _ref.disabled,\n      testingSelector = _ref.testingSelector;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false),\n      _useState2 = _slicedToArray(_useState, 2),\n      isChecked = _useState2[0],\n      updateIsChecked = _useState2[1];\n\n  var defaultEstablished = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(false);\n\n  var onChangeHandler = function onChangeHandler() {\n    updateIsChecked(!isChecked);\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    if (defaultEstablished.current) {\n      onChange(id, isChecked);\n    }\n  }, [isChecked]); // defaultValue may be assigned by an async action,\n  // therefore we need to listen to changes\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    updateIsChecked(defaultValue);\n\n    if (!defaultEstablished.current) {\n      defaultEstablished.current = true;\n    }\n  }, [defaultValue]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    if (disabled) {\n      updateIsChecked(false);\n    }\n  }, [disabled]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InputCheck_presentation__WEBPACK_IMPORTED_MODULE_2__[\"InputCheckPresentation\"], {\n    id: id,\n    label: label,\n    isChecked: isChecked,\n    onChange: onChangeHandler,\n    type: type,\n    disabled: disabled,\n    testingSelector: testingSelector\n  });\n};\n\nInputCheck.propTypes = propTypes;\nInputCheck.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/InputCheck/InputCheck.logic.js?");

/***/ }),

/***/ "./src/components/InputCheck/InputCheck.presentation.js":
/*!**************************************************************!*\
  !*** ./src/components/InputCheck/InputCheck.presentation.js ***!
  \**************************************************************/
/*! exports provided: InputCheckPresentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InputCheckPresentation\", function() { return InputCheckPresentation; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _InputCheck_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InputCheck.module.css */ \"./InputCheck.module.css\");\n/* harmony import */ var _InputCheck_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_InputCheck_module_css__WEBPACK_IMPORTED_MODULE_3__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nvar propTypes = {\n  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  isChecked: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  type: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['default', 'tile']),\n  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  testingSelector: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired\n};\nvar defaultProps = {\n  isChecked: false,\n  onChange: function onChange() {},\n  type: 'default',\n  disabled: false\n};\n\nvar VARIANTS = function VARIANTS(_ref) {\n  var _classNames2;\n\n  var disabled = _ref.disabled,\n      type = _ref.type;\n  return {\n    \"default\": {\n      classNames: _defineProperty({}, _InputCheck_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.disabled, disabled)\n    },\n    tile: {\n      classNames: (_classNames2 = {}, _defineProperty(_classNames2, _InputCheck_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.tile, true), _defineProperty(_classNames2, _InputCheck_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.disabled, disabled), _classNames2)\n    }\n  }[type];\n};\n\nvar InputCheckPresentation = function InputCheckPresentation(_ref2) {\n  var id = _ref2.id,\n      label = _ref2.label,\n      isChecked = _ref2.isChecked,\n      onChange = _ref2.onChange,\n      type = _ref2.type,\n      disabled = _ref2.disabled,\n      testingSelector = _ref2.testingSelector;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    \"data-testing\": testingSelector,\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_InputCheck_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.container, VARIANTS({\n      disabled: disabled,\n      type: type\n    }).classNames)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    className: _InputCheck_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.label,\n    htmlFor: id\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    id: id,\n    \"data-testing\": \"\".concat(testingSelector, \"-input\"),\n    type: \"checkbox\",\n    checked: isChecked,\n    onChange: onChange,\n    disabled: disabled\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_InputCheck_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.checkboxBox, _defineProperty({}, _InputCheck_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.checkboxDisabled, disabled))\n  }), label));\n};\n\nInputCheckPresentation.propTypes = propTypes;\nInputCheckPresentation.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/InputCheck/InputCheck.presentation.js?");

/***/ }),

/***/ "./src/components/InputCheck/index.js":
/*!********************************************!*\
  !*** ./src/components/InputCheck/index.js ***!
  \********************************************/
/*! exports provided: InputCheck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _InputCheck_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputCheck.logic */ \"./src/components/InputCheck/InputCheck.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"InputCheck\", function() { return _InputCheck_logic__WEBPACK_IMPORTED_MODULE_0__[\"InputCheck\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/InputCheck/index.js?");

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