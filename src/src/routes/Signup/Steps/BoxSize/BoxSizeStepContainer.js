import { connect } from 'react-redux'
import actions from 'actions'
import { getIsWizardPricePerServingEnabled, getIsWizardBoxSizeEnabled } from 'selectors/features'
import { trackSignupWizardAction } from 'actions/signup'
import { BoxSizeStep } from './BoxSizeStep'

const BoxSizeStepContainer = connect(
  (state) => ({
    menuBoxPrices: state.menuBoxPrices,
    isWizardPricePerServingEnabled: getIsWizardPricePerServingEnabled(state),
    lowestPricePerPortion: state.boxPrices.toJS().lowestPricePerPortion,
    isWizardBoxSizeEnabled: getIsWizardBoxSizeEnabled(state),
  }),
  {
    numPortionChange: actions.basketNumPortionChange,
    numPortionChangeTracking: actions.portionSizeSelectedTracking,
    trackSignupWizardAction,
  }
)(BoxSizeStep)

export { BoxSizeStepContainer }
