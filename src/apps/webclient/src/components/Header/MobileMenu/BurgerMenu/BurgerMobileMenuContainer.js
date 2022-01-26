import { connect } from 'react-redux'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { BurgerMobileMenu } from './BurgerMobileMenu'
import { trackClickRateRecipes } from '../../../../routes/Ratings/actions/feedback'

export const BurgerMobileMenuContainer = connect(null, {
  helpPreLoginVisibilityChange,
  trackClickRateRecipes
})(BurgerMobileMenu)
