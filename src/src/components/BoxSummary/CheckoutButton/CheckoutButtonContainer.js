import Immutable from 'immutable'
import { connect } from 'react-redux'
import actions from 'actions'
import { getSlot } from 'utils/deliveries'
import actionTypes from 'actions/actionTypes'
import { checkoutTransactionalOrder } from 'actions/checkout'
import CheckoutButton from './CheckoutButton'

function getCoreSlotId(deliveryDays, date, slotId) {
  const slot = getSlot(deliveryDays, date, slotId)
  let coreSlotId = ''
  if (slot) {
    coreSlotId = slot.get('coreSlotId', '')
  }

  return coreSlotId
}

const mapStateToProps = ({ auth, basket, boxSummaryDeliveryDays, error, user }) => ({
  recipes: basket.get('recipes'),
  numPortions: basket.get('numPortions'),
  promoCode: basket.get('promoCode'),
  postcode: basket.get('postcode'),
  orderId: basket.get('orderId'),
  slotId: getCoreSlotId(boxSummaryDeliveryDays, basket.get('date'), basket.get('slotId')),
  deliveryDayId: boxSummaryDeliveryDays.getIn([basket.get('date'), 'coreDayId']),
  addressId: basket.getIn(['address', 'id'], ''),
  userOrders: user.get('orders', Immutable.List([])), // eslint-disable-line new-cap
  orderSaveError: error.get(actionTypes.ORDER_SAVE, null),
  isAuthenticated: auth.get('isAuthenticated'),
})

const CheckoutButtonContainer = connect(mapStateToProps, {
  basketCheckedOut: actions.basketCheckedOut,
  boxSummaryVisibilityChange: actions.boxSummaryVisibilityChange,
  basketProceedToCheckout: actions.basketProceedToCheckout,
  orderUpdate: actions.orderUpdate,
  checkoutTransactionalOrder,
})(CheckoutButton)

export default CheckoutButtonContainer
