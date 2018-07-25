'use strict';

const React = require('react');
const Tooltip = require('rc-tooltip');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const Gousto = require('@fe/gousto-generic');

const StatPanel = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return({
			title: '',
			svg: '',
			description: '',
			tooltipText: '',
			stat: {
				unit: '',
				value: 0
			}
		});
	},

	render: function() {
		if (this.props.title) {
			return (
				<div className="col-xs-12 col-sm-6 col-md-3 stat-panel-container">
					<div className="stat-panel">
						<p className="stat-panel-title">{this.props.title}</p>
						<Gousto.Svg
							fileName={'icon-' + this.props.svg}
							className={"stat-panel-svg"}
						/>
						<Tooltip
							overlay={<div>{this.props.tooltipText}</div>}
							trigger={['click']}
							placement='top'
						>
							<div className="stat-subpanel">
								<p className="stat-description col-xs-8">{this.props.description}</p>
								<div className="stat-data col-xs-4">
									<p className="stat-data-value">{this.props.stat.value}</p>
									<p className="stat-data-unit">{this.props.stat.unit}</p>
								</div>
							</div>
						</Tooltip>
					</div>
				</div>
			);
		} else {
			return (
				<div className="col-xs-12 col-sm-6 col-md-3 mobile-hide">
					<div className="stat-panel">
						<p className="stat-panel-title locked">Locked stat</p>
						<Gousto.Svg
							fileName={'icon-locked'}
							className={"stat-panel-svg locked-svg"}
						/>
					</div>
				</div>
			);
		}
	}
});

module.exports = StatPanel;
