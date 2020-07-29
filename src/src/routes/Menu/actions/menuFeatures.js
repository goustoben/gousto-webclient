import { actionTypes } from '../../../actions/actionTypes'

export const setMenuFeature = (name, value) => ({
  type: actionTypes.MENU_SET_FEATURE,
  payload: {
    name,
    value
  }
})
