import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames'
import { Button } from '@fe/gousto-generic'

const Submit = React.createClass({
	mixins: [PureRenderMixin],
	propTypes: {
		canSave: PropTypes.bool,
		onSaveChoices: PropTypes.func,
		requiresSave: PropTypes.bool,
		choicesChanged: PropTypes.bool,
		statusText: PropTypes.string,
		saving: PropTypes.bool,
	},

	getDefaultProps: function() {
		return {
			statusText: 'Update My Order',
			requiresSave: false,
		};
	},

	handleSaveChoices(e) {
		e.nativeEvent.preventDefault()
		e.preventDefault()
		this.props.onSaveChoices()
	},

	render() {
		return (
			<div>
				<div className={classNames('ordersummary-sticky', { grow: (this.props.choicesChanged && this.props.requiresSave) })}>
					<div className="container">
						<Button
							id="submit-product-choices"
							className={classNames('gbtn-primary', 'col-xs-12', 'col-sm-4', 'pull-right', { disabled: !this.props.canSave })}
							disabled={!this.props.canSave}
							loading={!this.props.canSave}
							onClick={this.handleSaveChoices}
						>
							{this.props.statusText}
						</Button>
					</div>
				</div>
				<p className="text-center ordersummary-skip">
					<a className={'highlight-text-link'} data-selid="skip-to-deliveries" href="/my-deliveries">
						Go to my account
					</a>
				</p>
			</div>
		)
	},
})

module.exports = Submit
