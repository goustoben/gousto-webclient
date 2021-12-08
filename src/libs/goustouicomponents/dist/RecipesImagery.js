(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./RecipesImagery.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./RecipesImagery.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./RecipesImagery.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./RecipesImagery.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__RecipesImagery_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/RecipesImagery/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./RecipesImagery.module.css":
/*!**********************************************!*\
  !*** external "./RecipesImagery.module.css" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__RecipesImagery_module_css__;\n\n//# sourceURL=webpack:///external_%22./RecipesImagery.module.css%22?");

/***/ }),

/***/ "./src/components/RecipesImagery/RecipesImagery.logic.js":
/*!***************************************************************!*\
  !*** ./src/components/RecipesImagery/RecipesImagery.logic.js ***!
  \***************************************************************/
/*! exports provided: RecipesImagery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RecipesImagery\", function() { return RecipesImagery; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _RecipesImagery_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RecipesImagery.module.css */ \"./RecipesImagery.module.css\");\n/* harmony import */ var _RecipesImagery_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_RecipesImagery_module_css__WEBPACK_IMPORTED_MODULE_3__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nvar RenderListItem = function RenderListItem(_ref) {\n  var items = _ref.items;\n  var slots = new Array(4).fill(null);\n  return slots.map(function (slot, index) {\n    var image = items[index];\n    return (\n      /*#__PURE__*/\n      // eslint-disable-next-line react/no-array-index-key\n      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        className: _RecipesImagery_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.listItem,\n        key: index\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _RecipesImagery_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.listItemContent\n      }, image && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: image.src,\n        alt: image.alt,\n        className: _RecipesImagery_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.image\n      })))\n    );\n  });\n};\n\nvar RecipesImagery = function RecipesImagery(_ref2) {\n  var items = _ref2.items,\n      is2x2 = _ref2.is2x2;\n  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()(_RecipesImagery_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.list, _defineProperty({}, _RecipesImagery_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.is2x2, is2x2));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n    className: classes\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RenderListItem, {\n    items: items\n  }));\n};\n\nRecipesImagery.propTypes = {\n  items: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({\n    src: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n    alt: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired\n  })),\n  is2x2: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool\n};\nRecipesImagery.defaultProps = {\n  items: [],\n  is2x2: false\n};\n\n\n//# sourceURL=webpack:///./src/components/RecipesImagery/RecipesImagery.logic.js?");

/***/ }),

/***/ "./src/components/RecipesImagery/index.js":
/*!************************************************!*\
  !*** ./src/components/RecipesImagery/index.js ***!
  \************************************************/
/*! exports provided: RecipesImagery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _RecipesImagery_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RecipesImagery.logic */ \"./src/components/RecipesImagery/RecipesImagery.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"RecipesImagery\", function() { return _RecipesImagery_logic__WEBPACK_IMPORTED_MODULE_0__[\"RecipesImagery\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/RecipesImagery/index.js?");

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