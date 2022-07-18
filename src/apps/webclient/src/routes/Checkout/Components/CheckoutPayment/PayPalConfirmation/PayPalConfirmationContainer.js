import { connect } from 'react-redux'

import { setCurrentPaymentMethod } from 'actions/checkout'
import { isSubmitting } from 'routes/Checkout/utils/state'
import { PaymentMethod } from 'routes/Signup/signupConfig'

import { PayPalConfirmation } from './PayPalConfirmation'

const mapStateToProps = (state) => ({
  isSubmitting: isSubmitting(state),
})

const mapDispatchToProps = {
  resetPaymentMethod: setCurrentPaymentMethod.bind(null, PaymentMethod.Card),
}

export const PayPalConfirmationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PayPalConfirmation)
