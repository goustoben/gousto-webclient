import Immutable from 'immutable'
import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { OrderDeliveryAddress } from './OrderDeliveryAddress'
import { orderAddressChange } from "actions/order/orderAddressChange"
import { userTrackToggleEditAddressSection } from "actions/user/userTrackToggleEditAddressSection"
import { userTrackAddressSelected } from "actions/user/userTrackAddressSelected"

function mapStateToProps(state, ownProps) {
  const { orderId } = ownProps
  const addresses = state.user.get('addresses', Immutable.Map({})).filter((address) => address.get('type') === 'shipping')
  const addressUpdateError = state.error.get(actionTypes.ORDER_ADDRESS_CHANGE)
  const hasUpdateDeliveryAddressError = addressUpdateError ? addressUpdateError.orderId === orderId : false

  return {
    addresses,
    hasUpdateDeliveryAddressError,
    isPendingUpdateAddress: state.pending.get(actionTypes.ORDER_ADDRESS_CHANGE) === orderId,
  }
}

export const OrderDeliveryAddressContainer = connect(mapStateToProps, {
  orderAddressChange,
  userTrackToggleEditAddressSection,
  userTrackAddressSelected,
})(OrderDeliveryAddress)
