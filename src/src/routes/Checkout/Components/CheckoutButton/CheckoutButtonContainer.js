import { connect } from 'react-redux'
import CheckoutButton from './CheckoutButton'
import * as stateUtils from 'routes/Checkout/utils/state'

function mapStateToProps(state) {
  return {
    submitting: stateUtils.isSubmitting(state),
  }
}

const CheckoutContainer = connect(mapStateToProps, {})(CheckoutButton)

export default CheckoutContainer
