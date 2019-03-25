import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { locationQuery } from 'selectors/routing'
import { getAgeVerified } from 'selectors/user'
import OrderConfirmation from './OrderConfirmation'

const mapStateToProps = (state) => {
  const order = state.basket.get('orderDetails')
  const locationQueryParam = locationQuery(state)

  const showHeader = state.temp.get('showHeader') || (locationQueryParam && locationQueryParam['order_action'])

  return ({
    showHeader,
    order,
    products: state.products.toJS(),
    ageVerified: getAgeVerified(state)
  })
}

const OrderConfirmationContainer = withRouter(connect(mapStateToProps)(OrderConfirmation))

export default OrderConfirmationContainer
