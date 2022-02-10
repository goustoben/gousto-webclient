import { set } from 'utils/cookieHelper2'
import Cookies from 'utils/GoustoCookies'
import { canUseWindow } from 'utils/browserEnvironment'
import { tutorialViewedExpireTime } from 'config/cookies'
import * as trackingKeys from 'actions/trackingKeys'
import { actionTypes } from './actionTypes'

export const setTutorialVisible = (name, value) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_TUTORIAL_VISIBLE,
      name,
      value,
    })
  }
)

export const persistTutorialViewed = (getState) => {
  if (canUseWindow()) {
    const viewed = getState().tutorial.get('viewed').toJS()

    set(Cookies, 'tutorial_viewed', viewed, tutorialViewedExpireTime)
  }
}

export const setTutorialViewed = (name, count) => (
  (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_TUTORIAL_VIEWED,
      name,
      count,
    })
    persistTutorialViewed(getState)
  }
)

export const incrementTutorialViewed = (name) => (
  (dispatch, getState) => {
    dispatch({
      type: actionTypes.INCREMENT_TUTORIAL_VIEWED,
      name,
    })
    persistTutorialViewed(getState)
  }
)

export const tutorialTracking = (tutorialName, turorialStep, dismissed) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.TUTORIAL_TRACKING,
      trackingData: {
        actionType: dismissed ? trackingKeys.dismissTutorialModal : trackingKeys.viewTutorialModal,
        tutorial_name: tutorialName,
        turorial_step: turorialStep + 1,
      },
    })
  }
)
