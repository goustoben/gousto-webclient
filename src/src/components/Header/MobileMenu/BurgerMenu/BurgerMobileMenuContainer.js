import { connect } from 'react-redux'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { getIsHelpCentreActive, getIsMenuRedirectPageEnabled } from 'selectors/features'
import { BurgerMobileMenu } from './BurgerMobileMenu'

const mapStateToProps = (state) => ({
  isHelpCentreActive: getIsHelpCentreActive(state),
  isMenuRedirectPageEnabled: getIsMenuRedirectPageEnabled(state),
  postCode: state.basket.get('postcode'),
})

export const BurgerMobileMenuContainer = connect(mapStateToProps, {
  helpPreLoginVisibilityChange,
})(BurgerMobileMenu)
