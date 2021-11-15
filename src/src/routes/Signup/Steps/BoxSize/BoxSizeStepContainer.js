import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getCurrentPromoCodeCustomText1 } from 'routes/Signup/signupSelectors'
import { getNumPersonsToBoxDescriptors } from 'routes/BoxPrices/boxPricesSelectors'
import { BoxSizeStep } from './BoxSizeStep'
import { trackSignupWizardAction } from "actions/signup/trackSignupWizardAction"
import { basketNumPortionChange } from "actions/basket/basketNumPortionChange"
import { portionSizeSelectedTracking } from "actions/basket/portionSizeSelectedTracking"

const mapStateToProps = (state) => ({
  menuBoxPrices: state.menuBoxPrices,
  lowestPricePerPortion: state.boxPrices.toJS().lowestPricePerPortion,
  numPersonsToBoxDescriptors: getNumPersonsToBoxDescriptors(state),
  isLoadingPrices:
    state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE) || state.menuBoxPrices.size === 0,
  goustoOnDemandCustomText: getCurrentPromoCodeCustomText1(state),
})

const mapDispatchToProps = {
  numPortionChange: basketNumPortionChange,
  numPortionChangeTracking: portionSizeSelectedTracking,
  trackSignupWizardAction,
}

export const BoxSizeStepContainer = connect(mapStateToProps, mapDispatchToProps)(BoxSizeStep)
