import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import Testimonials from './Testimonials'

const TestimonialsContainer = connect(() => ({}), {
  redirect: redirectAction.redirect,
  trackGetStarted
})(Testimonials)

export default TestimonialsContainer
