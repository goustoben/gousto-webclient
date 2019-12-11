import { connect } from 'react-redux'
import FinishStep from './FinishStep'

function mapStateToProps(state) {
  return {
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    date: state.basket.get('date'),
    slotId: state.basket.get('slotId'),
    postcode: state.basket.get('postcode'),
    numPortions: state.basket.get('numPortions'),
    style: state.features.getIn(['wizardFamilyAcq', 'value']) ? 'family' : 'default',
  }
}

const FinishStepContainer = connect(mapStateToProps)(FinishStep)

export default FinishStepContainer
