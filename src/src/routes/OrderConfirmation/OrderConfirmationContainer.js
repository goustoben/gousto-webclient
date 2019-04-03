import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { locationQuery } from 'selectors/routing'
import { getBasket, getProductCategories } from 'selectors/root'
import { getAgeVerified } from 'selectors/user'
import { basketProductAdd, basketProductRemove } from 'actions/basket'
import OrderConfirmation from './OrderConfirmation'

const mapStateToProps = (state) => {
  const order = state.basket.get('orderDetails')
  const locationQueryParam = locationQuery(state)

  const showHeader = state.temp.get('showHeader') || (locationQueryParam && locationQueryParam['order_action'])

  return ({
    showHeader,
    order,
    basket: getBasket(state),
    productsCategories: getProductCategories(state),
    products: state.products.toJS(),
    ageVerified: getAgeVerified(state)
  })
}

const mapDispatchToProps = {
  basketProductAdd,
  basketProductRemove
}

const OrderConfirmationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation))

export default OrderConfirmationContainer
