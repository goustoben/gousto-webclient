import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const tutorial = {
  tutorial: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.TRIGGER_JFY_TUTORIAL: {
      return state.set('showJfyTutorial', action.value)
    }

    default: {
      return state
    }
    }
  },
}

export default tutorial
