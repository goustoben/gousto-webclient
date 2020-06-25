import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import { getHomePageRedesign } from 'selectors/features'

import Hero from './Hero'

const mapDispatchToProps = {
  redirect: redirectAction.redirect,
  trackGetStarted,
}

const mapStateToProps = (state) => ({
  isHomePageRedesignEnabled: getHomePageRedesign(state)
})

const HeroContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hero)

export default HeroContainer
