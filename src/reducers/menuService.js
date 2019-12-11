import actionTypes from 'actions/actionTypes'

const menuService = (state = {}, action) => {
  switch (action.type) {
  case actionTypes.MENU_SERVICE_DATA_RECEIVED:
    return action.response
  default:
    return state
  }
}

export { menuService }

