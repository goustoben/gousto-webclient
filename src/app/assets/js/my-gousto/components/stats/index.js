'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.STATS;
const StatPanelContainer = require('./StatPanelContainer');

const Stats = React.createClass({
	mixins: [PureRenderMixin],

	getInitialState: function() {
		return ({
			boxNum: 0,
			ready: false
		});
	},

	componentDidMount: function() {
		Gousto.ajaxPromise(WIDGET_CONFIG.ROUTES.API.ORDER_COUNT, 'GET').then((count) => {
			let state = {ready: true};
			if (count.committed) {
				state['boxNum'] = parseInt(count.committed);
			}
			this.setState(state);
		}, () => {
			this.setState({ready: true});
		});
	},

	render: function() {
		return (
			<StatPanelContainer
				boxNum={this.state.boxNum}
				ready={this.state.ready}
			/>
		);
	}
});

module.exports = Stats;
