import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import { orderGetDeliveryDays, clearUpdateDateErrorAndPending } from 'actions/order'
import { getUserNewOrders } from 'selectors/user'
import { EditDate } from './EditDate'
import { filterOutNDDOptionsWhenNoRecipes } from './util'

function mapStateToProps(state, ownProps) {
  const { orderId } = ownProps
  const orders = getUserNewOrders(state)
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
    shippingAddressId: shippingAddressId,
    isPendingUpdateDayAndSlot: state.pending.get(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT),
    portionsCount,
  }
}

export const EditDateContainer = connect(mapStateToProps, {
  orderGetDeliveryDays,
  clearUpdateDateErrorAndPending,
})(EditDate)
