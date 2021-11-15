import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { EditDate } from './EditDate'
import { filterOutNDDOptionsWhenNoRecipes } from './util'
import { orderUpdateDayAndSlot } from "actions/order/orderUpdateDayAndSlot"
import { orderGetDeliveryDays } from "actions/order/orderGetDeliveryDays"
import { clearUpdateDateErrorAndPending } from "actions/order/clearUpdateDateErrorAndPending"
import { userTrackDateSelected } from "actions/user/userTrackDateSelected"
import { userTrackSlotSelected } from "actions/user/userTrackSlotSelected"

function mapStateToProps(state, ownProps) {
  const { orderId } = ownProps
  const orders = state.user.get('newOrders')
  const order = orders.get(orderId)
  const shippingAddressId = order.get('shippingAddressId')
  const coreDeliveryDayId = order.get('coreDeliveryDayId')
  const deliverySlotId = order.get('deliverySlotId')
  const recipes = order.get('recipes')
  const portionsCount = state.subscription.getIn(['box', 'numPortions'])
  const deliveryDays = filterOutNDDOptionsWhenNoRecipes(state, ownProps)

  return {
    orderId,
    orders,
    recipes,
    deliveryDays,
    recipesStock: state.recipesStock,
    coreDeliveryDayId,
    deliverySlotId,
    shippingAddressId,
    isPendingUpdateDayAndSlot: state.pending.get(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT),
    portionsCount,
  }
}

export const EditDateContainer = connect(mapStateToProps, {
  clearUpdateDateErrorAndPending,
  orderGetDeliveryDays,
  orderUpdateDayAndSlot,
  userTrackDateSelected,
  userTrackSlotSelected,
})(EditDate)
