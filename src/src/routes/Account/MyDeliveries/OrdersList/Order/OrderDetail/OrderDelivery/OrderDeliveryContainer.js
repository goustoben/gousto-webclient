import Immutable from 'immutable'
import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import { clearUpdateDateErrorAndPending, orderAddressChange } from 'actions/order'
import OrderDelivery from './OrderDelivery'

function mapStateToProps(state, ownProps) {
  const order = state.user.getIn(['newOrders', ownProps.orderId])
  const shippingAddressId = order.get('shippingAddressId')
  const addressUpdateError = state.error.get(actionTypes.ORDER_ADDRESS_CHANGE)
  const hasUpdateDeliveryAddressError = addressUpdateError ? addressUpdateError.orderId === ownProps.orderId :false

  return {
    shippingAddressId,
    addresses: state.user.get('addresses', Immutable.Map({})).filter((address) => address.get('type') === 'shipping'),
    availableFrom: order.get('availableFrom'),
    availableTo: order.get('availableTo'),
    hasUpdateDeliveryDayError: !!state.error.get(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT),
    hasUpdateDeliveryAddressError,
    isPendingUpdateAddress: state.pending.get(actionTypes.ORDER_ADDRESS_CHANGE) === ownProps.orderId,
  }
}

const OrderDeliveryContainer = connect(mapStateToProps, {
  clearUpdateDateErrorAndPending,
  orderAddressChange
})(OrderDelivery)

export default OrderDeliveryContainer
