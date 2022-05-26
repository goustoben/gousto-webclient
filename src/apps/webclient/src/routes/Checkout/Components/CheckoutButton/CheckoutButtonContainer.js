import { connect } from 'react-redux'

import * as stateUtils from 'routes/Checkout/utils/state'

import { CheckoutButton } from './CheckoutButton'

function mapStateToProps(state) {
  return {
    submitting: stateUtils.isSubmitting(state),
  }
}

export const CheckoutButtonContainer = connect(mapStateToProps, {})(CheckoutButton)
