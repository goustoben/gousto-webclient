import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import recipesActions from 'actions/recipes'
import orderActions from 'actions/order'
import EditDelivery from './EditDelivery'
import { Alert, Button } from 'goustouicomponents'

import css from './OrderDelivery.css'


class OrderDelivery extends React.PureComponent {
	static propTypes = {
		date: PropTypes.string,
		timeStart: PropTypes.string,
		timeEnd: PropTypes.string,
		shippingAddressObj: PropTypes.instanceOf(Immutable.Map),
		editDeliveryMode: PropTypes.bool,
		orderState: PropTypes.string,
		orderId: PropTypes.string,
		fetchSuccess: PropTypes.bool,
	}

	static defaultProps = {
		date: '',
		timeStart: '',
		timeEnd: '',
		shippingAddressObj: Immutable.Map({
			line1: '',
			line2: '',
			line3: '',
			town: '',
			postcode: '',
			name: '',
		}),
		editDeliveryMode: false,
		orderState: '',
		orderId: '',
		fetchSuccess: false,
	}

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	}

	onClickFunction() {
		const { availableFrom, availableTo, shippingAddressId, orderId, editDeliveryMode } = this.props
		Promise.all([
			this.context.store.dispatch(orderActions.orderGetDeliveryDays(availableFrom, availableTo, shippingAddressId, orderId)),
			this.context.store.dispatch(recipesActions.recipesLoadStockByDate(availableFrom, availableTo)),
		])
			.then(this.context.store.dispatch(actions.userOpenCloseEditSection(orderId, !editDeliveryMode)))
	}

	static constructShippingAddress(shippingAddressObj) {
		let shippingAddress = shippingAddressObj.get('line1')
		const line2 = shippingAddressObj.get('line2')
		const line3 = shippingAddressObj.get('line3')
		const town = shippingAddressObj.get('town')
		shippingAddress += line2 ? `, ${line2}` : ''
		shippingAddress += line3 ? `, ${line3}` : ''
		shippingAddress += town ? `, ${town}` : ''
		shippingAddress += ` ${shippingAddressObj.get('postcode')}`

		return shippingAddress
	}

	render() {
		const { recipesPeriodStockFetchError, orderDeliveryDaysFetchError } = this.props

		return (
			<div data-testing="recipesDeliverySection">
				{this.props.editDeliveryMode && this.props.fetchSuccess ?
					<EditDelivery
						editDeliveryMode={this.props.editDeliveryMode}
						orderId={this.props.orderId}
						availableFrom={this.props.availableFrom}
						availableTo={this.props.availableTo}
					/>
				:
					<div>
						<div className={`${css.header} ${css.bold}`}>
							Delivery details
						</div>
						<div className={css.subSection}>
							<div className={css.bold}>
								{this.props.date}
							</div>
							<div>
								{this.props.timeStart} - {this.props.timeEnd}
							</div>
						</div>
						<div className={css.subSection}>
							<div className={`${css.capitalize} ${css.bold}`}>
								{this.props.shippingAddressObj.get('name')}
							</div>
							<div>
								{OrderDelivery.constructShippingAddress(this.props.shippingAddressObj)}
							</div>
						</div>
						{(recipesPeriodStockFetchError != null || orderDeliveryDaysFetchError != null) ?
							<div>
								<Alert type="danger">
									There was a problem editing your order. Please try again later.
								</Alert>
							</div>
						: null}
						{['recipes chosen', 'menu open'].indexOf(this.props.orderState) > -1 ?
							<div className={css.button}>
								<Button onClick={() => this.onClickFunction()} color={'secondary'} noDecoration>
									Edit details
								</Button>
							</div>
						: null}
					</div>
				}
			</div>
		)
	}
}

export default OrderDelivery
