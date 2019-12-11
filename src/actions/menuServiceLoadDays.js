import { dateTransformer } from 'apis/transformers/date'
import { menuCutoffUntilReceive } from './menu'

export function menuServiceLoadDays(dispatch, getState) {
  const menuServiceData = getState().menuService
  const transformedDate = dateTransformer(menuServiceData)

  dispatch(menuCutoffUntilReceive(transformedDate))
}
