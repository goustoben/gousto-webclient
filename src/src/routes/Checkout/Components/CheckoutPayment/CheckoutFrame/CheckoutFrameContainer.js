import { connect } from 'react-redux'
import { getFormValues, change } from 'redux-form'

import { formName, sectionName } from '../config'
import { getBillingAddress } from './utils'
import { cardTokenisationFailed, checkoutClearErrors, validCardDetailsNotProvided } from 'actions/checkout'

import { CheckoutFrame } from './CheckoutFrame'

const mapStateToProps = state => {
  const formValues = getFormValues(formName)(state)

  return {
    formName,
    sectionName,
    cardName: formValues && formValues[sectionName] && formValues[sectionName].cardName ? formValues[sectionName].cardName : '',
    billingAddress : getBillingAddress(formValues),
    hasCheckoutError: !!state.checkout.errors,
  }
}

const mapDispatchToProps = {
  change,
  cardTokenisationFailed,
  checkoutClearErrors,
  validCardDetailsNotProvided,
}

export const CheckoutFrameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutFrame)
