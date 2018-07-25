'use strict';

const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

var Redux = require('redux');

var categoryReducers = require('./category');
var productReducers = require('./product');
const giftReducers = require('./gift');
var userReducers = require('./user');
var orderReducers = require('./order');

const rootReducer = Redux.combineReducers(Object.assign({}, categoryReducers, productReducers, giftReducers, userReducers, orderReducers));

module.exports = rootReducer;
