import { connect } from 'react-redux'
import signupActions from 'actions/signup'
import KidsCookForStep from './KidsCookForStep'

const KidsCookForStepContainer = connect(undefined, {
  cookForKidsChange: signupActions.signupCookForKidsChange,
})(KidsCookForStep)

export default KidsCookForStepContainer
