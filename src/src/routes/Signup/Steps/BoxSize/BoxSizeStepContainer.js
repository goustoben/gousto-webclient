import { connect } from 'react-redux'
import actions from 'actions'
import { trackSignupWizardAction } from 'actions/signup'
import { getIsBoxSizeVerticalLayoutEnabled } from 'routes/Signup/signupSelectors'
import { BoxSizeStep } from './BoxSizeStep'

const mapStateToProps = (state) => ({
  menuBoxPrices: state.menuBoxPrices,
  lowestPricePerPortion: state.boxPrices.toJS().lowestPricePerPortion,
  isBoxSizeVerticalLayoutEnabled: getIsBoxSizeVerticalLayoutEnabled(state),
})

const mapDispatchToProps = {
  numPortionChange: actions.basketNumPortionChange,
  numPortionChangeTracking: actions.portionSizeSelectedTracking,
  trackSignupWizardAction,
}

export const BoxSizeStepContainer = connect(mapStateToProps, mapDispatchToProps)(BoxSizeStep)
