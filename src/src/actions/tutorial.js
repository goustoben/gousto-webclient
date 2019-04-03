import actionTypes from './actionTypes'

import { set } from 'utils/cookieHelper2'
import Cookies from 'utils/GoustoCookies'
import { tutorialViewedExpireTime } from 'config/cookies'

export const shouldJfyTutorialBeVisible = () => (
  (dispatch, getState) => {
    const { menuCollections, tutorial } = getState()

    const jfyCollectionLoaded = menuCollections.some(
      collection => collection.get('slug') === 'recommendations'
    )

    const jfyTutorialSeen = Boolean(tutorial && tutorial.getIn(['viewed', 'justforyou']))

    if (jfyCollectionLoaded && !jfyTutorialSeen) {
      setTutorialVisible('justforyou', true)(dispatch)
    } else {
      setTutorialVisible('justforyou', false)(dispatch)
    }
  }
)

export const setTutorialVisible = (name, value) => (
  (dispatch)=> {
    dispatch({
      type: actionTypes.SET_TUTORIAL_VISIBLE,
      name,
      value,
    })
  }
)

export const persistTutorialViewed = (getState) => {
  if (__CLIENT__) {
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
        actionType: dismissed ? 'TutorialModal Dismissed' : 'TutorialModal Viewed',
        tutorial_name: tutorialName,
        turorial_step: turorialStep + 1,
      },
    })
  }
)
