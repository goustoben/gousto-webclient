import { connect } from 'react-redux'

import { redirect } from 'actions/redirect'
import routes from 'config/routes'
import {
  checkoutUrgencySetCurrentStatus,
  trackCheckoutUrgencyAction,
} from 'routes/Checkout/checkoutActions'
import { getCheckoutUrgencyCurrentStatus } from 'routes/Checkout/checkoutSelectors'
import { checkoutUrgencyDefaultModalSeconds } from 'routes/Checkout/checkoutUrgencyConfig'
import { checkoutCreatePreviewOrder } from 'routes/Menu/actions/checkout'

import { CheckoutUrgencyModal } from './CheckoutUrgencyModal'

const mapStateToProps = (state) => {
  const currentStatus = getCheckoutUrgencyCurrentStatus(state)

  return {
    isOpen: currentStatus === 'runningAndModalOpen' || currentStatus === 'finishedAndModalOpen',
    isLoading: currentStatus === 'loading',
    modalSeconds: checkoutUrgencyDefaultModalSeconds,
  }
}

const mapDispatchToProps = (dispatch) => ({
  redirectToMenu: () => {
    dispatch(redirect(routes.client.menu))
  },
  checkoutCreatePreviewOrder: () => dispatch(checkoutCreatePreviewOrder()),
  checkoutUrgencySetCurrentStatus: (status) => dispatch(checkoutUrgencySetCurrentStatus(status)),
  trackCheckoutUrgencyAction: (...args) => dispatch(trackCheckoutUrgencyAction(...args)),
})

export const CheckoutUrgencyModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutUrgencyModal)
