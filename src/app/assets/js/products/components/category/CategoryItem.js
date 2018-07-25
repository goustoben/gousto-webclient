'use strict';

var React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const Gousto = require('@fe/gousto-generic');

var CategoryItem = React.createClass({
	mixins: [PureRenderMixin],

	handleClick: function() {
		this.props.onCategoryChange(this.props.id);
	},

	render: function() {
		if (this.props.view === 'desktop') {
			var classNames = 'category-list-item' + (this.props.selected === true ? ' selected' : '');
			var newIcon = this.props.recently_added ? (<Gousto.Svg fileName="icon-new-circle" />): '';

			return (
				<li onClick={this.handleClick} className={classNames}>
					{this.props.title}
					{newIcon}
				</li>
			);
		} else {
			return (
				<option value={this.props.id}>{this.props.title}</option>
			);
		}

	}
});

module.exports = CategoryItem;
