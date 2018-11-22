import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import { CheckoutFrame } from './CheckoutFrame'

const form = 'checkout'

const mapStateToProps = (state, ownProps) => {
  const formValues = getFormValues(form)(state)

  return {
    checkoutScriptReady: ownProps.checkoutScriptReady,
    cardName: formValues && formValues.payment && formValues.payment.cardName ? formValues.payment.cardName : '',
    billingAddress : getBillingAddress(formValues)
  }
}

const getBillingAddress = (formValues) => {
  const isBillingAddressDifferent = formValues && formValues.payment && formValues.payment.isBillingAddressDifferent ? formValues.payment.cardName : false

  if( isBillingAddressDifferent ) {
    return formValues && formValues.payment ? transformBillingAddress(formValues.payment) : {}
  } else {
    return formValues && formValues.delivery ? transformBillingAddress(formValues.delivery) : {}
  }
}

const transformBillingAddress = ({houseNo, street, postcode, town}) => {

  let addressLine1 = houseNo //eslint-disable-line prefer-const
  addressLine1 = street ? addressLine1.concat(' ', street) : addressLine1

  return {
    addressLine1,
    postcode,
    city: town
  }
}

export const CheckoutFrameContainer = connect(mapStateToProps)(CheckoutFrame)
