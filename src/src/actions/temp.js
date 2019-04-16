import actionTypes from './actionTypes'

const tempActions = {
  temp: (key, value) => ({
    type: actionTypes.TEMP,
    key,
    value,
  }),
}

export default tempActions
