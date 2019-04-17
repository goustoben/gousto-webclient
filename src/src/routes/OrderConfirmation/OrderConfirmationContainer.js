import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Immutable from 'immutable'
import { locationQuery } from 'selectors/routing'
import { getBasket, getProductCategories } from 'selectors/root'
import { getAgeVerified, getReferralOffer } from 'selectors/user'
import { getBasketOrderDetails } from 'selectors/basket'
import actionTypes from 'actions/actionTypes'
import basketActions from 'actions/basket'
import { filterProductCategory } from 'actions/filters'
import userActions, { userFetchReferralOffer } from 'actions/user'
import OrderConfirmation from './OrderConfirmation'
import { getHeaderDetails } from './helper'

const mapStateToProps = (state) => {
  const locationQueryParam = locationQuery(state)
  const order = getBasketOrderDetails(state)
  const headerDetails = !!order && getHeaderDetails(order)
  const showHeader = (!!state.temp.get('showHeader') || !!(locationQueryParam && locationQueryParam['order_action'])) && !!headerDetails

  return ({
    showHeader,
    headerDetails,
    showOrderConfirmationReceipt: !!order,
    basket: getBasket(state),
    productsCategories: getProductCategories(state),
    products: state.products.toJS(),
    ageVerified: getAgeVerified(state),
    selectedCategory: state.filters.get('selectedCategory') || 'all-products',
    saving: state.pending.get(actionTypes.BASKET_CHECKOUT),
    saveRequired: state.basket.get('unsaved'),
    saveError: state.error.get(actionTypes.BASKET_CHECKOUT),
    isOrderConfirmation: true,
    rafOffer: getReferralOffer(state) || Immutable.Map(),
  })
}

const mapDispatchToProps = {
  filterProductCategory,
  userVerifyAge: userActions.userVerifyAge,
  onSave: basketActions.basketUpdateProducts,
  userFetchReferralOffer,
}

const OrderConfirmationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation))

export default OrderConfirmationContainer
