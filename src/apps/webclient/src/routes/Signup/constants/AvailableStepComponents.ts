import { SignupSteps } from 'routes/Signup/constants/SignupSteps'
import { ReactNode } from 'react'
import { BoxSizeStep } from 'routes/Signup/Steps/BoxSize'
import { PostcodeStep } from 'routes/Signup/Steps/Postcode'
import { DeliveryStep } from 'routes/Signup/Steps/Delivery'
import { PersonaliseMenuStep } from 'routes/Signup/Steps/PersonaliseMenu'
import { NumberOfPeopleStep } from 'routes/Signup/Steps/NumberOfPeople'
import { BoxSizeRecommenderStep } from 'routes/Signup/Steps/BoxSizeRecommender'

/**
 * SignupSteps to StepComponent relation.
 */
export const AVAILABLE_STEP_COMPONENTS: {
  [step in SignupSteps]: ReactNode
} = {
  [SignupSteps.BOX_SIZE]: BoxSizeStep,
  [SignupSteps.POSTCODE]: PostcodeStep,
  [SignupSteps.DELIVERY]: DeliveryStep,
  [SignupSteps.PERSONALISE_MENU]: PersonaliseMenuStep,
  [SignupSteps.NUMBER_OF_PEOPLE]: NumberOfPeopleStep,
  [SignupSteps.BOX_SIZE_RECOMMENDER]: BoxSizeRecommenderStep,
}
