'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');

const SharePanel = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return({
			heading: '',
			body: '',
			linktext: '',
			linkhref: '',
			size: ''
		});
	},

	render: function() {
		return(
			<div className={"share share-" + this.props.size + ' col-xs-12 col-lg-12 col-md-12'}>
				<Gousto.Heading type="h3" className="share-heading">{this.props.heading}</Gousto.Heading>
				<p className="share-body">{this.props.body}</p>
				<Gousto.LinkButton href={CONFIG.CLIENT.ROUTES.MY_REFERRALS} type="primary" className={"share-invite-friend " + this.props.size}>
					{this.props.linktext}
				</Gousto.LinkButton>
			</div>
		);
	}
});

module.exports = SharePanel;
