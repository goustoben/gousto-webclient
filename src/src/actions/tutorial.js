import actionTypes from './actionTypes'

export const showJfyTutorial = () => (
  (dispatch, getState) => {
    const { menuCollections } = getState()

    const jfyCollectionLoaded = menuCollections.some(
      collection => collection.get('slug') === 'recommendations'
    )

    dispatch({
      type: actionTypes.TRIGGER_JFY_TUTORIAL,
      value: jfyCollectionLoaded
    })
  }
)

export const setTutorialViewed = (name, count) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_TUTORIAL_VIEWED,
      name,
      count,
    })
  }
)

export const incrementTutorialViewed = (name) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.INCREMENT_TUTORIAL_VIEWED,
      name,
    })
  }
)
