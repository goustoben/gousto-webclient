import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const defaultState = Immutable.Map({
  viewed: Immutable.Map({}),
  showJfyTutorial: false,
})

const tutorial = {
  tutorial: (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.TRIGGER_JFY_TUTORIAL: {
      return state.set('showJfyTutorial', action.value)
    }

    case actionTypes.SET_TUTORIAL_VIEWED: {
      const { name, count } = action
      const viewedState = state.get('viewed').set(name, count)

      return state.set('viewed', viewedState)
    }

    case actionTypes.INCREMENT_TUTORIAL_VIEWED: {
      const { name } = action
      const count = state.getIn(['viewed', name], 0)

      const viewedState = state.get('viewed').set(
        name,
        count + 1,
      )

      return state.set('viewed', viewedState)
    }

    default: {
      return state
    }
    }
  },
}

export default tutorial
