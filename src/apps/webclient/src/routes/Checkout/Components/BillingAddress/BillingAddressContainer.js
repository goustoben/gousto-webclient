import { connect } from 'react-redux'
import { change, getFormValues } from 'redux-form'

import { BillingAddress } from './BillingAddress'
import { form, sectionName } from './config'

const mapStateToProps = (state) => {
  const formValues = getFormValues(form)(state)

  return {
    form,
    sectionName,
    formValues,
  }
}

const mapDispatchToProps = {
  change,
}

export const BillingAddressContainer = connect(mapStateToProps, mapDispatchToProps)(BillingAddress)
