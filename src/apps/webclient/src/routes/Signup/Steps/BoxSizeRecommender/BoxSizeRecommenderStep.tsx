import React from 'react'
import { Heading } from 'goustouicomponents'
import { Button, ButtonColorVariant } from '@gousto-internal/citrus-react'
import { getNumberOfPeople } from 'routes/Signup/signupSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { trackUTMAndPromoCode } from 'actions/tracking'
import actions from 'actions'
import { completeWizardBoxSizeRecommender } from 'actions/trackingKeys'
import { Button as SignupContinueButton } from '../../Button'
import css from './BoxSizeRecommenderStep.css'

const LargeBoxRecommendation = () => (
  <div>
    <div className={css.headingWrapper}>
      <Heading type="h1">Large box</Heading>
    </div>
    <p>A large box contains 4 portions of each recipe. A regular box contains 2.</p>
  </div>
)

const RegularBoxRecommendation = () => (
  <div>
    <div className={css.headingWrapper}>
      <Heading type="h1">Regular box</Heading>
    </div>
    <p>A regular box contains 2 portions of each recipe. A large box contains 4.</p>
  </div>
)

interface BoxSizeRecommenderStepProps {
  /**
   * Proceed to next step in signup flow.
   */
  next: () => void
}

export const BoxSizeRecommenderStep = ({ next }: BoxSizeRecommenderStepProps) => {
  const peopleAmount = useSelector<any, number>(getNumberOfPeople)
  const shouldRecommendLargeBox = peopleAmount > 2
  const dispatch = useDispatch()

  const onContinue = (isPrimaryBtnClicked: boolean) => {
    dispatch(
      trackUTMAndPromoCode(completeWizardBoxSizeRecommender, {
        [isPrimaryBtnClicked ? 'primaryBtnClick' : 'secondaryBtnClick']: shouldRecommendLargeBox
          ? 'large_box'
          : 'regular_box',
      }),
    )
    const boxSizeOnPrimaryButton = shouldRecommendLargeBox ? 4 : 2
    const boxSizeOnSecondaryButton = shouldRecommendLargeBox ? 2 : 4
    const boxSize = isPrimaryBtnClicked ? boxSizeOnPrimaryButton : boxSizeOnSecondaryButton
    dispatch(actions.basketNumPortionChange(boxSize))
    dispatch(actions.portionSizeSelectedTracking(boxSize))
    next()
  }

  return (
    <section>
      <Heading type="h1">Choose your box size</Heading>
      <p>For {peopleAmount} people, we recommend:</p>
      <div className={css.stepContent}>
        {shouldRecommendLargeBox ? <LargeBoxRecommendation /> : <RegularBoxRecommendation />}
        <SignupContinueButton width="full" onClick={() => onContinue(true)}>
          Choose {shouldRecommendLargeBox ? 'large' : 'regular'} box
        </SignupContinueButton>
        <Button
          className={css.secondaryBoxButton}
          colorVariant={ButtonColorVariant.Secondary}
          onClick={() => onContinue(false)}
          data-testing="continue-button"
        >
          Choose {shouldRecommendLargeBox ? 'regular' : 'large'} box instead
        </Button>
      </div>
    </section>
  )
}
