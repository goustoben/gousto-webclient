import Immutable from 'immutable'
import { connect } from 'react-redux'
import actions from 'actions'
import { getAddOnsBeforeOrderConfirmation } from 'selectors/features'
import { getSlot } from 'utils/deliveries'
import actionTypes from 'actions/actionTypes'
import { checkoutTransactionalOrder } from 'actions/checkout'
import { Checkout } from './Checkout'

function getCoreSlotId(deliveryDays, date, slotId) {
  const slot = getSlot(deliveryDays, date, slotId)
  let coreSlotId = ''
  if (slot) {
    coreSlotId = slot.get('coreSlotId', '')
  }

  return coreSlotId
}

const mapStateToProps = (state) => ({
  recipes: state.basket.get('recipes'),
  numPortions: state.basket.get('numPortions'),
  promoCode: state.basket.get('promoCode'),
  postcode: state.basket.get('postcode'),
  orderId: state.basket.get('orderId'),
  slotId: getCoreSlotId(state.boxSummaryDeliveryDays, state.basket.get('date'), state.basket.get('slotId')),
  deliveryDayId: state.boxSummaryDeliveryDays.getIn([state.basket.get('date'), 'coreDayId']),
  addressId: state.basket.getIn(['address', 'id'], ''),
  userOrders: state.user.get('orders', Immutable.List([])),
  isAuthenticated: state.auth.get('isAuthenticated'),
  checkoutPending: state.pending.get(actionTypes.BASKET_CHECKOUT),
  menuRecipes: state.menuRecipes,
  stock: state.menuRecipeStock,
  pricingPending: state.pricing.get('pending', false),
  orderSavePending: state.pending.get('ORDER_SAVE', false),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE, null),
  basketPreviewOrderChangePending: state.pending.get('BASKET_PREVIEW_ORDER_CHANGE', false),
  isAddOnsFeatureFlagOn: getAddOnsBeforeOrderConfirmation(state),
})

const CheckoutContainer = connect(mapStateToProps, {
  basketCheckedOut: actions.basketCheckedOut,
  boxSummaryVisibilityChange: actions.boxSummaryVisibilityChange,
  basketProceedToCheckout: actions.basketProceedToCheckout,
  orderUpdate: actions.orderUpdate,
  checkoutTransactionalOrder,
})(Checkout)

export { CheckoutContainer }
