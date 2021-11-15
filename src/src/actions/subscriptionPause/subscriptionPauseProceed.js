import { actionTypes } from "actions/actionTypes"
import { getModalType } from "actions/subscriptionPause/getModalType"
import { subscriptionPauseOSRTrack } from "actions/subscriptionPause/subscriptionPauseOSRTrack"
import { subscriptionPauseLoadStep } from "actions/subscriptionPause/subscriptionPauseLoadStep"
import { subscriptionPauseLoadStaticScreen } from "actions/subscriptionPause/subscriptionPauseLoadStaticScreen"

export function subscriptionPauseProceed(stepType = 'next', staticScreenFallback = 'error', seRecoveryType, promoCode) {
  return (dispatch, getState) => {
    const state = getState()
    const activeStepId = state.subscriptionPause.get('activeStepId')
    const activeSteps = state.subscriptionPause.get('activeSteps')
    let nextStepId

    if (stepType === 'cancel' || stepType === 'next') {
      const chosenReasonIds = state.subscriptionPause.get('chosenReasonIds')
      let categorySlug
      let reasonSlug
      if (chosenReasonIds.size > 0) {
        const categoryId = chosenReasonIds.first()
        categorySlug = state.subscriptionPause.get('reasons').filter(reason => reason.get('id') === categoryId).first()
          .get('slug')
      }
      if (chosenReasonIds.size > 1) {
        const reasonId = chosenReasonIds.last()
        const activeReasons = state.subscriptionPause.get('activeReasons')
        reasonSlug = activeReasons.getIn([reasonId, 'slug'])
      }
      let modalType = activeSteps.getIn([activeStepId, 'type'])
      modalType = modalType || getModalType(getState)
      dispatch(subscriptionPauseOSRTrack(actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE, {
        promoCode,
        categorySlug,
        reasonSlug,
        modalType,
        seRecoveryType,
      }))
    }

    if (stepType === 'initial' || !activeStepId) {
      const firstStep = activeSteps.find(step => step.get('initial', false), undefined, activeSteps.first())
      nextStepId = firstStep ? firstStep.get('id') : undefined
    } else {
      nextStepId = activeSteps.getIn([activeStepId, `${stepType}StepId`])
    }

    if (nextStepId) {
      const nextModalType = activeSteps.getIn([nextStepId, 'type'])
      if (stepType === 'initial' && nextModalType !== 'other') {
        dispatch(subscriptionPauseOSRTrack(actionTypes.PS_RECOVERY_ATTEMPT_MODAL_VIEWED, {modalType: nextModalType}))
      }
      if (['recovered', 'recoveredPromo', 'recoveredSkipped', 'paused'].indexOf(nextModalType) > -1) {
        dispatch(subscriptionPauseOSRTrack(actionTypes.PS_END_MODAL_VIEWED))
      }
      dispatch(subscriptionPauseLoadStep(nextStepId))
    } else {
      dispatch(subscriptionPauseLoadStaticScreen(staticScreenFallback))
    }
  }
}
