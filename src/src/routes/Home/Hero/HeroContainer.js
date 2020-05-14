import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'

import Hero from './Hero'

const mapDispatchToProps = {
  redirect: redirectAction.redirect,
  trackGetStarted
}

const HeroContainer = connect(
  null,
  mapDispatchToProps,
)(Hero)

export default HeroContainer
