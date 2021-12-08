(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Rating"), require("./TimeIndicator"), require("./RecipeCard.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Rating", "./TimeIndicator", "./RecipeCard.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Rating"), require("./TimeIndicator"), require("./RecipeCard.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./Rating"], root["./TimeIndicator"], root["./RecipeCard.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Rating__, __WEBPACK_EXTERNAL_MODULE__TimeIndicator__, __WEBPACK_EXTERNAL_MODULE__RecipeCard_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/RecipeCard/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../Rating":
/*!***************************!*\
  !*** external "./Rating" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Rating__;\n\n//# sourceURL=webpack:///external_%22./Rating%22?");

/***/ }),

/***/ "../TimeIndicator":
/*!**********************************!*\
  !*** external "./TimeIndicator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__TimeIndicator__;\n\n//# sourceURL=webpack:///external_%22./TimeIndicator%22?");

/***/ }),

/***/ "./RecipeCard.module.css":
/*!******************************************!*\
  !*** external "./RecipeCard.module.css" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__RecipeCard_module_css__;\n\n//# sourceURL=webpack:///external_%22./RecipeCard.module.css%22?");

/***/ }),

/***/ "./src/components/RecipeCard/RecipeCard.logic.js":
/*!*******************************************************!*\
  !*** ./src/components/RecipeCard/RecipeCard.logic.js ***!
  \*******************************************************/
/*! exports provided: RecipeCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RecipeCard\", function() { return RecipeCard; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Rating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Rating */ \"../Rating\");\n/* harmony import */ var _Rating__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Rating__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _TimeIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../TimeIndicator */ \"../TimeIndicator\");\n/* harmony import */ var _TimeIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_TimeIndicator__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _utils_imageUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/imageUtils */ \"./src/utils/imageUtils.js\");\n/* harmony import */ var _RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RecipeCard.module.css */ \"./RecipeCard.module.css\");\n/* harmony import */ var _RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\nvar RecipeCard = function RecipeCard(_ref) {\n  var _classNames;\n\n  var title = _ref.title,\n      media = _ref.media,\n      isResizable = _ref.isResizable,\n      rating = _ref.rating,\n      cookingTime = _ref.cookingTime,\n      hasHoverEffect = _ref.hasHoverEffect,\n      hasMargin = _ref.hasMargin,\n      hasRectangularImageOnMobile = _ref.hasRectangularImageOnMobile,\n      fitHeight = _ref.fitHeight;\n\n  var _ref2 = rating || {},\n      amountOfReviews = _ref2.amountOfReviews,\n      average = _ref2.average,\n      size = _ref2.size;\n\n  var srcSet = Object(_utils_imageUtils__WEBPACK_IMPORTED_MODULE_5__[\"transformSrcSet\"])(media);\n  var imageSrc = media[media.length - 1].url;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.recipeCard, (_classNames = {}, _defineProperty(_classNames, _RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.isResizable, isResizable), _defineProperty(_classNames, _RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.hasHoverEffect, hasHoverEffect), _defineProperty(_classNames, _RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.hasMargin, hasMargin), _defineProperty(_classNames, _RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.fitHeight, fitHeight), _classNames))\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.imageContainer, _defineProperty({}, _RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.hasRectangularImageOnMobile, hasRectangularImageOnMobile))\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    className: _RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.recipeImage,\n    src: imageSrc,\n    alt: title,\n    srcSet: srcSet\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.timeContainer\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TimeIndicator__WEBPACK_IMPORTED_MODULE_4__[\"TimeIndicator\"], {\n    time: cookingTime\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cardDescription\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    className: _RecipeCard_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.recipeTitle\n  }, title), amountOfReviews && average ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Rating__WEBPACK_IMPORTED_MODULE_3__[\"Rating\"], {\n    amountOfReviews: amountOfReviews,\n    average: average,\n    size: size\n  }) : null));\n};\n\nRecipeCard.propTypes = {\n  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  media: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({\n    url: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n    width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired\n  })).isRequired,\n  rating: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({\n    amountOfReviews: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,\n    average: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,\n    size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['Medium', 'Large'])\n  }),\n  cookingTime: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired,\n  isResizable: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,\n  hasHoverEffect: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  hasMargin: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  hasRectangularImageOnMobile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  fitHeight: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool\n};\nRecipeCard.defaultProps = {\n  rating: null,\n  hasHoverEffect: false,\n  hasMargin: true,\n  hasRectangularImageOnMobile: false,\n  fitHeight: false\n};\n\n\n//# sourceURL=webpack:///./src/components/RecipeCard/RecipeCard.logic.js?");

/***/ }),

/***/ "./src/components/RecipeCard/index.js":
/*!********************************************!*\
  !*** ./src/components/RecipeCard/index.js ***!
  \********************************************/
/*! exports provided: RecipeCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _RecipeCard_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RecipeCard.logic */ \"./src/components/RecipeCard/RecipeCard.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"RecipeCard\", function() { return _RecipeCard_logic__WEBPACK_IMPORTED_MODULE_0__[\"RecipeCard\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/RecipeCard/index.js?");

/***/ }),

/***/ "./src/utils/imageUtils.js":
/*!*********************************!*\
  !*** ./src/utils/imageUtils.js ***!
  \*********************************/
/*! exports provided: transformSrcSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transformSrcSet\", function() { return transformSrcSet; });\nvar transformSrcSet = function transformSrcSet(media) {\n  return media.map(function (_ref) {\n    var url = _ref.url,\n        width = _ref.width;\n    return \"\".concat(url, \" \").concat(width, \"w\");\n  }).join(', ');\n};\n\n//# sourceURL=webpack:///./src/utils/imageUtils.js?");

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