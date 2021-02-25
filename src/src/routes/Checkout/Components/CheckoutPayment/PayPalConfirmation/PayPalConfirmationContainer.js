import { connect } from 'react-redux'
import { PaymentMethod } from 'config/signup'
import { setCurrentPaymentMethod } from 'actions/checkout'
import { isSubmitting } from 'routes/Checkout/utils/state'
import { getIsCheckoutOverhaulEnabled } from 'selectors/features'
import { PayPalConfirmation } from './PayPalConfirmation'

const mapStateToProps = (state) => ({
  isSubmitting: isSubmitting(state),
  isCheckoutOverhaulEnabled: getIsCheckoutOverhaulEnabled(state),
})

const mapDispatchToProps = {
  resetPaymentMethod: setCurrentPaymentMethod.bind(null, PaymentMethod.Card),
}

export const PayPalConfirmationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PayPalConfirmation)
