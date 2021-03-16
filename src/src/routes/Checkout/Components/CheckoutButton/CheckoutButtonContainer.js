import { connect } from 'react-redux'
import * as stateUtils from 'routes/Checkout/utils/state'
import { getIsCheckoutOverhaulEnabled } from 'selectors/features'
import { CheckoutButton } from './CheckoutButton'

function mapStateToProps(state) {
  return {
    submitting: stateUtils.isSubmitting(state),
    isCheckoutOverhaulEnabled: getIsCheckoutOverhaulEnabled(state),
  }
}

export const CheckoutButtonContainer = connect(mapStateToProps, {})(CheckoutButton)
