import actionTypes from './actionTypes'

export const menuLoadJfyTutorial = () => {
  return (dispatch, getState) => {
    const collectionsLoaded = getState().menu.get('menuCollections')
    const seenJfyTutorial = false //add call to store when this data is added there
    let value

    if (collectionsLoaded && !seenJfyTutorial) {
      value = true
    } else {
      value = false
    }

    dispatch({type: actionTypes.TRIGGER_JFY_TUTORIAL, value: value})
  }
}

export default {
  menuLoadJfyTutorial,
}
