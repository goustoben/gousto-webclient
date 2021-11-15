import { actionTypes } from "actions/actionTypes"

export function pending(key, value) {
  return {
    type: actionTypes.PENDING,
    key,
    value,
  }
}
