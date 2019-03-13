import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { orderDetails } from 'actions/order'
import { locationQuery } from 'selectors/routing.js'
import OrderConfirmation from './OrderConfirmation'

const mapStateToProps = (state) => {
  const order = state.basket.get('orderDetails')
  const locationQueryParam = locationQuery(state)

  const showHeader = state.temp.get('showHeader') || (locationQueryParam && locationQueryParam['order_action'])

  return ({
    showHeader,
    order,
  })
}

const mapDispatchToProps = ({
  loadOrder:orderDetails,
})

const OrderConfirmationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation))

export default OrderConfirmationContainer
