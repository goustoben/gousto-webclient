import PropTypes from 'prop-types'
import React from 'react'

import { userRules } from 'validations/user'
import userAsyncValidation from 'validations/userAsync'
import { formContainer } from '../../Components/formContainer'

import { AboutYouContainer, addInitialValues } from '../../Components/AboutYou'

const sectionName = 'account'

const AboutYouSection = AboutYouContainer(sectionName)

export const CreateAccountStep = ({
  submit,
  userProspect,
  receiveRef,
  checkoutValid,
  trackUTMAndPromoCode,
  onLoginClick,
}) => (
  <AboutYouSection
    receiveRef={receiveRef}
    submit={submit}
    userProspect={userProspect}
    checkoutValid={checkoutValid}
    trackUTMAndPromoCode={trackUTMAndPromoCode}
    onLoginClick={onLoginClick}
  />
)

CreateAccountStep.propTypes = {
  submit: PropTypes.func.isRequired,
  userProspect: PropTypes.func,
  receiveRef: PropTypes.func,
  checkoutValid: PropTypes.bool,
  trackUTMAndPromoCode: PropTypes.func,
  onLoginClick: PropTypes.func,
}

CreateAccountStep.defaultProps = {
  userProspect: () => {},
  receiveRef: () => {},
  checkoutValid: false,
  trackUTMAndPromoCode: () => {},
  onLoginClick: () => {},
}

const AccountForm = formContainer(
  CreateAccountStep,
  userRules(sectionName),
  sectionName,
  {},
  {},
  userAsyncValidation,
  ['account.password']
) // eslint-disable-line import/no-mutable-exports

const CreateAccount = addInitialValues(AccountForm, { sectionName })

export { CreateAccount }
