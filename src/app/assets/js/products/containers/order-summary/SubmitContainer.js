'use strict';

var React = require('react');
var ReactRedux = require('react-redux');
const PureRenderMixin = require('react-addons-pure-render-mixin');

var Actions = require('../../actions');

var SummarySubmit = require('../../../order-summary/components/submit/Submit');

var OrderSummarySubmit = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		return (
			<SummarySubmit
				onSaveChoices={this.props.saveChoices}
				canSave={this.props.canSave}
				choicesChanged={this.props.choicesChanged}
				requiresSave={this.props.requiresSave}
				statusText={this.props.statusText}
			/>
		);
	}
});

const mapStateToProps = (state) => {
	return {
		canSave: state.canSave,
		initialUserChoices: state.initialUserChoices,
		choicesChanged: !(state.initialUserChoices && state.userChoices && state.initialUserChoices.equals(state.userChoices)),
		requiresSave: (state.saveStatus) ? state.saveStatus.get('requiresSave') : false,
		statusText: (state.saveStatus) ? state.saveStatus.get('statusText') : '',
		userChoices: state.userChoices,
	}
}

module.exports = ReactRedux.connect(
	mapStateToProps,
	Actions
)(OrderSummarySubmit);
