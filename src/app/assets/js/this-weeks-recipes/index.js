'use strict';

const windowUtils = require('../utils/windowUtils');

window.basket.queryString = windowUtils.getQueryParamsAsObj(window.location.search);
const $ = window.$;
const React= require('react');
const ReactDOM = require('react-dom');
const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
Gousto.globalAjaxSetup(CONFIG);

const NumPortions = require('./components/num-portions/NumPortions');
const DeliveryDays = require('./components/delivery-day/DeliveryDays');
const SortFilters = require('./components/recipe-filters/SortFilters');

ReactDOM.render(
	<NumPortions />,
	document.getElementById('recipes-for')
);

ReactDOM.render(
	<DeliveryDays 
		deliveryDays={window.deliveryDays} 
		alternateDeliveryDays={window.alternateDeliveryDays} 
	/>,
	document.getElementById('delivered-on')
);

ReactDOM.render(
	<SortFilters />,
	document.getElementById('sort-filters-select')
);

$(window).load(function() {
	$('#wizard-build, #twr-ordersummary-container').addClass('expand');
	let premium = windowUtils.getQueryParamByName('premium');
	if(typeof premium !== 'undefined') {
		if(premium.toString() == 'true') {
			window.basket.deliverySlots().forEach(function(slot){
				if(slot.premium.toString() == 'true'){
					window.basket.deliverySlotId(slot.id);
				}
			});
		}
	}
});
