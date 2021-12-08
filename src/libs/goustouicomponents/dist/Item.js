(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Heading"), require("./Item.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Heading", "./Item.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Heading"), require("./Item.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./Heading"], root["./Item.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Heading__, __WEBPACK_EXTERNAL_MODULE__Item_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Item/index.js");
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

/***/ "./Item.module.css":
/*!************************************!*\
  !*** external "./Item.module.css" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Item_module_css__;\n\n//# sourceURL=webpack:///external_%22./Item.module.css%22?");

/***/ }),

/***/ "./src/components/Item/Item.logic.js":
/*!*******************************************!*\
  !*** ./src/components/Item/Item.logic.js ***!
  \*******************************************/
/*! exports provided: Item */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Item\", function() { return Item; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Item_presentation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Item.presentation */ \"./src/components/Item/Item.presentation.js\");\n/* harmony import */ var _Item_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Item.module.css */ \"./Item.module.css\");\n/* harmony import */ var _Item_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Item_module_css__WEBPACK_IMPORTED_MODULE_4__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nvar propTypes = {\n  canExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  href: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  iconPath: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,\n  isExpanded: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  isHiddenOnMobile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  isLabelHeading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  isLinkStyled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  subText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  trackClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func\n};\nvar defaultProps = {\n  canExpand: false,\n  href: null,\n  iconPath: null,\n  isExpanded: false,\n  isHiddenOnMobile: false,\n  isLabelHeading: false,\n  isLinkStyled: true,\n  onClick: function onClick() {},\n  subText: null,\n  trackClick: function trackClick() {}\n};\n\nvar Item = function Item(_ref) {\n  var _classnames;\n\n  var canExpand = _ref.canExpand,\n      href = _ref.href,\n      iconPath = _ref.iconPath,\n      isExpanded = _ref.isExpanded,\n      isHiddenOnMobile = _ref.isHiddenOnMobile,\n      isLabelHeading = _ref.isLabelHeading,\n      isLinkStyled = _ref.isLinkStyled,\n      onClick = _ref.onClick,\n      label = _ref.label,\n      subText = _ref.subText,\n      trackClick = _ref.trackClick;\n\n  var onClickHandler = function onClickHandler() {\n    trackClick();\n    onClick();\n  };\n\n  var itemClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Item_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.item, (_classnames = {}, _defineProperty(_classnames, _Item_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.hiddenOnMobile, isHiddenOnMobile), _defineProperty(_classnames, _Item_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.linkStyle, isLinkStyled), _classnames));\n\n  var arrowClass = function arrowClass() {\n    if (!canExpand) {\n      return _Item_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.itemArrowRight;\n    }\n\n    return isExpanded ? _Item_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.itemArrowUp : _Item_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.itemArrowDown;\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Item_presentation__WEBPACK_IMPORTED_MODULE_3__[\"ItemPresentation\"], {\n    arrowClass: arrowClass(),\n    href: href,\n    iconPath: iconPath,\n    itemClasses: itemClasses,\n    isLabelHeading: isLabelHeading,\n    label: label,\n    onClick: onClickHandler,\n    subText: subText\n  });\n};\n\nItem.propTypes = propTypes;\nItem.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/Item/Item.logic.js?");

/***/ }),

/***/ "./src/components/Item/Item.presentation.js":
/*!**************************************************!*\
  !*** ./src/components/Item/Item.presentation.js ***!
  \**************************************************/
/*! exports provided: ItemPresentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ItemPresentation\", function() { return ItemPresentation; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils_accessibility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/accessibility */ \"./src/utils/accessibility.js\");\n/* harmony import */ var _Heading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Heading */ \"../Heading\");\n/* harmony import */ var _Heading__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Heading__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Item_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Item.module.css */ \"./Item.module.css\");\n/* harmony import */ var _Item_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Item_module_css__WEBPACK_IMPORTED_MODULE_5__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n\n\n\nvar propTypes = {\n  arrowClass: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  href: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  iconPath: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  isLabelHeading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  itemClasses: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  subText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string\n};\nvar defaultProps = {\n  href: null,\n  iconPath: null,\n  isLabelHeading: false,\n  onClick: function onClick() {},\n  subText: null\n};\n\nvar renderText = function renderText(label, subText) {\n  var extraClasses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default.a.apply(void 0, [_Item_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.textWrapper].concat(_toConsumableArray(extraClasses)))\n  }, label, subText && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _Item_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.subText\n  }, subText));\n};\n\nvar renderContent = function renderContent(arrowClass, iconPath, isLabelHeading, label, subText) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, iconPath && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _Item_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.icon\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    src: iconPath,\n    alt: \"\"\n  })), isLabelHeading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Heading__WEBPACK_IMPORTED_MODULE_4__[\"Heading\"], {\n    size: \"fontStyleM\",\n    hasMargin: false\n  }, renderText(label, subText, [_Item_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.heading])) : renderText(label, subText), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: arrowClass\n  }));\n};\n\nvar ItemPresentation = function ItemPresentation(_ref) {\n  var arrowClass = _ref.arrowClass,\n      href = _ref.href,\n      iconPath = _ref.iconPath,\n      isLabelHeading = _ref.isLabelHeading,\n      itemClasses = _ref.itemClasses,\n      label = _ref.label,\n      onClick = _ref.onClick,\n      subText = _ref.subText;\n  var attributes = {\n    className: itemClasses,\n    onClick: onClick,\n    onKeyDown: Object(_utils_accessibility__WEBPACK_IMPORTED_MODULE_3__[\"onEnter\"])(onClick),\n    role: 'button',\n    tabIndex: 0,\n    href: href\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(href ? 'a' : 'div', attributes, renderContent(arrowClass, iconPath, isLabelHeading, label, subText));\n};\n\nItemPresentation.propTypes = propTypes;\nItemPresentation.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/Item/Item.presentation.js?");

/***/ }),

/***/ "./src/components/Item/index.js":
/*!**************************************!*\
  !*** ./src/components/Item/index.js ***!
  \**************************************/
/*! exports provided: Item */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Item_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item.logic */ \"./src/components/Item/Item.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Item\", function() { return _Item_logic__WEBPACK_IMPORTED_MODULE_0__[\"Item\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Item/index.js?");

/***/ }),

/***/ "./src/utils/accessibility.js":
/*!************************************!*\
  !*** ./src/utils/accessibility.js ***!
  \************************************/
/*! exports provided: onEnter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"onEnter\", function() { return onEnter; });\nvar onEnter = function onEnter(callback) {\n  return function (event) {\n    return event.keyCode === 13 && callback(event);\n  };\n};\n\n//# sourceURL=webpack:///./src/utils/accessibility.js?");

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