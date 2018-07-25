'use strict';

const React = require('react');
const Select = require('react-select');
const Actions = require('./actions');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const CONFIG = require('@fe/gousto-config');
const Gousto = require('@fe/gousto-generic');
const moment = require('moment');
const WindowUtils = require('../../../utils/windowUtils');
const _ = require('lodash');

const DeliveryDays = React.createClass({
	mixins: [PureRenderMixin],
	getInitialState: function() {
		let date = WindowUtils.getQueryParamByName('day');
		if(typeof date !== 'undefined') {
			$('.dateselection-day-btn[data-delivery-day-id='+date+']').trigger('click');
		} else {
			date = $('.dateselection-day-btn.active').attr('data-delivery-day-id');
		}
		return { value: date };
	},
	updateValue: function(e) {
		let value;
		if (e.target && e.target.value) {
			value = e.target.value;
		} else if (e.value) {
			value = e.value;
		}
		Actions.setDeliveryDay(value);
		this.setState({
			value
		});
	},
	_fetchOptions: function() {
		let allDays = deliveryDays.concat(alternateDeliveryDays);
		let days = [];
		Object.keys(allDays).forEach((key) => {
			if(!allDays[key].cutoff && !allDays[key].alternate_delivery_day) {
				let label = moment(allDays[key].date).format('dddd, Do MMM');
				days.push({
					value: allDays[key].id +'',
					label: label,
					date: allDays[key].date
				});
			}
		});
		return _.sortBy(days, 'date');
	},
	render: function() {
		let selected = this.state.value;
		let options = this._fetchOptions();
		return (
			<div className="deliveryDays-container">
				<div className="deliveryDays-no-touch-dropdown-container">
					<Select
						value={selected}
						options={options}
						onChange={this.updateValue}
						clearable={false}
					/>
				</div>
				<div className="deliveryDays-touch-dropdown-container">
					<select className="deliveryDays-select" onChange={this.updateValue} value={selected}>
						{options.map((option_el) => {
							return (<option value={option_el.value}>{option_el.label}</option>);
						})}
					</select>
				</div>
			</div>
		);
	}
});

module.exports = DeliveryDays;
