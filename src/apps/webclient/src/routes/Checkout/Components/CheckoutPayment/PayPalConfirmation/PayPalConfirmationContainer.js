import { connect } from 'react-redux'

import { setCurrentPaymentMethod } from 'actions/checkout'
import { PaymentMethod } from 'config/signup'
import { isSubmitting } from 'routes/Checkout/utils/state'

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
