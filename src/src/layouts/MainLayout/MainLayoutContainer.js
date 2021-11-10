import { connect } from 'react-redux'
import { actions } from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { MainLayout } from './MainLayout'

export const MainLayoutContainer = connect((state) => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
  disabled: state.auth.get('isAdmin'),
  orders: state.user.get('orders'),
  shippingAddresses: state.user.get('shippingAddresses'),
  menuLoadingBoxPrices: state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
}), {
  userLoadData: actions.userLoadData,
  userFetchShippingAddresses: actions.userFetchShippingAddresses,
  userClearData: actions.userClearData,
  userLoadOrders: actions.userLoadOrders,
  menuLoadBoxPrices: actions.menuLoadBoxPrices,
})(MainLayout)
