(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./HeaderNavExtendedItemLink"), require("./HeaderNavExtendedSublist"), require("./HeaderNavExtendedList.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./HeaderNavExtendedItemLink", "./HeaderNavExtendedSublist", "./HeaderNavExtendedList.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./HeaderNavExtendedItemLink"), require("./HeaderNavExtendedSublist"), require("./HeaderNavExtendedList.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./HeaderNavExtendedItemLink"], root["./HeaderNavExtendedSublist"], root["./HeaderNavExtendedList.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__HeaderNavExtendedItemLink__, __WEBPACK_EXTERNAL_MODULE__HeaderNavExtendedSublist__, __WEBPACK_EXTERNAL_MODULE__HeaderNavExtendedList_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Header/HeaderNavExtendedList/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../HeaderNavExtendedItemLink":
/*!**********************************************!*\
  !*** external "./HeaderNavExtendedItemLink" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__HeaderNavExtendedItemLink__;\n\n//# sourceURL=webpack:///external_%22./HeaderNavExtendedItemLink%22?");

/***/ }),

/***/ "../HeaderNavExtendedSublist":
/*!*********************************************!*\
  !*** external "./HeaderNavExtendedSublist" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__HeaderNavExtendedSublist__;\n\n//# sourceURL=webpack:///external_%22./HeaderNavExtendedSublist%22?");

/***/ }),

/***/ "./HeaderNavExtendedList.module.css":
/*!*****************************************************!*\
  !*** external "./HeaderNavExtendedList.module.css" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__HeaderNavExtendedList_module_css__;\n\n//# sourceURL=webpack:///external_%22./HeaderNavExtendedList.module.css%22?");

/***/ }),

/***/ "./src/components/Header/HeaderNavExtendedList/HeaderNavExtendedList.logic.js":
/*!************************************************************************************!*\
  !*** ./src/components/Header/HeaderNavExtendedList/HeaderNavExtendedList.logic.js ***!
  \************************************************************************************/
/*! exports provided: HeaderNavExtendedList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HeaderNavExtendedList\", function() { return HeaderNavExtendedList; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _HeaderNavExtendedList_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HeaderNavExtendedList.module.css */ \"./HeaderNavExtendedList.module.css\");\n/* harmony import */ var _HeaderNavExtendedList_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_HeaderNavExtendedList_module_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _HeaderNavExtendedItemLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../HeaderNavExtendedItemLink */ \"../HeaderNavExtendedItemLink\");\n/* harmony import */ var _HeaderNavExtendedItemLink__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_HeaderNavExtendedItemLink__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _HeaderNavExtendedSublist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../HeaderNavExtendedSublist */ \"../HeaderNavExtendedSublist\");\n/* harmony import */ var _HeaderNavExtendedSublist__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_HeaderNavExtendedSublist__WEBPACK_IMPORTED_MODULE_5__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\nvar HeaderNavExtendedList = function HeaderNavExtendedList(_ref) {\n  var hasDataTracking = _ref.hasDataTracking,\n      isAuthenticated = _ref.isAuthenticated,\n      items = _ref.items,\n      isExtendedNavigationVisible = _ref.isExtendedNavigationVisible;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_HeaderNavExtendedList_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.navExtendedListWrapper, _defineProperty({}, _HeaderNavExtendedList_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.isVisible, isExtendedNavigationVisible))\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n    className: _HeaderNavExtendedList_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.navExtendedList\n  }, items.map(function (item) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n      className: _HeaderNavExtendedList_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.navExtendedListItem,\n      key: item.label\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HeaderNavExtendedItemLink__WEBPACK_IMPORTED_MODULE_4__[\"HeaderNavExtendedItemLink\"], {\n      item: item,\n      isExtendedNavigationVisible: isExtendedNavigationVisible\n    }), item.subItems && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HeaderNavExtendedSublist__WEBPACK_IMPORTED_MODULE_5__[\"HeaderNavExtendedSublist\"], {\n      items: item.subItems,\n      isExtendedNavigationVisible: isExtendedNavigationVisible,\n      isAuthenticated: isAuthenticated,\n      hasDataTracking: hasDataTracking\n    }));\n  })));\n};\n\nvar itemProps = {\n  url: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  highlightHeader: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool\n};\nHeaderNavExtendedList.propTypes = {\n  items: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape(_objectSpread(_objectSpread({}, itemProps), {}, {\n    subItems: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape(itemProps))\n  }))).isRequired,\n  isExtendedNavigationVisible: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,\n  hasDataTracking: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  isAuthenticated: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired\n};\nHeaderNavExtendedList.defaultProps = {\n  hasDataTracking: false\n};\n\n\n//# sourceURL=webpack:///./src/components/Header/HeaderNavExtendedList/HeaderNavExtendedList.logic.js?");

/***/ }),

/***/ "./src/components/Header/HeaderNavExtendedList/index.js":
/*!**************************************************************!*\
  !*** ./src/components/Header/HeaderNavExtendedList/index.js ***!
  \**************************************************************/
/*! exports provided: HeaderNavExtendedList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HeaderNavExtendedList_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HeaderNavExtendedList.logic */ \"./src/components/Header/HeaderNavExtendedList/HeaderNavExtendedList.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"HeaderNavExtendedList\", function() { return _HeaderNavExtendedList_logic__WEBPACK_IMPORTED_MODULE_0__[\"HeaderNavExtendedList\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Header/HeaderNavExtendedList/index.js?");

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