import { connect } from 'react-redux'
import { getFormValues, change } from 'redux-form'

import { formName, sectionName } from '../config'
import { getBillingAddress } from './utils'
import { cardTokenisationFailed } from 'actions/checkout'

import { CheckoutFrame } from './CheckoutFrame'

const mapStateToProps = state => {
  const formValues = getFormValues(formName)(state)

  return {
    formName,
    sectionName,
    cardName: formValues && formValues[sectionName] && formValues[sectionName].cardName ? formValues[sectionName].cardName : '',
    billingAddress : getBillingAddress(formValues),
  }
}

const mapDispatchToProps = {
  change,
  cardTokenisationFailed,
}

export const CheckoutFrameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutFrame)
