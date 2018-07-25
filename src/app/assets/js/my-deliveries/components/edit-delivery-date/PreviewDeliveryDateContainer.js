import React, { PropTypes } from 'react'
import PreviewDeliveryDate from './PreviewDeliveryDate'
import EditDeliveryDateContainer from './EditDeliveryDateContainer'
import { formatFullDate } from '../../datetimeFormatter'

class PreviewDeliveryDateContainer extends React.Component {

	static propTypes = {
		initialOrder: PropTypes.object.isRequired,
		setOrder: PropTypes.func,
		orders: PropTypes.array,
	}

	static defaultProps = {
		setOrder: () => {},
		orders: [],
	}

	state = {
		isEditingDate: false,
		order: this.props.initialOrder,
	}

	setOrder = (orderDetla) => {
		const order = Object.assign({}, this.state.order, orderDetla)
		this.props.setOrder(order)
		this.setState({
			order,
			isEditingDate: false,
		})
	}

	toggleEdit = () => {
		this.setState({
			isEditingDate: !this.state.isEditingDate,
		})
	}

	isOrderEditable = () => {
		const phase = this.state.order.phase
		const editablePhase = ['pre_menu', 'awaiting_choices', 'open']

		return editablePhase.indexOf(phase) > -1
	}

	render() {
		return (
			<PreviewDeliveryDate
				deliveryDate={formatFullDate(this.state.order.delivery_date)}
				deliverySlot={this.state.order.delivery_slot}
				toggleEdit={this.toggleEdit}
				isDateEditable={this.isOrderEditable()}
				isEditingDate={this.state.isEditingDate}
			>
				<EditDeliveryDateContainer
					orderId={this.state.order.id}
					period={this.state.order.period}
					orderRecipes={this.state.order.recipe_items}
					initialDeliveryDate={formatFullDate(this.state.order.delivery_date)}
					initialDeliverySlot={this.state.order.delivery_slot}
					shippingPostcode={this.state.order.shipping_address.postcode}
					cutoffDatetime={this.state.order.when_cutoff}
					setOrder={this.setOrder}
					isEditingDate={this.state.isEditingDate}
					existingOrders={this.props.orders}
				/>
			</PreviewDeliveryDate>
		)
	}
}

export default PreviewDeliveryDateContainer
