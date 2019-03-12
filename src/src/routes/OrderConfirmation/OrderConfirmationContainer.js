import { connect } from 'react-redux'
import { orderDetails } from 'actions/order'
import OrderConfirmation from './OrderConfirmation'

const mapStateToProps = (state, ownProps) => {
  const { orderId } = ownProps.params
  const order = state.basket.get('orderDetails')
  
  return ({
    orderNumber: orderId,
    order,
  })
}

const mapDispatchToProps = ({
  loadOrder:orderDetails,
})

const OrderConfirmationContainer = connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation)

export default OrderConfirmationContainer
