import { menuServiceLoadDays } from "actions/menuServiceLoadDays/menuServiceLoadDays"

export function menuLoadDays() {
  return async (dispatch, getState) => {
    menuServiceLoadDays(dispatch, getState)
  }
}
