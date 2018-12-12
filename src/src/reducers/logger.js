import {fromJS} from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const logger = ( state = {uuid: ''}, action) => {

  switch (action.type) {
  case actionTypes.LOGGER_SET_UUID: {

    return {
      ...state,
      uuid: action.uuid
    }
  }

  default: {
    return state
  }
  }
}

export { logger }