import { connect } from 'react-redux'
import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import OrderDelivery from './OrderDelivery'
import { orderGetDeliveryDays } from "actions/order/orderGetDeliveryDays"
import { clearUpdateDateErrorAndPending } from "actions/order/clearUpdateDateErrorAndPending"
import { recipesLoadStockByDate } from "actions/recipes/recipesLoadStockByDate"
import { userTrackToggleEditDateSection } from "actions/user/userTrackToggleEditDateSection"
import { userToggleEditDateSection } from "actions/user/userToggleEditDateSection"

function mapStateToProps(state, ownProps) {
  const order = state.user.getIn(['newOrders', ownProps.orderId])
  const shippingAddressId = order.get('shippingAddressId')
  const addressLoading = state.user.get('addresses', Immutable.Map({})).filter((address) => address.get('type') === 'shipping').size === 0

  return {
    shippingAddressId,
    addressLoading,
    availableFrom: order.get('availableFrom'),
    availableTo: order.get('availableTo'),
    hasUpdateDeliveryDayError: !!state.error.get(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT),
  }
}

const OrderDeliveryContainer = connect(mapStateToProps, {
  clearUpdateDateErrorAndPending,
  orderGetDeliveryDays,
  recipesLoadStockByDate: recipesLoadStockByDate,
  userTrackToggleEditDateSection,
  userToggleEditDateSection
})(OrderDelivery)

export default OrderDeliveryContainer
