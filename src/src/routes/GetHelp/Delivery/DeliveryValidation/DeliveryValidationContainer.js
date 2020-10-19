import { connect } from 'react-redux'
import { validateDeliveryAction } from '../../actions/getHelp'
import { DeliveryValidation } from './DeliveryValidation'

const mapStateToProps = (state) => ({
  compensationAmount: state.getHelp.getIn(['order', 'deliveryCompensationAmount']),
  hasPassedDeliveryValidation: state.getHelp.getIn(['order', 'hasPassedDeliveryValidation']),
  isDeliveryValidationPending: state.pending.get('GET_HELP_VALIDATE_DELIVERY'),
})

const DeliveryValidationContainer = connect(mapStateToProps, {
  validateDeliveryAction,
})(DeliveryValidation)

export {
  DeliveryValidationContainer
}
