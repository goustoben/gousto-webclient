import actionTypes from 'actions/actionTypes'

const redirect = {
  redirect: (state = '', action) => {
    switch (action.type) {
    case actionTypes.SERVER_REDIRECT:
      return action.url

    default:
      return state
    }
  },
  clearCookies: (state = false, action) => {
    switch (action.type) {
    case actionTypes.SERVER_REDIRECT:
      return action.clearCookies || false

    default:
      return state
    }
  },
  replace: (state = '', action) => {
    switch (action.type) {
    case actionTypes.SERVER_REPLACE:
      return action.url
    default:
      return state
    }
  },
}

export default redirect
