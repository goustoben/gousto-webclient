import actionTypes from './actionTypes'
import { jfyTutorial } from '../selectors/features'

export const showJfyTutorial = () => {
  return (dispatch, getState) => {
    const state = getState()
    const jfyCollectionLoaded = state.menuCollections.includes(collection => collection.slug === 'recommendations')
    const shouldShowjfyTutorial = jfyTutorial(state)
    let value

    if (shouldShowjfyTutorial && jfyCollectionLoaded) {
      value = true
    } else {
      value = false
    }

    dispatch({type: actionTypes.TRIGGER_JFY_TUTORIAL, value: value})
  }
}

export default {
  showJfyTutorial,
}
