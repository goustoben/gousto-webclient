import React, { PropTypes } from 'react'
import Button from 'Button'
import actions from 'actions/order'
import css from './OrderRestoreButton.css'
import Alert from 'Alert'
import Content from 'containers/Content'

class OrderRestoreButton extends React.PureComponent {

	static propTypes = {
		userId: PropTypes.string,
		orderId: PropTypes.string,
		deliveryDayId: PropTypes.string,
		projectedOrderRestoreError: PropTypes.string,
	}

	static defaultProps = {
		userId: '',
		orderId: '',
		deliveryDayId: '',
		projectedOrderRestoreError: null,
	}

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	}

	handleRestoreBox = () => {
		this.context.store.dispatch(actions.projectedOrderRestore(this.props.orderId, this.props.userId, this.props.deliveryDayId))
	}

	render() {
		return (
			<div>
				{this.props.projectedOrderRestoreError ?
					<Alert type="danger">
						<Content contentKeys="mydeliveriesOrderOrderrestorebuttonRestoreprojectederror">
							<span>Whoops, there was a problem restoring this order, please try again.</span>
						</Content>
					</Alert>
				: null}
				<div className={css.button}>
					<Button onClick={() => this.handleRestoreBox()}>
						Restore delivery
					</Button>
				</div>
			</div>
		)
	}
}

export default OrderRestoreButton
