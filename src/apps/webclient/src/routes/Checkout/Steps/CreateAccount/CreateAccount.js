import React from 'react'

import PropTypes from 'prop-types'

import { RibbonTriggerContainer } from 'components/RibbonTrigger'
import { useIsApplePayEnabled } from 'routes/Checkout/hooks/useIsApplePayEnabled'

import { AboutYouContainer, addInitialValues } from '../../Components/AboutYou'
import { formContainer } from '../../Components/formContainer'

const sectionName = 'account'

const AboutYouSection = AboutYouContainer(sectionName)

export const CreateAccountStep = ({
  submit,
  userProspect,
  receiveRef,
  checkoutValid,
  trackUTMAndPromoCode,
  onLoginClick,
  change,
}) => {
  const isApplePayEnabled = useIsApplePayEnabled()

  return (
    <>
      <AboutYouSection
        receiveRef={receiveRef}
        submit={submit}
        userProspect={userProspect}
        checkoutValid={checkoutValid}
        trackUTMAndPromoCode={trackUTMAndPromoCode}
        onLoginClick={onLoginClick}
        change={change}
        isApplePayEnabled={isApplePayEnabled}
      />
      <RibbonTriggerContainer name="checkout-account" />
    </>
  )
}

CreateAccountStep.propTypes = {
  submit: PropTypes.func.isRequired,
  userProspect: PropTypes.func,
  receiveRef: PropTypes.func,
  checkoutValid: PropTypes.bool,
  trackUTMAndPromoCode: PropTypes.func,
  onLoginClick: PropTypes.func,
  change: PropTypes.func.isRequired,
}

CreateAccountStep.defaultProps = {
  userProspect: () => {},
  receiveRef: () => {},
  checkoutValid: false,
  trackUTMAndPromoCode: () => {},
  onLoginClick: () => {},
}

const AccountForm = formContainer(CreateAccountStep, [], sectionName, {}, {}) // eslint-disable-line import/no-mutable-exports

const CreateAccount = addInitialValues(AccountForm, { sectionName })

CreateAccount.displayName = 'CreateAccount'

export { CreateAccount }
