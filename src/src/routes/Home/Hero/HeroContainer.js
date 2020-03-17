import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import { getIsSignupReductionEnabled } from 'selectors/features'
import { getIsAuthenticated } from 'selectors/auth'

import Hero from './Hero'

const mapStateToProps = (state) => ({
  isSignupReductionEnabled: getIsSignupReductionEnabled(state) && !getIsAuthenticated(state),
})

const mapDispatchToProps = {
  redirect: redirectAction.redirect,
}

const HeroContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hero)

export default HeroContainer
