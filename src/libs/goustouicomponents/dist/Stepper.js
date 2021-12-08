(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./StepButtons"), require("./StepContent"), require("./StepIndicator"), require("./Stepper.module.css"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./StepButtons", "./StepContent", "./StepIndicator", "./Stepper.module.css", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./StepButtons"), require("./StepContent"), require("./StepIndicator"), require("./Stepper.module.css"), require("prop-types"), require("react")) : factory(root["./StepButtons"], root["./StepContent"], root["./StepIndicator"], root["./Stepper.module.css"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__StepButtons__, __WEBPACK_EXTERNAL_MODULE__StepContent__, __WEBPACK_EXTERNAL_MODULE__StepIndicator__, __WEBPACK_EXTERNAL_MODULE__Stepper_module_css__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/Stepper/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../StepButtons":
/*!********************************!*\
  !*** external "./StepButtons" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__StepButtons__;\n\n//# sourceURL=webpack:///external_%22./StepButtons%22?");

/***/ }),

/***/ "../StepContent":
/*!********************************!*\
  !*** external "./StepContent" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__StepContent__;\n\n//# sourceURL=webpack:///external_%22./StepContent%22?");

/***/ }),

/***/ "../StepIndicator":
/*!**********************************!*\
  !*** external "./StepIndicator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__StepIndicator__;\n\n//# sourceURL=webpack:///external_%22./StepIndicator%22?");

/***/ }),

/***/ "./Stepper.module.css":
/*!***************************************!*\
  !*** external "./Stepper.module.css" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Stepper_module_css__;\n\n//# sourceURL=webpack:///external_%22./Stepper.module.css%22?");

/***/ }),

/***/ "./src/components/Stepper/Stepper.logic.js":
/*!*************************************************!*\
  !*** ./src/components/Stepper/Stepper.logic.js ***!
  \*************************************************/
/*! exports provided: Stepper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Stepper\", function() { return Stepper; });\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _StepContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../StepContent */ \"../StepContent\");\n/* harmony import */ var _StepContent__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_StepContent__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _StepButtons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../StepButtons */ \"../StepButtons\");\n/* harmony import */ var _StepButtons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_StepButtons__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _StepIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../StepIndicator */ \"../StepIndicator\");\n/* harmony import */ var _StepIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_StepIndicator__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Stepper_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Stepper.module.css */ \"./Stepper.module.css\");\n/* harmony import */ var _Stepper_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Stepper_module_css__WEBPACK_IMPORTED_MODULE_5__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\nvar propTypes = {\n  children: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node.isRequired,\n  content: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({\n    next: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,\n    skip: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string\n  }),\n  isContinueDisabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,\n  isSkipButtonVisible: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,\n  stepNumber: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,\n  stepIndicator: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({\n    current: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,\n    size: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number\n  }),\n  onContinueClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,\n  onSkipClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func\n};\nvar defaultProps = {\n  content: {\n    next: 'Next',\n    skip: 'Skip'\n  },\n  isContinueDisabled: false,\n  isSkipButtonVisible: true,\n  onContinueClick: null,\n  onSkipClick: null,\n  stepNumber: 1,\n  stepIndicator: {}\n};\n\nvar Stepper = /*#__PURE__*/function (_PureComponent) {\n  _inherits(Stepper, _PureComponent);\n\n  var _super = _createSuper(Stepper);\n\n  function Stepper(props) {\n    var _this;\n\n    _classCallCheck(this, Stepper);\n\n    _this = _super.call(this, props);\n\n    _defineProperty(_assertThisInitialized(_this), \"onStepperContinueClick\", function () {\n      var onContinueClick = _this.props.onContinueClick;\n\n      if (onContinueClick !== null) {\n        var currentStep = _this.state.currentStep;\n        onContinueClick({\n          currentStep: currentStep\n        });\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"onStepperSkipClick\", function () {\n      var onSkipClick = _this.props.onSkipClick;\n\n      if (onSkipClick !== null) {\n        var currentStep = _this.state.currentStep;\n        onSkipClick({\n          currentStep: currentStep\n        });\n      }\n    });\n\n    var _this$props = _this.props,\n        children = _this$props.children,\n        stepNumber = _this$props.stepNumber;\n    _this.state = {\n      currentStep: stepNumber,\n      numberOfSteps: react__WEBPACK_IMPORTED_MODULE_1__[\"Children\"].count(children)\n    };\n    return _this;\n  }\n\n  _createClass(Stepper, [{\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      var stepNumber = this.props.stepNumber;\n\n      if (prevProps.stepNumber !== stepNumber) {\n        this.setState({\n          currentStep: stepNumber\n        });\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this$props2 = this.props,\n          content = _this$props2.content,\n          children = _this$props2.children,\n          isContinueDisabled = _this$props2.isContinueDisabled,\n          isSkipButtonVisible = _this$props2.isSkipButtonVisible,\n          stepIndicator = _this$props2.stepIndicator;\n      var _this$state = this.state,\n          currentStep = _this$state.currentStep,\n          numberOfSteps = _this$state.numberOfSteps;\n      var stepIndicatorCurrent = stepIndicator.current,\n          stepIndicatorSize = stepIndicator.size;\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n        className: _Stepper_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.container\n      }, stepIndicatorCurrent && stepIndicatorSize ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StepIndicator__WEBPACK_IMPORTED_MODULE_4__[\"StepIndicator\"], {\n        current: stepIndicatorCurrent + currentStep,\n        size: stepIndicatorSize\n      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StepIndicator__WEBPACK_IMPORTED_MODULE_4__[\"StepIndicator\"], {\n        current: currentStep,\n        size: numberOfSteps\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StepContent__WEBPACK_IMPORTED_MODULE_2__[\"StepContent\"], {\n        step: currentStep,\n        size: numberOfSteps\n      }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StepButtons__WEBPACK_IMPORTED_MODULE_3__[\"StepButtons\"], {\n        isContinueDisabled: isContinueDisabled,\n        isSkipButtonVisible: isSkipButtonVisible,\n        labelNext: content.next,\n        labelSkip: content.skip,\n        onContinueClick: this.onStepperContinueClick,\n        onSkipClick: this.onStepperSkipClick\n      }));\n    }\n  }]);\n\n  return Stepper;\n}(react__WEBPACK_IMPORTED_MODULE_1__[\"PureComponent\"]);\n\nStepper.defaultProps = defaultProps;\nStepper.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/Stepper/Stepper.logic.js?");

/***/ }),

/***/ "./src/components/Stepper/index.js":
/*!*****************************************!*\
  !*** ./src/components/Stepper/index.js ***!
  \*****************************************/
/*! exports provided: Stepper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Stepper_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stepper.logic */ \"./src/components/Stepper/Stepper.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Stepper\", function() { return _Stepper_logic__WEBPACK_IMPORTED_MODULE_0__[\"Stepper\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Stepper/index.js?");

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