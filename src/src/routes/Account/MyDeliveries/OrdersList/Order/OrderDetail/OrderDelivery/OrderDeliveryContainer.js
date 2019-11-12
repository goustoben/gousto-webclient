import { connect } from 'react-redux'
import { clearUpdateDateErrorAndPending } from 'actions/order'
import OrderDelivery from './OrderDelivery'

function mapStateToProps(state, ownProps) {
  const order = state.user.getIn(['newOrders', ownProps.orderId])
  const shippingAddressId = order.get('shippingAddressId')

  return {
    shippingAddressObj: state.user.getIn(['addresses', shippingAddressId]),
    availableFrom: order.get('availableFrom'),
    availableTo: order.get('availableTo'),
    hasUpdateDeliveryDayError: state.error.get('ORDER_UPDATE_DELIVERY_DAY_AND_SLOT')
  }
}

const OrderDeliveryContainer = connect(mapStateToProps, {
  clearUpdateDateErrorAndPending
})(OrderDelivery)

export default OrderDeliveryContainer
