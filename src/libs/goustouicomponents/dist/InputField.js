(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./InputErrorMessage"), require("./InputLabel"), require("./InputField.module.css"), require("classnames"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./InputErrorMessage", "./InputLabel", "./InputField.module.css", "classnames", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./InputErrorMessage"), require("./InputLabel"), require("./InputField.module.css"), require("classnames"), require("prop-types"), require("react")) : factory(root["./InputErrorMessage"], root["./InputLabel"], root["./InputField.module.css"], root["classnames"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__InputErrorMessage__, __WEBPACK_EXTERNAL_MODULE__InputLabel__, __WEBPACK_EXTERNAL_MODULE__InputField_module_css__, __WEBPACK_EXTERNAL_MODULE_classnames__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/InputField/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../InputErrorMessage":
/*!**************************************!*\
  !*** external "./InputErrorMessage" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__InputErrorMessage__;\n\n//# sourceURL=webpack:///external_%22./InputErrorMessage%22?");

/***/ }),

/***/ "../InputLabel":
/*!*******************************!*\
  !*** external "./InputLabel" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__InputLabel__;\n\n//# sourceURL=webpack:///external_%22./InputLabel%22?");

/***/ }),

/***/ "./InputField.module.css":
/*!******************************************!*\
  !*** external "./InputField.module.css" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__InputField_module_css__;\n\n//# sourceURL=webpack:///external_%22./InputField.module.css%22?");

/***/ }),

/***/ "./src/components/InputField/InputField.logic.js":
/*!*******************************************************!*\
  !*** ./src/components/InputField/InputField.logic.js ***!
  \*******************************************************/
/*! exports provided: InputField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InputField\", function() { return InputField; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _InputField_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InputField.module.css */ \"./InputField.module.css\");\n/* harmony import */ var _InputField_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_InputField_module_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _InputErrorMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../InputErrorMessage */ \"../InputErrorMessage\");\n/* harmony import */ var _InputErrorMessage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_InputErrorMessage__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _InputLabel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../InputLabel */ \"../InputLabel\");\n/* harmony import */ var _InputLabel__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_InputLabel__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _utils_typeValidation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/typeValidation */ \"./src/utils/typeValidation.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\nvar propTypes = {\n  id: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,\n  type: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['text', 'tel', 'email', 'password']),\n  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,\n  label: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,\n  subCopy: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,\n  disabled: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,\n  phonePrefix: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,\n  onUpdate: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,\n  required: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,\n  testingSelector: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,\n  value: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string\n};\nvar defaultProps = {\n  type: 'text',\n  label: null,\n  subCopy: null,\n  disabled: false,\n  phonePrefix: false,\n  required: false,\n  testingSelector: null,\n  value: ''\n};\n\nvar InputField = /*#__PURE__*/function (_Component) {\n  _inherits(InputField, _Component);\n\n  var _super = _createSuper(InputField);\n\n  function InputField(props) {\n    var _this;\n\n    _classCallCheck(this, InputField);\n\n    _this = _super.call(this, props);\n\n    _defineProperty(_assertThisInitialized(_this), \"handleOnChange\", function (event) {\n      var _this$props = _this.props,\n          id = _this$props.id,\n          onUpdate = _this$props.onUpdate,\n          required = _this$props.required;\n      var _event$target = event.target,\n          type = _event$target.type,\n          value = _event$target.value;\n\n      var inputError = _this.getInputValidation(type, value, required);\n\n      var isValid = inputError === null;\n      onUpdate({\n        id: id,\n        value: value,\n        isValid: isValid\n      });\n\n      _this.setState(function (prevState) {\n        return _objectSpread(_objectSpread({}, prevState), {}, {\n          inputError: inputError,\n          value: value\n        });\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"getInputValidation\", function (type, value, required) {\n      if (!value && required) {\n        return 'This field is required';\n      }\n\n      if (value) {\n        if (type === 'email' && !Object(_utils_typeValidation__WEBPACK_IMPORTED_MODULE_6__[\"validateEmail\"])(value)) {\n          return 'Please enter a valid email address';\n        }\n\n        if (type === 'tel' && !Object(_utils_typeValidation__WEBPACK_IMPORTED_MODULE_6__[\"validatePhone\"])(value)) {\n          return 'Please enter a valid phone number';\n        }\n      }\n\n      return null;\n    });\n\n    var _value = props.value;\n    _this.state = {\n      inputError: null,\n      value: _value\n    };\n    return _this;\n  }\n\n  _createClass(InputField, [{\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      var value = this.props.value;\n\n      if (prevProps.value !== value) {\n        this.setState({\n          value: value\n        });\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _classnames;\n\n      var _this$props2 = this.props,\n          id = _this$props2.id,\n          type = _this$props2.type,\n          placeholder = _this$props2.placeholder,\n          label = _this$props2.label,\n          subCopy = _this$props2.subCopy,\n          disabled = _this$props2.disabled,\n          phonePrefix = _this$props2.phonePrefix,\n          required = _this$props2.required,\n          testingSelector = _this$props2.testingSelector;\n      var _this$state = this.state,\n          inputError = _this$state.inputError,\n          value = _this$state.value;\n      var inputFieldClasses = classnames__WEBPACK_IMPORTED_MODULE_1___default()(_InputField_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.inputField, (_classnames = {\n        input: disabled\n      }, _defineProperty(_classnames, _InputField_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.inputError, inputError), _defineProperty(_classnames, _InputField_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.inputPrefix, phonePrefix), _classnames));\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _InputField_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.inputFieldContainer\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InputLabel__WEBPACK_IMPORTED_MODULE_5__[\"InputLabel\"], {\n        inputId: id\n      }, label), subCopy && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _InputField_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.subCopy\n      }, subCopy), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _InputField_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.inputPrefixContainer\n      }, phonePrefix && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: _InputField_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.phonePrefix\n      }, \"+44 (0)\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        \"data-testing\": testingSelector,\n        id: id,\n        type: type,\n        placeholder: placeholder,\n        onChange: this.handleOnChange,\n        className: inputFieldClasses,\n        disabled: disabled,\n        value: value,\n        required: required\n      })), inputError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InputErrorMessage__WEBPACK_IMPORTED_MODULE_4__[\"InputErrorMessage\"], null, inputError));\n    }\n  }]);\n\n  return InputField;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nInputField.defaultProps = defaultProps;\nInputField.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/InputField/InputField.logic.js?");

/***/ }),

/***/ "./src/components/InputField/index.js":
/*!********************************************!*\
  !*** ./src/components/InputField/index.js ***!
  \********************************************/
/*! exports provided: InputField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _InputField_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputField.logic */ \"./src/components/InputField/InputField.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"InputField\", function() { return _InputField_logic__WEBPACK_IMPORTED_MODULE_0__[\"InputField\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/InputField/index.js?");

/***/ }),

/***/ "./src/utils/typeValidation.js":
/*!*************************************!*\
  !*** ./src/utils/typeValidation.js ***!
  \*************************************/
/*! exports provided: validateEmail, validatePhone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateEmail\", function() { return validateEmail; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validatePhone\", function() { return validatePhone; });\nvar validateEmail = function validateEmail(email) {\n  var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]+$/i;\n  return regex.test(email);\n};\nvar validatePhone = function validatePhone(tel) {\n  var regex = /^\\d{10}$/;\n  return regex.test(tel);\n};\n\n//# sourceURL=webpack:///./src/utils/typeValidation.js?");

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