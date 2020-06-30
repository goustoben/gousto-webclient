import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import { getHomePageRedesign } from 'selectors/features'
import Testimonials from './Testimonials'

function mapStateToProps(state) {
  return {
    isHomePageRedesignEnabled: getHomePageRedesign(state)
  }
}

const mapDispatchToProps = {
  redirect: redirectAction.redirect,
  trackGetStarted,
}

const TestimonialsContainer = connect(mapStateToProps, mapDispatchToProps)(Testimonials)

export default TestimonialsContainer
