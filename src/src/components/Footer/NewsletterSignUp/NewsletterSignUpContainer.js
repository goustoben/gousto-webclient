import { connect } from 'react-redux'
import NewsletterSignUp from './NewsletterSignUp'
import newsletterSignup from "apis/newsletter/newsletterSignup"

const mapStateToProps = (state) => (
  {
    signup: state.newsletterSignup,
  }
)

export default connect(mapStateToProps, {
  onSignup: newsletterSignup,
})(NewsletterSignUp)
