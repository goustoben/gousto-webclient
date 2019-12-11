import PropTypes from 'prop-types'
import React from 'react'

import userRules from 'validations/user'
import { addPrefix } from 'validations/util'

import delivery from 'validations/delivery'

import { Section } from 'Page/Elements'
import formContainer from '../../../Components/formContainer'
import CheckoutButton from '../../../Components/CheckoutButton'
import Summary from '../../../Components/Summary'
import BoxDetails from '../../../Components/BoxDetails'
import SectionContainer from '../SectionContainer'

import AboutYouContainer, { addInitialValues as aboutYouAddInitialValues } from '../../../Components/AboutYou'
import DeliveryContainer, { addInitialValues as deliveryAddInitialValues, validationMessages as deliveryValidationMessages } from '../../../Components/Delivery'

const aboutYouSectionName = 'aboutyou'
const AboutYouSection = AboutYouContainer(aboutYouSectionName)

const deliverySectionName = 'delivery'
const DeliverySection = DeliveryContainer(deliverySectionName)

const YourDetailsStep = ({ submit, userProspect, nextStepName, formValues, checkoutValid, receiveRef, scrollToFirstMatchingRef, browser, trackClick }) => {

  const isAddressConfirmed = formValues && formValues[deliverySectionName] && formValues[deliverySectionName].confirmed
  const handleSubmit = () => {
    if (checkoutValid) {
      userProspect()
      trackClick('NextCTA Clicked', { succeeded: true, missing_field: null })
    }
    submit()
  }

  return (
    <div>
      <SectionContainer>
        <AboutYouSection receiveRef={receiveRef} />
      </SectionContainer>
      <SectionContainer>
        <DeliverySection receiveRef={receiveRef} scrollToFirstMatchingRef={scrollToFirstMatchingRef} browser={browser} />
      </SectionContainer>
      {isAddressConfirmed && (
        <SectionContainer>
          <CheckoutButton
            onClick={handleSubmit}
            stepName={`Next: ${nextStepName}`}
          />
        </SectionContainer>
      )}
      <SectionContainer>
        <Summary />
        <Section margin={{ top: 'LG' }}>
          <BoxDetails />
        </Section>
      </SectionContainer>
      {isAddressConfirmed && <CheckoutButton
        onClick={handleSubmit}
        stepName={`Next: ${nextStepName}`}
      />}
    </div>
  )
}

YourDetailsStep.propTypes = {
  submit: PropTypes.func.isRequired,
  userProspect: PropTypes.func,
  nextStepName: PropTypes.string,
  formValues: PropTypes.object,
  receiveRef: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  trackClick: PropTypes.func,
  checkoutValid: PropTypes.bool,
  browser: PropTypes.string,
}

YourDetailsStep.defaultProps = {
  userProspect: () => { },
  receiveRef: () => { },
  scrollToFirstMatchingRef: () => { },
  checkoutValid: false,
}

const validationRules = [
  addPrefix(aboutYouSectionName, userRules),
  delivery(deliverySectionName),
]

let YourDetailsForm = formContainer(YourDetailsStep, validationRules, 'yourdetails', deliveryValidationMessages(deliverySectionName)) // eslint-disable-line import/no-mutable-exports
YourDetailsForm = aboutYouAddInitialValues(YourDetailsForm, { sectionName: aboutYouSectionName })
YourDetailsForm = deliveryAddInitialValues(YourDetailsForm, { sectionName: deliverySectionName })

export default YourDetailsForm
