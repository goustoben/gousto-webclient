import React, { useState } from 'react'

import { Heading } from 'goustouicomponents'
import { useDispatch } from 'react-redux'

import { trackUTMAndPromoCode } from 'actions/tracking'
import { completeWizardNumberOfPeople } from 'actions/trackingKeys'
import { NumberOfPeopleInput } from 'routes/Signup/Steps/NumberOfPeople/NumberOfPeopleInput/NumberOfPeopleInput'
import { signupSetNumberOfPeople } from 'routes/Signup/signupActions'

import { Button } from '../../Button'

import css from './NumberOfPeopleStep.css'

interface NumberOfPeopleStepProps {
  /**
   * Proceed to next step in signup flow.
   */
  next: () => void
}

export const NumberOfPeopleStep = ({ next }: NumberOfPeopleStepProps) => {
  const [numberOfPeople, setNumberOfPeople] = useState<number>(2)
  const dispatch = useDispatch()
  const onContinue = () => {
    dispatch(trackUTMAndPromoCode(completeWizardNumberOfPeople, { numberOfPeople }))
    dispatch(signupSetNumberOfPeople(numberOfPeople))
    next()
  }

  return (
    <section>
      <Heading type="h1">How many people would be eating Gousto?</Heading>
      <p>We&apos;ll use this to suggest a box size</p>
      <div className={css.stepContent}>
        <div className={css.numberOfPeopleInputContainer}>
          <NumberOfPeopleInput
            numberOfPeople={numberOfPeople}
            onNumberOfPeopleChange={setNumberOfPeople}
          />
        </div>
        <Button data-testing="continue-button" width="full" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </section>
  )
}
