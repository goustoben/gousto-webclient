'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const Widget = require('./widget/Widget.js');

const MyGoustoContainer = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return({
			widgets: {},
			widgetList: []
		});
	},

	loadWidget: function(widgetName) {
		let widgetKey = widgetName.replace(/-/g, '_').toUpperCase();
		let widgetPath = './' + widgetName;
		let widgetComponent;
		let type;

		try {
			widgetComponent = require(widgetPath + '/index.js');
			let widgets = this.props.widgets;
			type = (widgets && widgets[widgetKey] && widgets[widgetKey].WIDGET_TYPE) ? widgets[widgetKey].WIDGET_TYPE : undefined;
		}
		catch (e) {
			widgetComponent = 'div';
		}

		return ({
			component: widgetComponent,
			type: type
		});
	},

	render: function() {
		return (
			<div className="my-gousto">
				{(() => {
					return (
						this.props.widgetList.map((widgetName, index) => {
							let widgetData = this.loadWidget(widgetName);
							return (
								<Widget type={widgetData.type} name={widgetName} key={index}>
									{React.createElement(widgetData.component, {data: this.props.data})}
								</Widget>
							);
						})
					);
				})()}
			</div>
		);
	}
});

module.exports = MyGoustoContainer;
