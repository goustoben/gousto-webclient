(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./ExpandingText.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./ExpandingText.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./ExpandingText.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./ExpandingText.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__ExpandingText_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/ExpandingText/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ExpandingText.module.css":
/*!*********************************************!*\
  !*** external "./ExpandingText.module.css" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__ExpandingText_module_css__;\n\n//# sourceURL=webpack:///external_%22./ExpandingText.module.css%22?");

/***/ }),

/***/ "./src/components/ExpandingText/ExpandingText.logic.js":
/*!*************************************************************!*\
  !*** ./src/components/ExpandingText/ExpandingText.logic.js ***!
  \*************************************************************/
/*! exports provided: ExpandingText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ExpandingText\", function() { return ExpandingText; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils_prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/prop-types */ \"./src/utils/prop-types/index.js\");\n/* harmony import */ var _ExpandingText_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ExpandingText.module.css */ \"./ExpandingText.module.css\");\n/* harmony import */ var _ExpandingText_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ExpandingText_module_css__WEBPACK_IMPORTED_MODULE_4__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\nvar ExpandingText = /*#__PURE__*/function (_React$Component) {\n  _inherits(ExpandingText, _React$Component);\n\n  var _super = _createSuper(ExpandingText);\n\n  function ExpandingText() {\n    var _this;\n\n    _classCallCheck(this, ExpandingText);\n\n    _this = _super.call(this);\n    _this.onReadMoreClick = _this.onReadMoreClick.bind(_assertThisInitialized(_this));\n    _this.state = {\n      isExpanded: false\n    };\n    return _this;\n  }\n\n  _createClass(ExpandingText, [{\n    key: \"onReadMoreClick\",\n    value: function onReadMoreClick(e) {\n      e.preventDefault();\n      this.setState({\n        isExpanded: true\n      });\n    }\n  }, {\n    key: \"parseChunks\",\n    value: function parseChunks() {\n      var _this$props = this.props,\n          lines = _this$props.lines,\n          charsPerLine = _this$props.charsPerLine,\n          children = _this$props.children;\n      var cuttingPoints = [0].concat(_toConsumableArray(charsPerLine)).map(function (item) {\n        return item * lines;\n      });\n      var fullText = children.replace(/\\s/gi, ' ');\n      var slicedFullText = cuttingPoints.map(function (cuttingPoint, index) {\n        var beginningOfCut = cuttingPoints[index];\n        var endOfCut = cuttingPoints[index + 1];\n        return fullText.substring(beginningOfCut, endOfCut) || null;\n      }).filter(function (item) {\n        return item !== null;\n      });\n      return slicedFullText;\n    }\n  }, {\n    key: \"renderChunks\",\n    value: function renderChunks() {\n      var substrings = this.parseChunks();\n      var slicedElements = substrings.map(function (substring, index) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n          key: substring,\n          className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_ExpandingText_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.chunk, _ExpandingText_module_css__WEBPACK_IMPORTED_MODULE_4___default.a[\"chunk-\".concat(index)])\n        }, substring);\n      });\n\n      if (slicedElements.length > 1) {\n        slicedElements.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n          key: \"readMore\",\n          className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_ExpandingText_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.readMoreWrapButton, _ExpandingText_module_css__WEBPACK_IMPORTED_MODULE_4___default.a[\"readMoreWrapButtonChunk-\".concat(slicedElements.length)])\n        }, '… ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n          type: \"button\",\n          className: _ExpandingText_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.readMoreButton,\n          onClick: this.onReadMoreClick\n        }, \"Read more\")));\n      }\n\n      return slicedElements;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var isExpanded = this.state.isExpanded;\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_ExpandingText_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.readMoreWrapper, _defineProperty({}, _ExpandingText_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.isExpanded, isExpanded))\n      }, this.renderChunks());\n    }\n  }]);\n\n  return ExpandingText;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nExpandingText.propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  lines: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,\n  charsPerLine: _utils_prop_types__WEBPACK_IMPORTED_MODULE_3__[\"fourNumbersPropType\"]\n};\nExpandingText.defaultProps = {\n  lines: 3,\n  charsPerLine: [40, 55, 70, 95]\n};\n\n\n//# sourceURL=webpack:///./src/components/ExpandingText/ExpandingText.logic.js?");

/***/ }),

/***/ "./src/components/ExpandingText/index.js":
/*!***********************************************!*\
  !*** ./src/components/ExpandingText/index.js ***!
  \***********************************************/
/*! exports provided: ExpandingText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ExpandingText_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExpandingText.logic */ \"./src/components/ExpandingText/ExpandingText.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ExpandingText\", function() { return _ExpandingText_logic__WEBPACK_IMPORTED_MODULE_0__[\"ExpandingText\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/ExpandingText/index.js?");

/***/ }),

/***/ "./src/utils/prop-types/fourNumbersPropType.js":
/*!*****************************************************!*\
  !*** ./src/utils/prop-types/fourNumbersPropType.js ***!
  \*****************************************************/
/*! exports provided: fourNumbersPropType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fourNumbersPropType\", function() { return fourNumbersPropType; });\nfunction fourNumbersPropType(props, propName, componentName) {\n  // eslint-disable-next-line react/destructuring-assignment\n  var prop = props[propName];\n\n  if (!Array.isArray(prop) || prop.length !== 4 || !prop.every(Number.isInteger)) {\n    throw new Error(\"<\".concat(componentName, \"> \").concat(propName, \" needs to be an array of four numbers\"));\n  }\n\n  return null;\n}\n\n\n\n//# sourceURL=webpack:///./src/utils/prop-types/fourNumbersPropType.js?");

/***/ }),

/***/ "./src/utils/prop-types/index.js":
/*!***************************************!*\
  !*** ./src/utils/prop-types/index.js ***!
  \***************************************/
/*! exports provided: fourNumbersPropType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fourNumbersPropType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fourNumbersPropType */ \"./src/utils/prop-types/fourNumbersPropType.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fourNumbersPropType\", function() { return _fourNumbersPropType__WEBPACK_IMPORTED_MODULE_0__[\"fourNumbersPropType\"]; });\n\n\n\n//# sourceURL=webpack:///./src/utils/prop-types/index.js?");

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