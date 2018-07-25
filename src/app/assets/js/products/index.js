'use strict';

import ProductHeader from './components/header/ProductHeader'

const React = require('react');
const ReactDOM = require('react-dom');
const Redux = require('redux');
const Provider = require('react-redux').Provider;
const thunk = require('redux-thunk').default;

const Reducer = require('./reducers');
const Action = require('./actions');

const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

var FastClick = require('fastclick');
FastClick.attach(document.body);

if (CONFIG.ENV === 'dev') {
	var logger = require('redux-logger');
}

function initialiseProducts(store, data) {
	Gousto.globalAjaxSetup(CONFIG, data);

	let loadUserChoices = function(store, data, gifts) {
		store.dispatch({type: CONSTANTS.LOAD_USER_GIFTS, gifts: gifts});
		data.forEach((product) => {
			product.quantity = parseInt(product.quantity);
			let price = (Number(product.list_price) / product.quantity).toFixed(2);
			let stock = {};
			stock[product.itemable_id] = product.quantity;
			store.dispatch(Action.qtyChange(product.itemable_id, product.quantity, price, false));
			store.dispatch({
				type: CONSTANTS.LOAD_STOCK,
				stock: stock
			});
		});
	};

	store.dispatch(Action.loadUserDetails(data.user));
	store.dispatch(Action.loadOrderDetails(data.order));
	store.dispatch(Action.receiveCategory([{ 'id': '0', 'title': 'All Products', 'slug':'0', 'productCount':1, relationships: { parent_id: null } }]));
	store.dispatch(Action.getAllCategories());
	store.dispatch(Action.getGiftProducts(data.gifts));
	store.dispatch(Action.getAllProducts(data.order.periodId, () => {loadUserChoices(store, data.userChoices, data.gifts); } ));
	store.dispatch(Action.getStock());
}

var ProductContainer = require('./containers/products/ProductContainer');
var CategoryContainer = require('./containers/products/CategoryContainer');
var OrderSummaryListContainer = require('./containers/order-summary/ListContainer');
var OrderSummaryThumbnailContainer = require('./containers/order-summary/ThumbnailContainer');
var OrderSummarySubmitContainer = require('./containers/order-summary/SubmitContainer');

var middleware = [thunk];
if (CONFIG.ENV === 'dev' && typeof logger === 'function') {
	middleware.push(logger());
}

const store = Redux.createStore(Reducer, {}, Redux.applyMiddleware(...middleware));

initialiseProducts(store, productServiceData);

var productsDOMHeaderContainer = document.getElementById('gousto-market-header');
var categoriesDOMContainer = document.getElementById('gousto-market-categories');
var productsDOMContainer = document.getElementById('gousto-market-products');
var orderSummaryListDOMContainer = document.getElementById('order-summary-products-list');
var orderSummaryThumbnailDOMContainer = document.getElementById('order-summary-products-thumbnail');
var orderSummarySubmitDOMContainer = document.getElementById('order-summary-products-submit');

ReactDOM.render(
	<ProductHeader showConfirmation={productServiceData.showConfirmation} order={productServiceData.order} />,
	productsDOMHeaderContainer
);

ReactDOM.render(
	<Provider store={store}>
		<CategoryContainer />
	</Provider>,
	categoriesDOMContainer
);

ReactDOM.render(
	<Provider store={store}>
		<ProductContainer />
	</Provider>,
	productsDOMContainer
);

ReactDOM.render(
	<Provider store={store}>
		<OrderSummaryListContainer grandTotal={parseFloat(productServiceData.totalPrice)} />
	</Provider>,
	orderSummaryListDOMContainer
);

ReactDOM.render(
	<Provider store={store}>
		<OrderSummaryThumbnailContainer />
	</Provider>,
	orderSummaryThumbnailDOMContainer
);

ReactDOM.render(
	<Provider store={store}>
		<OrderSummarySubmitContainer />
	</Provider>,
	orderSummarySubmitDOMContainer
);
