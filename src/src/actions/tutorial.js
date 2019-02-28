import actionTypes from './actionTypes'

export const shouldJfyTutorialBeVisible = () => (
  (dispatch, getState) => {
    const { menuCollections, tutorial } = getState()

    const jfyCollectionLoaded = menuCollections.some(
      collection => collection.get('slug') === 'recommendations'
    )

    const jfyTutorialSeen = Boolean(tutorial && tutorial.getIn(['viewed', 'justforyou']))

    if (jfyCollectionLoaded && !jfyTutorialSeen) {
      dispatch(setTutorialVisible('justforyou', true))
    } else {
      dispatch(setTutorialVisible('justforyou', false))
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
