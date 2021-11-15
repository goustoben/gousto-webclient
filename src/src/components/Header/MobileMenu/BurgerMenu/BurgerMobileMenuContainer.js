import { connect } from 'react-redux'
import { BurgerMobileMenu } from './BurgerMobileMenu'
import { helpPreLoginVisibilityChange } from "actions/login/helpPreLoginVisibilityChange"
import { trackClickRateRecipes } from "routes/Ratings/actions/feedback/trackClickRateRecipes"

export const BurgerMobileMenuContainer = connect(null, {
  helpPreLoginVisibilityChange,
  trackClickRateRecipes
})(BurgerMobileMenu)
