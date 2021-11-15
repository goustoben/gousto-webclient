import { actionTypes } from "actions/actionTypes"

export const temp = (key, value) => ({
  type: actionTypes.TEMP,
  key,
  value,
})
