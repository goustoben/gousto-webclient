import { connect } from 'react-redux'
import { getCheckoutUrgencyCurrentStatus } from 'routes/Checkout/checkoutSelectors'
import { redirect } from 'actions/redirect'
import { checkoutCreatePreviewOrder } from 'routes/Menu/actions/checkout'
import routes from 'config/routes'
import { CheckoutUrgencyModal } from './CheckoutUrgencyModal'

const mapStateToProps = (state) => {
  const currentStatus = getCheckoutUrgencyCurrentStatus(state)

  return {
    isOpen: currentStatus === 'runningAndModalOpen' || currentStatus === 'finishedAndModalOpen',
    isLoading: currentStatus === 'loading',
  }
}

const mapDispatchToProps = (dispatch) => ({
  redirectToMenu: () => {
    dispatch(redirect(routes.client.menu))
  },
  checkoutCreatePreviewOrder: () => dispatch(checkoutCreatePreviewOrder()),
})

export const CheckoutUrgencyModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutUrgencyModal)
