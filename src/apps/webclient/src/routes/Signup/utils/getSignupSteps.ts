import { Store } from 'redux'
import Immutable, { List } from 'immutable'
import { SignupSteps } from 'routes/Signup/constants/SignupSteps'
import { signupConfig } from 'config/signup'
import { AVAILABLE_STEP_COMPONENTS } from 'routes/Signup/constants/AvailableStepComponents'

/**
 * Returns steps for signup. Steps without a component are filtered out.
 * @param store - application redux store
 * @param querySteps - steps listed in query parameters, redundant.
 */
export const getSignupSteps = (store: Store<any>, querySteps: Array<string>): List<SignupSteps> => {
  let resultSteps: List<SignupSteps | string>

  /**
   * Redundant approach where steps are stored in redux. Override steps in if-else statements below depending on
   * feature-flag.
   */
  const featureSteps = store.getState().features.getIn(['signupSteps', 'value'])?.split(',') || []
  const signupSteps = store.getState().signup.getIn(['wizard', 'steps'])

  if (querySteps.length) {
    resultSteps = Immutable.List(querySteps)
  } else if (featureSteps.length) {
    resultSteps = Immutable.List(featureSteps)
  } else if (Immutable.Iterable.isIterable(signupSteps) && signupSteps.size) {
    resultSteps = signupSteps
  } else {
    resultSteps = Immutable.List(signupConfig.defaultSteps)
  }

  /**
   * Filter out steps that do not have a component.
   */
  return resultSteps.filter(
    (step) => !!AVAILABLE_STEP_COMPONENTS[step as SignupSteps],
  ) as List<SignupSteps>
}
