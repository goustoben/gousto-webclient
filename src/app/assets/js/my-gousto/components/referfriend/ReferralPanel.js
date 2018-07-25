'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const Gousto = require('@fe/gousto-generic');
const Stamp = require('./Stamp');
const SharePanel = require('./SharePanel');

const ReferralPanel = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return({
			ready: false,
			credit: 0,
			referred: 0
		});
	},

	render: function() {
		return(
			<div className="referral clearfix">
				<div className="referral--left col-md-3 hidden-sm">
					<Gousto.Image src={Gousto.Image.imagePath('photos/earn-reward-background.jpg')}/>
				</div>
				<div className="referral--centre col-md-6 col-xs-12">
					{(()=>{
						if (this.props.ready) {
							if (this.props.referred > 0) {
								return (
									<div>
										<Stamp
											size="large"
											type="number"
											value={this.props.referred}
											bodytext="Friends who have signed up using your Gousto referral"
										/>
										<Stamp
											size="large"
											type="price"
											value={this.props.credit}
											bodytext="Gousto credit you've earned so far from inviting your friends"
										/>
									</div>
								);
							} else {
								return(
									<div>
										<SharePanel
											heading="Share the Gousto experience"
											body="Refer a friend – and you both save"
											linktext="Invite a friend"
											size="large"
										/>
									</div>
								);
							}
						}
					})()}
				</div>
				<div className="referral--centre col-md-3 col-xs-12">
					{(()=>{
						if (this.props.ready) {
							if (this.props.referred > 0) {
								return(
									<div>
										<SharePanel
											heading="Share the Gousto experience"
											body="Refer a friend – and you both save"
											linktext="Invite more friends"
											size="small"
										/>
									</div>
								);
							} else {
								return(
									<div>
										<Stamp
											size="small"
											type="price"
											value="15"
											bodytext="credit for each friend invited"
										/>
										<Stamp
											size="small"
											type="percentage"
											value="50%"
											bodytext="off your friend's first two boxes"
										/>
									</div>
								);
							}
						}
					})()}
				</div>
			</div>
		);
	}
});

module.exports = ReferralPanel;
