import { connect } from 'react-redux'
import actions from 'actions'
import NewsletterSignUp from './NewsletterSignUp'

const mapStateToProps = (state) => (
	{
		signup: state.newsletterSignup,
	}
)

export default connect(mapStateToProps, {
	onSignup: actions.newsletterSignup,
})(NewsletterSignUp)
