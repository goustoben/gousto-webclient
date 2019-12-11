import { connect } from 'react-redux'
import actions from 'actions'
import BoxSizeStep from './BoxSizeStep'

const BoxSizeStepContainer = connect(() => ({}), {
  numPortionChange: actions.basketNumPortionChange,
  numPortionChangeTracking: actions.portionSizeSelectedTracking,
})(BoxSizeStep)

export default BoxSizeStepContainer
