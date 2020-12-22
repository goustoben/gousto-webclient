import { connect } from 'react-redux'
import { knownVariants, defaultVariant } from 'config/home'
import actions from 'actions/auth'
import { getIsSignupReductionEnabled } from 'selectors/features'
import { getIsAuthenticated } from 'selectors/auth'

import { Home } from './Home'

export const getKnownVariant = variant => (
  (knownVariants.includes(variant)) ? variant : defaultVariant
)

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
  variant: (props.location && props.location.query) ? getKnownVariant(props.location.query.variant) : defaultVariant,
  isSignupReductionEnabled: getIsSignupReductionEnabled(state) && !getIsAuthenticated(state),
})

const mapDispatchToProps = {
  redirectLoggedInUser: actions.redirectLoggedInUser
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export {
  HomeContainer
}
