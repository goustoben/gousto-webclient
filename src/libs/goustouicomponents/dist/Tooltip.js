(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Tooltip.module.css"), require("classnames"), require("prop-types"), require("rc-tooltip"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Tooltip.module.css", "classnames", "prop-types", "rc-tooltip", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Tooltip.module.css"), require("classnames"), require("prop-types"), require("rc-tooltip"), require("react")) : factory(root["./Tooltip.module.css"], root["classnames"], root["prop-types"], root["rc-tooltip"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Tooltip_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_rc_tooltip__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Tooltip/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Tooltip.module.css":
/*!***************************************!*\
  !*** external "./Tooltip.module.css" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Tooltip_module_css__;\n\n//# sourceURL=webpack:///external_%22./Tooltip.module.css%22?");

/***/ }),

/***/ "./src/components/Tooltip/Tooltip.logic.js":
/*!*************************************************!*\
  !*** ./src/components/Tooltip/Tooltip.logic.js ***!
  \*************************************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tooltip\", function() { return Tooltip; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Tooltip_presentation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Tooltip.presentation */ \"./src/components/Tooltip/Tooltip.presentation.js\");\n/* harmony import */ var _Tooltip_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tooltip.module.css */ \"./Tooltip.module.css\");\n/* harmony import */ var _Tooltip_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Tooltip_module_css__WEBPACK_IMPORTED_MODULE_4__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\nvar getMessage = function getMessage(message, className) {\n  return typeof message === 'string' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, 'rc-tooltip-padding', 'rc-tooltip-message')\n  }, message) : message;\n};\n\nvar getButtonStyleAlignment = function getButtonStyleAlignment(node, placement) {\n  var align = {};\n  var halfWidth = node && node.getBoundingClientRect().width / 2;\n  var arrowOffset = 25;\n  var segPadding = 5;\n  var offsetY = 10;\n  var offsetX = Math.abs(halfWidth - (arrowOffset + segPadding));\n\n  switch (placement) {\n    case 'topRight':\n      if (halfWidth > arrowOffset) {\n        align = {\n          offset: [-offsetX, -offsetY]\n        };\n      } else {\n        align = {\n          offset: [offsetX, -offsetY]\n        };\n      }\n\n      break;\n\n    case 'topLeft':\n      if (halfWidth > arrowOffset) {\n        align = {\n          offset: [offsetX, offsetY]\n        };\n      } else {\n        align = {\n          offset: [-offsetX, offsetY]\n        };\n      }\n\n      break;\n\n    case 'bottomRight':\n      if (halfWidth > arrowOffset) {\n        align = {\n          offset: [-offsetX, offsetY]\n        };\n      } else {\n        align = {\n          offset: [offsetX, offsetY]\n        };\n      }\n\n      break;\n\n    case 'bottomLeft':\n      if (halfWidth > arrowOffset) {\n        align = {\n          offset: [offsetX, offsetY]\n        };\n      } else {\n        align = {\n          offset: [-offsetX, offsetY]\n        };\n      }\n\n      break;\n\n    default:\n      align = {};\n      break;\n  }\n\n  return align;\n};\n\nvar propTypes = {\n  className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,\n  visible: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,\n  onVisibleChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,\n  placement: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,\n  style: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['button', 'checkbox']),\n  triggers: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['click', 'hover', 'focus']), prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['click', 'hover', 'focus']))]),\n  message: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node,\n  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node.isRequired,\n  overlayClassName: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string\n};\nvar defaultProps = {\n  className: '',\n  message: null,\n  onVisibleChange: function onVisibleChange() {},\n  overlayClassName: null,\n  placement: 'top',\n  style: 'button',\n  visible: false,\n  triggers: ['click', 'hover']\n};\n\nvar Tooltip = /*#__PURE__*/function (_React$PureComponent) {\n  _inherits(Tooltip, _React$PureComponent);\n\n  var _super = _createSuper(Tooltip);\n\n  function Tooltip() {\n    var _this;\n\n    _classCallCheck(this, Tooltip);\n\n    _this = _super.call(this);\n    _this.state = {\n      align: {}\n    };\n    return _this;\n  }\n\n  _createClass(Tooltip, [{\n    key: \"componentWillReceiveProps\",\n    value: function componentWillReceiveProps(nextProps) {\n      // eslint-disable-line react/no-deprecated\n      if (nextProps.visible && nextProps.style === 'button') {\n        var align = getButtonStyleAlignment(this.node, nextProps.placement);\n        this.setState({\n          align: align\n        });\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var _this$props = this.props,\n          children = _this$props.children,\n          className = _this$props.className,\n          onVisibleChange = _this$props.onVisibleChange,\n          overlayClassName = _this$props.overlayClassName,\n          message = _this$props.message,\n          placement = _this$props.placement,\n          style = _this$props.style,\n          triggers = _this$props.triggers,\n          visible = _this$props.visible;\n      var formattedMessage = getMessage(message, className);\n      var align = this.state.align;\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Tooltip_presentation__WEBPACK_IMPORTED_MODULE_3__[\"TooltipPresentation\"], {\n        kindOfCustomRef: function kindOfCustomRef(ref) {\n          if (ref) {\n            _this2.ref = ref;\n          }\n        },\n        overlay: formattedMessage,\n        overlayClassName: classnames__WEBPACK_IMPORTED_MODULE_1___default()(_defineProperty({}, \"rc-tooltip-style-\".concat(style), style), overlayClassName),\n        placement: placement,\n        triggers: triggers,\n        visible: visible,\n        onVisibleChange: onVisibleChange,\n        align: align\n      }, children);\n    }\n  }]);\n\n  return Tooltip;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);\n\nTooltip.defaultProps = defaultProps;\nTooltip.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/Tooltip/Tooltip.logic.js?");

/***/ }),

/***/ "./src/components/Tooltip/Tooltip.presentation.js":
/*!********************************************************!*\
  !*** ./src/components/Tooltip/Tooltip.presentation.js ***!
  \********************************************************/
/*! exports provided: TooltipPresentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TooltipPresentation\", function() { return TooltipPresentation; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var rc_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rc-tooltip */ \"rc-tooltip\");\n/* harmony import */ var rc_tooltip__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rc_tooltip__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,\n  kindOfCustomRef: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]),\n  overlay: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,\n  overlayClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  placement: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  triggers: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['click', 'hover', 'focus']), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['click', 'hover', 'focus']))]).isRequired,\n  visible: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,\n  onVisibleChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  align: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape().isRequired\n};\nvar defaultProps = {\n  onVisibleChange: function onVisibleChange() {},\n  kindOfCustomRef: function kindOfCustomRef() {}\n};\n\nvar TooltipPresentation = function TooltipPresentation(_ref) {\n  var children = _ref.children,\n      kindOfCustomRef = _ref.kindOfCustomRef,\n      overlay = _ref.overlay,\n      overlayClassName = _ref.overlayClassName,\n      placement = _ref.placement,\n      triggers = _ref.triggers,\n      visible = _ref.visible,\n      onVisibleChange = _ref.onVisibleChange,\n      align = _ref.align;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(rc_tooltip__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    ref: kindOfCustomRef,\n    overlay: overlay,\n    overlayClassName: overlayClassName,\n    placement: placement,\n    trigger: triggers,\n    visible: visible,\n    onVisibleChange: onVisibleChange,\n    align: align\n  }, children);\n};\n\nTooltipPresentation.propTypes = propTypes;\nTooltipPresentation.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/Tooltip/Tooltip.presentation.js?");

/***/ }),

/***/ "./src/components/Tooltip/index.js":
/*!*****************************************!*\
  !*** ./src/components/Tooltip/index.js ***!
  \*****************************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Tooltip_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tooltip.logic */ \"./src/components/Tooltip/Tooltip.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Tooltip\", function() { return _Tooltip_logic__WEBPACK_IMPORTED_MODULE_0__[\"Tooltip\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Tooltip/index.js?");

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

/***/ "rc-tooltip":
/*!*****************************!*\
  !*** external "rc-tooltip" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_rc_tooltip__;\n\n//# sourceURL=webpack:///external_%22rc-tooltip%22?");

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