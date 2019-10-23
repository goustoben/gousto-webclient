import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import MyDeliveries from './MyDeliveries'

const mapStateToProps = (state) => ({
  isFetchingOrders: state.pending.get(actionTypes.USER_LOAD_ORDERS, true),
  isFetchingAddresses: state.pending.get(actionTypes.USER_LOAD_ADDRESSES, true),
  didErrorFetchingOrders: state.error.get(actionTypes.USER_LOAD_ORDERS, null),
  didErrorFetchingAddresses: state.error.get(actionTypes.USER_LOAD_ADDRESSES, null),
})

const MyDeliveriesContainer = connect(mapStateToProps, {
})(MyDeliveries)

export default MyDeliveriesContainer
