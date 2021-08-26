import { connect } from 'react-redux'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { trackSignupWizardAction } from 'actions/signup'
import {
  getIsBoxSizeVerticalLayoutEnabled,
  getCurrentPromoCodeCustomText1,
} from 'routes/Signup/signupSelectors'
import { getNumPersonsToBoxDescriptors } from 'routes/BoxPrices/boxPricesSelectors'
import { BoxSizeStep } from './BoxSizeStep'

const mapStateToProps = (state) => ({
  menuBoxPrices: state.menuBoxPrices,
  lowestPricePerPortion: state.boxPrices.toJS().lowestPricePerPortion,
  isBoxSizeVerticalLayoutEnabled: getIsBoxSizeVerticalLayoutEnabled(state),
  numPersonsToBoxDescriptors: getNumPersonsToBoxDescriptors(state),
  isLoadingPrices:
    state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE) || state.menuBoxPrices.size === 0,
  goustoOnDemandCustomText: getCurrentPromoCodeCustomText1(state),
})

const mapDispatchToProps = {
  numPortionChange: actions.basketNumPortionChange,
  numPortionChangeTracking: actions.portionSizeSelectedTracking,
  trackSignupWizardAction,
}

export const BoxSizeStepContainer = connect(mapStateToProps, mapDispatchToProps)(BoxSizeStep)
