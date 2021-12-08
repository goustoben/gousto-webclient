(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./HeaderNavList.module.css"), require("classnames"), require("./gousto-config/index.js"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./HeaderNavList.module.css", "classnames", "./gousto-config/index.js", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./HeaderNavList.module.css"), require("classnames"), require("./gousto-config/index.js"), require("prop-types"), require("react")) : factory(root["./HeaderNavList.module.css"], root["classnames"], root["./gousto-config/index.js"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__HeaderNavList_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_gousto_config__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Header/HeaderNavList/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./HeaderNavList.module.css":
/*!*********************************************!*\
  !*** external "./HeaderNavList.module.css" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__HeaderNavList_module_css__;\n\n//# sourceURL=webpack:///external_%22./HeaderNavList.module.css%22?");

/***/ }),

/***/ "./src/components/Header/HeaderNavList/HeaderNavList.logic.js":
/*!********************************************************************!*\
  !*** ./src/components/Header/HeaderNavList/HeaderNavList.logic.js ***!
  \********************************************************************/
/*! exports provided: HeaderNavList, ITEM_TRACKING_ACTIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HeaderNavList\", function() { return HeaderNavList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ITEM_TRACKING_ACTIONS\", function() { return ITEM_TRACKING_ACTIONS; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var gousto_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gousto-config */ \"gousto-config\");\n/* harmony import */ var gousto_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(gousto_config__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _HeaderNavList_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HeaderNavList.module.css */ \"./HeaderNavList.module.css\");\n/* harmony import */ var _HeaderNavList_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_HeaderNavList_module_css__WEBPACK_IMPORTED_MODULE_4__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nvar goustoWebclient = gousto_config__WEBPACK_IMPORTED_MODULE_3__[\"routes\"].goustoWebclient;\n\nvar ITEM_TRACKING_ACTIONS = _defineProperty({}, goustoWebclient.help.label, 'click_help_navigation');\n\nvar ITEMS_WITH_TRACKING = Object.keys(ITEM_TRACKING_ACTIONS);\n\nvar HeaderNavList = function HeaderNavList(_ref) {\n  var hasDataTracking = _ref.hasDataTracking,\n      isAuthenticated = _ref.isAuthenticated,\n      items = _ref.items;\n\n  var itemsTrackingProperties = _defineProperty({}, goustoWebclient.help.label, JSON.stringify({\n    logged_in: isAuthenticated\n  }));\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\", {\n    className: _HeaderNavList_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.navListWrapper\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n    className: _HeaderNavList_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.navList\n  }, items.map(function (item) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n      className: _HeaderNavList_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.navListItem,\n      key: item.label\n    }, ITEMS_WITH_TRACKING.includes(item.label) && hasDataTracking ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_HeaderNavList_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.navListItemLink, _defineProperty({}, _HeaderNavList_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.navListItemLinkCTA, item.highlightHeader)),\n      href: item.url,\n      \"data-tracking-action\": ITEM_TRACKING_ACTIONS[item.label],\n      \"data-tracking-property\": itemsTrackingProperties[item.label]\n    }, item.label) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_HeaderNavList_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.navListItemLink, _defineProperty({}, _HeaderNavList_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.navListItemLinkCTA, item.highlightHeader)),\n      href: item.url\n    }, item.label));\n  })));\n};\n\nHeaderNavList.propTypes = {\n  hasDataTracking: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  isAuthenticated: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,\n  items: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({\n    url: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n    label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n    highlightHeader: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool\n  })).isRequired\n};\nHeaderNavList.defaultProps = {\n  hasDataTracking: false\n};\n\n\n//# sourceURL=webpack:///./src/components/Header/HeaderNavList/HeaderNavList.logic.js?");

/***/ }),

/***/ "./src/components/Header/HeaderNavList/index.js":
/*!******************************************************!*\
  !*** ./src/components/Header/HeaderNavList/index.js ***!
  \******************************************************/
/*! exports provided: HeaderNavList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HeaderNavList_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HeaderNavList.logic */ \"./src/components/Header/HeaderNavList/HeaderNavList.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"HeaderNavList\", function() { return _HeaderNavList_logic__WEBPACK_IMPORTED_MODULE_0__[\"HeaderNavList\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Header/HeaderNavList/index.js?");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_classnames__;\n\n//# sourceURL=webpack:///external_%22classnames%22?");

/***/ }),

/***/ "gousto-config":
/*!*******************************************!*\
  !*** external "./gousto-config/index.js" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_gousto_config__;\n\n//# sourceURL=webpack:///external_%22./gousto-config/index.js%22?");

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