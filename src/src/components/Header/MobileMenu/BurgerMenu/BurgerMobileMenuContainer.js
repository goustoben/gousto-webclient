import { connect } from 'react-redux'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { getIsHelpCentreActive } from 'selectors/features'
import { BurgerMobileMenu } from './BurgerMobileMenu'

const mapStateToProps = (state) => ({
  isHelpCentreActive: getIsHelpCentreActive(state),
})

export const BurgerMobileMenuContainer = connect(mapStateToProps, {
  helpPreLoginVisibilityChange,
})(BurgerMobileMenu)
