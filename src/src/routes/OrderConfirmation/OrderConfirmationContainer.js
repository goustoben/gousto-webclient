import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { locationQuery } from 'selectors/routing'
import { getBasket, getProductCategories } from 'selectors/root'
import { getAgeVerified } from 'selectors/user'
import { getBasketOrderDetails } from 'selectors/basket'
import { basketProductAdd, basketProductRemove } from 'actions/basket'
import userActions from 'actions/user'
import { productsFilteredByCategory } from 'actions/products'
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
    basket: getBasket(state),
    productsCategories: getProductCategories(state),
    products: state.products.toJS(),
    ageVerified: getAgeVerified(state),
    filteredProducts: state.productsFilteredByCategory
  })
}

const mapDispatchToProps = {
  userVerifyAge: userActions.userVerifyAge,
  basketProductAdd,
  basketProductRemove,
  productsFilteredByCategory
}

const OrderConfirmationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation))

export default OrderConfirmationContainer
