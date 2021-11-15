import { connect } from 'react-redux'
import { getAccessToken } from 'selectors/auth'
import { getUserId } from 'selectors/user'
import * as trackingKeys from 'actions/trackingKeys'
import { getOrderV2 } from '../selectors/order'
import { SidesModal } from './SidesModal/SidesModal'
import { trackSidesContinueClicked } from "actions/menu/trackSidesContinueClicked"
import { trackAddSide } from "actions/menu/trackAddSide"
import { trackViewSidesAllergens } from "actions/menu/trackViewSidesAllergens"
import { trackCloseSidesAllergens } from "actions/menu/trackCloseSidesAllergens"
import { checkoutWithSides } from "routes/Menu/actions/menuSidesCheckoutClick/checkoutWithSides"
import { closeSidesModal } from "routes/Menu/actions/sides/closeSidesModal"

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
  onClose: () => dispatch(closeSidesModal()),
  onSubmit: (view, products) => {
    dispatch(checkoutWithSides(trackingKeys.menu, view, products))
  },
})

const MenuSidesModalContainer = connect(mapStateToProps, mapDispatchToProps)(SidesModal)

export { MenuSidesModalContainer }
