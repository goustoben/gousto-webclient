(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./HeaderNavExtendedItemLink"), require("./HeaderNavExtendedSublist"), require("./LayoutPageWrapper"), require("./Header.module.css"), require("./HeaderNavExtendedList.module.css"), require("./HeaderNavList.module.css"), require("classnames"), require("./design-language/media/logo.svg"), require("./gousto-config/index.js"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./HeaderNavExtendedItemLink", "./HeaderNavExtendedSublist", "./LayoutPageWrapper", "./Header.module.css", "./HeaderNavExtendedList.module.css", "./HeaderNavList.module.css", "classnames", "./design-language/media/logo.svg", "./gousto-config/index.js", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./HeaderNavExtendedItemLink"), require("./HeaderNavExtendedSublist"), require("./LayoutPageWrapper"), require("./Header.module.css"), require("./HeaderNavExtendedList.module.css"), require("./HeaderNavList.module.css"), require("classnames"), require("./design-language/media/logo.svg"), require("./gousto-config/index.js"), require("prop-types"), require("react")) : factory(root["./HeaderNavExtendedItemLink"], root["./HeaderNavExtendedSublist"], root["./LayoutPageWrapper"], root["./Header.module.css"], root["./HeaderNavExtendedList.module.css"], root["./HeaderNavList.module.css"], root["classnames"], root["./design-language/media/logo.svg"], root["./gousto-config/index.js"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__HeaderNavExtendedItemLink__, __WEBPACK_EXTERNAL_MODULE__HeaderNavExtendedSublist__, __WEBPACK_EXTERNAL_MODULE__LayoutPageWrapper__, __WEBPACK_EXTERNAL_MODULE__Header_module_css__, __WEBPACK_EXTERNAL_MODULE__HeaderNavExtendedList_module_css__, __WEBPACK_EXTERNAL_MODULE__HeaderNavList_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_design_language_media_logo_svg__, __WEBPACK_EXTERNAL_MODULE_gousto_config__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Header/index.js");
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

/***/ "../LayoutPageWrapper":
/*!**************************************!*\
  !*** external "./LayoutPageWrapper" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__LayoutPageWrapper__;\n\n//# sourceURL=webpack:///external_%22./LayoutPageWrapper%22?");

/***/ }),

/***/ "./Header.module.css":
/*!**************************************!*\
  !*** external "./Header.module.css" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Header_module_css__;\n\n//# sourceURL=webpack:///external_%22./Header.module.css%22?");

/***/ }),

/***/ "./HeaderNavExtendedList.module.css":
/*!*****************************************************!*\
  !*** external "./HeaderNavExtendedList.module.css" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__HeaderNavExtendedList_module_css__;\n\n//# sourceURL=webpack:///external_%22./HeaderNavExtendedList.module.css%22?");

/***/ }),

/***/ "./HeaderNavList.module.css":
/*!*********************************************!*\
  !*** external "./HeaderNavList.module.css" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__HeaderNavList_module_css__;\n\n//# sourceURL=webpack:///external_%22./HeaderNavList.module.css%22?");

/***/ }),

/***/ "./src/components/Header/Header.logic.js":
/*!***********************************************!*\
  !*** ./src/components/Header/Header.logic.js ***!
  \***********************************************/
/*! exports provided: Header, NAVIGATION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Header\", function() { return Header; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NAVIGATION\", function() { return NAVIGATION; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var design_language_media_logo_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! design-language/media/logo.svg */ \"design-language/media/logo.svg\");\n/* harmony import */ var design_language_media_logo_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(design_language_media_logo_svg__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var gousto_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gousto-config */ \"gousto-config\");\n/* harmony import */ var gousto_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(gousto_config__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Header.module.css */ \"./Header.module.css\");\n/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Header_module_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _LayoutPageWrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../LayoutPageWrapper */ \"../LayoutPageWrapper\");\n/* harmony import */ var _LayoutPageWrapper__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_LayoutPageWrapper__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _HeaderNavList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HeaderNavList */ \"./src/components/Header/HeaderNavList/index.js\");\n/* harmony import */ var _HeaderNavExtendedList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HeaderNavExtendedList */ \"./src/components/Header/HeaderNavExtendedList/index.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\nvar goustoWebclient = gousto_config__WEBPACK_IMPORTED_MODULE_4__[\"routes\"].goustoWebclient;\nvar NAVIGATION = {\n  LOGGED_OUT_ITEMS: ['home', 'boxPrices', 'chooseRecipes', 'sustainability', 'help'],\n  LOGGED_OUT_ITEMS_EXTENDED: {\n    home: ['boxPrices', 'chooseRecipes', 'sustainability', 'help']\n  },\n  LOGGED_IN_ITEMS: ['home', 'chooseRecipes', 'freeFood', 'sustainability', 'help', 'myGousto'],\n  LOGGED_IN_ITEMS_EXTENDED: {\n    myGousto: ['deliveries', 'subscription', 'details', 'freeFood', 'rateMyRecipes'],\n    home: ['chooseRecipes', 'sustainability', 'help']\n  }\n};\n\nvar Header = /*#__PURE__*/function (_Component) {\n  _inherits(Header, _Component);\n\n  var _super = _createSuper(Header);\n\n  function Header(props) {\n    var _this;\n\n    _classCallCheck(this, Header);\n\n    _this = _super.call(this, props);\n\n    _defineProperty(_assertThisInitialized(_this), \"toggleExtendedNavigationVisibility\", function () {\n      var isExtendedNavigationVisible = _this.state.isExtendedNavigationVisible;\n\n      _this.setState({\n        isExtendedNavigationVisible: !isExtendedNavigationVisible\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"convertMenuItemsToRoute\", function (items) {\n      return items.map(function (item) {\n        return goustoWebclient[item];\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"convertExtendedItemsToRoute\", function (items) {\n      var topItems = Object.keys(items);\n      var extendedMenu = topItems.map(function (topItem) {\n        var result = goustoWebclient[topItem];\n        result.subItems = _this.convertMenuItemsToRoute(items[topItem]);\n        return result;\n      });\n      return extendedMenu;\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"renderHeaderNavListsAndCTA\", function () {\n      var _this$props = _this.props,\n          hasDataTracking = _this$props.hasDataTracking,\n          isAuthenticated = _this$props.isAuthenticated;\n      var isExtendedNavigationVisible = _this.state.isExtendedNavigationVisible;\n\n      var navListItems = _this.convertMenuItemsToRoute(isAuthenticated ? NAVIGATION.LOGGED_IN_ITEMS : NAVIGATION.LOGGED_OUT_ITEMS);\n\n      var navExtendedListItems = _this.convertExtendedItemsToRoute(isAuthenticated ? NAVIGATION.LOGGED_IN_ITEMS_EXTENDED : NAVIGATION.LOGGED_OUT_ITEMS_EXTENDED);\n\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        type: \"button\",\n        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.navExtendedOpenCTA, _defineProperty({}, _Header_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.isExtended, isExtendedNavigationVisible)),\n        onClick: _this.toggleExtendedNavigationVisibility\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HeaderNavList__WEBPACK_IMPORTED_MODULE_7__[\"HeaderNavList\"], {\n        items: navListItems,\n        isAuthenticated: isAuthenticated,\n        hasDataTracking: hasDataTracking\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HeaderNavExtendedList__WEBPACK_IMPORTED_MODULE_8__[\"HeaderNavExtendedList\"], {\n        items: navExtendedListItems,\n        isExtendedNavigationVisible: isExtendedNavigationVisible,\n        isAuthenticated: isAuthenticated,\n        hasDataTracking: hasDataTracking\n      }));\n    });\n\n    _this.state = {\n      isExtendedNavigationVisible: false\n    };\n    return _this;\n  }\n\n  _createClass(Header, [{\n    key: \"render\",\n    value: function render() {\n      var isNavEnabled = this.props.isNavEnabled;\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"header\", {\n        className: _Header_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.wrapper\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LayoutPageWrapper__WEBPACK_IMPORTED_MODULE_6__[\"LayoutPageWrapper\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _Header_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.content\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n        href: \"/\",\n        className: _Header_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.logo\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: design_language_media_logo_svg__WEBPACK_IMPORTED_MODULE_3___default.a,\n        alt: \"gousto\"\n      })), isNavEnabled && this.renderHeaderNavListsAndCTA())));\n    }\n  }]);\n\n  return Header;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nHeader.propTypes = {\n  /**\n   * Adds `data-tracking-action` and `data-tracking-property` to some items,\n   * which works in the clients which have enabled that way of tracking.\n   */\n  hasDataTracking: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,\n\n  /**\n   * Passing `isNavEnabled` in as false will disable the entire navigation as\n   * seen in the signup wizard.\n   */\n  isAuthenticated: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,\n  isNavEnabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool\n};\nHeader.defaultProps = {\n  hasDataTracking: false,\n  isNavEnabled: true\n};\n\n\n//# sourceURL=webpack:///./src/components/Header/Header.logic.js?");

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

/***/ "./src/components/Header/index.js":
/*!****************************************!*\
  !*** ./src/components/Header/index.js ***!
  \****************************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Header_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header.logic */ \"./src/components/Header/Header.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Header\", function() { return _Header_logic__WEBPACK_IMPORTED_MODULE_0__[\"Header\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Header/index.js?");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_classnames__;\n\n//# sourceURL=webpack:///external_%22classnames%22?");

/***/ }),

/***/ "design-language/media/logo.svg":
/*!***************************************************!*\
  !*** external "./design-language/media/logo.svg" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_design_language_media_logo_svg__;\n\n//# sourceURL=webpack:///external_%22./design-language/media/logo.svg%22?");

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