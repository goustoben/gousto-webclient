import { push } from 'react-router-redux'
import routes, { client } from 'config/routes'
import { redirect } from 'actions/redirect'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { completeWizardPostcode, clickSeeThisWeeksMenu, signupSocialBelongingBanner } from 'actions/trackingKeys'
import { stepByName } from 'utils/signup'
import { signupConfig } from 'config/signup'
import { getUTMAndPromoCode } from 'selectors/tracking'
import { getIsPaymentBeforeChoosingEnabled } from 'selectors/features'
import { actionTypes } from './actionTypes'
import { basketPostcodeChange } from './basket'

export function signupStepsReceive(steps) {
  return {
    type: actionTypes.SIGNUP_STEPS_RECEIVE,
    steps,
  }
}

export function signupSetStep(step) {
  return (dispatch, getState) => {
    const signupState = getState().signup
    const steps = signupState.getIn(['wizard', 'steps'])

    if (step) {
      const newStepNumber = steps.findIndex(stepName => stepName === step.get('name'))
      const isLastStep = newStepNumber === steps.size - 1

      dispatch({
        type: actionTypes.SIGNUP_STEP_SET,
        currentStepName: step.get('name'),
        currentStepNumber: newStepNumber,
        isLastStep,
        trackingData: {
          type: actionTypes.SIGNUP_STEP_SET,
          step: step.get('slug'),
          stepName: step.get('name'),
        },
      })
    }
  }
}

export function signupCookForKidsChange(cookForKids) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGNUP_COOK_FOR_KIDS,
      cookForKids,
      trackingData: {
        type: actionTypes.SIGNUP_COOK_FOR_KIDS,
        cookForKids,
      },
    })
  }
}

export function signupTracking() {
  return (dispatch, getState) => {
    const { basket } = getState()
    const postcode = basket.get('postcode')
    const numAdults = basket.get('numAdults')
    const numPortions = basket.get('numPortions')
    const date = basket.get('date')
    const slotId = basket.get('slotId')

    dispatch({
      type: actionTypes.SIGNUP_TRACKING,
      trackingData: {
        actionType: actionTypes.SIGNUP_TRACKING,
        postcode,
        numAdults,
        numPortions,
        date,
        slotId,
      },
    })
  }
}

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
        const { search } = getState().routing.locationBeforeTransitions
        dispatch(push(`${client.signup}/${slug}${search}`))
      } catch (e) {
        dispatch(push(`${client.signup}/${slug}`))
      }
    }

    return null
  }
}

export function signupGoToMenu() {
  return (dispatch) => {
    dispatch(trackUTMAndPromoCode(clickSeeThisWeeksMenu))
    dispatch(redirect(routes.client.menu))
  }
}

export const trackSignupWizardAction = (type, additionalData = {}) => (dispatch, getState) => {
  const { promoCode, UTM } = getUTMAndPromoCode(getState())

  dispatch({
    type,
    trackingData: {
      actionType: type,
      ...UTM,
      promoCode,
      ...additionalData,
    },
  })
}

export const signupSetSocialBelongingOptions = (socialBelongingOptions) => ({
  type: actionTypes.SIGNUP_SET_SOCIAL_BELONGING_OPTIONS,
  ...socialBelongingOptions,
})

export function signupChangePostcode(postcode, nextStepName, socialBelongingOptions) {
  return async (dispatch, getState) => {
    await dispatch(basketPostcodeChange(postcode))

    if (socialBelongingOptions) {
      dispatch(signupSetSocialBelongingOptions(socialBelongingOptions))
    }

    if (!getState().error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false)) {
      dispatch(trackSignupWizardAction(completeWizardPostcode, { postcode }))
      signupNextStep(nextStepName)(dispatch, getState)
    }
  }
}

export const signupDismissDiscountAppliedBar = () => ({
  type: actionTypes.SIGNUP_DISMISS_DISCOUNT_APPLIED_BAR,
})

export const trackSocialBelongingBannerAppearance = () => (dispatch, getState) => {
  const state = getState()
  const { promoCode, UTM } = getUTMAndPromoCode(state)
  const district = state.signup.getIn(['wizard', 'district'])
  const amountOfCustomers = state.signup.getIn(['wizard', 'amountOfCustomers'])

  dispatch({
    type: signupSocialBelongingBanner,
    trackingData: {
      actionType: signupSocialBelongingBanner,
      ...UTM,
      promo_code: promoCode,
      district,
      number_of_customers: amountOfCustomers,
    },
  })
}
