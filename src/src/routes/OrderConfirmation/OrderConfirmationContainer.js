import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { locationQuery } from 'selectors/routing'
import { getBasket, getProductCategories } from 'selectors/root'
import { getAgeVerified } from 'selectors/user'
import { getBasketOrderDetails } from 'selectors/basket'
import { basketProductAdd, basketProductRemove } from 'actions/basket'
import userActions from 'actions/user'
import productActions from 'actions/products'
import OrderConfirmation from './OrderConfirmation'
import { getHeaderDetails } from './helper'

const mapStateToProps = (state) => {
  const locationQueryParam = locationQuery(state)
  const order = getBasketOrderDetails(state)
  const headerDetails = !!order && getHeaderDetails(order)
  const showHeader = (!!state.temp.get('showHeader') || !!(locationQueryParam && locationQueryParam['order_action'])) && !!headerDetails
  const filteredProducts = state.productsFilteredByCategory ? state.productsFilteredByCategory : null

  return ({
    showHeader,
    headerDetails,
    basket: getBasket(state),
    productsCategories: getProductCategories(state),
    products: state.products.toJS(),
    ageVerified: getAgeVerified(state),
    filteredProducts: filteredProducts
  })
}

const mapDispatchToProps = {
  userVerifyAge: userActions.userVerifyAge,
  basketProductAdd,
  basketProductRemove,
  productsFilteredByCategory: productActions.productsFilteredByCategory
}

const OrderConfirmationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation))

export default OrderConfirmationContainer
