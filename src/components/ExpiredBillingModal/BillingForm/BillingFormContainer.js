import { connect } from 'react-redux'
import actions from 'actions/user'
import actionTypes from 'actions/actionTypes'
import BillingForm from './BillingForm'

const mapStateToProps = (state) => ({
  isPosting: state.pending.get(actionTypes.USER_POST_PAYMENT_METHOD),
  fetchError: state.error.get(actionTypes.USER_POST_PAYMENT_METHOD),
})

export default connect(mapStateToProps, {
  submitCardDetails: actions.userAddPaymentMethod,
})(BillingForm)
