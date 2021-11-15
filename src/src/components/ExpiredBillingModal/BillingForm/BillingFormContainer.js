import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import BillingForm from './BillingForm'
import { userAddPaymentMethod } from "actions/user/userAddPaymentMethod"

const mapStateToProps = (state) => ({
  isPosting: state.pending.get(actionTypes.USER_POST_PAYMENT_METHOD),
  fetchError: state.error.get(actionTypes.USER_POST_PAYMENT_METHOD),
})

export default connect(mapStateToProps, {
  submitCardDetails: userAddPaymentMethod,
})(BillingForm)
