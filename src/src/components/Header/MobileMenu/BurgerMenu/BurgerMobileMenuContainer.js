import { connect } from 'react-redux'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { BurgerMobileMenu } from './BurgerMobileMenu'

export const BurgerMobileMenuContainer = connect(null, {
  helpPreLoginVisibilityChange,
})(BurgerMobileMenu)
