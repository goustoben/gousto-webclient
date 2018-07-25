'use strict';

const React = require('react');
const Select = require('react-select');
const Actions = require('./actions');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const WindowUtils = require('../../../utils/windowUtils');

const SortFilters = React.createClass({
	mixins: [PureRenderMixin],
	getInitialState: function() {
		let sortBy = WindowUtils.getQueryParamByName('sort') || 'top';
		return {
			value: sortBy
		};
	},
	getDefaultProps: function() {
		return {
			options: [
				{ value: 'top', label: 'Top Rated' },
				{ value: 'quick', label: 'Quickest' },
				{ value: 'veggie', label: 'Veggies' },
				{ value: 'healthy', label: 'Lowest Calories' }
			]
		};
	},

	updateValue: function(e) {
		let value;
		if (e.target && e.target.value) {
			value = e.target.value;
		} else if (e.value) {
			value = e.value;
		}
		Actions.applyFilter(value);
		this.setState({
			value
		});
	},
	render: function() {
		let selected = this.state.value;
		return (
			<div className="sortFilters-container">
				<div className="sortFilters-no-touch-dropdown-container">
					<Select
						value={selected}
						options={this.props.options}
						onChange={this.updateValue}
						clearable={false}
					/>
				</div>
				<div className="sortFilters-touch-dropdown-container">
					<select className="sortFilters-select" onChange={this.updateValue} value={selected}>
						{this.props.options.map((option_el) => {
							return (<option value={option_el.value}>{option_el.label}</option>);
						})}
					</select>
				</div>
			</div>
		);
	}
});

module.exports = SortFilters;
