import { connect } from 'react-redux'
import { getAccessToken } from 'selectors/auth'
import { getUserId } from 'selectors/user'
import * as trackingKeys from 'actions/trackingKeys'
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
  onClose: () => dispatch(closeSidesModal()),
  onSubmit: (view, products) => dispatch(checkoutWithSides(trackingKeys.menu, view, products)),
})

const MenuSidesModalContainer = connect(mapStateToProps, mapDispatchToProps)(SidesModal)

export { MenuSidesModalContainer }
