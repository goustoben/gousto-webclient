import actionTypes from './actionTypes'
import { jfyTutorial } from '../selectors/features'

export const showJfyTutorial = () => {
  return (dispatch, getState) => {
    const state = getState()
    const { menuCollections } = state
    const jfyCollectionLoaded = menuCollections.some(
      collection => collection.get('slug') === 'recommendations'
    )
    const shouldShowjfyTutorial = jfyTutorial(state)
    const value = shouldShowjfyTutorial && jfyCollectionLoaded

    dispatch({type: actionTypes.TRIGGER_JFY_TUTORIAL, value })
  }
}

export const setTutorialViewed = (name, count) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.TUTORIAL_VIEWED,
      name,
      count,
    })
  }
)

export default {
  showJfyTutorial,
}
