import { connect } from 'react-redux'
import { newsletterActions } from 'actions/newsletter'
import NewsletterSignUp from './NewsletterSignUp'

const mapStateToProps = (state) => ({
  signup: state.newsletterSignup,
})

export default connect(mapStateToProps, {
  onSignup: newsletterActions.newsletterSignup,
})(NewsletterSignUp)
