import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import { orderGetDeliveryDays, clearUpdateDateErrorAndPending } from 'actions/order'
import { EditDate } from './EditDate'

function mapStateToProps(state, ownProps) {
  const { orderId } = ownProps
  const orders = state.user.get('newOrders')
  const order = orders.get(orderId)
  const shippingAddressId = order.get('shippingAddressId')
  const deliveryDays = order.get('availableDeliveryDays')
  const coreDeliveryDayId = order.get('coreDeliveryDayId')
  const deliverySlotId = order.get('deliverySlotId')
  const recipes = order.get('recipes')
  const portionsCount = state.subscription.getIn(['box', 'numPortions'])

  return {
    orderId,
    orders,
    recipes,
    deliveryDays,
    recipesStock: state.recipesStock,
    coreDeliveryDayId,
    deliverySlotId,
    shippingAddressId: shippingAddressId,
    isPendingUpdateDayAndSlot: state.pending.get(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT),
    portionsCount,
  }
}

export const EditDateContainer = connect(mapStateToProps, {
  orderGetDeliveryDays,
  clearUpdateDateErrorAndPending,
})(EditDate)
