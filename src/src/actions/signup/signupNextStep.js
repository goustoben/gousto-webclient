import { stepByName } from "utils/signup"
import { signupTracking } from "actions/signup/signupTracking"
import { getIsPaymentBeforeChoosingEnabled } from "selectors/features"
import { redirect } from "actions/redirect/redirect"
import routes, { client } from "config/routes"
import { signupConfig } from "config/signup"
import { push } from "react-router-redux"

export function signupNextStep(stepName) {
  return (dispatch, getState) => {
    const step = stepByName(stepName)
    if (step) {
      const state = getState()
      const signupState = state.signup
      const isCurrentlyTheLastStep = signupState.getIn(['wizard', 'isLastStep'])
      const lastWizardStep = signupState.getIn(['wizard', 'steps']).last()
      const slug = step.get('slug')
      if (isCurrentlyTheLastStep && (step.get('name') === lastWizardStep || !slug)) {
        dispatch(signupTracking())

        const isPaymentBeforeChoosingEnabled = getIsPaymentBeforeChoosingEnabled(state)
        if (isPaymentBeforeChoosingEnabled) {
          return dispatch(redirect(routes.client.menu))
        } else {
          const path = `${routes.client.signup}/${signupConfig.sellThePropositionPagePath}`

          return dispatch(redirect(path))
        }
      }

      try {
        const {search} = getState().routing.locationBeforeTransitions
        dispatch(push(`${client.signup}/${slug}${search}`))
      } catch (e) {
        dispatch(push(`${client.signup}/${slug}`))
      }
    }

    return null
  }
}
