import PropTypes from 'prop-types'
import React from 'react'

import userRules from 'validations/user'
import userAsyncValidation from 'validations/userAsync'
import { addPrefix } from 'validations/util'
import formContainer from '../../../Components/formContainer'

import CheckoutButton from '../../../Components/CheckoutButton'

import AboutYouContainer, { addInitialValues } from '../../../Components/AboutYou'

const sectionName = 'aboutyou'

const AboutYouSection = AboutYouContainer(sectionName)

export const AboutYouStep = ({ submit, userProspect, nextStepName, receiveRef, checkoutValid, trackUTMAndPromoCode, isCheckoutRedesignEnabled }) => {
  const handleSubmit = () => {
    if (checkoutValid) {
      trackUTMAndPromoCode('clickNextDelivery')
      userProspect()
    }
    submit()
  }

  return (
    <div>
      <AboutYouSection receiveRef={receiveRef} isCheckoutRedesignEnabled={isCheckoutRedesignEnabled} />
      <CheckoutButton
        onClick={handleSubmit}
        stepName={`Next: ${nextStepName}`}
        valid={checkoutValid}
      />
    </div>
  )
}

AboutYouStep.propTypes = {
  submit: PropTypes.func.isRequired,
  userProspect: PropTypes.func,
  receiveRef: PropTypes.func,
  nextStepName: PropTypes.string,
  checkoutValid: PropTypes.bool,
  trackUTMAndPromoCode: PropTypes.func,
  isCheckoutRedesignEnabled: PropTypes.bool
}

AboutYouStep.defaultProps = {
  userProspect: () => {},
  receiveRef: () => {},
  checkoutValid: false,
  nextStepName: '',
  trackUTMAndPromoCode: () => {},
  isCheckoutRedesignEnabled: false
}

const AboutYouForm = formContainer(AboutYouStep, addPrefix(sectionName, userRules), sectionName, {}, {}, userAsyncValidation, ['aboutyou.password']) // eslint-disable-line import/no-mutable-exports

const AboutYou = addInitialValues(AboutYouForm, { sectionName })

export default AboutYou
