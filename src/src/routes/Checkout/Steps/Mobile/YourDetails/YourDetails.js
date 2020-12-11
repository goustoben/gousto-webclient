import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import userRules from 'validations/user'
import { addPrefix } from 'validations/util'

import delivery from 'validations/delivery'
import { Section } from 'Page/Elements'
import { formContainer } from '../../../Components/formContainer'
import CheckoutButton from '../../../Components/CheckoutButton'
import SectionContainer from '../SectionContainer'
import Summary from '../../../Components/Summary'
import BoxDetails from '../../../Components/BoxDetails'

import AboutYouContainer, { addInitialValues as aboutYouAddInitialValues } from '../../../Components/AboutYou'
import DeliveryContainer, { addInitialValues as deliveryAddInitialValues, validationMessages as deliveryValidationMessages } from '../../../Components/Delivery'

const aboutYouSectionName = 'aboutyou'
const AboutYouSection = AboutYouContainer(aboutYouSectionName)

const deliverySectionName = 'delivery'
const DeliverySection = DeliveryContainer(deliverySectionName)

export const YourDetailsStep = ({
  submit,
  userProspect,
  nextStepName,
  formValues,
  checkoutValid,
  receiveRef,
  scrollToFirstMatchingRef,
  browser,
  trackClick,
  trackUTMAndPromoCode,
  isOldCheckoutFieldEnabled,
}) => {
  const isAddressConfirmed = formValues && formValues[deliverySectionName] && formValues[deliverySectionName].confirmed
  const handleSubmit = (btnPosition) => () => {
    if (checkoutValid) {
      userProspect()
      trackUTMAndPromoCode('clickNextPayment', btnPosition)
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
        <DeliverySection
          receiveRef={receiveRef}
          scrollToFirstMatchingRef={scrollToFirstMatchingRef}
          browser={browser}
        />
      </SectionContainer>

      {isAddressConfirmed && (
        <SectionContainer>
          <CheckoutButton
            onClick={handleSubmit('top')}
            stepName={`Next: ${nextStepName}`}
          />
        </SectionContainer>
      )}
      {isOldCheckoutFieldEnabled && (
        <Fragment>
          <SectionContainer>
            <Summary />
            <Section margin={{ top: 'LG' }}>
              <BoxDetails />
            </Section>
          </SectionContainer>
          {isAddressConfirmed && (
            <CheckoutButton
              onClick={handleSubmit('bottom')}
              stepName={`Next: ${nextStepName}`}
            />
          )}
        </Fragment>
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
  isOldCheckoutFieldEnabled: PropTypes.bool,
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
  isOldCheckoutFieldEnabled: false,
}

const validationRules = [
  addPrefix(aboutYouSectionName, userRules),
  delivery(deliverySectionName),
]

let YourDetailsForm = formContainer(YourDetailsStep, validationRules, 'yourdetails', deliveryValidationMessages(deliverySectionName)) // eslint-disable-line import/no-mutable-exports
YourDetailsForm = aboutYouAddInitialValues(YourDetailsForm, { sectionName: aboutYouSectionName })
YourDetailsForm = deliveryAddInitialValues(YourDetailsForm, { sectionName: deliverySectionName })

export default YourDetailsForm
