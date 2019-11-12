import { connect } from 'react-redux'
import Immutable from 'immutable'
import actionTypes from 'actions/actionTypes'
import { orderGetDeliveryDays, clearUpdateDateErrorAndPending } from 'actions/order'
import { EditDate } from './EditDate'

function mapStateToProps(state, ownProps) {
  const orderId = ownProps.orderId
  const orders = state.user.get('newOrders')
  const order = orders.get(orderId)
  const shippingAddressId = order.get('shippingAddressId')
  const deliveryDays = order.get('availableDeliveryDays')
  const coreDeliveryDayId = order.get('coreDeliveryDayId')
  const deliverySlotId = order.get('deliverySlotId')

  return {
    orderId,
    deliveryDays,
    recipes: order.get('recipes'),
    portionsCount: order.get('portionsCount'),
    recipesStock: state.recipesStock,
    coreDeliveryDayId,
    deliverySlotId,
    shippingAddressId: shippingAddressId,
    addresses: state.user.get('addresses', Immutable.Map({})).filter((address) => address.get('type') === 'shipping'),
    formSelectedAddress: state.user.getIn(['accountPendingFormData', orderId, 'shippingAddressId'], shippingAddressId),
    orders,
    isPendingUpdateDayAndSlot: state.pending.get(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT),
    isPendingUpdateAddress: state.pending.get(actionTypes.ORDER_ADDRESS_CHANGE),
    isErrorUpdateDayAndSlot: state.error.get(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, null),
    isErrorUpdateAddress: state.error.get(actionTypes.ORDER_ADDRESS_CHANGE, null),
    availableDeliveryDays: order.get('availableDeliveryDays'),
  }
}

export const EditDateContainer = connect(mapStateToProps, {
  orderGetDeliveryDays,
  clearUpdateDateErrorAndPending,
})(EditDate)
