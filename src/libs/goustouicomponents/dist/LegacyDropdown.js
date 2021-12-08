(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Dropdown.module.css"), require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["./Dropdown.module.css", "prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("./Dropdown.module.css"), require("prop-types"), require("react")) : factory(root["./Dropdown.module.css"], root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__Dropdown_module_css__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/LegacyDropdown/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Dropdown.module.css":
/*!****************************************!*\
  !*** external "./Dropdown.module.css" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__Dropdown_module_css__;\n\n//# sourceURL=webpack:///external_%22./Dropdown.module.css%22?");

/***/ }),

/***/ "./src/components/LegacyDropdown/Dropdown.logic.js":
/*!*********************************************************!*\
  !*** ./src/components/LegacyDropdown/Dropdown.logic.js ***!
  \*********************************************************/
/*! exports provided: Dropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dropdown\", function() { return Dropdown; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Dropdown_presentation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dropdown.presentation */ \"./src/components/LegacyDropdown/Dropdown.presentation.js\");\n/* harmony import */ var _Dropdown_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Dropdown.module.css */ \"./Dropdown.module.css\");\n/* harmony import */ var _Dropdown_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Dropdown_module_css__WEBPACK_IMPORTED_MODULE_3__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nvar propTypes = {\n  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,\n  optionSelected: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  options: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({\n    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n    label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired\n  })).isRequired,\n  groupedOptions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({\n    groupLabel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n    label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired\n  })).isRequired\n};\nvar defaultProps = {\n  onChange: function onChange() {}\n};\n\nvar sortGroupedOptionListByLabel = function sortGroupedOptionListByLabel(groupedOptions) {\n  var groupedOptionList = {};\n  groupedOptions.forEach(function (groupedOption) {\n    var groupLabel = groupedOption.groupLabel;\n\n    if (groupedOptionList[groupLabel]) {\n      groupedOptionList[groupLabel].push(groupedOption);\n    } else {\n      groupedOptionList[groupLabel] = [groupedOption];\n    }\n  });\n  return groupedOptionList;\n};\n\nvar renderOption = function renderOption(id, label) {\n  var disabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  var optionClass = disabled ? 'groupOptionItem' : 'optionItem';\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n    key: id,\n    value: id,\n    disabled: disabled,\n    className: optionClass\n  }, label);\n};\n\nvar renderOptionGroup = function renderOptionGroup(groupList) {\n  var groupedOptionsRendered = [];\n  Object.keys(groupList).forEach(function (key, index) {\n    var groupOfOptions = groupList[key];\n    var groupLabel = groupOfOptions[0].groupLabel;\n    var groupOptionLabel = renderOption(\"\".concat(groupLabel, \"-\").concat(index), groupLabel, true);\n    groupedOptionsRendered.push(groupOptionLabel);\n    var group = groupOfOptions.map(function (option) {\n      return renderOption(option.id, option.label);\n    });\n    groupedOptionsRendered.push(group);\n  });\n  return groupedOptionsRendered;\n};\n\nvar Dropdown = /*#__PURE__*/function (_PureComponent) {\n  _inherits(Dropdown, _PureComponent);\n\n  var _super = _createSuper(Dropdown);\n\n  function Dropdown(props) {\n    var _this;\n\n    _classCallCheck(this, Dropdown);\n\n    _this = _super.call(this, props);\n\n    _defineProperty(_assertThisInitialized(_this), \"onChangeHandler\", function (optionSelected) {\n      var onChange = _this.props.onChange;\n      var currentState = _this.state;\n\n      _this.setState(_objectSpread(_objectSpread({}, currentState), {}, {\n        optionSelected: optionSelected\n      }));\n\n      onChange(optionSelected);\n    });\n\n    var groupedOptions = _this.props.groupedOptions;\n    _this.groupedOptionList = sortGroupedOptionListByLabel(groupedOptions);\n    _this.state = {\n      optionSelected: props.optionSelected\n    };\n    return _this;\n  }\n\n  _createClass(Dropdown, [{\n    key: \"render\",\n    value: function render() {\n      var _this$props = this.props,\n          id = _this$props.id,\n          options = _this$props.options;\n      var optionSelected = this.state.optionSelected;\n      var renderedOptions = options.map(function (option) {\n        return renderOption(option.id, option.label);\n      });\n      var renderedOptionGroups = renderOptionGroup(this.groupedOptionList);\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _Dropdown_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.dropdownContainer\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Dropdown_presentation__WEBPACK_IMPORTED_MODULE_2__[\"DropdownPresentation\"], {\n        id: id,\n        optionSelected: optionSelected,\n        onChangeHandler: this.onChangeHandler\n      }, renderedOptions, renderedOptionGroups), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: _Dropdown_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.arrowDown\n      }));\n    }\n  }]);\n\n  return Dropdown;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"PureComponent\"]);\n\nDropdown.propTypes = propTypes;\nDropdown.defaultProps = defaultProps;\n\n\n//# sourceURL=webpack:///./src/components/LegacyDropdown/Dropdown.logic.js?");

/***/ }),

/***/ "./src/components/LegacyDropdown/Dropdown.presentation.js":
/*!****************************************************************!*\
  !*** ./src/components/LegacyDropdown/Dropdown.presentation.js ***!
  \****************************************************************/
/*! exports provided: DropdownPresentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DropdownPresentation\", function() { return DropdownPresentation; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar propTypes = {\n  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  optionSelected: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  onChangeHandler: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired\n};\n\nvar DropdownPresentation = function DropdownPresentation(_ref) {\n  var children = _ref.children,\n      id = _ref.id,\n      optionSelected = _ref.optionSelected,\n      onChangeHandler = _ref.onChangeHandler;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n    // eslint-disable-line jsx-a11y/no-onchange\n    id: id,\n    value: optionSelected,\n    onChange: function onChange(event) {\n      onChangeHandler(event.target.value);\n    }\n  }, children);\n};\n\nDropdownPresentation.propTypes = propTypes;\n\n\n//# sourceURL=webpack:///./src/components/LegacyDropdown/Dropdown.presentation.js?");

/***/ }),

/***/ "./src/components/LegacyDropdown/index.js":
/*!************************************************!*\
  !*** ./src/components/LegacyDropdown/index.js ***!
  \************************************************/
/*! exports provided: LegacyDropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Dropdown_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dropdown.logic */ \"./src/components/LegacyDropdown/Dropdown.logic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"LegacyDropdown\", function() { return _Dropdown_logic__WEBPACK_IMPORTED_MODULE_0__[\"Dropdown\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/LegacyDropdown/index.js?");

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