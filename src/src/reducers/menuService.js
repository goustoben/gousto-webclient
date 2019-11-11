import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const menuService = (state = Immutable.Map({}), action) => {
  switch (action.type) {
  case actionTypes.MENU_SERVICE_DATA_RECEIVED: {
    return Immutable.fromJS(
      action.response
    )}
  default:
    return state
  }
}

export { menuService }
