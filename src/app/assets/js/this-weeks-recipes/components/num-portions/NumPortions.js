'use strict';

const React = require('react');
const Redux = require('react-redux');
const Select = require('react-select');
const Actions = require('./actions');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const WindowUtils = require('../../../utils/windowUtils');

const NumPortions = React.createClass({
	mixins: [PureRenderMixin],
	getInitialState: function() {
		let numPortions = WindowUtils.getQueryParamByName('num_portions') || '2';
		return { value: numPortions };
	},
	getDefaultProps: function() {
		return ({
			options: [
				{ value: '2', label: '2 People' },
				{ value: '4', label: '4 People' }
			]
		});
	},
	updateValue: function(e) {
		let value;
		if (e.target && e.target.value) {
			value = e.target.value;
		} else if (e.value) {
			value = e.value;
		}
		Actions.applyNumPortions(value);
		this.setState({
			value
		});
	},

	render: function() {
		let selected = this.state.value;
		return (
			<div className="numPortions-container">
				<div className="numPortions-no-touch-dropdown-container">
					<Select
						value={selected}
						options={this.props.options}
						onChange={this.updateValue}
						clearable={false}
						autosize={true}
					/>
				</div>
				<div className="numPortions-touch-dropdown-container">
					<select className="numPortions-select" onChange={this.updateValue} value={selected}>
						{this.props.options.map((option_el) => {
							return (<option value={option_el.value}>{option_el.label}</option>);
						})}
					</select>
				</div>
			</div>
		);
	}
});

module.exports = NumPortions;
