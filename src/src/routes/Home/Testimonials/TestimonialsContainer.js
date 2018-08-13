import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import Testimonials from './Testimonials'

const TestimonialsContainer = connect(() => ({}), { redirect: redirectAction.redirect })(Testimonials)

export default TestimonialsContainer
