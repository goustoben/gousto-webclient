import { unset } from "utils/cookieHelper2"
import Cookies from "utils/GoustoCookies"
import { menuLoadingError } from "actions/menu/menuLoadingError"

export function handleReloadMenuError({dispatch}) {
  unset(Cookies, 'reload_invalid_delivery_date')
  dispatch(menuLoadingError('Cannot load menu, try changing delivery date below.'))
}
