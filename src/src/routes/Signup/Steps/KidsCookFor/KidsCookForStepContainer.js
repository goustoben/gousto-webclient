import { connect } from 'react-redux'
import KidsCookForStep from './KidsCookForStep'
import signupActions from 'actions/signup'

const KidsCookForStepContainer = connect(undefined, {
	cookForKidsChange: signupActions.signupCookForKidsChange,
})(KidsCookForStep)

export default KidsCookForStepContainer
