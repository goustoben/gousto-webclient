import { connect } from 'react-redux'
import {
  checkoutUrgencySetCurrentStatus,
  trackCheckoutUrgencyAction,
} from 'routes/Checkout/checkoutActions'
import {
  getCheckoutUrgencyCurrentStatus,
  getCheckoutUrgencyStartSeconds,
  getCheckoutUrgencyModalSeconds,
} from 'routes/Checkout/checkoutSelectors'
import { isSubmitting } from 'routes/Checkout/utils/state'
import { CheckoutUrgencyController } from './CheckoutUrgencyController'

const mapStateToProps = (state) => ({
  currentStatus: getCheckoutUrgencyCurrentStatus(state),
  startSeconds: getCheckoutUrgencyStartSeconds(state),
  modalSeconds: getCheckoutUrgencyModalSeconds(state),
  submitting: isSubmitting(state),
})

const mapDispatchToProps = {
  checkoutUrgencySetCurrentStatus,
  trackCheckoutUrgencyAction,
}

export const CheckoutUrgencyControllerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutUrgencyController)
