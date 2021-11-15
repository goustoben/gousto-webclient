import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import MainLayout from './MainLayout'
import { userLoadData } from "actions/user/userLoadData"
import { userFetchShippingAddresses } from "actions/user/userFetchShippingAddresses"
import { userClearData } from "actions/user/userClearData"
import { userLoadOrders } from "actions/user/userLoadOrders"
import { menuLoadBoxPrices } from "actions/menu/menuLoadBoxPrices"

export default connect((state) => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
  disabled: state.auth.get('isAdmin'),
  orders: state.user.get('orders'),
  shippingAddresses: state.user.get('shippingAddresses'),
  menuLoadingBoxPrices: state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
}), {
  userLoadData,
  userFetchShippingAddresses,
  userClearData,
  userLoadOrders,
  menuLoadBoxPrices,
})(MainLayout)
