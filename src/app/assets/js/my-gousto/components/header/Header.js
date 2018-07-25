'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classNames = require('classnames');
const moment = require('moment');
const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.HEADER;

const Header = React.createClass({
	mixins: [PureRenderMixin],

	formatDeliveryDate: function(order, now) {
		if (order === null) {
			return <span>Looks like you don’t have any recipe boxes ordered. To add one, simply choose recipes from <a className="highlight-text-link" href={CONFIG.CLIENT.ROUTES.TWR}>This Weeks Menu <span className="glyphicon glyphicon-menu-right header-text-icon" aria-hidden="true"></span></a></span>;
		} else if (order) {
			let start = Gousto.roundTime(moment(order.delivery_date.substring(0, 10) + ' ' + order.delivery_slot.delivery_start));
			let end = Gousto.roundTime(moment(order.delivery_date.substring(0, 10) + ' ' + order.delivery_slot.delivery_end));
			let date = moment(order.delivery_date);
			let message = ''
			if (now.format('YYMMDD') === date.format('YYMMDD')) {
				message = 'Your recipe box will be delivered today, ' + date.format('Do MMMM') + '. You can view more details in ';
			} else {
				message = 'Your next recipe box will be delivered ' + date.format('dddd, Do MMMM') + ' between ' + start.format('ha') + '-' + end.format('ha') + '. See all the details or edit this box from ';
			}
			return <span>{message}<a className="highlight-text-link" href={CONFIG.CLIENT.ROUTES.MY_DELIVERIES}>My Deliveries <span className="glyphicon glyphicon-menu-right header-text-icon" aria-hidden="true"></span></a></span>;
		} else {
			return <span>&nbsp;</span>;
		}
	},

	render: function() {
		let data = this.props.data;
		let ready = (this.props.order === undefined) ? false : true;
		return (
			<div className="header">
				<Gousto.Heading type="h2" style="line">Hello{data && data.user && data.user.firstName ? ' ' + data.user.firstName : ''},</Gousto.Heading>
				<p className={classNames('header-text', {'fade-in': ready})}>{this.formatDeliveryDate(this.props.order, moment())}</p>
			</div>
		);
	}
});

module.exports = Header;
