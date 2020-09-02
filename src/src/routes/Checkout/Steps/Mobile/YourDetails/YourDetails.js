import PropTypes from 'prop-types'
import React from 'react'

import userRules from 'validations/user'
import { addPrefix } from 'validations/util'

import delivery from 'validations/delivery'

import formContainer from '../../../Components/formContainer'
import CheckoutButton from '../../../Components/CheckoutButton'
import SectionContainer from '../SectionContainer'

import AboutYouContainer, { addInitialValues as aboutYouAddInitialValues } from '../../../Components/AboutYou'
import DeliveryContainer, { addInitialValues as deliveryAddInitialValues, validationMessages as deliveryValidationMessages } from '../../../Components/Delivery'

const aboutYouSectionName = 'aboutyou'
const AboutYouSection = AboutYouContainer(aboutYouSectionName)

const deliverySectionName = 'delivery'
const DeliverySection = DeliveryContainer(deliverySectionName)

export const YourDetailsStep = ({ submit, userProspect, nextStepName, formValues, checkoutValid, receiveRef, scrollToFirstMatchingRef, browser, trackClick, trackUTMAndPromoCode, isCheckoutRedesignEnabled }) => {
  const isAddressConfirmed = formValues && formValues[deliverySectionName] && formValues[deliverySectionName].confirmed
  const handleSubmit = () => {
    if (checkoutValid) {
      userProspect()
      trackUTMAndPromoCode('clickNextPayment')
      trackClick('NextCTA Clicked', { succeeded: true, missing_field: null })
    }
    submit()
  }

  return (
    <div>
      <SectionContainer>
        <AboutYouSection receiveRef={receiveRef} isCheckoutRedesignEnabled={isCheckoutRedesignEnabled} />
      </SectionContainer>
      <SectionContainer>
        <DeliverySection receiveRef={receiveRef} scrollToFirstMatchingRef={scrollToFirstMatchingRef} browser={browser} isCheckoutRedesignEnabled={isCheckoutRedesignEnabled} />
      </SectionContainer>
      {isAddressConfirmed && (
        <SectionContainer>
          <CheckoutButton
            onClick={handleSubmit}
            stepName={`Next: ${nextStepName}`}
          />
        </SectionContainer>
      )}
    </div>
  )
}

YourDetailsStep.propTypes = {
  submit: PropTypes.func.isRequired,
  userProspect: PropTypes.func,
  nextStepName: PropTypes.string,
  formValues: PropTypes.objectOf(PropTypes.object),
  receiveRef: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  trackClick: PropTypes.func,
  checkoutValid: PropTypes.bool,
  browser: PropTypes.string,
  trackUTMAndPromoCode: PropTypes.func,
  isCheckoutRedesignEnabled: PropTypes.bool
}

YourDetailsStep.defaultProps = {
  browser: '',
  formValues: {},
  nextStepName: '',
  userProspect: () => { },
  receiveRef: () => { },
  scrollToFirstMatchingRef: () => { },
  trackClick: () => { },
  checkoutValid: false,
  trackUTMAndPromoCode: () => { },
  isCheckoutRedesignEnabled: false
}

const validationRules = [
  addPrefix(aboutYouSectionName, userRules),
  delivery(deliverySectionName),
]

let YourDetailsForm = formContainer(YourDetailsStep, validationRules, 'yourdetails', deliveryValidationMessages(deliverySectionName)) // eslint-disable-line import/no-mutable-exports
YourDetailsForm = aboutYouAddInitialValues(YourDetailsForm, { sectionName: aboutYouSectionName })
YourDetailsForm = deliveryAddInitialValues(YourDetailsForm, { sectionName: deliverySectionName })

export default YourDetailsForm
