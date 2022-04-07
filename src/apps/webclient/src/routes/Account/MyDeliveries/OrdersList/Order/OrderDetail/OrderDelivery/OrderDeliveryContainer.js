import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { clearUpdateDateErrorAndPending, orderGetDeliveryDays } from 'actions/order'
import recipesActions from 'actions/recipes'
import userActions from 'actions/user'
import OrderDelivery from './OrderDelivery'

function mapStateToProps(state, ownProps) {
  const order = state.user.getIn(['newOrders', ownProps.orderId])
  const shippingAddressId = order.get('shippingAddressId')

  return {
    availableFrom: order.get('availableFrom'),
    availableTo: order.get('availableTo'),
    hasUpdateDeliveryDayError: !!state.error.get(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT),
    shippingAddressId,
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
