import { connect } from 'react-redux'
import { getHomePageRedesign } from 'selectors/features'
import Testimonials from './Testimonials'

function mapStateToProps(state) {
  return {
    isHomePageRedesignEnabled: getHomePageRedesign(state)
  }
}

const TestimonialsContainer = connect(mapStateToProps)(Testimonials)

export default TestimonialsContainer
