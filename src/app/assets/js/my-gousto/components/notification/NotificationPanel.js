'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const NotificationPanel = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function () {
		return ({
			type: '',
			message: '',
			url: '',
			title: '',
			urlTitle: ''
		});
	},

	getIcon: function(type) {
		let glyph = '';
		switch (type) {
			case 'warning':
				glyph = 'glyphicon-exclamation-sign';
				break;
			case 'notify':
			case 'alert':
				glyph = 'glyphicon-info-sign';
				break;
			case 'confirm':
				glyph = 'glyphicon-pencil';
				break;
		}
		return glyph;
	},

	render: function () {
		return (
			<div className={'notification notification--' + this.props.type}>
				<a href={'/' + this.props.url} className='notification--link'>
					<span className={'notification--icon glyphicon ' + this.getIcon(this.props.type)}></span>
					<span>
						<span className={'notification--title'}>{this.props.title}&nbsp;</span>
						<br className={'visible-xs'} />
						<span>
							{this.props.message}
							&nbsp;
							<span className="glyphicon glyphicon-menu-right notification--glyph"></span>
						</span>
					</span>
				</a>
			</div>
		);
	}
});

module.exports = NotificationPanel;
