import { connect } from 'react-redux'
import actions from 'actions'
import { getIsWizardPricePerServingEnabled, getIsWizardBoxSizeEnabled } from 'selectors/features'
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
  }
)(BoxSizeStep)

export { BoxSizeStepContainer }
