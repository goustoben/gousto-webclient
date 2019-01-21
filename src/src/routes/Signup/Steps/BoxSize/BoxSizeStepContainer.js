import { connect } from 'react-redux'
import BoxSizeStep from './BoxSizeStep'
import actions from 'actions'

const BoxSizeStepContainer = connect(() => ({}), {
  numPortionChange: actions.basketNumPortionChange,
  numPortionChangeTracking: actions.basketNumPortionChangeTracking,
})(BoxSizeStep)

export default BoxSizeStepContainer
