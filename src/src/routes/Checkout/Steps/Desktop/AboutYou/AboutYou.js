import PropTypes from 'prop-types'
import React from 'react'

import userRules from 'validations/user'
import userAsyncValidation from 'validations/userAsync'
import { addPrefix } from 'validations/util'
import { checkoutClickContinueToDelivery } from 'actions/trackingKeys'
import { formContainer } from '../../../Components/formContainer'

import { CheckoutButton } from '../../../Components/CheckoutButton'
import { AboutYouContainer, addInitialValues } from '../../../Components/AboutYou'

const sectionName = 'aboutyou'

const AboutYouSection = AboutYouContainer(sectionName)

export const AboutYouStep = ({
  submit,
  userProspect,
  nextStepName,
  receiveRef,
  checkoutValid,
  trackUTMAndPromoCode,
  isCheckoutOverhaulEnabled,
  onLoginClick
}) => {
  const handleSubmit = () => {
    if (checkoutValid) {
      trackUTMAndPromoCode(checkoutClickContinueToDelivery)
      userProspect()
    }
    submit()
  }

  return (
    <div>
      <AboutYouSection
        receiveRef={receiveRef}
        submit={submit}
        userProspect={userProspect}
        checkoutValid={checkoutValid}
        trackUTMAndPromoCode={trackUTMAndPromoCode}
        onLoginClick={onLoginClick}
      />
      {!isCheckoutOverhaulEnabled && (
        <CheckoutButton
          onClick={handleSubmit}
          stepName={`Next: ${nextStepName}`}
          valid={checkoutValid}
        />
      )}
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
  isCheckoutOverhaulEnabled: PropTypes.bool,
  onLoginClick: PropTypes.func,
}

AboutYouStep.defaultProps = {
  userProspect: () => {},
  receiveRef: () => {},
  checkoutValid: false,
  nextStepName: '',
  trackUTMAndPromoCode: () => {},
  isCheckoutOverhaulEnabled: false,
  onLoginClick: () => {},
}

const AboutYouForm = formContainer(AboutYouStep, addPrefix(sectionName, userRules), sectionName, {}, {}, userAsyncValidation, ['aboutyou.password']) // eslint-disable-line import/no-mutable-exports

const AboutYou = addInitialValues(AboutYouForm, { sectionName })

export {
  AboutYou
}
