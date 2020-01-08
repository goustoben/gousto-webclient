import actionTypes from 'actions/actionTypes'

const brand = (state = {}, action) => {
  switch (action.type) {
  case actionTypes.BRAND_DATA_RECEIVED:
    return action.response
  default:
    return state
  }
}

export { brand }
