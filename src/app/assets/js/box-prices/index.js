'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');

const $ = window.jQuery;
const BoxPricesContainer = require('./components/BoxPricesContainer');

Gousto.globalAjaxSetup(CONFIG);

var boxPricesDOMContainer = document.getElementById('box-prices-container');

ReactDOM.render(
	<BoxPricesContainer />,
	boxPricesDOMContainer
);
