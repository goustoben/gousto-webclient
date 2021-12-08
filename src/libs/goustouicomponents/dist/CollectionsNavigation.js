(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./CollectionsNavigation.module.css"), require("./CollectionsNavigationItem.module.css"), require("airbnb-prop-types"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./CollectionsNavigation.module.css", "./CollectionsNavigationItem.module.css", "airbnb-prop-types", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./CollectionsNavigation.module.css"), require("./CollectionsNavigationItem.module.css"), require("airbnb-prop-types"), require("classnames"), require("prop-types"), require("react")) : factory(root["./CollectionsNavigation.module.css"], root["./CollectionsNavigationItem.module.css"], root["airbnb-prop-types"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__CollectionsNavigation_module_css__, __WEBPACK_EXTERNAL_MODULE__CollectionsNavigationItem_module_css__, __WEBPACK_EXTERNAL_MODULE_airbnb_prop_types__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/CollectionsNavigation/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./CollectionsNavigation.module.css":
/*!*****************************************************!*\
  !*** external "./CollectionsNavigation.module.css" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__CollectionsNavigation_module_css__;\n\n//# sourceURL=webpack:///external_%22./CollectionsNavigation.module.css%22?");

/***/ }),

/***/ "./CollectionsNavigationItem.module.css":
/*!*********************************************************!*\
  !*** external "./CollectionsNavigationItem.module.css" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__CollectionsNavigationItem_module_css__;\n\n//# sourceURL=webpack:///external_%22./CollectionsNavigationItem.module.css%22?");

/***/ }),

/***/ "./src/components/CollectionsNavigation/CollectionsNavigation.logic.js":
/*!*****************************************************************************!*\
  !*** ./src/components/CollectionsNavigation/CollectionsNavigation.logic.js ***!
  \*****************************************************************************/
/*! exports provided: CollectionsNavigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CollectionsNavigation\", function() { return CollectionsNavigation; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var airbnb_prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! airbnb-prop-types */ \"airbnb-prop-types\");\n/* harmony import */ var airbnb_prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(airbnb_prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _CollectionsNavigation_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CollectionsNavigation.module.css */ \"./CollectionsNavigation.module.css\");\n/* harmony import */ var _CollectionsNavigation_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_CollectionsNavigation_module_css__WEBPACK_IMPORTED_MODULE_2__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar propTypes = {\n  children: airbnb_prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.componentWithName('CollectionsNavigationItem').isRequired\n};\n\nvar CollectionsNavigation = /*#__PURE__*/function (_Component) {\n  _inherits(CollectionsNavigation, _Component);\n\n  var _super = _createSuper(CollectionsNavigation);\n\n  function CollectionsNavigation(props) {\n    var _this;\n\n    _classCallCheck(this, CollectionsNavigation);\n\n    _this = _super.call(this, props);\n\n    _defineProperty(_assertThisInitialized(_this), \"setActive\", function (index) {\n      _this.setState({\n        activeElement: index\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"isActive\", function (index, isActive) {\n      var activeElement = _this.state.activeElement;\n\n      if (activeElement === null && isActive || activeElement === index) {\n        return true;\n      }\n\n      return false;\n    });\n\n    _this.state = {\n      activeElement: null\n    };\n    return _this;\n  }\n\n  _createClass(CollectionsNavigation, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var children = this.props.children;\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n        className: _CollectionsNavigation_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.listWrapper\n      }, react__WEBPACK_IMPORTED_MODULE_0__[\"Children\"].map(children, function (child, index) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n          className: _CollectionsNavigation_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.listItem\n        }, /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"cloneElement\"])(child, {\n          isActive: _this2.isActive(index, child.props.isActive),\n          index: index,\n          setActive: _this2.setActive\n        }));\n      })));\n    }\n  }]);\n\n  return CollectionsNavigation;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nCollectionsNavigation.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/CollectionsNavigation/CollectionsNavigation.logic.js?");

/***/ }),

/***/ "./src/components/CollectionsNavigation/CollectionsNavigationItem/CollectionsNavigationItem.logic.js":
/*!***********************************************************************************************************!*\
  !*** ./src/components/CollectionsNavigation/CollectionsNavigationItem/CollectionsNavigationItem.logic.js ***!
  \***********************************************************************************************************/
/*! exports provided: CollectionsNavigationItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CollectionsNavigationItem\", function() { return CollectionsNavigationItem; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _CollectionsNavigationItem_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CollectionsNavigationItem.module.css */ \"./CollectionsNavigationItem.module.css\");\n/* harmony import */ var _CollectionsNavigationItem_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_CollectionsNavigationItem_module_css__WEBPACK_IMPORTED_MODULE_3__);\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  index: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,\n  isActive: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  setActive: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func\n};\nvar defaultProps = {\n  index: null,\n  isActive: false,\n  setActive: function setActive() {}\n};\n\nvar CollectionsNavigationItem = function CollectionsNavigationItem(_ref) {\n  var children = _ref.children,\n      index = _ref.index,\n      isActive = _ref.isActive,\n      _onClick = _ref.onClick,\n      setActive = _ref.setActive;\n  var wrapperClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()(_CollectionsNavigationItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.item, _defineProperty({}, _CollectionsNavigationItem_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.isActive, isActive));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    className: wrapperClasses,\n    onClick: function onClick() {\n      _onClick();\n\n      setActive(index);\n    },\n    type: \"button\"\n  }, children);\n};\n\nCollectionsNavigationItem.defaultProps = defaultProps;\nCollectionsNavigationItem.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/CollectionsNavigation/CollectionsNavigationItem/CollectionsNavigationItem.logic.js?");

/***/ }),

/***/ "./src/components/CollectionsNavigation/CollectionsNavigationItem/index.js":
/*!*********************************************************************************!*\
  !*** ./src/components/CollectionsNavigation/CollectionsNavigationItem/index.js ***!
  \*********************************************************************************/
/*! exports provided: CollectionsNavigationItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CollectionsNavigationItem_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollectionsNavigationItem.logic */ \"./src/components/CollectionsNavigation/CollectionsNavigationItem/CollectionsNavigationItem.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CollectionsNavigationItem\", function() { return _CollectionsNavigationItem_logic__WEBPACK_IMPORTED_MODULE_0__[\"CollectionsNavigationItem\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/CollectionsNavigation/CollectionsNavigationItem/index.js?");

/***/ }),

/***/ "./src/components/CollectionsNavigation/index.js":
/*!*******************************************************!*\
  !*** ./src/components/CollectionsNavigation/index.js ***!
  \*******************************************************/
/*! exports provided: CollectionsNavigation, CollectionsNavigationItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CollectionsNavigation_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollectionsNavigation.logic */ \"./src/components/CollectionsNavigation/CollectionsNavigation.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CollectionsNavigation\", function() { return _CollectionsNavigation_logic__WEBPACK_IMPORTED_MODULE_0__[\"CollectionsNavigation\"]; });\n\n/* harmony import */ var _CollectionsNavigationItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CollectionsNavigationItem */ \"./src/components/CollectionsNavigation/CollectionsNavigationItem/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CollectionsNavigationItem\", function() { return _CollectionsNavigationItem__WEBPACK_IMPORTED_MODULE_1__[\"CollectionsNavigationItem\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./src/components/CollectionsNavigation/index.js?");

/***/ }),

/***/ "airbnb-prop-types":
/*!************************************!*\
  !*** external "airbnb-prop-types" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_airbnb_prop_types__;\n\n//# sourceURL=webpack:///external_%22airbnb-prop-types%22?");

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