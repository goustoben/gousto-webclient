import { connect } from 'react-redux'
import { PaymentMethod } from 'config/signup'
import { setCurrentPaymentMethod } from 'actions/checkout'
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
  mapDispatchToProps
)(PayPalConfirmation)
