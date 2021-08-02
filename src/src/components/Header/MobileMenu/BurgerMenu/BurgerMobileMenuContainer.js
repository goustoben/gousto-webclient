import { connect } from 'react-redux'
import { helpPreLoginVisibilityChange } from 'actions/login'
import { getIsMenuRedirectPageEnabled } from 'selectors/features'
import { BurgerMobileMenu } from './BurgerMobileMenu'
import { trackClickRateRecipes } from '../../../../routes/Ratings/actions/feedback'

const mapStateToProps = (state) => ({
  isMenuRedirectPageEnabled: getIsMenuRedirectPageEnabled(state),
  postCode: state.basket.get('postcode'),
})

export const BurgerMobileMenuContainer = connect(mapStateToProps, {
  helpPreLoginVisibilityChange,
  trackClickRateRecipes
})(BurgerMobileMenu)
