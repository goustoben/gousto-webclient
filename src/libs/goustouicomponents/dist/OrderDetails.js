(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./OrderState"), require("./RecipesImagery"), require("./OrderDetails.module.css"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./OrderState", "./RecipesImagery", "./OrderDetails.module.css", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./OrderState"), require("./RecipesImagery"), require("./OrderDetails.module.css"), require("prop-types"), require("react")) : factory(root["./OrderState"], root["./RecipesImagery"], root["./OrderDetails.module.css"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__OrderState__, __WEBPACK_EXTERNAL_MODULE__RecipesImagery__, __WEBPACK_EXTERNAL_MODULE__OrderDetails_module_css__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/OrderDetails/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../OrderState":
/*!*******************************!*\
  !*** external "./OrderState" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__OrderState__;\n\n//# sourceURL=webpack:///external_%22./OrderState%22?");

/***/ }),

/***/ "../RecipesImagery":
/*!***********************************!*\
  !*** external "./RecipesImagery" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__RecipesImagery__;\n\n//# sourceURL=webpack:///external_%22./RecipesImagery%22?");

/***/ }),

/***/ "./OrderDetails.module.css":
/*!********************************************!*\
  !*** external "./OrderDetails.module.css" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__OrderDetails_module_css__;\n\n//# sourceURL=webpack:///external_%22./OrderDetails.module.css%22?");

/***/ }),

/***/ "./src/components/OrderDetails/OrderDetails.logic.js":
/*!***********************************************************!*\
  !*** ./src/components/OrderDetails/OrderDetails.logic.js ***!
  \***********************************************************/
/*! exports provided: OrderDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OrderDetails\", function() { return OrderDetails; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _OrderState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../OrderState */ \"../OrderState\");\n/* harmony import */ var _OrderState__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_OrderState__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _RecipesImagery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../RecipesImagery */ \"../RecipesImagery\");\n/* harmony import */ var _RecipesImagery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_RecipesImagery__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _utils_timeFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/timeFormat */ \"./src/utils/timeFormat.js\");\n/* harmony import */ var _OrderDetails_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./OrderDetails.module.css */ \"./OrderDetails.module.css\");\n/* harmony import */ var _OrderDetails_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_OrderDetails_module_css__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nvar OrderDetails = function OrderDetails(_ref) {\n  var deliveryDate = _ref.deliveryDate,\n      deliveryStartTime = _ref.deliveryStartTime,\n      deliveryEndTime = _ref.deliveryEndTime,\n      orderState = _ref.orderState,\n      price = _ref.price,\n      recipeImages = _ref.recipeImages;\n  var formattedPrice = new Intl.NumberFormat('en-GB', {\n    style: 'currency',\n    currency: 'GBP',\n    maximumFractionDigits: 2\n  }).format(Number(price));\n  var deliveryTimeToDisplay = \"\".concat(Object(_utils_timeFormat__WEBPACK_IMPORTED_MODULE_4__[\"formatTimeToHour\"])(deliveryStartTime), \" - \").concat(Object(_utils_timeFormat__WEBPACK_IMPORTED_MODULE_4__[\"formatTimeToHour\"])(deliveryEndTime));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _OrderDetails_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.title\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, deliveryDate), price && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    \"data-testing\": \"price\"\n  }, formattedPrice)), orderState && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _OrderDetails_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.spacing\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OrderState__WEBPACK_IMPORTED_MODULE_2__[\"OrderState\"], {\n    state: orderState\n  })), deliveryStartTime && deliveryEndTime && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _OrderDetails_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.spacing,\n    \"data-testing\": \"delivery-time\"\n  }, deliveryTimeToDisplay), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _OrderDetails_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.spacing\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RecipesImagery__WEBPACK_IMPORTED_MODULE_3__[\"RecipesImagery\"], {\n    items: recipeImages\n  })));\n};\n\nOrderDetails.propTypes = {\n  deliveryDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  deliveryStartTime: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  deliveryEndTime: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  orderState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  price: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  recipeImages: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({\n    alt: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n    src: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string\n  }))\n};\nOrderDetails.defaultProps = {\n  deliveryDate: '',\n  deliveryStartTime: '',\n  deliveryEndTime: '',\n  orderState: '',\n  price: '',\n  recipeImages: []\n};\n\n\n//# sourceURL=webpack:///./src/components/OrderDetails/OrderDetails.logic.js?");

/***/ }),

/***/ "./src/components/OrderDetails/index.js":
/*!**********************************************!*\
  !*** ./src/components/OrderDetails/index.js ***!
  \**********************************************/
/*! exports provided: OrderDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _OrderDetails_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderDetails.logic */ \"./src/components/OrderDetails/OrderDetails.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"OrderDetails\", function() { return _OrderDetails_logic__WEBPACK_IMPORTED_MODULE_0__[\"OrderDetails\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/OrderDetails/index.js?");

/***/ }),

/***/ "./src/utils/timeFormat.js":
/*!*********************************!*\
  !*** ./src/utils/timeFormat.js ***!
  \*********************************/
/*! exports provided: formatTimeToHour */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatTimeToHour\", function() { return formatTimeToHour; });\nvar createDateFromTime = function createDateFromTime(time) {\n  return new Date(\"1970-01-01T\".concat(time, \"Z\"));\n};\n\nvar formatFor12Hour = {\n  timeZone: 'UTC',\n  hour12: true,\n  hour: 'numeric'\n};\n\nvar roundDateToClosestHour = function roundDateToClosestHour(date) {\n  date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));\n  date.setMinutes(0, 0, 0);\n  return date;\n};\n\nvar formatTimeToHour = function formatTimeToHour(time) {\n  return roundDateToClosestHour(createDateFromTime(time)).toLocaleTimeString('en-US', formatFor12Hour).toLowerCase().replace(' ', '');\n};\n\n//# sourceURL=webpack:///./src/utils/timeFormat.js?");

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