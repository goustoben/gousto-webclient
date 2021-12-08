(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Item"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Item", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Item"), require("prop-types"), require("react")) : factory(root["./Item"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Item__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/ItemExpandable/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../Item":
/*!*************************!*\
  !*** external "./Item" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Item__;\n\n//# sourceURL=webpack:///external_%22./Item%22?");

/***/ }),

/***/ "./src/components/ItemExpandable/ItemExpandable.logic.js":
/*!***************************************************************!*\
  !*** ./src/components/ItemExpandable/ItemExpandable.logic.js ***!
  \***************************************************************/
/*! exports provided: ItemExpandable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ItemExpandable\", function() { return ItemExpandable; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ItemExpandable_presentation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ItemExpandable.presentation */ \"./src/components/ItemExpandable/ItemExpandable.presentation.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node]).isRequired,\n  isHiddenOnMobile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  isLabelHeading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  trackClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func\n};\nvar defaultProps = {\n  isHiddenOnMobile: false,\n  isLabelHeading: false,\n  trackClick: function trackClick() {}\n};\n\nvar ItemExpandable = /*#__PURE__*/function (_PureComponent) {\n  _inherits(ItemExpandable, _PureComponent);\n\n  var _super = _createSuper(ItemExpandable);\n\n  function ItemExpandable(props) {\n    var _this;\n\n    _classCallCheck(this, ItemExpandable);\n\n    _this = _super.call(this, props);\n\n    _defineProperty(_assertThisInitialized(_this), \"toggleContent\", function () {\n      _this.setState(function (prevState) {\n        return {\n          isExpanded: !prevState.isExpanded\n        };\n      });\n    });\n\n    _this.state = {\n      isExpanded: false\n    };\n    return _this;\n  }\n\n  _createClass(ItemExpandable, [{\n    key: \"render\",\n    value: function render() {\n      var _this$props = this.props,\n          children = _this$props.children,\n          isHiddenOnMobile = _this$props.isHiddenOnMobile,\n          label = _this$props.label,\n          trackClick = _this$props.trackClick,\n          isLabelHeading = _this$props.isLabelHeading;\n      var isExpanded = this.state.isExpanded;\n      var currentChildren = isExpanded ? children : null;\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ItemExpandable_presentation__WEBPACK_IMPORTED_MODULE_2__[\"ItemExpandablePresentation\"], {\n        canExpand: true,\n        isExpanded: isExpanded,\n        isHiddenOnMobile: isHiddenOnMobile,\n        label: label,\n        isLabelHeading: isLabelHeading,\n        trackClick: trackClick,\n        onClick: this.toggleContent\n      }, currentChildren);\n    }\n  }]);\n\n  return ItemExpandable;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"PureComponent\"]);\n\nItemExpandable.propTypes = propTypes;\nItemExpandable.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/ItemExpandable/ItemExpandable.logic.js?");

/***/ }),

/***/ "./src/components/ItemExpandable/ItemExpandable.presentation.js":
/*!**********************************************************************!*\
  !*** ./src/components/ItemExpandable/ItemExpandable.presentation.js ***!
  \**********************************************************************/
/*! exports provided: ItemExpandablePresentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ItemExpandablePresentation\", function() { return ItemExpandablePresentation; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Item */ \"../Item\");\n/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Item__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar propTypes = {\n  canExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node]),\n  isExpanded: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,\n  isHiddenOnMobile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  isLabelHeading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  trackClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func\n};\nvar defaultProps = {\n  children: null,\n  isHiddenOnMobile: false,\n  isLabelHeading: false,\n  trackClick: function trackClick() {}\n};\n\nvar ItemExpandablePresentation = function ItemExpandablePresentation(_ref) {\n  var canExpand = _ref.canExpand,\n      children = _ref.children,\n      isExpanded = _ref.isExpanded,\n      isHiddenOnMobile = _ref.isHiddenOnMobile,\n      label = _ref.label,\n      isLabelHeading = _ref.isLabelHeading,\n      onClick = _ref.onClick,\n      trackClick = _ref.trackClick;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Item__WEBPACK_IMPORTED_MODULE_2__[\"Item\"], {\n    canExpand: canExpand,\n    isExpanded: isExpanded,\n    isHiddenOnMobile: isHiddenOnMobile,\n    label: label,\n    isLabelHeading: isLabelHeading,\n    onClick: onClick,\n    trackClick: trackClick\n  }), children);\n};\n\nItemExpandablePresentation.propTypes = propTypes;\nItemExpandablePresentation.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/ItemExpandable/ItemExpandable.presentation.js?");

/***/ }),

/***/ "./src/components/ItemExpandable/index.js":
/*!************************************************!*\
  !*** ./src/components/ItemExpandable/index.js ***!
  \************************************************/
/*! exports provided: ItemExpandable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ItemExpandable_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemExpandable.logic */ \"./src/components/ItemExpandable/ItemExpandable.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ItemExpandable\", function() { return _ItemExpandable_logic__WEBPACK_IMPORTED_MODULE_0__[\"ItemExpandable\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/ItemExpandable/index.js?");

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