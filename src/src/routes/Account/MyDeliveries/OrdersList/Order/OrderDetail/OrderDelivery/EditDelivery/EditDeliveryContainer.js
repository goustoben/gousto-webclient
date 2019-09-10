import { connect } from 'react-redux'
import Immutable from 'immutable'
import actionTypes from 'actions/actionTypes'
import EditDelivery from './EditDelivery'

function mapStateToProps(state, ownProps) {
  const orderId = ownProps.orderId
  const orders = state.user.get('newOrders')
  const order = orders.get(orderId)
  const shippingAddresId = order.get('shippingAddressId')

  return {
    orderId,
    deliveryDays: order.get('availableDeliveryDays'),
    recipes: order.get('recipes'),
    portionsCount: order.get('portionsCount'),
    recipesStock: state.recipesStock,
    coreDeliveryDayId: order.get('coreDeliveryDayId'),
    deliverySlotId: order.get('deliverySlotId'),
    shippingAddressId: shippingAddresId,
    addresses: state.user.get('addresses', Immutable.Map({})).filter((address) => address.get('type') === 'shipping'),
    formSelectedAddress: state.user.getIn(['accountPendingFormData', orderId, 'shippingAddressId'], shippingAddresId),
    orders,
    isPendingUpdateDayAndSlot: state.pending.get(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT),
    isPendingUpdateAddress: state.pending.get(actionTypes.ORDER_ADDRESS_CHANGE),
    isErrorUpdateDayAndSlot: state.error.get(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, null),
    isErrorUpdateAddress: state.error.get(actionTypes.ORDER_ADDRESS_CHANGE, null),
  }
}

const EditDeliveryContainer = connect(mapStateToProps, {})(EditDelivery)

export default EditDeliveryContainer
