import { connect } from 'react-redux'
import webClientStatusActions from 'actions/status'
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { applyDeliveryRefund } from '../../../actions/getHelp'
import { DeliveryCompensation } from './DeliveryCompensation'

const mapStateToProps = (state) => ({
  isApplyCompensationError: !!state.error
    .get(webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION),
  isApplyCompensationPending: state.pending
    .get(webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION)
})

const DeliveryCompensationContainer = connect(mapStateToProps, {
  applyDeliveryRefund,
  setErrorStatus: webClientStatusActions.error,
})(DeliveryCompensation)

export {
  DeliveryCompensationContainer
}
