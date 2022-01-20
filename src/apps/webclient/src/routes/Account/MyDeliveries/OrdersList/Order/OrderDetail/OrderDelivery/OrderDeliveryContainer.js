import { connect } from 'react-redux'
import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { clearUpdateDateErrorAndPending, orderGetDeliveryDays } from 'actions/order'
import recipesActions from 'actions/recipes'
import userActions from 'actions/user'
import OrderDelivery from './OrderDelivery'

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
  recipesLoadStockByDate: recipesActions.recipesLoadStockByDate,
  userTrackToggleEditDateSection: userActions.userTrackToggleEditDateSection,
  userToggleEditDateSection: userActions.userToggleEditDateSection
})(OrderDelivery)

export default OrderDeliveryContainer
