import { connect } from 'react-redux'

import {
  checkoutUrgencySetCurrentStatus,
  trackCheckoutUrgencyAction,
} from 'routes/Checkout/checkoutActions'
import { getCheckoutUrgencyCurrentStatus } from 'routes/Checkout/checkoutSelectors'
import {
  checkoutUrgencyDefaultStartSeconds,
  checkoutUrgencyDefaultModalSeconds,
} from 'routes/Checkout/checkoutUrgencyConfig'
import { isSubmitting } from 'routes/Checkout/utils/state'

import { CheckoutUrgencyController } from './CheckoutUrgencyController'

const mapStateToProps = (state) => ({
  currentStatus: getCheckoutUrgencyCurrentStatus(state),
  startSeconds: checkoutUrgencyDefaultStartSeconds,
  modalSeconds: checkoutUrgencyDefaultModalSeconds,
  submitting: isSubmitting(state),
})

const mapDispatchToProps = {
  checkoutUrgencySetCurrentStatus,
  trackCheckoutUrgencyAction,
}

export const CheckoutUrgencyControllerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutUrgencyController)
