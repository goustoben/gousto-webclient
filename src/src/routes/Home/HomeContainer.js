import { connect } from 'react-redux'
import { knownVariants, defaultVariant } from 'config/home'
import { redirectLoggedInUser } from 'actions/auth'
import { getIsAuthenticated } from 'selectors/auth'
import { getPricePerServing } from 'routes/BoxPrices/boxPricesSelectors'
import { getIsSignupReductionEnabled, getIsJpgImagesEnabled } from 'selectors/features'

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
  isJpgImagesEnabled: getIsJpgImagesEnabled(state),
})

const mapDispatchToProps = {
  redirectLoggedInUser,
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export { HomeContainer }
