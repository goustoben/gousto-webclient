import React, { PropTypes } from 'react'
import Button from 'Button'
import css from './CancelOrderModalContent.css'
import { Alert } from 'goustouicomponents'

class CancelOrderModalContent extends React.PureComponent {

	static propTypes = {
		orderId: PropTypes.string,
		didCancelOrderError: PropTypes.bool,
		close: PropTypes.func,
		orderCancel: PropTypes.func,
		cancelOrderModalToggleVisibility: PropTypes.func,
	}

	static defaultProps = {
		orderId: '',
		didCancelOrderError: false,
		close: () => {},
		orderCancel: () => {},
		cancelOrderModalToggleVisibility: () => {},
	}

	handleCancelBox = () => {
		const { orderCancel, cancelOrderModalToggleVisibility, orderId } = this.props
		orderCancel(orderId)
			.then(() => cancelOrderModalToggleVisibility(false, orderId))
	}

	render() {
		const { close, didCancelOrderError } = this.props

		return (
			<div className={css.body}>
				<h2 className={css.modalTitle}>Cancel this box?</h2>
				<div className={css.modalBodyText}>
					Just double-checking – if you click yes, we can’t restore this delivery. Please confirm your choice:
				</div>
				{didCancelOrderError ?
					<Alert type="danger">
						Whoops, there was a problem cancelling this order, please try again.
					</Alert>
				: null}
				<div className={css.bottom}>
					<Button onClick={close} color={'negative'} className={css.firstButton} noDecoration>
						Go Back
					</Button>
					<Button color={'primary'} noDecoration onClick={() => this.handleCancelBox()}>
						Cancel Box
					</Button>
				</div>
			</div>
		)
	}
}

export default CancelOrderModalContent
