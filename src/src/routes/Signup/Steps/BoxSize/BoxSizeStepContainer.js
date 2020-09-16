import { connect } from 'react-redux'
import actions from 'actions'
import { BoxSizeStep } from './BoxSizeStep'

const BoxSizeStepContainer = connect((state) => ({
  menuBoxPrices: state.menuBoxPrices
}), {
  numPortionChange: actions.basketNumPortionChange,
  numPortionChangeTracking: actions.portionSizeSelectedTracking,
})(BoxSizeStep)

export { BoxSizeStepContainer }
