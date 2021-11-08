
import { set } from 'utils/cookieHelper2'
import Cookies from 'utils/GoustoCookies'
import { tutorialViewedExpireTime } from 'config/cookies'
import * as trackingKeys from 'actions/trackingKeys'
import { actionTypes } from './actionTypes'

export const shouldJfyTutorialBeVisible = () => (
  // eslint-disable-next-line arrow-body-style, no-unused-vars
  async (dispatch, getState) => {
    // TODO: revisit when the `kales_remove_cfy_collection` experiment is over
    //
    // There is ongoing experiment where we trialing new way of
    // representing Chosen For You (CFY) collection.
    // The CFY tutorial is not aware of new presentation.
    // Product ownership wants to disable the CFY tutorial experiment
    // for the entire customer base.
    // The reason why the "dead" code remains here (temporary):
    // to allow easy way of revert the experiment.
    return setTutorialVisible('justforyou', false)(dispatch)
    /**
    const getIsCFYDisabled = isOptimizelyFeatureEnabledFactory('kales_remove_cfy_collection')

    const { menuCollections, tutorial } = getState()

    const cfyCollectionLoaded = menuCollections.find(
      collection => collection.get('slug') === 'recommendations'
    )

    const tutorialNameIsCFY = cfyCollectionLoaded && cfyCollectionLoaded.getIn(['properties', 'tutorial'])

    const jfyTutorialSeen = Boolean(tutorial && tutorial.getIn(['viewed', 'justforyou']))
    let shouldTutorialBeVisible = false

    const isCFYEnabled = !(await getIsCFYDisabled(dispatch, getState))

    if (isCFYEnabled && tutorialNameIsCFY === 'jfy' && !jfyTutorialSeen) {
      shouldTutorialBeVisible = true
    }

    setTutorialVisible('justforyou', shouldTutorialBeVisible)(dispatch)
     */
  }
)

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
        actionType: dismissed ? trackingKeys.dismissTutorialModal : trackingKeys.viewTutorialModal,
        tutorial_name: tutorialName,
        turorial_step: turorialStep + 1,
      },
    })
  }
)
