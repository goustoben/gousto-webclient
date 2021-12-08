(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Rating.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Rating.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Rating.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./Rating.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Rating_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Rating/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Rating.module.css":
/*!**************************************!*\
  !*** external "./Rating.module.css" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Rating_module_css__;\n\n//# sourceURL=webpack:///external_%22./Rating.module.css%22?");

/***/ }),

/***/ "./src/components/Rating/Rating.logic.js":
/*!***********************************************!*\
  !*** ./src/components/Rating/Rating.logic.js ***!
  \***********************************************/
/*! exports provided: Rating */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Rating\", function() { return Rating; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Rating_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Rating.module.css */ \"./Rating.module.css\");\n/* harmony import */ var _Rating_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Rating_module_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nvar checkPositiveNumbers = function checkPositiveNumbers(value) {\n  if (value < 0) {\n    return 0;\n  }\n\n  return value;\n};\n\nvar createStarClassnames = function createStarClassnames(average) {\n  var MAX_NUMBER_OF_STARS = 5;\n  var roundedAverage = Math.round(average);\n  var stars = Array(MAX_NUMBER_OF_STARS).fill('starEmpty');\n\n  if (average <= 0) {\n    return stars;\n  }\n\n  if (average >= MAX_NUMBER_OF_STARS) {\n    return stars.fill('starFull');\n  }\n\n  return stars.map(function (star, index) {\n    var starValue = index + 1;\n\n    if (starValue <= average) {\n      stars[index] = 'starFull';\n      return stars[index];\n    }\n\n    if (starValue === roundedAverage) {\n      stars[index] = 'starHalf';\n      return stars[index];\n    }\n\n    return stars[index];\n  });\n};\n\nvar Rating = function Rating(_ref) {\n  var amountOfReviews = _ref.amountOfReviews,\n      average = _ref.average,\n      size = _ref.size;\n  var stars = createStarClassnames(average);\n  var reviews = checkPositiveNumbers(amountOfReviews);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Rating_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.ratingContainer\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Rating_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.starsContainer, _Rating_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[\"starsContainer\".concat(size)])\n  }, stars.map(function (star, i) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      key: \"\".concat(star + i),\n      className: _Rating_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[star]\n    });\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Rating_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.reviews, _Rating_module_css__WEBPACK_IMPORTED_MODULE_3___default.a[\"reviews\".concat(size)])\n  }, reviews, ' ', \"reviews\"));\n};\n\nRating.propTypes = {\n  amountOfReviews: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired,\n  average: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired,\n  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['Medium', 'Large']).isRequired\n};\n\n\n//# sourceURL=webpack:///./src/components/Rating/Rating.logic.js?");

/***/ }),

/***/ "./src/components/Rating/index.js":
/*!****************************************!*\
  !*** ./src/components/Rating/index.js ***!
  \****************************************/
/*! exports provided: Rating */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Rating_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rating.logic */ \"./src/components/Rating/Rating.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Rating\", function() { return _Rating_logic__WEBPACK_IMPORTED_MODULE_0__[\"Rating\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Rating/index.js?");

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