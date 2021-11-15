import { connect } from 'react-redux'
import { error } from "actions/status/error"
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { DeliveryCompensation } from './DeliveryCompensation'
import { trackAcceptRefundInSSRDeliveries } from "routes/GetHelp/actions/getHelp/trackAcceptRefundInSSRDeliveries"
import { trackDeclineRefundInSSRDeliveries } from "routes/GetHelp/actions/getHelp/trackDeclineRefundInSSRDeliveries"
import { applyDeliveryRefund } from "routes/GetHelp/actions/getHelp/applyDeliveryRefund"

const mapStateToProps = (state) => ({
  isApplyCompensationError: !!state.error
    .get(webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION),
  isApplyCompensationPending: state.pending
    .get(webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION)
})

const DeliveryCompensationContainer = connect(mapStateToProps, {
  applyDeliveryRefund,
  setErrorStatus: error,
  trackAcceptRefundInSSRDeliveries,
  trackDeclineRefundInSSRDeliveries,
})(DeliveryCompensation)

export {
  DeliveryCompensationContainer
}
