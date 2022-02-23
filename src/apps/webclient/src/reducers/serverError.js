import { canUseWindow } from 'utils/browserEnvironment'

export const serverErrorReducers = {
  serverError: (state = '404', action) => (
    (action.type === '@@router/LOCATION_CHANGE' && canUseWindow()) ? '404' : state
  ),
}
