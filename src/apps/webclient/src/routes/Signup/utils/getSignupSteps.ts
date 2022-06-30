import Immutable, { List } from 'immutable'
import { Store } from 'redux'

import { signupConfig } from 'config/signup'
import { AVAILABLE_STEP_COMPONENTS } from 'routes/Signup/constants/AvailableStepComponents'
import { SignupSteps } from 'routes/Signup/constants/SignupSteps'

import { isOptimizelyFeatureEnabledFactory } from '../../../containers/OptimizelyRollouts'

const getIsPersonaliseSignUpEnabled = isOptimizelyFeatureEnabledFactory(
  'turnips_personalised_signup_enabled',
)

const getIsBoxSizeRecommenderEnabled = isOptimizelyFeatureEnabledFactory(
  'beetroots_box_size_recommender_web_enabled',
)

/**
 * Returns steps for signup. Steps without a component are filtered out.
 * @param store - application redux store
 */
export const getSignupSteps = async (store: Store<any>): Promise<List<SignupSteps>> => {
  let resultSteps: List<SignupSteps>

  const isBoxSizeRecommenderEnabled = await getIsBoxSizeRecommenderEnabled(
    store.dispatch,
    store.getState,
  )
  const isPersonaliseSignUpEnabled = await getIsPersonaliseSignUpEnabled(
    store.dispatch,
    store.getState,
  )

  if (isBoxSizeRecommenderEnabled && isPersonaliseSignUpEnabled) {
    resultSteps = Immutable.List(signupConfig.boxSizeRecommenderWithPersonalizeMenuSteps)
  } else if (isBoxSizeRecommenderEnabled) {
    resultSteps = Immutable.List(signupConfig.boxSizeRecommenderSteps)
  } else if (isPersonaliseSignUpEnabled) {
    resultSteps = Immutable.List(signupConfig.personaliseMenuSteps)
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
