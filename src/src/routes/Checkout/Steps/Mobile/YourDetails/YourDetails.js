import PropTypes from 'prop-types'
import React from 'react'

import { userRules } from 'validations/user'
import userAsyncValidation from 'validations/userAsync'
import delivery from 'validations/delivery'
import { checkoutClickContinueToPayment } from 'actions/trackingKeys'
import { formContainer } from '../../../Components/formContainer'
import { CheckoutButton } from '../../../Components/CheckoutButton'
import { SectionContainer } from '../SectionContainer'

import { AboutYouContainer, addInitialValues as aboutYouAddInitialValues } from '../../../Components/AboutYou'
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
}) => {
  const isAddressConfirmed = formValues && formValues[deliverySectionName] && formValues[deliverySectionName].confirmed
  const handleSubmit = (btnPosition) => () => {
    if (checkoutValid) {
      userProspect()
      trackUTMAndPromoCode(checkoutClickContinueToPayment, btnPosition)
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
            valid={checkoutValid}
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
}

const validationRules = [
  userRules(aboutYouSectionName),
  delivery(deliverySectionName),
]

let YourDetailsForm = formContainer(YourDetailsStep, validationRules, 'yourdetails', deliveryValidationMessages(deliverySectionName), {}, userAsyncValidation, ['aboutyou.password']) // eslint-disable-line import/no-mutable-exports
YourDetailsForm = aboutYouAddInitialValues(YourDetailsForm, { sectionName: aboutYouSectionName })
YourDetailsForm = deliveryAddInitialValues(YourDetailsForm, { sectionName: deliverySectionName })

export {
  YourDetailsForm
}
