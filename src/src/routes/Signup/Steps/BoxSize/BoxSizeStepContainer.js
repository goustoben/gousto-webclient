import { connect } from 'react-redux'
import actions from 'actions'
import { trackSignupWizardAction } from 'actions/signup'
import { BoxSizeStep } from './BoxSizeStep'

const BoxSizeStepContainer = connect(
  (state) => ({
    menuBoxPrices: state.menuBoxPrices,
    lowestPricePerPortion: state.boxPrices.toJS().lowestPricePerPortion,
  }),
  {
    numPortionChange: actions.basketNumPortionChange,
    numPortionChangeTracking: actions.portionSizeSelectedTracking,
    trackSignupWizardAction,
  }
)(BoxSizeStep)

export { BoxSizeStepContainer }
