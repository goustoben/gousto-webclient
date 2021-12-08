(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./CTA"), require("./LayoutContentWrapper"), require("./LayoutPageWrapper"), require("./CookieBanner.module.css"), require("./gousto-config/index.js"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./CTA", "./LayoutContentWrapper", "./LayoutPageWrapper", "./CookieBanner.module.css", "./gousto-config/index.js", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./CTA"), require("./LayoutContentWrapper"), require("./LayoutPageWrapper"), require("./CookieBanner.module.css"), require("./gousto-config/index.js"), require("prop-types"), require("react")) : factory(root["./CTA"], root["./LayoutContentWrapper"], root["./LayoutPageWrapper"], root["./CookieBanner.module.css"], root["./gousto-config/index.js"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__CTA__, __WEBPACK_EXTERNAL_MODULE__LayoutContentWrapper__, __WEBPACK_EXTERNAL_MODULE__LayoutPageWrapper__, __WEBPACK_EXTERNAL_MODULE__CookieBanner_module_css__, __WEBPACK_EXTERNAL_MODULE_gousto_config__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/CookieBanner/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../CTA":
/*!************************!*\
  !*** external "./CTA" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__CTA__;\n\n//# sourceURL=webpack:///external_%22./CTA%22?");

/***/ }),

/***/ "../LayoutContentWrapper":
/*!*****************************************!*\
  !*** external "./LayoutContentWrapper" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__LayoutContentWrapper__;\n\n//# sourceURL=webpack:///external_%22./LayoutContentWrapper%22?");

/***/ }),

/***/ "../LayoutPageWrapper":
/*!**************************************!*\
  !*** external "./LayoutPageWrapper" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__LayoutPageWrapper__;\n\n//# sourceURL=webpack:///external_%22./LayoutPageWrapper%22?");

/***/ }),

/***/ "./CookieBanner.module.css":
/*!********************************************!*\
  !*** external "./CookieBanner.module.css" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__CookieBanner_module_css__;\n\n//# sourceURL=webpack:///external_%22./CookieBanner.module.css%22?");

/***/ }),

/***/ "./src/components/CookieBanner/CookieBanner.logic.js":
/*!***********************************************************!*\
  !*** ./src/components/CookieBanner/CookieBanner.logic.js ***!
  \***********************************************************/
/*! exports provided: CookieBanner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CookieBanner\", function() { return CookieBanner; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var gousto_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gousto-config */ \"gousto-config\");\n/* harmony import */ var gousto_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gousto_config__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _LayoutPageWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../LayoutPageWrapper */ \"../LayoutPageWrapper\");\n/* harmony import */ var _LayoutPageWrapper__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_LayoutPageWrapper__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _LayoutContentWrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../LayoutContentWrapper */ \"../LayoutContentWrapper\");\n/* harmony import */ var _LayoutContentWrapper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_LayoutContentWrapper__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _CTA__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../CTA */ \"../CTA\");\n/* harmony import */ var _CTA__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_CTA__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _CookieBanner_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CookieBanner.module.css */ \"./CookieBanner.module.css\");\n/* harmony import */ var _CookieBanner_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_CookieBanner_module_css__WEBPACK_IMPORTED_MODULE_6__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\nvar CookieBanner = /*#__PURE__*/function (_React$PureComponent) {\n  _inherits(CookieBanner, _React$PureComponent);\n\n  var _super = _createSuper(CookieBanner);\n\n  function CookieBanner(props) {\n    var _this;\n\n    _classCallCheck(this, CookieBanner);\n\n    _this = _super.call(this, props);\n\n    _defineProperty(_assertThisInitialized(_this), \"acceptCookiePolicy\", function () {\n      window.localStorage.setItem('isCookieBannerAccepted', true);\n\n      _this.setState({\n        isCookieBannerAccepted: true\n      });\n\n      var onCookieBannerDismissed = _this.props.onCookieBannerDismissed;\n\n      if (onCookieBannerDismissed) {\n        onCookieBannerDismissed();\n      }\n    });\n\n    var isCookieBannerAccepted = window.localStorage.getItem('isCookieBannerAccepted') === 'true';\n    _this.state = {\n      isCookieBannerAccepted: isCookieBannerAccepted\n    };\n    return _this;\n  }\n\n  _createClass(CookieBanner, [{\n    key: \"render\",\n    value: function render() {\n      var testingSelector = this.props.testingSelector;\n      var isCookieBannerAccepted = this.state.isCookieBannerAccepted;\n      var _routes$goustoWebclie = gousto_config__WEBPACK_IMPORTED_MODULE_2__[\"routes\"].goustoWebclient.privacyPolicy,\n          url = _routes$goustoWebclie.url,\n          label = _routes$goustoWebclie.label;\n      return !isCookieBannerAccepted && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _CookieBanner_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.wrapper,\n        \"data-testing\": testingSelector\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LayoutPageWrapper__WEBPACK_IMPORTED_MODULE_3__[\"LayoutPageWrapper\"], {\n        padding: \"large-screens-only\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LayoutContentWrapper__WEBPACK_IMPORTED_MODULE_4__[\"LayoutContentWrapper\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _CookieBanner_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.wrapperContent\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n        className: _CookieBanner_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.copy\n      }, \"We use cookies. By continuing to browse the site you are agreeing to our use of cookies.\\xA0\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n        className: _CookieBanner_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.link,\n        href: url\n      }, label)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _CookieBanner_module_css__WEBPACK_IMPORTED_MODULE_6___default.a.cta\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CTA__WEBPACK_IMPORTED_MODULE_5__[\"CTA\"], {\n        variant: \"secondary\",\n        isDarkTheme: true,\n        size: \"small\",\n        onClick: this.acceptCookiePolicy\n      }, \"OK, I Agree\"))))));\n    }\n  }]);\n\n  return CookieBanner;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);\n\nCookieBanner.propTypes = {\n  testingSelector: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  onCookieBannerDismissed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func\n};\nCookieBanner.defaultProps = {\n  testingSelector: null,\n  onCookieBannerDismissed: null\n};\n\n\n//# sourceURL=webpack:///./src/components/CookieBanner/CookieBanner.logic.js?");

/***/ }),

/***/ "./src/components/CookieBanner/index.js":
/*!**********************************************!*\
  !*** ./src/components/CookieBanner/index.js ***!
  \**********************************************/
/*! exports provided: CookieBanner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CookieBanner_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CookieBanner.logic */ \"./src/components/CookieBanner/CookieBanner.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CookieBanner\", function() { return _CookieBanner_logic__WEBPACK_IMPORTED_MODULE_0__[\"CookieBanner\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/CookieBanner/index.js?");

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