import { actionTypes } from "actions/actionTypes"

export function error(key, value) {
  return {
    type: actionTypes.ERROR,
    key,
    value,
  }
}
