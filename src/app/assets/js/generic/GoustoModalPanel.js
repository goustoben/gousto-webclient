'use strict';

var React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

var GoustoModalPanel = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return {
			title: '',
			show: false
		};
	},

	render: function() {
		var content = [];
		var footer = [];

		React.Children.forEach(this.props.children, (el, index) => {
			if (typeof el === 'object' && typeof el.type != 'undefined' && typeof el.type.displayName != 'undefined' && el.type.displayName === 'GoustoButton') {
				footer.push(el);
			} else if (typeof el === 'object') {
				content.push(el);
			} else {
				content.push(<p key={index}>{el}</p>);
			}
		});

		return (
			<div>
				<div className={`modal-body ${this.props.className ? this.props.className : ''}`}>
					{content}
				</div>
				{(() => {
					if (footer.length > 0) {
						return (
							<div className="modal-footer">
								{footer}
							</div>
						);
					}
				})()}
			</div>
		);
	}
});

module.exports = GoustoModalPanel;
