'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classNames = require('classnames');
const Tooltip = require('rc-tooltip');
const Gousto = require('@fe/gousto-generic');
const Placements = require('rc-tooltip/lib/placements');

var ProductBasket = React.createClass({
	mixins: [PureRenderMixin],

	getInitialState: function() {
		return {
			enable: false,
			display: 'desktop'
		};
	},

	handleQtyChange: function(delta) {
		return function(){
			if (delta > 0 && this.props.limitReached === false) {
				if (this.props.ageRestricted && this.props.ageVerified === false) {
					this.props.onShowModal(() => { this.props.onQtyChange(this.props.id, delta, this.props.price); });
				} else {
					this.props.onQtyChange(this.props.id, delta, this.props.price);
				}
			} else if (delta < 0) {
				this.props.onQtyChange(this.props.id, delta, this.props.price);
			}
		}.bind(this);
	},

	showTooltip: function(visible) {
		if (this.props.limitReached && visible) {
			this.setState({enable: true});
		} else {
			this.setState({enable: false});
		}
	},

	render: function() {
		var elements;
		let placement;
		let offsetValue = Placements.placements;
		let disabled = this.props.limitReached !== false ? true : false;
		if (this.props.qty === 0) {
			placement = 'topRight';
			let offset = offsetValue[placement].offset;
			elements = [
				<Tooltip
					key = {0}
					overlay={<div>{this.props.limitReached}</div>}
					placement={placement}
					trigger={['click', 'hover']}
					align={{
						offset: [offset[0], offset[1]]
					}}
					visible={this.state.enable}
					onVisibleChange={this.showTooltip}
				>
					<span
						className={classNames('qty-segment', 'qty-show-qty', 'qty-show-qty--full', { 'disabled': disabled })}
						onClick={this.handleQtyChange(1)}
					>{this.props.context === 'details' ? 'Add to box' : 'Add'}</span>
				</Tooltip>
			];
		} else {
			let offsetX = 0;
			if (this.props.context === 'details') {
				if (this.props.display === 'mobile') {
					placement = 'bottomRight';
				} else {
					placement = 'top';
				}
			} else {
				placement = 'topRight';
				offsetX = 15;
			}
			let offset = offsetValue[placement].offset;
			elements = [
				<span className="qty-segment qty-change-qty" key={0} onClick={this.handleQtyChange(-1)}>&#8722;</span>,
				<span className="qty-segment qty-show-qty" key={1}>{this.props.qty}</span>,
				<Tooltip
					key={2}
					overlay={<div>{this.props.limitReached}</div>}
					placement={placement}
					trigger={['click', 'hover']}
					align={{
						offset: [offset[0] + offsetX, offset[1]]
					}}
					visible={this.state.enable}
					onVisibleChange={this.showTooltip}
				>
					<span
						className={classNames('qty-segment', 'qty-change-qty', { 'disabled': disabled })}
						onClick={this.handleQtyChange(1)}
					>+</span>
				</Tooltip>
			];
		}
		return (
			<div className={classNames('qty--container', 'qty-context-' + this.props.context)}>
				<div className={classNames('qty', 'clearfix')}>
					{elements}
				</div>
			</div>
		);
	}
});

module.exports = ProductBasket;
