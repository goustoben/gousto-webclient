import { connect } from 'react-redux'
import { knownVariants, defaultVariant } from 'config/home'
import { getIsAuthenticated } from 'selectors/auth'
import { getPricePerServing } from 'routes/BoxPrices/boxPricesSelectors'
import { getIsSignupReductionEnabled } from 'selectors/features'

import { Home } from './Home'
import { updatePricePerServing } from "actions/boxPrices/updatePricePerServing"
import { authRedirectLoggedInUser } from "actions/auth/authRedirectLoggedInUser"

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
})

const mapDispatchToProps = {
  updatePricePerServing,
  redirectLoggedInUser: authRedirectLoggedInUser,
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export { HomeContainer }
