import { connect } from 'react-redux'
import actions from 'actions'
import { getIsWizardPricePerServingEnabled } from 'selectors/features'
import { BoxSizeStep } from './BoxSizeStep'

const BoxSizeStepContainer = connect(
  (state) => ({
    menuBoxPrices: state.menuBoxPrices,
    isWizardPricePerServingEnabled: getIsWizardPricePerServingEnabled(state),
    lowestPricePerPortion: state.boxPrices.toJS().lowestPricePerPortion,
  }),
  {
    numPortionChange: actions.basketNumPortionChange,
    numPortionChangeTracking: actions.portionSizeSelectedTracking,
  }
)(BoxSizeStep)

export { BoxSizeStepContainer }
