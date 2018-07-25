'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const moment = require('moment');
const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const Header = require('./Header');
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.HEADER;

const HeaderIndex = React.createClass({
	mixins: [PureRenderMixin],

	getInitialState: function() {
		return ({
			nextOrder: undefined
		});
	},

	componentDidMount: function() {
		Gousto.ajaxPromise(WIDGET_CONFIG.ROUTES.API.USER_ORDERS, 'GET', {phases: ['awaiting_choices', 'open', 'cutoff', 'delivery', 'packing', 'picking']}).then((orders) => {
			let now = moment();
			let nextOrderIndex = this.findNextOrderId(orders, now);
			let nextOrder;
			if (nextOrderIndex !== null && nextOrderIndex !== undefined && orders[nextOrderIndex]) {
				nextOrder = orders[nextOrderIndex];
			} else {
				nextOrder = null;
			}

			this.setState({nextOrder});
		});
	},

	findNextOrderId: function(orders, now) {
		let nextOrderIndex = orders.reduce((nextOrderIndex, box, i) => {
			let deliveryDate = moment(box.delivery_date).set('h', 23).set('m', 59).set('s', 59);
			let nextBoxDate;
			if (deliveryDate > now) {
				if (nextOrderIndex === null) {
					return i;
				}

				nextBoxDate = moment(orders[nextOrderIndex].delivery_date).set('h', 23).set('m', 59).set('s', 59);
				if (deliveryDate < nextBoxDate) {
					return i;
				} else {
					return nextOrderIndex;
				}
			} else {
				return nextOrderIndex;
			}
		}, null);
		return nextOrderIndex;
	},

	render: function() {
		return <Header data={this.props.data} order={this.state.nextOrder} />;
	}
});

module.exports = HeaderIndex;
