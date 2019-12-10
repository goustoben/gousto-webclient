import { connect } from 'react-redux'
import { getBasket, getProductCategories } from 'selectors/root'
import { getDesserts, getProductsLoadError } from 'selectors/products'
import { getAgeVerified } from 'selectors/user'
import { isOrderDetailsLoading } from 'selectors/orderConfirmation'
import { getBasketProductsCost } from 'selectors/basket'
import { orderDetails, orderConfirmationRedirect } from 'actions/orderConfirmation'
import { basketReset, basketUpdateProducts } from 'actions/basket'
import {
  trackContinueOrderAddOnsClick,
  trackSkipOrderAddOnsClick,
  trackErrorSkipOrderAddOns,
} from 'actions/orderAddOn'
import { OrderAddOns } from './OrderAddOns'

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps
  const orderId = location.pathname.split('/order-add-ons/')[1] || ''
  const orderAction = location && location.query && location.query.order_action

  return {
    ageVerified: getAgeVerified(state),
    basket: getBasket(state),
    basketProductsCost: getBasketProductsCost(state),
    isPageLoading: isOrderDetailsLoading(state),
    orderAction,
    orderId,
    productsCategories: getProductCategories(state),
    products: getDesserts(state),
    productsLoadError: getProductsLoadError(state),
  }
}

const OrderAddOnsContainer = connect(mapStateToProps, {
  basketReset,
  basketUpdateProducts,
  orderConfirmationRedirect,
  orderDetails,
  trackContinueOrderAddOnsClick,
  trackSkipOrderAddOnsClick,
  trackErrorSkipOrderAddOns,
})(OrderAddOns)

export {
  OrderAddOnsContainer
}
