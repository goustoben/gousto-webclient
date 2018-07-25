'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const StatPanel = require('./StatPanel');
const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.STATS;

const StatPanelContainer = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return({
			ready: false,
			boxNum: 0
		});
	},

	getWaste: function(boxNum) {
		let totalKg = Math.round(boxNum * WIDGET_CONFIG.MULTIPLIER.WASTE);
		let output = {unit: 'Kilos', value: totalKg};
		if (totalKg > 1000) {
			let tons = totalKg/1000;
			output['value'] = tons.toFixed(2);
			output['unit'] = 'Tons';
		}
		return output;
	},

	getTimeSaved: function(boxNum) {
		let totalMin = boxNum * WIDGET_CONFIG.MULTIPLIER.TIME;
		let output = {unit:'Hours', value: 0};

		if (boxNum > 0) {
			output['value'] = Math.floor(totalMin/60);
		}

		return output;
	},

	render: function() {
		return (
			<div className="stat-container clearfix">
				<div className="container-padding">
					<Gousto.Heading type="h3" style="line" textAlign="left">Your feel-good Gousto stats</Gousto.Heading>
				</div>
				<div className="stat">
					<StatPanel
						title='Food waste saved'
						svg='waste'
						description='...with perfectly measured ingredients.'
						tooltipText={<span>On average, our customers save 1.9kg of food waste per box. We calculate this figure using <a href="www.onsdataurltbd.com"  className="highlight-text-link"> ONS Data</a>, which shows that the average household wastes 5.09kg of food per week, and the number of recipe boxes you've had so far!</span>}
						stat={(this.props.ready) ? this.getWaste(this.props.boxNum) : {unit: 'Kilos', value: 0}}
					/>
					<StatPanel
						title='Time saved'
						svg='timesaved'
						description='...in planning & shopping for meals.'
						tooltipText='We calculate this based on the average weekly shopping time for UK families.'
						stat={(this.props.ready)? this.getTimeSaved(this.props.boxNum) : {unit: 'Hours', value: 0}}
					/>
					<StatPanel />
					<StatPanel />
				</div>
			</div>
		);
	}
});

module.exports = StatPanelContainer;
