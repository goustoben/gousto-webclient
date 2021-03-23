import { connect } from 'react-redux'
import { knownVariants, defaultVariant } from 'config/home'
import actions from 'actions/auth'
import { updatePricePerServing } from 'actions/boxPrices'
import { getIsAuthenticated } from 'selectors/auth'
import { getPricePerServing } from 'selectors/boxPrices'
import { getIsSignupReductionEnabled, getIsCarouselShiftEnabled } from 'selectors/features'

import { Home } from './Home'

export const getKnownVariant = (variant) =>
  knownVariants.includes(variant) ? variant : defaultVariant

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
  variant:
    props.location && props.location.query
      ? getKnownVariant(props.location.query.variant)
      : defaultVariant,
  isSignupReductionEnabled: getIsSignupReductionEnabled(state) && !getIsAuthenticated(state),
  pricePerServing: getPricePerServing(state),
  isCarouselShiftEnabled: getIsCarouselShiftEnabled(state),
})

const mapDispatchToProps = {
  updatePricePerServing,
  redirectLoggedInUser: actions.redirectLoggedInUser,
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export { HomeContainer }
