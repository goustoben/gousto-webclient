'use strict';

const React = require('react');

const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const ReferralPanel = require('./ReferralPanel');
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.REFERFRIEND;

let ReferAFriend = React.createClass({
	getInitialState: function() {
		return({
			ready: false,
			credit: 0,
			referred: 0
		});
	},

	componentDidMount: function() {
		Gousto.ajaxCall(WIDGET_CONFIG.ROUTES.API.LEDGER, 'GET', {}, (ledgerData) => {
			let state = {ready: true};
			if (!this.ignoreFetch && ledgerData.referral_credit && ledgerData.referral_count) {
				state['credit'] = Math.round(parseFloat(ledgerData.referral_credit).toFixed(2));
				state['referred'] = parseInt(ledgerData.referral_count);
			}
			this.setState(state);
		}, (err)=>{
			this.setState({'ready': true});
		}, true);
	},

	componentWillUnmount: function() {
		this.ignoreFetch = true;
	},

	render: function(){
		return(
			<ReferralPanel
				ready={this.state.ready}
				credit={this.state.credit}
				referred={this.state.referred}
			/>
		);
	}
});

module.exports = ReferAFriend;
