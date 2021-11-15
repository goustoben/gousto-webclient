import { connect } from 'react-redux'
import { DeliveryValidation } from './DeliveryValidation'
import { trackClickGetInTouchInSSRDeliveries } from "routes/GetHelp/actions/getHelp/trackClickGetInTouchInSSRDeliveries"
import { validateDeliveryAction } from "routes/GetHelp/actions/getHelp/validateDeliveryAction"

const mapStateToProps = (state) => ({
  compensationAmount: state.getHelp.getIn(['order', 'deliveryCompensationAmount']),
  hasPassedDeliveryValidation: state.getHelp.getIn(['order', 'hasPassedDeliveryValidation']),
  isDeliveryValidationPending: state.pending.get('GET_HELP_VALIDATE_DELIVERY'),
})

const DeliveryValidationContainer = connect(mapStateToProps, {
  trackClickGetInTouchInSSRDeliveries,
  validateDeliveryAction,
})(DeliveryValidation)

export {
  DeliveryValidationContainer
}
