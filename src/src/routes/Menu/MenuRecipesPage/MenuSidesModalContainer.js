import { connect } from 'react-redux'
import { getAccessToken } from 'selectors/auth'
import { getUserId } from 'selectors/user'
import * as trackingKeys from 'actions/trackingKeys'
import {
  trackAddSide,
  trackViewSidesAllergens,
  trackCloseSidesAllergens,
  trackSidesContinueClicked
} from 'actions/menu'
import { checkoutWithSides } from '../actions/menuSidesCheckoutClick'
import { closeSidesModal } from '../actions/sides'
import { getOrderV2 } from '../selectors/order'
import { SidesModal } from './SidesModal/SidesModal'

const mapStateToProps = (state) => {
  const order = getOrderV2(state)

  return {
    accessToken: getAccessToken(state),
    userId: getUserId(state),
    isOpen: state.menuSidesModalOpen,
    order
  }
}

const mapDispatchToProps = (dispatch) => ({
  trackAddSide: (sideId, orderId) => dispatch(trackAddSide(sideId, orderId)),
  trackSidesContinueClicked: (sideIds, total, quantity) => dispatch(trackSidesContinueClicked(sideIds, total, quantity)),
  trackViewSidesAllergens: () => dispatch(trackViewSidesAllergens()),
  trackCloseSidesAllergens: () => dispatch(trackCloseSidesAllergens()),
  onClose: () => dispatch(closeSidesModal),
  onSubmit: (view, products) => {
    dispatch(checkoutWithSides(trackingKeys.menu, view, products))
  },
})

const MenuSidesModalContainer = connect(mapStateToProps, mapDispatchToProps)(SidesModal)

export { MenuSidesModalContainer }
